"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { type AppRole, getSessionAuthKey } from "@/lib/siteAuth";

type LoginFormProps = {
  role: AppRole;
  onSuccess?: () => void;
};

const roleLabels: Record<AppRole, string> = {
  sender: "відправника",
  receiver: "отримувача",
};

export function LoginForm({ role, onSuccess }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || (role === "receiver" ? "/receiver" : "/");

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
        body: JSON.stringify({ password, role }),
      });

      const result = (await response.json()) as { ok?: boolean };

      if (!response.ok || result.ok !== true) {
        setError("Неправильний пароль");
        return;
      }

      sessionStorage.setItem(getSessionAuthKey(role), "1");

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
    <AppShell title="Вхід" subtitle={`Введи пароль для ${roleLabels[role]}`}>
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
          className="w-full rounded-xl border px-4 py-3 text-center outline-none transition"
          style={{
            color: "var(--text)",
            backgroundColor: "var(--input-bg)",
            borderColor: "var(--input-border)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--input-focus-border)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--input-border)";
          }}
        />

        {error && (
          <p className="text-center text-sm font-medium text-red-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="rounded-xl px-4 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            backgroundColor: "var(--btn-submit-bg)",
            color: "var(--btn-submit-text)",
          }}
          onMouseEnter={(e) => {
            if (!loading && password) {
              e.currentTarget.style.backgroundColor = "var(--btn-submit-hover)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--btn-submit-bg)";
          }}
        >
          {loading ? "Перевірка…" : "Увійти"}
        </button>
      </form>
    </AppShell>
  );
}
