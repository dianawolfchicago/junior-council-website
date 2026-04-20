'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const supabase = createClient()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Pre-fill email if it came in via ?email= query param
  useEffect(() => {
    const e = searchParams.get('email')
    if (e) setEmail(e)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Step 1: Verify the 6-digit invite code → creates a session
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: code.trim(),
        type: 'invite',
      })
      if (verifyError) throw verifyError

      // Step 2: Set the chosen password on the now-authenticated user
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) throw updateError

      // Step 3: Land them in the portal
      router.push('/portal')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not complete sign-up.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-jc-black flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="bg-white px-3 py-1 border-[6px] border-jc-red">
            <Image
              src="/jc-logo.png"
              alt="Junior Council"
              width={120}
              height={30}
              className="h-6 w-auto"
              priority
            />
          </div>
        </Link>
        <Link
          href="/login"
          className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to sign in
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Activate Account</span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
            <h1 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
              Join the <span className="text-jc-red">Portal</span>
            </h1>
            <p className="text-white/50 text-sm mt-3">
              Enter the code from your invitation email along with your email and a new password.
            </p>
          </div>

          <div className="bg-jc-charcoal border border-white/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-jc-black border border-white/20 focus:border-jc-red text-white outline-none px-4 py-3 text-sm placeholder:text-white/20"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Verification Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  maxLength={10}
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="00000000"
                  className="w-full bg-jc-black border border-white/20 focus:border-jc-red text-white outline-none px-4 py-3 text-sm tracking-[0.3em] text-center font-mono text-lg placeholder:text-white/20"
                />
                <p className="text-white/40 text-xs mt-2">Code from your invitation email</p>
              </div>

              <div>
                <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Choose a Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-jc-black border border-white/20 focus:border-jc-red text-white outline-none px-4 py-3 pr-12 text-sm placeholder:text-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs uppercase tracking-widest"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <p className="text-white/40 text-xs mt-2">8+ characters</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || code.length < 6 || password.length < 8 || !email.trim()}
                className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Activating…' : 'Enter the Portal'}
              </button>
            </form>
          </div>

          <p className="text-white/20 text-xs text-center mt-6">
            Need help?{' '}
            <a href="mailto:info@juniorcouncil.org" className="text-white/40 hover:text-white transition-colors">
              info@juniorcouncil.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
