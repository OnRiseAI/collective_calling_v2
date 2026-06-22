import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { PageHero } from '@/components/page/PageHero'
import { SubNavCards } from '@/components/page/SubNavCards'

// PageHero and SubNavCards both ultimately render the locale-aware Link from
// next-intl (SubNavCards via the ui Card), which reads the active locale from
// context. Provide a minimal provider so any links resolve under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('PageHero renders its title as the page h1', () => {
  renderWithLocale(
    <PageHero content={{ eyebrow: 'Who we are', title: 'About Collective Calling' }} />,
  )
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toHaveTextContent('About Collective Calling')
})

test('SubNavCards renders each card title and links to its href', () => {
  renderWithLocale(
    <SubNavCards
      cards={[
        { title: 'Our Story', blurb: 'How we began.', href: '/about/story' },
        { title: 'Our Team', blurb: 'The people behind the work.', href: '/about/team' },
      ]}
    />,
  )

  const story = screen.getByRole('link', { name: /our story/i })
  expect(story).toHaveAttribute('href', expect.stringContaining('/about/story'))

  const team = screen.getByRole('link', { name: /our team/i })
  expect(team).toHaveAttribute('href', expect.stringContaining('/about/team'))
})
