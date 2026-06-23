import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import { getStories } from '@/lib/content/stories'
import { getAppeals } from '@/lib/content/appeals'

// Static en-only routes. No /es entries until Spanish content exists.
// No /studio (Sanity admin is not a public route).
const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about/who-we-are', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about/what-we-do', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about/our-impact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about/our-team', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about/financial-accountability', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/about/partners', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/spain', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tanzania', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/donate', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/donate/ways-to-give', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/get-involved', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/get-involved/sponsor-a-child', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/get-involved/fundraise', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/get-involved/pray', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/get-involved/partner', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/get-involved/invite-us-to-speak', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/stories', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/appeals', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/events', priority: 0.7, changeFrequency: 'weekly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const [stories, appeals] = await Promise.all([getStories(), getAppeals()])

  const storyEntries: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${SITE.url}/stories/${story.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const appealEntries: MetadataRoute.Sitemap = appeals.map((appeal) => ({
    url: `${SITE.url}/appeals/${appeal.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...storyEntries, ...appealEntries]
}
