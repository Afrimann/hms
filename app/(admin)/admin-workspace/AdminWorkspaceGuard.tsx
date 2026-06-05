"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/auth.store";
import { useProfile } from "@/lib/hooks/useAuth";
import { useStaffInviteStatus } from "@/lib/hooks/useStaffNotifications";

export default function AdminWorkspaceGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hasRole = useAuthStore((s) => s.hasRole);
  const token = useAuthStore((s) => s.token);

  useProfile();

  const queryClient = useQueryClient();
  useStaffInviteStatus({
    onStatusChanged: (payload) => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      if (payload.status === "accepted") {
        toast.success(`${payload.staff_name} accepted the invitation`);
      } else {
        toast.error(`${payload.staff_name} declined the invitation`);
      }
    },
  });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!token) {
      router.replace("/login");
      return;
    }

    if (!hasRole("hospital_admin")) {
      router.replace("/dashboard");
    }
  }, [hydrated, token, hasRole, router]);

  if (!hydrated) return null;

  if (!token || !hasRole("hospital_admin")) return null;

  return <>{children}</>;
}
