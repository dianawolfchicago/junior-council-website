'use client'

import { useState } from 'react'
import Link from 'next/link'

const tabs = ['Photos', 'Corporate Sponsors', 'Hospitality Sponsors'] as const
type Tab = typeof tabs[number]

const corporateSponsors = [
  'Blue Cross Blue Shield of Illinois',
  'CBRE',
  'Clayco',
  'EnergyCX',
  'RSMUS Foundation',
  'Neuberger Berman',
  'Merrill Lynch',
  'Concord Group',
  'Barnes & Thornburg',
  'American Medical Association',
  'Old Republic International',
  'CST Academy Therapeutic Preschool',
  'GoGlow',
  "Men's Wearhouse & Jos. A. Bank",
  'Blacklane',
  'Janet Mandell',
  'Pin Me Up Chicago',
]

const hospitalitySponsors = [
  'Tandoor Char House', 'Sushi San', 'Polombia', 'Summer House Santa Monica',
  "Nonna's", 'Paradise Park', 'Happy Camper', "Gene and Georgetti's",
  'Bombay Eats', "Tito's", 'Goose Island', 'Anheuser-Busch',
  'Spritz Society', 'Craft House Cocktails', 'A Hospitality Company',
  'Bubble House Brewing Company', 'Cafe Bionda', 'Cafe Yaya', 'Cebu',
  'Khmai', "Nancy's Pizzeria", 'Biatch Tequila', 'Chay', 'CH Distillery',
  'Chicago Beverage', 'Doc Brown', 'Go Brewing', 'Hubbard Inn',
  'Hush Aqua', "JoJo's Shake Bar", 'Koval', 'Rheingeist Brewery',
  'Organic Spirits', 'STK Steakhouse', 'LaCroix', 'Solemn Oath Brewery',
  'MMMM Enjoy', 'Pepsi', 'Revolution Brewing', 'Ritual Zero Proof',
  'RPM Steak', 'RPM Restaurants', "Trader Joe's", 'Do Rite Donuts',
  'Bacardi', 'Athletic Brewing', 'Uni Uni', 'Select Beverage Company',
  'Link Drinks Transfusion', 'Venteux',
]

const photos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  alt: `Snowball 2026 photo ${i + 1}`,
  aspect: i % 5 === 0 ? 'aspect-video' : 'aspect-square',
}))

export default function RecapTabs() {
  const [active, setActive] = useState<Tab>('Photos')

  return (
    <div>
      {/* Tab bar */}
      <div className="border-b border-jc-gray-mid mb-10">
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-colors border-b-2 -mb-px ${
                active === tab
                  ? 'border-jc-red text-jc-red'
                  : 'border-transparent text-jc-gray-dark hover:text-jc-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Photos */}
      {active === 'Photos' && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={`bg-jc-gray overflow-hidden group relative ${photo.aspect} ${photo.id === 1 || photo.id === 7 ? 'col-span-2' : ''}`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-jc-gray group-hover:bg-jc-gray-mid transition-colors">
                  <svg className="w-8 h-8 text-jc-gray-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-jc-red/0 group-hover:bg-jc-red/10 transition-colors" />
              </div>
            ))}
          </div>
          <p className="text-jc-gray-dark text-sm text-center mt-6">
            More photos available on our{' '}
            <Link href="/gallery" className="text-jc-red font-bold hover:underline">
              full gallery page
            </Link>
            .
          </p>
        </div>
      )}

      {/* Corporate Sponsors */}
      {active === 'Corporate Sponsors' && (
        <div>
          <p className="text-jc-gray-dark text-base mb-8">
            Thank you to our <strong className="text-jc-black">{corporateSponsors.length} corporate sponsors</strong> whose
            generosity made Snowball 2026 possible.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {corporateSponsors.map((name, i) => (
              <div key={i} className="flex items-center gap-4 border border-jc-gray-mid p-5 hover:border-jc-red transition-colors group">
                <div className="w-2 h-2 bg-jc-red flex-shrink-0" aria-hidden="true" />
                <span className="text-jc-black font-bold text-sm group-hover:text-jc-red transition-colors">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-jc-gray-mid text-center">
            <p className="text-jc-gray-dark text-sm mb-4">Interested in sponsoring Snowball 2027?</p>
            <Link
              href="/support#corporate"
              className="inline-flex items-center text-jc-black font-black text-xs uppercase tracking-widest border-b-2 border-jc-red hover:text-jc-red transition-colors pb-1"
            >
              View Corporate Packages
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Hospitality Sponsors */}
      {active === 'Hospitality Sponsors' && (
        <div>
          <p className="text-jc-gray-dark text-base mb-8">
            Thank you to our <strong className="text-jc-black">{hospitalitySponsors.length}+ hospitality sponsors</strong> who
            donated food, beverage, and services to make the night unforgettable.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {hospitalitySponsors.map((name, i) => (
              <div key={i} className="flex items-center gap-3 border border-jc-gray-mid p-4 hover:border-jc-red transition-colors group">
                <div className="w-2 h-2 bg-jc-red flex-shrink-0" aria-hidden="true" />
                <span className="text-jc-black font-semibold text-sm group-hover:text-jc-red transition-colors">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-jc-gray-mid text-center">
            <p className="text-jc-gray-dark text-sm mb-4">Want to be a hospitality partner for Snowball 2027?</p>
            <Link
              href="/support#hospitality"
              className="inline-flex items-center text-jc-black font-black text-xs uppercase tracking-widest border-b-2 border-jc-red hover:text-jc-red transition-colors pb-1"
            >
              Become a Hospitality Partner
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
