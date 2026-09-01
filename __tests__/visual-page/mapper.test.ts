import { expect, test } from 'vitest'
import { getSeedVisualPage } from '@/lib/visual-page/seed'
import { puckToSanity, sanityToPuck } from '@/lib/visual-page/mapper'
import { PHASE1_TEST_SLUG } from '@/lib/visual-page/types'

test('Sanity visualPage round-trips through Puck UI state', () => {
  const original = getSeedVisualPage('en')
  const puck = sanityToPuck(original)
  const back = puckToSanity({ data: puck, locale: 'en', slug: PHASE1_TEST_SLUG })
  expect(back.ok).toBe(true)
  if (!back.ok) return
  expect(back.value.title).toBe(original.title)
  expect(back.value.locale).toBe('en')
  expect(back.value.slug).toBe(PHASE1_TEST_SLUG)
  expect(back.value.sections.map((section) => section._type)).toEqual(
    original.sections.map((section) => section._type),
  )
  const originalHero = original.sections[0]
  const mappedHero = back.value.sections[0]
  if (originalHero._type !== 'heroSection' || mappedHero._type !== 'heroSection') {
    throw new Error('expected hero')
  }
  expect(mappedHero.headline).toEqual(originalHero.headline)
  expect(mappedHero.primaryCta).toEqual(originalHero.primaryCta)
})

test('Puck extra keys are stripped and not persisted', () => {
  const puck = sanityToPuck(getSeedVisualPage('en'))
  const withInternals = {
    ...puck,
    content: puck.content.map((item) => ({
      ...item,
      props: { ...item.props, className: 'should-be-dropped' },
    })),
  }
  const back = puckToSanity({ data: withInternals, locale: 'en', slug: PHASE1_TEST_SLUG })
  expect(back.ok).toBe(true)
  if (back.ok) {
    expect(JSON.stringify(back.value)).not.toContain('should-be-dropped')
    expect(JSON.stringify(back.value)).not.toContain('className')
  }
})

test('editing en does not change the es document id', () => {
  const en = puckToSanity({
    data: sanityToPuck(getSeedVisualPage('en')),
    locale: 'en',
    slug: PHASE1_TEST_SLUG,
  })
  const es = puckToSanity({
    data: sanityToPuck(getSeedVisualPage('es')),
    locale: 'es',
    slug: PHASE1_TEST_SLUG,
  })
  expect(en.ok && es.ok).toBe(true)
  if (en.ok && es.ok) {
    expect(en.value._id).toBe('visualPage-en-editor-test')
    expect(es.value._id).toBe('visualPage-es-editor-test')
    expect(en.value._id).not.toBe(es.value._id)
  }
})
