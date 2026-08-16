import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Panel",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-cream-dark bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="font-serif text-xl font-semibold text-charcoal">
            Yılmaz Yapı — Yönetim
          </h1>
          <Link href="/" className="text-sm text-muted hover:text-gold">
            Siteyi Görüntüle
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="rounded-sm border border-gold/30 bg-gold/5 p-4 text-sm text-muted">
          Bu panel iskelet halindedir. Supabase bağlandığında buradan proje
          ekleme, fotoğraf/video yükleme ve içerik düzenleme yapabileceksiniz.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AdminCard title="Projeler" description="12 proje (placeholder)" />
          <AdminCard title="Medya" description="Fotoğraf ve video yükleme" />
          <AdminCard title="Sayfa İçerikleri" description="Kurumsal, Kentsel Dönüşüm metinleri" />
        </div>
      </main>
    </div>
  );
}

function AdminCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-sm border border-cream-dark bg-white p-6 opacity-60">
      <h2 className="font-serif text-lg font-semibold text-charcoal">{title}</h2>
      <p className="mt-2 text-sm text-muted">{description}</p>
      <button
        type="button"
        disabled
        className="mt-4 text-sm font-medium text-gold/50"
      >
        Yakında →
      </button>
    </div>
  );
}
