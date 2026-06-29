"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { buttonStyle, getSocketUrl, rolePageStyle } from "@/lib/ui";
import { RoleSwitcher } from "@/components/RoleSwitcher";

export default function SenderPage() {
  const socketRef = useRef<Socket | null>(null);
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setMounted(true);

    const socket = io(getSocketUrl(), {
      transports: ["websocket", "polling"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join-sender");
    });

    return () => {
      socket.disconnect();
    };
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
      <RoleSwitcher current="sender" />
      <button
        type="button"
        onClick={sendSignal}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setTimeout(() => setPressed(false), 200)}
        onPointerLeave={() => setPressed(false)}
        style={buttonStyle(pressed)}
      >
        Play sound
      </button>
    </div>
  );
}
