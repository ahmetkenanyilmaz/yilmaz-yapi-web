import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { ContactBar } from "@/components/layout/contact-bar";
import { PageBanner } from "@/components/layout/page-banner";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function HakkimizdaPage() {
  return (
    <SiteLayout currentPath="/hakkimizda">
      <PageBanner title="Hakkımızda" subtitle="Güvenilir iş ortağınız" />
      <section className="mx-auto max-w-3xl bg-cream px-4 py-16 sm:px-6 sm:py-24">
        <div className="space-y-8 text-muted">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              Hikayemiz
            </h2>
            <p className="mt-4 leading-relaxed">
              Yılmaz Yapı, İstanbul&apos;da yılların tecrübesiyle inşaat ve kentsel
              dönüşüm alanında faaliyet göstermektedir. Müşterilerimize güvenli,
              modern ve değer katan yaşam alanları sunmayı ilke edindik.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              Vizyonumuz
            </h2>
            <p className="mt-4 leading-relaxed">
              Sektörde şeffaflık ve kalite standartlarını yükselterek, sürdürülebilir
              ve insan odaklı projelerle geleceğe değer katmak.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-charcoal">
              Misyonumuz
            </h2>
            <p className="mt-4 leading-relaxed">
              Deprem yönetmeliğine uygun, güvenli yapılar inşa etmek; kentsel
              dönüşüm süreçlerinde hak sahiplerine şeffaf ve güvenilir çözümler
              sunmak.
            </p>
          </div>
        </div>
      </section>
      <ContactBar />
    </SiteLayout>
  );
}
