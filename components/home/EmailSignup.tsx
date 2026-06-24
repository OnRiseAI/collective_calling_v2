'use client'

import * as React from 'react'
import { Section } from '@/components/ui/Section'

/**
 * Email capture section (Tearfund's "get our email updates" block), placed just
 * above the footer on a navy band with a centered white card.
 *
 * NOTE: there is no email backend yet (deferred to the contact/email plan), so
 * the form does not submit anywhere. The UI is built and accessible; wiring it
 * to a provider is a later task. Submitting holds the page (no fake success).
 */
export function EmailSignup(): React.JSX.Element {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Backend deferred: prevent navigation, do not fake a subscription.
    e.preventDefault()
  }

  return (
    <Section tone="dark">
      <div className="mx-auto max-w-4xl rounded-md bg-paper p-10 text-center shadow-xl sm:p-16">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-brand-dark">
          <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </span>

        <h2 className="mt-7 font-heading text-3xl font-bold text-brand-dark sm:text-[38px]">
          Get our email updates
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-muted">
          Stay close to the work. Hear how families in Spain and Tanzania are being restored, and
          how you can help.
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="email-signup" className="sr-only">
            Email address
          </label>
          <input
            id="email-signup"
            type="email"
            required
            placeholder="Your email address"
            className="w-full rounded-md border border-ink/20 bg-white px-5 py-3.5 font-body text-base text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-accent px-7 py-3.5 font-body text-base font-bold text-brand-dark transition-colors duration-200 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Sign up
          </button>
        </form>
      </div>
    </Section>
  )
}

export default EmailSignup
