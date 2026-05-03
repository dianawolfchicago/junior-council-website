'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type BoardMember = {
  name: string
  title: string
  photo?: string
  jobTitle?: string
  company?: string
  memberSince?: string
  bio?: string
}

const boardMembers: BoardMember[] = [
  { name: 'Eve Voci',             title: 'President' },
  { name: 'Gabe Spach',          title: 'Vice President' },
  { name: 'Charlie Nash',         title: 'Treasurer' },
  { name: 'Hailie Schroll',       title: 'Snowball' },
  { name: 'KK Begley',            title: 'Secretary' },
  { name: 'Thomas Ware',          title: 'Engagement' },
  { name: 'Danielle Imbrigiotta', title: 'Recruitment' },
  { name: 'Caroline Cheung',      title: 'Education' },
  { name: 'Erin Bylina',          title: 'Silent Auction' },
  { name: 'Isabella Del Muro',    title: 'W4AC / Fundraising Pages' },
  { name: 'Marisa Stefani',       title: 'Corporate Co-Chair' },
  { name: 'Jessica Linley',       title: 'Corporate Co-Chair' },
  { name: 'Brooklyn Mychalowych', title: 'Creative' },
  { name: 'Catie Hinton',         title: 'PR' },
  { name: 'Emily Splinter',       title: 'Hospitality' },
  {
    name: 'Diana Wolf',
    title: 'Transformation Director',
    photo: '/diana-wolf.jpg',
    jobTitle: 'Financial Tech Consultant',
    company: 'Cognizant',
    memberSince: 'November 2025',
    bio: 'A global adventurer at heart, Diana has explored 25+ countries — her most recent trip taking her to the vibrant streets of Thailand. Of Austrian and Mexican heritage, she speaks English, Spanish, and German fluently. When she\'s not consulting in the financial tech space at Cognizant, you\'ll find her training for her first triathlon or buried in GMAT prep.',
  },
]

export default function BoardPage() {
  const [selected, setSelected] = useState<BoardMember | null>(null)

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
            {boardMembers.map((member, i) => {
              const isClickable = Boolean(member.bio)
              const isSelected = selected?.name === member.name
              return (
                <div
                  key={i}
                  onClick={() => isClickable && setSelected(isSelected ? null : member)}
                  className={`group border transition-colors ${
                    isSelected
                      ? 'border-jc-red'
                      : 'border-jc-gray-mid hover:border-jc-red'
                  } ${isClickable ? 'cursor-pointer' : ''}`}
                >
                  {/* Photo */}
                  <div className={`aspect-square border-b transition-colors overflow-hidden ${
                    isSelected ? 'border-jc-red' : 'border-jc-gray-mid group-hover:border-jc-red'
                  } ${member.photo ? '' : 'bg-jc-gray flex items-center justify-center'}`}>
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover object-center scale-90"
                      />
                    ) : (
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
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex items-start justify-between">
                    <div>
                      <div className="text-jc-red text-xs font-bold tracking-widest uppercase mb-1">
                        {member.title}
                      </div>
                      <h2 className="text-jc-black font-black text-lg leading-tight">
                        {member.name}
                      </h2>
                    </div>
                    {isClickable && (
                      <div className="mt-1 flex-shrink-0">
                        <svg className="w-4 h-4 text-jc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Modal popup */}
          {selected && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60"
              onClick={() => setSelected(null)}
            >
              <div
                className="bg-white w-full max-w-2xl border-t-4 border-jc-red shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Photo */}
                  <div className="relative aspect-square overflow-hidden bg-jc-gray">
                    {selected.photo ? (
                      <Image
                        src={selected.photo}
                        alt={selected.name}
                        fill
                        className="object-cover object-top scale-75 translate-y-8"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-20 h-20 text-jc-gray-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase mb-1">
                          {selected.title}
                        </div>
                        <h3 className="text-jc-black font-black text-2xl tracking-tight">
                          {selected.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelected(null)}
                        className="text-jc-gray-dark hover:text-jc-black transition-colors"
                        aria-label="Close profile"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-3 mb-6 pb-6 border-b border-jc-gray-mid">
                      {selected.jobTitle && (
                        <div>
                          <div className="text-jc-gray-dark text-xs font-bold uppercase tracking-widest mb-0.5">Job Title</div>
                          <div className="text-jc-black font-bold text-sm">{selected.jobTitle}</div>
                        </div>
                      )}
                      {selected.company && (
                        <div>
                          <div className="text-jc-gray-dark text-xs font-bold uppercase tracking-widest mb-0.5">Company</div>
                          <div className="text-jc-black font-bold text-sm">{selected.company}</div>
                        </div>
                      )}
                      {selected.memberSince && (
                        <div>
                          <div className="text-jc-gray-dark text-xs font-bold uppercase tracking-widest mb-0.5">Member Since</div>
                          <div className="text-jc-black font-bold text-sm">{selected.memberSince}</div>
                        </div>
                      )}
                    </div>

                    {selected.bio && (
                      <p className="text-jc-gray-dark text-sm leading-relaxed">{selected.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
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
                { value: '2x',   label: 'Annual board meetings minimum' },
                { value: '$0',   label: 'Administrative overhead from donations' },
                { value: '501(c)(3)', label: 'Registered nonprofit status' },
              ].map((stat, i) => (
                <div key={i} className="bg-jc-charcoal border border-white/10 p-6">
                  <div className="text-jc-red font-black text-3xl mb-2">{stat.value}</div>
                  <div className="text-white/60 text-xs leading-relaxed">{stat.label}</div>
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
