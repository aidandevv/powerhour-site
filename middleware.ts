import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DOCS_HOST = "docs.powerhour.dev";

function isAssetPath(pathname: string) {
  return /\.[a-z0-9]+$/i.test(pathname);
}

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const pathname = request.nextUrl.pathname;

  if (hostname !== DOCS_HOST) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/docs") ||
    pathname.startsWith("/walkthrough") ||
    pathname.startsWith("/faq") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    isAssetPath(pathname)
  ) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/docs";

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/:path*"],
};
