import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
};

export default function KvkkPage() {
  return (
    <SiteLayout currentPath="/kvkk">
      <LegalPage title="KVKK Aydınlatma Metni">
        <p>
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
          kapsamında Yılmaz Yapı tarafından hazırlanmıştır. İçerik yayına
          çıkmadan önce hukuk danışmanınız tarafından güncellenecektir.
        </p>
        <p>
          Web sitemizi ziyaret ettiğinizde veya telefon/WhatsApp üzerinden
          bizimle iletişime geçtiğinizde paylaştığınız kişisel veriler, yalnızca
          talebinize yanıt vermek ve hizmet sunmak amacıyla işlenecektir.
        </p>
      </LegalPage>
    </SiteLayout>
  );
}

function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-cream-dark bg-cream-dark/30 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            {title}
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-4 px-4 py-12 leading-relaxed text-muted sm:px-6">
        {children}
      </section>
    </>
  );
}
