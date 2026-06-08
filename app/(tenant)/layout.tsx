import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import TenantAuthGuard from "./TenantAuthGuard";
import { DesktopGuard } from "@/components/DesktopGuard";

export const metadata: Metadata = {
  title: "MedCloud | Your Hospital in the Cloud",
  description:
    "A hospital management system that organzies different departments or units in a hospital and manages their operations distinctively while contributing to the fast and efficient operation in hospitals worldwide",
};

export default async function TenantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const slug = (await headers()).get("x-tenant-slug");
  if (!slug) notFound();

  return (
    <TenantAuthGuard>
      <DesktopGuard>{children}</DesktopGuard>
    </TenantAuthGuard>
  );
}
