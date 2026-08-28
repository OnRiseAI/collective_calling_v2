import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { WelcomeGate } from '@/components/welcome/WelcomeGate'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata({
    locale,
    path: '/welcome',
    title: 'Welcome',
    description:
      'Every life becomes part of a bigger story. Take a short interactive journey to discover where you can make the greatest impact.',
  })
}

/**
 * Welcome gate (/welcome). Campaign landing only. The default URL is the
 * homepage; this page stays reachable if a link points at it.
 * Chrome-free: no site header or footer, exactly as designed.
 */
export default async function WelcomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <WelcomeGate />
}
