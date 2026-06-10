import type { Role } from "@/mocks/types";

export interface NavItem {
  href: string;
  label: string;
  icon: string; // lucide-react icon name
  roles: Role[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// マスター管理サイド (/admin/*)
export const MASTER_NAV: NavSection[] = [
  {
    title: "マスター管理",
    items: [
      { href: "/admin/tenants", label: "テナント一覧", icon: "Building2", roles: ["master"] },
      { href: "/admin/companies", label: "会社一覧", icon: "Briefcase", roles: ["master"] },
      { href: "/admin/members", label: "管理者", icon: "Users", roles: ["master"] },
      { href: "/admin/billing", label: "プラン・請求", icon: "CreditCard", roles: ["master"] },
    ],
  },
  {
    title: "運営",
    items: [
      { href: "/admin/system", label: "システム監視", icon: "Activity", roles: ["master"] },
      { href: "/admin/audit-log", label: "監査ログ", icon: "ScrollText", roles: ["master"] },
      { href: "/admin/integrations", label: "API 連携", icon: "Plug", roles: ["master"] },
      { href: "/admin/settings", label: "テナント設定", icon: "Settings", roles: ["master"] },
    ],
  },
];

// 会社内ワークスペース (/app/*)
export const APP_NAV: NavSection[] = [
  {
    title: "業務",
    items: [
      { href: "/app/dashboard", label: "ダッシュボード", icon: "LayoutDashboard", roles: ["manager", "user"] },
      { href: "/app/ledger", label: "取引台帳", icon: "Table", roles: ["manager", "user"] },
      { href: "/app/upload", label: "PDF アップロード", icon: "Upload", roles: ["manager", "user"] },
    ],
  },
  {
    title: "会社設定",
    items: [
      { href: "/app/members", label: "メンバー管理", icon: "Users", roles: ["manager"] },
      { href: "/app/settings", label: "設定", icon: "Settings", roles: ["manager"] },
    ],
  },
];

export function filterNavByRole(sections: NavSection[], role: Role): NavSection[] {
  return sections
    .map((s) => ({ ...s, items: s.items.filter((i) => i.roles.includes(role)) }))
    .filter((s) => s.items.length > 0);
}
