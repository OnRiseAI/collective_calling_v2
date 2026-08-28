'use client'

import * as React from 'react'
import { useReducedMotion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { FadeIn } from '@/components/ui/FadeIn'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Welcome gate (/welcome). First-visit routing lives in middleware.ts: a
 * homepage request with no `cc_welcomed` cookie lands here. The 9:16
 * welcome film is the thing to watch. Skip and Begin Your Journey stay real
 * links so the cookie still writes.
 */

const COOKIE_MAX_AGE_S = 30 * 24 * 60 * 60
const FILM_SRC = '/videos/welcome-gate.mp4'
const FILM_POSTER = '/videos/welcome-gate.png'

function writeWelcomeCookie(): void {
  document.cookie = `cc_welcomed=1; path=/; max-age=${COOKIE_MAX_AGE_S}; SameSite=Lax`
}

export function WelcomeGate(): React.JSX.Element {
  const reduceMotion = useReducedMotion()
  const quoteRef = React.useRef<HTMLElement | null>(null)

  return (
    <div className="bg-paper font-body text-ink">
      <section className="relative flex min-h-svh flex-col">
        <header className="relative z-10 flex items-start justify-between px-12 py-[34px] max-[680px]:px-7">
          <div className="flex items-center gap-3.5">
            <svg viewBox="0 0 38 38" fill="none" className="h-[34px] w-[34px] flex-none" aria-hidden="true">
              <circle cx="19" cy="19" r="17.2" stroke="#14213a" strokeWidth="1.5" />
              <path
                d="M25.5 12.4A9 9 0 1 0 25.5 25.6"
                stroke="#14213a"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="leading-[1.15]">
              <div className="text-[12.5px] font-semibold tracking-[2.4px] text-ink">
                COLLECTIVE
              </div>
              <div className="text-[12.5px] font-semibold tracking-[2.4px] text-ink">CALLING</div>
            </div>
          </div>
          <Link
            href="/"
            prefetch={false}
            onClick={writeWelcomeCookie}
            className="inline-flex items-center gap-2.5 border-b border-[rgba(20,33,58,0.4)] pb-[5px] text-[13.5px] font-medium text-ink transition-all duration-[250ms] hover:border-accent hover:text-accent"
          >
            Skip to website{' '}
            <span aria-hidden="true" className="text-[15px]">
              →
            </span>
          </Link>
        </header>

        <div className="relative flex flex-1 flex-col items-center px-7 pb-16 pt-4 text-center">
          <h1 className="sr-only">Every life becomes part of a bigger story.</h1>

          <FadeIn className="w-full max-w-[420px]">
            <div className="overflow-hidden rounded-[18px] bg-[#141009] shadow-[0_30px_70px_rgba(15,14,12,0.28)]">
              <video
                src={FILM_SRC}
                poster={FILM_POSTER}
                autoPlay={!reduceMotion}
                muted
                loop={!reduceMotion}
                playsInline
                controls
                preload="auto"
                className="aspect-[9/16] h-auto w-full max-h-[min(78svh,820px)] object-cover"
              >
                Your browser cannot play this film. Use Skip to website, or Begin Your Journey.
              </video>
            </div>
          </FadeIn>

          <Reveal className="mt-10 flex w-[380px] max-w-full flex-col items-center">
            <Link
              href="/journey"
              onClick={writeWelcomeCookie}
              className="flex w-full flex-col items-center rounded-[14px] border border-white/[0.09] bg-[rgba(22,22,20,0.9)] px-14 pb-[34px] pt-[42px] text-[#f8f4eb] shadow-[0_30px_70px_rgba(15,14,12,0.34)] backdrop-blur-[6px] transition-all duration-300 hover:-translate-y-[3px] hover:bg-[rgba(22,22,20,0.97)] hover:shadow-[0_38px_84px_rgba(15,14,12,0.42)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(201,161,92,0.55)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M4.5 16.5c3.2-2 5.6-2 7.5-2s4.3 0 7.5 2"
                    stroke="#C89A3C"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="9.4" r="2.6" stroke="#C89A3C" strokeWidth="1.2" />
                </svg>
              </span>
              <span className="mt-[22px] inline-flex items-center gap-3.5 font-heading text-[29px] font-normal text-[#f8f4eb]">
                Begin Your Journey{' '}
                <span aria-hidden="true" className="text-[22px] text-[#f8f4eb]">
                  →
                </span>
              </span>
              <span className="mt-4 max-w-[250px] text-center text-[12.5px] font-medium leading-[1.75] text-[#b3aea3]">
                Take a short interactive journey to discover where you can make the greatest impact.
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-[11.5px] text-[#8d887e]">
                <svg viewBox="0 0 24 24" fill="none" className="h-[13px] w-[13px]" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.6" stroke="#8d887e" strokeWidth="1.3" />
                  <path
                    d="M12 7.6V12l3 1.9"
                    stroke="#8d887e"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                Takes around 3 minutes
              </span>
            </Link>
          </Reveal>

          <Reveal>
            <Link
              href="/"
              prefetch={false}
              onClick={writeWelcomeCookie}
              className="mt-[52px] inline-block border-b border-[rgba(59,58,52,0.45)] pb-1.5 text-[11.5px] font-semibold tracking-[2.2px] text-[#3b3a34] transition-all duration-[250ms] hover:border-accent hover:text-accent"
            >
              SKIP THIS EXPERIENCE
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        ref={quoteRef}
        className="bg-[#161614] px-12 pb-10 pt-16 text-center max-[680px]:px-7"
      >
        <Reveal className="mx-auto max-w-[720px]">
          <p className="m-0 font-heading text-[clamp(21px,2.2vw,27px)] leading-[1.5] text-[#f2ede3]">
            <span
              aria-hidden="true"
              className="mr-2.5 align-[-0.28em] font-heading text-[1.5em] leading-none text-accent"
            >
              &ldquo;
            </span>
            Alone we can do so little; together we can do so much.
            <span
              aria-hidden="true"
              className="ml-2 align-[-0.28em] font-heading text-[1.5em] leading-none text-accent"
            >
              &rdquo;
            </span>
          </p>
          <div className="mt-[22px] text-[11px] font-medium tracking-[2.2px] text-[#8d887e]">
            HELEN KELLER
          </div>
          <button
            type="button"
            aria-label="Scroll to quote"
            onClick={() => quoteRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-[34px] inline-block cursor-pointer border-0 bg-transparent p-0"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path
                d="M6 9.5 12 15.5l6-6"
                stroke="#8d887e"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Reveal>
      </section>
    </div>
  )
}

export default WelcomeGate
