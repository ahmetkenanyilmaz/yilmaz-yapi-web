import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Giriş",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-dark/30 px-4">
      <div className="w-full max-w-md rounded-sm border border-cream-dark bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">
          Yönetim Paneli
        </h1>
        <p className="mt-2 text-sm text-muted">
          Bu alan yalnızca site yöneticisine açıktır. Supabase Auth
          entegrasyonu bir sonraki aşamada eklenecek.
        </p>

        <form className="mt-8 space-y-4" action="#" method="post">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal"
            >
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              disabled
              placeholder="admin@yilmazyapi.com"
              className="mt-1 w-full rounded-sm border border-cream-dark bg-cream/50 px-3 py-2 text-sm text-muted"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-charcoal"
            >
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              disabled
              className="mt-1 w-full rounded-sm border border-cream-dark bg-cream/50 px-3 py-2 text-sm text-muted"
            />
          </div>
          <button
            type="button"
            disabled
            className="w-full rounded-sm bg-gold/50 py-3 text-sm font-semibold uppercase tracking-wide text-white"
          >
            Yakında Aktif
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          <a href="/" className="hover:text-gold">
            ← Siteye Dön
          </a>
        </p>
      </div>
    </div>
  );
}
