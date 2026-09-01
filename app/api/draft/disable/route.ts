import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { PHASE1_TEST_SLUG } from '@/lib/visual-page/types'

export async function GET(request: Request): Promise<NextResponse> {
  const draft = await draftMode()
  draft.disable()
  const url = new URL(`/${PHASE1_TEST_SLUG}`, request.url)
  return NextResponse.redirect(url)
}
