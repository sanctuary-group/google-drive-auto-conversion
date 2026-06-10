"use client";

import { useState } from "react";
import { History, Laptop, Shield, ShieldCheck, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TabKey = "activity" | "permissions" | "sessions";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "activity", label: "操作履歴", icon: <History className="size-4" /> },
  { key: "permissions", label: "権限", icon: <Shield className="size-4" /> },
  { key: "sessions", label: "セッション", icon: <Laptop className="size-4" /> },
];

export type ActionItem = {
  id: string;
  ts: string;
  action: string;
  target: string;
  result: string;
};

export function MemberDetailTabs({
  role,
  actions,
}: {
  role: "master" | "manager" | "user";
  actions: ActionItem[];
}) {
  const [tab, setTab] = useState<TabKey>("activity");

  return (
    <div>
      {/* モバイル: セレクトボックス */}
      <div className="sm:hidden mb-3">
        <Select value={tab} onValueChange={(v) => setTab(v as TabKey)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TABS.map((t) => (
              <SelectItem key={t.key} value={t.key}>
                <span className="flex items-center gap-2">{t.icon}{t.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* タブレット以上: フォルダタブ風 */}
      <div className="hidden sm:flex items-end gap-1 px-2 -mb-px relative z-10 overflow-x-auto scrollbar-none">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 px-3 md:px-4 pt-2.5 pb-3 text-sm rounded-t-lg border border-b-0 whitespace-nowrap transition ${
                active
                  ? "bg-card text-foreground border-border font-medium"
                  : "bg-muted/40 text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/60"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="bg-card border rounded-lg sm:rounded-tl-none shadow-sm">
        {tab === "activity" && <ActivityTab actions={actions} />}
        {tab === "permissions" && <PermissionsTab role={role} />}
        {tab === "sessions" && <SessionsTab />}
      </div>
    </div>
  );
}

/* ────────────────── 操作履歴 ────────────────── */
function ActivityTab({ actions }: { actions: ActionItem[] }) {
  return (
    <div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <SectionTitle icon={<History className="size-4" />}>
          最近の操作 <span className="text-muted-foreground font-normal">({actions.length} 件)</span>
        </SectionTitle>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">CSV エクスポート</Button>
      </div>
      <Separator />
      {actions.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground py-16">
          この期間の操作はありません
        </div>
      ) : (
        <>
          {/* デスクトップ: テーブル */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>時刻</TableHead>
                  <TableHead>操作</TableHead>
                  <TableHead>対象</TableHead>
                  <TableHead>結果</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actions.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="text-xs text-muted-foreground font-mono">{a.ts}</TableCell>
                    <TableCell>{a.action}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{a.target}</TableCell>
                    <TableCell>
                      <StatusBadge variant={a.result === "success" ? "ok" : "ng"}>
                        {a.result === "success" ? "成功" : "失敗"}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* モバイル: タイムライン風カード */}
          <div className="md:hidden divide-y">
            {actions.map((a) => (
              <div key={a.id} className="p-4 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium truncate">{a.action}</div>
                  <StatusBadge variant={a.result === "success" ? "ok" : "ng"}>
                    {a.result === "success" ? "成功" : "失敗"}
                  </StatusBadge>
                </div>
                <div className="text-xs text-muted-foreground truncate">{a.target}</div>
                <div className="text-[11px] text-muted-foreground font-mono">{a.ts}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ────────────────── 権限 ────────────────── */
function PermissionsTab({ role }: { role: "master" | "manager" | "user" }) {
  const perms = [
    { label: "取引台帳の閲覧", allowed: true },
    { label: "取引台帳の編集・削除", allowed: role !== "user" },
    { label: "メンバーの招待・権限変更", allowed: role !== "user" },
    { label: "テナント設定の変更", allowed: role === "master" },
    { label: "請求情報の閲覧", allowed: role === "master" },
    { label: "API 連携の設定", allowed: role === "master" },
    { label: "監査ログの閲覧", allowed: role === "master" },
  ];
  const allowedCount = perms.filter((p) => p.allowed).length;

  return (
    <div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <SectionTitle icon={<ShieldCheck className="size-4 text-emerald-500" />}>
            権限の付与状況
          </SectionTitle>
          <div className="text-xs text-muted-foreground mt-1">
            {allowedCount} / {perms.length} 件が許可されています
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">権限を変更</Button>
      </div>
      <Separator />
      <div className="p-4 sm:p-6 grid gap-2 sm:grid-cols-2">
        {perms.map((p) => (
          <div
            key={p.label}
            className={`flex items-center justify-between gap-3 rounded-md border p-3 text-sm ${
              p.allowed ? "bg-emerald-500/5 border-emerald-500/20" : "bg-muted/30"
            }`}
          >
            <span className={p.allowed ? "" : "text-muted-foreground"}>{p.label}</span>
            <StatusBadge variant={p.allowed ? "ok" : "muted"}>
              {p.allowed ? "許可" : "不可"}
            </StatusBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────── セッション ────────────────── */
function SessionsTab() {
  return (
    <div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <SectionTitle icon={<Laptop className="size-4" />}>
            アクティブセッション
          </SectionTitle>
          <div className="text-xs text-muted-foreground mt-1">
            現在ログイン中のすべての端末
          </div>
        </div>
        <Button variant="destructive" size="sm" className="w-full sm:w-auto">
          全セッションを強制ログアウト
        </Button>
      </div>
      <Separator />
      <div className="p-4 sm:p-6 grid gap-3 md:grid-cols-2">
        <SessionCard
          device="MacBook Pro"
          browser="Chrome 130"
          os="macOS 15.2"
          loc="東京, JP"
          ip="203.0.113.42"
          lastActive="アクティブ"
          icon="laptop"
          current
        />
        <SessionCard
          device="iPhone 15"
          browser="Safari"
          os="iOS 18.2"
          loc="東京, JP"
          ip="203.0.113.42"
          lastActive="2 時間前"
          icon="phone"
        />
      </div>
    </div>
  );
}

/* ────────────────── 部品 ────────────────── */
function SectionTitle({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold flex items-center gap-2">
      {icon}
      {children}
    </h3>
  );
}

function SessionCard({
  device, browser, os, loc, ip, lastActive, icon, current, stale,
}: {
  device: string; browser: string; os: string; loc: string; ip: string; lastActive: string;
  icon: "laptop" | "phone"; current?: boolean; stale?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between gap-2 sm:gap-3 rounded-lg border p-3 sm:p-4 transition ${current ? "border-primary/30 bg-primary/5" : ""}`}>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${current ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
          {icon === "laptop" ? <Laptop className="size-5" /> : <Smartphone className="size-5" />}
        </div>
        <div className="min-w-0 space-y-0.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium truncate">{device}</span>
            {current && <StatusBadge variant="ok">このセッション</StatusBadge>}
            {stale && <StatusBadge variant="muted">非アクティブ</StatusBadge>}
          </div>
          <div className="text-xs text-muted-foreground truncate">{browser} · {os}</div>
          <div className="text-[11px] text-muted-foreground font-mono truncate">{loc} · {ip} · {lastActive}</div>
        </div>
      </div>
      {!current && <Button variant="ghost" size="sm" className="shrink-0">ログアウト</Button>}
    </div>
  );
}
