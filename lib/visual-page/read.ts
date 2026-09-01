import { draftMode } from 'next/headers'

import { sanityClient } from '@/sanity/client'
import { getPreviewSanityClient, hasPreviewReadToken } from '@/sanity/preview-client'
import {
  VISUAL_PAGE_QUERY,
  fallbackRenderModel,
  mapSanityVisualPage,
  toRenderModel,
} from '@/lib/sanity/visual-page.query'
import { PHASE1_TEST_SLUG, isVisualLocale, type VisualLocale } from './types'
import type { VisualPageRenderModel } from './types'

export type VisualPageReadResult = VisualPageRenderModel & {
  draftRequested: boolean
  draftTokenMissing: boolean
}

async function fetchPage(
  locale: VisualLocale,
  slug: string,
  preview: boolean,
): Promise<VisualPageRenderModel> {
  const client = preview ? getPreviewSanityClient() : sanityClient
  if (!client) {
    return fallbackRenderModel(locale, false)
  }

  try {
    const raw: unknown = await client.fetch(VISUAL_PAGE_QUERY, { slug, locale })
    const mapped = mapSanityVisualPage(raw, locale)
    if (!mapped) return fallbackRenderModel(locale, preview)
    return toRenderModel(mapped, preview)
  } catch {
    return fallbackRenderModel(locale, preview)
  }
}

export async function getVisualPage(opts: {
  locale: string
  slug?: string
  preview?: boolean
}): Promise<VisualPageReadResult> {
  const locale: VisualLocale = isVisualLocale(opts.locale) ? opts.locale : 'en'
  const slug = opts.slug ?? PHASE1_TEST_SLUG
  const draftRequested = opts.preview === true
  const draftTokenMissing = draftRequested && !hasPreviewReadToken()
  const usePreview = draftRequested && !draftTokenMissing
  const page = await fetchPage(locale, slug, usePreview)
  return {
    ...page,
    isDraft: usePreview,
    draftRequested,
    draftTokenMissing,
  }
}

export async function getVisualPageForRequest(opts: {
  locale: string
  slug?: string
}): Promise<VisualPageReadResult> {
  const draft = await draftMode()
  return getVisualPage({
    locale: opts.locale,
    slug: opts.slug,
    preview: draft.isEnabled,
  })
}
