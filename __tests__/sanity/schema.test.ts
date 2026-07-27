import { describe, expect, test } from 'vitest'
import { schemaTypes } from '@/sanity/schemas'
import { homePage } from '@/sanity/schemas/homePage'
import { SEED_HOME } from '@/lib/content/home.seed'
import { HOME_CONTENT_VERSION } from '@/lib/content/home.types'

test('schema includes the homePage singleton', () => {
  const names = schemaTypes.map((t: { name: string }) => t.name)
  expect(names).toContain('homePage')
})

describe('homePage schema', () => {
  // The document opens with the shape-version stamp, then the bands.
  const bandNames = () =>
    homePage.fields.map((f: { name: string }) => f.name).filter((name) => name !== 'version')

  test('it stamps the content shape version', () => {
    const version = homePage.fields.find((f: { name: string }) => f.name === 'version')
    expect(version).toBeDefined()
    expect((version as { initialValue?: number }).initialValue).toBe(HOME_CONTENT_VERSION)
  })

  test('its fields are the nine v2 bands, in page order', () => {
    const names = bandNames()
    expect(names).toEqual([
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

  test('the document shape matches the content model it has to fill', () => {
    expect(bandNames()).toEqual(Object.keys(SEED_HOME))
  })

  test('every object type the document references is registered', () => {
    const registered = new Set(schemaTypes.map((t: { name: string }) => t.name))
    for (const field of homePage.fields as { name: string; type: string }[]) {
      if (field.name === 'version') continue
      expect(registered).toContain(field.type)
    }
  })
})
