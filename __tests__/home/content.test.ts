import { describe, expect, test } from 'vitest'
import { getHomeContent } from '@/lib/content/home'
import { donorboxUrl } from '@/lib/donate'

describe('home content layer', () => {
  test('returns three impact stats', async () => {
    const content = await getHomeContent()
    expect(content.impactStats).toHaveLength(3)
  })

  test('returns three appeals themed spain, tanzania, and general', async () => {
    const content = await getHomeContent()
    expect(content.appeals).toHaveLength(3)
    const themes = content.appeals.map((appeal) => appeal.theme)
    expect(themes).toContain('spain')
    expect(themes).toContain('tanzania')
    expect(themes).toContain('general')
  })

  test('money split sums to 100 percent', async () => {
    const content = await getHomeContent()
    expect(content.money.programsPct + content.money.adminPct).toBe(100)
  })

  test('every testimonial is flagged as a placeholder', async () => {
    const content = await getHomeContent()
    expect(content.testimonials.length).toBeGreaterThan(0)
    for (const testimonial of content.testimonials) {
      expect(testimonial.placeholder).toBe(true)
    }
  })
})

describe('donorbox url helper', () => {
  test('builds a monthly tier url with amount and recurring flag', () => {
    const url = donorboxUrl(58, 'monthly')
    expect(url).toContain('amount=58')
    expect(url).toContain('recurring=true')
  })
})
