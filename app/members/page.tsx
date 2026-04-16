import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Member Directory | Junior Council',
  description:
    'Browse the active members of Junior Council — Chicago professionals united around the fight for youth with HIV and AIDS.',
}

const committees = [
  'All Members',
  'Events',
  'Fundraising',
  'Marketing & Communications',
  'Membership',
  'Sponsorship',
  'DEI',
]

// Placeholder members — replace with real data
const members = [
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Events', year: '2024' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Fundraising', year: '2024' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Marketing & Communications', year: '2023' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'DEI', year: '2024' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Sponsorship', year: '2022' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Membership', year: '2024' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Events', year: '2023' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Fundraising', year: '2023' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'DEI', year: '2022' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Marketing & Communications', year: '2024' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Events', year: '2022' },
  { name: 'Member Name', title: 'Job Title', company: 'Company', committee: 'Sponsorship', year: '2023' },
]

export default function MembersPage() {
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
              Our Community
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Member Directory
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Meet the active members of Junior Council — Chicago professionals
            united around a shared mission and a real cause.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-jc-charcoal py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <span className="text-jc-red font-black text-2xl">{members.length}+</span>
              <span className="text-white/50 text-sm ml-2">Active Members</span>
            </div>
            <div>
              <span className="text-jc-red font-black text-2xl">6</span>
              <span className="text-white/50 text-sm ml-2">Committees</span>
            </div>
            <div className="ml-auto">
              <Link
                href="/membership#join"
                className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-xs tracking-widest uppercase px-5 py-2.5 transition-colors"
              >
                Join Junior Council
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Directory */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Committee filter — rendered as static links for now; can be made interactive */}
          <div className="flex flex-wrap gap-2 mb-10">
            {committees.map((c, i) => (
              <span
                key={i}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors cursor-default ${
                  i === 0
                    ? 'bg-jc-red border-jc-red text-white'
                    : 'border-jc-gray-mid text-jc-gray-dark'
                }`}
              >
                {c}
              </span>
            ))}
          </div>

          {/* Member grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {members.map((member, i) => (
              <div
                key={i}
                className="group border border-jc-gray-mid hover:border-jc-red transition-colors p-5 flex items-start gap-4"
              >
                {/* Avatar placeholder */}
                <div
                  className="w-12 h-12 bg-jc-gray flex-shrink-0 flex items-center justify-center group-hover:bg-jc-red/10 transition-colors"
                  aria-hidden="true"
                >
                  <svg className="w-6 h-6 text-jc-gray-mid group-hover:text-jc-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-jc-black font-black text-sm leading-tight truncate">
                    {member.name}
                  </div>
                  <div className="text-jc-gray-dark text-xs mt-0.5 truncate">
                    {member.title}
                  </div>
                  <div className="text-jc-gray-dark text-xs truncate mb-2">
                    {member.company}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-jc-red text-xs font-bold uppercase tracking-wide">
                      {member.committee}
                    </span>
                    <span className="text-white/0 text-xs select-none" aria-hidden="true">·</span>
                    <span className="text-jc-gray-dark text-xs">Since {member.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-jc-gray-dark text-sm text-center mt-12">
            This directory reflects current active members. Information updated annually.{' '}
            <Link href="/contact" className="text-jc-red font-bold hover:underline">
              Contact us
            </Link>{' '}
            with updates.
          </p>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-jc-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Don&apos;t See Your Name?
            <span className="text-jc-red"> Join Us.</span>
          </h2>
          <p className="text-white/60 mb-8">
            Junior Council membership is open to Chicago-area professionals who
            share our passion for the mission.
          </p>
          <Link
            href="/membership#join"
            className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-10 py-4 transition-colors"
          >
            Learn About Membership
          </Link>
        </div>
      </section>
    </div>
  )
}
