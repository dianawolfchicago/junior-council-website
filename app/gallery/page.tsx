'use client'

import { useState } from 'react'
import Link from 'next/link'

const events = [
  {
    id: 'all',
    label: 'All Photos',
  },
  {
    id: 'snowball-gala',
    label: 'Snowball Gala',
  },
  {
    id: 'golf-outing',
    label: 'Golf Outing',
  },
  {
    id: 'life-in-jc',
    label: 'Life in JC',
  },
  {
    id: 'volunteer',
    label: 'Volunteer Days',
  },
]

// Placeholder photos — replace src with real image paths when ready
// e.g. src: '/images/gallery/snowball-2024-01.jpg'
const photos = [
  // Snowball Gala
  { id: 1, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2024', caption: 'Snowball Gala 2024' },
  { id: 2, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2024', caption: 'Snowball Gala 2024' },
  { id: 3, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2024', caption: 'Snowball Gala 2024' },
  { id: 4, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2024', caption: 'Snowball Gala 2024' },
  { id: 5, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2024', caption: 'Snowball Gala 2024' },
  { id: 6, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2024', caption: 'Snowball Gala 2024' },
  { id: 7, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2023', caption: 'Snowball Gala 2023' },
  { id: 8, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2023', caption: 'Snowball Gala 2023' },
  { id: 9, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2023', caption: 'Snowball Gala 2023' },
  { id: 10, event: 'snowball-gala', eventLabel: 'Snowball Gala', year: '2023', caption: 'Snowball Gala 2023' },
  // Golf Outing
  { id: 11, event: 'golf-outing', eventLabel: 'Golf Outing', year: '2024', caption: 'Golf Outing 2024' },
  { id: 12, event: 'golf-outing', eventLabel: 'Golf Outing', year: '2024', caption: 'Golf Outing 2024' },
  { id: 13, event: 'golf-outing', eventLabel: 'Golf Outing', year: '2024', caption: 'Golf Outing 2024' },
  { id: 14, event: 'golf-outing', eventLabel: 'Golf Outing', year: '2024', caption: 'Golf Outing 2024' },
  { id: 15, event: 'golf-outing', eventLabel: 'Golf Outing', year: '2023', caption: 'Golf Outing 2023' },
  { id: 16, event: 'golf-outing', eventLabel: 'Golf Outing', year: '2023', caption: 'Golf Outing 2023' },
  // Life in JC
  { id: 17, event: 'life-in-jc', eventLabel: 'Life in JC', year: '2024', caption: 'Member Happy Hour 2024' },
  { id: 18, event: 'life-in-jc', eventLabel: 'Life in JC', year: '2024', caption: 'Member Happy Hour 2024' },
  { id: 19, event: 'life-in-jc', eventLabel: 'Life in JC', year: '2024', caption: 'Board Meeting 2024' },
  { id: 20, event: 'life-in-jc', eventLabel: 'Life in JC', year: '2024', caption: 'Community Event 2024' },
  { id: 21, event: 'life-in-jc', eventLabel: 'Life in JC', year: '2023', caption: 'Member Social 2023' },
  { id: 22, event: 'life-in-jc', eventLabel: 'Life in JC', year: '2023', caption: 'Annual Meeting 2023' },
  // Volunteer Days
  { id: 23, event: 'volunteer', eventLabel: 'Volunteer Days', year: '2024', caption: 'Volunteer Day 2024' },
  { id: 24, event: 'volunteer', eventLabel: 'Volunteer Days', year: '2024', caption: 'Volunteer Day 2024' },
  { id: 25, event: 'volunteer', eventLabel: 'Volunteer Days', year: '2024', caption: 'Volunteer Day 2024' },
  { id: 26, event: 'volunteer', eventLabel: 'Volunteer Days', year: '2023', caption: 'Volunteer Day 2023' },
]

type Photo = typeof photos[0]

export default function GalleryPage() {
  const [activeEvent, setActiveEvent] = useState('all')
  const [lightbox, setLightbox] = useState<Photo | null>(null)

  const filtered =
    activeEvent === 'all'
      ? photos
      : photos.filter((p) => p.event === activeEvent)

  // Group by event label + year for the "All" view
  const grouped = filtered.reduce<Record<string, Photo[]>>((acc, photo) => {
    const key = `${photo.eventLabel} — ${photo.year}`
    if (!acc[key]) acc[key] = []
    acc[key].push(photo)
    return acc
  }, {})

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
              Memories
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            A look at the people, events, and moments that make Junior Council
            what it is. Browse by event below.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-jc-charcoal sticky top-16 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {events.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setActiveEvent(ev.id)}
                className={`flex-shrink-0 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors focus:outline-none ${
                  activeEvent === ev.id
                    ? 'bg-jc-red text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {ev.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeEvent === 'all' ? (
            // Grouped view — show section headers per event + year
            <div className="space-y-16">
              {Object.entries(grouped).map(([group, groupPhotos]) => (
                <div key={group}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-jc-black font-black text-2xl tracking-tight">
                      {group.split(' — ')[0]}
                      <span className="text-jc-red ml-2">— {group.split(' — ')[1]}</span>
                    </h2>
                    <div className="flex-1 h-px bg-jc-gray-mid" aria-hidden="true" />
                    <span className="text-jc-gray-dark text-xs uppercase tracking-widest">
                      {groupPhotos.length} photos
                    </span>
                  </div>
                  <PhotoGrid photos={groupPhotos} onOpen={setLightbox} />
                </div>
              ))}
            </div>
          ) : (
            // Single event view
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-jc-black font-black text-2xl tracking-tight">
                  {events.find((e) => e.id === activeEvent)?.label}
                </h2>
                <div className="flex-1 h-px bg-jc-gray-mid" aria-hidden="true" />
                <span className="text-jc-gray-dark text-xs uppercase tracking-widest">
                  {filtered.length} photos
                </span>
              </div>
              <PhotoGrid photos={filtered} onOpen={setLightbox} />
            </div>
          )}

          {/* Upload CTA for admins */}
          <div className="mt-16 border-2 border-dashed border-jc-gray-mid p-10 text-center">
            <p className="text-jc-gray-dark text-sm mb-2 font-semibold uppercase tracking-wide">
              Photos Coming Soon
            </p>
            <p className="text-jc-gray-dark text-sm">
              Real photos will be added here. Each placeholder above represents
              one image slot ready to go.{' '}
              <Link href="/contact" className="text-jc-red font-bold hover:underline">
                Contact us
              </Link>{' '}
              to submit photos.
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${lightbox.caption}`}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close photo"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo placeholder — swap for real <Image> when photos are ready */}
            <div className="bg-jc-charcoal aspect-video w-full flex flex-col items-center justify-center">
              <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-white/30 text-sm">Photo placeholder</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-white font-semibold">{lightbox.caption}</p>
              <span className="text-white/40 text-xs uppercase tracking-widest">
                {lightbox.eventLabel} · {lightbox.year}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PhotoGrid({
  photos,
  onOpen,
}: {
  photos: Photo[]
  onOpen: (photo: Photo) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {photos.map((photo) => (
        <button
          key={photo.id}
          onClick={() => onOpen(photo)}
          className="group relative bg-jc-gray aspect-square overflow-hidden focus:outline-none focus:ring-2 focus:ring-jc-red focus:ring-offset-2"
          aria-label={`View photo: ${photo.caption}`}
        >
          {/* Placeholder — replace with Next.js <Image> when real photos available */}
          <div className="w-full h-full flex items-center justify-center bg-jc-gray group-hover:bg-jc-gray-mid transition-colors">
            <svg className="w-10 h-10 text-jc-gray-mid group-hover:text-jc-gray-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-jc-black/0 group-hover:bg-jc-black/50 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
            <p className="text-white text-xs font-semibold leading-tight">
              {photo.caption}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
