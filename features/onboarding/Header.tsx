import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#f5f5f5] px-8 py-4 flex items-center justify-between">
      <span className="font-bold text-sm tracking-wide uppercase text-primary">PHMS</span>
      <nav className="flex items-center gap-6 text-sm text-gray-600">
        <Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
        <Link href="/terms-of-service" className="hover:text-gray-900">Terms of Service</Link>
        <Link href="/support" className="hover:text-gray-900">Support</Link>
      </nav>
    </header>
  );
}
