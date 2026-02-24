"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Avatar } from "@mantine/core";
import { useAuth } from "@/context/AuthContext";
import { useMantineColorScheme } from "@mantine/core";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Concepts", href: "/admin/concepts", icon: "library_books" },
  { label: "Users", href: "/admin/contributors", icon: "group" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Get user initials for avatar
  const avatarLetter = user?.email ? user.email[0].toUpperCase() : "?";
  const profilePicture = user?.user_metadata?.picture || user?.user_metadata?.avatar_url;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Add admin-page class to body for hiding main navbar
  useEffect(() => {
    document.body.classList.add("admin-page");
    return () => {
      document.body.classList.remove("admin-page");
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="admin-sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        <span className="material-symbols-outlined">
          {mobileOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="admin-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - never collapsed on mobile */}
      <aside className={`admin-sidebar ${collapsed && "collapsed"} ${mobileOpen && "mobile-open"}`}>
        {/* Header */}
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-sidebar-brand">
            <div className="admin-sidebar-logo">
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </div>
            <div className="admin-sidebar-brand-text">
              <span className="admin-sidebar-title">AlphaLearn</span>
              <span className="admin-sidebar-subtitle">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Desktop Collapse Toggle - Pill on edge */}
        <button
          className="admin-sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="material-symbols-outlined">
            {collapsed ? "chevron_left" : "chevron_right"}
          </span>
        </button>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          <div className="admin-sidebar-nav-section">
            <span className="admin-sidebar-nav-label">Navigation</span>
            <ul className="admin-sidebar-nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`admin-sidebar-nav-item ${isActive(item.href) ? "active" : ""}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="admin-sidebar-nav-icon material-symbols-outlined">
                      {item.icon}
                    </span>
                    <span className="admin-sidebar-nav-text">{item.label}</span>
                    {isActive(item.href) && (
                      <span className="admin-sidebar-nav-indicator" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="admin-sidebar-nav-section">
            <span className="admin-sidebar-nav-label">Quick Actions</span>
            <ul className="admin-sidebar-nav-list">
              <li>
                <Link
                  href="/admin/concepts/add"
                  className="admin-sidebar-nav-item"
                  title={collapsed ? "Add Concept" : undefined}
                >
                  <span className="admin-sidebar-nav-icon material-symbols-outlined">
                    add_circle
                  </span>
                  <span className="admin-sidebar-nav-text">Add Concept</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Theme Toggle */}
          <div className="admin-sidebar-nav-section">
            <span className="admin-sidebar-nav-label">Appearance</span>
            <button
              onClick={toggleColorScheme}
              className="admin-sidebar-theme-toggle"
              title={colorScheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle color scheme"
            >
              <span className="material-symbols-outlined admin-theme-icon sun-icon">
                light_mode
              </span>
              <div className="admin-theme-divider" />
              <span className="material-symbols-outlined admin-theme-icon moon-icon">
                dark_mode
              </span>
              <div className={`admin-theme-indicator ${colorScheme === "dark" ? "dark" : "light"}`} />
            </button>
          </div>
        </nav>

        {/* Footer - User Section */}
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <Avatar
              src={profilePicture}
              color="white"
              radius="xl"
              size="md"
              styles={{
                root: {
                  backgroundColor: 'var(--color-primary)',
                  border: '2px solid var(--color-accent)',
                  flexShrink: 0,
                },
              }}
            >
              {avatarLetter}
            </Avatar>
            <div className="admin-sidebar-user-info">
              <span className="admin-sidebar-user-email">
                {user?.email || "Admin User"}
              </span>
              <span className="admin-sidebar-user-role">Administrator</span>
            </div>
          </div>
          
          <button
            onClick={signOut}
            className="admin-sidebar-logout"
            title={collapsed ? "Logout" : undefined}
          >
            <div className="admin-sidebar-logout-content">
              <span className="material-symbols-outlined">logout</span>
              <span className="admin-sidebar-logout-text">Logout</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
