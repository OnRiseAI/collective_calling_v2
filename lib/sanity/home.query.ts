import { defineQuery } from 'next-sanity'
import {
  HOME_CONTENT_VERSION,
  type Cta,
  type ExpressionCard,
  type HomeContent,
  type ImpactStat,
  type PartnerMark,
  type SplitHeading,
  type StoryCard,
} from '@/lib/content/home.types'
import { SEED_HOME } from '@/lib/content/home.seed'
import { urlForImage } from '@/sanity/image'

/**
 * GROQ for the homePage singleton, v2 shape. Images project as raw objects so
 * mapSanityHome can resolve them via urlForImage. Every field is optional in
 * practice: mapSanityHome falls back to the seed per field, so a stale or
 * partial document can never blank the homepage.
 */
export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{
  version,
  hero{ eyebrow, heading{ lead, accent }, lede, image, alt, primaryCta{ label, href }, secondaryCta{ label, href } },
  philosophy{ eyebrow, heading{ lead, accent }, body, pullquote },
  expressions{ eyebrow, heading, intro, cards[]{ key, index, title, tagline, body, image, alt, cta{ label, href } } },
  via{ eyebrow, heading{ lead, accent }, body, cta{ label, href }, image, alt },
  impact{ eyebrow, heading, intro, stats[]{ key, value, suffix, label } },
  stories{ eyebrow, heading{ lead, accent }, viewAll{ label, href }, feature{ title, blurb, image, alt, href }, cards[]{ title, blurb, image, alt, href } },
  impactCta{ eyebrow, heading{ lead, accent }, cta{ label, href }, image, alt },
  partners{ label, marks[]{ name, logo }, logoSlot{ label, href } },
  closing{ eyebrow, heading{ lead, accent }, body, primaryCta{ label, href }, secondaryCta{ label, href } }
}`)

// Treat unknown input as an indexable record without throwing.
function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

function num(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

// A CTA is overridden field by field; an absent label or href keeps the seed's.
function cta(value: unknown, fallback: Cta): Cta {
  const record = asRecord(value)
  return {
    label: str(record.label, fallback.label),
    href: str(record.href, fallback.href),
  }
}

// Same per-field merge for the split display headings.
function heading(value: unknown, fallback: SplitHeading): SplitHeading {
  const record = asRecord(value)
  return {
    lead: str(record.lead, fallback.lead),
    accent: str(record.accent, fallback.accent),
  }
}

// Resolve a Sanity image field to a URL string, falling back to the seed path.
function resolveImage(source: unknown, fallback: string): string {
  if (typeof source === 'string') return source
  return urlForImage(source as never) ?? fallback
}

/**
 * Map a list of CMS entries over the seed list by index: entry n overrides seed
 * item n, and any seed item the document does not reach is kept as authored.
 * The document can edit the entries it covers but never shorten the list.
 */
function overlay<T>(docList: unknown, seedList: T[], map: (value: unknown, seed: T) => T): T[] {
  const entries = Array.isArray(docList) ? docList : []
  return seedList.map((seed, index) => (index < entries.length ? map(entries[index], seed) : seed))
}

function mapStory(value: unknown, seed: StoryCard): StoryCard {
  const card = asRecord(value)
  return {
    title: str(card.title, seed.title),
    blurb: str(card.blurb, seed.blurb),
    image: resolveImage(card.image, seed.image),
    alt: str(card.alt, seed.alt),
    href: str(card.href, seed.href),
  }
}

function mapExpression(value: unknown, seed: ExpressionCard): ExpressionCard {
  const card = asRecord(value)
  return {
    // key and index identify the card's slot in the layout, so they stay ours.
    key: seed.key,
    index: seed.index,
    title: str(card.title, seed.title),
    tagline: str(card.tagline, seed.tagline),
    body: str(card.body, seed.body),
    image: resolveImage(card.image, seed.image),
    alt: str(card.alt, seed.alt),
    cta: cta(card.cta, seed.cta),
  }
}

function mapStat(value: unknown, seed: ImpactStat): ImpactStat {
  const stat = asRecord(value)
  return {
    key: seed.key,
    value: num(stat.value, seed.value),
    // An empty suffix is meaningful ("2 charity shops" takes no "+"), so any
    // string the document supplies wins, including "".
    suffix: typeof stat.suffix === 'string' ? stat.suffix : seed.suffix,
    label: str(stat.label, seed.label),
  }
}

function mapMark(value: unknown, seed: PartnerMark): PartnerMark {
  const mark = asRecord(value)
  const logo = mark.logo == null ? seed.logo : resolveImage(mark.logo, seed.logo ?? '')
  return {
    name: str(mark.name, seed.name),
    ...(logo ? { logo } : {}),
  }
}

export function mapSanityHome(raw: unknown): HomeContent {
  const doc = asRecord(raw)

  // A document written for an earlier shape shares field names with this one
  // (hero.primaryCta, via.cta, and so on) but not their meaning, so merging it
  // would dress the current design in the previous one's copy. Only a document
  // that declares the current version is trusted; anything else renders as the
  // seed until scripts/seed-sanity.ts restamps it.
  if (doc.version !== HOME_CONTENT_VERSION) return SEED_HOME

  const hero = asRecord(doc.hero)
  const philosophy = asRecord(doc.philosophy)
  const expressions = asRecord(doc.expressions)
  const via = asRecord(doc.via)
  const impact = asRecord(doc.impact)
  const stories = asRecord(doc.stories)
  const impactCta = asRecord(doc.impactCta)
  const partners = asRecord(doc.partners)
  const closing = asRecord(doc.closing)

  return {
    hero: {
      eyebrow: str(hero.eyebrow, SEED_HOME.hero.eyebrow),
      heading: heading(hero.heading, SEED_HOME.hero.heading),
      lede: str(hero.lede, SEED_HOME.hero.lede),
      image: resolveImage(hero.image, SEED_HOME.hero.image),
      alt: str(hero.alt, SEED_HOME.hero.alt),
      primaryCta: cta(hero.primaryCta, SEED_HOME.hero.primaryCta),
      secondaryCta: cta(hero.secondaryCta, SEED_HOME.hero.secondaryCta),
    },
    philosophy: {
      eyebrow: str(philosophy.eyebrow, SEED_HOME.philosophy.eyebrow),
      heading: heading(philosophy.heading, SEED_HOME.philosophy.heading),
      body: str(philosophy.body, SEED_HOME.philosophy.body),
      pullquote: str(philosophy.pullquote, SEED_HOME.philosophy.pullquote),
    },
    expressions: {
      eyebrow: str(expressions.eyebrow, SEED_HOME.expressions.eyebrow),
      heading: str(expressions.heading, SEED_HOME.expressions.heading),
      intro: str(expressions.intro, SEED_HOME.expressions.intro),
      cards: overlay(expressions.cards, SEED_HOME.expressions.cards, mapExpression),
    },
    via: {
      eyebrow: str(via.eyebrow, SEED_HOME.via.eyebrow),
      heading: heading(via.heading, SEED_HOME.via.heading),
      body: str(via.body, SEED_HOME.via.body),
      cta: cta(via.cta, SEED_HOME.via.cta),
      image: resolveImage(via.image, SEED_HOME.via.image),
      alt: str(via.alt, SEED_HOME.via.alt),
    },
    impact: {
      eyebrow: str(impact.eyebrow, SEED_HOME.impact.eyebrow),
      heading: str(impact.heading, SEED_HOME.impact.heading),
      intro: str(impact.intro, SEED_HOME.impact.intro),
      stats: overlay(impact.stats, SEED_HOME.impact.stats, mapStat),
    },
    stories: {
      eyebrow: str(stories.eyebrow, SEED_HOME.stories.eyebrow),
      heading: heading(stories.heading, SEED_HOME.stories.heading),
      viewAll: cta(stories.viewAll, SEED_HOME.stories.viewAll),
      feature: mapStory(stories.feature, SEED_HOME.stories.feature),
      cards: overlay(stories.cards, SEED_HOME.stories.cards, mapStory),
    },
    impactCta: {
      eyebrow: str(impactCta.eyebrow, SEED_HOME.impactCta.eyebrow),
      heading: heading(impactCta.heading, SEED_HOME.impactCta.heading),
      cta: cta(impactCta.cta, SEED_HOME.impactCta.cta),
      image: resolveImage(impactCta.image, SEED_HOME.impactCta.image),
      // The impact card's photograph is decorative, so an empty alt is the
      // correct value and must survive: take any string the document supplies.
      alt: typeof impactCta.alt === 'string' ? impactCta.alt : SEED_HOME.impactCta.alt,
    },
    partners: {
      label: str(partners.label, SEED_HOME.partners.label),
      marks: overlay(partners.marks, SEED_HOME.partners.marks, mapMark),
      logoSlot: cta(partners.logoSlot, SEED_HOME.partners.logoSlot),
    },
    closing: {
      eyebrow: str(closing.eyebrow, SEED_HOME.closing.eyebrow),
      heading: heading(closing.heading, SEED_HOME.closing.heading),
      body: str(closing.body, SEED_HOME.closing.body),
      primaryCta: cta(closing.primaryCta, SEED_HOME.closing.primaryCta),
      secondaryCta: cta(closing.secondaryCta, SEED_HOME.closing.secondaryCta),
    },
  }
}
