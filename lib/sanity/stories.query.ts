import type { Story } from '@/lib/content/types'
import { defineQuery } from 'next-sanity'
import { SEED_STORIES } from '@/lib/content/seed.collections'

/**
 * GROQ query for the `story` document type.
 *
 * Image fields are projected as raw objects so the mapper can resolve them via
 * urlForImage. Wrapped in defineQuery so Sanity TypeGen can generate its result
 * type.
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

export function mapSanityStory(raw: unknown, index: number): Story {
  const doc = asRecord(raw)
  const seedStory = SEED_STORIES[index]

  const images: string[] = arr(doc.images)
    .map((img) => {
      const imageRecord = asRecord(img)
      const assetRecord = asRecord(imageRecord.asset)
      return str(assetRecord._ref)
    })
    .filter(Boolean)

  const result: Story = {
    slug: str(doc.slug) || str(asRecord(doc.slug).current),
    title: str(doc.title, seedStory?.title ?? ''),
    location: (str(doc.location, 'general') as Story['location']) || 'general',
    excerpt: str(doc.excerpt, seedStory?.excerpt ?? ''),
    body: str(doc.body, seedStory?.body ?? ''),
  }

  if (images.length > 0) {
    result.images = images
  } else if (seedStory?.images) {
    result.images = seedStory.images
  }

  if (typeof doc.placeholder === 'boolean') {
    result.placeholder = doc.placeholder
  }

  return result
}
