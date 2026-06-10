import { AppShell } from "@/components/layout/app-shell";
import { RoleGuard } from "@/components/layout/role-guard";
import { MASTER_NAV } from "@/lib/nav";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RoleGuard allow={["master"]} />
      <AppShell sections={MASTER_NAV} sidebarTitle="Ledger SaaS" headerTitle="マスター管理コンソール">
        {children}
      </AppShell>
    </>
  );
}
