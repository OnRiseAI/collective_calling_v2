import * as React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { expect, test } from 'vitest'
import { DonateWidget } from '@/components/home/DonateWidget'
import type { HomeContent } from '@/lib/content/types'

// @testing-library/user-event is not installed in this project, so all
// interactions use fireEvent (per the task brief).

const donate: HomeContent['donate'] = {
  monthlyTiers: [
    { amount: 15, interval: 'monthly', impact: 'could help provide hot meals and hygiene for people sleeping rough.' },
    { amount: 30, interval: 'monthly', impact: 'could help keep the mobile shower unit on the road each week.' },
    { amount: 58, interval: 'monthly', impact: 'sponsors a child in Tanzania with food, shelter, and education.' },
  ],
  onceTiers: [
    { amount: 25, interval: 'once', impact: 'could provide hygiene kits for several people sleeping rough.' },
    { amount: 50, interval: 'once', impact: 'could help a child settle back into a safe home.' },
    { amount: 100, interval: 'once', impact: 'could help fund a family reunification.' },
  ],
}

// The Donorbox campaign link is the only role="link" in the widget.
function donateLink(): HTMLAnchorElement {
  return screen.getByRole('link', { name: /donate/i }) as HTMLAnchorElement
}

test('renders a Monthly/Once toggle as two accessible controls', () => {
  render(<DonateWidget content={donate} />)
  expect(screen.getByRole('radio', { name: /monthly/i })).toBeInTheDocument()
  expect(screen.getByRole('radio', { name: /once/i })).toBeInTheDocument()
})

test('defaults to Monthly and renders the monthly tier amounts with impact lines', () => {
  render(<DonateWidget content={donate} />)

  // Monthly is the default selected interval.
  expect(screen.getByRole('radio', { name: /monthly/i })).toHaveAttribute('aria-checked', 'true')
  expect(screen.getByRole('radio', { name: /once/i })).toHaveAttribute('aria-checked', 'false')

  // Each monthly tier renders its amount and impact line. Scope the amount
  // lookup to the amount radiogroup so the Donate button's amount label (which
  // also prints an amount) does not collide with the tier figures.
  const amounts = screen.getByRole('radiogroup', { name: /amount/i })
  for (const tier of donate.monthlyTiers) {
    expect(within(amounts).getByText(new RegExp(String(tier.amount)))).toBeInTheDocument()
    expect(screen.getByText(tier.impact)).toBeInTheDocument()
  }
})

test('primary Donate action is a Donorbox link with the selected amount and recurring=true while Monthly', () => {
  render(<DonateWidget content={donate} />)
  const href = donateLink().getAttribute('href') ?? ''
  expect(href).toContain('donorbox.org/giving-41')
  // Default selection is the middle monthly tier (30).
  expect(href).toContain('amount=30')
  expect(href).toContain('recurring=true')
})

test('selecting a different monthly tier updates the donate href amount', () => {
  render(<DonateWidget content={donate} />)
  const amounts = screen.getByRole('radiogroup', { name: /amount/i })
  fireEvent.click(within(amounts).getByRole('radio', { name: /58/ }))
  const href = donateLink().getAttribute('href') ?? ''
  expect(href).toContain('amount=58')
  expect(href).toContain('recurring=true')
})

test('activating Once renders the once tiers and sets recurring=false in the donate href', () => {
  render(<DonateWidget content={donate} />)

  fireEvent.click(screen.getByRole('radio', { name: /once/i }))

  // Once is now selected.
  expect(screen.getByRole('radio', { name: /once/i })).toHaveAttribute('aria-checked', 'true')

  // The once tiers render.
  for (const tier of donate.onceTiers) {
    expect(screen.getByText(tier.impact)).toBeInTheDocument()
  }

  // The href resets to the once interval's middle tier (50) and recurring=false.
  const href = donateLink().getAttribute('href') ?? ''
  expect(href).toContain('amount=50')
  expect(href).toContain('recurring=false')
})
