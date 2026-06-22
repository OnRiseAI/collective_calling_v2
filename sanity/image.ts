import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url'

import { sanityClient } from './client'

// The builder needs a configured client. When Sanity is not configured the
// client is null, so the builder stays null and urlForImage returns undefined
// rather than throwing.
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

// Resolve a Sanity image source to a URL string. Returns undefined when Sanity
// is unconfigured or when no source is provided, so callers can render a
// fallback without any try/catch.
export function urlForImage(
  source: SanityImageSource | undefined,
): string | undefined {
  if (!builder || !source) {
    return undefined
  }

  return builder.image(source).url()
}
