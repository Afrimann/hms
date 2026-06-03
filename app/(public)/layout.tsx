import Header from "@/features/onboarding/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CrownHealth",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {children}
    </div>
  );
}
