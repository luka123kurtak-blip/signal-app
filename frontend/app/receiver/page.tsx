"use client";

import { useEffect, useRef, useState } from "react";
import { playBeep } from "@/lib/audio";
import { useSignalSocket } from "@/lib/useSignalSocket";
import { buttonStyle, rolePageStyle } from "@/lib/ui";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { RoleSwitcher } from "@/components/RoleSwitcher";

export default function ReceiverPage() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const readyRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { socketRef, connected } = useSignalSocket("receiver");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const onPlaySound = () => {
      const ctx = audioContextRef.current;
      if (!ctx || !readyRef.current) return;
      playBeep(ctx);
    };

    socket.on("play-sound", onPlaySound);
    return () => {
      socket.off("play-sound", onPlaySound);
    };
  }, [socketRef, connected]);

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
      <ConnectionStatus connected={connected} />
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
