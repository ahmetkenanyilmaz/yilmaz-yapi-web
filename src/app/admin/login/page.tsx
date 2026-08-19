import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminUser } from "@/lib/admin-auth";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Admin Giriş",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const admin = await getAdminUser();
  if (admin) redirect("/admin");

  const configured = Boolean(getSupabasePublicEnv());

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md border border-cream-dark bg-white p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b8934a]">
          Yönetim
        </p>
        <h1 className="mt-3 font-serif text-2xl font-semibold text-charcoal">
          Yönetim Paneli
        </h1>
        <p className="mt-2 text-sm text-muted">
          Bu alan yalnızca site yöneticisine açıktır.
        </p>
        {configured ? (
          <LoginForm />
        ) : (
          <p className="mt-8 text-sm text-muted">
            Supabase bağlantısı henüz yok. `.env.local` dosyasına{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> ve{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> ekleyin.
          </p>
        )}
        <p className="mt-6 text-center text-xs text-muted">
          <a href="/" className="hover:text-[#b8934a]">
            ← Siteye Dön
          </a>
        </p>
      </div>
    </div>
  );
}
