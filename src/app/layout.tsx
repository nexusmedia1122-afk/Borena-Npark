import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { OfflineIndicator, BackOnlineIndicator, InstallPrompt, DataSaverToggle } from '@/components/offline-components'

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1F3628',
}

export const metadata: Metadata = {
  title: 'Borena National Park',
  description: 'Explore Borena National Park — wildlife, culture, conservation and visitor information.',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Borena Park' },
  formatDetection: { telephone: true },
  icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          {children}
          <OfflineIndicator />
          <BackOnlineIndicator />
          <InstallPrompt />
          <DataSaverToggle />
        </AuthProvider>
      </body>
    </html>
  )
}
