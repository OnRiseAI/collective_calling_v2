import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, isSanityConfigured, projectId } from './env'

/**
 * Server-only draft client. Do not import this module from client components:
 * it reads SANITY_API_READ_TOKEN.
 */
export function getPreviewSanityClient(): SanityClient | null {
  if (!isSanityConfigured() || !projectId) return null
  const token = process.env.SANITY_API_READ_TOKEN
  if (typeof token !== 'string' || token.length === 0) return null
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: 'previewDrafts',
    stega: false,
  })
}

export function hasPreviewReadToken(): boolean {
  const token = process.env.SANITY_API_READ_TOKEN
  return typeof token === 'string' && token.length > 0
}

export function getPreviewSecret(): string | undefined {
  const secret = process.env.SANITY_PREVIEW_SECRET
  return typeof secret === 'string' && secret.length > 0 ? secret : undefined
}
