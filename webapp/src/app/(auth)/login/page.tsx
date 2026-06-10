"use client";

import Link from "next/link";
import { Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto inline-flex size-11 rounded-2xl bg-primary text-primary-foreground items-center justify-center">
          <Receipt className="size-5" />
        </div>
        <CardTitle>Ledger SaaS</CardTitle>
        <CardDescription>
          請求書 OCR → 取引台帳の自動化サービス
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" type="email" placeholder="you@example.com" defaultValue="yamamoto@sky.example" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pw">パスワード</Label>
          <Input id="pw" type="password" defaultValue="********" />
        </div>
        <Button asChild className="w-full">
          <Link href="/admin/tenants">ログイン</Link>
        </Button>
        <div className="text-center text-xs text-muted-foreground">
          または
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link href="/admin/tenants">Google でログイン (モック)</Link>
        </Button>
        <div className="border-t pt-4 space-y-2 text-xs text-muted-foreground">
          <div className="font-medium text-foreground">モック用 ショートカット</div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/tenants">マスター管理画面へ</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/app/dashboard">会社ワークスペースへ</Link>
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            ログイン後、画面右上の「モックロール」セレクターで「マスター管理 / マネージャー / ユーザー」を切替できます。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
