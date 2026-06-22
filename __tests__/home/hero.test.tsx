import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { Hero } from '@/components/home/Hero'
import type { HomeContent } from '@/lib/content/types'

// The Hero renders the locale-aware Link from "@/i18n/navigation" (Donate and the
// secondary appeals link), which reads the active locale from next-intl context.
// Provide a minimal provider so those links resolve under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

const sampleHero: HomeContent['hero'] = {
  eyebrow: 'Collective Calling',
  headline: 'Answer the call to restore dignity and rebuild families.',
  lede: 'A Christian charity walking with people in Spain and Tanzania.',
  image: '/images/tanzania-children.jpg',
  alt: 'Children smiling outside the Centre of Hope in Tanzania.',
}

test('hero renders the headline in an h1', () => {
  renderWithLocale(<Hero content={sampleHero} />)
  const heading = screen.getByRole('heading', { level: 1 })
  expect(heading).toHaveTextContent(/restore dignity and rebuild/i)
})

test('hero offers a Donate link', () => {
  renderWithLocale(<Hero content={sampleHero} />)
  expect(screen.getByRole('link', { name: /donate/i })).toBeInTheDocument()
})
