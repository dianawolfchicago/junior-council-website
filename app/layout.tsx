import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Junior Council | Fighting for Youth with HIV/AIDS in Chicago',
    template: '%s | Junior Council',
  },
  description:
    'Junior Council is a Chicago-based nonprofit dedicated to raising money for adolescents living with HIV and AIDS, in partnership with Ann & Robert H. Lurie Children\'s Hospital of Chicago.',
  keywords: [
    'Junior Council',
    'HIV AIDS youth',
    'Chicago nonprofit',
    'Lurie Children\'s Hospital',
    'adolescent HIV',
    'donate Chicago',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Junior Council',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
