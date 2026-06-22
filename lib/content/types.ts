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

export type AppealTheme = 'spain' | 'tanzania' | 'general'

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
