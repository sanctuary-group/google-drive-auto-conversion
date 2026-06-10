import { FolderSync, KeyRound, MessageSquare, Receipt } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { CATEGORY_LABEL, integrations, type Integration } from "@/mocks/integrations";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;
const ICONS: Record<string, IconCmp> = {
  FolderSync,
  Receipt,
  MessageSquare,
  KeyRound,
};

const ORDER: Integration["category"][] = ["storage", "accounting", "notification", "auth"];

export default function IntegrationsPage() {
  return (
    <PageShell
      title="API 連携"
      description="ストレージ・会計ソフト・通知・認証の各サービスとの連携を管理します"
    >
      <div className="space-y-8">
        {ORDER.map((cat) => {
          const items = integrations.filter((i) => i.category === cat);
          if (items.length === 0) return null;
          return (
            <section key={cat}>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {CATEGORY_LABEL[cat]}
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {items.map((i) => (
                  <IntegrationCard key={i.id} item={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}

function IntegrationCard({ item }: { item: Integration }) {
  const Icon = ICONS[item.icon] ?? FolderSync;
  const isConnected = item.status === "connected";
  const isComing = item.status === "comingSoon";
  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-lg bg-primary/10 text-primary inline-flex items-center justify-center shrink-0">
              <Icon className="size-5" />
            </div>
            <div>
              <CardTitle className="text-base">{item.name}</CardTitle>
              <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
            </div>
          </div>
          {isConnected && <StatusBadge variant="ok">接続中</StatusBadge>}
          {item.status === "disconnected" && <StatusBadge variant="muted">未接続</StatusBadge>}
          {item.status === "error" && <StatusBadge variant="ng">エラー</StatusBadge>}
          {isComing && <StatusBadge variant="info">近日公開</StatusBadge>}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isConnected && (
          <div className="space-y-1.5 mb-4 text-xs">
            {item.connectedAt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">接続日</span>
                <span>{item.connectedAt}</span>
              </div>
            )}
            {item.connectedBy && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">接続者</span>
                <span>{item.connectedBy}</span>
              </div>
            )}
            {item.scope && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground shrink-0">スコープ</span>
                <span className="text-right text-[11px] font-mono">{item.scope}</span>
              </div>
            )}
          </div>
        )}
        <div className="flex gap-2">
          {isConnected ? (
            <>
              <Button variant="outline" size="sm" className="flex-1">設定</Button>
              <Button variant="destructive" size="sm" className="flex-1">解除</Button>
            </>
          ) : isComing ? (
            <Button variant="outline" size="sm" className="flex-1" disabled>近日公開</Button>
          ) : (
            <Button size="sm" className="flex-1">接続する</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
