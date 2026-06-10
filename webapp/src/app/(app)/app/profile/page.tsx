import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";

export default function ProfilePage() {
  return (
    <PageShell title="マイアカウント" description="自分のプロフィール・セキュリティ・通知設定">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="security">セキュリティ</TabsTrigger>
          <TabsTrigger value="notifications">通知設定</TabsTrigger>
          <TabsTrigger value="sessions">セッション</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="text-xl">山</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">画像を変更</Button>
                  <div className="text-xs text-muted-foreground mt-1">PNG / JPG, 最大 2MB</div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">名前</Label>
                <Input id="name" defaultValue="山本 智也" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input id="email" type="email" defaultValue="yamamoto@sky.example" disabled />
                <div className="text-xs text-muted-foreground">メールアドレスを変更したい場合は管理者にお問い合わせください</div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lang">言語</Label>
                <Input id="lang" defaultValue="日本語" />
              </div>
              <div className="flex justify-end">
                <Button>保存</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">パスワード変更</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="cur">現在のパスワード</Label>
                  <Input id="cur" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new">新しいパスワード</Label>
                  <Input id="new" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="conf">新しいパスワード(確認)</Label>
                  <Input id="conf" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button>パスワードを変更</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  二段階認証 (2FA)
                  <StatusBadge variant="ok">有効</StatusBadge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Authenticator アプリ(Google Authenticator / 1Password 等)で生成されるコードでログイン保護されています。
                <div className="mt-3">
                  <Button variant="outline" size="sm">バックアップコードを表示</Button>
                  <Button variant="destructive" size="sm" className="ml-2">2FA を解除</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">通知設定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SettingRow label="抽出失敗があったときメール通知" />
              <SettingRow label="部分抽出があったとき通知" defaultChecked={false} />
              <SettingRow label="メンバー招待のステータス変更を通知" />
              <SettingRow label="月次サマリーをメールで受け取る" />
              <SettingRow label="Slack 通知(Webhook 経由)" defaultChecked={false} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">アクティブなセッション</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <SessionRow device="MacBook Pro · Chrome 130" loc="東京, JP" ip="203.0.113.42" current />
              <SessionRow device="iPhone 15 · Safari" loc="東京, JP" ip="203.0.113.42" />
              <SessionRow device="Windows · Edge 129" loc="大阪, JP" ip="198.51.100.7" stale />
              <Button variant="destructive" size="sm" className="mt-2">すべての他端末からログアウト</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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

function SessionRow({ device, loc, ip, current, stale }: { device: string; loc: string; ip: string; current?: boolean; stale?: boolean }) {
  return (
    <div className="flex items-center justify-between border rounded-md p-3">
      <div className="space-y-0.5">
        <div className="text-sm font-medium flex items-center gap-2">
          {device}
          {current && <StatusBadge variant="ok">このセッション</StatusBadge>}
          {stale && <StatusBadge variant="muted">7 日前</StatusBadge>}
        </div>
        <div className="text-xs text-muted-foreground">{loc} · {ip}</div>
      </div>
      {!current && (
        <Button variant="ghost" size="sm">ログアウト</Button>
      )}
    </div>
  );
}
