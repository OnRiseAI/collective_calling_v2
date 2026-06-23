/**
 * TDD: Site config + Organization JSON-LD + JsonLd component
 *
 * Write RED first, then implement to GREEN.
 */
import { describe, it, expect, afterEach } from 'vitest'
import { render } from '@testing-library/react'

// ---------------------------------------------------------------------------
// SITE config
// ---------------------------------------------------------------------------
describe('SITE config', () => {
  afterEach(() => {
    // Clean env between tests
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  it('falls back to the canonical URL when env is unset', async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    // Re-import to pick up the env state (vitest caches modules so we use vi.resetModules)
    const { vi } = await import('vitest')
    vi.resetModules()
    const { SITE } = await import('@/lib/site')
    expect(SITE.url).toBe('https://collectivecalling.org')
  })

  it('has the correct name', async () => {
    const { SITE } = await import('@/lib/site')
    expect(SITE.name).toBe('Collective Calling')
  })

  it('isIndexable defaults to false when env is unset', async () => {
    delete process.env.NEXT_PUBLIC_SITE_INDEXABLE
    const { vi } = await import('vitest')
    vi.resetModules()
    const { isIndexable } = await import('@/lib/site')
    expect(isIndexable).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// organizationJsonLd
// ---------------------------------------------------------------------------
describe('organizationJsonLd()', () => {
  it('has @context https://schema.org', async () => {
    const { organizationJsonLd } = await import('@/lib/jsonld')
    const ld = organizationJsonLd() as Record<string, unknown>
    expect(ld['@context']).toBe('https://schema.org')
  })

  it('has name Collective Calling', async () => {
    const { organizationJsonLd } = await import('@/lib/jsonld')
    const ld = organizationJsonLd() as Record<string, unknown>
    expect(ld['name']).toBe('Collective Calling')
  })

  it('contains registration 611.510 in identifier', async () => {
    const { organizationJsonLd } = await import('@/lib/jsonld')
    const ld = organizationJsonLd() as Record<string, unknown>
    // Registration lives inside the identifier field
    const serialized = JSON.stringify(ld)
    expect(serialized).toContain('611.510')
  })

  it('sameAs includes the Facebook URL', async () => {
    const { organizationJsonLd } = await import('@/lib/jsonld')
    const ld = organizationJsonLd() as Record<string, unknown>
    const sameAs = ld['sameAs'] as string[]
    expect(Array.isArray(sameAs)).toBe(true)
    expect(sameAs).toContain('https://www.facebook.com/collectivecalling')
  })

  it('does NOT contain a fabricated founder person', async () => {
    const { organizationJsonLd } = await import('@/lib/jsonld')
    const ld = organizationJsonLd() as Record<string, unknown>
    // There must be no "founder" key in the top-level JSON-LD
    expect(Object.prototype.hasOwnProperty.call(ld, 'founder')).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// JsonLd component
// ---------------------------------------------------------------------------
describe('JsonLd component', () => {
  it('renders a script[type="application/ld+json"] with serialized JSON', async () => {
    const { JsonLd } = await import('@/components/seo/JsonLd')
    const data = { a: 1 }
    const { container } = render(<JsonLd data={data} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    expect(script!.textContent).toBe(JSON.stringify(data))
  })
})
