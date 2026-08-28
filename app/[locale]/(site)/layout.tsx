import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * v3 chrome for the homepage and leftover inner pages (about, donate, contact).
 * Editorial pages (who-we-are, stories, support, events) sit outside this
 * group and mount SiteHeader / SiteFooter themselves. Journey and welcome
 * stay chrome-free.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
