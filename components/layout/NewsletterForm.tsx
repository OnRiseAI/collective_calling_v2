'use client'

import * as React from 'react'

/**
 * Footer newsletter input (design-theme mockup).
 *
 * NOTE: there is no email backend yet (same state as the retired EmailSignup
 * section), so the form does not submit anywhere. The UI is built and
 * accessible; wiring it to a provider is a later task. Submitting holds the
 * page (no fake success).
 */
export function NewsletterForm(): React.JSX.Element {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Backend deferred: prevent navigation, do not fake a subscription.
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className="mt-2 flex">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        className="w-full min-w-0 rounded-l-[--radius] border border-paper/20 bg-transparent px-4 py-2.5 font-body text-sm text-paper placeholder:text-paper/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      <button
        type="submit"
        aria-label="Sign up"
        className="shrink-0 rounded-r-[--radius] bg-accent px-4 font-body text-sm font-semibold text-brand-dark transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        &rarr;
      </button>
    </form>
  )
}

export default NewsletterForm
