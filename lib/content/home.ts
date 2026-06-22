import { sanityClient } from '@/sanity/client'
import { HOME_QUERY, mapSanityHome } from '@/lib/sanity/home.query'
import { SEED_HOME } from './seed'
import type { HomeContent } from './types'

/**
 * Homepage content read layer.
 *
 * The homepage must always render. When Sanity is not configured the client is
 * null and we return the seed directly. When it is configured we fetch the
 * singleton, mapping it into HomeContent; any null result or thrown error falls
 * back to the seed so a misconfigured or unreachable CMS never breaks the page.
 */
export async function getHomeContent(): Promise<HomeContent> {
  if (!sanityClient) {
    return SEED_HOME
  }

  try {
    const raw = await sanityClient.fetch(HOME_QUERY)
    return raw ? mapSanityHome(raw) : SEED_HOME
  } catch {
    return SEED_HOME
  }
}
