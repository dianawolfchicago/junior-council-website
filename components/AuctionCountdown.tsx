'use client'

import { useEffect, useState } from 'react'

// ← Update this date once the gala date is confirmed
const AUCTION_START = new Date('2027-01-23T19:00:00-06:00') // Jan 23, 2027 · 7:00 PM CT

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  started: boolean
}

function getTimeLeft(): TimeLeft {
  const now = new Date()
  const diff = AUCTION_START.getTime() - now.getTime()

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    started: false,
  }
}

export default function AuctionCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft())
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  // Avoid hydration mismatch — render nothing until client kicks in
  if (!timeLeft) return null

  if (timeLeft.started) {
    return (
      <section className="bg-jc-red py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-black text-2xl sm:text-3xl tracking-tight">
            🎉 Bidding is now open!
          </p>
          <p className="text-white/80 text-sm mt-2">Head to the auction floor and place your bids.</p>
        </div>
      </section>
    )
  }

  const units = [
    { label: 'Days',    value: timeLeft.days },
    { label: 'Hours',   value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <section className="bg-jc-black border-t border-white/10 py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
          <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Bidding Opens</span>
          <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
        </div>
        <h2 className="text-white font-black text-2xl sm:text-3xl tracking-tight mb-8">
          Snowball 2027 Auction Starts In
        </h2>

        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
          {units.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="w-full bg-jc-charcoal border border-white/10 py-4 sm:py-6">
                <span className="text-jc-red font-black text-3xl sm:text-5xl tabular-nums leading-none">
                  {String(value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-white/30 text-xs mt-8 uppercase tracking-widest">
          January 23, 2027 · 7:00 PM CT · Chicago, IL
        </p>
      </div>
    </section>
  )
}
