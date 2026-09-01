import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getVisualPageForRequest } from '@/lib/visual-page/read'
import { PHASE1_TEST_SLUG } from '@/lib/visual-page/types'
import { VisualPageRenderer } from '@/components/visual-page/VisualPageRenderer'
import { PreviewBanner } from '@/components/visual-page/PreviewBanner'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const page = await getVisualPageForRequest({ locale, slug: PHASE1_TEST_SLUG })
  return {
    title: page.seo.title,
    description: page.seo.description,
    robots: { index: false, follow: false },
  }
}

export default async function EditorTestPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const page = await getVisualPageForRequest({ locale, slug: PHASE1_TEST_SLUG })

  return (
    <>
      {page.draftRequested ? <PreviewBanner draftTokenMissing={page.draftTokenMissing} /> : null}
      <VisualPageRenderer page={page} />
    </>
  )
}
