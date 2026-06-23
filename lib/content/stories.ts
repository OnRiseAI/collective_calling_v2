import { sanityClient } from '@/sanity/client'
import { STORIES_QUERY, mapSanityStory } from '@/lib/sanity/stories.query'
import { SEED_STORIES } from './seed.collections'
import type { Story } from './types'

/**
 * Story collection read layer.
 *
 * The stories list must always render. When Sanity is not configured the client
 * is null and we return the seed directly. When it is configured we fetch all
 * story documents, map them into Story values, and fall back to the seed on an
 * error or an empty result so a misconfigured or unreachable CMS never breaks a
 * page.
 *
 * getStory resolves against the result of getStories so it never makes a
 * separate Sanity call.
 *
 * No em dashes anywhere in this file.
 */
export async function getStories(): Promise<Story[]> {
  if (!sanityClient) {
    return SEED_STORIES
  }

  try {
    const raw: unknown[] = await sanityClient.fetch(STORIES_QUERY)
    if (!raw || raw.length === 0) return SEED_STORIES
    return raw.map((item, index) => mapSanityStory(item, index))
  } catch {
    return SEED_STORIES
  }
}

export async function getStory(slug: string): Promise<Story | undefined> {
  const stories = await getStories()
  return stories.find((s) => s.slug === slug)
}
