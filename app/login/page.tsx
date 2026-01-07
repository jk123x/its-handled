'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 max-w-md mx-auto">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Check your inbox</h1>
          <p className="text-[var(--muted)] text-lg">
            We sent a magic link to <span className="text-[var(--foreground)] font-medium">{email}</span>
          </p>
          <p className="text-[var(--muted)]">
            Click the link in the email to sign in. It might take a minute to arrive.
          </p>
          <button
            onClick={() => setSent(false)}
            className="text-[var(--accent)] hover:underline"
          >
            Use a different email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-8 md:px-16 max-w-md mx-auto">
      <div className="space-y-8">
        <div>
          <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            ← Back
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Sign in</h1>
          <p className="text-[var(--muted)] text-lg">
            We&apos;ll send you a magic link. No password needed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--foreground)]/10 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send magic link'}
          </button>
        </form>
      </div>
    </div>
  )
}
