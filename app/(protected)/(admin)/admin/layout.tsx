import "./admin.css";
import { getUserRole } from "@/lib/rbac";
import NotFound from "@/components/notFound";
import AdminSidebar from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // making this pages visible only to admins
  const role = await getUserRole();
  if (role !== "ADMIN") {
    return <NotFound />
  }

  return (
    <div className="admin-layout admin-theme">
      <AdminSidebar />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
