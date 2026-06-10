import { Copy, KeyRound, Plus, Webhook } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/status-badge";
import { apiTokens, webhooks } from "@/mocks/apiTokens";

export default function ApiTokensPage() {
  return (
    <PageShell
      title="API キー・Webhook"
      description="プログラマブル連携用の認証トークンと Webhook エンドポイント"
    >
      <Tabs defaultValue="tokens">
        <TabsList>
          <TabsTrigger value="tokens">
            <KeyRound className="size-3.5" />
            API キー
          </TabsTrigger>
          <TabsTrigger value="webhooks">
            <Webhook className="size-3.5" />
            Webhook
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">発行済み API キー ({apiTokens.length})</CardTitle>
              <Button size="sm">
                <Plus className="size-4" />
                新規発行
              </Button>
            </CardHeader>
            <CardContent className="p-0">
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
            </CardContent>
          </Card>
          <div className="text-xs text-muted-foreground mt-3 leading-relaxed">
            <strong>セキュリティ:</strong> API キーは発行後一度しか表示されません。必要なスコープのみ付与し、定期的にローテーションしてください。
            漏洩が疑われる場合は即座に「失効」してください。
          </div>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Webhook エンドポイント ({webhooks.length})</CardTitle>
              <Button size="sm">
                <Plus className="size-4" />
                エンドポイント追加
              </Button>
            </CardHeader>
            <CardContent className="p-0">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
