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
      useCdn: true,
    })
  : null
