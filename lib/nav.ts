/**
 * Collective Calling information architecture (Aug 24 revision).
 *
 * Single source of truth for the global navigation, shared by the Header and
 * the mobile panel. The header renders the top-level section links flat in
 * the v2 header's own design (title case, white on the hero, gold pill); the
 * subjects follow the editorial pages' nav: Home, Who We Are, What We Do,
 * Get Involved, Impact, Contact. The mobile panel uses the sub-items, which
 * keep the deeper destinations (team, partners, stories, shops, ways to get
 * involved) reachable in one open.
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
    key: 'home',
    label: 'Home',
    href: '/',
    items: [],
  },
  {
    key: 'who-we-are',
    label: 'Who We Are',
    href: '/who-we-are',
    items: [
      { label: 'Our team', href: '/about/our-team' },
      { label: 'Partners', href: '/about/partners' },
    ],
  },
  {
    key: 'what-we-do',
    label: 'What We Do',
    href: '/what-we-do',
    items: [
      { label: 'Stories', href: '/stories' },
      { label: 'Charity shops', href: '/charity-shops' },
      { label: 'Values in Action', href: '/get-involved/partner' },
    ],
  },
  {
    key: 'get-involved',
    label: 'Get Involved',
    href: '/get-involved',
    items: [
      { label: 'Sponsor a child', href: '/get-involved/sponsor-a-child' },
      { label: 'Fundraise', href: '/get-involved/fundraise' },
      { label: 'Events', href: '/events' },
      { label: 'Pray', href: '/get-involved/pray' },
      { label: 'Invite us to speak', href: '/get-involved/invite-us-to-speak' },
    ],
  },
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
    key: 'contact',
    label: 'Contact',
    href: '/contact',
    items: [],
  },
]

// The persistent Donate action (footer, donate journeys, and the v3 GIVE pill).
export const DONATE_HREF = '/donate'

// Designed Support page (v3). GIVE in the site header lands here; /donate
// still hosts the Donorbox embed so existing CTAs keep working.
export const SUPPORT_HREF = '/support'

// The header's single CTA (Aug 24 revision): the journey, matching the
// editorial pages' START YOUR JOURNEY action.
export const JOURNEY_HREF = '/journey'

export type SiteHeaderActive = 'who' | 'what' | 'stories' | 'contact' | ''

export const SITE_HEADER_WHAT_WE_DO: NavItem[] = [
  { label: 'Children & Families', href: '/what-we-do#children-families' },
  { label: 'Homelessness & Restoration', href: '/what-we-do#homelessness-restoration' },
  { label: 'Values in Action', href: '/what-we-do#values-in-action' },
  { label: 'Events & Experiences', href: '/events' },
]

/**
 * The section keys the desktop header shows, in order. The Aug 24 revision
 * shows the full six subjects flat — the same set as the editorial pages'
 * header, rendered in the v2 header's own design.
 */
export const HEADER_NAV_KEYS = [
  'home',
  'who-we-are',
  'what-we-do',
  'get-involved',
  'impact',
  'contact',
] as const

export const HEADER_NAV_SECTIONS: NavSection[] = HEADER_NAV_KEYS.map((key) => {
  const section = NAV_SECTIONS.find((candidate) => candidate.key === key)
  if (!section) throw new Error(`HEADER_NAV_KEYS references unknown section "${key}"`)
  return section
})
