"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { missionNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { getAppName } from "@/lib/data/client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const groups = ["Operations", "RF", "Data", "System"] as const;

export function MissionSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-[rgba(5,8,16,0.95)]">
      <div className="border-b border-white/10 p-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400/90">{getAppName()}</p>
        <p className="mt-1 text-[10px] font-mono uppercase text-slate-500">Mission Control</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group} className="mb-4">
            <p className="mb-2 px-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">
              {group}
            </p>
            <ul className="space-y-0.5">
              {missionNav
                .filter((n) => n.group === group)
                .map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition",
                          active
                            ? "bg-cyan-500/10 text-cyan-100 shadow-[inset_2px_0_0_#22d3ee]"
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 opacity-80" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
