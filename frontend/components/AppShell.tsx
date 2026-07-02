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
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-white/10 bg-slate-800/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
        {(title || subtitle) && (
          <header className="text-center">
            {title && (
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-sm text-slate-400 sm:text-base">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </main>
  );
}
