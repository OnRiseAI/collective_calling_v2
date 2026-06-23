import { describe, expect, test } from 'vitest'
import { pageMetadata } from '@/lib/seo'

/**
 * TDD test suite for per-page metadata (Task 4).
 *
 * Step 1: Write tests first (RED state).
 * Step 3: Implement lib/seo.ts and page generateMetadata exports (GREEN).
 */

// ---------------------------------------------------------------------------
// Unit tests for the pageMetadata helper itself
// ---------------------------------------------------------------------------

describe('pageMetadata helper', () => {
  test('canonical is an absolute URL', () => {
    const meta = pageMetadata({
      locale: 'en',
      path: '/spain',
      title: 'Spain',
      description: 'A warm shower for the homeless.',
    })
    const canonical = (meta.alternates as { canonical: string }).canonical
    expect(canonical).toMatch(/^https?:\/\//)
  })

  test('canonical ends with the supplied path', () => {
    const meta = pageMetadata({
      locale: 'en',
      path: '/get-involved/fundraise',
      title: 'Fundraise',
      description: 'Every fundraiser keeps the work going.',
    })
    const canonical = (meta.alternates as { canonical: string }).canonical
    expect(canonical).toMatch(/\/get-involved\/fundraise$/)
  })

  test('does NOT emit alternates.languages.es', () => {
    const meta = pageMetadata({
      locale: 'en',
      path: '/spain',
      title: 'Spain',
      description: 'A warm shower for the homeless.',
    })
    const languages = (meta.alternates as { languages?: unknown }).languages
    expect(languages).toBeUndefined()
  })

  test('openGraph url matches canonical', () => {
    const meta = pageMetadata({
      locale: 'en',
      path: '/about',
      title: 'About',
      description: 'About Collective Calling.',
    })
    const canonical = (meta.alternates as { canonical: string }).canonical
    expect((meta.openGraph as { url: string }).url).toBe(canonical)
  })

  test('openGraph images falls back to SITE.ogImage when no image provided', () => {
    const meta = pageMetadata({
      locale: 'en',
      path: '/contact',
      title: 'Contact',
      description: 'Get in touch.',
    })
    const images = (meta.openGraph as { images: string[] }).images
    expect(images.length).toBeGreaterThan(0)
    expect(typeof images[0]).toBe('string')
  })

  test('openGraph images uses provided image when supplied', () => {
    const meta = pageMetadata({
      locale: 'en',
      path: '/spain',
      title: 'Spain',
      description: 'Mobile shower.',
      image: '/images/spain/hero-mobile-shower.jpg',
    })
    const images = (meta.openGraph as { images: string[] }).images
    expect(images[0]).toBe('/images/spain/hero-mobile-shower.jpg')
  })

  test('twitter card is summary_large_image', () => {
    const meta = pageMetadata({
      locale: 'en',
      path: '/tanzania',
      title: 'Tanzania',
      description: 'Rescuing children.',
    })
    expect((meta.twitter as { card: string }).card).toBe('summary_large_image')
  })
})

// ---------------------------------------------------------------------------
// Integration tests: generateMetadata exports from representative pages
// ---------------------------------------------------------------------------

describe('spain page generateMetadata', () => {
  test('returns a non-generic title', async () => {
    const { generateMetadata } = await import('@/app/[locale]/spain/page')
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })
    expect(meta.title).toBeTruthy()
    expect(meta.title).not.toBe('Collective Calling')
  })

  test('returns a non-empty description', async () => {
    const { generateMetadata } = await import('@/app/[locale]/spain/page')
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })
    expect(typeof meta.description).toBe('string')
    expect((meta.description as string).length).toBeGreaterThan(0)
  })

  test('canonical ends with /spain', async () => {
    const { generateMetadata } = await import('@/app/[locale]/spain/page')
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })
    const canonical = (meta.alternates as { canonical: string }).canonical
    expect(canonical).toMatch(/\/spain$/)
  })
})

describe('fundraise page generateMetadata', () => {
  test('returns a non-generic title', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/get-involved/fundraise/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })
    expect(meta.title).toBeTruthy()
    expect(meta.title).not.toBe('Collective Calling')
  })

  test('returns a non-empty description', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/get-involved/fundraise/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })
    expect(typeof meta.description).toBe('string')
    expect((meta.description as string).length).toBeGreaterThan(0)
  })

  test('canonical ends with /get-involved/fundraise', async () => {
    const { generateMetadata } = await import(
      '@/app/[locale]/get-involved/fundraise/page'
    )
    const meta = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })
    const canonical = (meta.alternates as { canonical: string }).canonical
    expect(canonical).toMatch(/\/get-involved\/fundraise$/)
  })
})
