import { Download } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";

const invoices = [
  { id: "INV-202604", month: "2026/4", amount: 49800, status: "支払済み", paidAt: "2026/5/8" },
  { id: "INV-202603", month: "2026/3", amount: 49800, status: "支払済み", paidAt: "2026/4/8" },
  { id: "INV-202602", month: "2026/2", amount: 39800, status: "支払済み", paidAt: "2026/3/8" },
  { id: "INV-202601", month: "2026/1", amount: 39800, status: "支払済み", paidAt: "2026/2/8" },
];

export default function BillingPage() {
  return (
    <PageShell
      title="プラン・請求"
      description="現在のプランと過去の請求書を確認できます"
    >
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">現在のプラン</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Enterprise</div>
            <div className="text-xs text-muted-foreground mt-1">月額 ¥49,800 + ユーザー単価</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">今月の利用量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">287 件</div>
            <div className="text-xs text-muted-foreground mt-1">無料枠 500 件 / 月</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">次回請求</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥49,800</div>
            <div className="text-xs text-muted-foreground mt-1">2026/6/30 請求予定</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>請求履歴</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>請求書 No.</TableHead>
                <TableHead>対象月</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>支払日</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-mono text-xs">{i.id}</TableCell>
                  <TableCell>{i.month}</TableCell>
                  <TableCell className="text-right tabular-nums">¥{i.amount.toLocaleString()}</TableCell>
                  <TableCell><StatusBadge variant="ok">{i.status}</StatusBadge></TableCell>
                  <TableCell className="text-muted-foreground">{i.paidAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="size-4" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  );
}
