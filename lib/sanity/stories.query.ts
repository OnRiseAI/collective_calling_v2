import type { Story } from '@/lib/content/types'
import { defineQuery } from 'next-sanity'
import { SEED_STORIES } from '@/lib/content/seed.collections'

/**
 * GROQ query for the `story` document type.
 *
 * Images are projected as asset references (`images[]{ asset }`). The mapper
 * returns the raw `_ref` string for each image; if the Sanity document has no
 * images, it falls back to the seed image paths. `urlForImage` expansion is
 * deferred until the Sanity `story` schema exists (Task 3).
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
  images[]{ asset },
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

export function mapSanityStory(raw: unknown, _index: number): Story {
  const doc = asRecord(raw)
  const slug = str(doc.slug) || str(asRecord(doc.slug).current)
  const seed = SEED_STORIES.find((s) => s.slug === slug)

  const images: string[] = arr(doc.images)
    .map((img) => {
      const imageRecord = asRecord(img)
      const assetRecord = asRecord(imageRecord.asset)
      return str(assetRecord._ref)
    })
    .filter(Boolean)

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
