import type { Metadata, Viewport } from 'next'

// Segment layout for the embedded Studio. There is no root app/layout.tsx
// (the marketing site renders its html/body inside app/[locale]/layout.tsx),
// so this segment provides its own html/body shell. Sanity Studio injects its
// own global styles and font handling, so this stays deliberately minimal.
//
// metadata/viewport/dynamic live here (a server module) because page.tsx is a
// client component and cannot export them.

// The Studio is a single client-rendered shell served for every sub-route (it
// does its own client side routing). force-static prerenders that shell once at
// build time without needing a Sanity connection.
export const dynamic = 'force-static'

// Keep the Studio out of search indexes even if robots.txt ever opens up.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// Studio expects the full viewport and no auto zoom on inputs.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
