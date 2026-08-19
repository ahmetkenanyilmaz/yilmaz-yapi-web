"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
    title: "Daha Değerli Bir Gelecek İnşa Ediyoruz",
    text: "Kentsel dönüşüm ve modern yapı anlayışıyla güvenli, nitelikli ve değer kazanan yaşam alanları oluşturuyoruz.",
    overlayTitle: "GELECEĞE DEĞER KATIYORUZ",
    overlayText:
      "Bugünün ihtiyaçlarını, yarının yaşam standartlarıyla buluşturan projeler geliştiriyoruz.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
    title: "Güvenle Yükselen Yaşam Alanları",
    text: "Sağlam mühendislik, kaliteli işçilik ve şeffaf süreçlerle projelerimizi hayata geçiriyoruz.",
    overlayTitle: "TEMELİMİZ GÜVEN",
    overlayText:
      "Her projede mühendislikten uygulamaya kadar güveni ve kaliteyi ön planda tutuyoruz.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&q=85",
    title: "Konforu Gelecekle Buluşturuyoruz",
    text: "Modern, işlevsel ve değerini koruyan yaşam alanlarını estetikle bir araya getiriyoruz.",
    overlayTitle: "YAŞAM İÇİN TASARLIYORUZ",
    overlayText:
      "Sadece yapılar değil; konforlu, işlevsel ve uzun yıllar değerini koruyan yaşam alanları inşa ediyoruz.",
  },
];

export function Hero() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startIndex = useRef(0);
  const pausedUntil = useRef(0);
  const [active, setActive] = useState(0);

  const slideWidth = () => viewportRef.current?.clientWidth || 1;

  const goTo = (index: number) => {
    const next = (index + SLIDES.length) % SLIDES.length;
    viewportRef.current?.scrollTo({
      left: next * slideWidth(),
      behavior: "smooth",
    });
    setActive(next);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const sync = () => {
      const index = Math.round(viewport.scrollLeft / slideWidth()) % SLIDES.length;
      setActive(index);
    };

    viewport.addEventListener("scroll", sync, { passive: true });

    const timer = window.setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      const current = Math.round(viewport.scrollLeft / slideWidth()) % SLIDES.length;
      goTo(current + 1);
    }, 12000);

    return () => {
      viewport.removeEventListener("scroll", sync);
      window.clearInterval(timer);
    };
  }, []);

  const slide = SLIDES[active];

  return (
    <section className="yy-hero px-4 pt-10 pb-6 sm:px-6 lg:flex lg:h-full lg:min-h-0 lg:items-center lg:px-8 lg:py-0">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:items-center lg:gap-12">
        <div className="pt-4 lg:pt-0">
          <p className="font-serif text-[1.35rem] leading-tight text-charcoal lg:text-[1.65rem] xl:text-[2.1rem]">
            <strong className="font-bold">{slide.title}</strong>
          </p>
          <div className="my-3 ml-auto w-16 shrink-0 border-t-2 border-charcoal lg:my-4 lg:w-24" />
          <p className="ml-auto max-w-[240px] text-right text-sm leading-relaxed text-muted xl:text-[15px]">
            {slide.text}
          </p>
        </div>

        <div className="relative flex min-h-0 min-w-0 flex-col">
          <div className="relative min-w-0 overflow-hidden border-2 border-charcoal bg-white shadow-sm h-[240px] sm:h-[260px] lg:h-[420px]">
            <div
              ref={viewportRef}
              id="yy-hero-viewport"
              className="yy-hero-viewport absolute inset-0 h-full"
              onTouchStart={(event) => {
                pausedUntil.current = Date.now() + 7000;
                startX.current = event.touches[0].clientX;
                startIndex.current = active;
              }}
              onTouchEnd={(event) => {
                const dx = event.changedTouches[0].clientX - startX.current;
                if (Math.abs(dx) < 40) return;
                pausedUntil.current = Date.now() + 7000;
                if (startIndex.current === SLIDES.length - 1 && dx < 0) goTo(0);
                if (startIndex.current === 0 && dx > 0) goTo(SLIDES.length - 1);
              }}
            >
              <div className="yy-hero-track">
                {SLIDES.map((item) => (
                  <article key={item.image} className="yy-hero-unit">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt="" draggable={false} />
                    <div className="hero-slide-copy">
                      <p>{item.overlayTitle}</p>
                      <span>{item.overlayText}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex shrink-0 items-center justify-center gap-2">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Slayt ${index + 1}`}
                onClick={() => {
                  pausedUntil.current = Date.now() + 7000;
                  goTo(index);
                }}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span className="yy-hero-dot" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex shrink-0 flex-wrap justify-center gap-3 pb-2 lg:hidden">
        <Link
          href="/insaat/devam-eden"
          className="bg-charcoal px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white"
        >
          Projeleri İncele
        </Link>
        <Link
          href="/iletisim"
          className="border border-charcoal px-5 py-3 text-sm font-semibold uppercase tracking-wider text-charcoal"
        >
          İletişim
        </Link>
      </div>
    </section>
  );
}
