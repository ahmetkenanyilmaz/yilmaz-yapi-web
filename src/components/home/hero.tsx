"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85",
    tag: "Daha Değerli",
    highlight: "YENİ BİR YAŞAM",
    text: "Kentsel dönüşüm ve modern konut projelerinde güvenilir mühendislik, şeffaf süreçler ve kaliteli işçilik.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85",
    tag: "Güvenilir",
    highlight: "YAŞAM ALANLARI",
    text: "Deprem yönetmeliğine uygun, modern mimari anlayışla İstanbul'un dört bir yanında projeler yükseltiyoruz.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
    tag: "Şeffaf",
    highlight: "KENTSEL DÖNÜŞÜM",
    text: "Hak sahiplerine güvenilir ve anlaşılır çözümler sunuyoruz.",
  },
];

const SWIPE_THRESHOLD = 48;
const AUTOPLAY_MS = 6000;

export function Hero() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setActive(index);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, AUTOPLAY_MS);
  }, [goNext]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  const finishDrag = useCallback(
    (clientX: number) => {
      if (dragStartX.current === null) return;

      const delta = clientX - dragStartX.current;
      dragStartX.current = null;
      setIsDragging(false);
      setDragOffset(0);

      if (Math.abs(delta) < SWIPE_THRESHOLD) return;

      if (delta < 0) goNext();
      else goPrev();

      resetAutoplay();
    },
    [goNext, goPrev, resetAutoplay],
  );

  const startDrag = useCallback((clientX: number) => {
    dragStartX.current = clientX;
    setIsDragging(true);
    setDragOffset(0);
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (dragStartX.current === null) return;
    setDragOffset(clientX - dragStartX.current);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
    const onMouseUp = (e: MouseEvent) => finishDrag(e.clientX);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [finishDrag, moveDrag]);

  const slide = SLIDES[active];
  const primaryPhone = siteConfig.phones[0];
  const copyAnimClass =
    direction > 0 ? "hero-copy-next" : "hero-copy-prev";

  return (
    <section className="h-full min-h-0 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid h-full min-h-0 max-w-7xl grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:gap-8">
        {/* Sol kolon */}
        <div className="hidden min-h-0 lg:flex lg:flex-col lg:justify-start lg:pt-10 xl:pt-14">
          <div key={active} className={copyAnimClass}>
            <p className="min-h-[4.75rem] font-serif text-[1.65rem] leading-tight text-charcoal xl:min-h-[5.25rem] xl:text-[2.1rem]">
              {slide.tag}
              <br />
              <strong className="font-bold">{slide.highlight}</strong>
            </p>
            <div className="my-4 ml-auto w-24 shrink-0 border-t-2 border-charcoal" />
            <p className="ml-auto min-h-[5.5rem] max-w-[240px] text-right text-sm leading-relaxed text-muted xl:min-h-[6rem] xl:text-[15px]">
              {slide.text}
            </p>
          </div>
        </div>

        {/* Sağ: slider */}
        <div className="relative flex min-h-0 flex-col">
          <div className="absolute -top-px -right-px z-20 hidden sm:block">
            <div
              className="bg-charcoal px-5 py-2 text-xs font-medium tracking-wide text-white lg:text-sm"
              style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              {primaryPhone.number}
            </div>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden border-2 border-charcoal bg-white shadow-sm">
            <div
              className="relative h-full min-h-[200px] cursor-grab touch-pan-y select-none active:cursor-grabbing lg:min-h-0"
              onMouseDown={(e) => {
                e.preventDefault();
                startDrag(e.clientX);
              }}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
              onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
              onTouchEnd={(e) => finishDrag(e.changedTouches[0].clientX)}
            >
              <div
                className={`hero-slide-track flex h-full ${isDragging ? "hero-slide-track--dragging" : ""}`}
                style={{
                  transform: `translateX(calc(-${active * 100}% + ${dragOffset}px))`,
                }}
              >
                {SLIDES.map((s) => (
                  <div
                    key={s.image}
                    className="h-full min-w-full shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${s.image}')` }}
                    draggable={false}
                  />
                ))}
              </div>

              <div
                key={active}
                className={`pointer-events-none absolute bottom-0 left-0 max-w-[85%] bg-charcoal/90 px-4 py-3 text-white sm:max-w-[70%] sm:px-5 sm:py-4 ${copyAnimClass}`}
              >
                <p className="text-[10px] uppercase tracking-wider text-gold-light sm:text-xs">
                  {slide.tag}
                </p>
                <p className="mt-1 font-serif text-sm font-bold uppercase sm:text-base">
                  {slide.highlight}
                </p>
                <p className="mt-1.5 hidden text-xs leading-relaxed text-white/80 sm:block">
                  {slide.text}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex shrink-0 items-center justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slayt ${i + 1}`}
                onClick={() => {
                  if (i === active) return;
                  goTo(i, i > active ? 1 : -1);
                  resetAutoplay();
                }}
                className={`h-1 transition-all duration-300 ${
                  i === active
                    ? "w-10 skew-x-[-20deg] bg-charcoal"
                    : "w-6 skew-x-[-20deg] bg-charcoal/25 hover:bg-charcoal/45"
                }`}
              />
            ))}
          </div>

          <div className="mt-3 flex shrink-0 flex-wrap justify-center gap-3 pb-1 lg:hidden">
            <Link
              href="/insaat/devam-eden"
              className="bg-charcoal px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Projeleri İncele
            </Link>
            <Link
              href="/iletisim"
              className="border border-charcoal px-5 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal"
            >
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
