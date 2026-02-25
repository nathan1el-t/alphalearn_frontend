import "./admin.css";
import { requireRole } from "@/lib/rbac";
import AdminSidebar from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is already checked by parent (protected) layout
  // Only check admin role here
  await requireRole("ADMIN");

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
