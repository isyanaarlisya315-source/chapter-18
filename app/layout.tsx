import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PROJECT: 18 — MEMORY CORE',
  description:
    'An interactive cinematic digital experience. Signal detected. Subject identified.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#02030a',
  userScalable: false,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} dark`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
