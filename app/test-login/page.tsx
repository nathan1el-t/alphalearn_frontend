// quickly generated with chat-gpt

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error

        setSuccess('Account created. You can now log in.')
        setIsSignUp(false)
        setPassword('')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      }
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: 480 }}>
      <h1>{isSignUp ? 'Sign up' : 'Login'}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: '1rem' }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {loading
              ? 'Please wait...'
              : isSignUp
              ? 'Create account'
              : 'Login'}
          </button>
        </div>
      </form>

      <p style={{ marginTop: '1rem' }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={() => {
            setError(null)
            setSuccess(null)
            setIsSignUp(!isSignUp)
          }}
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {isSignUp ? 'Login' : 'Sign up'}
        </button>
      </p>
    </main>
  )
}
