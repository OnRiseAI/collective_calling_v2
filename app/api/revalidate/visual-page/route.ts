import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { PHASE1_TEST_SLUG, isVisualLocale } from '@/lib/visual-page/types'

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const record = body && typeof body === 'object' ? (body as Record<string, unknown>) : {}
  const slug = typeof record.slug === 'string' ? record.slug : ''
  const locale = typeof record.locale === 'string' ? record.locale : ''

  if (slug !== PHASE1_TEST_SLUG || !isVisualLocale(locale)) {
    return NextResponse.json({ error: 'Only the isolated editor-test page can be revalidated' }, { status: 400 })
  }

  revalidatePath(`/${PHASE1_TEST_SLUG}`)
  revalidatePath(`/en/${PHASE1_TEST_SLUG}`)
  revalidatePath(`/es/${PHASE1_TEST_SLUG}`)

  return NextResponse.json({ revalidated: true, slug, locale })
}
