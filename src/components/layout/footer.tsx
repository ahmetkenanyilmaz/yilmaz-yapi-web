import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-dark bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-12 sm:px-6 md:flex-row lg:px-8">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Logo variant="footer" />
          <p className="text-sm text-muted">
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
          </p>
          <a
            href={siteConfig.phones[0].href}
            className="text-sm text-muted hover:text-gold"
          >
            {siteConfig.phones[0].number}
          </a>
          <p className="text-sm text-muted">
            © {year} {siteConfig.name} — Tüm Hakları Saklıdır.
          </p>
          <p className="max-w-sm text-center text-[11px] leading-relaxed text-muted/80 md:text-left">
            {siteConfig.legalName}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
          <Link href="/gizlilik" className="hover:text-gold">
            Gizlilik Politikası
          </Link>
          <Link href="/kvkk" className="hover:text-gold">
            KVKK
          </Link>
          <Link href="/site-haritasi" className="hover:text-gold">
            Site Haritası
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <SocialLink href={siteConfig.social.instagram} label="Instagram">
            <InstagramIcon />
          </SocialLink>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-dark text-muted transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

