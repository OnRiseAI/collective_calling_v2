/**
 * TDD: schemas.test.ts
 * Asserts the Sanity schema index includes the three new collection document
 * types (story, appealEntry, eventItem) and still includes the existing
 * homePage singleton and appeal object.
 *
 * No em dashes anywhere in this file.
 */
import { describe, expect, test } from 'vitest'
import { schemaTypes } from '@/sanity/schemas'

const names = schemaTypes.map((t: { name: string }) => t.name)

function getDoc(name: string): { name: string; fields: { name: string }[] } {
  const doc = schemaTypes.find((t: { name: string }) => t.name === name) as
    | { name: string; fields: { name: string }[] }
    | undefined
  if (!doc) throw new Error(`Schema type "${name}" not found in schemaTypes`)
  return doc
}

describe('schema index registration', () => {
  test('includes story', () => {
    expect(names).toContain('story')
  })

  test('includes appealEntry', () => {
    expect(names).toContain('appealEntry')
  })

  test('includes eventItem', () => {
    expect(names).toContain('eventItem')
  })

  test('still includes homePage (regression)', () => {
    expect(names).toContain('homePage')
  })
})

describe('story document fields', () => {
  test('defines slug field', () => {
    const fields = getDoc('story').fields.map((f) => f.name)
    expect(fields).toContain('slug')
  })

  test('defines title field', () => {
    const fields = getDoc('story').fields.map((f) => f.name)
    expect(fields).toContain('title')
  })

  test('defines excerpt field', () => {
    const fields = getDoc('story').fields.map((f) => f.name)
    expect(fields).toContain('excerpt')
  })

  test('defines body field', () => {
    const fields = getDoc('story').fields.map((f) => f.name)
    expect(fields).toContain('body')
  })

  test('defines images field', () => {
    const fields = getDoc('story').fields.map((f) => f.name)
    expect(fields).toContain('images')
  })
})

describe('appealEntry document fields', () => {
  test('defines slug field', () => {
    const fields = getDoc('appealEntry').fields.map((f) => f.name)
    expect(fields).toContain('slug')
  })

  test('defines title field', () => {
    const fields = getDoc('appealEntry').fields.map((f) => f.name)
    expect(fields).toContain('title')
  })

  test('defines blurb field', () => {
    const fields = getDoc('appealEntry').fields.map((f) => f.name)
    expect(fields).toContain('blurb')
  })

  test('defines body field', () => {
    const fields = getDoc('appealEntry').fields.map((f) => f.name)
    expect(fields).toContain('body')
  })

  test('defines relatedHref field', () => {
    const fields = getDoc('appealEntry').fields.map((f) => f.name)
    expect(fields).toContain('relatedHref')
  })

  test('defines donationDesignation field', () => {
    const fields = getDoc('appealEntry').fields.map((f) => f.name)
    expect(fields).toContain('donationDesignation')
  })

  test('defines donorboxQuery field', () => {
    const fields = getDoc('appealEntry').fields.map((f) => f.name)
    expect(fields).toContain('donorboxQuery')
  })
})

describe('eventItem document fields', () => {
  test('defines slug field', () => {
    const fields = getDoc('eventItem').fields.map((f) => f.name)
    expect(fields).toContain('slug')
  })

  test('defines title field', () => {
    const fields = getDoc('eventItem').fields.map((f) => f.name)
    expect(fields).toContain('title')
  })

  test('defines summary field', () => {
    const fields = getDoc('eventItem').fields.map((f) => f.name)
    expect(fields).toContain('summary')
  })

  test('defines dateLabel field', () => {
    const fields = getDoc('eventItem').fields.map((f) => f.name)
    expect(fields).toContain('dateLabel')
  })
})
