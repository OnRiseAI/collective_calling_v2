/**
 * TDD test suite for sitemap + env-gated robots (Task 6).
 *
 * Step 1: Write tests first (RED state).
 * Step 3: Implement app/sitemap.ts and env-gated app/robots.ts (GREEN).
 *
 * No em dashes anywhere in this file.
 */
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'

// ---------------------------------------------------------------------------
// Mock the content read layers so the sitemap is deterministic.
// ---------------------------------------------------------------------------

vi.mock('@/lib/content/stories', () => ({
  getStories: vi.fn(async () => [
    {
      slug: 'caleb',
      title: 'Meet Caleb',
      location: 'tanzania',
      excerpt: 'Caleb was found in desperate need.',
      body: 'Caleb was born in a village near Kasulu town.',
      images: ['/images/tanzania/caleb-before.jpg'],
      placeholder: false,
    },
  ]),
  getStory: vi.fn(async () => undefined),
}))

vi.mock('@/lib/content/appeals', () => ({
  getAppeals: vi.fn(async () => [
    {
      slug: 'spain-homelessness',
      title: 'Restoring dignity in Spain',
      theme: 'spain',
      blurb: 'Mobile shower unit.',
      body: 'At Collective Calling, we believe everyone deserves dignity.',
      image: '/images/spain/hero-mobile-shower.jpg',
      alt: 'Mobile shower unit.',
      relatedHref: '/spain',
      donationDesignation: 'Spain',
    },
  ]),
  getAppeal: vi.fn(async () => undefined),
}))

// ---------------------------------------------------------------------------
// sitemap() tests
// ---------------------------------------------------------------------------

describe('sitemap()', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  test('includes the home route as an absolute URL', async () => {
    const { default: sitemap } = await import('@/app/sitemap')
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    const { SITE } = await import('@/lib/site')
    expect(urls).toContain(`${SITE.url}/`)
  })

  test('includes /stories/caleb', async () => {
    const { default: sitemap } = await import('@/app/sitemap')
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    const { SITE } = await import('@/lib/site')
    expect(urls).toContain(`${SITE.url}/stories/caleb`)
  })

  test('includes /appeals/spain-homelessness', async () => {
    const { default: sitemap } = await import('@/app/sitemap')
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    const { SITE } = await import('@/lib/site')
    expect(urls).toContain(`${SITE.url}/appeals/spain-homelessness`)
  })

  test('includes /get-involved', async () => {
    const { default: sitemap } = await import('@/app/sitemap')
    const entries = await sitemap()
    const urls = entries.map((e) => e.url)
    const { SITE } = await import('@/lib/site')
    expect(urls).toContain(`${SITE.url}/get-involved`)
  })

  test('contains NO /es URLs', async () => {
    const { default: sitemap } = await import('@/app/sitemap')
    const entries = await sitemap()
    const esUrls = entries.filter((e) => e.url.includes('/es'))
    expect(esUrls).toHaveLength(0)
  })

  test('contains NO /studio URLs', async () => {
    const { default: sitemap } = await import('@/app/sitemap')
    const entries = await sitemap()
    const studioUrls = entries.filter((e) => e.url.includes('/studio'))
    expect(studioUrls).toHaveLength(0)
  })

  test('every entry url is absolute (starts with SITE.url)', async () => {
    const { default: sitemap } = await import('@/app/sitemap')
    const entries = await sitemap()
    const { SITE } = await import('@/lib/site')
    for (const entry of entries) {
      expect(entry.url.startsWith(SITE.url)).toBe(true)
    }
  })
})

// ---------------------------------------------------------------------------
// robots() tests
// ---------------------------------------------------------------------------

describe('robots() - default (not indexable)', () => {
  beforeEach(() => {
    vi.resetModules()
    // Ensure the env var is NOT set.
    vi.stubEnv('NEXT_PUBLIC_SITE_INDEXABLE', '')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test('disallows / when NEXT_PUBLIC_SITE_INDEXABLE is unset', async () => {
    const { default: robots } = await import('@/app/robots')
    const result = robots()
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    expect(rules[0].disallow).toBe('/')
  })

  test('has no sitemap field when not indexable', async () => {
    const { default: robots } = await import('@/app/robots')
    const result = robots()
    expect(result.sitemap).toBeUndefined()
  })
})

describe('robots() - indexable (NEXT_PUBLIC_SITE_INDEXABLE=true)', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('NEXT_PUBLIC_SITE_INDEXABLE', 'true')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  test('allows / when NEXT_PUBLIC_SITE_INDEXABLE=true', async () => {
    const { default: robots } = await import('@/app/robots')
    const result = robots()
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    expect(rules[0].allow).toBe('/')
  })

  test('disallows /studio when indexable', async () => {
    const { default: robots } = await import('@/app/robots')
    const result = robots()
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    const disallow = rules[0].disallow
    const disallowArr = Array.isArray(disallow) ? disallow : [disallow]
    expect(disallowArr).toContain('/studio')
  })

  test('includes a sitemap field when indexable', async () => {
    const { default: robots } = await import('@/app/robots')
    const result = robots()
    expect(result.sitemap).toBeTruthy()
    expect(typeof result.sitemap === 'string' || Array.isArray(result.sitemap)).toBe(true)
  })

  test('sitemap field contains /sitemap.xml', async () => {
    const { default: robots } = await import('@/app/robots')
    const result = robots()
    const sitemapVal = result.sitemap
    const sitemapStr = Array.isArray(sitemapVal) ? sitemapVal[0] : sitemapVal as string
    expect(sitemapStr).toMatch(/\/sitemap\.xml$/)
  })
})
