import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function checkCode(formData: FormData) {
  'use server'
  const code = formData.get('code') as string
  if (code?.trim() === process.env.INVITE_CODE) {
    cookies().set('jc_invite', '1', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1 hour — enough time to complete signup
    })
    redirect('/sign-up')
  } else {
    redirect('/join?error=1')
  }
}

export default function JoinPage({ searchParams }: { searchParams: { error?: string } }) {
  const hasError = searchParams.error === '1'

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

      {/* Card */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">New Member</span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
            <h1 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
              Member <span className="text-jc-red">Access</span>
            </h1>
            <p className="text-white/50 text-sm mt-2">
              Enter the access code shared at onboarding to create your account.
            </p>
          </div>

          <form action={checkCode}>
            <div className="bg-jc-charcoal border border-white/10 p-8">
              <div className="space-y-5">

                {hasError && (
                  <div className="bg-red-900/30 border border-red-500/40 px-4 py-3">
                    <p className="text-red-400 text-xs font-bold">
                      Incorrect access code. Please double-check and try again, or contact{' '}
                      <a href="mailto:info@juniorcouncil.org" className="underline">info@juniorcouncil.org</a>.
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="code" className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                    Access Code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    placeholder="Enter your access code"
                    required
                    autoComplete="off"
                    className="w-full bg-jc-black border border-white/20 focus:border-jc-red px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20 tracking-widest"
                  />
                </div>

                <button
                  type="submit"
                  className="block w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase py-4 text-center transition-colors"
                >
                  Continue
                </button>
              </div>

              <div className="border-t border-white/10 mt-8 pt-6 text-center">
                <p className="text-white/40 text-xs">
                  Already have an account?{' '}
                  <Link href="/login" className="text-jc-red hover:underline font-bold">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>

          <p className="text-white/20 text-xs text-center mt-6">
            Don&apos;t have an access code? Contact{' '}
            <a href="mailto:info@juniorcouncil.org" className="text-white/40 hover:text-white transition-colors">
              info@juniorcouncil.org
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
