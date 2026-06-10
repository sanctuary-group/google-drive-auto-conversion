"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto inline-flex size-14 rounded-2xl bg-primary/10 text-primary items-center justify-center">
          <CheckCircle2 className="size-7" />
        </div>
        <CardTitle>メールを確認してください</CardTitle>
        <CardDescription>
          ご登録のメールアドレス宛に確認リンクを送信しました。<br />
          リンクをクリックして登録を完了してください。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xs text-muted-foreground space-y-2 border rounded-md p-3 bg-muted/30">
          <div className="font-medium text-foreground">届かない場合</div>
          <ul className="list-disc list-inside space-y-1">
            <li>迷惑メールフォルダをご確認ください</li>
            <li>数分待っても届かない場合は再送できます</li>
            <li>メールアドレスを間違えていないかご確認ください</li>
          </ul>
        </div>
        <Button variant="outline" className="w-full">確認メールを再送</Button>
        <Button asChild className="w-full">
          <Link href="/admin/tenants">確認しました(モック: マスター画面へ)</Link>
        </Button>
        <div className="text-center text-xs text-muted-foreground">
          <Link href="/login" className="text-primary underline">
            別のアカウントでログイン
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
