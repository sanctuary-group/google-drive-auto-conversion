import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { companies } from "@/mocks/companies";
import { tenants } from "@/mocks/tenants";

export default function CompaniesPage() {
  return (
    <PageShell
      title="会社一覧"
      description="先方ロールでは自テナント配下、サンクチュアリは全テナント横断で表示されます。"
      actions={
        <Button>
          <Plus className="size-4" />
          会社を追加
        </Button>
      }
    >
      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="会社名で検索" />
        </div>
      </Card>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>会社名</TableHead>
              <TableHead>所属テナント</TableHead>
              <TableHead>Drive 連携</TableHead>
              <TableHead className="text-right">マネージャー</TableHead>
              <TableHead className="text-right">ユーザー</TableHead>
              <TableHead className="text-right">今月処理</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((c) => {
              const tenant = tenants.find((t) => t.id === c.tenantId);
              return (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{tenant?.name}</TableCell>
                  <TableCell>
                    <StatusBadge variant={c.driveConnected ? "ok" : "muted"}>
                      {c.driveConnected ? "接続済み" : "未接続"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{c.managerCount}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.userCount}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.monthlyProcessedCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/companies/${c.id}`}>詳細</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </PageShell>
  );
}
