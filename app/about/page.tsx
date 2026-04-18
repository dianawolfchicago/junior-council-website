import type { Metadata } from 'next'
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
            Junior Council&apos;s mission is to ensure all children with HIV/AIDS,
            regardless of their ability to pay, have access to high-quality
            pediatric care.
          </p>
        </div>
      </section>

      {/* Our Cause */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
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
        </div>
      </section>

      {/* Scholarship Fund */}
      <section className="bg-jc-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Est. 2014</span>
              </div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                The Junior Council <span className="text-jc-red">Scholarship Fund</span>
              </h2>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                In 2014, Junior Council established a scholarship fund, which
                recently grew to <strong className="text-jc-black">$40,000</strong>, awarded
                annually to one or more patients of the Pediatric &amp; Adolescent
                HIV/AIDS Program.
              </p>
              <p className="text-jc-gray-dark text-base leading-relaxed">
                This scholarship aims to support patients in pursuing education
                after high school, in any form. Recipients may utilize the funds
                for various educational expenses — including tuition, technology,
                books and classroom materials, housing, and transportation.
              </p>
            </div>

            {/* Scholarship uses grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222', label: 'Tuition' },
                { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Technology' },
                { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'Books & Materials' },
                { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Housing' },
              ].map((item) => (
                <div key={item.label} className="bg-white p-5 flex items-center gap-3 border border-jc-gray-mid">
                  <div className="w-10 h-10 bg-jc-red/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-jc-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-jc-black font-bold text-sm">{item.label}</span>
                </div>
              ))}
            </div>
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
