import { NextResponse } from "next/server";
import type { AppRole } from "@/lib/siteAuth";
import { getRolePassword } from "@/lib/rolePasswords";

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

  if (password !== getRolePassword(role)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
