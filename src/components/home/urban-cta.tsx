import Link from "next/link";

export function UrbanCta() {
  return (
    <section className="border-t border-cream-dark bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 rounded-sm border border-cream-dark bg-[#f8f6f2] px-6 py-10 sm:flex-row sm:justify-between sm:px-12">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold">
              <HomeLeafIcon />
            </div>
            <p className="font-serif text-xl font-semibold text-charcoal sm:text-2xl">
              Kentsel Dönüşümde Güvenli ve Şeffaf Çözümler
            </p>
          </div>
          <Link
            href="/kentsel-donusum"
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold-dark"
          >
            Süreci İncele
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeLeafIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
