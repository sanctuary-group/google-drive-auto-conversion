"use client";

import { ROLE_LABELS, useCurrentRole } from "@/mocks/currentRole";
import type { Role } from "@/mocks/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RoleSwitcher() {
  const { role, setRole, mounted } = useCurrentRole();
  if (!mounted) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground hidden md:inline">モックロール</span>
      <Select value={role} onValueChange={(v) => setRole(v as Role)}>
        <SelectTrigger className="h-8 w-[200px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
            <SelectItem key={r} value={r} className="text-xs">
              {ROLE_LABELS[r]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
