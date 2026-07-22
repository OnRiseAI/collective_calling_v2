import { describe, expect, test } from 'vitest'
import { mapSanityHome } from '@/lib/sanity/home.query'
import { getHomeContent } from '@/lib/content/home'
import { SEED_HOME } from '@/lib/content/home.seed'

test('getHomeContent falls back to the seed when Sanity is unconfigured', async () => {
  const home = await getHomeContent()
  expect(home).toEqual(SEED_HOME) // env unset in tests => client null
})

describe('mapSanityHome', () => {
  test('null/empty doc maps to the full seed', () => {
    expect(mapSanityHome(null)).toEqual(SEED_HOME)
    expect(mapSanityHome({})).toEqual(SEED_HOME)
  })

  test('a partial doc falls back per-field to seed copy', () => {
    const mapped = mapSanityHome({ hero: { headlineLead: 'CMS lead' } })
    expect(mapped.hero.headlineLead).toBe('CMS lead')
    expect(mapped.hero.headlineAccent).toBe(SEED_HOME.hero.headlineAccent)
    expect(mapped.snapshot).toEqual(SEED_HOME.snapshot)
    expect(mapped.involve.shops.cta.href).toBe('/charity-shops')
  })

  test('way cards override by index and keep seed cards beyond the doc', () => {
    const mapped = mapSanityHome({ ways: { cards: [{ title: 'New title' }] } })
    expect(mapped.ways.cards[0].title).toBe('New title')
    expect(mapped.ways.cards[0].href).toBe('/spain')
    expect(mapped.ways.cards).toHaveLength(3)
  })
})
