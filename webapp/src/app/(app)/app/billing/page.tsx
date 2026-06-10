import { Download } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";

const usage = [
  { month: "2026/01", count: 154, fee: 0, overage: 0 },
  { month: "2026/02", count: 168, fee: 0, overage: 0 },
  { month: "2026/03", count: 187, fee: 0, overage: 0 },
  { month: "2026/04", count: 220, fee: 0, overage: 0 },
  { month: "2026/05", count: 287, fee: 0, overage: 0 },
];
const MAX = Math.max(...usage.map((u) => u.count));

const charges = [
  { id: "CH-202605", month: "2026/5", amount: 24900, dueDate: "2026/6/30", status: "請求中" as const },
  { id: "CH-202604", month: "2026/4", amount: 24900, dueDate: "2026/5/31", status: "支払済み" as const },
  { id: "CH-202603", month: "2026/3", amount: 24900, dueDate: "2026/4/30", status: "支払済み" as const },
];

export default function AppBillingPage() {
  return (
    <PageShell
      title="プラン・利用量"
      description="株式会社スカイ 本体 の利用状況"
    >
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">現在のプラン</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Enterprise</div>
            <div className="text-xs text-muted-foreground mt-1">月額 ¥24,900 (会社単位)</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">今月の処理</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">287 件</div>
            <div className="text-xs text-muted-foreground mt-1">無料枠 500 件 / 月</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">月次想定額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">¥24,900</div>
            <div className="text-xs text-muted-foreground mt-1">枠内のため追加なし</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">プラン更新日</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">2026/6/30</div>
            <div className="text-xs text-muted-foreground mt-1">自動更新オン</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">月次利用量(直近 5 ヶ月)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {usage.map((u) => (
                <div key={u.month} className="grid grid-cols-[80px_1fr_60px] items-center gap-3">
                  <div className="text-xs text-muted-foreground font-mono">{u.month}</div>
                  <div className="h-5 bg-muted/40 rounded overflow-hidden">
                    <div className="h-full bg-primary/70" style={{ width: `${(u.count / MAX) * 100}%` }} />
                  </div>
                  <div className="text-right text-xs tabular-nums">{u.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">請求履歴</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>請求 ID</TableHead>
                  <TableHead>対象月</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                  <TableHead>状態</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {charges.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono text-xs">{c.id}</TableCell>
                    <TableCell>{c.month}</TableCell>
                    <TableCell className="text-right tabular-nums">¥{c.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusBadge variant={c.status === "支払済み" ? "ok" : "warn"}>{c.status}</StatusBadge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Download className="size-3.5" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
