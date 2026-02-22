"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./themeToggle";
import { Burger, Drawer, Avatar, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, userRole, isLoading, signOut } = useAuth();
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  // Role-based pill items — no overlap between admin and non-admin
  const navItems =
    userRole === "ADMIN"
      ? [
        { label: "Dashboard", href: "/admin" },
        { label: "Concepts", href: "/admin/concepts" },
        { label: "Users", href: "/admin/contributors" },
      ]
      : [
        { label: "Concepts", href: "/concepts" },
        { label: "Lessons", href: "/lessons" },
        { label: "Profile", href: "/profile" },
        ...(!user ? [{ label: "Sign In", href: "/signin" }] : []),
      ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  if (isLoading) {
    return (
      <nav className="p-4 bg-[var(--color-surface)]">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </nav>
    );
  }

  const avatarLetter = user?.email ? user.email[0].toUpperCase() : "?";
  const profilePicture =
    user?.user_metadata?.picture || user?.user_metadata?.avatar_url;

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <>
      <nav className="p-4 flex justify-between items-center bg-transparent sticky top-0 z-50">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-text)]"
          >
            <div className="flex items-center justify-center size-8 rounded-full bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              <span className="material-symbols-outlined text-sm">bolt</span>
            </div>
            <h2 className="text-[var(--color-text)] text-xl font-bold leading-tight tracking-wide hidden sm:block">
              Alphalearn
            </h2>
          </Link>
        </div>

        {/* Center: Pill Navigation (role-based) */}
        <div className="hidden lg:flex items-center bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(item.href)
                  ? "bg-violet-600/40 text-white shadow-inner"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section: Actions & Profile */}
        <div
          className="hidden lg:flex
        items-center justify-end gap-3 w-1/3"
        >
          {/* <button className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-xl">search</span>
          </button> */}
          {/* <button className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button> */}
          {/* You can replace this clock with ThemeToggle if you prefer */}
          {/* <div className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <ThemeToggle /> 
          </div> */}

          <ThemeToggle />

          {user ? (
            <Menu shadow="md" width={200} position="bottom-end" radius={10}>
              <Menu.Target>
                <div className="flex items-center gap-3 ml-2 bg-white/5 border border-white/10 rounded-full p-1 pr-4 cursor-pointer hover:bg-white/10 transition-colors">
                  <Avatar
                    src={profilePicture}
                    color="violet"
                    radius="xl"
                    size="sm"
                  >
                    {avatarLetter}
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="text-xs font-semibold text-[var(--color-text)] capitalize truncate max-w-[120px]">
                      {displayName}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-muted)] truncate max-w-[120px]">
                      {user.email}
                    </p>
                  </div>

                  <span className="material-symbols-outlined text-gray-400 text-sm">
                    expand_more
                  </span>
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item color="red" onClick={signOut}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link
              href="/signin"
              className="px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors text-sm"
            >
              Sign up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
            size="sm"
            color="var(--color-text)"
          />
        </div>
      </nav>

      {/* Mobile Drawer (Updated to include new navigation) */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="xs"
        title="Menu"
        styles={{
          content: { backgroundColor: "var(--color-surface)" },
          header: {
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
          },
          title: { color: "var(--color-text)", fontWeight: "bold" },
          close: { color: "var(--color-text)" },
        }}
      >
        <div className="flex flex-col gap-6 p-4">
          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.href)
                    ? "bg-violet-600/20 text-violet-300"
                    : "text-[var(--color-text)] hover:bg-white/5"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <hr className="border-white/10" />

          {user ? (
            <>
              {/* User Profile */}
              <div className="flex items-center gap-3">
                <Avatar
                  src={profilePicture}
                  color="violet"
                  radius="xl"
                  size="md"
                >
                  {avatarLetter}
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-[var(--color-text)]">{user.email}</p>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                    Contributor
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  signOut();
                  close();
                }}
                className="w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-white/10 font-medium transition-colors mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              onClick={close}
              className="w-full px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors text-center"
            >
              Sign up
            </Link>
          )}
        </div>
      </Drawer>
    </>
  );
}
