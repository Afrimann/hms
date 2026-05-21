import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MedCloud | See your hospital operations in one place",
  description:
    "A hospital management system that organzies different departments or units in a hospital and manages their operations distinctively while contributing to the fast and efficient operation in hospitals worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}</div>
  );
}
