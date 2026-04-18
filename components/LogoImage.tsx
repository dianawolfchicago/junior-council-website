'use client'

import { useState } from 'react'

export default function LogoImage({ domain, name }: { domain?: string; name: string }) {
  const [error, setError] = useState(false)

  if (!domain || error) {
    return (
      <svg className="w-6 h-6 text-jc-gray-mid group-hover:text-jc-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`}
      className="w-full h-full object-contain p-1"
      onError={() => setError(true)}
    />
  )
}
