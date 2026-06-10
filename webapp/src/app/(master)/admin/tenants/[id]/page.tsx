import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Plus } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/status-badge";
import { tenants } from "@/mocks/tenants";
import { companies } from "@/mocks/companies";
import { members } from "@/mocks/members";

const PLAN_LABEL = { free: "Free", standard: "Standard", enterprise: "Enterprise" } as const;
const USAGE_MONTHLY = [
  { month: "2025/11", count: 142 },
  { month: "2025/12", count: 168 },
  { month: "2026/01", count: 205 },
  { month: "2026/02", count: 231 },
  { month: "2026/03", count: 264 },
  { month: "2026/04", count: 287 },
];
const MAX_USAGE = Math.max(...USAGE_MONTHLY.map((u) => u.count));

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tenant = tenants.find((t) => t.id === id);
  if (!tenant) notFound();
  const tenantCompanies = companies.filter((c) => c.tenantId === tenant.id);
  const tenantMembers = members.filter((m) => m.tenantId === tenant.id);
  const masterMembers = tenantMembers.filter((m) => m.role === "master");
  const totalProcessed = tenantCompanies.reduce((sum, c) => sum + c.monthlyProcessedCount, 0);

  return (
    <PageShell
      title={tenant.name}
      description={`契約: ${tenant.contractDate} / プラン: ${PLAN_LABEL[tenant.plan]}`}
      actions={
        <Button asChild variant="outline">
          <Link href="/admin/tenants">
            <ArrowLeft className="size-4" />
            一覧へ戻る
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">契約状態</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusBadge variant={tenant.status === "active" ? "ok" : tenant.status === "trial" ? "warn" : "ng"}>
              {tenant.status === "active" ? "稼働中" : tenant.status === "trial" ? "トライアル" : "停止"}
            </StatusBadge>
            <div className="text-xs text-muted-foreground mt-2">プラン: {PLAN_LABEL[tenant.plan]}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">配下の会社</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{tenantCompanies.length}</div>
            <div className="text-xs text-muted-foreground mt-1">社</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">今月処理件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{totalProcessed.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">件</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">マスター管理者</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{masterMembers.length}</div>
            <div className="text-xs text-muted-foreground mt-1">名</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="companies">
        <TabsList>
          <TabsTrigger value="companies">配下の会社</TabsTrigger>
          <TabsTrigger value="usage">利用量推移</TabsTrigger>
          <TabsTrigger value="masters">マスター管理者</TabsTrigger>
          <TabsTrigger value="contract">契約・プラン</TabsTrigger>
        </TabsList>

        <TabsContent value="companies">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">会社一覧 ({tenantCompanies.length} 社)</CardTitle>
              <Button size="sm">
                <Plus className="size-4" />
                会社を追加
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>会社名</TableHead>
                    <TableHead>Drive 連携</TableHead>
                    <TableHead className="text-right">マネージャー</TableHead>
                    <TableHead className="text-right">ユーザー</TableHead>
                    <TableHead className="text-right">今月処理</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenantCompanies.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.name}</TableCell>
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
                          <Link href={`/admin/companies/${c.id}`}>
                            詳細
                            <ExternalLink className="size-3" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">月次処理件数(直近 6 ヶ月)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {USAGE_MONTHLY.map((u) => (
                  <div key={u.month} className="grid grid-cols-[80px_1fr_80px] items-center gap-3">
                    <div className="text-xs text-muted-foreground font-mono">{u.month}</div>
                    <div className="h-6 bg-muted/40 rounded overflow-hidden">
                      <div
                        className="h-full bg-primary/70"
                        style={{ width: `${(u.count / MAX_USAGE) * 100}%` }}
                      />
                    </div>
                    <div className="text-right text-sm tabular-nums">{u.count.toLocaleString()} 件</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="masters">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">マスター管理者 ({masterMembers.length} 名)</CardTitle>
              <Button size="sm">
                <Plus className="size-4" />
                招待
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名前</TableHead>
                    <TableHead>メール</TableHead>
                    <TableHead>最終ログイン</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {masterMembers.map((m) => (
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
                      <TableCell className="text-muted-foreground text-xs">{m.lastLoginAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contract">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">契約・プラン情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <Row label="プラン" value={PLAN_LABEL[tenant.plan]} />
              <Row label="契約日" value={tenant.contractDate} />
              <Row label="状態" value={tenant.status === "active" ? "稼働中" : tenant.status === "trial" ? "トライアル中" : "停止"} />
              <Row label="月額基本料金" value={tenant.plan === "enterprise" ? "¥49,800" : tenant.plan === "standard" ? "¥19,800" : "¥0"} />
              <Row label="無料処理枠" value={tenant.plan === "enterprise" ? "500 件/月" : tenant.plan === "standard" ? "200 件/月" : "50 件/月"} />
              <Row label="追加処理単価" value="¥30/件" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
