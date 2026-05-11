'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    q: 'What is the mission of Junior Council?',
    a: 'Our mission is to help provide financial support to the Adolescent HIV/AIDS Program at Ann & Robert H. Lurie Children\'s Hospital of Chicago, ensuring all children with HIV/AIDS have access to high-quality pediatric care regardless of their ability to pay.',
  },
  {
    q: 'How does Junior Council use donated funds?',
    a: 'Funds raised by Junior Council go directly to support the Adolescent HIV/AIDS Program at Ann & Robert H. Lurie Children\'s Hospital of Chicago, covering medical care, mental health services, social support, and educational assistance for patients.',
  },
  {
    q: 'Is Junior Council a registered nonprofit?',
    a: 'Yes, Junior Council is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible to the extent permitted by law.',
  },
  {
    q: 'What fundraising events does Junior Council host?',
    a: 'Junior Council hosts a variety of events throughout the year including our Annual Snowball Gala, Derby Party, Cruising for a Cause, Happy Hours, and Golf Outings. Follow us on social media and check our website for upcoming events.',
  },
  {
    q: 'How can I participate in Junior Council events?',
    a: 'To participate in our events, simply purchase tickets for the ones that interest you through our website or OneCause platform. Keep an eye on our social media and newsletter for announcements.',
  },
  {
    q: 'Who can become a member of Junior Council?',
    a: 'Junior Council membership is open to young Chicago-area professionals who share our passion for supporting youth with HIV and AIDS. Visit our Membership page for current eligibility requirements and dues information.',
  },
  {
    q: 'What are the benefits of becoming a member?',
    a: 'Members have the opportunity to influence organizational decisions, join committees, receive exclusive event invitations, access professional networking opportunities, and be part of a passionate community of young professionals united around a meaningful cause.',
  },
  {
    q: 'How can I volunteer with Junior Council?',
    a: 'We welcome volunteers to assist with event planning, administrative support, community outreach, and more. Reach out to our membership directors through the Contact page to get involved.',
  },
  {
    q: 'How can my organization partner with Junior Council?',
    a: 'We welcome corporate partnerships of all kinds. Email us at corporate@juniorcouncil.org or visit our Support page to explore sponsorship and collaboration opportunities.',
  },
  {
    q: 'Where is Junior Council based?',
    a: 'Junior Council is based in Chicago, IL. Our monthly meetings are held at the Drake Hotel, and our events are hosted at venues throughout the city.',
  },
  {
    q: 'Can other nonprofits collaborate with Junior Council?',
    a: 'Yes — we actively seek partnerships with other nonprofits for joint events, shared resources, and coordinated advocacy efforts. Get in touch through our Contact page.',
  },
  {
    q: 'How can I stay updated on Junior Council\'s activities?',
    a: 'Stay updated by subscribing to our newsletter, following us on social media, and regularly visiting this website. You can also reach out directly through our Contact page.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

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
            Frequently Asked<br className="hidden sm:block" />
            <span className="text-jc-red"> Questions</span>
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Everything you need to know about Junior Council, our mission,
            membership, events, and how to get involved.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-jc-gray-mid">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className={`font-bold text-base leading-snug transition-colors ${open === i ? 'text-jc-red' : 'text-jc-black group-hover:text-jc-red'}`}>
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-all duration-200 ${open === i ? 'rotate-180 text-jc-red' : 'text-jc-gray-mid group-hover:text-jc-red'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 pb-6' : 'max-h-0'}`}
                >
                  <p className="text-jc-gray-dark text-base leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="bg-jc-gray py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Still Have <span className="text-jc-red">Questions?</span>
          </h2>
          <p className="text-jc-gray-dark mb-8">
            We&apos;re happy to help. Reach out and a member of our team will get
            back to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/membership"
              className="inline-flex items-center justify-center border-2 border-jc-black text-jc-black font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-jc-black hover:text-white transition-colors"
            >
              Learn About Membership
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
