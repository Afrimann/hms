"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUser,
  Building2,
  CircleDollarSign,
  Settings,
  LucideHome
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin-workspace/dashboard", icon: LucideHome },
  { label: "Staff", href: "/admin-workspace/staff", icon: CircleUser },
  { label: "Department", href: "/admin-workspace/department", icon: Building2 },
  { label: "Finance", href: "/admin-workspace/finance", icon: CircleDollarSign },
  { label: "Patients", href: "/admin-workspace/patients", icon: CircleUser },
  {label: "Appointments", href: "/admin-workspace/appointments", icon: CircleUser },
  {label: "Inventory", href: "/admin-workspace/inventory", icon: CircleUser },
  {label: "Reports", href: "/admin-workspace/reports", icon: CircleUser },
  {label: "Billing", href: "/admin-workspace/billing", icon: CircleDollarSign },
  {label: "Notifications", href: "/admin-workspace/notifications", icon: CircleUser },
  { label: "System settings", href: "/admin-workspace/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-50 min-h-screen bg-[#F5F5F5] border-r border-[#BFBFBF] flex flex-col shrink-0">
      {/* Brand — no track here */}
      <div className="flex items-center px-6 h-18 border-b border-[#BFBFBF] shrink-0">
        <span className="text-[#2E4EEA] font-bold text-xl tracking-tight">PHMS</span>
      </div>
      <div className="relative flex-1 pt-4">
        <nav className="flex flex-col">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <div key={href} className="relative">
                {isActive && (
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 h-9 w-1 bg-[#2E4EEA] rounded-r-full" />
                )}
                <Link
                  href={href}
                  className={`flex items-center gap-3 pl-11 pr-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "text-[#2E4EEA] font-medium"
                      : "text-[#595959] hover:text-[#2E4EEA]"
                  }`}
                >
                  <Icon size={18} fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 0 : 1.8} />
                  <span>{label}</span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
