import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Events } from '@/components/events/Events'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/events',
    title: 'Events & Experiences',
    description:
      'Gatherings, experiences and moments that bring people together around one purpose.',
  })
}

/**
 * Events & Experiences (/events). An editorial page that sits outside the
 * (site) route group on purpose: it carries the v3 SiteHeader and SiteFooter.
 * All copy is static in the component; nothing here reads Sanity.
 */
export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <Events />
}
