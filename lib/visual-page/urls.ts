/**
 * URL policy for editor-controlled hrefs.
 *
 * Allowed: site-relative paths, http(s), mailto, tel.
 * Blocked: javascript, data, vbscript, file, blob, protocol-relative //.
 */

const MAX_HREF_LENGTH = 500

const RELATIVE_PATH = /^\/(?!\/)[A-Za-z0-9/_\-.~?#[\]@!$&'()*+,;=%]*$/
const HTTP_URL = /^https?:\/\/[^\s<>"'`\\]+$/i
const MAILTO = /^mailto:[^\s<>"'`\\]+$/i
const TEL = /^tel:[+\d][+\d().\-\s]{2,31}$/i
const BLOCKED_SCHEME = /^(javascript|data|vbscript|file|blob):/i

export function isSafeHref(value: string): boolean {
  if (typeof value !== 'string') return false
  const href = value.trim()
  if (href.length === 0 || href.length > MAX_HREF_LENGTH) return false
  if (BLOCKED_SCHEME.test(href)) return false
  if (href.startsWith('//')) return false
  if (href.includes('<') || href.includes('>') || href.includes('"')) return false
  if (href === '/') return true
  return RELATIVE_PATH.test(href) || HTTP_URL.test(href) || MAILTO.test(href) || TEL.test(href)
}

export function assertSafeHref(value: string, path: string): string | undefined {
  if (!isSafeHref(value)) {
    return `${path} is not an allowed URL`
  }
  return undefined
}
