import { Download, FileDown, Loader2, RotateCw } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { exportJobs, FORMAT_LABEL } from "@/mocks/exports";

export default function ExportsPage() {
  return (
    <PageShell
      title="エクスポート"
      description="取引台帳を CSV や会計ソフト形式で書き出します"
      actions={
        <Button>
          <FileDown className="size-4" />
          新規エクスポート
        </Button>
      }
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm">クイックエクスポート</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-3">
            <div className="grid gap-1.5">
              <label className="text-xs text-muted-foreground">フォーマット</label>
              <Select defaultValue="csv">
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (汎用)</SelectItem>
                  <SelectItem value="freee">freee 取引データ</SelectItem>
                  <SelectItem value="moneyForward">マネーフォワード</SelectItem>
                  <SelectItem value="yayoi">弥生会計</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs text-muted-foreground">期間</label>
              <Select defaultValue="last-month">
                <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">今月</SelectItem>
                  <SelectItem value="last-month">先月</SelectItem>
                  <SelectItem value="last-3-months">直近 3 ヶ月</SelectItem>
                  <SelectItem value="custom">カスタム</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <FileDown className="size-4" />
              エクスポート実行
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">エクスポート履歴</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>実行日時</TableHead>
                <TableHead>フォーマット</TableHead>
                <TableHead>期間</TableHead>
                <TableHead className="text-right">件数</TableHead>
                <TableHead>実行者</TableHead>
                <TableHead>状態</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exportJobs.map((j) => (
                <TableRow key={j.id}>
                  <TableCell className="text-xs text-muted-foreground font-mono">{j.ts}</TableCell>
                  <TableCell>{FORMAT_LABEL[j.format]}</TableCell>
                  <TableCell className="text-xs">{j.period}</TableCell>
                  <TableCell className="text-right tabular-nums">{j.rows.toLocaleString()}</TableCell>
                  <TableCell>{j.user}</TableCell>
                  <TableCell>
                    {j.status === "completed" && <StatusBadge variant="ok">完了</StatusBadge>}
                    {j.status === "processing" && (
                      <span className="inline-flex items-center gap-1 text-xs text-sky-600">
                        <Loader2 className="size-3 animate-spin" />
                        処理中
                      </span>
                    )}
                    {j.status === "failed" && <StatusBadge variant="ng">失敗</StatusBadge>}
                  </TableCell>
                  <TableCell>
                    {j.status === "completed" && (
                      <Button variant="ghost" size="sm">
                        <Download className="size-3.5" />
                        DL
                      </Button>
                    )}
                    {j.status === "failed" && (
                      <Button variant="ghost" size="sm">
                        <RotateCw className="size-3.5" />
                        再試行
                      </Button>
                    )}
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
