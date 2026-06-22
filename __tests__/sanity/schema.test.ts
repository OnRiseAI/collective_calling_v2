import { expect, test } from 'vitest'
import { schemaTypes } from '@/sanity/schemas'
test('schema includes a homePage singleton mirroring HomeContent', () => {
  const names = schemaTypes.map((t: { name: string }) => t.name)
  expect(names).toContain('homePage')
  const home = schemaTypes.find((t: { name: string }) => t.name === 'homePage') as { fields: { name: string }[] }
  const fieldNames = home.fields.map((f) => f.name)
  for (const f of ['hero','impactStats','appeals','mission','scripture','testimonials','exploreCards','money','donate','trust']) {
    expect(fieldNames).toContain(f)
  }
})
