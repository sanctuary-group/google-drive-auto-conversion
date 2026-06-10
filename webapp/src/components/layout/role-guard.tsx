"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ROLE_HOME, useCurrentRole } from "@/mocks/currentRole";
import type { Role } from "@/mocks/types";

/**
 * 現在のロールが allow に含まれていなければ、ロールに応じたホーム画面へリダイレクト。
 * モック簡略化のため、サーバー側でなくクライアント側でガードする。
 */
export function RoleGuard({ allow }: { allow: Role[] }) {
  const router = useRouter();
  const { role, mounted } = useCurrentRole();

  useEffect(() => {
    if (!mounted) return;
    if (!allow.includes(role)) {
      router.replace(ROLE_HOME[role]);
    }
  }, [mounted, role, allow, router]);

  return null;
}
