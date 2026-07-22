import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId } from './env'

// The Sanity client is only created when a project is configured. Calling
// createClient with an undefined projectId would throw, so we gate on
// isSanityConfigured() and export null otherwise. This keeps imports safe at
// build time and in tests when no project exists yet.
export const sanityClient: SanityClient | null = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // The site is fully static: every Sanity read happens at build time, so
      // the CDN saves nothing and its cache lag can bake a stale document into
      // a build (observed after re-seeding). Read the live API instead.
      useCdn: false,
    })
  : null
