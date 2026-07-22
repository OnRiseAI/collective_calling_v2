import { describe, expect, test } from 'vitest'
import { SEED_HOME } from '@/lib/content/home.seed'

describe('experience-led homepage seed', () => {
  test('hero carries the client headline and scroll targets', () => {
    expect(SEED_HOME.hero.headline).toBe('A Life Beyond Ourselves')
    expect(SEED_HOME.hero.primaryCta).toEqual({ label: 'Start Your Journey', targetId: 'participation' })
    expect(SEED_HOME.hero.secondaryCta).toEqual({ label: 'See What’s Possible', targetId: 'possibility' })
  })

  test('expressions carry the three branches with real routes', () => {
    const hrefs = SEED_HOME.expressions.rows.map((r) => r.cta.href)
    expect(hrefs).toEqual(['/stories', '/spain', '/get-involved/partner'])
    expect(SEED_HOME.expressions.rows.map((r) => r.key)).toEqual([
      'children-families',
      'community',
      'business',
    ])
  })

  test('impact lists the five coming-together moments in order', () => {
    expect(SEED_HOME.impact.moments).toHaveLength(5)
    expect(SEED_HOME.impact.moments[0]).toBe('A person shares their time.')
    expect(SEED_HOME.impact.moments[4]).toBe('A simple action becomes part of something bigger.')
  })

  test('invitation routes to get-involved', () => {
    expect(SEED_HOME.invitation.cta).toEqual({ label: 'Start Your Journey', href: '/get-involved' })
  })

  test('every seeded image path exists under public/', async () => {
    const { existsSync } = await import('node:fs')
    const { join } = await import('node:path')
    const images = [SEED_HOME.hero.image, ...SEED_HOME.expressions.rows.map((r) => r.image)]
    for (const image of images) {
      expect(existsSync(join(process.cwd(), 'public', image)), image).toBe(true)
    }
  })
})
