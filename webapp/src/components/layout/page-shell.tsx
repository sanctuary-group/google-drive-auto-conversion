import { cn } from "@/lib/utils";

export function PageShell({
  title,
  description,
  actions,
  children,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-1 overflow-y-auto", className)}>
      <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">{actions}</div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
