import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

/**
 * Builds the standard Next.js Metadata object for a static page.
 *
 * Canonical URL is always absolute, built from SITE.url + path. For `en` the
 * path is used as-is (e.g. `/spain`, `/get-involved/fundraise`).
 *
 * // TODO(plan 11): add alternates.languages for es once Spanish content exists
 */
export function pageMetadata(opts: {
  locale: string
  path: string
  title: string
  description?: string
  image?: string
}): Metadata {
  const { path, title, image } = opts
  const description = opts.description ?? ''
  const canonical = `${SITE.url}${path}`
  const ogImage = image ?? SITE.ogImage

  return {
    title,
    description,
    alternates: {
      canonical,
      // TODO(plan 11): add alternates.languages for es once Spanish content exists
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
