import { NextRequest, NextResponse } from "next/server";

// Domains whose first label is NOT a tenant slug
const ROOT_DOMAINS = ["phms.tech", "localhost", "lvh.me", "localtest.me"];
const PUBLIC_PATHS = ["/register", "/onboarding", "/privacy-policy", "/terms-of-service", "/support"];

function extractTenantSlug(hostname: string): string | null {
  // Strip port if present (e.g. lvh.me:3000)
  const host = hostname.split(":")[0];

  const isRootDomain = ROOT_DOMAINS.some(
    (d) => host === d || host === `www.${d}`
  );
  if (isRootDomain) return null;

  const isSubdomain = ROOT_DOMAINS.some((d) => host.endsWith(`.${d}`));
  if (!isSubdomain) return null;

  // "omotosho-health-centre.phms.tech" → "omotosho-health-centre"
  return host.split(".")[0];
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") ?? request.nextUrl.hostname;
  const slug = extractTenantSlug(hostname);

  console.log(`[middleware] host=${hostname} path=${pathname} slug=${slug ?? "none"}`);

  // Non-tenant request — let it pass through as normal
  if (!slug) return NextResponse.next();

  // Tenant subdomain hit a public path — redirect to the root domain
  const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
  if (isPublicPath) {
    const rootUrl = request.nextUrl.clone();
    rootUrl.host = hostname.split(".").slice(1).join(".");
    rootUrl.pathname = "/";
    return NextResponse.redirect(rootUrl);
  }

  // Forward the slug on the *request* headers so server components can read it via headers()
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-slug", slug);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    // Run on all paths except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
