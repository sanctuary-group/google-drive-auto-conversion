"use client";

import { Bell, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RoleSwitcher } from "./role-switcher";
import { useCurrentRole } from "@/mocks/currentRole";
import { unreadCount } from "@/mocks/notifications";
import Link from "next/link";

const ROLE_USER: Record<string, { name: string; email: string }> = {
  master: { name: "山本 智也", email: "yamamoto@sky.example" },
  manager: { name: "竹下 直樹", email: "takeshita@sky.example" },
  user: { name: "永田 晶子", email: "nagata@sky.example" },
};

export function Header({
  title,
  leading,
}: {
  title?: string;
  leading?: React.ReactNode;
}) {
  const { role, mounted } = useCurrentRole();
  const u = mounted ? ROLE_USER[role] : ROLE_USER.master;
  const initials = u.name.slice(0, 1);
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-3 sm:px-4 lg:px-6 gap-2 sm:gap-3 shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        {leading}
        <div className="text-sm font-medium text-muted-foreground truncate hidden sm:block">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-3">
        <RoleSwitcher />
        <Button asChild variant="ghost" size="icon" className="size-8 relative">
          <Link href="/app/notifications" title="通知">
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 size-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-medium inline-flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </Button>
        <div className="flex items-center gap-2 sm:pl-3 sm:border-l">
          <Avatar className="size-7">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="hidden xl:block text-xs leading-tight">
            <div className="font-medium">{u.name}</div>
            <div className="text-muted-foreground">{u.email}</div>
          </div>
          <Button asChild variant="ghost" size="icon" className="size-8" title="ログアウト">
            <Link href="/login">
              <LogOut className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
