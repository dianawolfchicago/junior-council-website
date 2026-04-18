import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Silent Auction | Snowball | Junior Council',
  description:
    'Bid on exclusive experiences, luxury items, and one-of-a-kind packages at the Junior Council Annual Snowball Silent Auction.',
}

const categories = [
  { label: 'Travel & Experiences', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', desc: 'Weekend getaways, hotel stays, bucket-list adventures, and more.' },
  { label: 'Sports & Entertainment', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z', desc: 'Premium tickets, behind-the-scenes access, and VIP experiences.' },
  { label: 'Dining & Hospitality', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7', desc: 'Chef\'s table dinners, private tastings, and gift cards to Chicago\'s best.' },
  { label: 'Luxury & Lifestyle', icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z', desc: 'Fashion, beauty, spa packages, and curated lifestyle gifts.' },
  { label: 'Art & Collectibles', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', desc: 'Original works, signed memorabilia, and unique collectibles.' },
  { label: 'Wellness & Beauty', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', desc: 'Spa days, fitness packages, and self-care experiences.' },
]

export default function SilentAuctionPage() {
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
            Silent <span className="text-jc-red">Auction</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            One of the most exciting parts of Snowball. Bid on exclusive
            packages and experiences — all proceeds go directly to youth with
            HIV and AIDS at Lurie Children&apos;s Hospital.
          </p>
        </div>
      </section>

      {/* Coming soon notice */}
      <section className="bg-jc-red py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-bold text-sm tracking-wide">
            Auction items for Snowball 2027 will be announced closer to the event — check back soon!
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">What's Up for Bid</span>
            </div>
            <h2 className="text-jc-black font-black text-3xl sm:text-4xl tracking-tight">
              Auction <span className="text-jc-red">Categories</span>
            </h2>
            <p className="text-jc-gray-dark text-lg mt-4">
              Every year our silent auction features an incredible range of
              items generously donated by our partners and community.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.label} className="border border-jc-gray-mid hover:border-jc-red transition-colors p-6 group">
                <div className="w-12 h-12 bg-jc-red/10 flex items-center justify-center mb-4 group-hover:bg-jc-red/20 transition-colors">
                  <svg className="w-6 h-6 text-jc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                  </svg>
                </div>
                <h3 className="text-jc-black font-black text-lg mb-2">{cat.label}</h3>
                <p className="text-jc-gray-dark text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate an item */}
      <section className="bg-jc-charcoal py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Contribute</span>
              </div>
              <h2 className="text-white font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                Donate an <span className="text-jc-red">Auction Item</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-5">
                In-kind donations power our silent auction and reduce event
                costs — meaning more of every dollar goes directly to patient
                care at Lurie Children&apos;s Hospital.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                All donated items are recognized in our event program and on
                our social media channels. We accept donations year-round.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Experiences & Travel', 'Sports Tickets', 'Restaurant Gift Cards', 'Luxury Items', 'Art & Collectibles', 'Spa & Wellness'].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white/5 px-4 py-3 border border-white/10">
                  <div className="w-2 h-2 bg-jc-red flex-shrink-0" aria-hidden="true" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
