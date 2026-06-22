'use client'

import { NextStudio } from 'next-sanity/studio'

import config from '@/sanity.config'

// The Studio is a client-only application: it pulls in React context and
// browser APIs that cannot be evaluated during Next's server page-data
// collection. Marking the page 'use client' keeps that code out of the SSR
// pass so the build succeeds with no Sanity project configured. Route-level
// metadata, viewport, and the dynamic flag live in the sibling layout.tsx,
// which stays a server module.
export default function StudioPage() {
  return <NextStudio config={config} />
}
