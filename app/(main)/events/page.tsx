import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Events | Junior Council',
  description:
    'Upcoming Junior Council events open to the public — join us for networking, fundraising, and community gatherings in Chicago.',
}

const events = [
  {
    title: 'Spring Kickoff Happy Hour',
    date: 'TBD — Spring 2026',
    time: '6:00 PM – 9:00 PM',
    location: 'TBD, Chicago, IL',
    type: 'Networking',
    description:
      'Kick off the season with fellow Junior Council members and supporters. Enjoy cocktails, light bites, and great conversation while connecting with Chicago professionals who share a passion for the mission.',
    cta: null,
  },
  {
    title: 'Wellness for a Cause',
    date: 'TBD — Summer 2026',
    time: '8:00 AM – 11:00 AM',
    location: 'TBD, Chicago, IL',
    type: 'Fundraiser',
    description:
      'Our annual wellness event brings the community together for a morning of fitness and fun — all in support of the Adolescent HIV Program at Lurie Children\'s Hospital. Past formats have included yoga, cycling, and outdoor fitness classes.',
    cta: null,
  },
  {
    title: 'Annual Snowball Gala 2027',
    date: 'Winter 2027 — Announcing Soon',
    time: 'Doors open at 6:00 PM',
    location: 'Chicago, IL',
    type: 'Signature Event',
    description:
      'Junior Council\'s flagship fundraiser returns for another unforgettable evening. Black tie. Live entertainment. Silent auction. 500+ guests. And one shared mission: giving Chicago\'s youth with HIV and AIDS a fighting chance.',
    cta: { label: 'View Gala Details', href: '/gala' },
  },
]

const typeColors: Record<string, string> = {
  'Networking':     'bg-jc-gray text-jc-gray-dark border border-jc-gray-mid',
  'Fundraiser':     'bg-jc-red/10 text-jc-red border border-jc-red/20',
  'Signature Event': 'bg-jc-black text-white border border-white/10',
}

export default function EventsPage() {
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
              Get Involved
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            From networking happy hours to our signature Snowball Gala — there
            are plenty of ways to get involved, give back, and connect with the
            Junior Council community.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {events.map((event, i) => (
              <div
                key={i}
                className="border border-jc-gray-mid hover:border-jc-red transition-colors p-8 sm:p-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <span
                      className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 mb-4 ${typeColors[event.type] ?? typeColors['Networking']}`}
                    >
                      {event.type}
                    </span>
                    <h2 className="text-jc-black font-black text-2xl sm:text-3xl tracking-tight">
                      {event.title}
                    </h2>
                  </div>
                </div>

                {/* Details row */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-jc-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-jc-gray-dark text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-jc-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-jc-gray-dark text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-jc-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-jc-gray-dark text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-jc-gray-dark text-base leading-relaxed mb-6">
                  {event.description}
                </p>

                {event.cta ? (
                  <Link
                    href={event.cta.href}
                    className="inline-flex items-center text-jc-black font-bold text-sm uppercase tracking-widest border-b-2 border-jc-red hover:text-jc-red transition-colors pb-1"
                  >
                    {event.cta.label}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <p className="text-jc-gray-dark text-xs uppercase tracking-widest font-bold">
                    Details announcing soon
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay in the Loop CTA */}
      <section className="bg-jc-charcoal py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Become a member to get first access to event announcements, ticket
            releases, and exclusive Junior Council gatherings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership#join"
              className="inline-flex items-center justify-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Become a Member
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-bold text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
