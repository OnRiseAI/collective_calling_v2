import { describe, expect, test } from 'vitest'
import { mapSanityHome } from '@/lib/sanity/home.query'
import { getHomeContent } from '@/lib/content/home'
import { SEED_HOME } from '@/lib/content/home.seed'
import { HOME_CONTENT_VERSION } from '@/lib/content/home.types'

// Every document the mapper should trust carries the current shape version.
const doc = (fields: Record<string, unknown>) => ({ version: HOME_CONTENT_VERSION, ...fields })

test('getHomeContent falls back to the seed when Sanity is unconfigured', async () => {
  const home = await getHomeContent()
  expect(home).toEqual(SEED_HOME) // env unset in tests => client null
})

describe('mapSanityHome', () => {
  test('null/empty doc maps to the full seed', () => {
    expect(mapSanityHome(null)).toEqual(SEED_HOME)
    expect(mapSanityHome({})).toEqual(SEED_HOME)
  })

  test('a document from an earlier shape is ignored, not merged', () => {
    // The v1 document shared these field names with the current model but not
    // their meaning, so merging it would put the previous design's copy into
    // this one. No version, or the wrong version, means seed only.
    const stale = {
      hero: { primaryCta: { label: 'Explore Our Impact', href: '/about/our-impact' } },
      via: { cta: { label: 'Discover VIA', href: '/get-involved/partner' } },
    }
    expect(mapSanityHome(stale)).toEqual(SEED_HOME)
    expect(mapSanityHome({ ...stale, version: 1 })).toEqual(SEED_HOME)
    // Stamped with the current version, the same overrides do apply.
    expect(mapSanityHome({ ...stale, version: HOME_CONTENT_VERSION }).hero.primaryCta.label).toBe(
      'Explore Our Impact',
    )
  })

  test('a partial doc falls back per-field to seed copy', () => {
    const mapped = mapSanityHome(doc({ hero: { heading: { lead: 'CMS lead' } } }))
    expect(mapped.hero.heading.lead).toBe('CMS lead')
    expect(mapped.hero.heading.accent).toBe(SEED_HOME.hero.heading.accent)
    expect(mapped.impact).toEqual(SEED_HOME.impact)
    expect(mapped.closing.secondaryCta.href).toBe('/charity-shops')
  })

  test('list entries override by index and keep the seed items beyond the doc', () => {
    const mapped = mapSanityHome(doc({ expressions: { cards: [{ title: 'New title' }] } }))
    expect(mapped.expressions.cards[0].title).toBe('New title')
    expect(mapped.expressions.cards[0].cta.href).toBe('/tanzania')
    expect(mapped.expressions.cards).toHaveLength(3)
  })

  test('an impact figure keeps its numeric type and can be given an empty suffix', () => {
    const mapped = mapSanityHome(doc({ impact: { stats: [{ value: 12345, suffix: '' }] } }))
    expect(mapped.impact.stats[0].value).toBe(12345)
    expect(mapped.impact.stats[0].suffix).toBe('')
    // A non-numeric figure is rejected rather than rendered.
    expect(
      mapSanityHome(doc({ impact: { stats: [{ value: 'lots' }] } })).impact.stats[0].value,
    ).toBe(SEED_HOME.impact.stats[0].value)
  })

  test('a partner without a logo stays a named mark', () => {
    const mapped = mapSanityHome(doc({ partners: { marks: [{ name: 'A' }, { name: 'B' }] } }))
    expect(mapped.partners.marks[0].name).toBe('A')
    expect(mapped.partners.marks[0].logo).toBe(SEED_HOME.partners.marks[0].logo)
    expect(mapped.partners.marks[2].logo).toBeUndefined()
  })
})
