import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { RoleGuard } from "@/components/layout/role-guard";
import { APP_NAV } from "@/lib/nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <RoleGuard allow={["manager", "user"]} />
      <Sidebar sections={APP_NAV} title="株式会社スカイ" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="会社ワークスペース" />
        {children}
      </div>
    </div>
  );
}
