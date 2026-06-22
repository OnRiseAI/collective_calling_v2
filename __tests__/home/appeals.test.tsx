import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { AppealsCards } from '@/components/home/AppealsCards'
import type { Appeal } from '@/lib/content/types'

// AppealsCards renders Card, which uses the locale-aware Link from next-intl.
// Provide a minimal provider so each card link resolves to a real href.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const appeals: Appeal[] = [
  {
    slug: 'spain',
    title: 'Restoring dignity in Spain',
    blurb: 'Our mobile shower unit brings hygiene, warmth, and human connection.',
    image: '/images/spain-mobile-shower.jpg',
    alt: 'The Collective Calling mobile shower unit serving people in Spain.',
    href: '/spain',
    theme: 'spain',
  },
  {
    slug: 'tanzania',
    title: 'Rebuilding families in Tanzania',
    blurb: 'Through our Centre of Hope we rescue, restore, and reunite children.',
    image: '/images/tanzania-children.jpg',
    alt: 'Children at the Centre of Hope in Tanzania.',
    href: '/tanzania',
    theme: 'tanzania',
  },
  {
    slug: 'sponsor',
    title: 'Sponsor a child',
    blurb: 'For 58 euros a month you can give a child food, shelter, and education.',
    image: '/images/speaking-event.jpg',
    alt: 'A Collective Calling gathering.',
    href: '/get-involved/sponsor-a-child',
    theme: 'general',
  },
]

test('renders each appeal title', () => {
  renderWithLocale(<AppealsCards appeals={appeals} />)
  for (const appeal of appeals) {
    expect(screen.getByText(appeal.title)).toBeInTheDocument()
  }
})

test('each card links to its appeal href', () => {
  renderWithLocale(<AppealsCards appeals={appeals} />)

  const spain = screen.getByRole('link', { name: /restoring dignity in spain/i })
  expect(spain).toHaveAttribute('href', expect.stringContaining('/spain'))

  const tanzania = screen.getByRole('link', { name: /rebuilding families in tanzania/i })
  expect(tanzania).toHaveAttribute('href', expect.stringContaining('/tanzania'))

  const sponsor = screen.getByRole('link', { name: /sponsor a child/i })
  expect(sponsor).toHaveAttribute(
    'href',
    expect.stringContaining('/get-involved/sponsor-a-child'),
  )
})
