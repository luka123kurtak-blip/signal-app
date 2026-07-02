"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { SESSION_AUTH_KEY } from "@/lib/siteAuth";

type LoginFormProps = {
  onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Неправильний пароль");
        return;
      }

      sessionStorage.setItem(SESSION_AUTH_KEY, "1");

      if (onSuccess) {
        onSuccess();
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Не вдалося увійти. Спробуй ще раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="Вхід" subtitle="Введи пароль для доступу до сайту">
      <form onSubmit={handleSubmit} className="flex w-full max-w-xs flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (error) setError("");
          }}
          placeholder="Пароль"
          autoComplete="current-password"
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-center text-white outline-none transition focus:border-white/25"
        />

        {error && (
          <p className="text-center text-sm font-medium text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Перевірка…" : "Увійти"}
        </button>
      </form>
    </AppShell>
  );
}
