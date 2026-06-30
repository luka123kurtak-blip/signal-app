"use client";

import { useEffect, useState } from "react";
import { useSignalSocket } from "@/lib/useSignalSocket";
import { buttonStyle, rolePageStyle } from "@/lib/ui";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { RoleSwitcher } from "@/components/RoleSwitcher";

export default function SenderPage() {
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
    return <div style={rolePageStyle} />;
  }

  return (
    <div style={rolePageStyle}>
      <ConnectionStatus connected={connected} />
      <RoleSwitcher current="sender" />
      <button
        type="button"
        onClick={sendSignal}
        disabled={!connected}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setTimeout(() => setPressed(false), 200)}
        onPointerLeave={() => setPressed(false)}
        style={{
          ...buttonStyle(pressed),
          opacity: connected ? 1 : 0.5,
          cursor: connected ? "pointer" : "not-allowed",
        }}
      >
        Play sound
      </button>
    </div>
  );
}
