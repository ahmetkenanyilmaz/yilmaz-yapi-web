import { Header } from "@/components/layout/site-header";
import { HomeFooter } from "@/components/layout/home-footer";
import { AboutSection } from "@/components/home/about-section";
import { UrbanCta } from "@/components/home/urban-cta";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <div className="grid bg-[#f8f6f2] lg:h-dvh lg:grid-rows-[auto_1fr]">
        <Header currentPath="/" />
        <main className="lg:min-h-0 lg:overflow-hidden">{children}</main>
      </div>
      <AboutSection />
      <UrbanCta />
      <HomeFooter />
    </>
  );
}
