import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPreviewSecret } from '@/sanity/preview-client'
import { PHASE1_TEST_SLUG, isVisualLocale } from '@/lib/visual-page/types'

function previewPath(locale: string): string {
  return locale === 'en' ? `/${PHASE1_TEST_SLUG}` : `/${locale}/${PHASE1_TEST_SLUG}`
}

export async function GET(request: Request): Promise<NextResponse> {
  const secret = getPreviewSecret()
  if (!secret) {
    return NextResponse.json(
      { error: 'SANITY_PREVIEW_SECRET is not configured' },
      { status: 503 },
    )
  }

  const { searchParams } = new URL(request.url)
  const provided = searchParams.get('secret')
  const localeParam = searchParams.get('locale') ?? 'en'
  const slug = searchParams.get('slug') ?? PHASE1_TEST_SLUG

  if (provided !== secret) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
  if (slug !== PHASE1_TEST_SLUG || !isVisualLocale(localeParam)) {
    return NextResponse.json({ error: 'Invalid preview target' }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  const url = new URL(previewPath(localeParam), request.url)
  return NextResponse.redirect(url)
}
