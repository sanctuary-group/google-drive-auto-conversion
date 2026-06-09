"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Briefcase,
  Building2,
  CreditCard,
  LayoutDashboard,
  Settings,
  Table,
  Upload,
  Users,
  Receipt,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { cn } from "@/lib/utils";
import { filterNavByRole, type NavSection } from "@/lib/nav";
import { useCurrentRole } from "@/mocks/currentRole";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;
const ICONS: Record<string, IconCmp> = {
  Building2,
  Briefcase,
  Users,
  CreditCard,
  Activity,
  Settings,
  LayoutDashboard,
  Table,
  Upload,
};

export function Sidebar({
  sections,
  title,
}: {
  sections: NavSection[];
  title: string;
}) {
  const pathname = usePathname();
  const { role, mounted } = useCurrentRole();
  if (!mounted) return <aside className="w-64 border-r bg-sidebar" />;
  const visible = filterNavByRole(sections, role);
  return (
    <aside className="w-64 shrink-0 border-r bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="px-5 h-14 flex items-center gap-2 border-b">
        <span className="inline-flex size-7 rounded-lg bg-primary text-primary-foreground items-center justify-center">
          <Receipt className="size-4" />
        </span>
        <span className="font-semibold text-sm">{title}</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {visible.map((s) => (
          <div key={s.title}>
            <div className="px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
              {s.title}
            </div>
            <ul className="space-y-0.5">
              {s.items.map((item) => {
                const Icon = ICONS[item.icon] ?? LayoutDashboard;
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 mx-1 px-3 py-2 rounded-md text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "hover:bg-sidebar-accent/60 text-sidebar-foreground/80",
                      )}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t p-3 text-[11px] text-muted-foreground">
        Ledger SaaS · モック v0.1
      </div>
    </aside>
  );
}
