import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { tenants } from "@/mocks/tenants";

const PLAN_LABEL = { free: "Free", standard: "Standard", enterprise: "Enterprise" } as const;

export default function TenantsPage() {
  return (
    <PageShell
      title="テナント一覧"
      description="先方(顧客テナント)を横断管理します。サンクチュアリのみアクセス可能。"
      actions={
        <Button>
          <Plus className="size-4" />
          新規テナント
        </Button>
      }
    >
      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="テナント名で検索" />
        </div>
      </Card>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>テナント名</TableHead>
              <TableHead>プラン</TableHead>
              <TableHead>契約日</TableHead>
              <TableHead className="text-right">会社数</TableHead>
              <TableHead className="text-right">今月処理</TableHead>
              <TableHead>状態</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>
                  <StatusBadge variant={t.plan === "enterprise" ? "ok" : t.plan === "standard" ? "info" : "muted"}>
                    {PLAN_LABEL[t.plan]}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-muted-foreground">{t.contractDate}</TableCell>
                <TableCell className="text-right tabular-nums">{t.companyCount}</TableCell>
                <TableCell className="text-right tabular-nums">{t.monthlyProcessedCount.toLocaleString()}</TableCell>
                <TableCell>
                  <StatusBadge variant={t.status === "active" ? "ok" : t.status === "trial" ? "warn" : "ng"}>
                    {t.status === "active" ? "稼働中" : t.status === "trial" ? "トライアル" : "停止"}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/tenants/${t.id}`}>詳細</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageShell>
  );
}
