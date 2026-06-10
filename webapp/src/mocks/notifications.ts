export type NotificationKind = "error" | "warning" | "info" | "success";

export interface NotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  ts: string;
  read: boolean;
  link?: string;
}

export const notifications: NotificationItem[] = [
  {
    id: "n-001",
    kind: "error",
    title: "OCR 失敗: 1 件のファイルが処理できませんでした",
    body: "請求書2026.04.01 ㈱スカイ様.pdf の OCR に失敗しました。手動アップロードで再試行してください。",
    ts: "2026-06-10 09:01:34",
    read: false,
    link: "/app/ledger",
  },
  {
    id: "n-002",
    kind: "warning",
    title: "部分抽出が 2 件あります",
    body: "株式会社Mira 請求書ほか 1 件、自動抽出で取れなかった項目があります。確認してください。",
    ts: "2026-06-10 08:56:11",
    read: false,
    link: "/app/ledger",
  },
  {
    id: "n-003",
    kind: "info",
    title: "Drive スキャン完了",
    body: "23 ファイルを処理しました。OK: 21, 部分抽出: 1, NG: 1",
    ts: "2026-06-10 08:55:42",
    read: true,
    link: "/app/dashboard",
  },
  {
    id: "n-004",
    kind: "success",
    title: "メンバー招待が承認されました",
    body: "yoshida@sky.example さんが招待を承認し、ユーザーとして参加しました。",
    ts: "2026-06-09 17:20:08",
    read: true,
    link: "/app/members",
  },
  {
    id: "n-005",
    kind: "info",
    title: "月次レポートを送信しました",
    body: "2026 年 5 月の処理サマリーを ops@sky.example 宛にメール送信しました。",
    ts: "2026-06-01 09:00:00",
    read: true,
  },
  {
    id: "n-006",
    kind: "warning",
    title: "Gemini API 利用量が無料枠の 80% に達しました",
    body: "本日の Gemini 呼び出しが 1,200 / 1,500 件に達しました。残量にご注意ください。",
    ts: "2026-05-31 16:45:12",
    read: true,
  },
];

export const unreadCount = notifications.filter((n) => !n.read).length;
