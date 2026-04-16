import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Annual Snowball Gala | Junior Council',
  description:
    'Join Junior Council\'s Annual Snowball Gala — Chicago\'s premier fundraising event for youth with HIV and AIDS.',
}

const sponsorTiers = [
  {
    name: 'Presenting Sponsor',
    amount: '$XX,XXX+',
    benefits: [
      'Premier logo placement on all event materials',
      'Reserved VIP table for 10',
      'Dedicated social media feature',
      'Recognition from the stage',
      'Year-round logo placement on JC website',
    ],
  },
  {
    name: 'Gold Sponsor',
    amount: '$X,XXX+',
    benefits: [
      'Logo on event signage and program',
      'Reserved table for 8',
      'Social media recognition',
      'Recognition from the stage',
    ],
  },
  {
    name: 'Silver Sponsor',
    amount: '$X,XXX+',
    benefits: [
      'Logo on event program',
      'Reserved seats for 4',
      'Social media recognition',
    ],
  },
  {
    name: 'Bronze Sponsor',
    amount: '$XXX+',
    benefits: [
      'Name in event program',
      'Two event tickets',
    ],
  },
]

export default function GalaPage() {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-jc-black py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1.5 h-full bg-jc-red" aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-24 top-0 w-2/5 h-full bg-jc-red/5 transform skew-x-[-8deg]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
              Signature Event
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Annual Snowball Gala
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Chicago&apos;s premier fundraising event for youth with HIV and AIDS.
            An unforgettable evening of community, generosity, and impact.
          </p>
          {/* Coming Soon announcement bar */}
          <div className="mt-8 inline-flex items-center gap-3 bg-jc-red px-5 py-3">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" aria-hidden="true" />
            <span className="text-white font-bold text-sm tracking-wide">
              Date &amp; venue announcement coming soon — stay tuned!
            </span>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                About the <span className="text-jc-red">Gala</span>
              </h2>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                The Annual Snowball Gala is Junior Council&apos;s flagship fundraising
                event, bringing together hundreds of Chicago professionals,
                corporate leaders, and community advocates for an evening of
                impact.
              </p>
              <p className="text-jc-gray-dark leading-relaxed mb-5">
                Each year, the Gala features live entertainment, an exciting
                silent auction, premium food and beverage hospitality, and
                an opportunity to hear directly from the patients and medical
                team at Lurie Children&apos;s Hospital.
              </p>
              <p className="text-jc-gray-dark leading-relaxed mb-8">
                Proceeds from the Gala fund critical programs and services for
                adolescents living with HIV and AIDS at Ann &amp; Robert H. Lurie
                Children&apos;s Hospital of Chicago.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Date', value: 'Winter 2027 — Announcing Soon' },
                  { label: 'Location', value: 'Chicago, IL' },
                  { label: 'Dress Code', value: 'Black Tie Optional' },
                  { label: 'Tickets', value: 'Contact us to get notified' },
                ].map((detail, i) => (
                  <div key={i} className="border-l-2 border-jc-red pl-4">
                    <div className="text-jc-gray-dark text-xs uppercase tracking-wide mb-1">
                      {detail.label}
                    </div>
                    <div className="text-jc-black font-bold text-sm">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-jc-black p-10">
              <div className="text-white font-black text-2xl mb-6">
                Event Highlights
              </div>
              <div className="space-y-5">
                {[
                  { icon: '🎵', title: 'Live Entertainment', desc: 'Music and performances throughout the evening.' },
                  { icon: '🏆', title: 'Silent Auction', desc: 'Bid on curated experiences, travel packages, and luxury items.' },
                  { icon: '🍽️', title: 'Premium Hospitality', desc: 'Top-tier catering and open bar from Chicago\'s best vendors.' },
                  { icon: '💙', title: 'Mission Moment', desc: 'Hear firsthand from patients and the Lurie care team.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                    <div>
                      <div className="text-white font-bold mb-1">{item.title}</div>
                      <div className="text-white/50 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Silent Auction */}
      <section id="auction" className="bg-jc-gray py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Silent <span className="text-jc-red">Auction</span>
          </h2>
          <p className="text-jc-gray-dark text-lg max-w-3xl mb-12">
            Our silent auction features an incredible array of experiences,
            luxury items, travel packages, and more — all donated by our generous
            sponsors and community partners.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Travel & Experiences',
              'Sports & Entertainment',
              'Dining & Hospitality',
              'Art & Luxury Items',
            ].map((category, i) => (
              <div key={i} className="bg-white border-t-4 border-jc-red p-6">
                <h3 className="text-jc-black font-black text-lg mb-2">{category}</h3>
                <p className="text-jc-gray-dark text-sm">
                  Curated items and experiences from Chicago&apos;s best.
                </p>
              </div>
            ))}
          </div>
          <p className="text-jc-gray-dark text-sm mt-8">
            Interested in donating an item to the silent auction?{' '}
            <Link href="/contact" className="text-jc-red font-bold hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Sponsors */}
      <section id="sponsors" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Sponsorship <span className="text-jc-red">Opportunities</span>
          </h2>
          <p className="text-jc-gray-dark text-lg max-w-3xl mb-12">
            Gala sponsorship is an opportunity to align your brand with a
            meaningful cause while gaining visibility among Chicago&apos;s most
            engaged professional community.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorTiers.map((tier, i) => (
              <div
                key={i}
                className={`border-2 p-6 ${
                  i === 0
                    ? 'border-jc-red bg-jc-black text-white'
                    : 'border-jc-gray-mid'
                }`}
              >
                <div
                  className={`font-black text-3xl mb-1 ${
                    i === 0 ? 'text-jc-red' : 'text-jc-red'
                  }`}
                >
                  {tier.amount}
                </div>
                <div
                  className={`font-black text-xl mb-4 ${
                    i === 0 ? 'text-white' : 'text-jc-black'
                  }`}
                >
                  {tier.name}
                </div>
                <div className="w-8 h-0.5 bg-jc-red mb-4" aria-hidden="true" />
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div
                        className="w-4 h-4 bg-jc-red flex-shrink-0 flex items-center justify-center mt-0.5"
                        aria-hidden="true"
                      >
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span
                        className={`text-xs leading-relaxed ${
                          i === 0 ? 'text-white/70' : 'text-jc-gray-dark'
                        }`}
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-10 py-4 transition-colors"
            >
              Become a Gala Sponsor
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Gallery placeholder */}
      <section id="gallery" className="bg-jc-gray py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-12 tracking-tight">
            Photo <span className="text-jc-red">Gallery</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-jc-gray-mid aspect-square flex items-center justify-center"
                aria-label="Event photo placeholder"
              >
                <svg className="w-10 h-10 text-jc-gray-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))}
          </div>
          <p className="text-jc-gray-dark text-sm mt-6 text-center">
            Event photos will be added here after each gala.
          </p>
        </div>
      </section>
    </div>
  )
}
