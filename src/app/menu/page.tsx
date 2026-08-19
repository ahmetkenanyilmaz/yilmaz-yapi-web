import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { isNavDropdown, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Menü",
  robots: { index: false, follow: false },
};

export default function MenuPage() {
  return (
    <SiteLayout currentPath="/menu">
      <section className="bg-cream px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-lg">
          <h1 className="sr-only">Menü</h1>
          <nav className="divide-y divide-cream-dark border-y border-cream-dark">
            {siteConfig.nav.map((item) => {
              if (isNavDropdown(item)) {
                return (
                  <details key={item.label} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg uppercase tracking-wide text-charcoal [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <svg
                        className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="pb-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2.5 pl-1 text-base text-muted"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-4 text-lg uppercase tracking-wide text-charcoal"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 space-y-3">
            {siteConfig.phones.map((phone) => (
              <a
                key={phone.number}
                href={phone.href}
                className="block text-lg text-charcoal"
              >
                {phone.number}
                <span className="mt-0.5 block text-sm text-muted">
                  {phone.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
