"use client";

import { usePathname } from "next/navigation";
import UserSidebar from "@/components/sidebar/userSidebar";

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
    <div className="admin-layout">
      <UserSidebar />
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}
