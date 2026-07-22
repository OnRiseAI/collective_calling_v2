import { defineQuery } from 'next-sanity'
import type {
  HomeContent,
  InvolveAction,
  SnapshotStat,
  StoryCard,
  WayCard,
} from '@/lib/content/home.types'
import { SEED_HOME } from '@/lib/content/home.seed'
import { urlForImage } from '@/sanity/image'

/**
 * GROQ for the homePage singleton, mockup-theme shape (spec v2). Images project
 * as raw objects so mapSanityHome can resolve them via urlForImage. Every field
 * is optional in practice: mapSanityHome falls back to the seed per field, so a
 * stale or partial document can never blank the homepage.
 */
export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{
  hero{ eyebrow, headlineLead, headlineAccent, lede, image, alt, primaryCta{ label, href }, secondaryCta{ label, href }, scrollCue },
  ways{ heading, cards[]{ key, title, body, image, alt, href } },
  via{ eyebrow, heading, body, cta{ label, href }, image, alt },
  storiesIntro{ heading, subline, viewAll{ label, href }, cards[]{ title, blurb, image, alt, href } },
  snapshot{ heading, stats[]{ icon, value, label } },
  partners{ heading, body, names, logoSlot, cta{ label, href } },
  involve{ heading, body, actions[]{ icon, title, blurb, href }, image, alt, shops{ heading, body, cta{ label, href } } }
}`)

// Treat unknown input as an indexable record without throwing.
function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

function strArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback
  const strings = value.filter((item): item is string => typeof item === 'string' && item.length > 0)
  return strings.length > 0 ? strings : fallback
}

// Merge a CMS CTA object over its seed fallback (fallback keys drive the merge).
function cta<T extends { label: string }>(value: unknown, fallback: T): T {
  const record = asRecord(value)
  const merged = { ...fallback } as Record<string, unknown>
  for (const key of Object.keys(fallback)) {
    merged[key] = str(record[key], (fallback as Record<string, string>)[key])
  }
  return merged as T
}

// Resolve a Sanity image field to a URL string, falling back to the seed path.
function resolveImage(source: unknown, fallback: string): string {
  if (typeof source === 'string') return source
  return urlForImage(source as never) ?? fallback
}

export function mapSanityHome(raw: unknown): HomeContent {
  const doc = asRecord(raw)
  const hero = asRecord(doc.hero)
  const ways = asRecord(doc.ways)
  const via = asRecord(doc.via)
  const storiesIntro = asRecord(doc.storiesIntro)
  const snapshot = asRecord(doc.snapshot)
  const partners = asRecord(doc.partners)
  const involve = asRecord(doc.involve)
  const shops = asRecord(involve.shops)

  const wayDocs = Array.isArray(ways.cards) ? ways.cards : []
  const storyCardDocs = Array.isArray(storiesIntro.cards) ? storiesIntro.cards : []
  const statDocs = Array.isArray(snapshot.stats) ? snapshot.stats : []
  const actionDocs = Array.isArray(involve.actions) ? involve.actions : []

  const mapWay = (value: unknown, seed: WayCard): WayCard => {
    const card = asRecord(value)
    return {
      key: seed.key,
      title: str(card.title, seed.title),
      body: str(card.body, seed.body),
      image: resolveImage(card.image, seed.image),
      alt: str(card.alt, seed.alt),
      href: str(card.href, seed.href),
    }
  }

  const mapStoryCard = (value: unknown, seed: StoryCard): StoryCard => {
    const card = asRecord(value)
    return {
      title: str(card.title, seed.title),
      blurb: str(card.blurb, seed.blurb),
      image: resolveImage(card.image, seed.image),
      alt: str(card.alt, seed.alt),
      href: str(card.href, seed.href),
    }
  }

  const mapStat = (value: unknown, seed: SnapshotStat): SnapshotStat => {
    const stat = asRecord(value)
    return {
      icon: seed.icon,
      value: str(stat.value, seed.value),
      label: str(stat.label, seed.label),
    }
  }

  const mapAction = (value: unknown, seed: InvolveAction): InvolveAction => {
    const action = asRecord(value)
    return {
      icon: seed.icon,
      title: str(action.title, seed.title),
      blurb: str(action.blurb, seed.blurb),
      href: str(action.href, seed.href),
    }
  }

  return {
    hero: {
      eyebrow: str(hero.eyebrow, SEED_HOME.hero.eyebrow),
      headlineLead: str(hero.headlineLead, SEED_HOME.hero.headlineLead),
      headlineAccent: str(hero.headlineAccent, SEED_HOME.hero.headlineAccent),
      lede: str(hero.lede, SEED_HOME.hero.lede),
      image: resolveImage(hero.image, SEED_HOME.hero.image),
      alt: str(hero.alt, SEED_HOME.hero.alt),
      primaryCta: cta(hero.primaryCta, SEED_HOME.hero.primaryCta),
      secondaryCta: cta(hero.secondaryCta, SEED_HOME.hero.secondaryCta),
      scrollCue: str(hero.scrollCue, SEED_HOME.hero.scrollCue),
    },
    ways: {
      heading: str(ways.heading, SEED_HOME.ways.heading),
      cards: SEED_HOME.ways.cards.map((seed, index) => mapWay(wayDocs[index], seed)),
    },
    via: {
      eyebrow: str(via.eyebrow, SEED_HOME.via.eyebrow),
      heading: str(via.heading, SEED_HOME.via.heading),
      body: str(via.body, SEED_HOME.via.body),
      cta: cta(via.cta, SEED_HOME.via.cta),
      image: resolveImage(via.image, SEED_HOME.via.image),
      alt: str(via.alt, SEED_HOME.via.alt),
    },
    storiesIntro: {
      heading: str(storiesIntro.heading, SEED_HOME.storiesIntro.heading),
      subline: str(storiesIntro.subline, SEED_HOME.storiesIntro.subline),
      viewAll: cta(storiesIntro.viewAll, SEED_HOME.storiesIntro.viewAll),
      cards: SEED_HOME.storiesIntro.cards.map((seed, index) =>
        mapStoryCard(storyCardDocs[index], seed),
      ),
    },
    snapshot: {
      heading: str(snapshot.heading, SEED_HOME.snapshot.heading),
      stats: SEED_HOME.snapshot.stats.map((seed, index) => mapStat(statDocs[index], seed)),
    },
    partners: {
      heading: str(partners.heading, SEED_HOME.partners.heading),
      body: str(partners.body, SEED_HOME.partners.body),
      names: strArray(partners.names, SEED_HOME.partners.names),
      logoSlot: str(partners.logoSlot, SEED_HOME.partners.logoSlot),
      cta: cta(partners.cta, SEED_HOME.partners.cta),
    },
    involve: {
      heading: str(involve.heading, SEED_HOME.involve.heading),
      body: str(involve.body, SEED_HOME.involve.body),
      actions: SEED_HOME.involve.actions.map((seed, index) => mapAction(actionDocs[index], seed)),
      image: resolveImage(involve.image, SEED_HOME.involve.image),
      alt: str(involve.alt, SEED_HOME.involve.alt),
      shops: {
        heading: str(shops.heading, SEED_HOME.involve.shops.heading),
        body: str(shops.body, SEED_HOME.involve.shops.body),
        cta: cta(shops.cta, SEED_HOME.involve.shops.cta),
      },
    },
  }
}
