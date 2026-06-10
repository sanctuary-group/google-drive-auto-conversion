import { AppShell } from "@/components/layout/app-shell";
import { RoleGuard } from "@/components/layout/role-guard";
import { APP_NAV } from "@/lib/nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RoleGuard allow={["manager", "user"]} />
      <AppShell sections={APP_NAV} sidebarTitle="株式会社スカイ" headerTitle="会社ワークスペース">
        {children}
      </AppShell>
    </>
  );
}
