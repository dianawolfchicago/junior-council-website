import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Event Recaps | Snowball | Junior Council',
  description:
    'Relive the magic of past Junior Council Snowball Galas — highlights, photos, and impact from every year.',
}

const stats2026 = [
  { value: '$242,000', label: 'Total Raised' },
  { value: '500+',     label: 'Attendees' },
  { value: '30+',      label: 'Corporate Sponsors' },
  { value: '50+',      label: 'Silent Auction Items' },
]

const highlights2026 = [
  'Surpassed our $250,000 fundraising goal with the most successful Thermometer Raise in Junior Council history',
  'Welcomed over 500 guests to a stunning sold-out venue in the heart of Chicago',
  'Presented the annual Junior Council Scholarship to a deserving patient of the Lurie Children\'s Adolescent HIV/AIDS Program',
  'Featured 30+ corporate sponsors representing some of Chicago\'s most prominent companies',
  'Raised over $40,000 through a record-breaking silent auction with 50+ items',
  'Hosted a Kick-Off Party the night before, bringing together sponsors and board members for an exclusive preview evening',
  'Partnered with 50+ hospitality sponsors who donated food, beverage, and services to make the night possible',
]

// Photo grid — replace src values with real photos when available
const photos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  alt: `Snowball 2026 photo ${i + 1}`,
  aspect: i % 5 === 0 ? 'aspect-video' : 'aspect-square',
}))

export default function RecapPage() {
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
            Event <span className="text-jc-red">Recaps</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Every Snowball is a milestone. Here&apos;s a look back at the moments,
            the people, and the impact that make it all worthwhile.
          </p>
        </div>
      </section>

      {/* 2026 Recap */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Year header */}
          <div className="flex items-center gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Most Recent</span>
              </div>
              <h2 className="text-jc-black font-black text-4xl sm:text-5xl tracking-tight">
                Snowball <span className="text-jc-red">2026</span>
              </h2>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats2026.map((stat) => (
              <div key={stat.label} className="bg-jc-black p-6 text-center">
                <div className="text-jc-red font-black text-3xl sm:text-4xl mb-1">{stat.value}</div>
                <div className="text-white/60 text-xs uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Highlights + intro */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            <div>
              <h3 className="text-jc-black font-black text-2xl sm:text-3xl mb-6 tracking-tight">
                A Night to <span className="text-jc-red">Remember</span>
              </h3>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                Snowball 2026 was our most successful gala to date. Thanks to
                the generosity of our guests, sponsors, and partners, Junior
                Council raised <strong className="text-jc-black">$242,000</strong> — nearly meeting our
                $250,000 goal and setting a new benchmark for the organization.
              </p>
              <p className="text-jc-gray-dark leading-relaxed">
                Every dollar raised goes directly to supporting adolescents
                living with HIV and AIDS through the Pediatric &amp; Adolescent
                HIV/AIDS Program at Ann &amp; Robert H. Lurie Children&apos;s Hospital
                of Chicago. Snowball 2026 proved once again that when Chicago
                shows up, it shows up in a big way.
              </p>
            </div>
            <div>
              <h3 className="text-jc-black font-black text-xl mb-5 tracking-tight">Highlights</h3>
              <div className="space-y-3">
                {highlights2026.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-jc-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-jc-gray-dark text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photo gallery */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Photos</span>
            </div>
            <h3 className="text-jc-black font-black text-2xl sm:text-3xl mb-8 tracking-tight">
              Snowball 2026 <span className="text-jc-red">Gallery</span>
            </h3>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`bg-jc-gray overflow-hidden group relative ${photo.aspect} ${photo.id === 1 || photo.id === 7 ? 'col-span-2' : ''}`}
                >
                  {/* Placeholder — replace with <Image> when real photos are available */}
                  <div className="absolute inset-0 flex items-center justify-center bg-jc-gray group-hover:bg-jc-gray-mid transition-colors">
                    <svg className="w-8 h-8 text-jc-gray-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* Red overlay on hover */}
                  <div className="absolute inset-0 bg-jc-red/0 group-hover:bg-jc-red/10 transition-colors" />
                </div>
              ))}
            </div>
            <p className="text-jc-gray-dark text-sm text-center mt-6">
              More photos available on our{' '}
              <Link href="/gallery" className="text-jc-red font-bold hover:underline">
                full gallery page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Divider for future years */}
      <section className="bg-jc-gray py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Be Part of <span className="text-jc-red">Snowball 2027</span>
          </h2>
          <p className="text-jc-gray-dark mb-8">
            Tickets and sponsorships for Snowball 2027 will be available soon.
            Don&apos;t miss your chance to be part of the next chapter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gala/tickets"
              className="inline-flex items-center justify-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Get Tickets
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center justify-center border-2 border-jc-black text-jc-black font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-jc-black hover:text-white transition-colors"
            >
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
