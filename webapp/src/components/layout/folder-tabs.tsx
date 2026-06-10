"use client";

import { useState, type ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FolderTab = {
  key: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
};

export function FolderTabs({
  tabs,
  defaultTab,
}: {
  tabs: FolderTab[];
  defaultTab?: string;
}) {
  const [active, setActive] = useState<string>(defaultTab ?? tabs[0]?.key ?? "");
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div>
      {/* モバイル: セレクトボックス */}
      <div className="sm:hidden mb-3">
        <Select value={active} onValueChange={(v) => v && setActive(v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((t) => (
              <SelectItem key={t.key} value={t.key}>
                <span className="flex items-center gap-2">{t.icon}{t.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* タブレット以上: フォルダタブ風 */}
      <div className="hidden sm:flex items-end gap-1 px-2 -mb-px relative z-10 overflow-x-auto scrollbar-none">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`inline-flex items-center gap-2 px-3 md:px-4 pt-2.5 pb-3 text-sm rounded-t-lg border border-b-0 whitespace-nowrap transition ${
                isActive
                  ? "bg-card text-foreground border-border font-medium"
                  : "bg-muted/40 text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="bg-card border rounded-lg sm:rounded-tl-none shadow-sm">
        {current?.content}
      </div>
    </div>
  );
}
