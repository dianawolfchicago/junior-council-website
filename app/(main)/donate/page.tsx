import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Donate | Junior Council',
  description:
    'Make a personal donation to Junior Council. 100% of your gift supports adolescents living with HIV and AIDS at Lurie Children\'s Hospital of Chicago.',
}

export default function DonatePage() {
  const raised = 142500
  const goal   = 250000
  const pct    = Math.min(Math.round((raised / goal) * 100), 100)
  const fmt    = (n: number) => '$' + n.toLocaleString()

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
              Give Today
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Make a <span className="text-jc-red">Donation</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            100% of your gift goes directly to supporting adolescents living
            with HIV and AIDS at Lurie Children&apos;s Hospital of Chicago.
          </p>
        </div>
      </section>

      {/* Donation form + impact */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — form */}
            <div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                Personal <span className="text-jc-red">Donations</span>
              </h2>
              <p className="text-jc-gray-dark text-lg leading-relaxed mb-5">
                Your personal donation — no matter the size — makes a direct
                impact on adolescents living with HIV and AIDS at Lurie
                Children&apos;s Hospital. Every dollar goes to supporting their care.
              </p>
              <p className="text-jc-gray-dark leading-relaxed mb-8">
                Junior Council is a registered 501(c)(3) nonprofit. All
                donations are tax-deductible to the extent permitted by law.
                You will receive a tax receipt for your records.
              </p>

              {/* Fundraising tracker */}
              <div className="bg-jc-gray p-6 mb-8 border-l-4 border-jc-red">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-jc-red font-black text-xs uppercase tracking-widest">
                    2026 Fundraising Goal
                  </span>
                  <span className="text-jc-gray-dark text-xs">{pct}% reached</span>
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-jc-black font-black text-2xl">{fmt(raised)}</span>
                  <span className="text-jc-gray-dark text-sm">of {fmt(goal)}</span>
                </div>
                <div className="w-full bg-jc-gray-mid h-3 overflow-hidden">
                  <div
                    className="h-full bg-jc-red"
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <p className="text-jc-gray-dark text-xs mt-2">
                  Every donation goes directly to adolescent HIV care at Lurie Children&apos;s Hospital.
                </p>
              </div>

              {/* Donation amount buttons */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {['$25', '$50', '$100', '$500', '$1,000', 'Custom'].map((amount, i) => (
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

            {/* Right — Your Gift in Action */}
            <div className="bg-jc-black p-10">
              <h3 className="text-white font-black text-2xl mb-6">
                Your Gift in Action
              </h3>
              <div className="space-y-0">
                {[
                  {
                    amount: '$40,000',
                    impact: 'Direct patient support and educational assistance for past and present patients of the Lurie Adolescent HIV Program.',
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

      {/* Other ways to give */}
      <section className="bg-jc-gray py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Other Ways to <span className="text-jc-red">Give</span>
          </h2>
          <p className="text-jc-gray-dark mb-8">
            Personal donations are just one way to support our mission. Explore
            corporate sponsorships, hospitality partnerships, and more.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-10 py-4 transition-colors"
          >
            Partner With Us
          </Link>
        </div>
      </section>
    </div>
  )
}
