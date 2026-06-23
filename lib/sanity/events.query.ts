import type { EventItem } from '@/lib/content/types'
import { defineQuery } from 'next-sanity'
import { SEED_EVENTS } from '@/lib/content/seed.collections'
import { urlForImage } from '@/sanity/image'

/**
 * GROQ query for the `eventItem` document type.
 *
 * Image fields are projected as raw objects so the mapper can resolve them via
 * urlForImage. Wrapped in defineQuery so Sanity TypeGen can generate its result
 * type.
 *
 * No em dashes anywhere in this file.
 */
export const EVENTS_QUERY = defineQuery(`*[_type == "eventItem"] | order(date asc, _createdAt asc){
  slug,
  title,
  summary,
  image,
  alt,
  dateLabel,
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

export function mapSanityEvent(raw: unknown, _index: number): EventItem {
  const doc = asRecord(raw)
  const slugValue = asRecord(doc.slug)
  const slug = str(doc.slug) || str(slugValue.current)
  const seed = SEED_EVENTS.find((e) => e.slug === slug)

  const result: EventItem = {
    slug,
    title: str(doc.title, seed?.title ?? ''),
    summary: str(doc.summary, seed?.summary ?? ''),
  }

  const resolvedImage = resolveImage(doc.image, seed?.image)
  if (resolvedImage !== undefined) {
    result.image = resolvedImage
  }

  const alt = str(doc.alt, seed?.alt ?? '')
  if (alt) {
    result.alt = alt
  }

  const dateLabel = str(doc.dateLabel)
  if (dateLabel) {
    result.dateLabel = dateLabel
  }

  if (typeof doc.placeholder === 'boolean') {
    result.placeholder = doc.placeholder
  }

  return result
}
