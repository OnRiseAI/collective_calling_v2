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

  test('a stale doc missing new fields falls back per-field to seed copy', () => {
    const mapped = mapSanityHome({ hero: { headline: 'CMS headline' } })
    expect(mapped.hero.headline).toBe('CMS headline')
    expect(mapped.hero.text).toEqual(SEED_HOME.hero.text)
    expect(mapped.philosophy).toEqual(SEED_HOME.philosophy)
    expect(mapped.invitation.cta.href).toBe('/get-involved')
  })

  test('expression rows override by index and keep seed rows beyond the doc', () => {
    const mapped = mapSanityHome({
      expressions: { rows: [{ heading: 'New heading' }] },
    })
    expect(mapped.expressions.rows[0].heading).toBe('New heading')
    expect(mapped.expressions.rows[0].cta.href).toBe('/stories')
    expect(mapped.expressions.rows).toHaveLength(3)
  })
})
