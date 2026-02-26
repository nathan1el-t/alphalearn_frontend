"use client";

import { usePathname } from "next/navigation";
import UserSidebar from "@/components/sidebar/userSidebar";
import UserBreadcrumb from "@/components/user/breadcrumb";

export default function ProtectedChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout user-shell">
      <UserSidebar />
      <main className="admin-content user-content">
        <UserBreadcrumb />
        {children}
      </main>
    </div>
  );
}
