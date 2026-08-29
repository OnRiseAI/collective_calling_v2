import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { WelcomeFilm } from '@/components/welcome/WelcomeFilm'
import { pageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    ...pageMetadata({
      locale,
      path: '/film',
      title: 'Welcome film',
      description: 'Collective Calling welcome film.',
    }),
    robots: { index: false, follow: false },
  }
}

export default async function FilmPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <WelcomeFilm />
}
