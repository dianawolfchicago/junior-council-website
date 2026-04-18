import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Board of Directors | Junior Council',
  description:
    'Meet the Junior Council Board of Directors — Chicago professionals leading the fight for youth with HIV and AIDS.',
}

const boardMembers = [
  { name: 'Eve Voci',               title: 'President' },
  { name: 'Gabe Spach',             title: 'Vice President' },
  { name: 'Charlie Nash',           title: 'Treasurer' },
  { name: 'Hailie Schroll',         title: 'Snowball' },
  { name: 'KK Begley',              title: 'Secretary' },
  { name: 'Thomas Ware',            title: 'Engagement' },
  { name: 'Danielle Imbrigiotta',   title: 'Recruitment' },
  { name: 'Caroline Cheung',        title: 'Education' },
  { name: 'Erin Bylina',            title: 'Silent Auction' },
  { name: 'Isabella Del Muro',      title: 'W4AC / Fundraising Pages' },
  { name: 'Marisa Stefani',         title: 'Corporate Co-Chair' },
  { name: 'Jessica Linley',         title: 'Corporate Co-Chair' },
  { name: 'Brooklyn Mychalowych',   title: 'Creative' },
  { name: 'Catie Hinton',           title: 'PR' },
  { name: 'Emily Splinter',         title: 'Hospitality' },
  { name: 'Diana Wolf',             title: 'Transformation Director' },
]

export default function BoardPage() {
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
              Leadership
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Board of Directors
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Meet the 2026 / 2027 Junior Council Board of Directors — Chicago
            professionals leading the fight for youth with HIV and AIDS.
          </p>
        </div>
      </section>

      {/* Board Members Grid */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {boardMembers.map((member, i) => (
              <div
                key={i}
                className="group border border-jc-gray-mid hover:border-jc-red transition-colors"
              >
                {/* Photo placeholder */}
                <div className="bg-jc-gray aspect-square flex items-center justify-center border-b border-jc-gray-mid group-hover:border-jc-red transition-colors">
                  <svg
                    className="w-16 h-16 text-jc-gray-mid"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="text-jc-red text-xs font-bold tracking-widest uppercase mb-1">
                    {member.title}
                  </div>
                  <h2 className="text-jc-black font-black text-lg leading-tight">
                    {member.name}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory / Lurie Connection */}
      <section className="bg-jc-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                  Our Partnership
                </span>
              </div>
              <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight mb-5">
                Guided by Purpose,
                <br />
                <span className="text-jc-red">Accountable to Lurie.</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-5">
                The Junior Council Board of Directors works in close partnership
                with Ann &amp; Robert H. Lurie Children&apos;s Hospital of Chicago to
                ensure that all funds raised are deployed effectively and that
                our work reflects the needs of the adolescent HIV community.
              </p>
              <p className="text-white/70 leading-relaxed">
                Our board members serve as ambassadors for the mission,
                connecting their professional networks, corporate relationships,
                and personal passion to amplify Junior Council&apos;s impact across
                Chicago.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '100%', label: 'Volunteer board — no paid staff overhead' },
                { value: '2x', label: 'Annual board meetings minimum' },
                { value: '$0', label: 'Administrative overhead from donations' },
                { value: '501(c)(3)', label: 'Registered nonprofit status' },
              ].map((stat, i) => (
                <div key={i} className="bg-jc-charcoal border border-white/10 p-6">
                  <div className="text-jc-red font-black text-3xl mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join the Board CTA */}
      <section className="bg-jc-gray py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Interested in Joining
            <span className="text-jc-red"> the Board?</span>
          </h2>
          <p className="text-jc-gray-dark text-lg mb-8 max-w-2xl mx-auto">
            Junior Council welcomes expressions of interest from dedicated
            Chicago professionals who share our commitment to the mission.
            Board seats are filled on a rolling basis.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-10 py-4 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
