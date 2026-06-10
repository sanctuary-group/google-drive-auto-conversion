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
      {/* ヒーローバナー */}
      <Card className="overflow-hidden mb-6">
        <div className="relative h-24 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 to-transparent" />
        </div>
        <CardContent className="px-6 pb-5 -mt-12">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <div className="relative shrink-0">
              <Avatar className="size-24 ring-4 ring-background shadow-sm">
                <AvatarFallback className="text-3xl bg-primary/15 text-primary font-semibold">山</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-1 right-1 size-7 rounded-full bg-foreground text-background flex items-center justify-center shadow hover:opacity-90 transition">
                <Pencil className="size-3.5" />
              </button>
            </div>
            <div className="flex-1 min-w-0 md:pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-semibold">山本 智也</h2>
                <StatusBadge variant="info">マネージャー</StatusBadge>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><AtSign className="size-3.5" />yamamoto@sky.example</span>
                <span className="flex items-center gap-1.5"><Building2 className="size-3.5" />株式会社スカイ</span>
                <span className="flex items-center gap-1.5"><Calendar className="size-3.5" />参加 2025/08/12</span>
              </div>
            </div>
            <div className="flex gap-2 md:pb-1">
              <Stat label="今月処理" value="287" unit="件" />
              <Separator orientation="vertical" className="h-10" />
              <Stat label="保護スコア" value="80" unit="%" tone="ok" />
            </div>
          </div>
        </CardContent>
      </Card>

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
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm">基本情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              <CardContent className="py-3 flex justify-between items-center">
                <div className="text-xs text-muted-foreground">最終更新: 2026/05/28</div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">キャンセル</Button>
                  <Button size="sm">変更を保存</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">プロフィール画像</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-center py-2">
                    <Avatar className="size-20">
                      <AvatarFallback className="text-2xl bg-primary/10 text-primary">山</AvatarFallback>
                    </Avatar>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="size-4" />
                    画像をアップロード
                  </Button>
                  <div className="text-[11px] text-muted-foreground text-center">PNG / JPG, 最大 2MB</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="py-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    アカウント保護
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <CheckLine done>パスワード設定済み</CheckLine>
                    <CheckLine done>2段階認証 有効</CheckLine>
                    <CheckLine>バックアップコードの保管</CheckLine>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* セキュリティ */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <KeyRound className="size-4" />
                  パスワード
                </CardTitle>
                <div className="text-xs text-muted-foreground">最終変更: 3 ヶ月前</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="cur" className="text-xs">現在のパスワード</Label>
                  <Input id="cur" type="password" placeholder="••••••••" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new" className="text-xs">新しいパスワード</Label>
                  <Input id="new" type="password" placeholder="••••••••" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="conf" className="text-xs">確認</Label>
                  <Input id="conf" type="password" placeholder="••••••••" />
                </div>
                <div className="rounded-md border bg-muted/30 p-3 space-y-1.5">
                  <div className="text-xs font-medium">パスワード要件</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2"><Check className="size-3 text-emerald-500" />8 文字以上</li>
                    <li className="flex items-center gap-2"><Check className="size-3 text-emerald-500" />数字を含む</li>
                    <li className="flex items-center gap-2"><Check className="size-3 text-muted-foreground/50" />記号を含む(推奨)</li>
                  </ul>
                </div>
                <Button className="w-full">パスワードを変更</Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="size-4" />
                    二段階認証
                    <StatusBadge variant="ok">有効</StatusBadge>
                  </CardTitle>
                  <div className="text-xs text-muted-foreground">
                    Authenticator アプリで生成されるコードでログインを保護
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
                      バックアップコード
                    </Button>
                    <Button variant="outline" size="sm">デバイスを追加</Button>
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
                <CardContent className="space-y-2 text-sm">
                  <DangerRow label="アカウント一時停止" description="ログイン不可・データは保持" action="一時停止" />
                  <DangerRow label="アカウント削除" description="個人データを完全削除(復旧不可)" action="削除" />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* 通知 */}
        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <CircleAlert className="size-4 text-amber-500" />
                  処理ステータス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <NotifRow label="抽出失敗" description="OCR や項目抽出に失敗したとき" channels={["email", "inapp"]} defaultChecked />
                <NotifRow label="部分抽出" description="一部の項目が抽出できなかったとき" channels={["inapp"]} />
                <NotifRow label="未処理ファイル滞留" description="Drive に 10 件以上溜まったとき" channels={["email"]} defaultChecked />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <UserRound className="size-4 text-blue-500" />
                  メンバー・操作
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <NotifRow label="招待ステータス変更" channels={["inapp"]} defaultChecked />
                <NotifRow label="権限変更があったとき" channels={["email", "inapp"]} defaultChecked />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="size-4 text-violet-500" />
                  サマリー・お知らせ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <NotifRow label="月次サマリー" description="毎月 1 日にメール送信" channels={["email"]} defaultChecked />
                <NotifRow label="プロダクトお知らせ" description="新機能・メンテナンス" channels={["email"]} />
                <NotifRow label="Slack 通知" description="Webhook 経由で転送" channels={["slack"]} />
              </CardContent>
            </Card>
          </div>
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
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <SessionCard device="MacBook Pro" browser="Chrome 130" os="macOS 15.2" loc="東京, JP" ip="203.0.113.42" lastActive="アクティブ" icon="laptop" current />
                <SessionCard device="iPhone 15" browser="Safari" os="iOS 18.2" loc="東京, JP" ip="203.0.113.42" lastActive="2 時間前" icon="phone" />
                <SessionCard device="Windows Desktop" browser="Edge 129" os="Windows 11" loc="大阪, JP" ip="198.51.100.7" lastActive="7 日前" icon="laptop" stale />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}

function Stat({ label, value, unit, tone }: { label: string; value: string; unit: string; tone?: "ok" }) {
  return (
    <div className="text-right">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="flex items-baseline justify-end gap-1">
        <span className={`text-2xl font-bold tabular-nums ${tone === "ok" ? "text-emerald-600" : ""}`}>{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
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
      <div className="space-y-0.5 min-w-0">
        <div className="text-sm font-medium truncate">{label}</div>
        <div className="text-xs text-muted-foreground truncate">{description}</div>
      </div>
      <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10 shrink-0">
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
