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
  Shield,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  Upload,
  UserRound,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { FolderTabs } from "@/components/layout/folder-tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/status-badge";

export default function ProfilePage() {
  return (
    <PageShell title="マイアカウント" description="自分のプロフィール・セキュリティ・通知設定">
      <FolderTabs
        tabs={[
          { key: "profile", label: "プロフィール", icon: <UserRound className="size-4" />, content: <ProfileTab /> },
          { key: "security", label: "セキュリティ", icon: <Shield className="size-4" />, content: <SecurityTab /> },
          { key: "notifications", label: "通知", icon: <Mail className="size-4" />, content: <NotificationsTab /> },
          { key: "sessions", label: "セッション", icon: <Laptop className="size-4" />, content: <SessionsTab /> },
        ]}
      />
    </PageShell>
  );
}

/* ────────────────── プロフィール ────────────────── */
function ProfileTab() {
  return (
    <div className="divide-y">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
        <div className="flex items-center gap-4 sm:gap-5 sm:flex-1 min-w-0">
          <Avatar className="size-16 sm:size-20 shrink-0">
            <AvatarFallback className="text-xl sm:text-2xl bg-primary/15 text-primary font-semibold">山</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-semibold">山本 智也</h2>
              <StatusBadge variant="info">マネージャー</StatusBadge>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 min-w-0"><AtSign className="size-3.5 shrink-0" /><span className="truncate">yamamoto@sky.example</span></span>
              <span className="flex items-center gap-1.5"><Building2 className="size-3.5 shrink-0" />株式会社スカイ</span>
              <span className="flex items-center gap-1.5"><Calendar className="size-3.5 shrink-0" />参加 2025/08/12</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="self-stretch sm:self-auto">
          <Upload className="size-4" />
          画像を変更
        </Button>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        <SectionTitle>基本情報</SectionTitle>
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
      </div>

      <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center bg-muted/20">
        <div className="text-xs text-muted-foreground">最終更新: 2026/05/28</div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">キャンセル</Button>
          <Button size="sm">変更を保存</Button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── セキュリティ ────────────────── */
function SecurityTab() {
  return (
    <div className="divide-y">
      <div className="p-4 sm:p-6 space-y-4">
        <SectionTitle icon={<KeyRound className="size-4" />}>パスワード</SectionTitle>
        <div className="text-xs text-muted-foreground -mt-2">最終変更: 3 ヶ月前</div>
        <div className="grid gap-4 md:grid-cols-3">
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
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Check className="size-3 text-emerald-500" />8 文字以上</span>
          <span className="flex items-center gap-1.5"><Check className="size-3 text-emerald-500" />数字を含む</span>
          <span className="flex items-center gap-1.5"><Check className="size-3 text-muted-foreground/50" />記号を含む(推奨)</span>
        </div>
        <div className="flex justify-end">
          <Button size="sm">パスワードを変更</Button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <SectionTitle icon={<Shield className="size-4" />}>
            二段階認証 <StatusBadge variant="ok">有効</StatusBadge>
          </SectionTitle>
        </div>
        <div className="text-xs text-muted-foreground -mt-2">
          Authenticator アプリで生成されるコードでログインを保護
        </div>
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
          <Button variant="ghost" size="sm" className="ml-auto text-destructive hover:bg-destructive/10">2FA を解除</Button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-3">
        <SectionTitle icon={<ShieldCheck className="size-4 text-emerald-500" />}>アカウント保護</SectionTitle>
        <div className="grid gap-2 md:grid-cols-3">
          <ProtectionStat done label="パスワード" />
          <ProtectionStat done label="二段階認証" />
          <ProtectionStat label="バックアップコード" />
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-3 bg-destructive/5">
        <SectionTitle icon={<TriangleAlert className="size-4 text-destructive" />}>
          <span className="text-destructive">危険ゾーン</span>
        </SectionTitle>
        <div className="grid gap-2 md:grid-cols-2">
          <DangerRow label="アカウント一時停止" description="ログイン不可・データは保持" action="一時停止" />
          <DangerRow label="アカウント削除" description="個人データを完全削除(復旧不可)" action="削除" />
        </div>
      </div>
    </div>
  );
}

/* ────────────────── 通知 ────────────────── */
function NotificationsTab() {
  return (
    <div className="divide-y">
      <NotifSection icon={<CircleAlert className="size-4 text-amber-500" />} title="処理ステータス">
        <NotifRow label="抽出失敗" description="OCR や項目抽出に失敗したとき" channels={["email", "inapp"]} defaultChecked />
        <NotifRow label="部分抽出" description="一部の項目が抽出できなかったとき" channels={["inapp"]} />
        <NotifRow label="未処理ファイル滞留" description="Drive に 10 件以上溜まったとき" channels={["email"]} defaultChecked />
      </NotifSection>
      <NotifSection icon={<UserRound className="size-4 text-blue-500" />} title="メンバー・操作">
        <NotifRow label="招待ステータス変更" channels={["inapp"]} defaultChecked />
        <NotifRow label="権限変更があったとき" channels={["email", "inapp"]} defaultChecked />
      </NotifSection>
      <NotifSection icon={<MessageSquare className="size-4 text-violet-500" />} title="サマリー・お知らせ">
        <NotifRow label="月次サマリー" description="毎月 1 日にメール送信" channels={["email"]} defaultChecked />
        <NotifRow label="プロダクトお知らせ" description="新機能・メンテナンス" channels={["email"]} />
        <NotifRow label="Slack 通知" description="Webhook 経由で転送" channels={["slack"]} />
      </NotifSection>
    </div>
  );
}

/* ────────────────── セッション ────────────────── */
function SessionsTab() {
  return (
    <div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <SectionTitle>アクティブなセッション</SectionTitle>
          <div className="text-xs text-muted-foreground mt-1">現在ログイン中のすべての端末</div>
        </div>
        <Button variant="destructive" size="sm" className="w-full sm:w-auto">他端末からすべてログアウト</Button>
      </div>
      <Separator />
      <div className="p-4 sm:p-6 grid gap-3 md:grid-cols-2">
        <SessionCard device="MacBook Pro" browser="Chrome 130" os="macOS 15.2" loc="東京, JP" ip="203.0.113.42" lastActive="アクティブ" icon="laptop" current />
        <SessionCard device="iPhone 15" browser="Safari" os="iOS 18.2" loc="東京, JP" ip="203.0.113.42" lastActive="2 時間前" icon="phone" />
        <SessionCard device="Windows Desktop" browser="Edge 129" os="Windows 11" loc="大阪, JP" ip="198.51.100.7" lastActive="7 日前" icon="laptop" stale />
      </div>
    </div>
  );
}

/* ────────────────── 部品 ────────────────── */
function SectionTitle({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold flex items-center gap-2">
      {icon}
      {children}
    </h3>
  );
}

function Field({
  id, label, defaultValue, hint, icon, disabled,
}: {
  id: string; label: string; defaultValue?: string; hint?: string; icon?: React.ReactNode; disabled?: boolean;
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

function ProtectionStat({ done, label }: { done?: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 rounded-md border p-3 text-sm ${done ? "bg-emerald-500/5 border-emerald-500/30" : "bg-muted/30"}`}>
      <span className={`size-5 rounded-full flex items-center justify-center ${done ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}>
        <Check className="size-3" />
      </span>
      <span className={done ? "" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}

function DangerRow({ label, description, action }: { label: string; description: string; action: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-destructive/30 bg-card p-3">
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

function NotifSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 sm:p-6 space-y-3">
      <SectionTitle icon={icon}>{title}</SectionTitle>
      <div>{children}</div>
    </div>
  );
}

function NotifRow({
  label, description, channels, defaultChecked = false,
}: {
  label: string; description?: string; channels: Channel[]; defaultChecked?: boolean;
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
  device, browser, os, loc, ip, lastActive, icon, current, stale,
}: {
  device: string; browser: string; os: string; loc: string; ip: string; lastActive: string;
  icon: "laptop" | "phone"; current?: boolean; stale?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between gap-2 sm:gap-3 rounded-lg border p-3 sm:p-4 transition ${current ? "border-primary/30 bg-primary/5" : ""}`}>
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${current ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
          {icon === "laptop" ? <Laptop className="size-5" /> : <Smartphone className="size-5" />}
        </div>
        <div className="min-w-0 space-y-0.5 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium truncate">{device}</span>
            {current && <StatusBadge variant="ok">このセッション</StatusBadge>}
            {stale && <StatusBadge variant="muted">非アクティブ</StatusBadge>}
          </div>
          <div className="text-xs text-muted-foreground truncate">{browser} · {os}</div>
          <div className="text-[11px] text-muted-foreground font-mono truncate">{loc} · {ip} · {lastActive}</div>
        </div>
      </div>
      {!current && <Button variant="ghost" size="sm" className="shrink-0">ログアウト</Button>}
    </div>
  );
}
