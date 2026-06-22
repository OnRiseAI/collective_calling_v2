import type { MetadataRoute } from 'next'

// Preview builds must stay non-indexable until launch (Plan 6).
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', disallow: '/' }] }
}
