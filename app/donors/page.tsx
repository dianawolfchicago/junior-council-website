import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Donors & Partners | Junior Council',
  description:
    'Junior Council is grateful to our corporate donors, hospitality partners, silent auction contributors, and Wellness for a Cause sponsors.',
}

const donors = {
  corporate: [
    { name: 'Corporate Donor Name', tier: 'Presenting' },
    { name: 'Corporate Donor Name', tier: 'Diamond' },
    { name: 'Corporate Donor Name', tier: 'Diamond' },
    { name: 'Corporate Donor Name', tier: 'Platinum' },
    { name: 'Corporate Donor Name', tier: 'Gold' },
    { name: 'Corporate Donor Name', tier: 'Gold' },
    { name: 'Corporate Donor Name', tier: 'Silver' },
    { name: 'Corporate Donor Name', tier: 'Bronze' },
    { name: 'Corporate Donor Name', tier: 'Bronze' },
    { name: 'Corporate Donor Name', tier: 'Black' },
  ],
  hospitality: [
    { name: "Men's Wearhouse & Jos. A. Bank", category: 'Formal Wear' },
    { name: 'Blacklane', category: 'Transportation' },
    { name: 'Janet Mandell', category: 'Rental Services' },
    { name: 'Hospitality Partner Name', category: 'Catering' },
    { name: 'Hospitality Partner Name', category: 'Bar & Beverage' },
    { name: 'Hospitality Partner Name', category: 'Venue' },
  ],
  silentAuction: [
    { name: 'Auction Donor Name', item: 'Travel & Experience' },
    { name: 'Auction Donor Name', item: 'Sports & Entertainment' },
    { name: 'Auction Donor Name', item: 'Dining & Hospitality' },
    { name: 'Auction Donor Name', item: 'Luxury Item' },
    { name: 'Auction Donor Name', item: 'Art & Collectibles' },
    { name: 'Auction Donor Name', item: 'Travel & Experience' },
    { name: 'Auction Donor Name', item: 'Sports & Entertainment' },
    { name: 'Auction Donor Name', item: 'Services' },
  ],
  wellness: [
    { name: 'GoGlow', category: 'Spray Tan' },
    { name: 'Pin Me Up Chicago', category: 'Hair & Makeup' },
    { name: 'Wellness Partner Name', category: 'Fitness' },
    { name: 'Wellness Partner Name', category: 'Spa & Beauty' },
    { name: 'Wellness Partner Name', category: 'Nutrition' },
    { name: 'Wellness Partner Name', category: 'Mental Health' },
  ],
}

export default function DonorsPage() {
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
              Thank You
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Our Donors &amp; Partners
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Junior Council is powered by the generosity of our corporate
            partners, hospitality sponsors, auction donors, and wellness
            community. Thank you for making our mission possible.
          </p>
        </div>
      </section>

      {/* ── CORPORATE DONORS ──────────────────────────────────────────── */}
      <section id="corporate" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                  Category
                </span>
              </div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl tracking-tight">
                Corporate <span className="text-jc-red">Donors</span>
              </h2>
            </div>
            <Link
              href="/support#corporate"
              className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-jc-gray-dark hover:text-jc-red transition-colors border-b border-jc-gray-mid hover:border-jc-red pb-1"
            >
              Become a Corporate Partner →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {donors.corporate.map((donor, i) => (
              <div
                key={i}
                className="border border-jc-gray-mid hover:border-jc-red transition-colors p-6 flex flex-col items-center justify-center text-center min-h-[120px] group"
              >
                {/* Logo placeholder */}
                <div className="w-12 h-12 bg-jc-gray rounded-sm mb-3 flex items-center justify-center group-hover:bg-jc-red/10 transition-colors" aria-hidden="true">
                  <svg className="w-6 h-6 text-jc-gray-mid group-hover:text-jc-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-jc-black font-black text-sm leading-tight mb-1">
                  {donor.name}
                </div>
                <div className="text-jc-red text-xs font-semibold uppercase tracking-wide">
                  {donor.tier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOSPITALITY PARTNERS ──────────────────────────────────────── */}
      <section id="hospitality" className="bg-jc-gray py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                  Category
                </span>
              </div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl tracking-tight">
                Hospitality <span className="text-jc-red">Partners</span>
              </h2>
            </div>
            <Link
              href="/support#hospitality"
              className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-jc-gray-dark hover:text-jc-red transition-colors border-b border-jc-gray-mid hover:border-jc-red pb-1"
            >
              Become a Hospitality Partner →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {donors.hospitality.map((donor, i) => (
              <div
                key={i}
                className="bg-white border border-jc-gray-mid hover:border-jc-red transition-colors p-6 flex flex-col items-center justify-center text-center min-h-[120px] group"
              >
                <div className="w-12 h-12 bg-jc-gray rounded-sm mb-3 flex items-center justify-center group-hover:bg-jc-red/10 transition-colors" aria-hidden="true">
                  <svg className="w-6 h-6 text-jc-gray-mid group-hover:text-jc-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="text-jc-black font-black text-sm leading-tight mb-1">
                  {donor.name}
                </div>
                <div className="text-jc-red text-xs font-semibold uppercase tracking-wide">
                  {donor.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SILENT AUCTION DONORS ─────────────────────────────────────── */}
      <section id="silent-auction" className="bg-white py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                  Category
                </span>
              </div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl tracking-tight">
                Silent <span className="text-jc-red">Auction</span>
              </h2>
            </div>
            <Link
              href="/support#inkind"
              className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-jc-gray-dark hover:text-jc-red transition-colors border-b border-jc-gray-mid hover:border-jc-red pb-1"
            >
              Donate an Auction Item →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {donors.silentAuction.map((donor, i) => (
              <div
                key={i}
                className="border border-jc-gray-mid hover:border-jc-red transition-colors p-6 flex flex-col items-center justify-center text-center min-h-[120px] group"
              >
                <div className="w-12 h-12 bg-jc-gray rounded-sm mb-3 flex items-center justify-center group-hover:bg-jc-red/10 transition-colors" aria-hidden="true">
                  <svg className="w-6 h-6 text-jc-gray-mid group-hover:text-jc-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div className="text-jc-black font-black text-sm leading-tight mb-1">
                  {donor.name}
                </div>
                <div className="text-jc-red text-xs font-semibold uppercase tracking-wide">
                  {donor.item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WELLNESS FOR A CAUSE ──────────────────────────────────────── */}
      <section id="wellness" className="bg-jc-black py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
                  Category
                </span>
              </div>
              <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
                Wellness <span className="text-jc-red">for a Cause</span>
              </h2>
              <p className="text-white/50 text-sm mt-3 max-w-xl">
                Our Wellness for a Cause partners support Junior Council through
                health and wellness initiatives, helping fund care for
                adolescents living with HIV and AIDS.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1"
            >
              Become a Wellness Partner →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {donors.wellness.map((donor, i) => (
              <div
                key={i}
                className="border border-white/10 hover:border-jc-red transition-colors p-6 flex flex-col items-center justify-center text-center min-h-[120px] group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-sm mb-3 flex items-center justify-center group-hover:bg-jc-red/20 transition-colors" aria-hidden="true">
                  <svg className="w-6 h-6 text-white/20 group-hover:text-jc-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="text-white font-black text-sm leading-tight mb-1">
                  {donor.name}
                </div>
                <div className="text-jc-red text-xs font-semibold uppercase tracking-wide">
                  {donor.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="bg-jc-red py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Want to Be Featured Here?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join our growing community of donors and partners who are directly
            changing the lives of youth with HIV and AIDS in Chicago.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support#corporate"
              className="inline-flex items-center justify-center bg-white text-jc-black font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-jc-gray-mid transition-colors"
            >
              Partner With Us
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-white text-white font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
