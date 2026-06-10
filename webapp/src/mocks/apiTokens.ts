export interface ApiToken {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  createdBy: string;
  lastUsedAt?: string;
  scopes: string[];
  expiresAt?: string;
}

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: string;
  lastFiredAt?: string;
}

export const apiTokens: ApiToken[] = [
  {
    id: "tok-001",
    name: "Production CI/CD",
    prefix: "lgr_prod_xK4n…",
    createdAt: "2026-03-15",
    createdBy: "山本 智也",
    lastUsedAt: "2026-06-10 09:14",
    scopes: ["ledger:read", "ledger:write", "export:read"],
    expiresAt: "2027-03-15",
  },
  {
    id: "tok-002",
    name: "Slack 通知 Bot",
    prefix: "lgr_bot_aQ2…",
    createdAt: "2026-04-22",
    createdBy: "竹下 直樹",
    lastUsedAt: "2026-06-10 08:55",
    scopes: ["notifications:read"],
  },
  {
    id: "tok-003",
    name: "経理 BI ダッシュボード",
    prefix: "lgr_ro_mP9…",
    createdAt: "2026-05-01",
    createdBy: "山本 智也",
    lastUsedAt: "2026-06-09 23:00",
    scopes: ["ledger:read"],
    expiresAt: "2026-12-31",
  },
];

export const webhooks: Webhook[] = [
  {
    id: "wh-001",
    name: "Slack 抽出失敗通知",
    url: "https://hooks.slack.com/services/T0***/B0***/***",
    events: ["ledger.extraction_failed"],
    active: true,
    createdAt: "2026-04-22",
    lastFiredAt: "2026-06-10 09:01",
  },
  {
    id: "wh-002",
    name: "freee 月次レポート同期",
    url: "https://api.freee.co.jp/webhook/***",
    events: ["report.monthly_generated"],
    active: true,
    createdAt: "2026-05-10",
    lastFiredAt: "2026-06-01 09:00",
  },
  {
    id: "wh-003",
    name: "テスト用 (ngrok)",
    url: "https://abc-123.ngrok.io/webhook",
    events: ["ledger.created", "ledger.updated"],
    active: false,
    createdAt: "2026-05-20",
  },
];
