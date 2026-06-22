import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The page is an async server component that calls setRequestLocale from
// next-intl/server. Under jsdom that server-only API throws, so we stub it to a
// no-op. We exercise the rendered output (h1, links, principle headings), which
// is what the brief asks the test to assert.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))
import { ValueCards } from '@/components/page/ValueCards'
import { whatWeDoContent } from '@/lib/content/pages/whatWeDo'
import WhatWeDoPage from '@/app/[locale]/about/what-we-do/page'

// The page and ValueCards render the locale-aware Link from next-intl, which
// reads the active locale from context. Provide a minimal provider so anything
// that resolves a link works under jsdom, matching the sibling page tests.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const PRINCIPLE_TITLES = [
  'Compassion centred',
  'Child focused',
  'Love for the homeless',
  'Measurable',
]

test('whatWeDoContent carries the page h1 and the four principles', () => {
  // The hero title is the only h1 and must name the page.
  expect(whatWeDoContent.hero.title).toContain('What We Do')

  // The four principles, in order.
  expect(whatWeDoContent.principles.map((p) => p.title)).toEqual(
    PRINCIPLE_TITLES,
  )
})

test('ValueCards renders each principle title as an h3 heading', () => {
  renderWithLocale(<ValueCards items={whatWeDoContent.principles} />)

  for (const title of PRINCIPLE_TITLES) {
    const heading = screen.getByRole('heading', { name: title })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H3')
  }
})

test('the page renders an h1 containing "What We Do"', async () => {
  const ui = await WhatWeDoPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('What We Do')
})

test('the page links to both /spain and /tanzania', async () => {
  const ui = await WhatWeDoPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const spain = screen.getByRole('link', { name: /spain/i })
  const tanzania = screen.getByRole('link', { name: /tanzania/i })

  // Locale-aware Link prefixes the active locale (en) onto the href.
  expect(spain.getAttribute('href')).toContain('/spain')
  expect(tanzania.getAttribute('href')).toContain('/tanzania')
})

test('the page renders all four principle titles', async () => {
  const ui = await WhatWeDoPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  for (const title of PRINCIPLE_TITLES) {
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
  }
})
