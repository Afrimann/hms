import type { Metadata } from "next";
import TenantAuthGuard from "./TenantAuthGuard";

export const metadata: Metadata = {
  title: "MedCloud | Your Hospital in the Cloud",
  description:
    "A hospital management system that organzies different departments or units in a hospital and manages their operations distinctively while contributing to the fast and efficient operation in hospitals worldwide",
};

export default function TenantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TenantAuthGuard>{children}</TenantAuthGuard>;
}
