import type {
  Appeal,
  AppealTheme,
  DonateTier,
  ExploreCard,
  HomeContent,
  ImpactStat,
  Testimonial,
} from '@/lib/content/types'
import { defineQuery } from 'next-sanity'
import { SEED_HOME } from '@/lib/content/seed'
import { urlForImage } from '@/sanity/image'

/**
 * GROQ query for the `homePage` singleton. Selects every field consumed by
 * HomeContent. Image fields are projected as raw objects (the whole image
 * value) so mapSanityHome can resolve them to URL strings via urlForImage.
 * Wrapped in defineQuery so Sanity TypeGen can generate its result type.
 */
export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{
  hero{ eyebrow, headline, lede, image, alt },
  impactStats[]{ icon, value, label },
  appeals[]{ slug, title, blurb, image, alt, href, theme },
  mission{ eyebrow, heading, body },
  scripture{ quote, reference },
  testimonials[]{ quote, attribution, placeholder },
  exploreCards[]{ title, blurb, image, alt, href },
  money{ programsPct, adminPct, programsLabel, adminLabel, note },
  donate{
    monthlyTiers[]{ amount, interval, impact },
    onceTiers[]{ amount, interval, impact }
  },
  trust{ registration, statement, partners }
}`)

// Treat unknown input as an indexable record without throwing.
function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function num(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return fallback
}

function arr(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

// Resolve a Sanity image field to a URL string. When the source is absent,
// malformed, or Sanity is unconfigured, urlForImage returns undefined and we
// fall back to the provided seed path (or empty string).
function resolveImage(source: unknown, fallback: string): string {
  if (typeof source === 'string') return source
  // SanityImageSource is a loose union; urlForImage already guards null/undefined.
  return urlForImage(source as never) ?? fallback
}

export function mapSanityHome(raw: unknown): HomeContent {
  const doc = asRecord(raw)

  const hero = asRecord(doc.hero)
  const mission = asRecord(doc.mission)
  const scripture = asRecord(doc.scripture)
  const money = asRecord(doc.money)
  const donate = asRecord(doc.donate)
  const trust = asRecord(doc.trust)

  const impactStats: ImpactStat[] = arr(doc.impactStats).map((item) => {
    const s = asRecord(item)
    return {
      icon: str(s.icon, 'heart') as ImpactStat['icon'],
      value: str(s.value),
      label: str(s.label),
    }
  })

  const appeals: Appeal[] = arr(doc.appeals).map((item, index) => {
    const a = asRecord(item)
    const seedAppeal = SEED_HOME.appeals[index]
    return {
      slug: str(a.slug),
      title: str(a.title),
      blurb: str(a.blurb),
      image: resolveImage(a.image, seedAppeal?.image ?? ''),
      alt: str(a.alt),
      href: str(a.href),
      theme: str(a.theme, 'general') as AppealTheme,
    }
  })

  const testimonials: Testimonial[] = arr(doc.testimonials).map((item) => {
    const t = asRecord(item)
    const result: Testimonial = {
      quote: str(t.quote),
      attribution: str(t.attribution),
    }
    if (typeof t.placeholder === 'boolean') {
      result.placeholder = t.placeholder
    }
    return result
  })

  const exploreCards: ExploreCard[] = arr(doc.exploreCards).map((item, index) => {
    const c = asRecord(item)
    const seedCard = SEED_HOME.exploreCards[index]
    return {
      title: str(c.title),
      blurb: str(c.blurb),
      image: resolveImage(c.image, seedCard?.image ?? ''),
      alt: str(c.alt),
      href: str(c.href),
    }
  })

  const mapTiers = (value: unknown, interval: DonateTier['interval']): DonateTier[] =>
    arr(value).map((item) => {
      const tier = asRecord(item)
      return {
        amount: num(tier.amount),
        interval: (tier.interval === 'monthly' || tier.interval === 'once'
          ? tier.interval
          : interval) as DonateTier['interval'],
        impact: str(tier.impact),
      }
    })

  return {
    hero: {
      eyebrow: str(hero.eyebrow),
      headline: str(hero.headline),
      lede: str(hero.lede),
      image: resolveImage(hero.image, SEED_HOME.hero.image),
      alt: str(hero.alt),
    },
    impactStats,
    appeals,
    mission: {
      eyebrow: str(mission.eyebrow),
      heading: str(mission.heading),
      body: str(mission.body),
    },
    scripture: {
      quote: str(scripture.quote),
      reference: str(scripture.reference),
    },
    testimonials,
    exploreCards,
    money: {
      programsPct: num(money.programsPct),
      adminPct: num(money.adminPct),
      programsLabel: str(money.programsLabel),
      adminLabel: str(money.adminLabel),
      note: str(money.note),
    },
    donate: {
      monthlyTiers: mapTiers(donate.monthlyTiers, 'monthly'),
      onceTiers: mapTiers(donate.onceTiers, 'once'),
    },
    trust: {
      registration: str(trust.registration),
      statement: str(trust.statement),
      partners: arr(trust.partners).map((p) => str(p)),
    },
  }
}
