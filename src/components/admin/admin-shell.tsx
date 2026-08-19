"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "@/app/admin/actions";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projeler" },
  { href: "/admin/projects/new", label: "Yeni Proje" },
  { href: "/admin/projects/ongoing", label: "Devam Edenler" },
  { href: "/admin/projects/completed", label: "Tamamlananlar" },
  { href: "/admin/projects/permit", label: "Ruhsat Aşamasındakiler" },
  { href: "/admin/media", label: "Medya" },
] as const;

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string;
}) {
  const currentPath = usePathname();
  return (
    <div className="min-h-screen bg-cream">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 shrink-0 border-r border-cream-dark bg-[#faf8f4] lg:block">
          <div className="border-b border-cream-dark px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8934a]">
              Yönetim
            </p>
            <p className="mt-2 font-serif text-lg text-charcoal">Yılmaz Yapı</p>
          </div>
          <nav className="flex flex-col px-3 py-4">
            {nav.map((item) => {
              const isEdit =
                item.href === "/admin/projects" &&
                /^\/admin\/projects\/[^/]+\/edit$/.test(currentPath);
              const active =
                item.href === "/admin"
                  ? currentPath === "/admin"
                  : currentPath === item.href || isEdit;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm ${
                    active
                      ? "bg-cream-dark/60 font-medium text-charcoal"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <form action={signOutAdmin} className="mt-4 px-3">
              <button
                type="submit"
                className="text-sm text-muted hover:text-charcoal"
              >
                Çıkış
              </button>
            </form>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-cream-dark bg-white px-4 py-4 sm:px-6">
            <div className="lg:hidden">
              <p className="font-serif text-lg text-charcoal">Yönetim</p>
            </div>
            <div className="hidden text-sm text-muted lg:block">
              {email}
            </div>
            <Link href="/" className="text-sm text-muted hover:text-[#b8934a]">
              Siteyi Görüntüle
            </Link>
          </header>
          <nav className="flex gap-3 overflow-x-auto border-b border-cream-dark bg-[#faf8f4] px-4 py-2 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap py-1 text-sm text-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <main className="flex-1 px-4 py-8 sm:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
