/**
 * Typed content layer for the Collective Calling homepage.
 *
 * Every homepage section consumes these types. `getHomeContent` returns the
 * seed content for now; a later plan will read a CMS and fall back to this seed.
 */

export type ImpactStat = {
  icon: 'shower' | 'home' | 'heart'
  value: string
  label: string
}

export type AppealTheme = 'spain' | 'tanzania' | 'general' | 'seasonal'

export type Appeal = {
  slug: string
  title: string
  blurb: string
  image: string
  alt: string
  href: string
  theme: AppealTheme
}

export type Testimonial = {
  quote: string
  attribution: string
  placeholder?: boolean
}

export type ExploreCard = {
  title: string
  blurb: string
  image: string
  alt: string
  href: string
}

export type DonateTier = {
  amount: number
  interval: 'monthly' | 'once'
  impact: string
}

export type HomeContent = {
  hero: { eyebrow: string; headline: string; lede: string; image: string; alt: string }
  impactStats: ImpactStat[]
  appeals: Appeal[]
  mission: { eyebrow: string; heading: string; body: string }
  scripture: { quote: string; reference: string }
  testimonials: Testimonial[]
  exploreCards: ExploreCard[]
  money: { programsPct: number; adminPct: number; programsLabel: string; adminLabel: string; note: string }
  donate: { monthlyTiers: DonateTier[]; onceTiers: DonateTier[] }
  trust: { registration: string; statement: string; partners: string[] }
}

// Re-export RichBlock from pages/types so consumers can import from one place.
export type { RichBlock } from './pages/types'

/** A real story of a person whose life was changed through Collective Calling's work. */
export type Story = {
  slug: string
  title: string
  location: 'tanzania' | 'spain' | 'general'
  excerpt: string
  body: string
  images?: string[]
  placeholder?: boolean
}

/** A giving option keyed to a live Donorbox designation. */
export type AppealEntry = {
  slug: string
  title: string
  theme: AppealTheme
  blurb: string
  body: string
  image?: string
  alt?: string
  relatedHref: string
  donationDesignation: string
  donorboxQuery?: {
    amount: number
    recurring: boolean
    default_interval: 'm' | 'y' | 'o'
  }
  placeholder?: boolean
}

/** A fundraising or community event run by or for Collective Calling. */
export type EventItem = {
  slug: string
  title: string
  summary: string
  image?: string
  alt?: string
  dateLabel?: string
  placeholder?: boolean
}
