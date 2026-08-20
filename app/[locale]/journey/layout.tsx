/**
 * Chrome-free shell for the Find Your Path journey. The journey is a
 * full-viewport experience: no Header, no Footer — it lives outside the
 * (site) route group on purpose, so the locale layout renders it bare.
 */
export default function JourneyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex-1">{children}</main>;
}
