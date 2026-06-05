import type Echo from "laravel-echo";

declare global {
  interface Window {
    // pusher-js must be on window before laravel-echo initialises
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Pusher: any;
  }
}

let echoInstance: Echo<"reverb"> | null = null;
let activeToken: string | null = null;

const FRONTEND_TENANT_DOMAINS = ["phms.tech", "lvh.me", "localtest.me"];

function buildAuthEndpoint(): string {
  if (typeof window === "undefined") {
    const fallback = process.env.NEXT_PUBLIC_REVERB_HOST ?? "api.phms.tech";
    return `https://${fallback}/api/broadcasting/auth`;
  }

  const hostname = window.location.hostname;
  const isTenantSubdomain = FRONTEND_TENANT_DOMAINS.some((d) =>
    hostname.endsWith(`.${d}`)
  );

  if (isTenantSubdomain) {
    // Mirror api-client.ts: slug from hostname, always route to phms.tech
    const slug = hostname.split(".")[0];
    return `https://${slug}.phms.tech/api/broadcasting/auth`;
  }

  const fallback = process.env.NEXT_PUBLIC_REVERB_HOST ?? "api.phms.tech";
  return `https://${fallback}/api/broadcasting/auth`;
}

export async function getEchoClient(token: string): Promise<Echo<"reverb">> {
  if (echoInstance && activeToken === token) return echoInstance;

  // Clean up any stale connection (e.g. token refreshed)
  echoInstance?.disconnect();

  // Dynamic import keeps pusher-js out of the SSR bundle
  const [{ default: EchoClass }, { default: Pusher }] = await Promise.all([
    import("laravel-echo"),
    import("pusher-js"),
  ]);

  window.Pusher = Pusher;

  echoInstance = new EchoClass({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY!,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST ?? "api.phms.tech",
    wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT ?? 443),
    wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT ?? 443),
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
    authEndpoint: buildAuthEndpoint(),
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  activeToken = token;
  return echoInstance;
}

export function disconnectEcho(): void {
  echoInstance?.disconnect();
  echoInstance = null;
  activeToken = null;
}
