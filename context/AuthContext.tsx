"use client"

import type React from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { showError,showSuccess } from "@/lib/notifications"


type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)
      const { data, error } = await supabase.auth.getSession()

      if (!error) {
        setSession(data.session)
        setUser(data.session?.user || null)
      }

      setIsLoading(false)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user || null)
      setIsLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    setUser(data.user)
    setSession(data.session)
    showSuccess("Logged in successfully!")
    router.push("/")
  } catch (err: any) {
    showError(err.message || "Failed to log in")
  }
}

  const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    showSuccess("Account created! Please check your email.")
    router.push("/signin")
  } catch (err: any) {
    showError(err.message || "Failed to sign up")
  }
}

  const signOut = async () => {
  try {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    showSuccess("Logged out successfully!")
    router.push("/signin")
  } catch (err: any) {
    showError(err.message || "Failed to log out")
  }
}

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}