'use client'

import * as React from 'react'
import { ViaBand } from '@/components/home/ViaBand'
import type { ImageTextSectionData } from '@/lib/visual-page/types'

/**
 * Thin adapter around ViaBand. Production ViaBand always places the photograph
 * first (left on desktop). The editor may choose right; the wrapper reorders
 * the two grid children without changing ViaBand itself.
 */
export function ImageTextSection({
  section,
  imageUrl,
}: {
  section: ImageTextSectionData
  imageUrl: string
}): React.JSX.Element {
  const content = {
    eyebrow: section.eyebrow,
    heading: section.headline,
    body: section.body,
    cta: section.cta,
    image: imageUrl,
    alt: section.alt,
  }

  if (section.imagePosition !== 'right') {
    return <ViaBand content={content} />
  }

  return (
    <div className="[&>section>:first-child]:lg:order-2 [&>section>:first-child]:lg:[mask-image:linear-gradient(to_left,#000_72%,rgba(0,0,0,0)_100%)] [&>section>:first-child]:lg:[-webkit-mask-image:linear-gradient(to_left,#000_72%,rgba(0,0,0,0)_100%)]">
      <ViaBand content={content} />
    </div>
  )
}
