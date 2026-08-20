import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Journey } from '@/components/journey/Journey'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/journey',
    title: 'Find your path',
    description:
      'This short interactive journey helps you discover how your unique strengths, values and opportunities could be part of a bigger story.',
  })
}

/**
 * Find Your Path (/journey). A full-viewport interactive journey, reached
 * from the homepage's START YOUR JOURNEY actions. All copy and geometry is
 * static in components/journey/journey.data.ts — nothing here reads Sanity.
 */
export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <Journey />
}
