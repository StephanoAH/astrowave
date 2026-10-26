import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "astrowave_session";

const protectedPrefixes = [
  "/dashboard",
  "/satellites",
  "/orbital-tracking",
  "/passes",
  "/frequencies",
  "/transmitters",
  "/antennas",
  "/sdr",
  "/spectrum",
  "/signals",
  "/doppler",
  "/telemetry",
  "/recordings",
  "/observations",
  "/settings",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  if (!session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("from", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/satellites/:path*",
    "/orbital-tracking/:path*",
    "/passes/:path*",
    "/frequencies/:path*",
    "/transmitters/:path*",
    "/antennas/:path*",
    "/sdr/:path*",
    "/spectrum/:path*",
    "/signals/:path*",
    "/doppler/:path*",
    "/telemetry/:path*",
    "/recordings/:path*",
    "/observations/:path*",
    "/settings/:path*",
  ],
};
