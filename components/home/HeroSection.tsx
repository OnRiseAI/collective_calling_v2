'use client'

import * as React from 'react'
import Image from 'next/image'
import { Eyebrow, DisplayHeading, PillLink } from '@/components/home/primitives'
import { FadeIn } from '@/components/ui/FadeIn'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Hero — design section 1.
 *
 * A viewport-height frame over a 760px floor, one photograph, a four-stop
 * gradient, and the copy pinned 64px from each side and 84px from the foot.
 * Below md the side inset drops to 24px and the two actions wrap under the
 * lede; the desktop rendering is untouched.
 *
 * Height is 100svh, not 100vh: on a phone, 100vh counts the space behind the
 * browser's collapsing toolbar, so the foot of the hero — where every word of
 * this section lives — starts off screen and only appears once the reader
 * scrolls. The two units are identical on a desktop viewport.
 *
 * The photograph keeps the design's 50%/40% framing at every width. A phone
 * sees a narrow slice of a wide frame and cannot hold both figures whichever
 * way it is shifted, so the framing is left as drawn rather than re-cropped.
 */
export function HeroSection({ content }: { content: HomeContent['hero'] }): React.JSX.Element {
  return (
    <section className="relative h-svh min-h-[760px] overflow-hidden bg-brand-dark">
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
            'linear-gradient(to top, rgba(16,12,6,0.9) 0%, rgba(16,12,6,0.35) 45%, rgba(16,12,6,0.2) 82%, rgba(16,12,6,0.55) 100%)',
        }}
      />

      {/* env() resolves to 0 where there is no notch, so this only ever adds
          inset on a device that needs it — in landscape, mainly. */}
      <FadeIn
        className="absolute bottom-[84px] left-16 right-16 max-md:bottom-12 max-md:left-6 max-md:right-6"
        style={{
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <DisplayHeading
          as="h1"
          heading={content.heading}
          className="mb-[30px] mt-[18px] text-[clamp(72px,9.5vw,148px)] leading-[0.98] tracking-[-1px] text-[#f8f4eb] max-md:text-[clamp(44px,11vw,72px)]"
        />
        <div className="flex flex-wrap items-end justify-between gap-10 max-md:gap-6">
          <p className="m-0 max-w-[480px] text-[19px] font-normal leading-[1.6] text-[#E9E3D6] max-md:text-[16px]">
            {content.lede}
          </p>
          <div className="flex items-center gap-7 max-md:flex-wrap max-md:gap-4">
            <PillLink cta={content.primaryCta} shape="square" padding="px-[38px] py-[18px]" />
            <PillLink
              cta={content.secondaryCta}
              variant="outline"
              shape="square"
              padding="px-[38px] py-[18px]"
            />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

export default HeroSection
