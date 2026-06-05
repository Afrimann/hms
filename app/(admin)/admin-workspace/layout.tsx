import AdminWorkspaceGuard from "./AdminWorkspaceGuard";
import Sidebar from "../../../features/admin/Sidebar";
import Header from "../../../features/admin/Header";

export default function AdminWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminWorkspaceGuard>
      <div className="flex h-screen overflow-hidden bg-[#F5F5F5]">
        {/* Fixed sidebar */}
        <div className="flex-none h-full overflow-y-auto">
          <Sidebar />
        </div>
        {/* Right column: fixed header + scrollable content */}
        <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
          <div className="flex-none">
            <Header />
          </div>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AdminWorkspaceGuard>
  );
}
