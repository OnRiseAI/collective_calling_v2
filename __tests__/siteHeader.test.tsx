import { render, screen, within } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { SiteHeader } from '@/components/layout/SiteHeader'

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>()
  return {
    ...actual,
    usePathname: () => '/who-we-are',
    useParams: () => ({ locale: 'en' }),
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  }
})

function renderHeader() {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      <SiteHeader active="who" tone="dark" />
    </NextIntlClientProvider>,
  )
}

test('site header carries the wordmark and the v3 subjects', () => {
  renderHeader()
  expect(screen.getByRole('link', { name: /collective calling home/i })).toHaveAttribute(
    'href',
    expect.stringMatching(/\/(en)?$/),
  )
  const nav = screen.getByRole('navigation', { name: 'Main' })
  for (const label of ['WHO WE ARE', 'WHAT WE DO', 'STORIES', 'CONTACT']) {
    expect(within(nav).getByRole('link', { name: new RegExp(`^${label}$`) })).toBeInTheDocument()
  }
})

test('site header has Start Your Journey and Give', () => {
  renderHeader()
  expect(screen.getAllByRole('link', { name: /start your journey/i })[0]).toHaveAttribute(
    'href',
    expect.stringMatching(/\/journey$/),
  )
  expect(screen.getAllByRole('link', { name: /^give$/i })[0]).toHaveAttribute(
    'href',
    expect.stringMatching(/\/support$/),
  )
})

test('site header has a mobile menu toggle', () => {
  renderHeader()
  expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
})
