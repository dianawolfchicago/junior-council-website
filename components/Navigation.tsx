'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type DropdownItem = { href: string; label: string; description?: string }
type NavLink = {
  href: string
  label: string
  dropdown?: DropdownItem[]
}

const navLinks: NavLink[] = [
  { href: '/about', label: 'About' },
  {
    href: '/membership',
    label: 'Membership',
    dropdown: [
      {
        href: '/membership',
        label: 'Join & Committees',
        description: 'Why join, life in JC, committees & dues',
      },
      {
        href: '/board',
        label: 'Board of Directors',
        description: 'Meet the leadership team',
      },
      {
        href: '/members',
        label: 'Member Directory',
        description: 'Browse our active members',
      },
    ],
  },
  { href: '/gala', label: 'Annual Gala' },
  { href: '/donors', label: 'Donors' },
  { href: '/support', label: 'Support' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileDropdownOpen(null)
    setActiveDropdown(null)
  }, [pathname])

  const handleMouseEnter = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(href)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  const isActive = (link: NavLink) =>
    pathname === link.href ||
    link.dropdown?.some((d) => pathname === d.href)

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-jc-black/95 backdrop-blur-sm shadow-lg shadow-black/20'
          : 'bg-jc-black'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0 group"
            aria-label="Junior Council — Home"
          >
            <span className="text-white font-black text-lg sm:text-xl tracking-widest uppercase group-hover:text-white/90 transition-colors">
              Junior
            </span>
            <span className="text-jc-red font-black text-lg sm:text-xl tracking-widest uppercase ml-2 group-hover:text-jc-red-light transition-colors">
              Council
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7" ref={dropdownRef}>
            {navLinks.map((link) =>
              link.dropdown ? (
                /* ── Dropdown item ── */
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(link.href)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 text-sm font-semibold tracking-wide uppercase transition-colors hover:text-jc-red focus:outline-none ${
                      isActive(link) ? 'text-jc-red' : 'text-white/80 hover:text-white'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === link.href}
                  >
                    {link.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === link.href ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-jc-black border border-white/10 shadow-xl shadow-black/40 transition-all duration-200 origin-top ${
                      activeDropdown === link.href
                        ? 'opacity-100 scale-y-100 pointer-events-auto'
                        : 'opacity-0 scale-y-95 pointer-events-none'
                    }`}
                    onMouseEnter={() => handleMouseEnter(link.href)}
                    onMouseLeave={handleMouseLeave}
                    role="menu"
                  >
                    {/* Red top accent */}
                    <div className="h-0.5 w-full bg-jc-red" aria-hidden="true" />
                    {link.dropdown.map((item, i) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className={`block px-5 py-4 transition-colors hover:bg-white/5 group ${
                          i < link.dropdown!.length - 1 ? 'border-b border-white/5' : ''
                        }`}
                      >
                        <div
                          className={`text-xs font-bold uppercase tracking-widest mb-0.5 transition-colors group-hover:text-jc-red ${
                            pathname === item.href ? 'text-jc-red' : 'text-white'
                          }`}
                        >
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-white/40 text-xs leading-snug">
                            {item.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── Regular link ── */
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:text-jc-red ${
                    pathname === link.href ? 'text-jc-red' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Donate Button + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/support#donate"
              className="bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-5 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-jc-red focus:ring-offset-2 focus:ring-offset-jc-black"
            >
              Donate
            </Link>
            <button
              className="lg:hidden text-white p-1 hover:text-jc-red transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden bg-jc-charcoal border-t border-white/10 transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              /* ── Mobile dropdown ── */
              <div key={link.href}>
                <button
                  onClick={() =>
                    setMobileDropdownOpen(
                      mobileDropdownOpen === link.href ? null : link.href
                    )
                  }
                  className={`w-full flex items-center justify-between px-3 py-3 text-sm font-semibold uppercase tracking-wide border-b border-white/5 transition-colors ${
                    isActive(link) ? 'text-jc-red' : 'text-white/80'
                  }`}
                >
                  {link.label}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      mobileDropdownOpen === link.href ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Sub-items */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    mobileDropdownOpen === link.href ? 'max-h-64' : 'max-h-0'
                  }`}
                >
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 pl-7 pr-3 py-2.5 text-sm border-b border-white/5 transition-colors ${
                        pathname === item.href ? 'text-jc-red' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <div className="w-1 h-1 bg-jc-red flex-shrink-0" aria-hidden="true" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* ── Regular mobile link ── */
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-3 text-sm font-semibold uppercase tracking-wide border-b border-white/5 transition-colors ${
                  pathname === link.href ? 'text-jc-red' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-3">
            <Link
              href="/support#donate"
              className="block bg-jc-red hover:bg-jc-red-dark text-white font-black text-sm tracking-widest uppercase px-3 py-3 text-center transition-colors"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
