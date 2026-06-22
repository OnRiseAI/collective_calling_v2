import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'

// The page is an async server component that calls setRequestLocale from
// next-intl/server. Under jsdom that server-only API throws, so we stub it to a
// no-op, matching the sibling page tests.
vi.mock('next-intl/server', () => ({
  setRequestLocale: () => {},
}))
import { contactContent } from '@/lib/content/pages/contact'
import { ContactDetails } from '@/components/page/ContactDetails'
import ContactPage from '@/app/[locale]/contact/page'

// The page and ContactDetails render the locale-aware Link from next-intl,
// which reads the active locale from context. Provide a minimal provider so
// anything that resolves a link or locale works under jsdom.
function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{}}>
      {ui}
    </NextIntlClientProvider>,
  )
}

test('contactContent carries the real phone, address, and email', () => {
  expect(contactContent.info.phone).toBe('+34 711 006 961')
  expect(contactContent.info.phoneHref).toBe('tel:+34711006961')
  expect(contactContent.info.email).toBe('info@collectivecalling.org')
  expect(contactContent.info.address).toContain('Pablo Ruiz Picasso')
})

test('contactContent invitation mentions inviting us to speak', () => {
  const joined = contactContent.invitation.join(' ').toLowerCase()
  expect(joined).toContain('invite us to speak')
})

test('ContactDetails renders tel, mailto, and address (no second h1)', () => {
  renderWithLocale(<ContactDetails info={contactContent.info} />)

  const tel = screen.getByRole('link', { name: /\+34 711 006 961/ })
  expect(tel.getAttribute('href')).toBe('tel:+34711006961')

  const mailto = screen
    .getAllByRole('link')
    .find((a) => a.getAttribute('href') === 'mailto:info@collectivecalling.org')
  expect(mailto).toBeDefined()

  expect(screen.getByText(/Av\. Pablo Ruiz Picasso, 4/)).toBeInTheDocument()

  expect(screen.queryByRole('heading', { level: 1 })).toBeNull()
})

test('the page renders an h1 containing "Contact"', async () => {
  const ui = await ContactPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const h1 = screen.getByRole('heading', { level: 1 })
  expect(h1).toHaveTextContent('Contact')
})

test('the page renders the mailto, tel, and address details', async () => {
  const ui = await ContactPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const mailtoLinks = screen
    .getAllByRole('link')
    .filter((a) => a.getAttribute('href') === 'mailto:info@collectivecalling.org')
  expect(mailtoLinks.length).toBeGreaterThan(0)

  const telLinks = screen
    .getAllByRole('link')
    .filter((a) => a.getAttribute('href') === 'tel:+34711006961')
  expect(telLinks.length).toBeGreaterThan(0)

  expect(screen.getByText(/Av\. Pablo Ruiz Picasso, 4/)).toBeInTheDocument()
})

test('the page renders the social links as external anchors', async () => {
  const ui = await ContactPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  for (const social of contactContent.social.links) {
    const link = screen
      .getAllByRole('link')
      .find((a) => a.getAttribute('href') === social.href)
    expect(link).toBeDefined()
    expect(link?.getAttribute('target')).toBe('_blank')
    expect(link?.getAttribute('rel')).toContain('noopener')
  }
})

test('the page renders a Donate link pointing at the donate route', async () => {
  const ui = await ContactPage({ params: Promise.resolve({ locale: 'en' }) })
  renderWithLocale(ui)

  const donateLinks = screen.getAllByRole('link', { name: /donate/i })
  expect(donateLinks.length).toBeGreaterThan(0)
  for (const donate of donateLinks) {
    expect(donate.getAttribute('href')).toContain('/donate')
  }
})
