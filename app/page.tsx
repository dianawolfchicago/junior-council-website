import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Junior Council | Fighting for Youth with HIV/AIDS in Chicago',
}

const stats = [
  { value: '39+', label: 'Years of Impact', description: 'Fighting for Chicago youth since 1987' },
  { value: '$5M+', label: 'Raised for Lurie', description: 'Funding life-saving care' },
  { value: '1,000+', label: 'Lives Impacted', description: 'Adolescents supported' },
  { value: '40+', label: 'Partners & Sponsors', description: 'Community allies' },
]

const involvementCards = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Become a Member',
    description:
      'Join a vibrant community of young Chicago professionals committed to making a real difference for youth living with HIV and AIDS.',
    cta: 'Join Junior Council',
    href: '/membership#join',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Attend the Gala',
    description:
      'Join us at the Annual Snowball Gala — our signature fundraising event featuring live entertainment, a silent auction, and an incredible Chicago crowd.',
    cta: 'View Gala Details',
    href: '/gala',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Corporate Partnership',
    description:
      'Align your brand with a cause that matters. Corporate partners receive visibility across our events, communications, and the greater Lurie network.',
    cta: 'Partner With Us',
    href: '/support#corporate',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen bg-jc-black flex items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background design elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Large subtle red diagonal block */}
          <div className="absolute -right-24 top-0 w-2/5 h-full bg-jc-red/8 transform skew-x-[-8deg]" />
          {/* Red accent stripe */}
          <div className="absolute right-0 top-0 w-1.5 h-full bg-jc-red" />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                Chicago&apos;s Nonprofit for Youth with HIV &amp; AIDS
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-white font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-8">
              Giving Chicago&apos;s
              <br />
              <span className="text-jc-red">Youth</span> a
              <br />
              Fighting Chance.
            </h1>

            {/* Subheadline */}
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              In partnership with{' '}
              <span className="text-white font-semibold">
                Ann &amp; Robert H. Lurie Children&apos;s Hospital of Chicago
              </span>
              , Junior Council raises critical funds for adolescents living with
              HIV and AIDS — connecting community, purpose, and generosity to
              change young lives.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/membership#join"
                className="inline-flex items-center justify-center bg-white text-jc-black font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-jc-gray-mid transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jc-black"
              >
                Get Involved
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/support#donate"
                className="inline-flex items-center justify-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors focus:outline-none focus:ring-2 focus:ring-jc-red focus:ring-offset-2 focus:ring-offset-jc-black"
              >
                Make a Donation
              </Link>
            </div>

            {/* Lurie badge */}
            <div className="mt-14 flex items-center gap-4 pt-8 border-t border-white/10">
              <div
                className="w-10 h-10 bg-jc-red/20 border border-jc-red/40 flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <svg className="w-5 h-5 text-jc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-white/50 text-sm">
                Proud partner of{' '}
                <span className="text-white/80 font-semibold">
                  Ann &amp; Robert H. Lurie Children&apos;s Hospital of Chicago
                </span>
                {' '}— ranked among the nation&apos;s best children&apos;s hospitals.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ─── IMPACT STATS ─────────────────────────────────────────────── */}
      <section
        className="bg-jc-charcoal py-16 lg:py-20"
        aria-label="Impact statistics"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center lg:px-8">
                <div
                  className="text-jc-red font-black text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tight mb-2"
                  aria-label={`${stat.value} — ${stat.label}`}
                >
                  {stat.value}
                </div>
                <div className="text-white font-bold text-sm uppercase tracking-wide mb-1">
                  {stat.label}
                </div>
                <div className="text-white/40 text-xs">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MISSION / WHO WE ARE ─────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32" aria-label="Our mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                  Who We Are
                </span>
              </div>
              <h2 className="text-jc-black font-black text-4xl sm:text-5xl leading-[1.05] tracking-tight mb-6">
                A Community United
                <br />
                <span className="text-jc-red">Around a Cause.</span>
              </h2>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                Junior Council is a Chicago-based nonprofit of young
                professionals, advocates, and community members who believe
                every adolescent living with HIV and AIDS deserves access to
                world-class care.
              </p>
              <p className="text-jc-gray-dark text-base leading-relaxed mb-8">
                Through fundraising events, corporate partnerships, and
                community engagement, we channel resources directly to the
                Adolescent HIV program at Ann &amp; Robert H. Lurie
                Children&apos;s Hospital — one of the nation&apos;s top
                children&apos;s hospitals and a leader in pediatric HIV care.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-jc-black font-bold text-sm uppercase tracking-widest border-b-2 border-jc-red hover:text-jc-red transition-colors pb-1"
              >
                Learn Our Story
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Visual block */}
            <div className="relative">
              <div className="bg-jc-black aspect-square max-w-md mx-auto flex flex-col items-center justify-center p-12 text-center">
                <div className="text-jc-red/20 font-black text-[8rem] leading-none absolute select-none" aria-hidden="true">
                  JC
                </div>
                <div className="relative z-10">
                  <div className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-4">
                    Our Mission
                  </div>
                  <blockquote className="text-white font-black text-2xl sm:text-3xl leading-tight">
                    &ldquo;To raise funds and awareness for adolescents living
                    with HIV and AIDS in partnership with Lurie Children&apos;s
                    Hospital.&rdquo;
                  </blockquote>
                  <div className="mt-6 w-12 h-0.5 bg-jc-red mx-auto" aria-hidden="true" />
                </div>
              </div>
              {/* Red accent corner */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-jc-red"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── LURIE PARTNERSHIP ────────────────────────────────────────── */}
      <section
        className="bg-jc-gray py-20 lg:py-28"
        aria-label="Lurie Children's Hospital partnership"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                Our Partner
              </span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
            <h2 className="text-jc-black font-black text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight max-w-3xl mx-auto">
              Partnering with One of the Nation&apos;s
              <span className="text-jc-red"> Best Children&apos;s Hospitals.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 sm:p-10 border-l-4 border-jc-red">
              <h3 className="text-jc-black font-black text-xl sm:text-2xl mb-4">
                Ann &amp; Robert H. Lurie Children&apos;s Hospital of Chicago
              </h3>
              <p className="text-jc-gray-dark leading-relaxed mb-4">
                Lurie Children&apos;s is nationally ranked as one of America&apos;s best
                children&apos;s hospitals by U.S. News &amp; World Report. Their
                Adolescent Medicine program provides comprehensive HIV care — from
                medical treatment and mental health support to social services and
                long-term follow-up.
              </p>
              <p className="text-jc-gray-dark leading-relaxed">
                Every dollar Junior Council raises goes directly to support this
                program, ensuring that no young person in Chicago goes without the
                care they need.
              </p>
            </div>
            <div className="bg-jc-black p-8 flex flex-col justify-center">
              <div className="space-y-5">
                {[
                  'Nationally ranked children\'s hospital',
                  'Expert adolescent HIV care team',
                  'Holistic support: medical, mental health & social services',
                  '100% of JC funds benefit Lurie programs',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 bg-jc-red flex-shrink-0 flex items-center justify-center mt-0.5"
                      aria-hidden="true"
                    >
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GET INVOLVED ─────────────────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32" aria-label="Get involved">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                Get Involved
              </span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
            <h2 className="text-jc-black font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              There&apos;s a Place For You Here.
            </h2>
            <p className="text-jc-gray-dark text-lg mt-4 max-w-2xl mx-auto">
              Whether you&apos;re looking to join our community, attend an event, or
              partner with us as a business — your involvement creates real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {involvementCards.map((card, i) => (
              <div
                key={i}
                className="group border border-jc-gray-mid hover:border-jc-red transition-colors p-8 flex flex-col"
              >
                <div className="text-jc-red mb-5 group-hover:scale-110 transition-transform origin-left">
                  {card.icon}
                </div>
                <h3 className="text-jc-black font-black text-xl mb-3">
                  {card.title}
                </h3>
                <p className="text-jc-gray-dark text-sm leading-relaxed mb-6 flex-grow">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex items-center text-jc-black font-bold text-xs uppercase tracking-widest hover:text-jc-red transition-colors group-hover:text-jc-red"
                >
                  {card.cta}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ANNUAL GALA TEASER ───────────────────────────────────────── */}
      <section
        className="bg-jc-black py-24 lg:py-32 relative overflow-hidden"
        aria-label="Annual Snowball Gala"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-0 top-0 w-1.5 h-full bg-jc-red" />
          <div className="absolute -left-24 top-0 w-2/5 h-full bg-jc-red/5 transform skew-x-[-8deg]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                  Signature Event
                </span>
              </div>
              <h2 className="text-white font-black text-4xl sm:text-5xl leading-tight tracking-tight mb-6">
                The Annual
                <br />
                <span className="text-jc-red">Snowball Gala.</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Our flagship fundraiser brings together Chicago&apos;s corporate and
                community leaders for an evening of impact. Featuring live
                entertainment, a silent auction, premium hospitality, and an
                opportunity to directly change lives.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'Format', value: 'Gala & Silent Auction' },
                  { label: 'Location', value: 'Chicago, IL' },
                  { label: 'Date', value: 'Winter 2027 — Announcing Soon' },
                  { label: 'Dress Code', value: 'Black Tie Optional' },
                ].map((detail, i) => (
                  <div key={i} className="border-l-2 border-jc-red/40 pl-4">
                    <div className="text-white/40 text-xs uppercase tracking-wide mb-1">
                      {detail.label}
                    </div>
                    <div className="text-white text-sm font-semibold">
                      {detail.value}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/gala"
                className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
              >
                View Gala Details
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Event graphic */}
            <div className="relative">
              <div className="bg-jc-charcoal p-12 text-center border border-white/10">
                <div className="text-jc-red/15 font-black text-[7rem] leading-none absolute inset-0 flex items-center justify-center select-none" aria-hidden="true">
                  ❄
                </div>
                <div className="relative z-10">
                  <div className="text-white/40 text-xs tracking-widest uppercase mb-2">
                    Annual Event
                  </div>
                  <div className="text-white font-black text-3xl sm:text-4xl mb-2 tracking-tight">
                    Snowball Gala
                  </div>
                  <div className="w-12 h-0.5 bg-jc-red mx-auto my-4" aria-hidden="true" />
                  <div className="text-white/60 text-sm mb-6">
                    Chicago&apos;s premier fundraising event for youth with HIV &amp; AIDS
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-white/10">
                    <div className="bg-jc-charcoal p-4">
                      <div className="text-jc-red font-black text-2xl">500+</div>
                      <div className="text-white/50 text-xs mt-1">Attendees</div>
                    </div>
                    <div className="bg-jc-charcoal p-4">
                      <div className="text-jc-red font-black text-2xl">$250K+</div>
                      <div className="text-white/50 text-xs mt-1">Per Event</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 bg-jc-red"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FUNDRAISING PROGRESS ─────────────────────────────────────── */}
      {(() => {
        const raised = 142500   // ← update this number as fundraising progresses
        const goal   = 250000   // ← update this if the goal changes
        const pct    = Math.min(Math.round((raised / goal) * 100), 100)
        const fmt    = (n: number) => '$' + n.toLocaleString()
        return (
          <section className="bg-jc-charcoal py-20 lg:py-28" aria-label="Fundraising progress">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                  <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                    2026 Fundraising Goal
                  </span>
                  <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                </div>
                <h2 className="text-white font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                  Help Us Reach{' '}
                  <span className="text-jc-red">{fmt(goal)}</span>
                </h2>
                <p className="text-white/50 text-sm mt-3 max-w-xl mx-auto">
                  Every dollar goes directly to the Adolescent HIV program at
                  Ann &amp; Robert H. Lurie Children&apos;s Hospital of Chicago.
                </p>
              </div>

              {/* Raised vs Goal numbers */}
              <div className="flex items-end justify-between mb-3">
                <div>
                  <div className="text-jc-red font-black text-4xl sm:text-5xl leading-none">
                    {fmt(raised)}
                  </div>
                  <div className="text-white/50 text-sm mt-1 uppercase tracking-wide">
                    Raised so far
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/40 font-black text-2xl sm:text-3xl leading-none">
                    {fmt(goal)}
                  </div>
                  <div className="text-white/30 text-sm mt-1 uppercase tracking-wide">
                    Goal
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="w-full bg-white/10 h-7 relative overflow-hidden"
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${pct}% of fundraising goal reached`}
              >
                <div
                  className="h-full bg-jc-red"
                  style={{ width: `${pct}%` }}
                />
                <div className="absolute inset-0 flex items-center px-4">
                  <span className="text-white font-black text-xs tracking-widest uppercase">
                    {pct}% of goal reached
                  </span>
                </div>
              </div>

              {/* Supporting stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
                {[
                  { value: '160+', label: 'Active Members Fundraising' },
                  { value: '$3.1M+', label: 'Raised Since Founding' },
                  { value: '100%', label: 'Goes to Patient Care' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-jc-red font-black text-2xl sm:text-3xl">{s.value}</div>
                    <div className="text-white/40 text-xs mt-1 uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-10">
                <Link
                  href="/support#donate"
                  className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-10 py-4 transition-colors"
                >
                  Make a Donation
                </Link>
              </div>
            </div>
          </section>
        )
      })()}

      {/* ─── DONATE CTA BANNER ────────────────────────────────────────── */}
      <section
        className="bg-jc-red py-20 lg:py-24"
        aria-label="Donate call to action"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
            Your Gift Changes
            <br />
            a Child&apos;s Life.
          </h2>
          <p className="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Every donation to Junior Council goes directly to life-saving care
            for adolescents living with HIV and AIDS at Lurie Children&apos;s
            Hospital. Make your impact today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support#donate"
              className="inline-flex items-center justify-center bg-white text-jc-black font-black text-sm tracking-widest uppercase px-10 py-4 hover:bg-jc-gray-mid transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jc-red"
            >
              Make a Donation
            </Link>
            <Link
              href="/support#corporate"
              className="inline-flex items-center justify-center border-2 border-white text-white font-black text-sm tracking-widest uppercase px-10 py-4 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jc-red"
            >
              Corporate Partnership
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-8">
            Junior Council is a registered 501(c)(3) nonprofit. All donations are
            tax-deductible to the extent permitted by law.
          </p>
        </div>
      </section>
    </>
  )
}
