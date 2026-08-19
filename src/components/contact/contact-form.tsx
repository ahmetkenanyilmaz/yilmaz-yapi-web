"use client";

import { useState } from "react";
import Link from "next/link";

const fieldClass =
  "w-full border border-[#e6e1d8] bg-[#fbfaf7] px-4 py-3.5 text-sm text-charcoal placeholder:text-muted/50 outline-none transition-[border-color] duration-[250ms] ease-in-out hover:border-[#B8934A]/70 focus:border-[#B8934A] disabled:opacity-60";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
          kvkk: data.get("kvkk") === "on",
        }),
      });

      const json = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(json.error ?? "Mesaj gönderilemedi.");
        return;
      }

      setSent(true);
      form.reset();
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-[#ede9e1] bg-[#fbfaf7] px-6 py-8 text-center">
        <p className="font-medium text-charcoal">Mesajınız alındı.</p>
        <p className="mt-2 text-sm text-muted">
          En kısa sürede sizinle iletişime geçeceğiz. Acil talepler için telefon
          veya WhatsApp hattımızı kullanabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      {error && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="name" className="sr-only">
          İsim
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={120}
          disabled={loading}
          placeholder="İsim"
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          E-Posta
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          disabled={loading}
          placeholder="E-Posta"
          className={fieldClass}
        />
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Şirket</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={4000}
          disabled={loading}
          placeholder="Mesajınız"
          className={`${fieldClass} resize-none`}
        />
      </div>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted">
        <input
          type="checkbox"
          name="kvkk"
          required
          disabled={loading}
          className="mt-0.5 size-4 shrink-0 accent-[#B8934A]"
        />
        <span>
          <Link
            href="/kvkk"
            className="text-charcoal underline decoration-[#B8934A]/50 underline-offset-2 hover:text-[#B8934A]"
          >
            KVKK Aydınlatma Metni
          </Link>
          &apos;ni okudum; kişisel verilerimin talebime yanıt verilmesi
          amacıyla işlenmesini kabul ediyorum.
        </span>
      </label>
      <button
        type="submit"
        disabled={loading}
        className="rounded-sm bg-[#B8934A] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#f8f6f2] transition-all duration-[250ms] ease-in-out hover:bg-[#2c2c2c] hover:text-white disabled:opacity-60"
      >
        {loading ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
