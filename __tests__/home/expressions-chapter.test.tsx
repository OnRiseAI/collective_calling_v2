import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { ExpressionsChapter } from '@/components/home/ExpressionsChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders the chapter headline and the three expression headings', () => {
  renderWithLocale(
    <ExpressionsChapter content={SEED_HOME.expressions} id="connection" stage="connection" />,
  )
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/different expressions/i)
  for (const row of SEED_HOME.expressions.rows) {
    expect(
      screen.getByRole('heading', { level: 3, name: new RegExp(row.heading.slice(0, 20), 'i') }),
    ).toBeInTheDocument()
  }
})

test('each expression links to its real route', () => {
  renderWithLocale(
    <ExpressionsChapter content={SEED_HOME.expressions} id="connection" stage="connection" />,
  )
  expect(screen.getByRole('link', { name: /see their stories/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/stories$/),
  )
  expect(screen.getByRole('link', { name: /explore community impact/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/spain$/),
  )
  expect(screen.getByRole('link', { name: /explore values in action/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/get-involved\/partner$/),
  )
})

test('renders the credo lines', () => {
  renderWithLocale(
    <ExpressionsChapter content={SEED_HOME.expressions} id="connection" stage="connection" />,
  )
  for (const line of SEED_HOME.expressions.credo) {
    expect(screen.getByText(line)).toBeInTheDocument()
  }
})
