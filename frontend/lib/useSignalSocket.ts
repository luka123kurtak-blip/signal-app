"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getSocketUrl } from "@/lib/ui";

type Role = "sender" | "receiver";

export function useSignalSocket(role: Role) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(getSocketUrl(), {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
    });
    socketRef.current = socket;

    const joinRole = () => {
      socket.emit(role === "sender" ? "join-sender" : "join-receiver");
    };

    socket.on("connect", () => {
      setConnected(true);
      joinRole();
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.io.on("reconnect", joinRole);

    return () => {
      socket.io.off("reconnect", joinRole);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [role]);

  return { socketRef, connected };
}
