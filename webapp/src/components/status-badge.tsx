import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Variant = "ok" | "warn" | "ng" | "muted" | "info";

const STYLES: Record<Variant, string> = {
  ok: "bg-primary/10 text-primary border-primary/20",
  warn: "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-300",
  ng: "bg-destructive/10 text-destructive border-destructive/30",
  muted: "bg-muted text-muted-foreground border-border",
  info: "bg-sky-500/15 text-sky-700 border-sky-500/30 dark:text-sky-300",
};

export function StatusBadge({
  variant,
  children,
  className,
}: {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn(STYLES[variant], "font-medium", className)}>
      {children}
    </Badge>
  );
}

export function LedgerStatusBadge({ status }: { status: "OK" | "部分抽出" | "NG" }) {
  if (status === "OK") return <StatusBadge variant="ok">OK</StatusBadge>;
  if (status === "部分抽出") return <StatusBadge variant="warn">部分抽出</StatusBadge>;
  return <StatusBadge variant="ng">NG</StatusBadge>;
}
