import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, ShieldAlert } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { members } from "@/mocks/members";
import { tenants } from "@/mocks/tenants";
import { companies } from "@/mocks/companies";
import { auditLog } from "@/mocks/auditLog";

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
  const company = m.companyId ? companies.find((c) => c.id === m.companyId) : null;
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
              {tenant && (
                <div>
                  <div className="text-xs text-muted-foreground">テナント</div>
                  <Link href={`/admin/tenants/${tenant.id}`} className="hover:underline">{tenant.name}</Link>
                </div>
              )}
              {company && (
                <div>
                  <div className="text-xs text-muted-foreground">会社</div>
                  <Link href={`/admin/companies/${company.id}`} className="hover:underline">{company.name}</Link>
                </div>
              )}
              {!tenant && !company && (
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

        <Tabs defaultValue="activity">
          <TabsList>
            <TabsTrigger value="activity">操作履歴</TabsTrigger>
            <TabsTrigger value="permissions">権限</TabsTrigger>
            <TabsTrigger value="sessions">セッション</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">最近の操作 ({ownActions.length} 件)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {ownActions.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-10">この期間の操作はありません</div>
                ) : (
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
                      {ownActions.map((a) => (
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">権限</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <PermRow allowed label="取引台帳の閲覧" />
                <PermRow allowed={m.role !== "user"} label="取引台帳の編集・削除" />
                <PermRow allowed={m.role !== "user"} label="メンバーの招待・権限変更" />
                <PermRow allowed={m.role === "master"} label="テナント設定の変更" />
                <PermRow allowed={m.role === "master"} label="請求情報の閲覧" />
                <PermRow allowed={m.role === "master"} label="API 連携の設定" />
                <PermRow allowed={m.role === "master"} label="監査ログの閲覧" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">アクティブセッション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <SessionRow device="MacBook Pro · Chrome 130" loc="東京, JP" ip="203.0.113.42" lastActive="アクティブ" />
                <SessionRow device="iPhone 15 · Safari" loc="東京, JP" ip="203.0.113.42" lastActive="2 時間前" />
                <Button variant="destructive" size="sm" className="mt-2">全セッションを強制ログアウト</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}

function PermRow({ label, allowed }: { label: string; allowed: boolean }) {
  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
      <span>{label}</span>
      <StatusBadge variant={allowed ? "ok" : "muted"}>
        {allowed ? "許可" : "不可"}
      </StatusBadge>
    </div>
  );
}

function SessionRow({ device, loc, ip, lastActive }: { device: string; loc: string; ip: string; lastActive: string }) {
  return (
    <div className="flex items-center justify-between border rounded-md p-3">
      <div className="space-y-0.5">
        <div className="font-medium">{device}</div>
        <div className="text-xs text-muted-foreground">{loc} · {ip}</div>
      </div>
      <div className="text-xs text-muted-foreground">{lastActive}</div>
    </div>
  );
}
