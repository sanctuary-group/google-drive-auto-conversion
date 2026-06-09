import type { Tenant } from "./types";

export const tenants: Tenant[] = [
  {
    id: "tenant-sky",
    name: "株式会社スカイ",
    plan: "enterprise",
    contractDate: "2025-09-01",
    monthlyProcessedCount: 287,
    companyCount: 2,
    status: "active",
  },
  {
    id: "tenant-demo-a",
    name: "Demo Tenant A 株式会社",
    plan: "standard",
    contractDate: "2026-01-15",
    monthlyProcessedCount: 112,
    companyCount: 1,
    status: "active",
  },
  {
    id: "tenant-demo-b",
    name: "デモテナント B 合同会社",
    plan: "free",
    contractDate: "2026-04-01",
    monthlyProcessedCount: 18,
    companyCount: 1,
    status: "trial",
  },
];
