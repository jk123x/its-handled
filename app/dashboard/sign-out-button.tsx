'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
    >
      Sign out
    </button>
  )
}
