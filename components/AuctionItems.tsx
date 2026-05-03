'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Types ───────────────────────────────────────────────────────────────────

type AuctionItem = {
  id: number
  title: string
  category: string
  tagline: string
  description: string
  donor: string
  estimatedValue: number
  startingBid: number
  currentBid: number
  bidCount: number
  details: string[]
  image: string // Unsplash URL
}

type Category = {
  label: string
  description: string
  image: string
  icon: string
}

// ─── Categories ──────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    label: 'Travel & Experiences',
    description: 'Weekend getaways, hotel stays, and bucket-list adventures.',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=500&fit=crop',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
  },
  {
    label: 'Sports & Entertainment',
    description: 'Premium tickets, VIP access, and behind-the-scenes experiences.',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop',
    icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
  },
  {
    label: 'Dining & Hospitality',
    description: "Chef's table dinners, private tastings, and Chicago's finest.",
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop',
    icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
  },
  {
    label: 'Luxury & Lifestyle',
    description: 'Fashion, hotel stays, and curated luxury gifts.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop',
    icon: 'M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z',
  },
  {
    label: 'Art & Collectibles',
    description: 'Original works, signed memorabilia, and unique collectibles.',
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=800&h=500&fit=crop',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    label: 'Wellness & Beauty',
    description: 'Spa days, fitness packages, and self-care experiences.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=500&fit=crop',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
]

// ─── Auction Items ────────────────────────────────────────────────────────────

const auctionItems: AuctionItem[] = [
  {
    id: 1,
    title: '7-Night Caribbean Cruise for 2',
    category: 'Travel & Experiences',
    tagline: 'Set sail on the ultimate escape',
    description:
      "Enjoy a luxurious 7-night Caribbean cruise for two aboard Royal Caribbean's Oasis of the Seas. Visit stunning ports including Nassau, Cozumel, and St. Thomas. Includes an ocean-view stateroom, all onboard dining, entertainment, and a $300 onboard credit.",
    donor: 'Royal Caribbean International',
    estimatedValue: 4200,
    startingBid: 1800,
    currentBid: 2400,
    bidCount: 7,
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&h=500&fit=crop',
    details: [
      '7 nights aboard Royal Caribbean Oasis of the Seas',
      'Ocean-view stateroom for 2 guests',
      'Ports: Nassau · Cozumel · St. Thomas',
      '$300 onboard dining & spa credit',
      'Valid through December 2027 (blackout dates apply)',
      'Airfare not included',
    ],
  },
  {
    id: 2,
    title: 'Aruba All-Inclusive Resort, 5 Nights',
    category: 'Travel & Experiences',
    tagline: 'Sun, sand & unlimited everything',
    description:
      'Escape to the "One Happy Island" with a 5-night all-inclusive stay for two at the iconic Bucuti & Tara Beach Resort — consistently ranked one of the most romantic resorts in the Caribbean. Includes all meals, premium beverages, and direct beachfront access.',
    donor: 'Bucuti & Tara Beach Resort',
    estimatedValue: 5800,
    startingBid: 2500,
    currentBid: 3100,
    bidCount: 11,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=500&fit=crop',
    details: [
      '5 nights all-inclusive for 2 guests',
      'Beachfront room at Bucuti & Tara Beach Resort',
      'All meals & premium beverages included',
      'Daily sunset cocktail hour on the beach',
      'Complimentary snorkel equipment rental',
      'Valid through November 2027 (blackout dates apply)',
    ],
  },
  {
    id: 3,
    title: 'Chicago Bulls Courtside Seats (4 Tickets)',
    category: 'Sports & Entertainment',
    tagline: 'Feel the energy from the floor',
    description:
      "Experience a Chicago Bulls home game like never before with 4 courtside tickets. You'll be steps from the action at the United Center, with access to the exclusive courtside lounge, complimentary food and beverages, and a meet-and-greet with a team ambassador.",
    donor: 'Chicago Bulls Organization',
    estimatedValue: 3200,
    startingBid: 1200,
    currentBid: 1750,
    bidCount: 9,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop',
    details: [
      '4 courtside seats for one Bulls home game',
      'Access to exclusive courtside lounge',
      'Complimentary food & beverage service',
      'Team ambassador meet-and-greet',
      'Game selected from available 2026–27 home schedule',
      'Playoff games excluded',
    ],
  },
  {
    id: 4,
    title: 'Wrigley Field Rooftop Suite Experience',
    category: 'Sports & Entertainment',
    tagline: "Chicago's most iconic view",
    description:
      'Host your crew at a private Wrigley Field rooftop suite for a Chicago Cubs home game. Includes 10 tickets, an all-inclusive food and open bar package, and a breathtaking view of the ivy-covered outfield.',
    donor: 'Wrigley Rooftops Chicago',
    estimatedValue: 2800,
    startingBid: 1000,
    currentBid: 1300,
    bidCount: 5,
    image: 'https://images.unsplash.com/photo-1566479179817-6a8b75dfcf71?w=800&h=500&fit=crop',
    details: [
      '10 tickets in a private rooftop suite',
      'All-inclusive food & open bar',
      'Unobstructed view of Wrigley Field',
      'Game selected from 2027 Cubs home schedule',
      'Playoff games and special events excluded',
    ],
  },
  {
    id: 5,
    title: "Chef's Table Dinner at Alinea",
    category: 'Dining & Hospitality',
    tagline: 'A once-in-a-lifetime culinary journey',
    description:
      "Indulge in a chef's table experience for 4 guests at Alinea, Chicago's only three-Michelin-star restaurant. Chef Grant Achatz's avant-garde cuisine redefines what a meal can be. Includes wine pairings, a signed cookbook, and a kitchen tour.",
    donor: 'Alinea Restaurant Group',
    estimatedValue: 2200,
    startingBid: 900,
    currentBid: 1150,
    bidCount: 8,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop',
    details: [
      "Chef's table experience for 4 guests",
      'Full tasting menu with wine pairings',
      'Signed copy of the Alinea cookbook',
      'Private kitchen tour with a culinary team member',
      'Reservation subject to availability — advance scheduling required',
      'Valid through June 2027',
    ],
  },
  {
    id: 6,
    title: 'Private Wine Tasting for 10',
    category: 'Dining & Hospitality',
    tagline: 'Uncork something special',
    description:
      "Host an intimate private wine tasting for up to 10 guests at Chicago's acclaimed Ēst Wine Bar. A certified sommelier will guide your group through a curated selection of 8 premium wines, paired with an artisan cheese and charcuterie spread.",
    donor: 'Ēst Wine Bar Chicago',
    estimatedValue: 900,
    startingBid: 350,
    currentBid: 500,
    bidCount: 6,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=500&fit=crop',
    details: [
      'Private tasting for up to 10 guests',
      '8 premium wines guided by a certified sommelier',
      'Artisan cheese & charcuterie board',
      'Take-home wine guide & tasting notes',
      'Available Tuesday–Thursday evenings',
      'Valid through August 2027',
    ],
  },
  {
    id: 7,
    title: 'Weekend at The Ritz-Carlton Chicago',
    category: 'Luxury & Lifestyle',
    tagline: 'Two nights of pure indulgence',
    description:
      'Treat yourself to a 2-night stay in a Magnificent Mile Deluxe Room at The Ritz-Carlton Chicago. Includes daily breakfast for two, a $250 spa credit, and complimentary valet parking.',
    donor: 'The Ritz-Carlton Chicago',
    estimatedValue: 2400,
    startingBid: 950,
    currentBid: 1200,
    bidCount: 10,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=500&fit=crop',
    details: [
      '2-night stay in a Magnificent Mile Deluxe Room',
      'Daily breakfast for 2 guests',
      '$250 spa credit at The Spa at Ritz-Carlton',
      'Complimentary valet parking (one vehicle)',
      'Subject to availability — blackout dates may apply',
      'Valid through October 2027',
    ],
  },
  {
    id: 8,
    title: 'Louis Vuitton Neverfull MM Tote',
    category: 'Luxury & Lifestyle',
    tagline: 'An icon, reimagined',
    description:
      "The Louis Vuitton Neverfull MM in Monogram Canvas — one of the world's most coveted handbags. Timeless, versatile, and impeccably crafted. Comes with original dust bag, authenticity card, and gift receipt from Louis Vuitton Chicago.",
    donor: 'Anonymous Donor',
    estimatedValue: 1800,
    startingBid: 900,
    currentBid: 1050,
    bidCount: 4,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=500&fit=crop',
    details: [
      'Louis Vuitton Neverfull MM, Monogram Canvas',
      'Brand new with original packaging',
      'Includes dust bag & authenticity card',
      'Purchased from Louis Vuitton Chicago',
      'Color: Classic Brown Monogram with Beige interior',
    ],
  },
  {
    id: 9,
    title: 'Luxury Spa Day for 2 — The Peninsula',
    category: 'Wellness & Beauty',
    tagline: 'The ultimate day of self-care',
    description:
      "Unwind with a full day at The Peninsula Spa Chicago for two. Enjoy a 90-minute couples massage, access to the rooftop pool, steam room, and fitness center, plus a light spa lunch — one of Chicago's most celebrated spa experiences.",
    donor: 'The Peninsula Chicago',
    estimatedValue: 1100,
    startingBid: 450,
    currentBid: 625,
    bidCount: 7,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=500&fit=crop',
    details: [
      '90-minute couples massage of your choice',
      'Full-day access to rooftop pool & relaxation areas',
      'Steam room, sauna & fitness center included',
      'Spa lunch for 2 (light menu)',
      'Robe & slippers provided',
      'Valid Monday–Friday through September 2027',
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AuctionItems() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null)

  const itemsInCategory = selectedCategory
    ? auctionItems.filter((i) => i.category === selectedCategory.label)
    : []

  const closeAll = () => {
    setSelectedItem(null)
    setSelectedCategory(null)
  }

  return (
    <>
      {/* ── Category Grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = auctionItems.filter((i) => i.category === cat.label).length
          return (
            <div
              key={cat.label}
              onClick={() => { setSelectedItem(null); setSelectedCategory(cat) }}
              className="group relative border border-jc-gray-mid hover:border-jc-red transition-colors cursor-pointer overflow-hidden"
            >
              {/* Photo */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-jc-black/50 group-hover:bg-jc-black/40 transition-colors" />
                {/* Icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d={cat.icon} />
                  </svg>
                </div>
                {count > 0 && (
                  <div className="absolute top-3 right-3 bg-jc-red text-white text-xs font-black px-2 py-0.5 uppercase tracking-widest">
                    {count} item{count !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-jc-black font-black text-base leading-snug">{cat.label}</h3>
                  <p className="text-jc-gray-dark text-xs mt-0.5">{cat.description}</p>
                </div>
                <svg className="w-5 h-5 text-jc-red flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Category Modal (items list) ── */}
      {selectedCategory && !selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/70 overflow-y-auto"
          onClick={closeAll}
        >
          <div
            className="bg-white w-full max-w-3xl shadow-2xl border-t-4 border-jc-red my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Category hero */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={selectedCategory.image}
                alt={selectedCategory.label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-jc-black/60" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase mb-1">Browse Items</p>
                <h2 className="text-white font-black text-2xl sm:text-3xl tracking-tight">{selectedCategory.label}</h2>
              </div>
              <button
                onClick={closeAll}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="p-6">
              {itemsInCategory.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-jc-gray-dark font-bold">Items coming soon — check back as we get closer to Snowball 2027!</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {itemsInCategory.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="group border border-jc-gray-mid hover:border-jc-red transition-colors cursor-pointer"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-jc-black font-black text-sm leading-snug mb-1">{item.title}</h3>
                        <p className="text-jc-gray-dark text-xs italic mb-3">{item.tagline}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-jc-gray-dark text-xs uppercase tracking-widest">Starting Bid</div>
                            <div className="text-jc-red font-black text-lg">{fmt(item.startingBid)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-jc-gray-dark text-xs uppercase tracking-widest">Est. Value</div>
                            <div className="text-jc-black font-bold text-sm">{fmt(item.estimatedValue)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Item Detail Modal ── */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/70 overflow-y-auto"
          onClick={closeAll}
        >
          <div
            className="bg-white w-full max-w-2xl shadow-2xl border-t-4 border-jc-red my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-jc-black/40" />
              {/* Back button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 left-4 flex items-center gap-1.5 text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {selectedCategory?.label}
              </button>
              <button
                onClick={closeAll}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8">
              {/* Title */}
              <h2 className="text-jc-black font-black text-2xl tracking-tight leading-snug mb-1">{selectedItem.title}</h2>
              <p className="text-jc-gray-dark text-sm italic mb-5">{selectedItem.tagline}</p>

              {/* Bid stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Starting Bid', value: fmt(selectedItem.startingBid), highlight: true },
                  { label: 'Est. Value',   value: fmt(selectedItem.estimatedValue) },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className={`p-3 text-center border ${highlight ? 'border-jc-red bg-jc-red/5' : 'border-jc-gray-mid'}`}>
                    <div className="text-jc-gray-dark text-xs uppercase tracking-widest mb-1">{label}</div>
                    <div className={`font-black text-lg ${highlight ? 'text-jc-red' : 'text-jc-black'}`}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-jc-gray-dark text-sm leading-relaxed mb-5">{selectedItem.description}</p>

              {/* Details */}
              <div className="mb-5">
                <h4 className="text-jc-black font-black text-xs uppercase tracking-widest mb-3">What's Included</h4>
                <ul className="space-y-2">
                  {selectedItem.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-jc-gray-dark">
                      <div className="w-1.5 h-1.5 bg-jc-red flex-shrink-0 mt-1.5" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Donor */}
              <p className="text-jc-gray-dark text-xs mb-6">
                <span className="font-bold text-jc-black">Donated by:</span> {selectedItem.donor}
              </p>

              {/* CTA */}
              <button
                className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase py-4 transition-colors"
                onClick={() => alert('Live bidding opens at Snowball 2027 — February 27, 2027!')}
              >
                Bidding Opens February 27, 2027
              </button>
              <p className="text-jc-gray-dark text-xs text-center mt-3">
                Bidding closes at the event · Snowball 2027 · Chicago, IL
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
