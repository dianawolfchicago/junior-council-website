import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support & Donate | Junior Council',
  description:
    'Support Junior Council through personal donations, corporate partnerships, hospitality partnerships, or in-kind donations.',
}

const corporateTiers = [
  {
    name: 'Champion Partner',
    amount: '$25,000+',
    highlight: true,
    benefits: [
      'Premier presenting sponsorship of Annual Snowball Gala',
      'Year-round logo placement on all JC platforms',
      'Exclusive naming rights for a JC program or initiative',
      'Board-level engagement and impact briefings',
      'Dedicated press release and media recognition',
      'VIP table for 12 at the Gala',
      'Custom employee engagement opportunity',
    ],
  },
  {
    name: 'Impact Partner',
    amount: '$10,000–$24,999',
    highlight: false,
    benefits: [
      'Gold-level Gala sponsorship',
      'Logo on JC website and event materials (6 months)',
      'Social media spotlight series',
      'Reserved table for 10 at the Gala',
      'Quarterly impact report',
    ],
  },
  {
    name: 'Community Partner',
    amount: '$5,000–$9,999',
    highlight: false,
    benefits: [
      'Silver-level Gala sponsorship',
      'Logo on JC website (12 months)',
      'Social media recognition',
      'Reserved seats for 6 at the Gala',
    ],
  },
  {
    name: 'Friend of JC',
    amount: 'Under $5,000',
    highlight: false,
    benefits: [
      'Name/logo in Gala program',
      'Social media thank-you',
      'Two Gala tickets',
    ],
  },
]

export default function SupportPage() {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-jc-black py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1.5 h-full bg-jc-red" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
              Support
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Support Junior Council
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Every contribution — financial, in-kind, or through partnership —
            directly benefits adolescents living with HIV and AIDS at Lurie
            Children&apos;s Hospital.
          </p>
        </div>
      </section>

      {/* Personal Donations */}
      <section id="donate" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                Personal <span className="text-jc-red">Donations</span>
              </h2>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                Your personal donation — no matter the size — makes a direct
                impact on adolescents living with HIV and AIDS at Lurie
                Children&apos;s Hospital. 100% of your gift goes to supporting their
                care.
              </p>
              <p className="text-jc-gray-dark leading-relaxed mb-8">
                Junior Council is a registered 501(c)(3) nonprofit. All
                donations are tax-deductible to the extent permitted by law. You
                will receive a tax receipt for your records.
              </p>
              {/* Donation Amount Suggestions */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {['$500', '$1,000', '$2,347', '$5,000', '$10,058', 'Custom'].map((amount, i) => (
                  <button
                    key={i}
                    className="border-2 border-jc-gray-mid hover:border-jc-red py-3 font-bold text-sm transition-colors focus:outline-none focus:border-jc-red"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <button className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors">
                Donate Now
              </button>
              <p className="text-jc-gray-dark text-xs mt-3 text-center">
                Secure donation processing via [Payment Processor]
              </p>
            </div>
            <div className="bg-jc-black p-10">
              <h3 className="text-white font-black text-2xl mb-6">
                Your Gift in Action
              </h3>
              <div className="space-y-0">
                {[
                  {
                    amount: '$40,000',
                    impact: 'The Junior Council Scholarship Fund, which helps support past and present patients in their education.',
                  },
                  {
                    amount: '$20,000',
                    impact: 'The purchase of vehicles (lasting 20 years) to help transport patients to necessary check-ups.',
                  },
                  {
                    amount: '$10,058',
                    impact: '30 days of HIV medication for a single patient during financial hardship.',
                  },
                  {
                    amount: '$2,347',
                    impact: 'One week of standard HIV medication for a single patient.',
                  },
                  {
                    amount: '$500',
                    impact: 'Genotype testing used to identify effective medications for newly diagnosed patients.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 border-b border-white/10 py-4 last:border-0">
                    <div className="text-jc-red font-black text-base w-24 flex-shrink-0 pt-0.5">
                      {item.amount}
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Partnerships */}
      <section id="corporate" className="bg-jc-gray py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
              <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                For Businesses
              </span>
              <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight text-center">
            Corporate <span className="text-jc-red">Partnerships</span>
          </h2>
          <p className="text-jc-gray-dark text-lg max-w-3xl mx-auto text-center mb-14">
            Align your company with Chicago&apos;s most passionate nonprofit
            community. Corporate partners gain brand visibility, employee
            engagement opportunities, and the satisfaction of directly
            impacting youth with HIV and AIDS.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {corporateTiers.map((tier, i) => (
              <div
                key={i}
                className={`p-6 border-2 flex flex-col ${
                  tier.highlight
                    ? 'bg-jc-black border-jc-red'
                    : 'bg-white border-jc-gray-mid hover:border-jc-red transition-colors'
                }`}
              >
                {tier.highlight && (
                  <div className="bg-jc-red text-white text-xs font-bold tracking-widest uppercase px-3 py-1 self-start mb-4">
                    Most Impactful
                  </div>
                )}
                <div className="text-jc-red font-black text-2xl mb-1">
                  {tier.amount}
                </div>
                <div
                  className={`font-black text-xl mb-4 ${
                    tier.highlight ? 'text-white' : 'text-jc-black'
                  }`}
                >
                  {tier.name}
                </div>
                <div className="w-8 h-0.5 bg-jc-red mb-5" aria-hidden="true" />
                <ul className="space-y-2.5 flex-grow">
                  {tier.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div
                        className="w-4 h-4 bg-jc-red flex-shrink-0 flex items-center justify-center mt-0.5"
                        aria-hidden="true"
                      >
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span
                        className={`text-xs leading-relaxed ${
                          tier.highlight ? 'text-white/70' : 'text-jc-gray-dark'
                        }`}
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-10 py-4 transition-colors"
            >
              Inquire About Partnership
            </Link>
          </div>
        </div>
      </section>

      {/* Hospitality Partners */}
      <section id="hospitality" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                Hospitality <span className="text-jc-red">Partnerships</span>
              </h2>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                Hospitality partners provide in-kind food, beverage, venue, and
                catering services for Junior Council events. In return, they
                receive prominent brand visibility, social media recognition, and
                direct access to hundreds of Chicago professionals.
              </p>
              <p className="text-jc-gray-dark leading-relaxed mb-8">
                Whether you&apos;re a restaurant, caterer, bar, hotel, or event venue,
                we&apos;d love to explore a partnership. Our Annual Snowball Gala alone
                draws 500+ attendees and dozens of corporate sponsors.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
              >
                Become a Hospitality Partner
              </Link>
            </div>
            <div className="bg-jc-gray p-8">
              <h3 className="text-jc-black font-black text-xl mb-6">
                What We Look For
              </h3>
              <div className="space-y-4">
                {[
                  'Catering & food service',
                  'Bar & beverage service',
                  'Venue & event space',
                  'Event staffing & support',
                  'Audio/visual production',
                  'Floral & décor',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 bg-jc-red flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-jc-gray-dark">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-Kind Donations */}
      <section id="inkind" className="bg-jc-charcoal py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-white font-black text-3xl sm:text-4xl mb-6 tracking-tight">
              In-Kind <span className="text-jc-red">Donations</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-5">
              In-kind donations — goods, services, or experiences — power our
              silent auction and reduce event costs, meaning more of every dollar
              goes directly to patient care at Lurie Children&apos;s Hospital.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              We accept in-kind donations year-round. Items for our silent
              auction are especially valued. All donated items are recognized in
              our event program and on our social media channels.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                'Experiences & Travel',
                'Sports & Entertainment Tickets',
                'Restaurant Gift Certificates',
                'Luxury & Lifestyle Items',
                'Art & Collectibles',
                'Services (spa, fitness, etc.)',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-jc-red flex-shrink-0" aria-hidden="true" />
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center border-2 border-white hover:bg-white hover:text-jc-black text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Donate an Item
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
