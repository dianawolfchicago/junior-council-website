import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Membership | Junior Council',
  description:
    'Join Junior Council. Learn about membership, committees, life in JC, and dues.',
}

const committees = [
  {
    name: 'Events Committee',
    description:
      'Plan and execute Junior Council\'s signature events, including the Annual Snowball Gala and smaller community gatherings.',
  },
  {
    name: 'Fundraising Committee',
    description:
      'Develop fundraising strategies, manage donor relationships, and identify new corporate partnership opportunities.',
  },
  {
    name: 'Marketing & Communications',
    description:
      'Manage JC\'s brand, social media presence, email communications, and public outreach.',
  },
  {
    name: 'Membership Committee',
    description:
      'Recruit and retain members, onboard new members, and cultivate a strong JC community.',
  },
  {
    name: 'Sponsorship Committee',
    description:
      'Identify, engage, and steward corporate and individual sponsors for JC events and initiatives.',
  },
  {
    name: 'DEI Committee',
    description:
      'Advance diversity, equity, and inclusion initiatives across all JC programming and organizational practices.',
  },
]

export default function MembershipPage() {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-jc-black py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1.5 h-full bg-jc-red" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
              Membership
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Join Junior Council
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Become part of a community of passionate Chicago professionals
            committed to making a real difference.
          </p>
        </div>
      </section>

      {/* Get Involved */}
      <section id="join" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                Why <span className="text-jc-red">Join?</span>
              </h2>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                Junior Council membership is more than a title — it&apos;s a
                commitment to community, advocacy, and action. Members are the
                heartbeat of everything we do: planning events, building
                partnerships, amplifying our mission, and raising critical funds
                for Lurie Children&apos;s Hospital.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Access to exclusive JC events and networking',
                  'Volunteer leadership opportunities',
                  'Committee involvement and skill development',
                  'Connection to Chicago\'s nonprofit community',
                  'Direct impact on youth with HIV and AIDS',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-jc-red flex-shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-jc-gray-dark">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
              >
                Apply for Membership
              </Link>
            </div>
            <div className="bg-jc-black p-10">
              <h3 className="text-white font-black text-2xl mb-6">
                Membership at a Glance
              </h3>
              <div className="space-y-6">
                {[
                  {
                    label: 'Who Can Join',
                    value: 'Chicago-area professionals & community members',
                  },
                  {
                    label: 'Commitment',
                    value: 'Committee participation, event attendance',
                  },
                  {
                    label: 'Annual Dues',
                    value: 'See dues section below',
                  },
                  {
                    label: 'Applications',
                    value: 'Accepted on a rolling basis',
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-jc-red pl-4">
                    <div className="text-white/40 text-xs uppercase tracking-wide mb-1">
                      {item.label}
                    </div>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life in JC */}
      <section id="life" className="bg-jc-gray py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Life in <span className="text-jc-red">JC</span>
          </h2>
          <p className="text-jc-gray-dark text-lg max-w-3xl mb-12">
            Junior Council is a community first. Members engage year-round
            through committee work, social events, volunteer days, and our
            signature Annual Snowball Gala. Here&apos;s what being a part of JC
            looks like.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Community Events',
                desc: 'Regular social gatherings, happy hours, and volunteer days to connect with fellow members.',
              },
              {
                title: 'Annual Gala',
                desc: 'Our flagship Snowball Gala is Chicago\'s premier nonprofit fundraising event — members are at the heart of it.',
              },
              {
                title: 'Advocacy & Impact',
                desc: 'Members participate in awareness campaigns and directly advocate for the adolescents we serve.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 border-t-4 border-jc-red">
                <h3 className="text-jc-black font-black text-xl mb-3">{item.title}</h3>
                <p className="text-jc-gray-dark text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees */}
      <section id="committees" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Our <span className="text-jc-red">Committees</span>
          </h2>
          <p className="text-jc-gray-dark text-lg max-w-3xl mb-12">
            Members join one or more committees based on their interests and
            skills. Committees are where the real work happens.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee, i) => (
              <div key={i} className="border border-jc-gray-mid hover:border-jc-red transition-colors p-6">
                <h3 className="text-jc-black font-black text-lg mb-3">
                  {committee.name}
                </h3>
                <p className="text-jc-gray-dark text-sm leading-relaxed">
                  {committee.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dues */}
      <section id="dues" className="bg-jc-charcoal py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Membership <span className="text-jc-red">Dues</span>
          </h2>
          <p className="text-white/60 text-lg mb-12">
            Junior Council membership is an investment in your community — and
            directly in the lives of adolescents living with HIV and AIDS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {/* Annual Dues */}
            <div className="bg-jc-black border border-white/10 p-8">
              <div className="text-jc-red font-black text-4xl mb-1">$100</div>
              <div className="text-white font-black text-xl mb-3">Annual Dues</div>
              <div className="w-8 h-0.5 bg-jc-red mb-4" aria-hidden="true" />
              <p className="text-white/60 text-sm leading-relaxed">
                Flat annual membership fee covering committee access, event
                invitations, voting rights, and full participation in Junior
                Council programming.
              </p>
            </div>
            {/* Fundraising Requirement */}
            <div className="bg-jc-red p-8">
              <div className="text-white font-black text-4xl mb-1">$100</div>
              <div className="text-white font-black text-xl mb-3">Fundraising Minimum</div>
              <div className="w-8 h-0.5 bg-white/40 mb-4" aria-hidden="true" />
              <p className="text-white/80 text-sm leading-relaxed">
                Each member raises a minimum of $100 through their personal
                OneCause fundraiser page. Every dollar goes directly to the
                Adolescent HIV program at Lurie Children&apos;s Hospital.
              </p>
            </div>
          </div>
          {/* OneCause callout */}
          <div className="border border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 bg-jc-red flex-shrink-0 flex items-center justify-center" aria-hidden="true">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold mb-1">Powered by OneCause</div>
              <p className="text-white/50 text-sm">
                Every member gets their own personal fundraising page on
                OneCause — share it with friends, family, and your network to
                hit your $100 fundraising goal.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
