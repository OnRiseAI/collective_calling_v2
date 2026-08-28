import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { EventBand } from '@/components/home/EventBand'
import { PageHero } from '@/components/page/PageHero'
import { Section } from '@/components/ui/Section'
import { WelcomeGate } from '@/components/welcome/WelcomeGate'

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('the homepage event band reveals as it enters the viewport', () => {
  const { container } = renderWithLocale(<EventBand />)
  expect(container.querySelector('[data-reveal]')).not.toBeNull()
  expect(screen.getByRole('heading', { name: /the fashion show/i })).toBeInTheDocument()
})

test('toolkit page heroes fade in on load', () => {
  const { container } = renderWithLocale(
    <PageHero content={{ eyebrow: 'Spain', title: 'Spain', lede: 'Mobile showers.' }} />,
  )
  expect(container.querySelector('[data-reveal]')).not.toBeNull()
  expect(screen.getByRole('heading', { level: 1, name: /spain/i })).toBeInTheDocument()
})

test('toolkit sections wrap their content in a scroll reveal', () => {
  const { container } = render(
    <Section>
      <p>Band copy</p>
    </Section>,
  )
  expect(container.querySelector('[data-reveal]')).not.toBeNull()
  expect(screen.getByText('Band copy')).toBeInTheDocument()
})

test('the welcome gate fades the headline and reveals the journey card', () => {
  const { container } = renderWithLocale(<WelcomeGate />)
  expect(container.querySelectorAll('[data-reveal]').length).toBeGreaterThan(1)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /every life becomes part of a bigger story/i,
  )
  expect(screen.getByRole('link', { name: /begin your journey/i })).toBeInTheDocument()
})

test('globals.css fails open for reduced-motion readers on reveal nodes', async () => {
  const { readFile } = await import('node:fs/promises')
  const { join } = await import('node:path')
  const css = await readFile(join(process.cwd(), 'app', 'globals.css'), 'utf8')
  expect(css).toMatch(/prefers-reduced-motion:\s*reduce/)
  expect(css).toMatch(/\[data-reveal\][\s\S]*opacity:\s*1\s*!important/)
})
