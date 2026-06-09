import Link from "next/link";
import { Download, Search } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LedgerStatusBadge } from "@/components/status-badge";
import { ledgerEntries } from "@/mocks/ledger";

export default function LedgerListPage() {
  return (
    <PageShell
      title="取引台帳"
      description="OCR+正規表現で抽出した請求書/領収書のエントリ一覧"
      actions={
        <Button variant="outline">
          <Download className="size-4" />
          CSV エクスポート
        </Button>
      }
    >
      <Card className="p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="取引先・ファイル名で検索" />
          </div>
          <Select defaultValue="all-doctype">
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all-doctype">すべての種別</SelectItem>
              <SelectItem value="invoice">請求書</SelectItem>
              <SelectItem value="receipt">領収書</SelectItem>
              <SelectItem value="quote">見積書</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">すべての状態</SelectItem>
              <SelectItem value="ok">OK</SelectItem>
              <SelectItem value="partial">部分抽出</SelectItem>
              <SelectItem value="ng">NG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">処理日時</TableHead>
              <TableHead>ファイル名</TableHead>
              <TableHead>種別</TableHead>
              <TableHead>取引先</TableHead>
              <TableHead>発行日</TableHead>
              <TableHead>書類番号</TableHead>
              <TableHead className="text-right">合計</TableHead>
              <TableHead className="text-right">小計</TableHead>
              <TableHead className="text-right">消費税</TableHead>
              <TableHead>状態</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ledgerEntries.map((l) => (
              <TableRow key={l.id} className="cursor-pointer hover:bg-muted/40">
                <TableCell className="text-xs text-muted-foreground font-mono">{l.processedAt.slice(5)}</TableCell>
                <TableCell className="max-w-[260px]">
                  <Link href={`/app/ledger/${l.id}`} className="text-sm hover:underline truncate block">
                    {l.fileName}
                  </Link>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{l.docType}</TableCell>
                <TableCell className="text-sm">{l.vendor}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{l.issueDate}</TableCell>
                <TableCell className="text-xs font-mono">{l.docNumber || "—"}</TableCell>
                <TableCell className="text-right tabular-nums font-medium">¥{l.total.toLocaleString()}</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">{l.subtotal ? `¥${l.subtotal.toLocaleString()}` : "—"}</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">{l.tax ? `¥${l.tax.toLocaleString()}` : "—"}</TableCell>
                <TableCell><LedgerStatusBadge status={l.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageShell>
  );
}
