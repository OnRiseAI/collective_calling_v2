import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { WhoWeAre } from '@/components/who-we-are/WhoWeAre'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/who-we-are',
    title: 'Who we are',
    description:
      'We believe every person possesses inherent worth — and sometimes, the right environment can help someone rediscover it.',
  })
}

/**
 * Who We Are (/who-we-are). An editorial page that sits outside the (site)
 * route group on purpose: its design carries its own header (EditorialHeader)
 * and closes on The Invitation band with no site footer. All copy is static
 * in the component — nothing here reads Sanity.
 */
export default async function WhoWeArePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <WhoWeAre />
}
