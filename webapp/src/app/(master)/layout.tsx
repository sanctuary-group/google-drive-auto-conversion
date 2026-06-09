import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MASTER_NAV } from "@/lib/nav";

export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar sections={MASTER_NAV} title="Ledger SaaS" />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="マスター管理コンソール" />
        {children}
      </div>
    </div>
  );
}
