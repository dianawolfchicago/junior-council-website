import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Cause | Junior Council',
  description:
    "Learn about Junior Council's mission and the cause we fight for — supporting youth with HIV and AIDS in Chicago.",
}

export default function OurCausePage() {
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
            Our Cause
          </h1>
          <p className="text-white/60 text-lg mt-4 max-w-2xl">
            Junior Council exists to give Chicago&apos;s youth with HIV and AIDS
            access to the care, support, and opportunity they deserve.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-jc-red py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-white/60" aria-hidden="true" />
            <span className="text-white/80 text-xs font-bold tracking-[0.25em] uppercase">Our Mission</span>
            <div className="w-8 h-0.5 bg-white/60" aria-hidden="true" />
          </div>
          <p className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-snug tracking-tight">
            To ensure all children with HIV/AIDS, regardless of their ability
            to pay, have access to high-quality pediatric care.
          </p>
        </div>
      </section>

      {/* Our Cause */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
                <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">Who We Serve</span>
              </div>
              <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-6 tracking-tight">
                The Fight for <span className="text-jc-red">Youth with HIV & AIDS</span>
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
              <p className="text-jc-gray-dark text-base leading-relaxed mb-5">
                Every event we host, every membership dues we collect, and every
                corporate partnership we forge translates directly into resources
                for these young patients. This is a cause that deserves a champion
                — and Junior Council is proud to be that champion.
              </p>
              <p className="text-jc-gray-dark text-base leading-relaxed">
                A portion of funds raised each year also supports educational
                opportunities for past and present patients of the Lurie
                Adolescent HIV Program.
              </p>
            </div>

            {/* Logo */}
            <div className="flex items-center justify-center">
              <Image
                src="/jc-logo-color.jpg"
                alt="Junior Council logo"
                width={440}
                height={440}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="bg-jc-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">By the Numbers</span>
          </div>
          <h2 className="text-white font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            This Is a <span className="text-jc-red">Real Crisis</span> — Right Now
          </h2>
          <p className="text-white/60 text-base mb-12 max-w-2xl">
            HIV among adolescents is not a problem of the past. These are the facts — sourced from the CDC, NIH, and UNICEF.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              {
                stat: '19%',
                label: 'of all new U.S. HIV diagnoses in 2022 were among youth ages 13–24',
                source: 'NIH HIVinfo, 2025',
              },
              {
                stat: '44%',
                label: 'of adolescents living with HIV in the U.S. don\'t know their status',
                source: 'NIH HIVinfo, 2025',
              },
              {
                stat: '34%',
                label: 'of diagnosed young people achieve viral suppression — vs. 63% of adults',
                source: 'NICHD, 2020',
              },
              {
                stat: '70%',
                label: 'of new U.S. HIV infections occur among Black and Latino individuals',
                source: 'CDC, 2023',
              },
            ].map((item) => (
              <div key={item.stat} className="bg-jc-black p-8 flex flex-col">
                <div className="text-jc-red font-black text-5xl sm:text-6xl mb-4 leading-none">{item.stat}</div>
                <p className="text-white text-sm leading-relaxed flex-1">{item.label}</p>
                <p className="text-white/30 text-xs mt-4 uppercase tracking-widest">{item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Testimonials */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-jc-red" aria-hidden="true" />
            <span className="text-jc-red text-xs font-bold tracking-[0.25em] uppercase">From the Clinic</span>
          </div>
          <h2 className="text-jc-black font-black text-3xl sm:text-4xl mb-4 tracking-tight">
            Real Lives. <span className="text-jc-red">Real Impact.</span>
          </h2>
          <p className="text-jc-gray-dark text-lg mb-12 max-w-2xl">
            Behind every dollar raised is a young person getting the care they deserve. Here are their stories.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Coming to Lurie changed everything for me. The team there doesn't just treat your diagnosis — they treat you like a person. I finally felt like someone was in my corner.",
                name: 'Patient, age 17',
                detail: 'Diagnosed at age 14 · Lurie Adolescent HIV Program',
              },
              {
                quote:
                  "As a mom, I was terrified. I didn't know where to turn or how we'd afford the care my son needed. The clinic connected us to resources we didn't even know existed — and Junior Council helped make that possible.",
                name: 'Parent of a Lurie patient',
                detail: 'Family enrolled in program since 2021',
              },
              {
                quote:
                  "I've been a patient here for three years. The doctors know my name, they know my story. Because of the support from this community, I haven't had to worry about the cost of my treatment — I just focus on getting better.",
                name: 'Patient, age 19',
                detail: 'Transitioned from pediatric to adolescent care at Lurie',
              },
            ].map((t, i) => (
              <div key={i} className="flex flex-col bg-jc-gray border border-jc-gray-mid p-8">
                <div className="text-jc-red font-black text-5xl leading-none mb-4" aria-hidden="true">&ldquo;</div>
                <p className="text-jc-gray-dark text-base leading-relaxed flex-grow mb-8">{t.quote}</p>
                <div className="border-t border-jc-gray-mid pt-6">
                  <div className="text-jc-black font-bold text-sm">{t.name}</div>
                  <div className="text-jc-gray-dark text-xs mt-1">{t.detail}</div>
                </div>
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
              className="inline-flex items-center justify-center bg-white hover:bg-white/90 text-jc-red font-black text-sm tracking-widest uppercase px-8 py-4 transition-colors"
            >
              Get Involved
            </Link>
            <Link
              href="/support#donate"
              className="inline-flex items-center justify-center border-2 border-white/50 text-white font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white/10 transition-colors"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
