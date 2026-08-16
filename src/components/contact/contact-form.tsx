"use client";

import { useState } from "react";

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
      <div className="rounded-sm border border-gold/30 bg-cream p-6 text-center">
        <p className="font-medium text-charcoal">Mesajınız alındı.</p>
        <p className="mt-2 text-sm text-muted">
          En kısa sürede sizinle iletişime geçeceğiz. Acil talepler için telefon
          veya WhatsApp hattımızı kullanabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
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
          disabled={loading}
          placeholder="İsim"
          className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:border-gold focus:outline-none disabled:opacity-60"
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
          disabled={loading}
          placeholder="E-Posta"
          className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:border-gold focus:outline-none disabled:opacity-60"
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
          disabled={loading}
          placeholder="Mesajınız"
          className="w-full resize-none border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:border-gold focus:outline-none disabled:opacity-60"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-charcoal px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gold disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
