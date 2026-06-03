"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth.store";

const ROUTE_TITLES: Record<string, string> = {
  "/admin-workspace/dashboard": "Overview",
  "/admin-workspace/staff": "Manage Staff",
  "/admin-workspace/department": "Department",
  "/admin-workspace/finance": "Finance",
  "/admin-workspace/settings": "System Settings",
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export default function Header() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  const title =
    Object.entries(ROUTE_TITLES).find(([route]) =>
      pathname === route || pathname.startsWith(route + "/")
    )?.[1] ?? "Overview";

  const initials = user
    ? getInitials(user.first_name, user.last_name)
    : "??";

  return (
    <header className="flex items-center justify-between px-6 h-18 bg-[#F5F5F5] border-b border-[#BFBFBF] shrink-0">
      <h1 className="text-base font-bold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-[#BFBFBF] rounded-lg px-3 py-2 w-64">
          <Search size={15} className="text-[#595959] shrink-0" />
          <input
            type="text"
            placeholder="Search for something"
            className="text-sm text-gray-700 placeholder:text-[#595959] outline-none bg-transparent w-full"
          />
        </div>

        {/* Bell */}
        <button className="relative text-[#595959] hover:text-gray-700 transition-colors">
          <Bell size={20} strokeWidth={1.8} />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-[#2E4EEA] flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-semibold">{initials}</span>
        </div>
      </div>
    </header>
  );
}
