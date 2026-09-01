'use client'

import * as React from 'react'
import { Puck, usePuck } from '@puckeditor/core'
import '@puckeditor/core/puck.css'
import './preview-styles.css'
import { NextIntlClientProvider } from 'next-intl'
import { useClient } from 'sanity'
import { visualEditorConfig } from './puck-config'
import { puckToSanity, sanityToPuck, toSanityWriteDocument, type PuckPageData } from '@/lib/visual-page/mapper'
import { validateVisualPage, issuesToMessage } from '@/lib/visual-page/validate'
import { getSeedVisualPage } from '@/lib/visual-page/seed'
import {
  PHASE1_TEST_SLUG,
  draftId,
  publishedId,
  visualPageId,
  type VisualLocale,
  type VisualPageData,
} from '@/lib/visual-page/types'

type EditorStatus = 'draft' | 'published' | 'seed' | 'unknown'

function ExtraActions({
  locale,
  status,
  onPublishLive,
  onOpenPreview,
}: {
  locale: VisualLocale
  status: EditorStatus
  onPublishLive: (data: PuckPageData) => void
  onOpenPreview: () => void
}): React.JSX.Element {
  const { appState } = usePuck()
  return (
    <>
      <span style={{ alignSelf: 'center', fontSize: 12, marginRight: 8 }}>
        Locale {locale.toUpperCase()} · {status}
      </span>
      <button type="button" onClick={onOpenPreview}>
        Site preview
      </button>
      <button
        type="button"
        onClick={() => onPublishLive(appState.data as unknown as PuckPageData)}
      >
        Publish
      </button>
    </>
  )
}

async function readDocument(
  client: ReturnType<typeof useClient>,
  locale: VisualLocale,
): Promise<{ page: VisualPageData; status: EditorStatus }> {
  const id = visualPageId(locale, PHASE1_TEST_SLUG)
  const draft = await client.getDocument(draftId(id))
  const published = await client.getDocument(id)
  const raw = draft ?? published
  if (!raw) {
    return { page: getSeedVisualPage(locale), status: 'seed' }
  }
  const parsed = validateVisualPage({
    ...raw,
    slug: (raw as { slug?: { current?: string } | string }).slug,
    locale,
  })
  if (!parsed.ok) {
    return { page: getSeedVisualPage(locale), status: draft ? 'draft' : 'published' }
  }
  return { page: parsed.value, status: draft ? 'draft' : 'published' }
}

export function WebsiteEditor(): React.JSX.Element {
  const client = useClient({ apiVersion: '2025-01-01' })
  const [locale, setLocale] = React.useState<VisualLocale>('en')
  const [page, setPage] = React.useState<VisualPageData>(() => getSeedVisualPage('en'))
  const [status, setStatus] = React.useState<EditorStatus>('unknown')
  const [mountKey, setMountKey] = React.useState(0)
  const [busy, setBusy] = React.useState(false)
  const [notice, setNotice] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    void readDocument(client, locale).then((result) => {
      if (cancelled) return
      setPage(result.page)
      setStatus(result.status)
      setMountKey((value) => value + 1)
    })
    return () => {
      cancelled = true
    }
  }, [client, locale])

  const persist = React.useCallback(
    async (data: PuckPageData, mode: 'draft' | 'publish') => {
      const mapped = puckToSanity({ data, locale, slug: PHASE1_TEST_SLUG })
      if (!mapped.ok) {
        setNotice(`Validation failed: ${issuesToMessage(mapped.issues)}`)
        return
      }
      setBusy(true)
      try {
        const writeDoc = toSanityWriteDocument(mapped.value)
        const id = publishedId(String(writeDoc._id))
        await client.createOrReplace({
          ...writeDoc,
          _id: draftId(id),
        })
        if (mode === 'publish') {
          try {
            await client.action({
              actionType: 'sanity.action.document.publish',
              publishedId: id,
              draftId: draftId(id),
            })
          } catch {
            const draft = await client.getDocument(draftId(id))
            if (draft && typeof draft._type === 'string') {
              const { _createdAt, _updatedAt, _rev, ...rest } = draft
              void _createdAt
              void _updatedAt
              void _rev
              await client.createOrReplace({ ...rest, _id: id, _type: draft._type })
              await client.delete(draftId(id))
            }
          }
          await fetch('/api/revalidate/visual-page', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ slug: PHASE1_TEST_SLUG, locale }),
          })
          setNotice('Published. Public /editor-test will refresh on next request.')
          setStatus('published')
        } else {
          setNotice('Draft saved. Refresh Studio to confirm it survived.')
          setStatus('draft')
        }
        setPage(mapped.value)
      } catch (err) {
        setNotice(
          `${mode === 'publish' ? 'Publish failed' : 'Save failed'}: ${
            err instanceof Error ? err.message : 'Unknown error'
          }`,
        )
      } finally {
        setBusy(false)
      }
    },
    [client, locale],
  )

  const puckData = sanityToPuck(page)
  const sitePreviewPath = locale === 'en' ? `/${PHASE1_TEST_SLUG}` : `/${locale}/${PHASE1_TEST_SLUG}`

  return (
    <NextIntlClientProvider locale={locale} messages={{}}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            padding: '8px 12px',
            borderBottom: '1px solid #e2d9c6',
            background: '#f8f4eb',
            color: '#1e1b17',
            fontSize: 13,
          }}
        >
          <strong>Website Editor</strong>
          <label>
            Locale{' '}
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as VisualLocale)}
              disabled={busy}
            >
              <option value="en">English (en)</option>
              <option value="es">Spanish (es)</option>
            </select>
          </label>
          <span>
            Page: /{PHASE1_TEST_SLUG} · editing {locale} does not overwrite the other locale
          </span>
          <span style={{ marginLeft: 'auto' }}>{busy ? 'Working…' : notice}</span>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <Puck
            key={`${locale}-${mountKey}`}
            config={visualEditorConfig}
            data={puckData}
            headerTitle={page.title}
            headerPath={sitePreviewPath}
            height="100%"
            dictionary={{ 'header-publish': 'Save draft' }}
            viewports={[
              { width: 1280, height: 'auto', icon: 'Monitor', label: 'Desktop' },
              { width: 768, height: 'auto', icon: 'Tablet', label: 'Tablet' },
              { width: 360, height: 'auto', icon: 'Smartphone', label: 'Mobile' },
            ]}
            onPublish={(data) => {
              void persist(data as unknown as PuckPageData, 'draft')
            }}
            overrides={{
              headerActions: ({ children }) => (
                <>
                  {children}
                  <ExtraActions
                    locale={locale}
                    status={status}
                    onPublishLive={(data) => {
                      void persist(data, 'publish')
                    }}
                    onOpenPreview={() => {
                      window.open(sitePreviewPath, '_blank', 'noopener,noreferrer')
                    }}
                  />
                </>
              ),
            }}
          />
        </div>
      </div>
    </NextIntlClientProvider>
  )
}
