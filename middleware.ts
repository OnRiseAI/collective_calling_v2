import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// First-visit welcome gate. A homepage request with no `cc_welcomed` cookie is
// sent to /welcome; every exit on the gate writes the cookie (30 days), so
// repeat visits pass straight through. Only the homepage is gated — deep links
// land where they point. Crawlers are excluded so the gate is never indexed in
// place of the homepage; static assets, api and studio are already outside the
// matcher below.
const HOME_PATH = /^\/(?:(en|es)\/?)?$/

const CRAWLER_UA =
  /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|linkedinbot|twitterbot|pinterest|embedly|quora|vkshare|preview/i

export default function middleware(request: NextRequest) {
  const match = HOME_PATH.exec(request.nextUrl.pathname)
  if (match && !request.cookies.has('cc_welcomed')) {
    const userAgent = request.headers.get('user-agent') ?? ''
    if (!CRAWLER_UA.test(userAgent)) {
      const locale = match[1] ?? routing.defaultLocale
      const url = request.nextUrl.clone()
      // Redirect straight to the locale-prefixed gate so the browser is not
      // bounced twice (/welcome would 307 again through the intl middleware).
      url.pathname = `/${locale}/welcome`
      return NextResponse.redirect(url)
    }
  }
  return intlMiddleware(request)
}

export const config = {
  // The Studio lives at top-level /studio, outside the [locale] routing, so it
  // is excluded from the negative lookahead. Without this, the catch-all
  // pattern would match /studio and the i18n middleware would redirect it to
  // /en/studio. api is excluded for the same "not a localized page" reason.
  matcher: ['/', '/(en|es)/:path*', '/((?!api|studio|_next|_vercel|.*\\..*).*)'],
}
