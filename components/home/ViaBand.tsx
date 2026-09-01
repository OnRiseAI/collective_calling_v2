'use client'

import * as React from 'react'
import Image from 'next/image'
import { Eyebrow, DisplayHeading, ArrowLink } from '@/components/home/primitives'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Values In Action — design section 4. A 1.1fr / 1fr grid with no gutter, the
 * photograph dissolved into the navy by a mask from 72% rather than cropped.
 * Below lg it becomes a banner above the copy and the mask is dropped.
 */
export function ViaBand({ content }: { content: HomeContent['via'] }): React.JSX.Element {
  return (
    <section className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-stretch bg-band max-lg:grid-cols-1">
      <div
        className="relative min-h-[560px] max-lg:min-h-0 max-lg:h-[320px] max-md:h-[230px]"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, #000 72%, rgba(0,0,0,0) 100%)',
          maskImage: 'linear-gradient(to right, #000 72%, rgba(0,0,0,0) 100%)',
        }}
      >
        <Image
          src={content.image}
          alt={content.alt}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <Reveal className="flex flex-col justify-center px-24 py-[120px] max-md:px-6 max-md:py-14">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <DisplayHeading
          heading={content.heading}
          className="mb-6 mt-5 text-[46px] leading-[1.12] tracking-[-0.5px] text-[#f8f4eb] max-md:text-[27px]"
        />
        <p className="mb-9 mt-0 max-w-[440px] text-[16px] font-normal leading-[1.7] text-slate max-md:text-[15px]">
          {content.body}
        </p>
        <ArrowLink
          cta={content.cta}
          className="w-fit border-b border-accent pb-[5px] text-[13px] hover:border-accent-soft"
        />
      </Reveal>
    </section>
  )
}

export default ViaBand
