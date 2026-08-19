import { urbanSupportSources } from "@/lib/kentsel-donusum";

const yarisiBizdenItems = [
  { amount: "875.000 TL", label: "Hibe" },
  { amount: "875.000 TL", label: "Kredi" },
  { amount: "125.000 TL", label: "Taşınma desteği" },
] as const;

const newCreditHighlights = [
  { value: "3 Milyon TL", label: "Kredi üst limiti" },
  { value: "%0,69", label: "Aylık faiz" },
  { value: "180 Ay", label: "Azami vade" },
  { value: "1 Yıl Ödemesiz", label: "Geri ödeme başlangıcı" },
] as const;

const eligibility = [
  "Riskli yapıda hak sahibi olan uygun malikler",
  "Açık ve devam eden icra kaydı bulunmaması",
  "Açık ve devam eden haciz kaydı bulunmaması",
  "Açık ve devam eden takip kaydı bulunmaması",
  "Aylık kredi taksitinin belgelenmiş hane halkı gelirinin %70’ini aşmaması",
] as const;

const rateRelief = [
  "Riskli yapıdaki bağımsız bölüm dışında başka konutu bulunmayan hak sahipleri",
  "Orta ve düşük gelirli haneler",
  "Belirlenen sosyal gruplar",
  "A veya B sınıfı Enerji Kimlik Belgesine sahip yeni yapılar",
] as const;

export function UrbanStateSupports() {
  return (
    <section
      id="devlet-destekleri"
      className="scroll-mt-28 border-t border-cream-dark bg-cream py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8934a]">
          Finansman
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal">
          Güncel Devlet Destekleri
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          İstanbul’daki riskli yapı dönüşümünde resmi kurumlar tarafından
          açıklanan iki ayrı destek modeli bulunmaktadır. Aşağıdaki bilgiler
          birbirinin devamı veya yerine geçen programlar değildir; başvuru
          şartları ve kapsam her model için ayrı değerlendirilir.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <YarisiBizdenCard />
          <NewCreditCard />
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted">
          Destek tutarları, başvuru şartları ve uygulama esasları ilgili kamu
          kurumları tarafından güncellenebilir. Başvuru öncesinde güncel resmi
          şartların kontrol edilmesi önerilir.
        </p>

        <ul className="mt-4 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {urbanSupportSources.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-charcoal underline decoration-[#b8934a]/50 underline-offset-4 transition-colors hover:text-[#b8934a]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function YarisiBizdenCard() {
  return (
    <article className="flex flex-col border border-cream-dark bg-[#faf8f4] px-6 py-8 sm:px-8 sm:py-9">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8934a]">
        Destek modeli
      </p>
      <h3 className="mt-3 font-serif text-2xl font-semibold text-charcoal sm:text-[1.75rem]">
        Yarısı Bizden Kampanyası
      </h3>

      <div className="mt-6 border border-[#b8934a]/35 bg-cream px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b8934a]">
          31 Aralık 2026 Son Başvuru / Riskli Yapı Tespit Tarihi
        </p>
        <p className="mt-2 font-serif text-3xl tracking-wide text-charcoal sm:text-4xl">
          31 Aralık 2026
        </p>
        <p className="mt-1 text-sm text-muted">Son tarih</p>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">
        İstanbul&apos;daki riskli yapıların dönüşümünü desteklemek amacıyla
        yürütülen Yarısı Bizden Kampanyası kapsamında, 31 Aralık 2026 tarihine
        kadar riskli yapı ilan edilen uygun bağımsız bölümler kampanyadan
        yararlanabilmektedir.
      </p>

      <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b8934a]">
        Konut başına güncel destek
      </p>
      <ul className="mt-4 divide-y divide-cream-dark border-y border-cream-dark">
        {yarisiBizdenItems.map((item) => (
          <li
            key={item.label}
            className="flex items-baseline justify-between gap-4 py-3"
          >
            <span className="text-sm text-muted">{item.label}</span>
            <span className="font-serif text-xl text-charcoal sm:text-2xl">
              {item.amount}
            </span>
          </li>
        ))}
        <li className="flex items-baseline justify-between gap-4 py-3">
          <span className="text-sm font-medium text-charcoal">Toplam</span>
          <span className="font-serif text-2xl text-[#b8934a] sm:text-[1.75rem]">
            1.875.000 TL
          </span>
        </li>
      </ul>
      <p className="mt-2 text-xs text-muted">finansman desteği</p>

      <div className="mt-8 border-t border-cream-dark pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal">
          Kredi geri ödemesi
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Kredi geri ödemeleri yapı ruhsatı alındıktan 2 yıl sonra başlar, 10
          yıla kadar vadeye yayılır. Geri ödemenin başladığı ilk yıl faiz
          uygulanmaz.
        </p>
      </div>
    </article>
  );
}

function NewCreditCard() {
  return (
    <article className="flex flex-col border border-cream-dark bg-[#faf8f4] px-6 py-8 sm:px-8 sm:py-9">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8934a]">
        İklim ve Afetlere Dayanıklı Şehirler Projesi
      </p>
      <h3 className="mt-3 font-serif text-2xl font-semibold text-charcoal sm:text-[1.75rem]">
        Yeni Kentsel Dönüşüm Kredisi
      </h3>
      <p className="mt-5 text-sm leading-relaxed text-muted">
        Çevre, Şehircilik ve İklim Değişikliği Bakanlığı koordinasyonunda ve
        Dünya Bankası finansmanıyla yürütülen proje kapsamında, İstanbul&apos;daki
        şartları sağlayan riskli yapı maliklerine uygun koşullu finansman
        desteği sunulmaktadır.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-px bg-cream-dark">
        {newCreditHighlights.map((item) => (
          <div key={item.label} className="bg-[#faf8f4] px-3 py-5 sm:px-4 sm:py-6">
            <p className="font-serif text-[1.65rem] leading-none text-charcoal sm:text-[1.85rem]">
              {item.value}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="font-serif text-xl text-charcoal">Kimler Yararlanabilir?</h4>
        <ul className="mt-4 space-y-2.5">
          {eligibility.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span
                className="mt-2 h-px w-3 shrink-0 bg-[#b8934a]"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-cream-dark pt-6">
        <h4 className="font-serif text-xl text-charcoal">İlave faiz indirimleri</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Aşağıdaki durumlarda yıllık faiz indirimi uygulanabilir:
        </p>
        <ul className="mt-4 space-y-2.5">
          {rateRelief.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span
                className="mt-2 h-px w-3 shrink-0 bg-[#b8934a]"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Detay oranları değişebileceği için güncel şartlar, resmi Bakanlık
          kaynaklarından kontrol edilmelidir.
        </p>
      </div>
    </article>
  );
}
