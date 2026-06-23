import { sanityClient } from '@/sanity/client'
import { APPEALS_QUERY, mapSanityAppeal } from '@/lib/sanity/appeals.query'
import { SEED_APPEALS } from './seed.collections'
import type { AppealEntry } from './types'

/**
 * Appeal collection read layer.
 *
 * The appeals list must always render. When Sanity is not configured the client
 * is null and we return the seed directly. When it is configured we fetch all
 * appealEntry documents, map them into AppealEntry values, and fall back to the
 * seed on an error or an empty result so a misconfigured or unreachable CMS
 * never breaks a page.
 *
 * getAppeal resolves against the result of getAppeals so it never makes a
 * separate Sanity call.
 *
 * No em dashes anywhere in this file.
 */
export async function getAppeals(): Promise<AppealEntry[]> {
  if (!sanityClient) {
    return SEED_APPEALS
  }

  try {
    const raw: unknown[] = await sanityClient.fetch(APPEALS_QUERY)
    if (!raw || raw.length === 0) return SEED_APPEALS
    return raw.map((item, index) => mapSanityAppeal(item, index))
  } catch {
    return SEED_APPEALS
  }
}

export async function getAppeal(slug: string): Promise<AppealEntry | undefined> {
  const appeals = await getAppeals()
  return appeals.find((a) => a.slug === slug)
}
