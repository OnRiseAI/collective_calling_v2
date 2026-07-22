import { describe, expect, test } from 'vitest'
import { getHomeContent } from '@/lib/content/home'
import { SEED_HOME } from '@/lib/content/home.seed'
import { donorboxUrl } from '@/lib/donate'

describe('home content layer', () => {
  test('returns the canonical seed when Sanity is unconfigured', async () => {
    const content = await getHomeContent()
    expect(content).toEqual(SEED_HOME)
    expect(content.hero.headline).toBe('A Life Beyond Ourselves')
  })

  test('exposes all six chapters', async () => {
    const content = await getHomeContent()
    expect(Object.keys(content)).toEqual([
      'hero',
      'philosophy',
      'expressions',
      'possible',
      'impact',
      'invitation',
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
