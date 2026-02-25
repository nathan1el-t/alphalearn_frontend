"use client";

import type React from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { showError, showSuccess } from "@/lib/notifications";

export type UserRole = "ADMIN" | "CONTRIBUTOR" | "LEARNER" | null;

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userRole: UserRole;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Fetch role using the current client session token to avoid stale server cookies.
  const fetchUserRole = async (currentSession: Session | null) => {
    if (!currentSession?.access_token) {
      setUserRole(null);
      return;
    }

    try {
      const res = await fetch("/api/user/role", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentSession.access_token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        setUserRole(null);
        return;
      }

      const data = (await res.json()) as { role?: UserRole };
      setUserRole(data.role ?? null);
    } catch (error) {
      setUserRole(null);
    }
  };

  useEffect(() => {
    
    const getSession = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (!error) {
        setSession(data.session);
        setUser(data.session?.user || null);
        
        // Fetch role if user is authenticated
        if (data.session?.user) {
          await fetchUserRole(data.session);
        } else {
          setUserRole(null);
        }
      }

      setIsLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (
          (event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
          session?.access_token
        ) {
          console.log("[POSTMAN TEST] access token:", session.access_token);
        }

        setSession(session);
        setUser(session?.user || null);
        
        // Fetch role when auth state changes
        if (session?.user) {
          await fetchUserRole(session);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.session?.access_token) {
        console.log("[POSTMAN TEST] access token:", data.session.access_token);
      }
      setUser(data.user);
      setSession(data.session);
      showSuccess("Logged in successfully!");
      router.push("/profile");
    } catch (err: any) {
      showError(err.message || "Failed to log in");
    }
  };


  // ----------------------
  // GOOGLE LOGIN
  // ----------------------
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}`,
          // redirectTo: `${window.location.origin}/profile`,
        },
      })

      if (error) throw error;

    } catch (err: any) {
      showError(err.message || "Failed to sign in with Google");
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      showSuccess("Account created! Please check your email.");
      router.push("/signin");
    } catch (err: any) {
      showError(err.message || "Failed to sign up");
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserRole(null);
      showSuccess("Logged out successfully!");
      router.push("/signin");
    } catch (err: any) {
      showError(err.message || "Failed to log out");
    }
  };

  const value = {
    user,
    session,
    userRole,
    isLoading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
