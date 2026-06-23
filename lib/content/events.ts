import { sanityClient } from '@/sanity/client'
import { EVENTS_QUERY, mapSanityEvent } from '@/lib/sanity/events.query'
import { SEED_EVENTS } from './seed.collections'
import type { EventItem } from './types'

/**
 * Event collection read layer.
 *
 * The events list must always render. When Sanity is not configured the client
 * is null and we return the seed directly. When it is configured we fetch all
 * eventItem documents, map them into EventItem values, and fall back to the
 * seed on an error or an empty result so a misconfigured or unreachable CMS
 * never breaks a page.
 *
 * No em dashes anywhere in this file.
 */
export async function getEvents(): Promise<EventItem[]> {
  if (!sanityClient) {
    return SEED_EVENTS
  }

  try {
    const raw: unknown[] = await sanityClient.fetch(EVENTS_QUERY)
    if (!raw || raw.length === 0) return SEED_EVENTS
    return raw.map((item, index) => mapSanityEvent(item, index))
  } catch {
    return SEED_EVENTS
  }
}
