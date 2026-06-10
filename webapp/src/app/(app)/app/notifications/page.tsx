import Link from "next/link";
import { AlertTriangle, CheckCircle2, CircleAlert, Info } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { notifications, type NotificationKind } from "@/mocks/notifications";

const KIND_ICON: Record<NotificationKind, React.ReactNode> = {
  error: <CircleAlert className="size-4 text-destructive" />,
  warning: <AlertTriangle className="size-4 text-amber-600" />,
  info: <Info className="size-4 text-sky-600" />,
  success: <CheckCircle2 className="size-4 text-primary" />,
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;
  return (
    <PageShell
      title="通知"
      description={`未読 ${unreadCount} 件 / 全 ${notifications.length} 件`}
      actions={
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="unread">未読のみ</SelectItem>
              <SelectItem value="error">エラーのみ</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">すべて既読にする</Button>
        </div>
      }
    >
      <div className="space-y-2">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`${n.read ? "" : "border-primary/30 bg-primary/[0.03]"}`}
          >
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">{KIND_ICON[n.kind]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-medium text-sm">
                      {!n.read && <span className="inline-block size-2 rounded-full bg-primary mr-2" />}
                      {n.title}
                    </div>
                    <span className="text-xs text-muted-foreground font-mono shrink-0">{n.ts}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{n.body}</p>
                  {n.link && (
                    <Button asChild variant="link" size="sm" className="px-0 mt-1 h-auto">
                      <Link href={n.link}>詳細を見る →</Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
