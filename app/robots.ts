import type { MetadataRoute } from 'next'
import { SITE, isIndexable } from '@/lib/site'

// Site is non-indexable by default. Set NEXT_PUBLIC_SITE_INDEXABLE=true
// only on the production domain at launch.
export default function robots(): MetadataRoute.Robots {
  if (isIndexable) {
    return {
      rules: [{ userAgent: '*', allow: '/', disallow: ['/studio', '/api', '/editor-test'] }],
      sitemap: `${SITE.url}/sitemap.xml`,
    }
  }

  return { rules: [{ userAgent: '*', disallow: '/' }] }
}
