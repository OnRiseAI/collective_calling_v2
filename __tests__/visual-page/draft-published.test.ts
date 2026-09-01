import { beforeEach, expect, test, vi } from 'vitest'
import { getSeedVisualPage } from '@/lib/visual-page/seed'
import { PHASE1_TEST_SLUG } from '@/lib/visual-page/types'

vi.mock('next/headers', () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false, enable: vi.fn(), disable: vi.fn() })),
}))

const publishedDoc = getSeedVisualPage('en')
const draftDoc = {
  ...publishedDoc,
  title: 'DRAFT ONLY TITLE',
  sections: publishedDoc.sections.map((section) =>
    section._type === 'heroSection'
      ? { ...section, headline: { lead: 'DRAFT HERO', accent: 'only.' } }
      : section,
  ),
}

const publishedFetch = vi.fn(async () => publishedDoc)
const previewFetch = vi.fn(async () => draftDoc)

vi.mock('@/sanity/client', () => ({
  sanityClient: {
    fetch: (...args: unknown[]) => publishedFetch(...args),
  },
}))

const previewState = { enabled: false }

vi.mock('@/sanity/preview-client', () => ({
  getPreviewSanityClient: () =>
    previewState.enabled
      ? {
          fetch: (...args: unknown[]) => previewFetch(...args),
        }
      : null,
  hasPreviewReadToken: () => previewState.enabled,
}))

beforeEach(() => {
  publishedFetch.mockClear()
  previewFetch.mockClear()
  previewState.enabled = false
})

test('public reads use the published client, never the preview client', async () => {
  const { getVisualPage } = await import('@/lib/visual-page/read')
  const page = await getVisualPage({ locale: 'en', slug: PHASE1_TEST_SLUG, preview: false })
  expect(publishedFetch).toHaveBeenCalled()
  expect(previewFetch).not.toHaveBeenCalled()
  expect(page.title).toBe(publishedDoc.title)
  expect(page.isDraft).toBe(false)
  expect(page.draftRequested).toBe(false)
})

test('preview without a read token still shows published content', async () => {
  const { getVisualPage } = await import('@/lib/visual-page/read')
  const page = await getVisualPage({ locale: 'en', slug: PHASE1_TEST_SLUG, preview: true })
  expect(previewFetch).not.toHaveBeenCalled()
  expect(page.title).toBe(publishedDoc.title)
  expect(page.draftRequested).toBe(true)
  expect(page.draftTokenMissing).toBe(true)
  expect(page.isDraft).toBe(false)
})

test('preview with a read token can return draft copy', async () => {
  previewState.enabled = true
  vi.resetModules()
  const { getVisualPage } = await import('@/lib/visual-page/read')
  const page = await getVisualPage({ locale: 'en', slug: PHASE1_TEST_SLUG, preview: true })
  expect(previewFetch).toHaveBeenCalled()
  expect(page.title).toBe('DRAFT ONLY TITLE')
  expect(page.isDraft).toBe(true)
  expect(page.draftTokenMissing).toBe(false)
})
