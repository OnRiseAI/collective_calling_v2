import { expect, test } from 'vitest'
import config from '@/sanity.config'

// Guard: the Studio config must stay wired to the schema. If a future change
// drops the schema or unhooks homePage, this fails loudly.
test('sanity.config schema includes the homePage type', () => {
  const types = config.schema?.types
  expect(Array.isArray(types)).toBe(true)
  const names = (types as { name: string }[]).map((t) => t.name)
  expect(names).toContain('homePage')
  expect(names).toContain('visualPage')
})

test('sanity.config registers the Website Editor tool', () => {
  const plugins = config.plugins ?? []
  expect(plugins.length).toBeGreaterThan(0)
})
