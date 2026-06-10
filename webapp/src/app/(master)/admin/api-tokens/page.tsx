import { Copy, KeyRound, Plus, Webhook } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { FolderTabs } from "@/components/layout/folder-tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { apiTokens, webhooks } from "@/mocks/apiTokens";

export default function ApiTokensPage() {
  return (
    <PageShell
      title="API キー・Webhook"
      description="プログラマブル連携用の認証トークンと Webhook エンドポイント"
    >
      <FolderTabs
        tabs={[
          {
            key: "tokens",
            label: "API キー",
            icon: <KeyRound className="size-4" />,
            content: <TokensTab />,
          },
          {
            key: "webhooks",
            label: "Webhook",
            icon: <Webhook className="size-4" />,
            content: <WebhooksTab />,
          },
        ]}
      />
    </PageShell>
  );
}

function TokensTab() {
  return (
    <div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <KeyRound className="size-4" />
            発行済み API キー <span className="text-muted-foreground font-normal">({apiTokens.length})</span>
          </h3>
          <div className="text-xs text-muted-foreground mt-1">
            API キーは発行後一度しか表示されません。漏洩時は即座に失効してください
          </div>
        </div>
        <Button size="sm" className="w-full sm:w-auto">
          <Plus className="size-4" />
          新規発行
        </Button>
      </div>
      <Separator />

      {/* デスクトップ: テーブル */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>トークン</TableHead>
              <TableHead>スコープ</TableHead>
              <TableHead>作成者 / 日</TableHead>
              <TableHead>最終利用</TableHead>
              <TableHead>有効期限</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiTokens.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono">{t.prefix}</code>
                    <Button variant="ghost" size="sm">
                      <Copy className="size-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {t.scopes.map((s) => (
                      <StatusBadge key={s} variant="info" className="text-[10px]">{s}</StatusBadge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  <div>{t.createdBy}</div>
                  <div className="text-muted-foreground">{t.createdAt}</div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">{t.lastUsedAt ?? "—"}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{t.expiresAt ?? "無期限"}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm">失効</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* モバイル: 積層カード */}
      <div className="md:hidden divide-y">
        {apiTokens.map((t) => (
          <div key={t.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium text-sm truncate">{t.name}</div>
              <Button variant="destructive" size="sm">失効</Button>
            </div>
            <div className="flex items-center gap-1.5">
              <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono truncate">{t.prefix}</code>
              <Button variant="ghost" size="sm" className="shrink-0">
                <Copy className="size-3" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {t.scopes.map((s) => (
                <StatusBadge key={s} variant="info" className="text-[10px]">{s}</StatusBadge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
              <div>
                <div className="font-medium text-foreground">作成</div>
                <div>{t.createdBy} / {t.createdAt}</div>
              </div>
              <div>
                <div className="font-medium text-foreground">最終利用</div>
                <div className="font-mono">{t.lastUsedAt ?? "—"}</div>
              </div>
              <div className="col-span-2">
                <div className="font-medium text-foreground">有効期限</div>
                <div>{t.expiresAt ?? "無期限"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WebhooksTab() {
  return (
    <div>
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Webhook className="size-4" />
            Webhook エンドポイント <span className="text-muted-foreground font-normal">({webhooks.length})</span>
          </h3>
          <div className="text-xs text-muted-foreground mt-1">
            指定したイベント発生時に外部 URL へ POST します
          </div>
        </div>
        <Button size="sm" className="w-full sm:w-auto">
          <Plus className="size-4" />
          エンドポイント追加
        </Button>
      </div>
      <Separator />

      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>イベント</TableHead>
              <TableHead>最終発火</TableHead>
              <TableHead>状態</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-medium">{w.name}</TableCell>
                <TableCell>
                  <code className="bg-muted px-2 py-0.5 rounded text-[11px] font-mono">{w.url}</code>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {w.events.map((e) => (
                      <StatusBadge key={e} variant="muted" className="text-[10px]">{e}</StatusBadge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-mono">{w.lastFiredAt ?? "—"}</TableCell>
                <TableCell>
                  <StatusBadge variant={w.active ? "ok" : "muted"}>
                    {w.active ? "アクティブ" : "停止中"}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">編集</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden divide-y">
        {webhooks.map((w) => (
          <div key={w.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium text-sm truncate">{w.name}</div>
              <StatusBadge variant={w.active ? "ok" : "muted"}>
                {w.active ? "アクティブ" : "停止中"}
              </StatusBadge>
            </div>
            <code className="block bg-muted px-2 py-1 rounded text-[11px] font-mono break-all">{w.url}</code>
            <div className="flex flex-wrap gap-1">
              {w.events.map((e) => (
                <StatusBadge key={e} variant="muted" className="text-[10px]">{e}</StatusBadge>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="font-mono">最終発火: {w.lastFiredAt ?? "—"}</span>
              <Button variant="ghost" size="sm">編集</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
