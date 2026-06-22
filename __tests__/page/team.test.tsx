import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { TeamGrid } from '@/components/page/TeamGrid'
import { ourTeamContent } from '@/lib/content/pages/ourTeam'

// TeamGrid renders next/image and may resolve locale-aware primitives, which
// read the active locale from context. Provide a minimal provider so anything
// that resolves a link or locale works under jsdom, matching the sibling
// page/home tests.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('TeamGrid renders the three group labels as headings', () => {
  renderWithLocale(<TeamGrid groups={ourTeamContent.groups} />)

  for (const label of ['Leadership', 'Board', 'Ambassadors']) {
    const heading = screen.getByRole('heading', { name: label })
    expect(heading).toBeInTheDocument()
    // Group labels are section headings, never a second h1.
    expect(heading.tagName).toBe('H2')
  }
})

test('TeamGrid renders the key team members with their roles', () => {
  renderWithLocale(<TeamGrid groups={ourTeamContent.groups} />)

  // Paul and Gemma Carr (Leadership) and Patrick Murphy (Board) must render.
  for (const name of ['Paul Carr', 'Gemma Carr', 'Patrick Murphy']) {
    const heading = screen.getByRole('heading', { name })
    expect(heading).toBeInTheDocument()
    // Member names are sub-section headings.
    expect(heading.tagName).toBe('H3')
  }

  expect(screen.getByText('President & Co-founder')).toBeInTheDocument()
  expect(screen.getByText('Secretary & Co-founder')).toBeInTheDocument()
  expect(screen.getByText('Chair of the Board')).toBeInTheDocument()
})

test('TeamGrid renders no h1 (the page hero owns the only h1)', () => {
  renderWithLocale(<TeamGrid groups={ourTeamContent.groups} />)
  expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
})

test('ourTeamContent carries the page h1 title and three groups', () => {
  expect(ourTeamContent.hero.title).toContain('Our Team')
  expect(ourTeamContent.groups.map((g) => g.label)).toEqual([
    'Leadership',
    'Board',
    'Ambassadors',
  ])
})
