/**
 * Collective Calling information architecture.
 *
 * Single source of truth for the global navigation, shared by the Header
 * (Task 5) and the Footer (Task 6) and consumed by later content tasks for
 * link targets. Hrefs are future routes: most of these pages do not exist yet,
 * so links may 404 until their plans land. That is expected.
 *
 * Labels are English here. Locale-aware routing is applied at render time by
 * the Link component from "@/i18n/navigation" (it prefixes the active locale).
 */

export type NavItem = {
  label: string
  href: string
}

export type NavSection = {
  key: string
  label: string
  href: string
  items: NavItem[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    key: 'appeals',
    label: 'Appeals',
    href: '/appeals',
    items: [
      { label: 'Spain', href: '/spain' },
      { label: 'Tanzania', href: '/tanzania' },
      { label: 'All appeals', href: '/appeals' },
    ],
  },
  {
    key: 'stories',
    label: 'Stories',
    href: '/stories',
    items: [{ label: 'All stories', href: '/stories' }],
  },
  {
    key: 'get-involved',
    label: 'Get Involved',
    href: '/get-involved',
    items: [
      { label: 'Sponsor a child', href: '/get-involved/sponsor-a-child' },
      { label: 'Fundraise', href: '/get-involved/fundraise' },
      { label: 'Events', href: '/events' },
      { label: 'Invite us to speak', href: '/get-involved/invite-us-to-speak' },
      { label: 'Pray', href: '/get-involved/pray' },
      { label: 'Partner with us', href: '/get-involved/partner' },
    ],
  },
  {
    key: 'about',
    label: 'About Us',
    href: '/about',
    items: [
      { label: 'Who we are', href: '/about/who-we-are' },
      { label: 'What we do', href: '/about/what-we-do' },
      { label: 'Our impact', href: '/about/our-impact' },
      { label: 'Our team', href: '/about/our-team' },
      { label: 'Financial accountability', href: '/about/financial-accountability' },
      { label: 'Partners', href: '/about/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

// The persistent Donate action. Header and Footer share this one target.
export const DONATE_HREF = '/donate'
