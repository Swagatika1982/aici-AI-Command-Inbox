"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Zap,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inbox Intelligence", href: "/inbox", icon: Inbox },
  { label: "Command Center", href: "/commands", icon: Zap },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function AiciSidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-72 border-r border-slate-800 bg-slate-950 px-5 py-6">
      <div className="mb-8 flex justify-center">
        <Image
          src="/AICI-Logo-bgBlue.png"
          alt="AICI Logo"
          width={230}
          height={200}
          priority
          className="object-contain"
        />
      </div>

      <div className="mb-6 border-b border-slate-800" />

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
        <p className="text-sm font-semibold text-cyan-300">AI Status</p>
        <p className="mt-1 text-xs text-slate-400">
          Command engine ready
        </p>
      </div>
    </aside>
  );
}