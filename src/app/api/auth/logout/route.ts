import { NextResponse } from "next/server";

const SESSION_COOKIE = "astrowave_session";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out", data: null });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
