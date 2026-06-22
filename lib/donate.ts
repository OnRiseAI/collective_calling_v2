/**
 * Donorbox URL helper.
 *
 * The charity's Donorbox campaign slug. Used to build the hosted donation URL
 * that the donate sections and CTAs link to.
 */
export const DONORBOX_FORM = 'giving-41'

/**
 * Build the Donorbox URL for the campaign, optionally pre-filling an amount and
 * the recurring flag.
 *
 * - With no arguments it returns the bare campaign URL.
 * - `amount` adds `?amount=<n>` when provided.
 * - `interval` adds `recurring=true` for monthly giving and `recurring=false`
 *   for one-off giving.
 *
 * Undefined arguments are never appended as query params.
 */
export function donorboxUrl(amount?: number, interval?: 'monthly' | 'once'): string {
  const base = `https://donorbox.org/${DONORBOX_FORM}`
  const params = new URLSearchParams()

  if (amount !== undefined) {
    params.set('amount', String(amount))
  }
  if (interval !== undefined) {
    params.set('recurring', interval === 'monthly' ? 'true' : 'false')
  }

  const query = params.toString()
  return query ? `${base}?${query}` : base
}
