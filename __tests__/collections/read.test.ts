/**
 * Task 2: Guarded read layer tests.
 *
 * Mocks sanityClient as null to exercise the seed fallback path. All three
 * collection getters must return the seed data without throwing. getStory and
 * getAppeal resolve against the list result, so unknown slugs resolve to
 * undefined and known slugs resolve to the correct entry.
 *
 * No em dashes anywhere in this file.
 */

import { expect, test, vi } from 'vitest'
import { SEED_STORIES, SEED_APPEALS, SEED_EVENTS } from '@/lib/content/seed.collections'

// Mock the Sanity client so it is always null. This simulates an unconfigured
// environment and exercises the seed fallback in every getter.
vi.mock('@/sanity/client', () => ({ sanityClient: null }))

test('getStories falls back to SEED_STORIES when Sanity is unconfigured', async () => {
  const { getStories } = await import('@/lib/content/stories')
  const result = await getStories()
  expect(result).toEqual(SEED_STORIES)
})

test('getStory resolves the caleb entry when Sanity is unconfigured', async () => {
  const { getStory } = await import('@/lib/content/stories')
  const result = await getStory('caleb')
  expect(result).toBeDefined()
  expect(result?.slug).toBe('caleb')
})

test('getStory returns undefined for an unknown slug', async () => {
  const { getStory } = await import('@/lib/content/stories')
  const result = await getStory('nope')
  expect(result).toBeUndefined()
})

test('getAppeals falls back to SEED_APPEALS and includes sponsor-a-child', async () => {
  const { getAppeals } = await import('@/lib/content/appeals')
  const result = await getAppeals()
  expect(result.find((a) => a.slug === 'sponsor-a-child')).toBeDefined()
})

test('getAppeal resolves greatest-need when Sanity is unconfigured', async () => {
  const { getAppeal } = await import('@/lib/content/appeals')
  const result = await getAppeal('greatest-need')
  expect(result).toBeDefined()
  expect(result?.slug).toBe('greatest-need')
})

test('getEvents returns all three seed events', async () => {
  const { getEvents } = await import('@/lib/content/events')
  const result = await getEvents()
  expect(result).toHaveLength(SEED_EVENTS.length)
  expect(result).toHaveLength(3)
})
