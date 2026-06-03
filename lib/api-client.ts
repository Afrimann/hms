// Frontend subdomains that signal we're on a tenant workspace.
// The API always lives on phms.tech regardless of which frontend domain is used.
const FRONTEND_TENANT_DOMAINS = ["phms.tech", "localhost", "lvh.me", "localtest.me"] as const;
const API_BASE = "https://api.phms.tech";

function buildBaseUrl(): string {
  // Server-side: no window available, use the static env var.
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL ?? API_BASE;
  }

  const hostname = window.location.hostname;
  const isTenantSubdomain = FRONTEND_TENANT_DOMAINS.some((d) =>
    hostname.endsWith(`.${d}`)
  );

  if (!isTenantSubdomain) {
    // Root domain / localhost — public routes (registration, onboarding)
    return process.env.NEXT_PUBLIC_API_URL ?? API_BASE;
  }

  // Extract slug from whatever frontend domain is in use:
  //   omotosho-health-centre.lvh.me      → omotosho-health-centre
  //   omotosho-health-centre.phms.tech   → omotosho-health-centre
  const slug = hostname.split(".")[0];

  // Tenant API lives at {slug}.phms.tech/api/...
  return `https://${slug}.phms.tech`;
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public errors: unknown = null
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(
  path: string,
  { body, token, headers, ...init }: RequestOptions = {}
): Promise<T> {
  const baseUrl = buildBaseUrl();

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(res.status, json.message ?? "Request failed", json.errors);
  }

  return json as T;
}
