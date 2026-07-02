"use client";

import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { SignalButton } from "@/components/SignalButton";
import { playBeep } from "@/lib/audio";
import { useSignalSocket } from "@/lib/useSignalSocket";

export default function ReceiverPage() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const readyRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [soundReady, setSoundReady] = useState(false);
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
      setSoundReady(true);
    } catch {
      readyRef.current = false;
      setSoundReady(false);
    }

    setTimeout(() => setPressed(false), 200);
  }

  if (!mounted) {
    return <main className="min-h-screen" />;
  }

  return (
    <AppShell title="Отримувач">
      <ConnectionStatus connected={connected} />
      <SignalButton
        variant="receiver"
        pressed={pressed}
        disabled={soundReady}
        onClick={enableSound}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setTimeout(() => setPressed(false), 200)}
        onPointerLeave={() => setPressed(false)}
      />
    </AppShell>
  );
}
