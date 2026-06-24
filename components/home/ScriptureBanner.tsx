'use client'

import * as React from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { cx } from '@/lib/cx'

/**
 * Rotating scripture banner for the Collective Calling homepage.
 *
 * A reverent, faith-forward pause: a verse set large in the site display face
 * (Lexend) on a deep gold band, with its reference in navy beneath. The band
 * auto-rotates through a curated set of verses with a gentle fade + upward
 * drift, pausing on hover, and an oversized faint quote glyph adds depth behind
 * the text. Progress dots show position and the verse stage is height-locked so
 * the band never jumps as verse length changes.
 *
 * Visual style is unchanged from the original static band (gold field, navy
 * bold-italic verse, top navy rule, letter-spaced citation); only motion, the
 * glyph, and the dots are added.
 *
 * Accessibility: the rotation lives in a <blockquote> with a hidden label, the
 * reference sits in a <cite> inside the quote's <footer>, and readers who ask
 * for reduced motion get an instant swap with no fade or drift.
 *
 * Verses are ESV (matching the site's existing 1 John 4:11), held in one
 * data-driven array so they are easy to edit.
 */

type Verse = { text: string; reference: string }

const VERSES: Verse[] = [
  {
    text: 'Beloved, if God so loved us, we also ought to love one another.',
    reference: '1 John 4:11',
  },
  {
    text: 'Truly, I say to you, as you did it to one of the least of these my brothers, you did it to me.',
    reference: 'Matthew 25:40',
  },
  {
    text: 'Whoever is generous to the poor lends to the Lord, and he will repay him for his deed.',
    reference: 'Proverbs 19:17',
  },
  {
    text: 'Open your mouth for the mute, for the rights of all who are destitute.',
    reference: 'Proverbs 31:8',
  },
  {
    text: "Bear one another's burdens, and so fulfill the law of Christ.",
    reference: 'Galatians 6:2',
  },
  {
    text: "Learn to do good; seek justice, correct oppression; bring justice to the fatherless, plead the widow's cause.",
    reference: 'Isaiah 1:17',
  },
  {
    text: 'It is more blessed to give than to receive.',
    reference: 'Acts 20:35',
  },
  {
    text: 'Do not neglect to do good and to share what you have, for such sacrifices are pleasing to God.',
    reference: 'Hebrews 13:16',
  },
]

const ROTATE_MS = 6000
const FADE_MS = 600

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function usePrefersReducedMotion(): boolean {
  return React.useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const mq = window.matchMedia(REDUCED_MOTION_QUERY)
      mq.addEventListener('change', callback)
      return () => mq.removeEventListener('change', callback)
    },
    () =>
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia(REDUCED_MOTION_QUERY).matches
        : false,
    () => false,
  )
}

export function ScriptureBanner(): React.JSX.Element {
  const [index, setIndex] = React.useState(0)
  const [visible, setVisible] = React.useState(true)
  const [paused, setPaused] = React.useState(false)
  const reduced = usePrefersReducedMotion()

  React.useEffect(() => {
    if (paused) return

    let swapTimer: ReturnType<typeof setTimeout> | undefined
    const tick = setInterval(() => {
      if (reduced) {
        // Reduced motion: instant swap, no fade or drift.
        setIndex((i) => (i + 1) % VERSES.length)
        return
      }
      // Fade out, swap text at the trough, fade (+ drift) back in.
      setVisible(false)
      swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % VERSES.length)
        setVisible(true)
      }, FADE_MS)
    }, ROTATE_MS)

    return () => {
      clearInterval(tick)
      if (swapTimer) clearTimeout(swapTimer)
    }
  }, [paused, reduced])

  const current = VERSES[index]

  return (
    <Section tone="accent" containerSize="prose">
      <figure
        className="relative mx-auto max-w-3xl text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Faint navy heart-cross watermark behind the verse: decorative only,
            adds the Christian note without competing with the words. */}
        <Image
          src="/images/heart-cross-navy.png"
          alt=""
          width={800}
          height={781}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-auto w-[220px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.10] sm:w-[300px]"
        />

        <div className="relative z-10">
          {/* Short navy rule on the gold band. */}
          <span aria-hidden="true" className="mx-auto block h-px w-12 bg-brand-dark" />

          <blockquote aria-label="Rotating scripture verse" className="mt-8">
            {/* Height-locked stage so the band does not jump between verses. */}
            <div className="mx-auto flex min-h-[300px] max-w-[640px] flex-col items-center justify-center sm:min-h-[360px]">
              <div
                className={cx(
                  'transition-all duration-[600ms] ease-out motion-reduce:transition-none motion-reduce:transform-none',
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0',
                )}
              >
                <p className="text-balance font-heading text-[1.75rem] font-bold italic leading-[1.32] text-brand-dark sm:text-[44px]">
                  {current.text}
                </p>
                <footer className="mt-6">
                  <cite className="font-body text-sm font-bold uppercase not-italic tracking-[0.18em] text-brand-dark/70">
                    {current.reference}
                  </cite>
                </footer>
              </div>
            </div>
          </blockquote>

          {/* Progress dots: active solid navy, others faint. */}
          <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
            {VERSES.map((verse, i) => (
              <span
                key={verse.reference}
                className={cx(
                  'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                  i === index ? 'bg-brand-dark' : 'bg-brand-dark/20',
                )}
              />
            ))}
          </div>
        </div>
      </figure>
    </Section>
  )
}

export default ScriptureBanner
