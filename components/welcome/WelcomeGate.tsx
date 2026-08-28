'use client'

import * as React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

/**
 * Welcome gate (/welcome) — transcribed from `Collective Calling Welcome.dc.html`
 * (Aug 24 export, default variant: dark card, pillars and quote shown; the
 * "Simple button" CTA variant was dropped as the unused branch).
 *
 * Direct campaign landing. Skip links and the journey card still write the
 * `cc_welcomed` cookie. The homepage is no longer redirected here.
 */

const COOKIE_MAX_AGE_S = 30 * 24 * 60 * 60

function writeWelcomeCookie(): void {
  document.cookie = `cc_welcomed=1; path=/; max-age=${COOKIE_MAX_AGE_S}; SameSite=Lax`
}

const PILLARS: { icon: React.JSX.Element; label: React.JSX.Element }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[23px] w-[23px]" aria-hidden="true">
        <path
          d="M12 20.2s-7.4-4.6-7.4-9.5A4.2 4.2 0 0 1 12 8.1a4.2 4.2 0 0 1 7.4 2.6c0 4.9-7.4 9.5-7.4 9.5Z"
          stroke="#14213a"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: (
      <>
        WE CARE
        <br />
        FOR PEOPLE
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[23px] w-[23px]" aria-hidden="true">
        <circle cx="12" cy="12" r="8.6" stroke="#14213a" strokeWidth="1.2" />
        <path
          d="M3.4 12h17.2M12 3.4c2.3 2.4 3.4 5.4 3.4 8.6s-1.1 6.2-3.4 8.6c-2.3-2.4-3.4-5.4-3.4-8.6S9.7 5.8 12 3.4Z"
          stroke="#14213a"
          strokeWidth="1.2"
        />
      </svg>
    ),
    label: (
      <>
        WE STRENGTHEN
        <br />
        COMMUNITIES
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[23px] w-[23px]" aria-hidden="true">
        <path
          d="M12 3.2v17.6M3.2 12h17.6M5.9 5.9l12.2 12.2M18.1 5.9 5.9 18.1"
          stroke="#14213a"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: (
      <>
        WE INSPIRE
        <br />
        VALUES IN ACTION
      </>
    ),
  },
]

export function WelcomeGate(): React.JSX.Element {
  const quoteRef = React.useRef<HTMLElement | null>(null)

  return (
    <div className="bg-paper font-body text-ink">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <Image
          src="/images/welcome/gate-bg.jpg"
          alt="A walker on a coastal path at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(246,241,231,0.94) 0%, rgba(246,241,231,0.86) 26%, rgba(246,241,231,0.42) 46%, rgba(246,241,231,0.06) 62%, rgba(20,20,18,0.18) 100%)',
          }}
        />

        <header className="relative flex items-start justify-between px-12 py-[34px] max-[680px]:px-7">
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
          {/* prefetch off: the homepage is prefetched before the cookie is
              written, so a cached prefetch would carry the gate redirect and
              bounce the visitor straight back here. */}
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

        <div className="relative flex flex-1 flex-col items-center px-12 pb-16 pt-14 text-center max-[680px]:px-7">
          <span className="text-[11.5px] font-semibold tracking-[3.4px] text-accent">
            WELCOME TO COLLECTIVE CALLING
          </span>
          <h1 className="mt-[26px] max-w-[1000px] font-heading text-[clamp(52px,6.4vw,96px)] font-normal leading-[1.08] tracking-[-1.2px] [text-wrap:pretty]">
            Every life becomes part of a bigger story.
          </h1>
          <div className="mb-[34px] mt-[38px] h-[1.5px] w-14 bg-accent" />
          <p className="m-0 max-w-[470px] text-[16px] font-medium leading-[1.85] text-[#454b57] [text-wrap:pretty]">
            We exist to equip people and organisations to live their values, build meaningful
            connections and create lasting impact in the world around them.
          </p>

          <div className="mt-14 flex flex-wrap justify-center gap-24">
            {PILLARS.map((pillar, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                {pillar.icon}
                <div className="text-[10.5px] font-semibold leading-[1.85] tracking-[1.9px] text-ink">
                  {pillar.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/journey"
            onClick={writeWelcomeCookie}
            className="mt-[72px] flex w-[380px] max-w-full flex-col items-center rounded-[14px] border border-white/[0.09] bg-[rgba(22,22,20,0.9)] px-14 pb-[34px] pt-[42px] text-[#f8f4eb] shadow-[0_30px_70px_rgba(15,14,12,0.34)] backdrop-blur-[6px] transition-all duration-300 hover:-translate-y-[3px] hover:bg-[rgba(22,22,20,0.97)] hover:shadow-[0_38px_84px_rgba(15,14,12,0.42)]"
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
                <path d="M12 7.6V12l3 1.9" stroke="#8d887e" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Takes around 3 minutes
            </span>
          </Link>

          <Link
            href="/"
            prefetch={false}
            onClick={writeWelcomeCookie}
            className="mt-[52px] border-b border-[rgba(59,58,52,0.45)] pb-1.5 text-[11.5px] font-semibold tracking-[2.2px] text-[#3b3a34] transition-all duration-[250ms] hover:border-accent hover:text-accent"
          >
            SKIP THIS EXPERIENCE
          </Link>
        </div>
      </section>

      <section
        ref={quoteRef}
        className="bg-[#161614] px-12 pb-10 pt-16 text-center max-[680px]:px-7"
      >
        <div className="mx-auto max-w-[720px]">
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
            — HELEN KELLER
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
        </div>
      </section>
    </div>
  )
}

export default WelcomeGate
