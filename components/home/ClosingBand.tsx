import * as React from 'react'
import { Eyebrow, DisplayHeading, PillLink } from '@/components/home/primitives'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Start your journey — design section 9. Navy, centred, 150px of air top and
 * bottom, and the two actions the hero opened with.
 */
export function ClosingBand({ content }: { content: HomeContent['closing'] }): React.JSX.Element {
  return (
    <section className="bg-band px-16 py-[150px] text-center max-md:px-6 max-md:py-20">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <DisplayHeading
          heading={content.heading}
          className="mx-auto mb-[26px] mt-[22px] max-w-[900px] text-[clamp(48px,6vw,84px)] leading-[1.05] tracking-[-0.5px] text-[#f8f4eb]"
        />
        <p className="mx-auto mb-11 mt-0 max-w-[460px] text-[17px] font-light leading-[1.7] text-slate">
          {content.body}
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <PillLink cta={content.primaryCta} padding="px-[42px] py-[18px]" />
          <PillLink cta={content.secondaryCta} variant="outline" padding="px-[42px] py-[18px]" />
        </div>
      </Reveal>
    </section>
  )
}

export default ClosingBand
