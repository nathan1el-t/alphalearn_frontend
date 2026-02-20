//generated with chat-gpt

"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // ----------------------
  // SIGN UP (Email/Password)
  // ----------------------
  const handleSignUp = async () => {
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setMessage("❌ " + error.message)
      console.error("Signup error:", error)
      return
    }

    setMessage("✅ Check your email to confirm your account.")
    console.log("Signup success:", data)
  }

  // ----------------------
  // LOGIN (Email/Password)
  // ----------------------
  const handleLogin = async () => {
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setMessage("❌ " + error.message)
      console.error("Login error:", error)
      return
    }

    setMessage("✅ Logged in successfully!")
    console.log("Login success:", data)
  }

  // ----------------------
  // GOOGLE LOGIN
  // ----------------------
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
      },
    })

    if (error) {
      setMessage("❌ " + error.message)
      console.error("Google error:", error)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Auth Test Page</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleSignUp} disabled={loading}>
          Sign Up
        </button>

        <button style={styles.button} onClick={handleLogin} disabled={loading}>
          Login
        </button>

        <button style={styles.googleButton} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  )
}

const styles: any = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "white",
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
  googleButton: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#db4437",
    color: "white",
    cursor: "pointer",
  },
  message: {
    color: "white",
    fontSize: "14px",
    textAlign: "center",
  },
}
