"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const { user, isLoading, signOut } = useAuth()

  if (isLoading) {
    return (
      <nav className="p-4">
        <p>Loading...</p>
      </nav>
    )
  }

  return (
    <nav className="p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3 text-white">
        <div className="size-8 text-[#7c5cff]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
          AlphaLearn
        </h2>
      </Link>

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
