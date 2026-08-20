import { describe, expect, test } from 'vitest'
import { SEED_HOME } from '@/lib/content/home.seed'

/**
 * The seed is the canonical v2 copy. These assertions pin the things a design
 * or copy edit must not break by accident: the headline the page is built
 * around, the routes every action points at, and the impact figures.
 */
describe('v2 homepage seed', () => {
  test('hero carries the v2 headline with its gold accent phrase', () => {
    expect(SEED_HOME.hero.heading).toEqual({ lead: 'A life', accent: 'beyond ourselves.' })
    expect(SEED_HOME.hero.primaryCta.href).toBe('/journey')
    expect(SEED_HOME.hero.secondaryCta.href).toBe('/stories')
  })

  test('the three expressions are numbered and route to their pages', () => {
    expect(SEED_HOME.expressions.cards.map((card) => card.index)).toEqual(['01', '02', '03'])
    expect(SEED_HOME.expressions.cards.map((card) => card.cta.href)).toEqual([
      '/tanzania',
      '/spain',
      '/get-involved/partner',
    ])
  })

  test('impact figures are numeric so the band can count up to them', () => {
    expect(SEED_HOME.impact.stats).toHaveLength(5)
    expect(SEED_HOME.impact.stats[0]).toEqual({
      key: 'people',
      value: 10000,
      suffix: '+',
      label: 'PEOPLE SUPPORTED',
    })
    // The shop count is exact, so it carries no "+".
    expect(SEED_HOME.impact.stats[3]).toEqual({
      key: 'shops',
      value: 2,
      suffix: '',
      label: 'CHARITY SHOPS',
    })
    for (const stat of SEED_HOME.impact.stats) {
      expect(typeof stat.value).toBe('number')
    }
  })

  test('stories lead with one feature and two supporting cards', () => {
    expect(SEED_HOME.stories.feature.title).toBe("Nacho's Story")
    expect(SEED_HOME.stories.cards).toHaveLength(2)
  })

  test('the closing band offers the journey and the charity shops', () => {
    expect(SEED_HOME.closing.primaryCta.href).toBe('/journey')
    expect(SEED_HOME.closing.secondaryCta.href).toBe('/charity-shops')
  })

  // Every image slot is filled from the design's own uploads, served locally —
  // nothing hotlinks back to the design project or to a stock host at runtime.
  test('every image is a local path under the design asset folder', () => {
    const images = [
      SEED_HOME.hero.image,
      SEED_HOME.via.image,
      SEED_HOME.impactCta.image,
      SEED_HOME.stories.feature.image,
      ...SEED_HOME.expressions.cards.map((card) => card.image),
      ...SEED_HOME.stories.cards.map((card) => card.image),
      ...SEED_HOME.partners.marks.flatMap((mark) => (mark.logo ? [mark.logo] : [])),
    ]
    for (const image of images) {
      expect(image).toMatch(/^\/design\//)
    }
  })
})
