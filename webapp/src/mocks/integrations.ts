export type IntegrationStatus = "connected" | "disconnected" | "error" | "comingSoon";

export interface Integration {
  id: string;
  name: string;
  category: "storage" | "accounting" | "notification" | "auth";
  description: string;
  status: IntegrationStatus;
  connectedAt?: string;
  connectedBy?: string;
  scope?: string;
  icon: string; // lucide icon name
}

export const integrations: Integration[] = [
  {
    id: "google-drive",
    name: "Google Drive",
    category: "storage",
    description: "監視フォルダに置かれた PDF/画像を自動で OCR → 台帳に追記",
    status: "connected",
    connectedAt: "2025-09-15",
    connectedBy: "竹下 直樹",
    scope: "drive.file (アプリが作成・選択したファイルのみ)",
    icon: "FolderSync",
  },
  {
    id: "freee",
    name: "freee 会計",
    category: "accounting",
    description: "取引台帳を freee の取引データとして自動同期",
    status: "disconnected",
    icon: "Receipt",
  },
  {
    id: "money-forward",
    name: "マネーフォワード クラウド会計",
    category: "accounting",
    description: "取引台帳を MF クラウド会計に CSV/API で連携",
    status: "disconnected",
    icon: "Receipt",
  },
  {
    id: "yayoi",
    name: "弥生会計オンライン",
    category: "accounting",
    description: "弥生会計形式の CSV をエクスポート",
    status: "comingSoon",
    icon: "Receipt",
  },
  {
    id: "slack",
    name: "Slack",
    category: "notification",
    description: "抽出失敗・月次レポートを指定チャネルへ通知",
    status: "disconnected",
    icon: "MessageSquare",
  },
  {
    id: "chatwork",
    name: "Chatwork",
    category: "notification",
    description: "Chatwork ルームに通知を送信",
    status: "comingSoon",
    icon: "MessageSquare",
  },
  {
    id: "google-sso",
    name: "Google SSO",
    category: "auth",
    description: "Google Workspace アカウントでログインを許可",
    status: "connected",
    connectedAt: "2025-09-15",
    connectedBy: "山本 智也",
    icon: "KeyRound",
  },
  {
    id: "saml",
    name: "SAML 2.0 SSO",
    category: "auth",
    description: "Okta / Azure AD などの IdP と連携 (Enterprise プラン)",
    status: "disconnected",
    icon: "KeyRound",
  },
];

export const CATEGORY_LABEL: Record<Integration["category"], string> = {
  storage: "ストレージ",
  accounting: "会計連携",
  notification: "通知",
  auth: "認証",
};
