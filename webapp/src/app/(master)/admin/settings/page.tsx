import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <PageShell title="テナント設定" description="ブランディング、通知、API 連携の設定">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="tname">テナント名</Label>
              <Input id="tname" defaultValue="株式会社スカイ" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">通知先メール</Label>
              <Input id="email" type="email" defaultValue="ops@sky.example" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>通知</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingRow label="抽出失敗時にメール通知" />
            <SettingRow label="月次レポートを送信" />
            <SettingRow label="Gemini 呼出上限到達時に通知" defaultChecked={false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API 連携</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SettingRow label="Google Drive 連携" />
            <SettingRow label="freee 連携" defaultChecked={false} />
            <SettingRow label="マネーフォワード 連携" defaultChecked={false} />
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
