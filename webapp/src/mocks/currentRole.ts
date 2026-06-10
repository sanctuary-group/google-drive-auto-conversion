"use client";

import { useEffect, useState } from "react";
import type { Role } from "./types";

const KEY = "ledger-webapp-role";

export const ROLE_LABELS: Record<Role, string> = {
  master: "マスター管理 (サンクチュアリ / 先方)",
  manager: "会社マネージャー",
  user: "ユーザー",
};

export const DEFAULT_ROLE: Role = "master";

// ロールごとの初期画面(ロール切替時にここへリダイレクト)
export const ROLE_HOME: Record<Role, string> = {
  master: "/admin/tenants",
  manager: "/app/dashboard",
  user: "/app/dashboard",
};

export function useCurrentRole() {
  const [role, setRoleState] = useState<Role>(DEFAULT_ROLE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
    if (stored && (Object.keys(ROLE_LABELS) as Role[]).includes(stored as Role)) {
      setRoleState(stored as Role);
    }
    setMounted(true);
  }, []);

  const setRole = (next: Role) => {
    setRoleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, next);
      // 切替時にそのロールのホーム画面へ遷移(モック簡略化)
      window.location.href = ROLE_HOME[next];
    }
  };

  return { role, setRole, mounted };
}

export function readRoleSync(): Role {
  if (typeof window === "undefined") return DEFAULT_ROLE;
  const stored = window.localStorage.getItem(KEY);
  if (stored && (Object.keys(ROLE_LABELS) as Role[]).includes(stored as Role)) {
    return stored as Role;
  }
  return DEFAULT_ROLE;
}
