import type { ReactNode } from "react";

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 pt-16 sm:p-6 sm:pt-20">
      <div
        className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border p-6 shadow-2xl backdrop-blur-sm sm:p-8"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--card-border)",
          boxShadow: `0 25px 50px -12px var(--card-shadow)`,
        }}
      >
        {(title || subtitle) && (
          <header className="text-center">
            {title && (
              <h1
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
                style={{ color: "var(--text)" }}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--muted)" }}>
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </main>
  );
}
