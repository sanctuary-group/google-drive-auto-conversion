import { CircleAlert, FileText, FolderSync, Sparkles } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, LedgerStatusBadge } from "@/components/status-badge";
import { getLedgerByCompany } from "@/mocks/ledger";

export default function DashboardPage() {
  const ledger = getLedgerByCompany("company-sky-main");
  const total = ledger.length;
  const ok = ledger.filter((l) => l.status === "OK").length;
  const partial = ledger.filter((l) => l.status === "部分抽出").length;
  const ng = ledger.filter((l) => l.status === "NG").length;
  const recent = [...ledger].sort((a, b) => b.processedAt.localeCompare(a.processedAt)).slice(0, 6);

  return (
    <PageShell title="ダッシュボード" description="株式会社スカイ 本体 / 2026 年 4 月">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <KpiCard icon={<FileText className="size-4" />} label="今月処理件数" value={total.toString()} hint="件" />
        <KpiCard
          icon={<Sparkles className="size-4" />}
          label="抽出成功"
          value={`${total ? Math.round((ok / total) * 100) : 0}%`}
          hint={`OK ${ok} 件`}
          tone="ok"
        />
        <KpiCard
          icon={<FolderSync className="size-4" />}
          label="部分抽出 / 要確認"
          value={partial.toString()}
          hint="件 (人手で補完推奨)"
          tone="warn"
        />
        <KpiCard
          icon={<CircleAlert className="size-4" />}
          label="抽出失敗"
          value={ng.toString()}
          hint="件 (要再実行)"
          tone="ng"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近の処理</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>処理日時</TableHead>
                <TableHead>ファイル名</TableHead>
                <TableHead>取引先</TableHead>
                <TableHead>発行日</TableHead>
                <TableHead className="text-right">合計</TableHead>
                <TableHead>ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="text-xs text-muted-foreground font-mono">{l.processedAt}</TableCell>
                  <TableCell className="max-w-[280px] truncate text-sm">{l.fileName}</TableCell>
                  <TableCell>{l.vendor}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.issueDate}</TableCell>
                  <TableCell className="text-right tabular-nums">¥{l.total.toLocaleString()}</TableCell>
                  <TableCell><LedgerStatusBadge status={l.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  );
}

function KpiCard({
  icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "ok" | "warn" | "ng";
}) {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xs text-muted-foreground font-medium">{label}</CardTitle>
        <span className="text-muted-foreground">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold tabular-nums">{value}</div>
          {tone !== "default" && (
            <StatusBadge variant={tone}>
              {tone === "ok" ? "好調" : tone === "warn" ? "注意" : "要対応"}
            </StatusBadge>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{hint}</div>
      </CardContent>
    </Card>
  );
}
