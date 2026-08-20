import { describe, expect, test } from 'vitest'
import { result } from '@/components/journey/scoring'

/**
 * The journey's scoring, ported from the prototype: weights sum per path, the
 * highest total wins, ties break to whichever path reached the winning score
 * at the earliest question, and an all-zero board falls back to volunteer.
 */
describe('journey scoring', () => {
  test('a clean volunteer run returns volunteer', () => {
    // The most volunteer-weighted option at every question.
    const answers = { 0: 2, 1: 0, 2: 1, 3: 0, 4: 0, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 }
    expect(result(answers)).toBe('volunteer')
  })

  test('a clean partner run returns partner', () => {
    // The most partner-weighted option at every question.
    const answers = { 0: 3, 1: 2, 2: 4, 3: 2, 4: 1, 5: 4, 6: 2, 7: 2, 8: 2, 9: 2 }
    expect(result(answers)).toBe('partner')
  })

  test('ties break to the path that reached the winning score first', () => {
    // Q1 "I want my work to have greater meaning" gives values 3; Q3 "A regular
    // slot each week" gives volunteer 3. Both end level on 3, but values got
    // there at question 1, so values wins.
    expect(result({ 0: 1, 2: 1 })).toBe('values')
    // Reversed order: volunteer hits 3 at question 1, values at question 2.
    expect(result({ 0: 2, 1: 1 })).toBe('volunteer')
  })

  test('no answers falls back to volunteer', () => {
    expect(result({})).toBe('volunteer')
  })
})
