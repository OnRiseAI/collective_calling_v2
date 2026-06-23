import { describe, it, expect } from 'vitest'
import { cx } from '@/lib/cx'
import { noOrphan, toParagraphs } from '@/lib/text'

// The non-breaking space (U+00A0), matching what the brand board requires.
const NBSP = ' '

describe('cx', () => {
  it('joins truthy parts with a single space', () => {
    expect(cx('a', false, undefined, 'b')).toBe('a b')
  })

  it('filters all falsey values', () => {
    expect(cx(false, undefined, null, '')).toBe('')
  })

  it('returns a single part unchanged', () => {
    expect(cx('only')).toBe('only')
  })

  it('joins multiple parts with a single space', () => {
    expect(cx('foo', 'bar', 'baz')).toBe('foo bar baz')
  })
})

describe('noOrphan', () => {
  it('inserts a non-breaking space between the last two words', () => {
    const result = noOrphan('one two three')
    // "one two" + NBSP + "three"
    expect(result).toBe(`one two${NBSP}three`)
  })

  it('is identity for a single word', () => {
    expect(noOrphan('single')).toBe('single')
  })

  it('handles exactly two words', () => {
    expect(noOrphan('hello world')).toBe(`hello${NBSP}world`)
  })

  it('returns empty string unchanged', () => {
    expect(noOrphan('')).toBe('')
  })

  it('trims leading/trailing whitespace before processing', () => {
    const result = noOrphan('  one two  ')
    expect(result).toBe(`one${NBSP}two`)
  })
})

describe('toParagraphs', () => {
  it('splits on blank lines, trims, and filters empties', () => {
    expect(toParagraphs('a\n\nb\n  \nc')).toEqual(['a', 'b', 'c'])
  })

  it('returns a single paragraph when no blank lines', () => {
    expect(toParagraphs('hello world')).toEqual(['hello world'])
  })

  it('filters out empty-only blocks', () => {
    expect(toParagraphs('\n\n\na\n\n\n')).toEqual(['a'])
  })

  it('returns an empty array for blank input', () => {
    expect(toParagraphs('')).toEqual([])
  })
})
