import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, RotateCw } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LedgerStatusBadge } from "@/components/status-badge";
import { getLedgerById } from "@/mocks/ledger";

export default async function LedgerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const e = getLedgerById(id);
  if (!e) notFound();

  return (
    <PageShell
      title={e.fileName}
      description={`処理日時 ${e.processedAt}`}
      actions={
        <div className="flex items-center gap-2">
          <LedgerStatusBadge status={e.status} />
          <Button asChild variant="outline" size="sm">
            <Link href="/app/ledger">
              <ArrowLeft className="size-4" />
              一覧
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <RotateCw className="size-4" />
            再 OCR
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={e.fileLink} target="_blank" rel="noreferrer">
              <ExternalLink className="size-4" />
              元ファイル
            </a>
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>抽出データ (編集可能)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="種別" defaultValue={e.docType} />
            <Field label="取引先" defaultValue={e.vendor} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="発行日" defaultValue={e.issueDate} />
              <Field label="支払期限" defaultValue={e.paymentDueDate} />
            </div>
            <Field label="書類番号" defaultValue={e.docNumber} />
            <div className="grid grid-cols-3 gap-3">
              <Field label="合計" defaultValue={e.total ? `¥${e.total.toLocaleString()}` : ""} />
              <Field label="小計" defaultValue={e.subtotal ? `¥${e.subtotal.toLocaleString()}` : ""} />
              <Field label="消費税" defaultValue={e.tax ? `¥${e.tax.toLocaleString()}` : ""} />
            </div>
            <div className="grid gap-2">
              <Label>内容サマリー</Label>
              <Textarea defaultValue={e.contentSummary} rows={2} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline">破棄</Button>
              <Button>保存</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>抽出元テキスト (rawText)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted/40 rounded-md p-4 text-xs leading-relaxed whitespace-pre-wrap font-mono max-h-[640px] overflow-y-auto">
              {e.rawText}
            </pre>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input defaultValue={defaultValue ?? ""} />
    </div>
  );
}
