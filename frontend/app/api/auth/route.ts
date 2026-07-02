import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const sitePassword = process.env.SITE_PASSWORD?.trim();
  if (!sitePassword) {
    return NextResponse.json({ ok: true });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password?.trim() ?? "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (password !== sitePassword) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
