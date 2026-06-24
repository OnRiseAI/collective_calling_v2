import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { MissionBlurb } from '@/components/home/MissionBlurb'
import { ScriptureBanner } from '@/components/home/ScriptureBanner'
import type { HomeContent } from '@/lib/content/types'

// MissionBlurb renders the locale-aware Link from "@/i18n/navigation" (the
// "About us" Button), which reads the active locale from next-intl context.
// Provide a minimal provider so that link resolves under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const sampleMission: HomeContent['mission'] = {
  eyebrow: 'Our mission',
  heading: 'When people are pushed to the margins, we walk with them.',
  body: 'Collective Calling restores dignity and strengthens families across Spain and Tanzania.',
}

test('mission blurb renders the heading as an h2', () => {
  renderWithLocale(<MissionBlurb content={sampleMission} />)
  const heading = screen.getByRole('heading', { level: 2 })
  expect(heading).toHaveTextContent(/pushed to the margins/i)
})

test('mission blurb links to the about page', () => {
  renderWithLocale(<MissionBlurb content={sampleMission} />)
  const link = screen.getByRole('link', { name: /about us/i })
  expect(link).toHaveAttribute('href', expect.stringContaining('/about'))
})

test('scripture banner shows the first verse and reference', () => {
  render(<ScriptureBanner />)
  expect(screen.getByText(/love one another/i)).toBeInTheDocument()
  expect(screen.getByText('1 John 4:11')).toBeInTheDocument()
})

test('scripture banner wraps the quote in a blockquote element', () => {
  const { container } = render(<ScriptureBanner />)
  const blockquote = container.querySelector('blockquote')
  expect(blockquote).not.toBeNull()
  expect(blockquote).toHaveTextContent(/love one another/i)
})
