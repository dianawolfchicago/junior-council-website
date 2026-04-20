'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/portal')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid email or password.'
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
          href="/"
          className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to site
        </Link>
      </div>

      {/* Login card */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Members Only</span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
            <h1 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
              Member <span className="text-jc-red">Portal</span>
            </h1>
            <p className="text-white/50 text-sm mt-2">
              Sign in to access your member dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-jc-charcoal border border-white/10 p-8">
              <div className="space-y-5">

                {/* Error message */}
                {error && (
                  <div className="bg-red-900/30 border border-red-500/40 px-4 py-3">
                    <p className="text-red-400 text-xs font-bold">{error}</p>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="w-full bg-jc-black border border-white/20 focus:border-jc-red px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-jc-black border border-white/20 focus:border-jc-red px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        {showPassword
                          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        }
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="block w-full bg-jc-red hover:bg-jc-red-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-sm tracking-widest uppercase py-4 text-center transition-colors mt-2"
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </div>

              <div className="border-t border-white/10 mt-8 pt-6 text-center">
                <p className="text-white/40 text-xs">
                  New member?{' '}
                  <Link href="/join" className="text-jc-red hover:underline font-bold">
                    Request an invite
                  </Link>
                </p>
              </div>
            </div>
          </form>

          <p className="text-white/20 text-xs text-center mt-6">
            Having trouble signing in? Contact{' '}
            <a href="mailto:info@juniorcouncil.org" className="text-white/40 hover:text-white transition-colors">
              info@juniorcouncil.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
