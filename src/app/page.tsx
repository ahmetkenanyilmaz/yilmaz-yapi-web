import type { Metadata } from "next";
import { HomeLayout } from "@/components/layout/home-layout";
import { Hero } from "@/components/home/hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | İnşaat ve Kentsel Dönüşüm — Bahçelievler İstanbul`,
  },
  description:
    "Yılmaz Yapı: Bahçelievler Şirinevler merkezli inşaat ve kentsel dönüşüm firması. Devam eden ve tamamlanan konut projeleri, güvenilir anahtar teslim çözümler.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | İnşaat ve Kentsel Dönüşüm — Bahçelievler İstanbul`,
    description:
      "Yılmaz Yapı: Bahçelievler Şirinevler merkezli inşaat ve kentsel dönüşüm firması. Devam eden ve tamamlanan konut projeleri, güvenilir anahtar teslim çözümler.",
  },
};

export default function HomePage() {
  return (
    <HomeLayout>
      <h1 className="sr-only">
        Yılmaz Yapı — Bahçelievler İnşaat ve Kentsel Dönüşüm
      </h1>
      <Hero />
    </HomeLayout>
  );
}
