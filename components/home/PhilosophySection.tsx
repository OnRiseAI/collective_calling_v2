import * as React from 'react'
import { Eyebrow, DisplayHeading } from '@/components/home/primitives'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Our philosophy — design section 2. 140px above, nothing below (the next
 * section carries its own 130px), an 840px centred measure.
 */
export function PhilosophySection({
  content,
}: {
  content: HomeContent['philosophy']
}): React.JSX.Element {
  return (
    <section className="px-16 pt-[140px] max-md:px-6 max-md:pt-20">
      <div className="mx-auto max-w-[840px] text-center">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <DisplayHeading
          heading={content.heading}
          className="mb-[26px] mt-[18px] text-[54px] leading-[1.08] tracking-[-0.5px] max-md:text-[34px]"
        />
        <p className="mb-[18px] mt-0 text-[17px] font-light leading-[1.8] text-muted">
          {content.body}
        </p>
        <p className="m-0 font-heading text-[22px] italic leading-[1.5] text-ink">
          {content.pullquote}
        </p>
      </div>
    </section>
  )
}

export default PhilosophySection
