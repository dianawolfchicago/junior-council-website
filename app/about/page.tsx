import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | Junior Council',
  description:
    'Learn about Junior Council\'s cause, DEI commitment, and FAQ.',
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-jc-black py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1.5 h-full bg-jc-red" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
              About
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            About Junior Council
          </h1>
        </div>
      </section>

      {/* Section: Our Cause */}
      <section id="our-cause" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
              Our <span className="text-jc-red">Cause</span>
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

      {/* Section: Board of Directors — link to dedicated page */}
      <section id="board" className="bg-jc-gray py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-3 tracking-tight">
                Board of <span className="text-jc-red">Directors</span>
              </h2>
              <p className="text-jc-gray-dark text-lg max-w-xl">
                Junior Council is led by a dedicated group of Chicago
                professionals who bring expertise, passion, and deep commitment
                to our mission.
              </p>
            </div>
            <Link
              href="/board"
              className="flex-shrink-0 inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Meet the Board
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section: DEI */}
      <section id="dei" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
              Our DEI <span className="text-jc-red">Commitment</span>
            </h2>
            <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
              Junior Council is committed to diversity, equity, and inclusion in
              all that we do — from our board composition to our event programming
              to the communities we serve. HIV disproportionately affects
              communities of color, LGBTQ+ youth, and low-income families. Our
              work is intersectional by nature.
            </p>
            <p className="text-jc-gray-dark text-base leading-relaxed">
              We actively recruit board members and volunteers who reflect the
              diversity of Chicago and the patients we serve. We hold ourselves
              accountable to equitable practices and continually work to ensure
              our organization is welcoming, representative, and impactful.
            </p>
          </div>
        </div>
      </section>

      {/* Section: FAQ */}
      <section id="faq" className="bg-jc-gray py-20 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-12 tracking-tight">
            Frequently Asked <span className="text-jc-red">Questions</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'How does Junior Council use donated funds?',
                a: '100% of funds raised by Junior Council go directly to support the Adolescent HIV program at Ann & Robert H. Lurie Children\'s Hospital of Chicago, covering medical care, mental health services, and social support for patients.',
              },
              {
                q: 'Is Junior Council a registered nonprofit?',
                a: 'Yes, Junior Council is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent permitted by law.',
              },
              {
                q: 'How can I get involved with Junior Council?',
                a: 'There are many ways to get involved — join as a member, attend our Annual Snowball Gala, volunteer, or partner with us as a corporate sponsor. Visit our Membership and Support pages to learn more.',
              },
              {
                q: 'Who can become a member of Junior Council?',
                a: 'Junior Council membership is open to young Chicago professionals and community members who share our passion for supporting youth with HIV and AIDS. Visit the Membership page for current eligibility and dues information.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 border-l-4 border-jc-red">
                <h3 className="text-jc-black font-bold text-lg mb-3">{faq.q}</h3>
                <p className="text-jc-gray-dark leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-jc-red py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-white/80 mb-8">
            Join Junior Council and be part of the fight for youth with HIV and
            AIDS in Chicago.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership#join"
              className="inline-flex items-center justify-center bg-white text-jc-black font-black text-sm tracking-widest uppercase px-8 py-3 hover:bg-jc-gray-mid transition-colors"
            >
              Get Involved
            </Link>
            <Link
              href="/support#donate"
              className="inline-flex items-center justify-center border-2 border-white text-white font-black text-sm tracking-widest uppercase px-8 py-3 hover:bg-white/10 transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
