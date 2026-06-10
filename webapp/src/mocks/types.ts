export type Role = "master" | "manager" | "user";

export interface Tenant {
  id: string;
  name: string;
  plan: "free" | "standard" | "enterprise";
  contractDate: string;
  monthlyProcessedCount: number;
  companyCount: number;
  status: "active" | "trial" | "suspended";
}

export interface Company {
  id: string;
  tenantId: string;
  name: string;
  driveConnected: boolean;
  monthlyProcessedCount: number;
  managerCount: number;
  userCount: number;
  userRole: "issuer" | "receiver";
}

export interface Member {
  id: string;
  tenantId?: string;
  companyId?: string;
  name: string;
  email: string;
  role: Role;
  lastLoginAt: string;
  avatarSeed: number;
}

export type DocType = "請求書" | "領収書" | "見積書" | "注文書" | "納品書" | "契約書" | "その他";
export type LedgerStatus = "OK" | "部分抽出" | "NG";

export interface LedgerEntry {
  id: string;
  companyId: string;
  processedAt: string;
  fileName: string;
  fileLink: string;
  docType: DocType;
  vendor: string;
  issueDate: string;
  docNumber: string;
  total: number;
  subtotal: number;
  tax: number;
  paymentDueDate: string;
  contentSummary: string;
  rawText: string;
  status: LedgerStatus;
}
