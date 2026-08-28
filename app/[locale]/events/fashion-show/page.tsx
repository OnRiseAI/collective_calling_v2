import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { FashionShow } from '@/components/events/FashionShow'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/events/fashion-show',
    title: 'The Fashion Show',
    description:
      'An evening of fashion in support of Collective Calling on Thursday 24 September 2026.',
  })
}

/**
 * The Fashion Show (/events/fashion-show). Editorial v3 page outside the
 * (site) route group. Upcoming state only: the date is 24 September 2026.
 */
export default async function FashionShowPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <FashionShow />
}
