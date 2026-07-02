"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { SignalButton } from "@/components/SignalButton";
import { useSignalSocket } from "@/lib/useSignalSocket";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { socketRef, connected } = useSignalSocket("sender");

  useEffect(() => {
    setMounted(true);
  }, []);

  function sendSignal() {
    setPressed(true);
    socketRef.current?.emit("ring");
    setTimeout(() => setPressed(false), 200);
  }

  if (!mounted) {
    return <main className="min-h-screen" />;
  }

  return (
    <AppShell title="Відправник">
      <ConnectionStatus connected={connected} />
      <SignalButton
        variant="sender"
        pressed={pressed}
        disabled={!connected}
        onClick={sendSignal}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setTimeout(() => setPressed(false), 200)}
        onPointerLeave={() => setPressed(false)}
      />
    </AppShell>
  );
}
