import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { WhatWeDo } from '@/components/what-we-do/WhatWeDo'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/what-we-do',
    title: 'What we do',
    description:
      'Different lives need different environments. Our work meets people where they are and creates space for what could come next.',
  })
}

/**
 * What We Do (/what-we-do). Sits outside the (site) route group and carries
 * the v3 SiteHeader and SiteFooter. All copy is static in the component;
 * nothing here reads Sanity.
 */
export default async function WhatWeDoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <WhatWeDo />
}
