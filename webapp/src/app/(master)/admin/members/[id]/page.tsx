import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, ShieldAlert } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { members } from "@/mocks/members";
import { tenants } from "@/mocks/tenants";
import { auditLog } from "@/mocks/auditLog";
import { MemberDetailTabs } from "./tabs";

const ROLE_LABEL = { master: "マスター管理", manager: "マネージャー", user: "ユーザー" } as const;

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const m = members.find((x) => x.id === id);
  if (!m) notFound();
  const tenant = m.tenantId ? tenants.find((t) => t.id === m.tenantId) : null;
  const ownActions = auditLog.filter((a) => a.actor === m.name);

  return (
    <PageShell
      title={m.name}
      description={`${ROLE_LABEL[m.role as keyof typeof ROLE_LABEL] ?? m.role} / ${m.email}`}
      actions={
        <Button asChild variant="outline">
          <Link href="/admin/members">
            <ArrowLeft className="size-4" />
            一覧へ戻る
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-3 text-center">
              <Avatar className="size-20 mx-auto">
                <AvatarFallback className="text-2xl">{m.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{m.name}</div>
                <div className="text-xs text-muted-foreground">{m.email}</div>
              </div>
              <StatusBadge variant={m.role === "master" ? "ok" : m.role === "manager" ? "info" : "muted"}>
                {ROLE_LABEL[m.role as keyof typeof ROLE_LABEL] ?? m.role}
              </StatusBadge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground font-medium">所属</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1.5">
              {tenant ? (
                <div>
                  <div className="text-xs text-muted-foreground">テナント</div>
                  <Link href={`/admin/tenants/${tenant.id}`} className="hover:underline">{tenant.name}</Link>
                </div>
              ) : (
                <div className="text-muted-foreground">マスター管理者(全テナント)</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs text-muted-foreground font-medium">操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full">
                <Mail className="size-4" />
                メッセージを送る
              </Button>
              <Button variant="outline" className="w-full">パスワード再設定を送信</Button>
              <Button variant="destructive" className="w-full">
                <ShieldAlert className="size-4" />
                アカウント停止
              </Button>
            </CardContent>
          </Card>
        </div>

        <MemberDetailTabs
          role={m.role}
          actions={ownActions.map((a) => ({
            id: a.id,
            ts: a.ts,
            action: a.action,
            target: a.target,
            result: a.result,
          }))}
        />
      </div>
    </PageShell>
  );
}