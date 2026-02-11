"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const { signIn, signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setSuccessMsg("Account created successfully! Check your email");
      } else {
        const { data,error } = await signIn(email, password);
        console.log(data);
        if (error) throw error;
        setSuccessMsg("Login successful!");
      }
    } catch (error: any) {
      setErrorMsg(error.message ?? "Something went wrong");
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: 480 }}>
      <h1>{isSignUp ? "Sign up" : "Login"}</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

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
            setErrorMsg("");
            setSuccessMsg("");
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
