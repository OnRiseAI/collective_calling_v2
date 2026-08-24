'use client'

import * as React from 'react'
import { useReducedMotion } from 'framer-motion'
import { Eyebrow, PlainHeading } from '@/components/home/primitives'
import { Reveal } from '@/components/ui/Reveal'
import type { HomeContent } from '@/lib/content/home.types'

/**
 * Impact — design section 5, and the design's one piece of motion: an observer
 * at a 0.3 threshold starts a 1400ms ease-out-cubic count, exactly as the
 * design's script does it.
 *
 * The figures render at their final value on the server, so a reader without
 * JavaScript sees real numbers; the band arms and rewinds on mount, far below
 * the fold. Readers who ask for reduced motion keep the final value. Assistive
 * technology always reads the final figure from the visually hidden copy rather
 * than the intermediate frames.
 */

const DURATION_MS = 1400

export function ImpactStats({ content }: { content: HomeContent['impact'] }): React.JSX.Element {
  const reduceMotion = useReducedMotion()
  const bandRef = React.useRef<HTMLElement>(null)
  const [t, setT] = React.useState(1)

  React.useEffect(() => {
    const band = bandRef.current
    if (reduceMotion || !band || typeof IntersectionObserver === 'undefined') return

    setT(0)
    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION_MS)
          setT(1 - Math.pow(1 - p, 3))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )
    observer.observe(band)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      setT(1)
    }
  }, [reduceMotion])

  return (
    <section
      ref={bandRef}
      className="border-b border-rule px-16 py-[110px] max-md:px-6 max-md:py-14"
    >
      <Reveal className="mx-auto mb-[70px] flex max-w-[1320px] flex-wrap items-end justify-between gap-12 max-md:mb-9 max-md:gap-4">
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <PlainHeading
            text={content.heading}
            className="mb-0 mt-4 text-[48px] leading-[1.08] tracking-[-0.5px] max-md:text-[27px]"
          />
        </div>
        <p className="m-0 max-w-[400px] text-[16px] font-normal leading-[1.7] text-muted max-md:text-[15px]">
          {content.intro}
        </p>
      </Reveal>

      <dl className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-12 max-md:grid max-md:grid-cols-2 max-md:gap-x-5 max-md:gap-y-8">
        {content.stats.map((stat) => {
          const shown = Math.round(stat.value * t).toLocaleString('en-US')
          const final = `${stat.value.toLocaleString('en-US')}${stat.suffix}`
          return (
            // flex-col-reverse: the term precedes its description in source
            // order, as a description list requires, while the figure reads
            // above its label on screen.
            <div key={stat.key} className="flex flex-col-reverse">
              <dt className="mt-[14px] text-[12.5px] tracking-[1.5px] text-muted-soft max-md:mt-2.5 max-md:text-[11.5px] max-md:tracking-[1px]">
                {stat.label}
              </dt>
              <dd className="m-0 font-heading text-[68px] font-medium leading-none max-md:text-[42px]">
                <span aria-hidden="true">
                  {shown}
                  <span className="text-accent">{stat.suffix}</span>
                </span>
                <span className="sr-only">{final}</span>
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

export default ImpactStats
