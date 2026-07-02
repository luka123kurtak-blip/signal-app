import { NextResponse } from "next/server";
import type { AppRole } from "@/lib/siteAuth";

function getExpectedPassword(role: AppRole): string | undefined {
  if (role === "receiver") {
    return process.env.RECEIVER_PASSWORD?.trim();
  }

  return process.env.SENDER_PASSWORD?.trim() || process.env.SITE_PASSWORD?.trim();
}

export async function POST(request: Request) {
  let password = "";
  let role: AppRole = "sender";

  try {
    const body = (await request.json()) as { password?: string; role?: string };
    password = body.password?.trim() ?? "";
    role = body.role === "receiver" ? "receiver" : "sender";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expectedPassword = getExpectedPassword(role);
  if (!expectedPassword) {
    return NextResponse.json({ ok: true });
  }

  if (password !== expectedPassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
