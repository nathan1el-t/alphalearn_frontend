"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import ThemeToggle from "./themeToggle"
import { Badge, Burger, Drawer, Avatar } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export default function Navbar() {
  const { user, userRole, isLoading, signOut } = useAuth()
  const [opened, { toggle, close }] = useDisclosure(false)

  if (isLoading) {
    return (
      <nav className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <p className="text-[var(--color-text-muted)]">Loading...</p>
      </nav>
    )
  }

  // Get first letter of email for avatar, and profile picture for Google auth
  const avatarLetter = user?.email ? user.email[0].toUpperCase() : "?"
  const profilePicture = user?.user_metadata?.picture || user?.user_metadata?.avatar_url

  return (
    <>
      <nav className="p-4 flex justify-between items-center border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-[var(--color-text)]">
            <div className="size-8 text-[var(--color-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
              </svg>
            </div>
            <h2 className="text-[var(--color-text)] text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">
              AlphaLearn
            </h2>
          </Link>

          {/* Admin Navigation - Only shown for admins */}
          {userRole === "ADMIN" && (
            <div className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-[var(--color-border)]">
              <Badge 
                size="xs" 
                variant="gradient"
                gradient={{ from: '#fb923c', to: '#fbbf24', deg: 135 }}
                className="mr-2"
              >
                ADMIN
              </Badge>
              <Link 
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-overlay)] transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/admin/concepts"
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-overlay)] transition-colors"
              >
                Concepts
              </Link>
              <Link 
                href="/admin/contributors"
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-overlay)] transition-colors"
              >
                Contributors
              </Link>
            </div>
          )}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <>
              {/* Stat Badges */}
              <Badge
                leftSection={
                  <span className="material-symbols-outlined text-sm">
                    local_fire_department
                  </span>
                }
                color="orange"
                variant="light"
                size="lg"
                radius="xl"
                styles={{
                  root: {
                    backgroundColor: 'var(--color-streak)/0.1',
                    border: '1px solid var(--color-streak)/0.2',
                    color: 'var(--color-streak)',
                  },
                }}
              >
                15 DAY STREAK
              </Badge>
              <Badge
                leftSection={
                  <span className="material-symbols-outlined text-sm">stars</span>
                }
                color="violet"
                variant="light"
                size="lg"
                radius="xl"
                styles={{
                  root: {
                    backgroundColor: 'var(--color-primary)/0.1',
                    border: '1px solid var(--color-primary)/0.2',
                    color: 'var(--color-primary)',
                  },
                }}
              >
                4,200 XP
              </Badge>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-[var(--color-border)]">
                <div className="text-right">
                  <p className="text-xs font-bold text-[var(--color-text)]">{user.email}</p>
                  <p className="text-[8px] text-[var(--color-text-muted)] uppercase tracking-widest font-semibold">
                    {userRole || "User"}
                  </p>
                </div>
                <Avatar
                  src={profilePicture}
                  color="white"
                  radius="xl"
                  size="md"
                  styles={{
                    root: {
                      backgroundColor: 'var(--color-primary)',
                      border: '2px solid var(--color-accent)',
                    },
                  }}
                >
                  {avatarLetter}
                </Avatar>
              </div>
              {/* 
              <button 
                onClick={signOut}
                className="px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium transition-colors text-sm"
              >
                Logout
              </button> */}

              <button
                onClick={signOut}
                className="flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group"
                style={{
                  backgroundColor: 'transparent',
                }}
                aria-label="Search concepts"
              >
                <span
                  className="material-symbols-outlined !text-[30px] transition-all duration-200"
                  style={{
                    color: 'var(--color-text)',
                  }}
                >
                  logout
                </span>

                <style jsx>{`
    button:hover .material-symbols-outlined {
      color: var(--color-error);
      filter: drop-shadow(0 0 5px var(--color-error))
              drop-shadow(0 0 15px var(--color-error));
    }
  `}</style>
              </button>

            </>
          ) : (
            <Link
              href="/signin"
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium transition-colors"
            >
              Sign up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" size="sm" />
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="xs"
        title="Menu"
        styles={{
          content: {
            backgroundColor: 'var(--color-surface)',
          },
          header: {
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
          },
          title: {
            color: 'var(--color-text)',
            fontWeight: 'bold',
          },
          close: {
            color: 'var(--color-text)',
          },
        }}
      >
        <div className="flex flex-col gap-4 p-4">
          {user ? (
            <>
              {/* User Profile */}
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-border)]">
                <Avatar
                  src={profilePicture}
                  color="violet"
                  radius="xl"
                  size="lg"
                  styles={{
                    root: {
                      backgroundColor: 'var(--color-primary)',
                      border: '2px solid var(--color-accent)',
                    },
                  }}
                >
                  {avatarLetter}
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-[var(--color-text)]">{user.email}</p>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                    {userRole || "User"}
                  </p>
                </div>
              </div>

              {/* Admin Navigation - Mobile */}
              {userRole === "ADMIN" && (
                <div className="flex flex-col gap-2 pb-4 border-b border-[var(--color-border)]">
                  <Badge 
                    size="sm" 
                    variant="gradient"
                    gradient={{ from: '#fb923c', to: '#fbbf24', deg: 135 }}
                    fullWidth
                    className="justify-center"
                  >
                    ADMIN PANEL
                  </Badge>
                  <Link 
                    href="/admin"
                    onClick={close}
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-overlay)] transition-colors text-center"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/admin/concepts"
                    onClick={close}
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-overlay)] transition-colors text-center"
                  >
                    Manage Concepts
                  </Link>
                  <Link 
                    href="/admin/contributors"
                    onClick={close}
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-overlay)] transition-colors text-center"
                  >
                    Manage Contributors
                  </Link>
                </div>
              )}

              {/* Stat Badges */}
              <div className="flex flex-col gap-2">
                <Badge
                  leftSection={
                    <span className="material-symbols-outlined text-sm">
                      local_fire_department
                    </span>
                  }
                  color="orange"
                  variant="light"
                  size="lg"
                  radius="xl"
                  fullWidth
                  styles={{
                    root: {
                      backgroundColor: 'var(--color-streak)/0.1',
                      border: '1px solid var(--color-streak)/0.2',
                      color: 'var(--color-streak)',
                      justifyContent: 'center',
                    },
                  }}
                >
                  15 DAY STREAK
                </Badge>
                <Badge
                  leftSection={
                    <span className="material-symbols-outlined text-sm">stars</span>
                  }
                  color="violet"
                  variant="light"
                  size="lg"
                  radius="xl"
                  fullWidth
                  styles={{
                    root: {
                      backgroundColor: 'var(--color-primary)/0.1',
                      border: '1px solid var(--color-primary)/0.2',
                      color: 'var(--color-primary)',
                      justifyContent: 'center',
                    },
                  }}
                >
                  4,200 XP
                </Badge>
              </div>

              <button
                onClick={() => {
                  signOut()
                  close()
                }}
                className="w-full px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium transition-colors mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              onClick={close}
              className="w-full px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-medium transition-colors text-center"
            >
              Sign up
            </Link>
          )}
        </div>
      </Drawer>
    </>
  )
}
