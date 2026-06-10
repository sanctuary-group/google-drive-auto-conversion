import { Download, Search } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { auditLog } from "@/mocks/auditLog";

const ROLE_LABEL = { master: "マスター", manager: "マネージャー", user: "ユーザー", system: "システム" } as const;
const TARGET_LABEL = {
  tenant: "テナント",
  company: "会社",
  member: "メンバー",
  ledger: "台帳",
  settings: "設定",
  billing: "請求",
  integration: "連携",
} as const;

export default function AuditLogPage() {
  return (
    <PageShell
      title="監査ログ"
      description="管理操作・自動処理・認証イベントの履歴"
      actions={
        <Button variant="outline">
          <Download className="size-4" />
          CSV エクスポート
        </Button>
      }
    >
      <Card className="p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="アクター・対象で検索" />
          </div>
          <Select defaultValue="all-actor">
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all-actor">すべてのロール</SelectItem>
              <SelectItem value="master">マスター</SelectItem>
              <SelectItem value="manager">マネージャー</SelectItem>
              <SelectItem value="user">ユーザー</SelectItem>
              <SelectItem value="system">システム</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-target">
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all-target">すべての対象</SelectItem>
              <SelectItem value="tenant">テナント</SelectItem>
              <SelectItem value="company">会社</SelectItem>
              <SelectItem value="member">メンバー</SelectItem>
              <SelectItem value="ledger">台帳</SelectItem>
              <SelectItem value="settings">設定</SelectItem>
              <SelectItem value="billing">請求</SelectItem>
              <SelectItem value="integration">連携</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-result">
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all-result">結果すべて</SelectItem>
              <SelectItem value="success">成功</SelectItem>
              <SelectItem value="failure">失敗</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">時刻</TableHead>
              <TableHead>アクター</TableHead>
              <TableHead>ロール</TableHead>
              <TableHead>操作</TableHead>
              <TableHead>対象</TableHead>
              <TableHead className="w-[120px]">IP</TableHead>
              <TableHead>結果</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLog.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="text-xs text-muted-foreground font-mono">{e.ts}</TableCell>
                <TableCell className="font-medium">{e.actor}</TableCell>
                <TableCell>
                  <StatusBadge
                    variant={
                      e.actorRole === "master" ? "ok" :
                      e.actorRole === "manager" ? "info" :
                      e.actorRole === "system" ? "muted" :
                      "muted"
                    }
                  >
                    {ROLE_LABEL[e.actorRole]}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-sm">{e.action}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-[10px] uppercase tracking-wider bg-muted px-1.5 py-0.5 rounded">{TARGET_LABEL[e.targetType]}</span>
                    {e.target}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">{e.ip ?? "—"}</TableCell>
                <TableCell>
                  <StatusBadge variant={e.result === "success" ? "ok" : "ng"}>
                    {e.result === "success" ? "成功" : "失敗"}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="mt-4 text-xs text-muted-foreground text-center">
        直近 {auditLog.length} 件を表示 / さらに過去のログは CSV エクスポートで取得できます
      </div>
    </PageShell>
  );
}
