import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/site-header";

type SiteLayoutProps = {
  children: React.ReactNode;
  currentPath?: string;
};

export function SiteLayout({
  children,
  currentPath = "/",
}: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f6f2]">
      <Header currentPath={currentPath} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
