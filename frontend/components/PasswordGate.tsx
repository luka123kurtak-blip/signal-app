"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { getRoleFromPath, getSessionAuthKey } from "@/lib/siteAuth";

function PasswordGateInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const role = getRoleFromPath(pathname);
  const authKey = getSessionAuthKey(role);
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(authKey) === "1");
  }, [authKey]);

  if (authed === null) {
    return <main className="min-h-screen" />;
  }

  if (!authed) {
    return (
      <LoginForm
        role={role}
        onSuccess={() => {
          sessionStorage.setItem(authKey, "1");
          setAuthed(true);
        }}
      />
    );
  }

  return children;
}

function PasswordGateKeyed({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const authKey = getSessionAuthKey(getRoleFromPath(pathname));

  return (
    <PasswordGateInner key={authKey}>{children}</PasswordGateInner>
  );
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <PasswordGateKeyed>{children}</PasswordGateKeyed>
    </Suspense>
  );
}
