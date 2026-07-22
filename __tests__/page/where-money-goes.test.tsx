import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { WhereMoneyGoes } from '@/components/page/WhereMoneyGoes'
import type { MoneySplit } from '@/lib/content/types'

// WhereMoneyGoes renders a locale-aware Donate Link from next-intl, so provide a
// minimal provider for the href to resolve.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const money: MoneySplit = {
  programsPct: 83,
  adminPct: 17,
  programsLabel: 'funds our programs',
  adminLabel: 'keeps us running and growing',
  note: 'In 2025, 83% of our total operating expenses went directly to programs supporting children and parents living in poverty, including the logistics of running them.',
}

test('shows both percentages', () => {
  renderWithLocale(<WhereMoneyGoes content={money} />)
  // Each figure appears more than once (donut badge + stat callout, and the note
  // also mentions 83%), so allow multiple matches.
  expect(screen.getAllByText(/83%/).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/17%/).length).toBeGreaterThan(0)
})

test('renders the accountability note', () => {
  renderWithLocale(<WhereMoneyGoes content={money} />)
  expect(screen.getByText(money.note)).toBeInTheDocument()
})

test('offers a Donate link to the donate route', () => {
  renderWithLocale(<WhereMoneyGoes content={money} />)
  const donate = screen.getByRole('link', { name: /donate/i })
  expect(donate).toHaveAttribute('href', expect.stringContaining('/donate'))
})

test('split bar is an image with an aria-label describing the 83/17 split', () => {
  renderWithLocale(<WhereMoneyGoes content={money} />)
  // Select the donut specifically (its accessible name carries the split), not
  // the photograph, which also has the img role.
  const bar = screen.getByRole('img', { name: /83/ })
  const label = bar.getAttribute('aria-label') ?? ''
  expect(label).toMatch(/83/)
  expect(label).toMatch(/17/)
  // It should describe both the programs and running split, not just numbers.
  expect(label.toLowerCase()).toMatch(/program/)
  expect(label.toLowerCase()).toMatch(/run/)
})
