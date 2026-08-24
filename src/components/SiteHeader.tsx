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
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparent over the homepage hero; solid once scrolled or on subpages
  const isHome = pathname === '/'
  const overHero = isHome && !scrolled && !open && !settingsOpen

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 text-ivory-50 transition-all duration-300',
          overHero
            ? 'bg-transparent border-b border-transparent'
            : 'bg-forest-950/90 shadow-md backdrop-blur-md border-b border-forest-800/60'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gold-600 flex items-center justify-center font-display font-bold text-charcoal-900 text-xl shadow-md group-hover:bg-gold-500 transition-colors">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-gold-300 transition-colors drop-shadow-sm leading-none">
                  Borena
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gold-400 mt-1">
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
                      'px-3.5 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'text-gold-300 bg-white/10'
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
                className="p-2 text-ivory-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Plan Your Visit CTA */}
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-charcoal-900 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all"
              >
                Plan Your Visit
              </Link>

              {/* Settings Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className="p-2 text-ivory-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4" />
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
                className="p-2 text-ivory-200 hover:text-white"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gold-400" />
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 text-ivory-100 hover:text-white"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden border-t border-forest-800 bg-forest-950/98 backdrop-blur-lg px-4 py-6 shadow-2xl">
            <nav className="space-y-1.5">
              {NAV.map(item => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors',
                      isActive
                        ? 'text-gold-300 bg-white/10 shadow-inner'
                        : 'text-ivory-100 hover:text-white hover:bg-white/5'
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
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-wider bg-gold-600 text-charcoal-900 rounded-xl text-center shadow-md"
                >
                  Plan Your Visit
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}