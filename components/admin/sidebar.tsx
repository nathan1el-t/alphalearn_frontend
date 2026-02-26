"use client";

import { useEffect } from "react";
import AppSidebar, { type SidebarNavSection } from "@/components/sidebar/appSidebar";

const sections: SidebarNavSection[] = [
  {
    label: "Navigation",
    items: [
      { label: "Dashboard", href: "/admin", icon: "dashboard", exact: true },
      { label: "Lessons", href: "/admin/lessons", icon: "rate_review" },
      { label: "Concepts", href: "/admin/concepts", icon: "library_books" },
      { label: "Users", href: "/admin/contributors", icon: "group" },
    ],
  },
];

const quickActionsSection: SidebarNavSection = {
  label: "Quick Actions",
  items: [
    { label: "Add Concept", href: "/admin/concepts/add", icon: "add_circle" },
  ],
};

export default function AdminSidebar() {
  // Commit 1 keeps current behavior while the protected navbar still exists.
  useEffect(() => {
    document.body.classList.add("admin-page");
    return () => {
      document.body.classList.remove("admin-page");
    };
  }, []);

  return (
    <AppSidebar
      brandTitle="AlphaLearn"
      brandSubtitle="Admin Panel"
      brandHref="/admin"
      brandIcon="admin_panel_settings"
      roleLabel="Administrator"
      sections={sections}
      quickActionsSection={quickActionsSection}
      userFallbackLabel="Admin User"
    />
  );
}
