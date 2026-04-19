'use client'

import { useEffect, useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Email verification step
  const [needsVerify, setNeedsVerify] = useState(false)
  const [code, setCode] = useState('')

  // Pre-fill email from invite link (?email=...)
  useEffect(() => {
    const e = searchParams.get('email')
    if (e) setEmail(e)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      })
      // Send the email verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setNeedsVerify(true)
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string; longMessage?: string }[] }
      const first = clerkErr.errors?.[0]
      setError(first?.longMessage || first?.message || 'Could not create account')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')
    try {
      const result = await signUp.attemptEmailAddressVerification({ code })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/portal')
      } else {
        setError(`Verification incomplete (status: ${result.status})`)
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string; longMessage?: string }[] }
      const first = clerkErr.errors?.[0]
      setError(first?.longMessage || first?.message || 'Invalid code')
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
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                {needsVerify ? 'Verify Email' : 'Create Account'}
              </span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
            <h1 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
              {needsVerify ? (
                <>Check your <span className="text-jc-red">inbox</span></>
              ) : (
                <>Join the <span className="text-jc-red">Portal</span></>
              )}
            </h1>
            {needsVerify && (
              <p className="text-white/50 text-sm mt-3">
                We sent a 6-digit code to <span className="text-white">{email}</span>
              </p>
            )}
          </div>

          <div className="bg-jc-charcoal border border-white/10 p-8">
            {!needsVerify ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">First name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full bg-jc-black border border-white/20 focus:border-jc-red text-white outline-none px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Last name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full bg-jc-black border border-white/20 focus:border-jc-red text-white outline-none px-4 py-3 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-jc-black border border-white/20 focus:border-jc-red text-white outline-none px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-jc-black border border-white/20 focus:border-jc-red text-white outline-none px-4 py-3 pr-12 text-sm"
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

                {/* Clerk requires this for bot protection */}
                <div id="clerk-captcha" />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase py-4 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-5">
                <div>
                  <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">Verification code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    maxLength={6}
                    value={code}
                    onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-jc-black border border-white/20 focus:border-jc-red text-white outline-none px-4 py-3 text-sm tracking-[0.5em] text-center font-mono text-lg"
                    placeholder="000000"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase py-4 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Verifying…' : 'Verify & Continue'}
                </button>

                <button
                  type="button"
                  onClick={() => setNeedsVerify(false)}
                  className="w-full text-white/40 hover:text-white text-xs uppercase tracking-widest py-2"
                >
                  Use a different email
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
