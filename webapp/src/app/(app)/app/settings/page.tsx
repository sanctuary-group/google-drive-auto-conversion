import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AppSettingsPage() {
  return (
    <PageShell title="会社設定" description="Drive 連携・税区分・通知の設定">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Google Drive 連携</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Drive 監視を有効化</span>
              <Switch defaultChecked />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="upload">監視フォルダ ID</Label>
              <Input id="upload" defaultValue="1aBcDeFgHiJkLmNoPqRsTuVwXyZ" className="font-mono text-xs" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="proc">処理済みフォルダ ID</Label>
              <Input id="proc" defaultValue="2aBcDeFgHiJkLmNoPqRsTuVwXyZ" className="font-mono text-xs" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ユーザー視点 (台帳の取引先カラム)</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="issuer" className="space-y-2">
              <label className="flex items-start gap-3 border rounded-md p-3 cursor-pointer hover:bg-muted/30">
                <RadioGroupItem value="issuer" className="mt-1" />
                <div>
                  <div className="text-sm font-medium">発行元 (issuer) — 自社が請求書を発行する立場</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    取引先カラム = 御中/様 の宛先名 (発行された相手)
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 border rounded-md p-3 cursor-pointer hover:bg-muted/30">
                <RadioGroupItem value="receiver" className="mt-1" />
                <div>
                  <div className="text-sm font-medium">受領側 (receiver) — 自社が請求書を受け取る立場</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    取引先カラム = 発行元の会社名
                  </div>
                </div>
              </label>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OCR / Parser</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingRow label="正規表現で抽出失敗した場合は Gemini API で再試行" />
            <SettingRow label="内税(税込合計)を自動で小計/税に分解" />
            <SettingRow label="源泉徴収税額を合計から除外する" defaultChecked={false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>通知</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingRow label="抽出失敗時に Slack で通知" defaultChecked={false} />
            <SettingRow label="毎月 1 日に月次サマリーをメール送信" />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>変更を保存</Button>
        </div>
      </div>
    </PageShell>
  );
}

function SettingRow({ label, defaultChecked = true }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
