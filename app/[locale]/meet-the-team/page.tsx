import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { MeetTheTeam } from '@/components/meet-the-team/MeetTheTeam'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/meet-the-team',
    title: 'Meet the team',
    description:
      'Different backgrounds. Shared calling. The people leading and running Collective Calling in Spain and Tanzania.',
  })
}

/**
 * Meet the Team (/meet-the-team). An editorial page that sits outside the
 * (site) route group on purpose: it carries the v3 SiteHeader and SiteFooter.
 * All copy is static in the component; nothing here reads Sanity.
 */
export default async function MeetTheTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <MeetTheTeam />
}
