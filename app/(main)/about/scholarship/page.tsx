import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Scholarship Fund | Junior Council',
  description:
    'Learn about the Junior Council Scholarship Fund — established in 2014 to support patients of the Pediatric & Adolescent HIV/AIDS Program in pursuing education.',
}

export default function ScholarshipPage() {
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
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Est. 2014</span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Scholarship <span className="text-jc-red">Fund</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Supporting patients of the Pediatric &amp; Adolescent HIV/AIDS Program
            in pursuing education and building their futures.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-jc-gray py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">About the Fund</span>
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

      {/* Stats */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: '2014', label: 'Year Established' },
              { value: '$40,000', label: 'Annual Award Amount' },
              { value: '100%', label: 'Funded by Junior Council Members' },
            ].map((stat, i) => (
              <div key={i} className="border border-jc-gray-mid p-8">
                <div className="text-jc-red font-black text-4xl sm:text-5xl mb-2">{stat.value}</div>
                <div className="text-jc-gray-dark text-sm uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-jc-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Help Fund the Next <span className="text-jc-red">Scholarship.</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Every donation to Junior Council contributes to the scholarship fund
            and the broader mission of care for youth with HIV and AIDS in Chicago.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support#donate"
              className="inline-flex items-center justify-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/membership#join"
              className="inline-flex items-center justify-center border-2 border-white/30 text-white font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors"
            >
              Join Junior Council
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
