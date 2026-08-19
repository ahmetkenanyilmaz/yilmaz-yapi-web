import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { UrbanFaq } from "@/components/urban/urban-faq";
import { UrbanGuideToc } from "@/components/urban/urban-guide-toc";
import { UrbanStateSupports } from "@/components/urban/urban-state-supports";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kentsel Dönüşüm",
  description:
    "Kentsel dönüşüm nedir, süreç nasıl işler, hak sahipleri ve kiracılar nelere dikkat etmeli? 6306 sayılı Kanun çerçevesinde anlaşılır bir rehber.",
};

const reasons = [
  {
    title: "Deprem Güvenliği",
    text: "Güvenli ve güncel standartlara uygun yapılara geçiş.",
  },
  {
    title: "Modern Yaşam",
    text: "Daha işlevsel, konforlu ve çağdaş yaşam alanları.",
  },
  {
    title: "Gayrimenkul Değeri",
    text: "Yenilenen yapının ve çevrenin taşınmaz değerine katkısı.",
  },
  {
    title: "Yasal Süreç ve Güvence",
    text: "Kentsel dönüşümün ilgili mevzuat kapsamında yürütülmesi.",
  },
];

const processSteps = [
  {
    title: "Ön Değerlendirme",
    text: "Binanın yaşı, taşıyıcı sistemi ve mevcut kullanım durumu hakkında ilk bilgi toplanır. Bu adım, resmi tespitten önce yön tayin eder.",
  },
  {
    title: "Riskli Yapı Tespiti",
    text: "Yetkilendirilmiş kuruluş, yerinde inceleme ve hesaplarla raporu hazırlar. Sonuç, ilgili idarece incelenerek kesinleşir.",
  },
  {
    title: "Hak Sahipleri ile Görüşme",
    text: "Kat malikleri ve diğer hak sahipleri; süreç, seçenekler ve olası takvim hakkında ortak bir zeminde bilgilendirilir.",
  },
  {
    title: "Projelendirme ve Sözleşme",
    text: "Mimari ve statik yaklaşım netleşir. Hak paylaşımı, teslim koşulları ve yükümlülükler yazılı hâle getirilir.",
  },
  {
    title: "Ruhsat ve Yıkım",
    text: "Gerekli izinler tamamlandıktan sonra kontrollü yıkım planlanır. Çevre güvenliği ve yasal usuller bu aşamanın parçasıdır.",
  },
  {
    title: "İnşaat Süreci",
    text: "Yürürlükteki deprem ve imar kurallarına uygun imalat, yapı denetimi eşliğinde ilerler. Şantiye programı proje ölçeğine göre değişir.",
  },
  {
    title: "Anahtar Teslim",
    text: "İskan ve teslim evrakları tamamlandığında bağımsız bölümler hak sahiplerine devredilir. Eksik ve ayıp süreçleri sözleşmeye göre yürütülür.",
  },
];

const officialLinks = [
  {
    label: "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı",
    href: "https://www.csb.gov.tr/",
  },
  {
    label: "6306 sayılı Kanun (Mevzuat Bilgi Sistemi)",
    href: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6306&MevzuatTur=1&MevzuatTertip=5",
  },
];

export default function KentselDonusumPage() {
  const [callPhone, whatsappPhone] = siteConfig.phones;

  return (
    <SiteLayout currentPath="/kentsel-donusum">
      <section className="border-b border-cream-dark bg-cream py-11 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
            Kentsel Dönüşüm
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
            Güvenli, modern ve değerini koruyan yaşam alanlarına dönüşüm
            sürecini adım adım keşfedin.
          </p>
        </div>
      </section>

      <section className="bg-cream pt-10 pb-16 sm:pt-12 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Kentsel Dönüşüm Nedir?
          </h2>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              Kentsel dönüşüm; riskli, yıpranmış veya ekonomik ömrünü
              tamamlamış yapıların; can ve mal güvenliği gözetilerek yenilenmesi
              ya da yeniden yapılmasıdır. Amaç yalnızca binayı yıkıp yerine
              yenisini koymak değil, güncel yapı standartlarına uygun, daha
              nitelikli bir yaşam ortamı oluşturmaktır.
            </p>
            <p>
              Türkiye&apos;de bu alandaki temel çerçeve, afete karşı
              dayanıklılığın artırılmasını hedefleyen{" "}
              <strong className="font-medium text-charcoal">
                6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi
                Hakkında Kanun
              </strong>{" "}
              ve buna bağlı yönetmeliklerle çizilir. Uygulama; riskli yapı
              tespiti, hak sahipliği, ruhsat, yıkım ve yeniden yapım gibi
              aşamalardan geçer.
            </p>
            <p>
              Dönüşüm, deprem güvenliğini merkeze alır. Aynı zamanda ısı,
              erişilebilirlik, yangın ve kullanım konforu gibi çağdaş yapı
              gereklerini de gündeme getirir. Her bina ve her parsel aynı
              senaryoyu izlemez; zemin, imar hakkı ve malik yapısı sonucu
              etkiler.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-cream-dark bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Neden Kentsel Dönüşüm?
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Dönüşüm kararı çoğu zaman tek bir gerekçeye indirgenmez. Aşağıdaki
            başlıklar, sık karşılaşılan gerekçeleri özetler.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item, i) => (
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

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Kentsel Dönüşüm Süreci
          </h2>
          <p className="mt-3 text-sm text-muted">
            Adımlar projeden projeye değişebilir. Aşağıdaki sıra, yaygın bir
            akışı gösterir.
          </p>
          <ol className="relative mt-12 border-l border-cream-dark pl-8">
            {processSteps.map((item, i) => (
              <li key={item.title} className="relative pb-10 last:pb-0">
                <span className="absolute top-0.5 -left-8 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-[#b8934a]/50 bg-cream text-[10px] font-semibold text-[#2b2a27]">
                  {i + 1}
                </span>
                <h3 className="font-serif text-xl text-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <UrbanStateSupports />

      <section className="border-t border-cream-dark bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Kentsel Dönüşüm Hakkında Bilmeniz Gerekenler
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Aşağıdaki başlıklar sık sorulan konuları özetler. Rakam, oran ve
            süreler güncel mevzuat ile yerel uygulamaya göre değişebilir.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <UrbanGuideToc />
            <div className="space-y-14 text-[15px] leading-relaxed text-muted">
              <GuideBlock id="nedir" title="Kentsel Dönüşüm Nedir?">
                <p>
                  Kentsel dönüşüm, afet riskini azaltmayı ve yaşanabilir bir
                  çevreyi hedefleyen bir yenileme sürecidir. Riskli yapıların
                  yanı sıra, ekonomik ömrünü doldurmuş binaların da gündeme
                  gelmesi sık görülür. Sonuç; deprem yönetmeliğine daha uygun,
                  daha nitelikli bir yapı stoku olabilir.
                </p>
                <p>
                  Dönüşüm her zaman aynı modeli izlemez. Parsel bazlı yenileme,
                  ada ölçeği veya riskli alan ilanı gibi farklı hukuki zeminler
                  söz konusu olabilir. Hangi modelin geçerli olduğu, ilgili
                  idarenin kararı ve tapu/imar durumuna bağlıdır.
                </p>
              </GuideBlock>

              <GuideBlock id="kanun" title="6306 Sayılı Kanun ve Süreç">
                <p>
                  6306 sayılı Kanun, afet riski altındaki alanların ve riskli
                  yapıların dönüştürülmesine ilişkin temel kanundur. Kanun;
                  tespit, tebliğ, itiraz, yıkım ve yeniden yapım gibi
                  aşamaların çerçevesini çizer. Ayrıntılar yönetmelik ve tebliğ
                  ile tamamlanır.
                </p>
                <p>
                  Süreçte “kim başvurur, hangi çoğunluk gerekir, pay nasıl
                  işlenir” gibi soruların yanıtı, kanunun güncel metni ve
                  uygulama yönetmeliğindedir. Bu sayfada sabit oran veya süre
                  yazılmamıştır; çünkü bu değerler zaman içinde
                  güncellenebilir.
                </p>
              </GuideBlock>

              <GuideBlock
                id="risk-tespiti"
                title="Riskli Yapı Tespiti Nasıl Yapılır?"
              >
                <p>
                  Riskli yapı tespiti, bakanlıkça yetkilendirilmiş kuruluşlarca
                  yapılır. İnceleme; taşıyıcı sistem, malzeme, düzensizlikler ve
                  hesap esaslarını kapsar. Rapor, ilgili idareye iletilir ve
                  idarece uygun bulunursa yapı “riskli” olarak tescil edilir.
                </p>
                <p>
                  Maliklere tebligat ve itiraz imkânı mevzuatta düzenlenmiştir.
                  Tespit, tek başına yıkım kararı anlamına gelmez; sonraki
                  adımlar hak sahipliği, sözleşme ve ruhsat süreçleriyle
                  ilerler.
                </p>
              </GuideBlock>

              <GuideBlock
                id="kat-malikleri"
                title="Kat Maliklerinin / Hak Sahiplerinin Hakları"
              >
                <p>
                  Kat malikleri; binanın durumu, proje seçenekleri ve sözleşme
                  hükümleri hakkında bilgi alma hakkına sahiptir. Toplantı,
                  oy ve pay oranına ilişkin kurallar kat mülkiyeti mevzuatı ile
                  6306 sayılı Kanun’un özel hükümlerinin birlikte
                  değerlendirilmesini gerektirir.
                </p>
                <p>
                  Hak sahibi; tapudaki payı, bağımsız bölümün niteliği ve varsa
                  intifa/oturma hakkı gibi kayıtlarla belirlenir. Sözleşmede
                  teslim alanı, süre, ayıp ve teminat gibi maddelerin açık
                  yazılması, sonraki uyuşmazlıkları azaltır.
                </p>
              </GuideBlock>

              <GuideBlock id="kiracilar" title="Kiracıların Hakları">
                <p>
                  Kiracılar malik olmasa da tahliye, taşınma ve geçici barınma
                  konusunda belirli güvencelere sahip olabilir. Kira
                  sözleşmesinin türü, süre ve bildirim usulü hakları etkiler.
                </p>
                <p>
                  Destek ve süreler, malik için öngörülen imkânlarla her zaman
                  aynı değildir. Kiracıların resmi başvuruda hangi belgelerle
                  işlem yapacağı, ilgili idarenin güncel yönergesine bakılarak
                  netleştirilmelidir.
                </p>
              </GuideBlock>

              <GuideBlock
                id="kira-yardimi"
                title="Kira Yardımı ve Geçici Konut Desteği"
              >
                <p>
                  Riskli yapı sürecinde, hak sahipleri ve bazı durumlarda
                  kiracılar için kira yardımı veya geçici konut imkânı
                  öngörülebilir. Yardımın tutarı, süresi ve kimlere ödeneceği
                  sabit bir tarife gibi bu metinde yer almaz; çünkü bu
                  parametreler idari düzenleme ile değişebilir.
                </p>
                <p>
                  Başvuru genelde ilgili belediye veya bakanlığa bağlı birim
                  üzerinden, istenen belgelerle yapılır. Güncel koşullar için
                  resmi duyurular esas alınmalıdır.
                </p>
              </GuideBlock>

              <GuideBlock id="vergi" title="Vergi ve Harç Muafiyetleri">
                <p>
                  Dönüşümle bağlantılı tapu, harç ve benzeri işlemlerde kanun,
                  belirli muafiyet veya istisnalar tanıyabilir. Kapsam; işlemin
                  niteliği, tarih ve belgelendirme şartına bağlıdır.
                </p>
                <p>
                  “Tüm vergiler kalkar” gibi genel bir vaat doğru değildir. Hangi
                  işlemin istisna kapsamında olduğu, ilgili vergi dairesi veya
                  tapu müdürlüğünden ve güncel mevzuattan teyit edilmelidir.
                </p>
              </GuideBlock>

              <GuideBlock
                id="sure"
                title="Kentsel Dönüşüm Süreci Ne Kadar Sürer?"
              >
                <p>
                  Takvim; tespit ve tebligat süreleri, itiraz, proje onayı,
                  ruhsat, yıkım ve inşaat süresinin toplamıdır. Zemin iyileştirme,
                  komşu yapı ilişkisi veya hak sahibi uzlaşmasındaki gecikmeler
                  süreyi uzatabilir.
                </p>
                <p>
                  Bu nedenle “şu kadar ayda biter” ifadesi, keşif ve resmi
                  belgeler olmadan yanıltıcı olur. Gerçekçi program, proje
                  netleştikten sonra konuşulmalıdır.
                </p>
              </GuideBlock>

              <GuideBlock
                id="guclendirme"
                title="Kentsel Dönüşüm ile Güçlendirme Arasındaki Fark"
              >
                <p>
                  Güçlendirme, mevcut binanın taşıyıcı sistemini belirli bir
                  güvenlik düzeyine yükseltmeyi hedefler. Bina ayakta kalır;
                  kullanım kısmen kısıtlanabilir. Yeniden yapım ise yapının
                  yıkılıp yürürlükteki kurallara göre yeniden inşa edilmesidir.
                </p>
                <p>
                  Hangisinin uygun olduğu; hasar, düzensizlik, maliyet, imar
                  hakkı ve kullanım ihtiyacının birlikte değerlendirilmesiyle
                  anlaşılır. Bu karar, yetkili mühendislik çalışması olmadan
                  verilemez.
                </p>
              </GuideBlock>

              <GuideBlock
                id="muteahhit"
                title="Müteahhit Seçerken Nelere Dikkat Edilmeli?"
              >
                <p>
                  Sözleşme öncesi; firmanın tamamladığı işler, yapı denetim
                  ilişkisi, teminat ve teslim maddeleri, hak paylaşım tablosu
                  ve takvim açıkça görülmelidir. Sözlü vaatler, yazılı metnin
                  yerini tutmaz.
                </p>
                <p>
                  Referans şantiye gezmek, tapu ve ruhsat süreçlerinde kimin
                  sorumluluğunu üstleneceğini sormak ve belirsiz “orana göre
                  artar” ifadelerinden kaçınmak, sonraki sürprizleri azaltır.
                  Seçim, yalnızca fiyat karşılaştırmasına indirgenmemelidir.
                </p>
              </GuideBlock>

              <div className="border-t border-cream-dark pt-8">
                <p className="text-sm leading-relaxed">
                  Mevzuat ve uygulama esasları zaman içinde güncellenir. Kesin
                  ve güncel bilgi için resmi kaynakları esas alınız:
                </p>
                <ul className="mt-4 space-y-2">
                  {officialLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-charcoal underline decoration-[#b8934a]/50 underline-offset-4 transition-colors hover:text-[#b8934a]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-cream-dark bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Sık Sorulan Sorular
          </h2>
          <p className="mt-3 text-sm text-muted">
            Yanıtlar genel bilgilendirme amaçlıdır; somut dosyanız için resmi
            metin ve uzman görüşü gerekir.
          </p>
          <div className="mt-10">
            <UrbanFaq />
          </div>
        </div>
      </section>

      <section className="border-t border-cream-dark bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-charcoal">
            Binanız İçin İlk Adımı Birlikte Atalım
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Binanızın durumu, süreç ve olası adımlar hakkında kısa bir ön
            görüşme yapabiliriz. Bu görüşme, bağlayıcı bir teklif değildir.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/iletisim"
              className="bg-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#b8934a]"
            >
              Ücretsiz Ön Görüşme
            </Link>
            <a
              href={whatsappPhone.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal transition-colors hover:border-[#b8934a] hover:text-[#b8934a]"
            >
              WhatsApp
            </a>
            <a
              href={callPhone.href}
              className="border border-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal transition-colors hover:border-[#b8934a] hover:text-[#b8934a]"
            >
              Bizi Arayın
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function GuideBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article id={id} className="scroll-mt-28">
      <h3 className="font-serif text-2xl text-charcoal">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </article>
  );
}
