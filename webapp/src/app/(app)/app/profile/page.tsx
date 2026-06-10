import {
  AtSign,
  Building2,
  Calendar,
  Check,
  CircleAlert,
  FileText,
  Globe,
  KeyRound,
  Laptop,
  Mail,
  MessageSquare,
  Pencil,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TriangleAlert,
  Upload,
  UserRound,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";

export default function ProfilePage() {
  return (
    <PageShell title="マイアカウント" description="自分のプロフィール・セキュリティ・通知設定">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* 左: プロフィールサマリー */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />
            <CardContent className="-mt-10 space-y-4 text-center">
              <div className="relative inline-block">
                <Avatar className="size-20 ring-4 ring-background mx-auto">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary font-semibold">山</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm hover:bg-primary/90 transition">
                  <Pencil className="size-3.5" />
                </button>
              </div>
              <div>
                <div className="font-semibold text-base">山本 智也</div>
                <div className="text-xs text-muted-foreground mt-0.5">yamamoto@sky.example</div>
              </div>
              <StatusBadge variant="info">マネージャー</StatusBadge>
            </CardContent>
            <Separator />
            <CardContent className="py-4 space-y-2.5 text-xs">
              <InfoLine icon={<Building2 className="size-3.5" />} label="所属" value="株式会社スカイ" />
              <InfoLine icon={<Calendar className="size-3.5" />} label="参加日" value="2025/08/12" />
              <InfoLine icon={<Sparkles className="size-3.5" />} label="今月処理" value="287 件" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck className="size-4 text-emerald-500" />
                アカウント保護: 強
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <CheckLine done>パスワード設定済み</CheckLine>
                <CheckLine done>2段階認証 有効</CheckLine>
                <CheckLine>バックアップコードの保管</CheckLine>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右: タブ */}
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">
              <UserRound className="size-4" />
              プロフィール
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="size-4" />
              セキュリティ
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Mail className="size-4" />
              通知
            </TabsTrigger>
            <TabsTrigger value="sessions">
              <Laptop className="size-4" />
              セッション
            </TabsTrigger>
          </TabsList>

          {/* プロフィール */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">基本情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-dashed">
                  <Avatar className="size-14">
                    <AvatarFallback className="text-lg bg-primary/10 text-primary">山</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">プロフィール画像</div>
                    <div className="text-xs text-muted-foreground mt-0.5">PNG / JPG, 最大 2MB</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="size-4" />
                    変更
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field id="lname" label="姓" defaultValue="山本" />
                  <Field id="fname" label="名" defaultValue="智也" />
                </div>
                <Field id="display" label="表示名" defaultValue="山本 智也" hint="台帳・通知・操作履歴に表示されます" />
                <Field id="email" label="メールアドレス" defaultValue="yamamoto@sky.example" icon={<AtSign className="size-4" />} disabled hint="変更は管理者にお問い合わせください" />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="lang" className="text-xs">言語</Label>
                    <Select defaultValue="ja">
                      <SelectTrigger id="lang">
                        <Globe className="size-4 text-muted-foreground" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tz" className="text-xs">タイムゾーン</Label>
                    <Select defaultValue="tokyo">
                      <SelectTrigger id="tz">
                        <Calendar className="size-4 text-muted-foreground" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tokyo">(GMT+09:00) 東京</SelectItem>
                        <SelectItem value="utc">(GMT) UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardContent className="py-4 flex justify-between items-center">
                <div className="text-xs text-muted-foreground">最終更新: 2026/05/28</div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">キャンセル</Button>
                  <Button size="sm">変更を保存</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* セキュリティ */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <KeyRound className="size-4" />
                    パスワード
                  </CardTitle>
                  <div className="text-xs text-muted-foreground">最終変更: 3 ヶ月前</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="cur" className="text-xs">現在のパスワード</Label>
                  <Input id="cur" type="password" placeholder="••••••••" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="new" className="text-xs">新しいパスワード</Label>
                    <Input id="new" type="password" placeholder="••••••••" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="conf" className="text-xs">新しいパスワード(確認)</Label>
                    <Input id="conf" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="rounded-md border bg-muted/30 p-3 space-y-1.5">
                  <div className="text-xs font-medium">パスワード要件</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2"><Check className="size-3 text-emerald-500" /> 8 文字以上</li>
                    <li className="flex items-center gap-2"><Check className="size-3 text-emerald-500" /> 数字を含む</li>
                    <li className="flex items-center gap-2"><Check className="size-3 text-muted-foreground/50" /> 記号を含む(推奨)</li>
                  </ul>
                </div>
                <div className="flex justify-end">
                  <Button>パスワードを変更</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="size-4" />
                      二段階認証 (2FA)
                      <StatusBadge variant="ok">有効</StatusBadge>
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      Authenticator アプリで生成されるコードでログインを保護
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <Smartphone className="size-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Google Authenticator</div>
                      <div className="text-xs text-muted-foreground">登録: 2025/08/12</div>
                    </div>
                  </div>
                  <StatusBadge variant="ok">プライマリ</StatusBadge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="size-4" />
                    バックアップコードを表示
                  </Button>
                  <Button variant="outline" size="sm">別のデバイスを追加</Button>
                  <Button variant="destructive" size="sm" className="ml-auto">2FA を解除</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                  <TriangleAlert className="size-4" />
                  危険ゾーン
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <DangerRow
                  label="アカウントを一時停止"
                  description="ログインできなくなりますが、データは保持されます"
                  action="一時停止"
                />
                <DangerRow
                  label="アカウントを削除"
                  description="すべての個人データが削除されます(復旧不可)"
                  action="削除"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知 */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <CircleAlert className="size-4" />
                  処理ステータス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <NotifRow
                  label="抽出失敗"
                  description="OCR や項目抽出に失敗したとき"
                  channels={["email", "inapp"]}
                  defaultChecked
                />
                <NotifRow
                  label="部分抽出"
                  description="一部の項目が抽出できなかったとき"
                  channels={["inapp"]}
                />
                <NotifRow
                  label="未処理ファイルが溜まったとき"
                  description="Drive 監視フォルダに 10 件以上滞留"
                  channels={["email"]}
                  defaultChecked
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <UserRound className="size-4" />
                  メンバー・操作
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <NotifRow label="メンバー招待のステータス変更" channels={["inapp"]} defaultChecked />
                <NotifRow label="権限の変更があったとき" channels={["email", "inapp"]} defaultChecked />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="size-4" />
                  サマリー・お知らせ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <NotifRow label="月次サマリーレポート" description="毎月 1 日にメール送信" channels={["email"]} defaultChecked />
                <NotifRow label="プロダクトのお知らせ" description="新機能・メンテナンス情報" channels={["email"]} />
                <NotifRow label="Slack 通知" description="Webhook 経由で Slack に転送" channels={["slack"]} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* セッション */}
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm">アクティブなセッション</CardTitle>
                  <div className="text-xs text-muted-foreground mt-1">現在ログイン中のすべての端末</div>
                </div>
                <Button variant="destructive" size="sm">他端末からすべてログアウト</Button>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <SessionCard device="MacBook Pro" browser="Chrome 130" os="macOS 15.2" loc="東京, JP" ip="203.0.113.42" lastActive="アクティブ" icon="laptop" current />
                <SessionCard device="iPhone 15" browser="Safari" os="iOS 18.2" loc="東京, JP" ip="203.0.113.42" lastActive="2 時間前" icon="phone" />
                <SessionCard device="Windows Desktop" browser="Edge 129" os="Windows 11" loc="大阪, JP" ip="198.51.100.7" lastActive="7 日前" icon="laptop" stale />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}

function Field({
  id,
  label,
  defaultValue,
  hint,
  icon,
  disabled,
}: {
  id: string;
  label: string;
  defaultValue?: string;
  hint?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-xs">{label}</Label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </span>
        )}
        <Input id={id} defaultValue={defaultValue} disabled={disabled} className={icon ? "pl-9" : ""} />
      </div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

function InfoLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function CheckLine({ done, children }: { done?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-4 rounded-full flex items-center justify-center ${done ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground/50"}`}>
        <Check className="size-2.5" />
      </span>
      <span className={done ? "" : "text-muted-foreground/70"}>{children}</span>
    </div>
  );
}

function DangerRow({ label, description, action }: { label: string; description: string; action: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border p-3">
      <div className="space-y-0.5">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
        {action}
      </Button>
    </div>
  );
}

type Channel = "email" | "inapp" | "slack";
const CHANNEL_META: Record<Channel, { label: string; icon: React.ReactNode }> = {
  email: { label: "メール", icon: <Mail className="size-3" /> },
  inapp: { label: "アプリ内", icon: <CircleAlert className="size-3" /> },
  slack: { label: "Slack", icon: <MessageSquare className="size-3" /> },
};

function NotifRow({
  label,
  description,
  channels,
  defaultChecked = false,
}: {
  label: string;
  description?: string;
  channels: Channel[];
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b last:border-0">
      <div className="space-y-0.5 min-w-0">
        <div className="text-sm font-medium">{label}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {channels.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {CHANNEL_META[c].icon}
              {CHANNEL_META[c].label}
            </span>
          ))}
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function SessionCard({
  device,
  browser,
  os,
  loc,
  ip,
  lastActive,
  icon,
  current,
  stale,
}: {
  device: string;
  browser: string;
  os: string;
  loc: string;
  ip: string;
  lastActive: string;
  icon: "laptop" | "phone";
  current?: boolean;
  stale?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border p-4 transition ${current ? "border-primary/30 bg-primary/5" : ""}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${current ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
          {icon === "laptop" ? <Laptop className="size-5" /> : <Smartphone className="size-5" />}
        </div>
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium truncate">{device}</span>
            {current && <StatusBadge variant="ok">このセッション</StatusBadge>}
            {stale && <StatusBadge variant="muted">非アクティブ</StatusBadge>}
          </div>
          <div className="text-xs text-muted-foreground truncate">{browser} · {os}</div>
          <div className="text-[11px] text-muted-foreground font-mono">{loc} · {ip} · {lastActive}</div>
        </div>
      </div>
      {!current && (
        <Button variant="ghost" size="sm">ログアウト</Button>
      )}
    </div>
  );
}
