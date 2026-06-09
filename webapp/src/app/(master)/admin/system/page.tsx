import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";

const logs = [
  { ts: "2026-06-09 09:14", level: "INFO", source: "OCR", message: "Drive Watcher 起動 (tenant=sky)" },
  { ts: "2026-06-09 09:14", level: "INFO", source: "Parser", message: "23 ファイル処理開始" },
  { ts: "2026-06-09 09:15", level: "WARN", source: "Parser", message: "Mira.pdf: 行欠落 (Phase 9 で調査中)" },
  { ts: "2026-06-09 09:15", level: "WARN", source: "Parser", message: "オールライト.pdf: 行欠落" },
  { ts: "2026-06-09 09:16", level: "INFO", source: "Sheets", message: "台帳に 21 行を追記" },
  { ts: "2026-06-09 08:42", level: "INFO", source: "Gemini", message: "API 呼び出し 0 件 (正規表現でカバー)" },
];

export default function SystemPage() {
  return (
    <PageShell
      title="システム監視"
      description="OCR / Parser / Gemini API の利用状況とエラーログ"
    >
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">本日の処理件数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">128</div>
            <div className="text-xs text-muted-foreground mt-1">前日比 +12%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">抽出成功率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">91.3%</div>
            <div className="text-xs text-muted-foreground mt-1">直近 30 日</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">Gemini 呼出</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">14 / 1500</div>
            <div className="text-xs text-muted-foreground mt-1">本日 / 無料枠上限</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground font-medium">エラー率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums text-destructive">2.1%</div>
            <div className="text-xs text-muted-foreground mt-1">直近 24 時間</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近のシステムログ</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>時刻</TableHead>
                <TableHead>レベル</TableHead>
                <TableHead>ソース</TableHead>
                <TableHead>メッセージ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((l, i) => (
                <TableRow key={i}>
                  <TableCell className="text-xs text-muted-foreground font-mono">{l.ts}</TableCell>
                  <TableCell>
                    <StatusBadge variant={l.level === "INFO" ? "muted" : l.level === "WARN" ? "warn" : "ng"}>
                      {l.level}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{l.source}</TableCell>
                  <TableCell className="text-sm">{l.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  );
}
