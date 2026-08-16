import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
};

export default function GizlilikPage() {
  return (
    <SiteLayout currentPath="/gizlilik">
      <section className="border-b border-cream-dark bg-cream-dark/30 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Gizlilik Politikası
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-4 px-4 py-12 leading-relaxed text-muted sm:px-6">
        <p>
          Yılmaz Yapı olarak ziyaretçilerimizin gizliliğine önem veriyoruz. Bu
          sayfa, web sitemizi kullanırken toplanan bilgilerin nasıl işlendiğini
          açıklamaktadır. Yayın öncesi hukuk danışmanınız tarafından
          güncellenecektir.
        </p>
        <p>
          Sitemizde çerez (cookie) kullanılmamaktadır. Üçüncü taraf analitik
          araçları eklendiğinde bu politika güncellenecektir.
        </p>
      </section>
    </SiteLayout>
  );
}
