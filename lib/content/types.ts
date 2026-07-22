/**
 * Typed content layer for Collective Calling collections and shared shapes.
 *
 * The homepage content model lives in home.types.ts; re-exported here so
 * existing '@/lib/content/types' imports keep working.
 */

export type AppealTheme = 'spain' | 'tanzania' | 'general' | 'seasonal'

export type { HomeContent, WayCard, SnapshotStat, MoneySplit } from './home.types'

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
