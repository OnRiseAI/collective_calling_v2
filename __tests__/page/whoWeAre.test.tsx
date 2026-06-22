import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { ValueCards } from '@/components/page/ValueCards'
import { whoWeAreContent } from '@/lib/content/pages/whoWeAre'

// ValueCards and the page content render the locale-aware Link from next-intl
// (indirectly, via shared primitives), which reads the active locale from
// context. Provide a minimal provider so anything that resolves a link works
// under jsdom, matching the existing page/home tests.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const VALUE_TITLES = [
  'We are Christian',
  'We value people',
  'We are stewards',
  'We are partners',
]

test('whoWeAreContent carries the page h1, the four values, and the scripture', () => {
  // The hero title is the only h1 and must name the page.
  expect(whoWeAreContent.hero.title).toContain('Who We Are')

  // The four faithful values, in order.
  expect(whoWeAreContent.values.map((v) => v.title)).toEqual(VALUE_TITLES)

  // The vision quote carries the Jeremiah 29:11-13 reference.
  expect(whoWeAreContent.vision.reference).toMatch(/Jer(emiah)?\s*29/i)
})

test('ValueCards renders each value title as a heading', () => {
  renderWithLocale(<ValueCards items={whoWeAreContent.values} />)

  for (const title of VALUE_TITLES) {
    const heading = screen.getByRole('heading', { name: title })
    expect(heading).toBeInTheDocument()
    // Value titles are sub-section headings, never a second h1.
    expect(heading.tagName).toBe('H3')
  }
})

test('ValueCards renders no h1 (the page hero owns the only h1)', () => {
  renderWithLocale(<ValueCards items={whoWeAreContent.values} />)
  expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
})
