"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { playBeep } from "@/lib/audio";
import { buttonStyle, getSocketUrl, rolePageStyle } from "@/lib/ui";
import { RoleSwitcher } from "@/components/RoleSwitcher";

export default function ReceiverPage() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const readyRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    setMounted(true);

    const socket = io(getSocketUrl(), {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      socket.emit("join-receiver");
    });

    socket.on("play-sound", () => {
      const ctx = audioContextRef.current;
      if (!ctx || !readyRef.current) return;
      playBeep(ctx);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function enableSound() {
    setPressed(true);

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      await audioContextRef.current.resume();
      readyRef.current = true;
    } catch {
      readyRef.current = false;
    }

    setTimeout(() => setPressed(false), 200);
  }

  if (!mounted) {
    return <div style={rolePageStyle} />;
  }

  return (
    <div style={rolePageStyle}>
      <RoleSwitcher current="receiver" />
      <button
        type="button"
        onClick={enableSound}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setTimeout(() => setPressed(false), 200)}
        onPointerLeave={() => setPressed(false)}
        style={buttonStyle(pressed, "#9b59b6", "#7d3c98")}
      >
        Play sound
      </button>
    </div>
  );
}
