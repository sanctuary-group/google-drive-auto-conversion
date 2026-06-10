"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar, SidebarContent } from "./sidebar";
import { Header } from "./header";
import type { NavSection } from "@/lib/nav";

export function AppShell({
  sections,
  sidebarTitle,
  headerTitle,
  children,
}: {
  sections: NavSection[];
  sidebarTitle: string;
  headerTitle: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar sections={sections} title={sidebarTitle} />

      {/* モバイル: オフキャンバスサイドバー */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0 lg:hidden">
          <SidebarContent
            sections={sections}
            title={sidebarTitle}
            onNavigate={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={headerTitle}
          leading={
            <Button
              variant="ghost"
              size="icon"
              className="size-8 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="メニュー"
            >
              <Menu className="size-4" />
            </Button>
          }
        />
        {children}
      </div>
    </div>
  );
}
