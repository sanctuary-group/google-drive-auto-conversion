"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const STEPS = [
  { id: 1, title: "テナント情報", desc: "組織名・連絡先" },
  { id: 2, title: "プラン選択", desc: "月額プラン・課金単位" },
  { id: 3, title: "管理者招待", desc: "テナント管理者の追加" },
  { id: 4, title: "完了", desc: "Drive 連携・運用開始" },
];

export default function OnboardingPage() {
  const currentStep = 2; // モックでは Step 2 表示

  return (
    <PageShell
      title="新規テナント立ち上げ"
      description="新しい顧客テナントを 4 ステップで開設します"
    >
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Stepper */}
        <Card className="lg:sticky lg:top-4 h-fit">
          <CardContent className="py-5 space-y-3">
            {STEPS.map((s) => {
              const done = s.id < currentStep;
              const active = s.id === currentStep;
              return (
                <div key={s.id} className="flex items-start gap-3">
                  <div
                    className={`size-7 rounded-full border-2 inline-flex items-center justify-center text-xs font-semibold shrink-0 ${
                      done
                        ? "bg-primary border-primary text-primary-foreground"
                        : active
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="size-3.5" /> : s.id}
                  </div>
                  <div className="pt-0.5">
                    <div className={`text-sm font-medium ${active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                      {s.title}
                    </div>
                    <div className="text-xs text-muted-foreground/80">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Current Step Body */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Step 2: プランを選択</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="standard" className="space-y-3">
                <PlanCard value="free" name="Free" price="¥0" desc="評価用 / 月 50 件まで" />
                <PlanCard value="standard" name="Standard" price="¥19,800/月" desc="月 200 件 + ユーザー 5 名まで" />
                <PlanCard value="enterprise" name="Enterprise" price="¥49,800/月" desc="月 500 件 + ユーザー無制限・SSO/API・優先サポート" recommended />
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">トライアル期間</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label>開始日</Label>
                  <Input type="date" defaultValue="2026-06-10" />
                </div>
                <div className="grid gap-1.5">
                  <Label>トライアル期間</Label>
                  <Input defaultValue="14 日" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                トライアル終了後、自動的に選択したプランに移行します(クレジットカード未登録の場合は Free に切替)。
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline">
              ← 戻る
            </Button>
            <Button asChild>
              <Link href="/admin/onboarding">
                次へ
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function PlanCard({ value, name, price, desc, recommended }: { value: string; name: string; price: string; desc: string; recommended?: boolean }) {
  return (
    <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-muted/30 has-[input:checked]:border-primary has-[input:checked]:bg-primary/[0.03]">
      <RadioGroupItem value={value} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{name}</span>
          {recommended && <span className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded">推奨</span>}
        </div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <div className="text-sm font-medium">{price}</div>
    </label>
  );
}
