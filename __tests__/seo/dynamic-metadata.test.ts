/**
 * TDD test suite for dynamic-page metadata + Article JSON-LD (Task 5).
 *
 * Step 1: Write tests first (RED state).
 * Step 3: Implement generateMetadata on story/appeal pages + articleJsonLd (GREEN).
 *
 * No em dashes anywhere in this file.
 */
import { describe, expect, test, vi, beforeEach } from 'vitest'

// ---------------------------------------------------------------------------
// Mock the content read layers so tests never hit Sanity or the seed directly.
// ---------------------------------------------------------------------------

vi.mock('@/lib/content/stories', () => ({
  getStory: vi.fn(async (slug: string) => {
    if (slug === 'caleb') {
      return {
        slug: 'caleb',
        title: 'Meet Caleb',
        location: 'tanzania',
        excerpt:
          'Caleb was found in desperate need with his brothers and sisters after their older brother fell ill. Today he is thriving at the Centre of Hope, enrolled in school, and smiling.',
        body: 'Caleb was born in a village near Kasulu town.',
        images: [
          '/images/tanzania/caleb-before.jpg',
          '/images/tanzania/caleb-after.jpg',
        ],
        placeholder: false,
      }
    }
    return undefined
  }),
  getStories: vi.fn(async () => []),
}))

vi.mock('@/lib/content/appeals', () => ({
  getAppeal: vi.fn(async (slug: string) => {
    if (slug === 'sponsor-a-child') {
      return {
        slug: 'sponsor-a-child',
        title: 'Sponsor a child',
        theme: 'general',
        blurb:
          'For EUR 58 a month you can give a child at the Centre of Hope the food, shelter, medical care, schooling, and counselling that gives them the chance to heal and go home.',
        body: 'Sponsoring a child means giving them everything they need.',
        image: '/images/tanzania/caleb-after.jpg',
        alt: 'Caleb, thriving and smiling at the Centre of Hope in Tanzania.',
        relatedHref: '/get-involved/sponsor-a-child',
        donationDesignation: 'Sponsor A Child',
      }
    }
    return undefined
  }),
  getAppeals: vi.fn(async () => []),
}))

// ---------------------------------------------------------------------------
// Story page generateMetadata
// ---------------------------------------------------------------------------

describe('story page generateMetadata', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  test('caleb: title contains the story title', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/stories/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'caleb' }),
    })
    expect(meta.title).toContain('Meet Caleb')
  })

  test('caleb: description is the excerpt', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/stories/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'caleb' }),
    })
    expect(meta.description).toContain('Caleb was found in desperate need')
  })

  test('caleb: alternates.canonical ends with /stories/caleb', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/stories/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'caleb' }),
    })
    const canonical = (meta.alternates as { canonical: string }).canonical
    expect(canonical).toMatch(/\/stories\/caleb$/)
  })

  test('caleb: og image is the story image', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/stories/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'caleb' }),
    })
    const images = (meta.openGraph as { images: string[] }).images
    expect(images[0]).toBe('/images/tanzania/caleb-before.jpg')
  })

  test('unknown slug: returns safe fallback title without throwing', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/stories/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'does-not-exist' }),
    })
    expect(meta.title).toBe('Collective Calling')
  })
})

// ---------------------------------------------------------------------------
// Appeal page generateMetadata
// ---------------------------------------------------------------------------

describe('appeal page generateMetadata', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  test('sponsor-a-child: title is present', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/appeals/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'sponsor-a-child' }),
    })
    expect(meta.title).toBeTruthy()
  })

  test('sponsor-a-child: description is present', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/appeals/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'sponsor-a-child' }),
    })
    expect(typeof meta.description).toBe('string')
    expect((meta.description as string).length).toBeGreaterThan(0)
  })

  test('sponsor-a-child: canonical ends with /appeals/sponsor-a-child', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/appeals/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'sponsor-a-child' }),
    })
    const canonical = (meta.alternates as { canonical: string }).canonical
    expect(canonical).toMatch(/\/appeals\/sponsor-a-child$/)
  })

  test('unknown slug: returns safe fallback without throwing', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/appeals/[slug]/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'does-not-exist' }),
    })
    expect(meta.title).toBe('Collective Calling')
  })
})

// ---------------------------------------------------------------------------
// articleJsonLd
// ---------------------------------------------------------------------------

describe('articleJsonLd', () => {
  test('has @type Article', async () => {
    const { articleJsonLd } = await import('@/lib/jsonld')
    const ld = articleJsonLd({
      title: 'Meet Caleb',
      description: 'A story of hope.',
      url: 'https://collectivecalling.org/stories/caleb',
      image: '/images/tanzania/caleb-before.jpg',
    }) as Record<string, unknown>
    expect(ld['@type']).toBe('Article')
  })

  test('has a publisher with @type Organization', async () => {
    const { articleJsonLd } = await import('@/lib/jsonld')
    const ld = articleJsonLd({
      title: 'Meet Caleb',
      description: 'A story of hope.',
      url: 'https://collectivecalling.org/stories/caleb',
    }) as Record<string, unknown>
    const publisher = ld['publisher'] as Record<string, unknown>
    expect(publisher).toBeTruthy()
    expect(publisher['@type']).toBe('Organization')
  })

  test('has @context https://schema.org', async () => {
    const { articleJsonLd } = await import('@/lib/jsonld')
    const ld = articleJsonLd({
      title: 'Meet Caleb',
      description: 'A story of hope.',
      url: 'https://collectivecalling.org/stories/caleb',
    }) as Record<string, unknown>
    expect(ld['@context']).toBe('https://schema.org')
  })

  test('headline matches the supplied title', async () => {
    const { articleJsonLd } = await import('@/lib/jsonld')
    const ld = articleJsonLd({
      title: 'Meet Caleb',
      description: 'A story of hope.',
      url: 'https://collectivecalling.org/stories/caleb',
    }) as Record<string, unknown>
    expect(ld['headline']).toBe('Meet Caleb')
  })

  test('includes image when provided', async () => {
    const { articleJsonLd } = await import('@/lib/jsonld')
    const ld = articleJsonLd({
      title: 'Meet Caleb',
      description: 'A story of hope.',
      url: 'https://collectivecalling.org/stories/caleb',
      image: '/images/tanzania/caleb-before.jpg',
    }) as Record<string, unknown>
    expect(ld['image']).toBe('/images/tanzania/caleb-before.jpg')
  })

  test('omits image when not provided', async () => {
    const { articleJsonLd } = await import('@/lib/jsonld')
    const ld = articleJsonLd({
      title: 'Meet Caleb',
      description: 'A story of hope.',
      url: 'https://collectivecalling.org/stories/caleb',
    }) as Record<string, unknown>
    expect(Object.prototype.hasOwnProperty.call(ld, 'image')).toBe(false)
  })
})
