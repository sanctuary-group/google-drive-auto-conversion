"use client";

import { CheckCircle2, CloudUpload, FolderSync, Loader2 } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const queueDemo = [
  { name: "請求書_2026年5月_山田太郎.pdf", state: "done" as const, msg: "抽出完了" },
  { name: "領収書_交通費.pdf", state: "processing" as const, msg: "OCR 中…" },
  { name: "見積書_2026Q2_案件A.pdf", state: "queued" as const, msg: "待機中" },
];

export default function UploadPage() {
  return (
    <PageShell
      title="PDF アップロード"
      description="Drive 監視フォルダ または 直接アップロードを切替できます"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>直接アップロード</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-xl p-12 grid place-items-center text-center gap-3 hover:bg-muted/30 transition-colors">
              <CloudUpload className="size-10 text-muted-foreground" />
              <div className="font-medium">ここに PDF / 画像 を ドラッグ&ドロップ</div>
              <div className="text-xs text-muted-foreground">
                または{" "}
                <Button variant="link" className="px-1 h-auto py-0">
                  ファイルを選択
                </Button>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="text-sm font-medium mb-1">処理キュー</div>
              {queueDemo.map((q, i) => (
                <div key={i} className="flex items-center justify-between border rounded-md px-3 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    {q.state === "done" && <CheckCircle2 className="size-4 text-primary" />}
                    {q.state === "processing" && <Loader2 className="size-4 animate-spin text-sky-500" />}
                    {q.state === "queued" && <CloudUpload className="size-4 text-muted-foreground" />}
                    <span className="truncate max-w-[360px]">{q.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{q.msg}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderSync className="size-5 text-primary" />
              Drive 連携
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm">Drive 監視を有効化</span>
              <Switch defaultChecked />
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-muted-foreground">監視フォルダ</div>
              <div className="bg-muted/40 rounded-md p-2.5 text-xs font-mono break-all">
                drive://Apps/取引台帳/UPLOAD
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="text-xs text-muted-foreground">処理済みフォルダ</div>
              <div className="bg-muted/40 rounded-md p-2.5 text-xs font-mono break-all">
                drive://Apps/取引台帳/PROCESSED
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <FolderSync className="size-4" />
              今すぐ同期
            </Button>
            <div className="text-xs text-muted-foreground border-t pt-3">
              最終同期: 2026-06-09 11:01
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
