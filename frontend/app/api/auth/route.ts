import { NextResponse } from "next/server";
import type { AppRole } from "@/lib/siteAuth";

function normalizeEnvPassword(value: string | undefined): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function getExpectedPassword(role: AppRole): string | undefined {
  if (role === "receiver") {
    return normalizeEnvPassword(process.env.RECEIVER_PASSWORD);
  }

  return normalizeEnvPassword(process.env.SENDER_PASSWORD);
}

export async function POST(request: Request) {
  let password = "";
  let role: AppRole = "sender";

  try {
    const body = (await request.json()) as { password?: string; role?: string };
    password = body.password ?? "";
    role = body.role === "receiver" ? "receiver" : "sender";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expectedPassword = getExpectedPassword(role);
  if (!expectedPassword) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  if (password !== expectedPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
