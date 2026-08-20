import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The page is an async server component that calls setRequestLocale from
// next-intl/server. Under jsdom that server-only API throws, so we stub it to a
// no-op, matching the What We Do page test. We exercise the rendered output
// (h1, help-item headings, the Donate link), which is what the brief asks.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))
import { ProgramHelp } from '@/components/page/ProgramHelp'
import { spainContent } from '@/lib/content/pages/spain'
import SpainPage from '@/app/[locale]/(site)/spain/page'

// The page and ProgramHelp render the locale-aware Link from next-intl, which
// reads the active locale from context. Provide a minimal provider so anything
// that resolves a link works under jsdom, matching the sibling page tests.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const HELP_TITLES = [
  'Access to Hygiene',
  'Building Trust & Connection',
  'Taking Help to the Streets',
]

test('spainContent carries the page h1 and the three help items', () => {
  // The hero title is the only h1 and must name the page.
  expect(spainContent.hero.title).toContain('Spain')

  // The three "how we help" items, in order.
  expect(spainContent.help.items.map((i) => i.title)).toEqual(HELP_TITLES)
})

test('ProgramHelp renders each item title as an h3 heading', () => {
  renderWithLocale(
    <ProgramHelp
      eyebrow={spainContent.help.eyebrow}
      heading={spainContent.help.heading}
      items={spainContent.help.items}
    />,
  )

  for (const title of HELP_TITLES) {
    const heading = screen.getByRole('heading', { name: title })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H3')
  }
})

test('the page renders an h1 containing "Spain"', async () => {
  const ui = await SpainPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('Spain')
})

test('the page renders all three "how we help" item titles', async () => {
  const ui = await SpainPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  for (const title of HELP_TITLES) {
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
  }
})

test('the page renders a Donate link', async () => {
  const ui = await SpainPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const donate = screen.getByRole('link', { name: /donate/i })
  expect(donate.getAttribute('href')).toContain('/donate')
})
