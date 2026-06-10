export interface AuditLogEntry {
  id: string;
  ts: string;
  actor: string;
  actorRole: "master" | "manager" | "user" | "system";
  action: string;
  targetType: "tenant" | "company" | "member" | "ledger" | "settings" | "billing" | "integration";
  target: string;
  ip?: string;
  result: "success" | "failure";
}

export const auditLog: AuditLogEntry[] = [
  { id: "a-001", ts: "2026-06-10 09:14:22", actor: "山本 智也", actorRole: "master", action: "テナント設定変更", targetType: "tenant", target: "株式会社スカイ", ip: "203.0.113.42", result: "success" },
  { id: "a-002", ts: "2026-06-10 09:02:11", actor: "竹下 直樹", actorRole: "manager", action: "メンバーを招待", targetType: "member", target: "新規ユーザー (yoshida@sky.example)", ip: "203.0.113.42", result: "success" },
  { id: "a-003", ts: "2026-06-10 08:55:08", actor: "system", actorRole: "system", action: "Drive スキャン実行", targetType: "ledger", target: "23 ファイル処理", result: "success" },
  { id: "a-004", ts: "2026-06-10 08:50:34", actor: "永田 晶子", actorRole: "user", action: "台帳エントリ編集", targetType: "ledger", target: "L-009 (永田晶子 請求書)", ip: "198.51.100.7", result: "success" },
  { id: "a-005", ts: "2026-06-09 18:42:01", actor: "稲葉 翔", actorRole: "master", action: "テナント新規作成", targetType: "tenant", target: "デモテナント B 合同会社", ip: "192.0.2.55", result: "success" },
  { id: "a-006", ts: "2026-06-09 17:11:55", actor: "竹下 直樹", actorRole: "manager", action: "Drive 連携設定変更", targetType: "integration", target: "Google Drive (株式会社スカイ本体)", ip: "203.0.113.42", result: "success" },
  { id: "a-007", ts: "2026-06-09 16:28:39", actor: "system", actorRole: "system", action: "Gemini API 呼び出し", targetType: "ledger", target: "L-017 (Mira 請求書) - 部分抽出救済", result: "success" },
  { id: "a-008", ts: "2026-06-09 15:09:12", actor: "塩崎 弘美", actorRole: "user", action: "ログイン失敗", targetType: "member", target: "shiozaki@sky.example", ip: "203.0.113.99", result: "failure" },
  { id: "a-009", ts: "2026-06-09 14:55:48", actor: "山本 智也", actorRole: "master", action: "請求書 PDF ダウンロード", targetType: "billing", target: "INV-202604", ip: "203.0.113.42", result: "success" },
  { id: "a-010", ts: "2026-06-09 11:34:02", actor: "system", actorRole: "system", action: "月次レポート送信", targetType: "tenant", target: "株式会社スカイ", result: "success" },
  { id: "a-011", ts: "2026-06-09 10:21:15", actor: "竹下 直樹", actorRole: "manager", action: "ユーザー権限変更", targetType: "member", target: "桐生 健志 (user → manager)", ip: "203.0.113.42", result: "success" },
  { id: "a-012", ts: "2026-06-09 09:00:33", actor: "system", actorRole: "system", action: "OCR 失敗", targetType: "ledger", target: "請求書2026.04.01 ㈱スカイ様.pdf", result: "failure" },
];
