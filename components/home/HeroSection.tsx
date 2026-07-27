import * as React from 'react'
import Image from 'next/image'
import { Eyebrow, DisplayHeading, PillLink } from '@/components/home/primitives'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Hero — design section 1.
 *
 * 100vh over a 760px floor, one photograph at 50%/40%, a four-stop gradient,
 * and the copy pinned 64px from each side and 84px from the foot. Below md the
 * side inset drops to 24px and the two actions wrap under the lede; the desktop
 * rendering is untouched.
 */
export function HeroSection({ content }: { content: HomeContent['hero'] }): React.JSX.Element {
  return (
    <section className="relative h-screen min-h-[760px] overflow-hidden bg-brand-dark">
      <Image
        src={content.image}
        alt={content.alt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(9,14,26,0.9) 0%, rgba(9,14,26,0.35) 45%, rgba(9,14,26,0.2) 82%, rgba(9,14,26,0.55) 100%)',
        }}
      />

      <div className="absolute bottom-[84px] left-16 right-16 max-md:bottom-12 max-md:left-6 max-md:right-6">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <DisplayHeading
          as="h1"
          heading={content.heading}
          className="mb-[30px] mt-[18px] text-[clamp(72px,9.5vw,148px)] leading-[0.98] tracking-[-1px] text-[#f8f4eb] max-md:text-[clamp(44px,11vw,72px)]"
        />
        <div className="flex flex-wrap items-end justify-between gap-10">
          <p className="m-0 max-w-[480px] text-[19px] font-light leading-[1.6] text-[#d8dae0]">
            {content.lede}
          </p>
          <div className="flex items-center gap-7 max-md:flex-wrap max-md:gap-4">
            <PillLink cta={content.primaryCta} padding="px-[38px] py-[18px]" />
            <PillLink cta={content.secondaryCta} variant="outline" padding="px-[38px] py-[18px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
