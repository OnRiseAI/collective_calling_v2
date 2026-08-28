import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Stories } from '@/components/stories/Stories'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/stories',
    title: 'Stories',
    description: 'Real stories from the field. Real people. Real impact.',
  })
}

/**
 * Stories hub (/stories). Editorial v3 page outside the (site) route group
 * so it carries SiteHeader / SiteFooter. The Caleb detail route stays under
 * (site)/stories/[slug].
 */
export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <Stories />
}
