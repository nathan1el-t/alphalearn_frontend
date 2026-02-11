"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { showError,showSuccess } from "@/lib/notifications";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const { signIn, signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 480 }}>
      <h1>{isSignUp ? "Sign up" : "Login"}</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "1rem" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #ccc",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {isLoading
              ? "Please wait..."
              : isSignUp
              ? "Create account"
              : "Login"}
          </button>
        </div>
      </form>

      <p style={{ marginTop: "1rem" }}>
        {isSignUp
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
          }}
          style={{
            border: "none",
            background: "none",
            padding: 0,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {isSignUp ? "Login" : "Sign up"}
        </button>
      </p>
    </main>
  );
}
