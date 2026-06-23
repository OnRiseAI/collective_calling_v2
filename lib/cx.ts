/**
 * cx — lightweight class-name joiner.
 *
 * Filters out falsey parts (false, undefined, null, empty string) and joins
 * the remaining strings with a single space. Identical in behaviour to the
 * local copies that were previously duplicated across the component tree.
 *
 * Usage:
 *   import { cx } from '@/lib/cx'
 *   cx('base', isActive && 'active', className)
 */
export function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ')
}
