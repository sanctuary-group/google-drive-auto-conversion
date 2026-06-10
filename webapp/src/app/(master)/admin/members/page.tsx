import { Plus, Search } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { members } from "@/mocks/members";
import { tenants } from "@/mocks/tenants";

const ROLE_LABEL: Record<string, string> = {
  master: "マスター管理",
  manager: "マネージャー",
  user: "ユーザー",
};

export default function AdminMembersPage() {
  const adminish = members.filter(
    (m) => m.role === "master" || m.role === "manager",
  );
  return (
    <PageShell
      title="管理者"
      description="サンクチュアリ運営/先方管理者/会社マネージャーの一覧"
      actions={
        <Button>
          <Plus className="size-4" />
          管理者を招待
        </Button>
      }
    >
      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="名前・メールで検索" />
        </div>
      </Card>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>メール</TableHead>
              <TableHead>ロール</TableHead>
              <TableHead>所属テナント</TableHead>
              <TableHead>最終ログイン</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminish.map((m) => {
              const tenant = m.tenantId ? tenants.find((t) => t.id === m.tenantId) : null;
              return (
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
                    <StatusBadge variant={m.role === "master" ? "ok" : "muted"}>
                      {ROLE_LABEL[m.role]}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tenant?.name ?? "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{m.lastLoginAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </PageShell>
  );
}
