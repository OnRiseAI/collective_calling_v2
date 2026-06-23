/**
 * Shared text-manipulation helpers.
 *
 * These were previously duplicated across several components; they now live
 * here as the single source of truth.
 */

// The non-breaking space (U+00A0), written as its explicit code point so it
// survives source transforms and is unambiguous in review.
const NBSP = ' '

/**
 * noOrphan — glue the last two words of a heading with a non-breaking space
 * so the line never breaks to leave a single orphan word. Paired with
 * `text-wrap: balance` per the brand board headline rule. Preceding words
 * keep ordinary spaces so the title can still wrap naturally above the final
 * pair.
 *
 * Returns the input unchanged when it has fewer than two whitespace-separated
 * words (after trimming).
 */
export function noOrphan(text: string): string {
  const trimmed = text.trim()
  const words = trimmed.split(/\s+/)
  if (words.length < 2) return trimmed
  const head = words.slice(0, -2).join(' ')
  const lastTwo = words.slice(-2).join(NBSP)
  return head ? `${head} ${lastTwo}` : lastTwo
}

/**
 * toParagraphs — split a plain body string into paragraph strings.
 *
 * Splits on one or more blank lines (a blank line being a newline followed by
 * optional whitespace and another newline). Trims each resulting chunk and
 * discards any that are empty after trimming.
 */
export function toParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}
