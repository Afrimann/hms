"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth.store";

const AUTH_PATHS = ["/login", "/forgot-password", "/reset-password", "/staff/invite/accept"];

export default function TenantAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);
  const hasRole = useAuthStore((s) => s.hasRole);

  // Zustand persist hydrates from localStorage after first render.
  // Block rendering until hydration is done so the guard has the real token value.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

    if (!token && !isAuthPath) {
      router.replace("/login");
      return;
    }

    // Redirect already-authenticated users away from auth pages
    if (token && isAuthPath) {
      const destination = hasRole("hospital_admin")
        ? "/admin-workspace/dashboard"
        : "/dashboard";
      router.replace(destination);
    }
  }, [hydrated, token, pathname, hasRole, router]);

  // During hydration show nothing to prevent a flash of protected content
  if (!hydrated) return null;

  // Unauthenticated on a protected route — render nothing while redirecting
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));
  if (!token && !isAuthPath) return null;

  return <>{children}</>;
}
