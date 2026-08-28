import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// Locale routing only. The welcome screen stays at /welcome for campaign
// traffic. The default URL must be the homepage, not the gate.
export default intlMiddleware

export const config = {
  // The Studio lives at top-level /studio, outside the [locale] routing, so it
  // is excluded from the negative lookahead. Without this, the catch-all
  // pattern would match /studio and the i18n middleware would redirect it to
  // /en/studio. api is excluded for the same "not a localized page" reason.
  matcher: ['/', '/(en|es)/:path*', '/((?!api|studio|_next|_vercel|.*\\..*).*)'],
}
