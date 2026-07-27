import { describe, expect, test } from 'vitest'
import { getHomeContent } from '@/lib/content/home'
import { SEED_HOME } from '@/lib/content/home.seed'
import { donorboxUrl } from '@/lib/donate'

describe('home content layer', () => {
  test('returns the canonical seed when Sanity is unconfigured', async () => {
    const content = await getHomeContent()
    expect(content).toEqual(SEED_HOME)
    expect(content.hero.heading.lead).toBe('A life')
  })

  test('exposes the nine v2 bands in page order', async () => {
    const content = await getHomeContent()
    expect(Object.keys(content)).toEqual([
      'hero',
      'philosophy',
      'expressions',
      'via',
      'impact',
      'stories',
      'impactCta',
      'partners',
      'closing',
    ])
  })
})

describe('donorbox url helper', () => {
  test('builds a monthly tier url with amount and recurring flag', () => {
    const url = donorboxUrl(58, 'monthly')
    expect(url).toContain('amount=58')
    expect(url).toContain('recurring=true')
  })
})
