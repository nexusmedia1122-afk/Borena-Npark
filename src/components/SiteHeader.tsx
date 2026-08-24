'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Settings, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import SaveForOffline from '@/components/SaveForOffline'
import { DataSaverToggle } from '@/components/offline-components'
import QuickSearchModal from '@/components/QuickSearchModal'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Explore' },
  { href: '/wildlife', label: 'Wildlife' },
  { href: '/stories', label: 'Stories' },
  { href: '/culture', label: 'Culture' },
  { href: '/astronomy', label: 'Astronomy' },
  { href: '/conservation', label: 'Conservation' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/map', label: 'Map' },
  { href: '/about', label: 'About' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'
  // On home, transparent gradient over hero until scrolled; on subpages, always elegant dark glass
  const isSolid = scrolled || !isHome || open || settingsOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out',
          isSolid
            ? 'bg-forest-950/98 backdrop-blur-xl shadow-2xl border-b border-forest-800/80 py-0'
            : 'bg-gradient-to-b from-forest-950/90 via-forest-950/50 to-transparent py-1.5 border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full bg-white p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-all overflow-hidden border border-gold-400/60 shrink-0">
                <img
                  src="/logo.png"
                  alt="Borana National Park Official Logo"
                  className="w-full h-full object-contain transform scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-gold-300 transition-colors drop-shadow-md leading-none">
                  Borena
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-gold-400 mt-1">
                  National Park
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {NAV.map(item => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                      isActive
                        ? 'text-gold-300 bg-white/15 shadow-sm ring-1 ring-gold-400/30'
                        : 'text-ivory-100 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right Action Utilities */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Quick Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-ivory-200 hover:text-white hover:bg-white/15 rounded-lg transition-colors border border-white/10"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-gold-300" />
              </button>

              {/* Plan Your Visit CTA */}
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-lg shadow-glow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Plan Your Visit
              </Link>

              {/* Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="p-2 text-ivory-200 hover:text-white hover:bg-white/15 rounded-lg transition-colors border border-white/10"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4 text-ivory-200" />
                </button>
                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-sand-200 py-3 z-50 animate-in text-charcoal-900">
                    <div className="px-4 py-2 border-b border-sand-100 flex items-center justify-between">
                      <p className="text-xs font-bold text-charcoal-900 uppercase tracking-wider">Preferences</p>
                      <span className="text-[10px] text-forest-700 font-semibold bg-forest-100 px-2 py-0.5 rounded">Offline Ready</span>
                    </div>
                    <div className="px-4 py-3">
                      <DataSaverToggle />
                    </div>
                    <div className="px-4 py-3 border-t border-sand-100">
                      <SaveForOffline />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-ivory-100 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gold-400" />
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 text-ivory-100 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6 text-gold-400" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden border-t border-forest-800 bg-forest-950/98 backdrop-blur-2xl px-4 py-6 shadow-2xl">
            <nav className="space-y-1.5">
              {NAV.map(item => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block px-4 py-3 text-sm font-semibold rounded-xl transition-colors',
                      isActive
                        ? 'text-gold-300 bg-white/15 shadow-inner'
                        : 'text-ivory-100 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-4 mt-4 border-t border-forest-800">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3.5 text-sm font-bold uppercase tracking-wider bg-gold-600 text-charcoal-950 rounded-xl text-center shadow-lg hover:bg-gold-500 transition-colors"
                >
                  Plan Your Visit
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}