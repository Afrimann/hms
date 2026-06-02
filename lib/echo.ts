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

function buildAuthEndpoint(): string {
  // Broadcast auth is tenant-scoped: {slug}.phms.tech/broadcasting/auth
  // The slug comes from the current subdomain, same as api-client.ts
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const slug = hostname.split(".")[0];
  const host = process.env.NEXT_PUBLIC_REVERB_HOST ?? "api.phms.tech";

  // On root domain / localhost fall back to the generic API host
  const isTenantSubdomain = hostname.includes(".");
  const authHost = isTenantSubdomain ? `${slug}.${host}` : host;

  return `https://${authHost}/broadcasting/auth`;
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
