import type { Story } from '@/lib/content/types'
import { defineQuery } from 'next-sanity'
import { SEED_STORIES } from '@/lib/content/seed.collections'
import { urlForImage } from '@/sanity/image'

/**
 * GROQ query for the `story` document type.
 *
 * Images are projected with their full object (including asset) so the mapper
 * can resolve each one to a usable URL via urlForImage. If the Sanity document
 * has no resolvable images, the mapper falls back to the seed story's images.
 *
 * Wrapped in defineQuery so Sanity TypeGen can generate its result type.
 *
 * No em dashes anywhere in this file.
 */
export const STORIES_QUERY = defineQuery(`*[_type == "story"] | order(_createdAt asc){
  slug,
  title,
  location,
  excerpt,
  body,
  images[]{ ..., asset },
  placeholder
}`)

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function arr(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

function resolveImage(source: unknown, fallback: string | undefined): string | undefined {
  if (typeof source === 'string') return source
  if (!source) return fallback
  return urlForImage(source as never) ?? fallback
}

export function mapSanityStory(raw: unknown, _index: number): Story {
  const doc = asRecord(raw)
  const slug = str(doc.slug) || str(asRecord(doc.slug).current)
  const seed = SEED_STORIES.find((s) => s.slug === slug)

  const images: string[] = arr(doc.images)
    .map((img) => resolveImage(img, undefined))
    .filter((url): url is string => typeof url === 'string' && url.length > 0)

  const result: Story = {
    slug,
    title: str(doc.title, seed?.title ?? ''),
    location: (str(doc.location, 'general') as Story['location']) || 'general',
    excerpt: str(doc.excerpt, seed?.excerpt ?? ''),
    body: str(doc.body, seed?.body ?? ''),
  }

  if (images.length > 0) {
    result.images = images
  } else if (seed?.images) {
    result.images = seed.images
  }

  if (typeof doc.placeholder === 'boolean') {
    result.placeholder = doc.placeholder
  }

  return result
}
