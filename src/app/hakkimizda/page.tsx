import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Hakkımızda",
  description:
    "1977 yılında başlayan ticari faaliyet ve üretim tecrübemizi, 12 yıllık inşaat deneyimimizle birleştirerek güvenli, nitelikli ve değer kazanan yaşam alanları inşa ediyoruz.",
  path: "/hakkimizda",
});

const stats = [
  { value: "1977", label: "Üretim ve ticari faaliyetlerde başlayan tecrübe" },
  { value: "+12", suffix: "Yıl", label: "İnşaat sektöründe deneyim" },
  { value: "10+", label: "Tamamlanan proje" },
  { value: "10+", label: "Devam eden proje" },
  { value: "10+", label: "Ruhsat ve hazırlık aşamasındaki proje" },
] as const;

const activities = [
  {
    title: "Kentsel Dönüşüm",
    text: "Mevcut yapıların güncel deprem yönetmelikleri ve modern yaşam standartları doğrultusunda yeniden değerlendirilmesi ve yenilenmesi.",
  },
  {
    title: "Konut Projeleri",
    text: "İşlevsellik, estetik ve uzun vadeli değer anlayışıyla modern yaşam alanlarının geliştirilmesi.",
  },
  {
    title: "Anahtar Teslim İnşaat",
    text: "Projelendirmeden uygulamaya ve teslim aşamasına kadar inşaat sürecinin bütüncül şekilde yönetilmesi.",
  },
] as const;

const values = [
  {
    title: "Güven",
    text: "Her süreci açık, şeffaf ve sorumluluk bilinciyle yürütmek.",
  },
  {
    title: "Kalite",
    text: "Malzeme seçiminden uygulamaya kadar uzun ömürlü yapılar üretmek.",
  },
  {
    title: "Tecrübe",
    text: "Geçmişten gelen üretim kültürünü modern inşaat anlayışıyla birleştirmek.",
  },
  {
    title: "Değer",
    text: "Sadece bina değil, bulunduğu bölgeye ve kullanıcılarına değer katan yaşam alanları oluşturmak.",
  },
] as const;

export default function HakkimizdaPage() {
  return (
    <SiteLayout currentPath="/hakkimizda">
      <section className="bg-cream py-14 sm:py-[5.25rem] lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8934a]">
            Yılmaz Yapı
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
            <span className="block sm:inline">1977&apos;den Bugüne, </span>
            <span className="block sm:inline">Geleceğe Güvenle</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">
            1977 yılında başlayan ticari faaliyet ve üretim tecrübemizi, 12 yıllık
            inşaat deneyimimizle birleştirerek güvenli, nitelikli ve değer
            kazanan yaşam alanları inşa ediyoruz.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8934a]">
              Hikâyemiz
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal lg:text-4xl">
              1977&apos;den Bugüne Uzanan Bir Tecrübe
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-relaxed text-muted">
            <p>
              Yılmaz Yapı&apos;nın temelleri, 1977 yılında başlayan ticari
              faaliyetler ve üretim tecrübesine dayanmaktadır.
            </p>
            <p>
              1997 yılında şirketimiz resmi olarak kurularak faaliyetlerini
              kurumsal bir yapı altında sürdürmeye başlamıştır. Yıllar içinde
              üretim, mobilya ve farklı ticari alanlarda edinilen deneyim,
              güçlü bir iş kültürünün oluşmasını sağlamıştır.
            </p>
            <p>
              2014 yılından itibaren inşaat sektöründe aktif olarak faaliyet
              göstermeye başlayan şirketimiz, bugün Yılmaz Yapı markasıyla
              İstanbul&apos;da, özellikle Bahçelievler ve Şirinevler
              bölgelerinde konut projeleri ve kentsel dönüşüm çalışmalarına
              odaklanmaktadır.
            </p>
            <p>
              Geçmişten gelen üretim kültürümüzü; modern mühendislik, kaliteli
              işçilik, güvenilir süreç yönetimi ve uzun vadeli değer
              anlayışıyla bir araya getiriyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-cream-dark bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Rakamlarla Yılmaz Yapı
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">
            {stats.map((item, i) => (
              <div
                key={item.label}
                className={`lg:col-span-2 ${i === 3 ? "lg:col-start-2" : ""}`}
              >
                <StatItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl font-semibold text-charcoal">
              Yaşam Alanları İnşa Ediyoruz
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Yılmaz Yapı olarak odağımızı İstanbul&apos;da nitelikli konut
              projeleri ve kentsel dönüşüm çalışmalarına veriyoruz.
            </p>
          </div>
          <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-10">
            {activities.map((item, i) => (
              <div key={item.title}>
                <p className="text-[11px] tracking-[0.16em] text-[#b8934a]">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-serif text-xl text-charcoal">
                  {item.title}
                </h3>
                <span className="mt-4 block h-px w-8 bg-[#b8934a]" />
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-cream-dark bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Yaklaşımımız
          </h2>
          <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                <span className="mt-4 block h-px w-8 bg-[#b8934a]" />
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8934a]">
              Vizyon
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal">
              Vizyonumuz
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              İstanbul&apos;un dönüşümüne güvenli, nitelikli ve çağdaş yapılarla
              katkı sağlayan; bulunduğu bölgelerde güvenle anılan bir yapı
              markası olmak.
            </p>
          </div>
          <div className="lg:border-l lg:border-cream-dark lg:pl-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8934a]">
              Misyon
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal">
              Misyonumuz
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Mühendislik, kaliteli işçilik ve şeffaf süreç yönetimini bir araya
              getirerek insanların güvenle yaşayabileceği, uzun yıllar değerini
              koruyan yapılar üretmek.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-cream-dark bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            İstanbul&apos;da Yaşamın İçinde
          </h2>
          <span className="mt-5 block h-px w-8 bg-[#b8934a]" />
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            Projelerimizi ağırlıklı olarak İstanbul Bahçelievler ve Şirinevler
            bölgesinde geliştiriyoruz. Bölgeyi yakından tanımanın sağladığı
            deneyimle, mevcut şehir dokusuna uyum sağlayan ve yaşam kalitesini
            yükselten projeler üretmeyi hedefliyoruz.
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.18em] text-muted">
            Bahçelievler · Şirinevler · İstanbul
          </p>
        </div>
      </section>

      <section className="border-t border-cream-dark bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
            Geleceği Güvenle İnşa Ediyoruz
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            Kentsel dönüşüm ve yeni projeler hakkında bizimle iletişime geçin.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/insaat/devam-eden"
              className="bg-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#b8934a]"
            >
              Projelerimizi İnceleyin
            </Link>
            <Link
              href="/iletisim"
              className="border border-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal transition-colors hover:border-[#b8934a] hover:text-[#b8934a]"
            >
              Bizimle İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function StatItem({
  item,
}: {
  item: (typeof stats)[number];
}) {
  return (
    <div>
      <p className="font-serif text-5xl tracking-tight text-[#b8934a] sm:text-6xl">
        {item.value}
        {"suffix" in item && item.suffix ? (
          <span className="ml-2 font-serif text-2xl tracking-normal text-[#b8934a] sm:text-3xl">
            {item.suffix}
          </span>
        ) : null}
      </p>
      <span className="mt-5 block h-px w-8 bg-[#b8934a]" />
      <p className="mt-4 max-w-[14rem] text-sm leading-relaxed text-muted">
        {item.label}
      </p>
    </div>
  );
}
