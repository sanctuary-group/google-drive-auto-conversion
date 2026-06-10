"use client";

import { History, Laptop, Shield, ShieldCheck, Smartphone } from "lucide-react";

import { FolderTabs } from "@/components/layout/folder-tabs";
import { Button } from "@/components/ui/button";
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
  return (
    <FolderTabs
      tabs={[
        {
          key: "activity",
          label: "操作履歴",
          icon: <History className="size-4" />,
          content: <ActivityTab actions={actions} />,
        },
        {
          key: "permissions",
          label: "権限",
          icon: <Shield className="size-4" />,
          content: <PermissionsTab role={role} />,
        },
        {
          key: "sessions",
          label: "セッション",
          icon: <Laptop className="size-4" />,
          content: <SessionsTab />,
        },
      ]}
    />
  );
}

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
