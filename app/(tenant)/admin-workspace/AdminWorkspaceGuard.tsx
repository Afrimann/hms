"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth.store";

export default function AdminWorkspaceGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hasRole = useAuthStore((s) => s.hasRole);
  const token = useAuthStore((s) => s.token);

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
