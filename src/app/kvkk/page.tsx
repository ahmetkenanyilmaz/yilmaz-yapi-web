import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Yılmaz Yapı kişisel verilerin işlenmesine ilişkin 6698 sayılı KVKK aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <SiteLayout currentPath="/kvkk">
      <LegalPage title="KVKK Aydınlatma Metni">
        <p>
          Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu
          (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla{" "}
          {siteConfig.legalName} ({siteConfig.name}) tarafından hazırlanmıştır.
        </p>

        <h2>Veri sorumlusu</h2>
        <p>
          {siteConfig.legalName}
          <br />
          {siteConfig.address.full}
          <br />
          E-posta: {siteConfig.email}
          <br />
          Telefon: {siteConfig.phones[0].number}
        </p>

        <h2>İşlenen kişisel veriler</h2>
        <p>
          İletişim formu, telefon, e-posta veya WhatsApp üzerinden bizimle
          iletişime geçtiğinizde ad-soyad, e-posta adresi, telefon numarası ve
          mesaj içeriğiniz işlenebilir. Sizi aradığımızda veya size dönüş
          yaptığımızda görüşmeye ilişkin kayıtlar da tutulabilir.
        </p>

        <h2>İşleme amaçları ve hukuki sebep</h2>
        <p>
          Kişisel verileriniz; talebinize yanıt vermek, keşif ve proje
          süreçlerini yürütmek, sizinle iletişime geçmek ve yasal
          yükümlülüklerimizi yerine getirmek amacıyla işlenir. Hukuki
          sebepler, KVKK m. 5 kapsamında sözleşmenin kurulması veya ifası,
          meşru menfaat ve açık rızanız olabilir.
        </p>

        <h2>Aktarım</h2>
        <p>
          İletişim formundan gönderilen iletiler, e-posta altyapısı (Resend)
          üzerinden {siteConfig.email} adresine iletilir. İletişim sayfasındaki
          harita için Google kullanılabilir. Proje fotoğraf ve videoları kendi
          depolama alanımızda tutulur.
        </p>

        <h2>Saklama süresi</h2>
        <p>
          Veriler, talebinizin sonuçlanması ve ilgili mevzuatta öngörülen
          süreler boyunca; bu sürelerin sonunda silinir, yok edilir veya
          anonim hale getirilir.
        </p>

        <h2>Haklarınız</h2>
        <p>
          KVKK m. 11 uyarınca verilerinizin işlenip işlenmediğini öğrenme,
          işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme,
          aktarıldığı üçüncü kişileri öğrenme ve işleme faaliyetine itiraz
          etme haklarına sahipsiniz. Başvurularınızı {siteConfig.email}{" "}
          adresine iletebilirsiniz.
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
      <section className="legal-copy mx-auto max-w-3xl space-y-4 px-4 py-12 leading-relaxed text-muted sm:px-6">
        {children}
      </section>
    </>
  );
}
