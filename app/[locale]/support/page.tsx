import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Support } from '@/components/support/Support'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/support',
    title: 'Support our work',
    description:
      'Your generosity helps create environments where children and adults can experience healing, dignity and hope.',
  })
}

/**
 * Support / Give (/support). Editorial v3 page outside the (site) route group.
 * The live Donorbox embed remains at /donate; this page deep-links into it.
 */
export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <Support />
}
