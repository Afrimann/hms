"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/store/auth.store";
import { getEchoClient, disconnectEcho } from "@/lib/echo";

// Shape of the payload the backend sends on staff.invite.status.changed
export type StaffInviteStatusPayload = {
  staff_id: number;
  staff_name: string;
  status: "accepted" | "rejected";
  message?: string;
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
  const hospitalId = useAuthStore((s) => s.hospital?.id);

  // Keep callback ref stable so the effect doesn't re-subscribe on every render
  const callbackRef = useRef(onStatusChanged);
  useEffect(() => {
    callbackRef.current = onStatusChanged;
  });

  useEffect(() => {
    if (!token || !hospitalId) return;

    const channelName = `tenant.${hospitalId}.staff`;
    let unsubscribed = false;

    getEchoClient(token).then((echo) => {
      if (unsubscribed) return;

      echo
        .private(channelName)
        // Leading dot tells Echo the event name is already fully-qualified
        // (no Laravel namespace prefix). Remove the dot if the backend omits it.
        .listen(
          ".staff.invite.status.changed",
          (payload: StaffInviteStatusPayload) => {
            callbackRef.current(payload);
          },
        );
    });

    return () => {
      unsubscribed = true;
      // Import is already cached — this is just to call leave()
      getEchoClient(token).then((echo) => {
        echo.leave(channelName);
      });
    };
  }, [token, hospitalId]);
}

/**
 * Disconnect the Echo connection entirely (call on logout).
 */
export { disconnectEcho };
