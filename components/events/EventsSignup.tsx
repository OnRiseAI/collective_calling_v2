'use client'

import * as React from 'react'

/**
 * Events mailing-list row. There is no email backend yet, matching
 * NewsletterForm: submit is held on the page. The button label is a local
 * acknowledgement only.
 */
export function EventsSignup(): React.JSX.Element {
  const [posted, setPosted] = React.useState(false)

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPosted(true)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-9 flex justify-center gap-3 max-[680px]:flex-col"
    >
      <label htmlFor="events-email" className="sr-only">
        Email address
      </label>
      <input
        id="events-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        aria-label="Email address"
        className="h-12 min-h-12 flex-1 max-w-[340px] rounded-[6px] border border-[#D6CFC2] bg-[#FAF7F1] px-[18px] font-body text-[14.5px] text-[#1E1B17] outline-none placeholder:text-[#1E1B17]/45 focus-visible:border-[#C89A3C] focus-visible:ring-2 focus-visible:ring-[#C89A3C]/40 max-[680px]:max-w-none"
      />
      <button
        type="submit"
        className="h-12 min-h-12 shrink-0 rounded-[6px] bg-[#D9A83F] px-7 font-body text-[13px] font-bold tracking-[1.4px] text-[#2A2415] transition-all duration-[250ms] hover:bg-[#C89A3C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89A3C]"
      >
        {posted ? "YOU'RE ON THE LIST" : 'KEEP ME POSTED'}
      </button>
    </form>
  )
}

export default EventsSignup
