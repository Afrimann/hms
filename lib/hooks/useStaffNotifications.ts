"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/store/auth.store";
import { getEchoClient, disconnectEcho } from "@/lib/echo";

export type StaffInviteStatusPayload = {
  staff_id: number;
  staff_name: string;
  staff_email: string;
  status: "accepted" | "rejected";
  timestamp: string;
  triggered_by: { id: number; name: string };
};

type UseStaffInviteStatusOptions = {
  onStatusChanged: (payload: StaffInviteStatusPayload) => void;
};

/**
 * Subscribes to the private tenant.{hospital_id}.staff channel and fires
 * onStatusChanged whenever a staff member accepts or rejects an invite.
 *
 * Safe to mount in any component — unsubscribes on unmount.
 */
export function useStaffInviteStatus({
  onStatusChanged,
}: UseStaffInviteStatusOptions) {
  const token = useAuthStore((s) => s.token);
  const tenantId = useAuthStore((s) => s.tenant?.id);

  // Keep callback ref stable so the effect doesn't re-subscribe on every render
  const callbackRef = useRef(onStatusChanged);
  useEffect(() => {
    callbackRef.current = onStatusChanged;
  });

  useEffect(() => {
    console.log("[Reverb] token:", !!token, "tenantId:", tenantId);
    if (!token || !tenantId) return;

    const channelName = `tenant.${tenantId}.notifications`;
    let unsubscribed = false;

    getEchoClient(token).then((echo) => {
      if (unsubscribed) return;

      console.log("[Reverb] subscribing to channel:", channelName);

      echo
        .private(channelName)
        .listen(
          ".staff.invite.status.changed",
          (payload: StaffInviteStatusPayload) => {
            console.log("[Reverb] event received:", payload);
            callbackRef.current(payload);
          },
        );

      // Log subscription state
      const channel = echo.connector.channels[`private-${channelName}`];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("[Reverb] channel state:", (channel as any)?.subscription?.state);
    });

    return () => {
      unsubscribed = true;
      getEchoClient(token).then((echo) => {
        echo.leave(channelName);
      });
    };
  }, [token, tenantId]);
}

/**
 * Disconnect the Echo connection entirely (call on logout).
 */
export { disconnectEcho };
