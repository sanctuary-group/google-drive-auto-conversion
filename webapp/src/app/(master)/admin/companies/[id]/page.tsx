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
import { StatusBadge } from "@/components/status-badge";
import { companies } from "@/mocks/companies";
import { tenants } from "@/mocks/tenants";
import { getMembersByCompany } from "@/mocks/members";
import { getLedgerByCompany } from "@/mocks/ledger";

const ROLE_LABEL = { manager: "マネージャー", user: "ユーザー" } as const;

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = companies.find((c) => c.id === id);
  if (!company) notFound();
  const tenant = tenants.find((t) => t.id === company.tenantId);
  const members = getMembersByCompany(company.id);
  const ledger = getLedgerByCompany(company.id);
  const okCount = ledger.filter((l) => l.status === "OK").length;

  return (
    <PageShell
      title={company.name}
      description={`${tenant?.name} 配下 / 今月処理 ${company.monthlyProcessedCount} 件`}
      actions={
        <Button asChild variant="outline">
          <Link href="/admin/companies">
            <ArrowLeft className="size-4" />
            一覧へ戻る
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">今月処理</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{company.monthlyProcessedCount}</div>
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
            <CardTitle className="text-xs text-muted-foreground font-medium">マネージャー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{company.managerCount}</div>
            <div className="text-xs text-muted-foreground mt-1">名</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">ユーザー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{company.userCount}</div>
            <div className="text-xs text-muted-foreground mt-1">名</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">メンバー</TabsTrigger>
          <TabsTrigger value="settings">設定 / Drive 接続</TabsTrigger>
          <TabsTrigger value="ledger">最近の処理</TabsTrigger>
        </TabsList>

        <TabsContent value="members">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>マネージャー / ユーザー</CardTitle>
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
                          {ROLE_LABEL[m.role as "manager" | "user"]}
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
              <CardTitle>会社設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Google Drive 監視フォルダ連携</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    フォルダに置かれた PDF/画像を自動で OCR → 台帳に追記
                  </div>
                </div>
                <Switch defaultChecked={company.driveConnected} />
              </div>
              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">
                    ユーザー視点(自社 = 発行元 / 受領側)
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    現在: <span className="font-medium">{company.userRole === "issuer" ? "発行元 (取引先=御中の側)" : "受領側 (取引先=発行元)"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger">
          <Card>
            <CardHeader>
              <CardTitle>最近の処理 ({ledger.length} 件)</CardTitle>
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
      </Tabs>
    </PageShell>
  );
}
