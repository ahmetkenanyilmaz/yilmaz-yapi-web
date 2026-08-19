"use client";

import { useActionState } from "react";
import { signInAdmin } from "@/app/admin/actions";

type LoginState = { error: string } | null;

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: LoginState, formData: FormData): Promise<LoginState> => {
      const result = await signInAdmin(formData);
      return result ?? null;
    },
    null,
  );

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-charcoal">
          Kullanıcı adı
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          placeholder="admin"
          className="mt-1 w-full border border-cream-dark bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-[#b8934a]"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-charcoal">
          Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full border border-cream-dark bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-[#b8934a]"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-700">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-charcoal py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#b8934a] disabled:opacity-60"
      >
        {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
