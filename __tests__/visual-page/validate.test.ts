import { expect, test } from 'vitest'
import { getSeedVisualPage } from '@/lib/visual-page/seed'
import { validateVisualPage } from '@/lib/visual-page/validate'

test('seed pages validate', () => {
  expect(validateVisualPage(getSeedVisualPage('en')).ok).toBe(true)
  expect(validateVisualPage(getSeedVisualPage('es')).ok).toBe(true)
})

test('rejects unknown section types', () => {
  const page = getSeedVisualPage('en')
  const result = validateVisualPage({
    ...page,
    sections: [{ _type: 'mysteryWidget', _key: 'x', html: '<script>' }],
  })
  expect(result.ok).toBe(false)
  if (!result.ok) {
    expect(result.issues.some((issue) => issue.message.includes('unknown section type'))).toBe(true)
  }
})

test('rejects javascript hrefs at publish validation', () => {
  const page = getSeedVisualPage('en')
  const hero = page.sections[0]
  if (hero._type !== 'heroSection') throw new Error('expected hero')
  const result = validateVisualPage({
    ...page,
    sections: [
      {
        ...hero,
        primaryCta: { label: 'Hack', href: 'javascript:alert(1)' },
      },
    ],
  })
  expect(result.ok).toBe(false)
})

test('rejects className and executable copy', () => {
  const page = getSeedVisualPage('en')
  const result = validateVisualPage({
    ...page,
    className: 'font-bold',
    sections: [
      {
        ...(page.sections[0] as Record<string, unknown>),
        description: 'function () { return fetch(process.env.SECRET) }',
      },
    ],
  })
  expect(result.ok).toBe(false)
})

test('rejects a non editor-test slug', () => {
  const page = getSeedVisualPage('en')
  const result = validateVisualPage({ ...page, slug: 'home' })
  expect(result.ok).toBe(false)
})

test('rejects a missing locale', () => {
  const page = getSeedVisualPage('en')
  const result = validateVisualPage({ ...page, locale: 'fr' })
  expect(result.ok).toBe(false)
})
