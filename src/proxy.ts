import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROOT_DOMAIN = "mpturai.lt";

export function proxy(request: NextRequest) {
  const hostname = (request.headers.get("host") ?? "")
    .split(":")[0]
    .toLowerCase();

  const isRootHost =
    hostname === ROOT_DOMAIN ||
    hostname === `www.${ROOT_DOMAIN}` ||
    hostname === "localhost" ||
    hostname.endsWith(".vercel.app");

  if (isRootHost || !hostname.endsWith(`.${ROOT_DOMAIN}`)) {
    return NextResponse.next();
  }

  const subdomain = hostname.slice(0, -(ROOT_DOMAIN.length + 1));
  const url = request.nextUrl.clone();
  url.pathname = `/client/${subdomain}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo-beige.png|sitemap.xml|robots.txt).*)",
  ],
};
