import type { AppealEntry, AppealTheme } from '@/lib/content/types'
import { defineQuery } from 'next-sanity'
import { SEED_APPEALS } from '@/lib/content/seed.collections'
import { urlForImage } from '@/sanity/image'

/**
 * GROQ query for the `appealEntry` document type.
 *
 * Image fields are projected as raw objects so the mapper can resolve them via
 * urlForImage. Wrapped in defineQuery so Sanity TypeGen can generate its result
 * type.
 *
 * No em dashes anywhere in this file.
 */
export const APPEALS_QUERY = defineQuery(`*[_type == "appealEntry"] | order(_createdAt asc){
  slug,
  title,
  theme,
  blurb,
  body,
  image,
  alt,
  relatedHref,
  donationDesignation,
  donorboxQuery{ amount, recurring, default_interval },
  placeholder
}`)

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function resolveImage(source: unknown, fallback: string | undefined): string | undefined {
  if (typeof source === 'string') return source
  if (!source) return fallback
  return urlForImage(source as never) ?? fallback
}

export function mapSanityAppeal(raw: unknown, index: number): AppealEntry {
  const doc = asRecord(raw)
  const seedAppeal = SEED_APPEALS[index]

  const slugValue = asRecord(doc.slug)
  const slug = str(doc.slug) || str(slugValue.current)

  const donorboxRaw = doc.donorboxQuery
  let donorboxQuery: AppealEntry['donorboxQuery'] | undefined
  if (donorboxRaw && typeof donorboxRaw === 'object') {
    const dq = asRecord(donorboxRaw)
    const amount = typeof dq.amount === 'number' ? dq.amount : 0
    const recurring = typeof dq.recurring === 'boolean' ? dq.recurring : false
    const defaultInterval = str(dq.default_interval, 'o')
    donorboxQuery = {
      amount,
      recurring,
      default_interval: defaultInterval as 'm' | 'y' | 'o',
    }
  }

  const result: AppealEntry = {
    slug,
    title: str(doc.title, seedAppeal?.title ?? ''),
    theme: (str(doc.theme, 'general') as AppealTheme) || 'general',
    blurb: str(doc.blurb, seedAppeal?.blurb ?? ''),
    body: str(doc.body, seedAppeal?.body ?? ''),
    relatedHref: str(doc.relatedHref, seedAppeal?.relatedHref ?? ''),
    donationDesignation: str(doc.donationDesignation, seedAppeal?.donationDesignation ?? ''),
  }

  const resolvedImage = resolveImage(doc.image, seedAppeal?.image)
  if (resolvedImage !== undefined) {
    result.image = resolvedImage
  }

  const alt = str(doc.alt, seedAppeal?.alt ?? '')
  if (alt) {
    result.alt = alt
  }

  if (donorboxQuery) {
    result.donorboxQuery = donorboxQuery
  }

  if (typeof doc.placeholder === 'boolean') {
    result.placeholder = doc.placeholder
  }

  return result
}
