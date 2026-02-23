import "./admin.css";
import { requireRole } from "@/lib/rbac";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is already checked by parent (protected) layout
  // Only check admin role here
  await requireRole("ADMIN");

  return <>{children}</>;
}
