import type { Company } from "./types";

export const companies: Company[] = [
  {
    id: "company-sky-main",
    tenantId: "tenant-sky",
    name: "株式会社スカイ 本体",
    driveConnected: true,
    monthlyProcessedCount: 187,
    managerCount: 2,
    userCount: 5,
    userRole: "issuer",
  },
  {
    id: "company-sky-affiliate",
    tenantId: "tenant-sky",
    name: "スカイ関連会社 (株)",
    driveConnected: true,
    monthlyProcessedCount: 100,
    managerCount: 1,
    userCount: 3,
    userRole: "issuer",
  },
  {
    id: "company-demo-a",
    tenantId: "tenant-demo-a",
    name: "Demo Tenant A 株式会社",
    driveConnected: false,
    monthlyProcessedCount: 112,
    managerCount: 1,
    userCount: 4,
    userRole: "receiver",
  },
  {
    id: "company-demo-b",
    tenantId: "tenant-demo-b",
    name: "デモテナント B 合同会社",
    driveConnected: false,
    monthlyProcessedCount: 18,
    managerCount: 1,
    userCount: 2,
    userRole: "issuer",
  },
];
