import type { NextConfig } from "next";
import path from "path";

function getAllowedDevOrigins(): string[] {
  const fromEnv =
    process.env.DEV_ALLOWED_ORIGINS?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) ?? [];

  const defaults = [
    "localhost",
    "127.0.0.1",
    "localhost:3000",
    "127.0.0.1:3000",
    "192.168.3.4",
    "192.168.3.4:3000",
    "192.168.31.55",
    "192.168.31.55:3000",
  ];

  return [...new Set([...defaults, ...fromEnv])];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getAllowedDevOrigins(),
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
