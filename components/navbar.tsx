"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const { user, isLoading, signOut } = useAuth()

  if (isLoading) {
    return (
      <nav className="p-4 border-b">
        <p>Loading...</p>
      </nav>
    )
  }

  return (
    <nav className="p-4 border-b flex justify-between">
      <Link href="/">Home</Link>

      <div className="flex gap-4">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={signOut}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/signin">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
