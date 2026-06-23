import * as React from 'react'

/**
 * PlaceholderBadge is a small gold-outlined pill that flags seed or sample
 * content so visitors know the entry is not yet a real story, event, or appeal.
 *
 * It reads "Sample content" and is intentionally understated: a quiet signal
 * rather than a warning. Reused by the Stories, Events, and Appeals hubs.
 */
export function PlaceholderBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-accent px-3 py-0.5 font-body text-xs font-semibold uppercase tracking-[0.08em] text-accent">
      Sample content
    </span>
  )
}

export default PlaceholderBadge
