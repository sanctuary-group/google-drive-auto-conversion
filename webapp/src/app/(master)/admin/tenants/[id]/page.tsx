import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/status-badge";
import { tenants } from "@/mocks/tenants";
import { getMembersByTenant } from "@/mocks/members";
import { getLedgerByTenant } from "@/mocks/ledger";

const PLAN_LABEL = { free: "Free", standard: "Standard", enterprise: "Enterprise" } as const;
const ROLE_LABEL = { master: "テナント管理者", manager: "マネージャー", user: "ユーザー" } as const;

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
  const tenantMembers = getMembersByTenant(tenant.id);
  const ledger = getLedgerByTenant(tenant.id);
  const okCount = ledger.filter((l) => l.status === "OK").length;

  return (
    <PageShell
      title={tenant.name}
      description={`プラン: ${PLAN_LABEL[tenant.plan]} / 契約: ${tenant.contractDate}`}
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
            <CardTitle className="text-xs text-muted-foreground font-medium">状態</CardTitle>
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
            <CardTitle className="text-xs text-muted-foreground font-medium">今月処理件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{tenant.monthlyProcessedCount.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">件</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">抽出成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {ledger.length ? Math.round((okCount / ledger.length) * 100) : 0}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              OK {okCount} / {ledger.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">メンバー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {tenant.managerCount + tenant.userCount}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              マネージャー {tenant.managerCount} / ユーザー {tenant.userCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">メンバー</TabsTrigger>
          <TabsTrigger value="settings">設定 / Drive 接続</TabsTrigger>
          <TabsTrigger value="usage">利用量推移</TabsTrigger>
          <TabsTrigger value="ledger">最近の処理</TabsTrigger>
          <TabsTrigger value="contract">契約・プラン</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">メンバー ({tenantMembers.length} 名)</CardTitle>
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
                    <TableHead>権限</TableHead>
                    <TableHead>最終ログイン</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenantMembers.map((m) => (
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
                        <StatusBadge variant={m.role === "master" ? "ok" : m.role === "manager" ? "info" : "muted"}>
                          {ROLE_LABEL[m.role]}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{m.lastLoginAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">テナント設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-2">
                <Label>テナント名</Label>
                <Input defaultValue={tenant.name} />
              </div>
              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Google Drive 監視フォルダ連携</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    フォルダに置かれた PDF/画像を自動で OCR → 台帳に追記
                  </div>
                </div>
                <Switch defaultChecked={tenant.driveConnected} />
              </div>
              <div className="border-t pt-4">
                <div className="font-medium text-sm mb-1">ユーザー視点(自社 = 発行元 / 受領側)</div>
                <div className="text-xs text-muted-foreground">
                  現在: <span className="font-medium">{tenant.userRole === "issuer" ? "発行元 (取引先=御中の側)" : "受領側 (取引先=発行元)"}</span>
                </div>
              </div>
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

        <TabsContent value="ledger">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">最近の処理 ({ledger.length} 件)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>処理日時</TableHead>
                    <TableHead>ファイル名</TableHead>
                    <TableHead>取引先</TableHead>
                    <TableHead className="text-right">合計</TableHead>
                    <TableHead>ステータス</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ledger.slice(0, 8).map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="text-xs text-muted-foreground">{l.processedAt}</TableCell>
                      <TableCell className="max-w-[280px] truncate">{l.fileName}</TableCell>
                      <TableCell>{l.vendor}</TableCell>
                      <TableCell className="text-right tabular-nums">¥{l.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge variant={l.status === "OK" ? "ok" : l.status === "部分抽出" ? "warn" : "ng"}>
                          {l.status}
                        </StatusBadge>
                      </TableCell>
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
