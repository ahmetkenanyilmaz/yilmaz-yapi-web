import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { siteConfig } from "@/lib/site-config";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Site Haritası",
};

export default async function SiteHaritasiPage() {
  const projects = await getPublishedProjects();

  return (
    <SiteLayout currentPath="/site-haritasi">
      <section className="border-b border-cream-dark bg-cream-dark/30 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Site Haritası
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="font-serif text-xl font-semibold text-charcoal">
          Sayfalar
        </h2>
        <ul className="mt-4 space-y-2">
          {siteConfig.nav.map((item) => (
            <li key={"children" in item ? item.label : item.href}>
              {"children" in item ? (
                <>
                  <span className="text-charcoal">{item.label}</span>
                  <ul className="mt-1 ml-4 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="text-gold hover:text-gold-dark">
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link href={item.href} className="text-gold hover:text-gold-dark">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link href="/kvkk" className="text-gold hover:text-gold-dark">
              KVKK
            </Link>
          </li>
          <li>
            <Link href="/gizlilik" className="text-gold hover:text-gold-dark">
              Gizlilik Politikası
            </Link>
          </li>
        </ul>

        <h2 className="mt-10 font-serif text-xl font-semibold text-charcoal">
          Projeler
        </h2>
        {projects.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Projelerimiz yakında burada.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projeler/${p.slug}`}
                  className="text-gold hover:text-gold-dark"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </SiteLayout>
  );
}
