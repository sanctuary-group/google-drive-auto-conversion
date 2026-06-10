"use client";

import Link from "next/link";
import { Receipt } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto inline-flex size-11 rounded-2xl bg-primary text-primary-foreground items-center justify-center">
          <Receipt className="size-5" />
        </div>
        <CardTitle>新規登録</CardTitle>
        <CardDescription>14 日間のトライアル(クレジットカード不要)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="org">組織名(会社名)</Label>
          <Input id="org" placeholder="株式会社 ◯◯" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">担当者名</Label>
          <Input id="name" placeholder="山田 太郎" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pw">パスワード(8 文字以上)</Label>
          <Input id="pw" type="password" />
        </div>
        <div className="text-xs text-muted-foreground">
          登録すると、
          <a className="text-primary underline" href="#">利用規約</a>
          {" / "}
          <a className="text-primary underline" href="#">プライバシーポリシー</a>
          に同意したものとみなされます。
        </div>
        <Button asChild className="w-full">
          <Link href="/verify-email">アカウントを作成</Link>
        </Button>
        <div className="text-center text-xs text-muted-foreground">
          すでにアカウントをお持ちですか?{" "}
          <Link href="/login" className="text-primary underline">
            ログイン
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
