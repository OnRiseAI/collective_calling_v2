/**
 * Collective Calling information architecture (design-theme mockup, spec v2).
 *
 * Single source of truth for the global navigation, shared by the Header and
 * the Footer. The header renders the top-level section links flat (no
 * mega-menu, per the mockup); the mobile panel and footer columns use the
 * sub-items.
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
    key: 'impact',
    label: 'Impact',
    href: '/about/our-impact',
    items: [
      { label: 'Our impact', href: '/about/our-impact' },
      { label: 'Financial accountability', href: '/about/financial-accountability' },
    ],
  },
  {
    key: 'values-in-action',
    label: 'Values in Action',
    href: '/get-involved/partner',
    items: [{ label: 'Values in Action', href: '/get-involved/partner' }],
  },
  {
    key: 'stories',
    label: 'Stories',
    href: '/stories',
    items: [{ label: 'All stories', href: '/stories' }],
  },
  {
    key: 'events',
    label: 'Events',
    href: '/events',
    items: [{ label: 'Events', href: '/events' }],
  },
  {
    key: 'charity-shops',
    label: 'Charity Shops',
    href: '/charity-shops',
    items: [{ label: 'Charity shops', href: '/charity-shops' }],
  },
  {
    key: 'about',
    label: 'About',
    href: '/about',
    items: [
      { label: 'Who we are', href: '/about/who-we-are' },
      { label: 'What we do', href: '/about/what-we-do' },
      { label: 'Our team', href: '/about/our-team' },
      { label: 'Partners', href: '/about/partners' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact',
    href: '/contact',
    items: [{ label: 'Contact', href: '/contact' }],
  },
]

// The persistent Donate action (footer, donate journeys).
export const DONATE_HREF = '/donate'

// The header's single CTA (mockup): the invitation, not the ask.
export const GET_INVOLVED_HREF = '/get-involved'
