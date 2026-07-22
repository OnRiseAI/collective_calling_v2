import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { PossibleChapter } from '@/components/home/PossibleChapter'
import { SEED_HOME } from '@/lib/content/home.seed'
import type { Story } from '@/lib/content/types'

const stories: Story[] = [
  {
    slug: 'caleb',
    title: 'Caleb comes home',
    location: 'tanzania',
    excerpt: 'From the street back to a loving home.',
    body: '',
  },
  {
    slug: 'maria',
    title: 'Maria is seen',
    location: 'spain',
    excerpt: 'A shower, a coffee, a name remembered.',
    body: '',
  },
  {
    slug: 'your-story-here',
    title: 'Your story',
    location: 'general',
    excerpt: 'x',
    body: '',
    placeholder: true,
  },
]

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('renders headline, the three someone-lines, and real stories only', () => {
  renderWithLocale(
    <PossibleChapter
      content={SEED_HOME.possible}
      stories={stories}
      id="possibility"
      stage="possibility"
    />,
  )
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/every story begins/i)
  for (const line of SEED_HOME.possible.moments) {
    expect(screen.getByText(line)).toBeInTheDocument()
  }
  expect(screen.getByRole('link', { name: /caleb comes home/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/stories\/caleb$/),
  )
  expect(screen.queryByText(/your story/i)).not.toBeInTheDocument()
})
