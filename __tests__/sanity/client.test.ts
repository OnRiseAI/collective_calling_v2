import { expect, test } from 'vitest'
import { isSanityConfigured } from '@/sanity/env'
import { sanityClient } from '@/sanity/client'

test('sanity is not configured and client is null when env is unset', () => {
  // env vars are unset in the test environment
  expect(isSanityConfigured()).toBe(false)
  expect(sanityClient).toBeNull()
})
