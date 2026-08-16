type PageBannerProps = {
  title: string;
  subtitle?: string;
  description?: string;
};

export function PageBanner({ title, subtitle, description }: PageBannerProps) {
  return (
    <section className="border-b border-cream-dark bg-cream py-14 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {subtitle && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {subtitle}
          </p>
        )}
        <h1 className="mt-3 font-serif text-4xl font-semibold text-charcoal sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-muted">{description}</p>
        )}
      </div>
    </section>
  );
}
