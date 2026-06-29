"use client";

import { useEffect, useState } from "react";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { pageStyle } from "@/lib/ui";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={pageStyle} />;
  }

  return (
    <div style={{ ...pageStyle, flexDirection: "column", gap: 24, padding: 24 }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>Signal App</h1>
      <p style={{ margin: 0, color: "#666", textAlign: "center" }}>
        Оберіть роль
      </p>
      <RoleSwitcher />
    </div>
  );
}
