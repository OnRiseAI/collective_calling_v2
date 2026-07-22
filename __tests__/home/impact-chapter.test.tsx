import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { ImpactChapter } from '@/components/home/ImpactChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders the five moments and the impact CTA', () => {
  renderWithLocale(<ImpactChapter content={SEED_HOME.impact} id="impact" stage="possibility" />)
  for (const line of SEED_HOME.impact.moments) {
    expect(screen.getByText(line)).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /see the impact/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/about\/our-impact$/),
  )
})
