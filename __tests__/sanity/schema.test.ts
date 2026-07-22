import { describe, expect, test } from 'vitest'
import { schemaTypes } from '@/sanity/schemas'
import { homePage } from '@/sanity/schemas/homePage'

test('schema includes the homePage singleton', () => {
  const names = schemaTypes.map((t: { name: string }) => t.name)
  expect(names).toContain('homePage')
})

describe('homePage schema', () => {
  test('defines the six chapter fields', () => {
    const names = homePage.fields.map((f: { name: string }) => f.name)
    expect(names).toEqual(['hero', 'philosophy', 'expressions', 'possible', 'impact', 'invitation'])
  })
})
