import { expect, test } from 'vitest'
import { isSafeHref } from '@/lib/visual-page/urls'

test('allows site-relative paths', () => {
  expect(isSafeHref('/')).toBe(true)
  expect(isSafeHref('/contact')).toBe(true)
  expect(isSafeHref('/stories/caleb')).toBe(true)
})

test('allows http, https, mailto, and tel', () => {
  expect(isSafeHref('https://collectivecalling.org')).toBe(true)
  expect(isSafeHref('http://example.com/x')).toBe(true)
  expect(isSafeHref('mailto:info@collectivecalling.org')).toBe(true)
  expect(isSafeHref('tel:+34711006961')).toBe(true)
})

test('rejects javascript, data, vbscript, and protocol-relative URLs', () => {
  expect(isSafeHref('javascript:alert(1)')).toBe(false)
  expect(isSafeHref('JAVASCRIPT:alert(1)')).toBe(false)
  expect(isSafeHref('data:text/html,hi')).toBe(false)
  expect(isSafeHref('vbscript:msgbox(1)')).toBe(false)
  expect(isSafeHref('file:///etc/passwd')).toBe(false)
  expect(isSafeHref('blob:https://x')).toBe(false)
  expect(isSafeHref('//evil.example')).toBe(false)
})

test('rejects empty, oversized, and markup hrefs', () => {
  expect(isSafeHref('')).toBe(false)
  expect(isSafeHref('   ')).toBe(false)
  expect(isSafeHref('/path"><script>')).toBe(false)
  expect(isSafeHref(`/${'a'.repeat(600)}`)).toBe(false)
})
