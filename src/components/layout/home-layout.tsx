import { SiteHeader } from "@/components/layout/site-header";
import { HomeFooter } from "@/components/layout/home-footer";

type HomeLayoutProps = {
  children: React.ReactNode;
};

/** AKİ: açılışta tam ekran kompozisyon; hafif kaydırma ile sticky header; footer en altta */
export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <div className="grid min-h-dvh grid-rows-[auto_1fr] bg-cream lg:h-dvh">
        <SiteHeader currentPath="/" />
        <main className="min-h-0 max-lg:overflow-visible lg:overflow-hidden">{children}</main>
      </div>
      {/* Sticky header tetiklemek için minimal kaydırma alanı */}
      <div aria-hidden className="h-28 bg-cream" />
      <HomeFooter />
    </>
  );
}
