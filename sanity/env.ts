// Sanity environment configuration.
//
// These values are read from the environment and are safe to evaluate at import
// time. When no Sanity project is configured (the usual state before a project
// exists), projectId stays undefined and isSanityConfigured() returns false so
// downstream modules can avoid creating a client.

export const projectId: string | undefined =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export const dataset: string =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const apiVersion: string =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01'

// True only when a non-empty project id is present. Everything that talks to
// Sanity gates on this so the app builds and runs with no project configured.
export function isSanityConfigured(): boolean {
  return typeof projectId === 'string' && projectId.length > 0
}
