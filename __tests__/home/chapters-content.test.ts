import { describe, expect, test } from 'vitest'
import { SEED_HOME } from '@/lib/content/home.seed'

describe('mockup-theme homepage seed', () => {
  test('hero carries the mockup headline with the gold accent word', () => {
    expect(SEED_HOME.hero.headlineLead).toBe('Where Values Become')
    expect(SEED_HOME.hero.headlineAccent).toBe('Visible.')
    expect(SEED_HOME.hero.primaryCta.href).toBe('/about/our-impact')
    expect(SEED_HOME.hero.secondaryCta.href).toBe('/get-involved/partner')
  })

  test('three ways cards route to their real pages', () => {
    expect(SEED_HOME.ways.cards.map((c) => c.href)).toEqual([
      '/spain',
      '/tanzania',
      '/get-involved/partner',
    ])
  })

  test('snapshot carries the five mockup stats in order', () => {
    expect(SEED_HOME.snapshot.stats).toHaveLength(5)
    expect(SEED_HOME.snapshot.stats[0]).toEqual({
      icon: 'people',
      value: '10,000+',
      label: 'People Supported',
    })
    expect(SEED_HOME.snapshot.stats[3].value).toBe('2')
  })

  test('involve band routes donate/volunteer/partner and the shops panel', () => {
    expect(SEED_HOME.involve.actions.map((a) => a.href)).toEqual([
      '/donate',
      '/get-involved',
      '/get-involved/partner',
    ])
    expect(SEED_HOME.involve.shops.cta.href).toBe('/charity-shops')
  })

  test('every seeded image path exists under public/', async () => {
    const { existsSync } = await import('node:fs')
    const { join } = await import('node:path')
    const images = [
      SEED_HOME.hero.image,
      SEED_HOME.via.image,
      SEED_HOME.involve.image,
      ...SEED_HOME.ways.cards.map((c) => c.image),
    ]
    for (const image of images) {
      expect(existsSync(join(process.cwd(), 'public', image)), image).toBe(true)
    }
  })
})
