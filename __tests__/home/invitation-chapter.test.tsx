import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { InvitationChapter } from '@/components/home/InvitationChapter'
import { SEED_HOME } from '@/lib/content/home.seed'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders the invitation and routes to get-involved', () => {
  renderWithLocale(
    <InvitationChapter content={SEED_HOME.invitation} id="participation" stage="participation" />,
  )
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    /find your place in the story/i,
  )
  for (const line of SEED_HOME.invitation.bring) {
    expect(screen.getByText(line)).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /start your journey/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/get-involved$/),
  )
})
