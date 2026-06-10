import type { Tenant } from "./types";

export const tenants: Tenant[] = [
  {
    id: "tenant-sky",
    name: "株式会社スカイ",
    plan: "enterprise",
    contractDate: "2025-09-01",
    status: "active",
    driveConnected: true,
    userRole: "issuer",
    monthlyProcessedCount: 287,
    managerCount: 2,
    userCount: 5,
  },
  {
    id: "tenant-demo-a",
    name: "Demo Tenant A 株式会社",
    plan: "standard",
    contractDate: "2026-01-15",
    status: "active",
    driveConnected: false,
    userRole: "receiver",
    monthlyProcessedCount: 112,
    managerCount: 1,
    userCount: 4,
  },
  {
    id: "tenant-demo-b",
    name: "デモテナント B 合同会社",
    plan: "free",
    contractDate: "2026-04-01",
    status: "trial",
    driveConnected: false,
    userRole: "issuer",
    monthlyProcessedCount: 18,
    managerCount: 1,
    userCount: 2,
  },
];

export function getTenantById(id: string) {
  return tenants.find((t) => t.id === id);
}
