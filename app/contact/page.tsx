import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Junior Council',
  description: 'Get in touch with Junior Council — membership, partnerships, events, and more.',
}

const contactReasons = [
  { value: 'membership', label: 'Membership Inquiry' },
  { value: 'corporate', label: 'Corporate Partnership' },
  { value: 'hospitality', label: 'Hospitality Partnership' },
  { value: 'inkind', label: 'In-Kind Donation' },
  { value: 'gala', label: 'Gala / Event Inquiry' },
  { value: 'media', label: 'Media & Press' },
  { value: 'general', label: 'General Inquiry' },
]

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-jc-black py-24 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1.5 h-full bg-jc-red" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">
              Get in Touch
            </span>
          </div>
          <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Whether you&apos;re interested in membership, partnership, or just want to
            learn more — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-jc-black font-black text-2xl sm:text-3xl mb-8 tracking-tight">
                Send Us a <span className="text-jc-red">Message</span>
              </h2>
              <form
                className="space-y-6"
                aria-label="Contact form"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-jc-black text-sm font-bold uppercase tracking-wide mb-2"
                    >
                      First Name <span className="text-jc-red" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      required
                      autoComplete="given-name"
                      className="w-full border-2 border-jc-gray-mid focus:border-jc-red outline-none px-4 py-3 text-jc-black transition-colors"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-jc-black text-sm font-bold uppercase tracking-wide mb-2"
                    >
                      Last Name <span className="text-jc-red" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      required
                      autoComplete="family-name"
                      className="w-full border-2 border-jc-gray-mid focus:border-jc-red outline-none px-4 py-3 text-jc-black transition-colors"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-jc-black text-sm font-bold uppercase tracking-wide mb-2"
                  >
                    Email Address <span className="text-jc-red" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full border-2 border-jc-gray-mid focus:border-jc-red outline-none px-4 py-3 text-jc-black transition-colors"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-jc-black text-sm font-bold uppercase tracking-wide mb-2"
                  >
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    autoComplete="organization"
                    className="w-full border-2 border-jc-gray-mid focus:border-jc-red outline-none px-4 py-3 text-jc-black transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reason"
                    className="block text-jc-black text-sm font-bold uppercase tracking-wide mb-2"
                  >
                    Reason for Contact <span className="text-jc-red" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    required
                    className="w-full border-2 border-jc-gray-mid focus:border-jc-red outline-none px-4 py-3 text-jc-black transition-colors bg-white"
                    aria-required="true"
                  >
                    <option value="">Select a reason...</option>
                    {contactReasons.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-jc-black text-sm font-bold uppercase tracking-wide mb-2"
                  >
                    Message <span className="text-jc-red" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full border-2 border-jc-gray-mid focus:border-jc-red outline-none px-4 py-3 text-jc-black transition-colors resize-y"
                    aria-required="true"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors focus:outline-none focus:ring-2 focus:ring-jc-red focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-jc-black font-black text-2xl sm:text-3xl mb-8 tracking-tight">
                Connect With <span className="text-jc-red">JC</span>
              </h2>
              <div className="space-y-6 mb-10">
                <div className="border-l-4 border-jc-red pl-4">
                  <div className="text-jc-black font-bold text-sm uppercase tracking-wide mb-1">
                    Email
                  </div>
                  <a
                    href="mailto:info@juniorcouncil.org"
                    className="text-jc-gray-dark hover:text-jc-red transition-colors text-sm"
                  >
                    info@juniorcouncil.org
                  </a>
                </div>
                <div className="border-l-4 border-jc-red pl-4">
                  <div className="text-jc-black font-bold text-sm uppercase tracking-wide mb-1">
                    Location
                  </div>
                  <p className="text-jc-gray-dark text-sm">Chicago, Illinois</p>
                </div>
                <div className="border-l-4 border-jc-red pl-4">
                  <div className="text-jc-black font-bold text-sm uppercase tracking-wide mb-1">
                    Partner Organization
                  </div>
                  <p className="text-jc-gray-dark text-sm">
                    Ann &amp; Robert H. Lurie Children&apos;s Hospital of Chicago
                  </p>
                </div>
              </div>

              <div className="bg-jc-black p-6">
                <h3 className="text-white font-black text-lg mb-4">
                  Follow Us
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Stay connected with Junior Council on social media for event
                  updates, impact stories, and community news.
                </p>
                <div className="space-y-3">
                  {[
                    { platform: 'Facebook', handle: 'TheJuniorCouncil', href: 'https://www.facebook.com/TheJuniorCouncil' },
                    { platform: 'Instagram', handle: '@junior_council', href: 'https://www.instagram.com/junior_council/' },
                    { platform: 'LinkedIn', handle: 'juniorcouncil', href: 'https://www.linkedin.com/company/juniorcouncil/' },
                    { platform: 'TikTok', handle: '@junior_council', href: 'https://www.tiktok.com/@junior_council' },
                  ].map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                    >
                      <div className="w-2 h-2 bg-jc-red flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs font-semibold uppercase tracking-wide w-20">
                        {s.platform}
                      </span>
                      <span className="text-xs">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
