"use client";

import { Suspense, useEffect, useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { SESSION_AUTH_KEY } from "@/lib/siteAuth";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_AUTH_KEY) === "1");
  }, []);

  if (authed === null) {
    return <main className="min-h-screen" />;
  }

  if (!authed) {
    return (
      <Suspense fallback={<main className="min-h-screen" />}>
        <LoginForm onSuccess={() => setAuthed(true)} />
      </Suspense>
    );
  }

  return children;
}
