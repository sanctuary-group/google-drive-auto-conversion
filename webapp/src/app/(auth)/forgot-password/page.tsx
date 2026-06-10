"use client";

import Link from "next/link";
import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto inline-flex size-11 rounded-2xl bg-primary text-primary-foreground items-center justify-center">
          <KeyRound className="size-5" />
        </div>
        <CardTitle>パスワードを忘れた方</CardTitle>
        <CardDescription>
          登録メールアドレスを入力してください。パスワード再設定用のリンクをお送りします。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">メールアドレス</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <Button className="w-full">再設定リンクを送信</Button>
        <div className="text-center text-xs text-muted-foreground">
          <Link href="/login" className="text-primary underline">
            ログイン画面に戻る
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
