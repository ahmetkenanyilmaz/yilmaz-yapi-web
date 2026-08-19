import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Yılmaz Yapı web sitesinde kişisel verilerin ve çerezlerin nasıl işlendiğine ilişkin gizlilik politikası.",
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
      <section className="legal-copy mx-auto max-w-3xl space-y-4 px-4 py-12 leading-relaxed text-muted sm:px-6">
        <p>
          {siteConfig.legalName} ({siteConfig.name}) olarak{" "}
          {siteConfig.url} adresindeki sitemizi ziyaret edenlerin gizliliğine
          önem veriyoruz. Bu politika, sitede hangi bilgilerin işlendiğini
          açıklar. KVKK kapsamındaki haklarınız için{" "}
          <Link
            href="/kvkk"
            className="text-charcoal underline decoration-[#B8934A]/40"
          >
            Aydınlatma Metni
          </Link>
          ’ne bakabilirsiniz.
        </p>

        <h2>Topladığımız bilgiler</h2>
        <p>
          İletişim formunda paylaştığınız isim, e-posta ve mesaj içeriği,
          talebinize yanıt vermek üzere işlenir. Telefon veya WhatsApp ile
          aramanız halinde numaranız ve görüşme konusu da aynı amaçla
          kullanılabilir.
        </p>

        <h2>Çerezler ve üçüncü taraflar</h2>
        <p>
          Sitemizde reklam veya istatistik amaçlı kendi çerezimiz
          bulunmamaktadır. İletişim sayfasındaki gömülü Google Haritalar,
          Google&apos;ın gizlilik politikası çerçevesinde çerez bırakabilir.
          Proje fotoğraf ve videoları sitemizin kendi depolama alanında
          yayınlanır.
        </p>

        <h2>İletişim</h2>
        <p>
          Gizlilik ile ilgili sorularınız için {siteConfig.email} adresine
          yazabilirsiniz.
        </p>
      </section>
    </SiteLayout>
  );
}
