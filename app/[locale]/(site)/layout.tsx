import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Site chrome for every ordinary page: header above, footer below, the page
 * itself filling the space between. The journey at /[locale]/journey sits
 * outside this route group on purpose — it is a full-viewport experience with
 * no chrome, so it renders straight under the locale layout.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
