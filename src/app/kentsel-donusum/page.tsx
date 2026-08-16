import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { ContactBar } from "@/components/layout/contact-bar";
import { PageBanner } from "@/components/layout/page-banner";

export const metadata: Metadata = {
  title: "Kentsel Dönüşüm",
};

const steps = [
  {
    step: "01",
    title: "Ön Görüşme ve Keşif",
    description:
      "Mevcut yapınızı yerinde inceliyor, ihtiyaçlarınızı dinliyor ve size özel bir yol haritası çıkarıyoruz.",
  },
  {
    step: "02",
    title: "Proje ve Ruhsat Süreci",
    description:
      "Mimari proje, statik hesaplar ve resmi izin süreçlerini şeffaf bir şekilde yönetiyoruz.",
  },
  {
    step: "03",
    title: "Hak Sahibi Anlaşması",
    description:
      "Tüm paydaşlarla adil ve anlaşılır sözleşmeler yaparak güven ortamı oluşturuyoruz.",
  },
  {
    step: "04",
    title: "İnşaat ve Teslim",
    description:
      "Deprem yönetmeliğine uygun, kaliteli malzeme ve işçilikle projenizi zamanında teslim ediyoruz.",
  },
];

export default function KentselDonusumPage() {
  return (
    <SiteLayout currentPath="/kentsel-donusum">
      <PageBanner
        title="Kentsel Dönüşüm"
        subtitle="Güvenli Dönüşüm"
        description="Eski ve riskli yapılarınızı modern, güvenli yaşam alanlarına dönüştürüyoruz. Sürecin her adımında yanınızdayız."
      />

      <section className="mx-auto max-w-7xl bg-cream px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-sm border border-cream-dark bg-white p-8 shadow-sm"
            >
              <span className="text-3xl font-serif font-semibold text-gold">
                {item.step}
              </span>
              <h2 className="mt-3 font-serif text-xl font-semibold text-charcoal">
                {item.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-sm border border-cream-dark bg-white p-8 text-center sm:p-12">
          <h2 className="font-serif text-2xl font-semibold text-charcoal">
            Ücretsiz Ön Görüşme
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Binanız kentsel dönüşüme uygun mu? Bizi arayın veya WhatsApp
            üzerinden ulaşın — ilk görüşme tamamen ücretsizdir.
          </p>
          <Link
            href="/iletisim"
            className="mt-6 inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold-dark"
          >
            İletişime Geç
          </Link>
        </div>
      </section>

      <ContactBar />
    </SiteLayout>
  );
}
