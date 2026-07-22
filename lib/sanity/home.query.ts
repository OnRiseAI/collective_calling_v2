import { defineQuery } from 'next-sanity'
import type { ExpressionRow, HomeContent } from '@/lib/content/home.types'
import { SEED_HOME } from '@/lib/content/home.seed'
import { urlForImage } from '@/sanity/image'

/**
 * GROQ for the homePage singleton, six-chapter shape. Images project as raw
 * objects so mapSanityHome can resolve them via urlForImage. Every field is
 * optional in practice: mapSanityHome falls back to the seed per field, so a
 * stale or partial document can never blank the homepage.
 */
export const HOME_QUERY = defineQuery(`*[_type == "homePage"][0]{
  hero{ headline, text, image, alt, primaryCta{ label, targetId }, secondaryCta{ label, targetId } },
  philosophy{ headline, body, pullLine },
  expressions{ headline, intro, credo, rows[]{ key, eyebrow, heading, belief, body, image, alt, cta{ label, href } } },
  possible{ headline, intro, moments, outro },
  impact{ headline, intro, moments, outro, cta{ label, href } },
  invitation{ headline, intro, bring, outro, cta{ label, href } }
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

// Merge a CMS CTA object over its seed fallback. The fallback's own keys drive
// the merge, so the one helper serves both {label, targetId} and {label, href}.
function cta<T extends { label: string }>(value: unknown, fallback: T): T {
  const record = asRecord(value)
  const merged = { ...fallback } as Record<string, unknown>
  for (const key of Object.keys(fallback)) {
    merged[key] = str(record[key], (fallback as Record<string, string>)[key])
  }
  return merged as T
}

// Resolve a Sanity image field to a URL string, falling back to the seed path
// when the source is absent, malformed, or Sanity is unconfigured.
function resolveImage(source: unknown, fallback: string): string {
  if (typeof source === 'string') return source
  return urlForImage(source as never) ?? fallback
}

function mapExpressionRow(value: unknown, seed: ExpressionRow): ExpressionRow {
  const row = asRecord(value)
  return {
    key: seed.key,
    eyebrow: str(row.eyebrow, seed.eyebrow),
    heading: str(row.heading, seed.heading),
    belief: str(row.belief, seed.belief),
    body: str(row.body, seed.body),
    image: resolveImage(row.image, seed.image),
    alt: str(row.alt, seed.alt),
    cta: cta(row.cta, seed.cta),
  }
}

export function mapSanityHome(raw: unknown): HomeContent {
  const doc = asRecord(raw)
  const hero = asRecord(doc.hero)
  const philosophy = asRecord(doc.philosophy)
  const expressions = asRecord(doc.expressions)
  const possible = asRecord(doc.possible)
  const impact = asRecord(doc.impact)
  const invitation = asRecord(doc.invitation)

  const docRows = Array.isArray(expressions.rows) ? expressions.rows : []

  return {
    hero: {
      headline: str(hero.headline, SEED_HOME.hero.headline),
      text: strArray(hero.text, SEED_HOME.hero.text),
      image: resolveImage(hero.image, SEED_HOME.hero.image),
      alt: str(hero.alt, SEED_HOME.hero.alt),
      primaryCta: cta(hero.primaryCta, SEED_HOME.hero.primaryCta),
      secondaryCta: cta(hero.secondaryCta, SEED_HOME.hero.secondaryCta),
    },
    philosophy: {
      headline: str(philosophy.headline, SEED_HOME.philosophy.headline),
      body: strArray(philosophy.body, SEED_HOME.philosophy.body),
      pullLine: str(philosophy.pullLine, SEED_HOME.philosophy.pullLine),
    },
    expressions: {
      headline: str(expressions.headline, SEED_HOME.expressions.headline),
      intro: str(expressions.intro, SEED_HOME.expressions.intro),
      credo: strArray(expressions.credo, SEED_HOME.expressions.credo),
      rows: SEED_HOME.expressions.rows.map((seedRow, index) =>
        mapExpressionRow(docRows[index], seedRow),
      ),
    },
    possible: {
      headline: str(possible.headline, SEED_HOME.possible.headline),
      intro: str(possible.intro, SEED_HOME.possible.intro),
      moments: strArray(possible.moments, SEED_HOME.possible.moments),
      outro: str(possible.outro, SEED_HOME.possible.outro),
    },
    impact: {
      headline: str(impact.headline, SEED_HOME.impact.headline),
      intro: strArray(impact.intro, SEED_HOME.impact.intro),
      moments: strArray(impact.moments, SEED_HOME.impact.moments),
      outro: str(impact.outro, SEED_HOME.impact.outro),
      cta: cta(impact.cta, SEED_HOME.impact.cta),
    },
    invitation: {
      headline: str(invitation.headline, SEED_HOME.invitation.headline),
      intro: str(invitation.intro, SEED_HOME.invitation.intro),
      bring: strArray(invitation.bring, SEED_HOME.invitation.bring),
      outro: str(invitation.outro, SEED_HOME.invitation.outro),
      cta: cta(invitation.cta, SEED_HOME.invitation.cta),
    },
  }
}
