import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { ExploreCards } from '@/components/home/ExploreCards'
import type { ExploreCard } from '@/lib/content/types'

// ExploreCards renders Card, which uses the locale-aware Link from next-intl.
// Provide a minimal provider so each card link resolves to a real href.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const cards: ExploreCard[] = [
  {
    title: 'Appeals',
    blurb: 'Stand with families in Spain and Tanzania through our current appeals.',
    image: '/images/spain-homelessness.jpg',
    alt: 'Outreach in Spain.',
    href: '/appeals',
  },
  {
    title: 'Stories',
    blurb: 'Read how lives are being reclaimed, one person and one family at a time.',
    image: '/images/transform-5.png',
    alt: 'A life reclaimed.',
    href: '/stories',
  },
  {
    title: 'Get involved',
    blurb: 'Sponsor a child, fundraise, pray, or invite us to speak.',
    image: '/images/speaking-event.jpg',
    alt: 'A Collective Calling speaking event.',
    href: '/get-involved',
  },
  {
    title: 'About us',
    blurb: 'Who we are, what we do, and how we stay accountable.',
    image: '/images/tanzania-children.jpg',
    alt: 'Children in Tanzania.',
    href: '/about',
  },
]

test('renders each explore card title', () => {
  renderWithLocale(<ExploreCards cards={cards} />)
  for (const card of cards) {
    expect(screen.getByText(card.title)).toBeInTheDocument()
  }
})

test('each card links to its href', () => {
  renderWithLocale(<ExploreCards cards={cards} />)

  const appeals = screen.getByRole('link', { name: /appeals/i })
  expect(appeals).toHaveAttribute('href', expect.stringContaining('/appeals'))

  const stories = screen.getByRole('link', { name: /stories/i })
  expect(stories).toHaveAttribute('href', expect.stringContaining('/stories'))

  const getInvolved = screen.getByRole('link', { name: /get involved/i })
  expect(getInvolved).toHaveAttribute('href', expect.stringContaining('/get-involved'))

  const about = screen.getByRole('link', { name: /about us/i })
  expect(about).toHaveAttribute('href', expect.stringContaining('/about'))
})
