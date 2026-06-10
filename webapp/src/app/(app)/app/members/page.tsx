import { Plus } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { getMembersByTenant } from "@/mocks/members";

const TENANT_ID = "tenant-sky";

export default function AppMembersPage() {
  const members = getMembersByTenant(TENANT_ID).filter((m) => m.role !== "master");
  return (
    <PageShell
      title="メンバー管理"
      description="株式会社スカイ のマネージャー・ユーザー"
      actions={
        <Button>
          <Plus className="size-4" />
          メンバーを招待
        </Button>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">所属メンバー ({members.length} 名)</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>メール</TableHead>
              <TableHead>権限</TableHead>
              <TableHead>最終ログイン</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarFallback className="text-xs">{m.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    {m.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{m.email}</TableCell>
                <TableCell>
                  <StatusBadge variant={m.role === "manager" ? "info" : "muted"}>
                    {m.role === "manager" ? "マネージャー" : "ユーザー"}
                  </StatusBadge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{m.lastLoginAt}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    変更
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
