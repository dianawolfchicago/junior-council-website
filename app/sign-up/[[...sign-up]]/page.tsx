import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUpPage() {
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
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Create Account</span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
            <h1 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
              Join the <span className="text-jc-red">Portal</span>
            </h1>
          </div>

          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-jc-charcoal border border-white/10 shadow-none rounded-none p-8 w-full',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-none',
                dividerLine: 'bg-white/10',
                dividerText: 'text-white/30 text-xs',
                formFieldLabel: 'text-white/70 text-xs font-bold uppercase tracking-widest',
                formFieldInput: 'bg-jc-black border border-white/20 focus:border-jc-red text-white rounded-none outline-none px-4 py-3 text-sm',
                formButtonPrimary: 'bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase rounded-none py-4 shadow-none',
                footerActionLink: 'text-jc-red hover:underline font-bold',
                footerActionText: 'text-white/40 text-xs',
                identityPreviewText: 'text-white',
                identityPreviewEditButton: 'text-jc-red',
                alertText: 'text-red-400 text-xs',
                formFieldErrorText: 'text-red-400 text-xs',
              },
              variables: {
                colorBackground: '#1a1a1a',
                colorText: '#ffffff',
                colorPrimary: '#C8102E',
                colorInputBackground: '#0a0a0a',
                colorInputText: '#ffffff',
                borderRadius: '0px',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
