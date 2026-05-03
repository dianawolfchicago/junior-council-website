import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Cause | Junior Council',
  description:
    "Learn about Junior Council's mission, the cause we fight for, and the scholarship fund supporting youth with HIV and AIDS in Chicago.",
}

export default function OurCausePage() {
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
              About Us
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Our Cause
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Junior Council exists to give Chicago&apos;s youth with HIV and AIDS
            access to the care, support, and opportunity they deserve.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-jc-red py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-white/60" aria-hidden="true" />
            <span className="text-white/80 text-xs font-bold tracking-[0.25em] uppercase">Our Mission</span>
            <div className="w-8 h-0.5 bg-white/60" aria-hidden="true" />
          </div>
          <p className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight">
            To ensure all children with HIV/AIDS, regardless of their ability
            to pay, have access to high-quality pediatric care.
          </p>
        </div>
      </section>

      {/* Our Cause */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Who We Serve</span>
              </div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                The Fight for <span className="text-jc-red">Youth with HIV & AIDS</span>
              </h2>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                Junior Council is a Chicago-based nonprofit dedicated to raising
                funds for adolescents living with HIV and AIDS. In partnership with
                Ann &amp; Robert H. Lurie Children&apos;s Hospital of Chicago, we support
                one of the most vulnerable and underserved populations in our city.
              </p>
              <p className="text-jc-gray-dark text-base leading-relaxed mb-5">
                Adolescents with HIV face unique challenges — stigma, complex
                medication regimens, and the intersection of puberty with chronic
                illness. The Adolescent HIV program at Lurie provides
                comprehensive care: medical treatment, mental health support,
                social services, and connection to community.
              </p>
              <p className="text-jc-gray-dark text-base leading-relaxed">
                Every event we host, every membership dues we collect, and every
                corporate partnership we forge translates directly into resources
                for these young patients. This is a cause that deserves a champion
                — and Junior Council is proud to be that champion.
              </p>
            </div>

            {/* Logo */}
            <div className="flex justify-center lg:pt-2">
              <Image
                src="/jc%20logo.jpg"
                alt="Junior Council logo"
                width={340}
                height={340}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="bg-jc-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">By the Numbers</span>
          </div>
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            This Is a <span className="text-jc-red">Real Crisis</span> — Right Now
          </h2>
          <p className="text-white/60 text-base mb-12 max-w-2xl">
            HIV among adolescents is not a problem of the past. These are the facts — sourced from the CDC, NIH, and UNICEF.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              {
                stat: '19%',
                label: 'of all new U.S. HIV diagnoses in 2022 were among youth ages 13–24',
                source: 'NIH HIVinfo, 2025',
              },
              {
                stat: '44%',
                label: 'of adolescents living with HIV in the U.S. don\'t know their status',
                source: 'NIH HIVinfo, 2025',
              },
              {
                stat: '34%',
                label: 'of diagnosed young people achieve viral suppression — vs. 63% of adults',
                source: 'NICHD, 2020',
              },
              {
                stat: '70%',
                label: 'of new U.S. HIV infections occur among Black and Latino individuals',
                source: 'CDC, 2023',
              },
            ].map((item) => (
              <div key={item.stat} className="bg-jc-black p-8 flex flex-col">
                <div className="text-jc-red font-black text-5xl sm:text-6xl mb-4 leading-none">{item.stat}</div>
                <p className="text-white text-sm leading-relaxed flex-1">{item.label}</p>
                <p className="text-white/30 text-xs mt-4 uppercase tracking-widest">{item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-jc-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Ready to Make a <span className="text-jc-red">Difference?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Join Junior Council and be part of the fight for youth with HIV and
            AIDS in Chicago.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership#join"
              className="inline-flex items-center justify-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Get Involved
            </Link>
            <Link
              href="/support#donate"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
