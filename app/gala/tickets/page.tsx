import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Get Your Tickets | Snowball 2027 | Junior Council',
  description:
    'Purchase tickets to the Junior Council Annual Snowball Gala — Chicago\'s premier fundraising event for youth with HIV and AIDS.',
}

export default function TicketsPage() {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-jc-black py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1.5 h-full bg-jc-red" aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-24 top-0 w-2/5 h-full bg-jc-red/8 transform skew-x-[-8deg]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
              Annual Snowball Gala
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Get Your <span className="text-jc-red">Tickets</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Join us for the most anticipated night of the year. Tickets go on
            sale soon — check back here or follow us on social media for the
            announcement.
          </p>
        </div>
      </section>

      {/* Tickets not yet on sale */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-jc-red/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-jc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Tickets Coming <span className="text-jc-red">Soon</span>
          </h2>
          <p className="text-jc-gray-dark text-lg mb-8 max-w-xl mx-auto">
            Snowball 2027 tickets are not yet on sale. Sign up below to be
            notified the moment they drop — they sell out fast.
          </p>

          {/* Email notify form placeholder */}
          <div className="bg-jc-gray p-8 text-left max-w-md mx-auto">
            <h3 className="text-jc-black font-black text-lg mb-4">Notify Me When Tickets Go Live</h3>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full border-2 border-jc-gray-mid focus:border-jc-red px-4 py-3 text-sm outline-none transition-colors"
              />
              <button className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase py-3 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-jc-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">The Experience</span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
            <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
              What to <span className="text-jc-red">Expect</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3', label: 'Live Music & DJ', desc: 'Dance the night away with live entertainment and a full DJ set.' },
              { icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7', label: 'Silent Auction', desc: 'Bid on exclusive experiences, luxury items, and one-of-a-kind packages.' },
              { icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', label: 'Open Bar', desc: 'Premium open bar with craft cocktails, beer, wine, and spirits all night.' },
              { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', label: '500+ Attendees', desc: 'Connect with Chicago\'s most engaged young professionals at one event.' },
            ].map((item) => (
              <div key={item.label} className="border border-white/10 p-6 hover:border-jc-red transition-colors">
                <div className="w-10 h-10 bg-jc-red/20 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-jc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-white font-black text-base mb-2">{item.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-jc-gray py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Interested in <span className="text-jc-red">Sponsoring?</span>
          </h2>
          <p className="text-jc-gray-dark mb-8">
            Corporate sponsorships are available now. Reach out to secure your
            spot before tickets go on sale.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-10 py-4 transition-colors"
          >
            View Sponsorship Tiers
          </Link>
        </div>
      </section>
    </div>
  )
}
