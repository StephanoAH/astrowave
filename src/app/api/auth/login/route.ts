import { NextResponse } from "next/server";
import { login } from "@/lib/data/services/auth";

const SESSION_COOKIE = "astrowave_session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "");
  const password = String(body.password ?? "");

  const result = await login(email, password);
  if (!result.success) {
    return NextResponse.json(result, { status: 401 });
  }

  const res = NextResponse.json(result);
  res.cookies.set(SESSION_COOKIE, result.data.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
