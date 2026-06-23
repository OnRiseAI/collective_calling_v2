import { describe, expect, test } from 'vitest'
import { SEED_STORIES, SEED_APPEALS, SEED_EVENTS } from '@/lib/content/seed.collections'

describe('SEED_STORIES', () => {
  test('includes a real caleb story with placeholder falsy', () => {
    const caleb = SEED_STORIES.find((s) => s.slug === 'caleb')
    expect(caleb).toBeDefined()
    expect(caleb?.placeholder).toBeFalsy()
  })

  test('caleb story has a non-empty body', () => {
    const caleb = SEED_STORIES.find((s) => s.slug === 'caleb')
    expect(caleb?.body).toBeTruthy()
    expect(caleb?.body.length).toBeGreaterThan(0)
  })
})

describe('SEED_APPEALS', () => {
  test('includes spain-homelessness', () => {
    expect(SEED_APPEALS.find((a) => a.slug === 'spain-homelessness')).toBeDefined()
  })

  test('includes tanzania-children', () => {
    expect(SEED_APPEALS.find((a) => a.slug === 'tanzania-children')).toBeDefined()
  })

  test('includes sponsor-a-child with donorboxQuery.amount === 58', () => {
    const sponsor = SEED_APPEALS.find((a) => a.slug === 'sponsor-a-child')
    expect(sponsor).toBeDefined()
    expect(sponsor?.donorboxQuery?.amount).toBe(58)
  })

  test('includes greatest-need', () => {
    expect(SEED_APPEALS.find((a) => a.slug === 'greatest-need')).toBeDefined()
  })
})

describe('SEED_EVENTS', () => {
  test('includes annual-gala', () => {
    expect(SEED_EVENTS.find((e) => e.slug === 'annual-gala')).toBeDefined()
  })

  test('includes spring-fair', () => {
    expect(SEED_EVENTS.find((e) => e.slug === 'spring-fair')).toBeDefined()
  })

  test('includes lunch-with-santa', () => {
    expect(SEED_EVENTS.find((e) => e.slug === 'lunch-with-santa')).toBeDefined()
  })
})

describe('no em dashes in seed strings', () => {
  const EM_DASH = '—'

  function collectStrings(obj: unknown, path = ''): Array<{ path: string; value: string }> {
    if (typeof obj === 'string') return [{ path, value: obj }]
    if (Array.isArray(obj)) return obj.flatMap((item, i) => collectStrings(item, `${path}[${i}]`))
    if (obj && typeof obj === 'object') {
      return Object.entries(obj).flatMap(([k, v]) => collectStrings(v, `${path}.${k}`))
    }
    return []
  }

  test('SEED_STORIES contains no em dashes', () => {
    const strings = collectStrings(SEED_STORIES)
    const hits = strings.filter((s) => s.value.includes(EM_DASH))
    expect(hits).toHaveLength(0)
  })

  test('SEED_APPEALS contains no em dashes', () => {
    const strings = collectStrings(SEED_APPEALS)
    const hits = strings.filter((s) => s.value.includes(EM_DASH))
    expect(hits).toHaveLength(0)
  })

  test('SEED_EVENTS contains no em dashes', () => {
    const strings = collectStrings(SEED_EVENTS)
    const hits = strings.filter((s) => s.value.includes(EM_DASH))
    expect(hits).toHaveLength(0)
  })
})
