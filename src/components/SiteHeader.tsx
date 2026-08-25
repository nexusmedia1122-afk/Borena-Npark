'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, ChevronRight, MapPin, Compass, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import QuickSearchModal from '@/components/QuickSearchModal'
import { cn } from '@/lib/utils'

const PRIMARY_NAV = [
  { href: '/wildlife', label: 'Wildlife' },
  { href: '/conservation', label: 'Conservation' },
  { href: '/culture', label: 'Culture & Heritage' },
  { href: '/experiences', label: 'Safaris & Visit' },
  { href: '/stories', label: 'Field Stories' },
  { href: '/about', label: 'About' },
]

const SECONDARY_NAV = [
  { href: '/astronomy', label: 'Indigenous Astronomy' },
  { href: '/gallery', label: 'Photo Archive' },
  { href: '/map', label: 'Park GIS Map' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isHome = pathname === '/'
  const isSolid = scrolled || !isHome || mobileOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out',
          isSolid
            ? 'bg-forest-950/96 backdrop-blur-xl shadow-luxury border-b border-forest-850/80 py-0'
            : 'bg-gradient-to-b from-forest-950/85 via-forest-950/40 to-transparent py-1 border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Official Brand Identity */}
            <Link href="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="w-11 h-11 rounded-full bg-white p-0.5 flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform overflow-hidden border border-gold-400/60 shrink-0">
                <img
                  src="/logo.png"
                  alt="Official Insignia of Borana National Park"
                  className="w-full h-full object-contain transform scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                  Borena
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold text-gold-400 mt-1">
                  National Park · Ethiopia
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {PRIMARY_NAV.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-lg relative',
                      isActive
                        ? 'text-gold-300 font-bold bg-white/5'
                        : 'text-ivory-100 hover:text-gold-300 hover:bg-white/5'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gold-400 rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-lg text-ivory-200 hover:text-white hover:bg-white/10 transition-colors"
                title="Search wildlife, stories, and visitor guides (Ctrl+K)"
                aria-label="Search site content"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Primary Plan Your Visit CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider shadow-subtle hover:shadow transition-all duration-200"
              >
                <span>Plan Your Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu & Search Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-ivory-200 hover:text-white"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-ivory-100 hover:text-white focus:outline-none"
                aria-label="Toggle navigation drawer"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-forest-950/98 border-t border-forest-850 px-5 pt-4 pb-8 space-y-6 animate-fade-in shadow-2xl backdrop-blur-2xl max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gold-400/80 mb-2">
                Explore Park Pillars
              </p>
              {PRIMARY_NAV.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center justify-between py-3 text-sm font-semibold border-b border-forest-900',
                      isActive ? 'text-gold-300 font-bold' : 'text-ivory-100 hover:text-white'
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-forest-600" />
                  </Link>
                )
              })}
            </div>

            {/* Secondary Explorer Links */}
            <div className="space-y-1 pt-2">
              <p className="text-[10px] uppercase font-bold tracking-widest text-gold-400/80 mb-2">
                Specialized Explorers
              </p>
              {SECONDARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-2 text-xs text-ivory-200/80 hover:text-gold-300"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-forest-700" />
                </Link>
              ))}
            </div>

            {/* Mobile Emergency & Headquarters Info */}
            <div className="p-4 rounded-xl bg-forest-900/80 border border-forest-800 text-xs space-y-1.5 text-ivory-200/80">
              <p className="font-semibold text-gold-400">Headquarters Emergency Frequency:</p>
              <p>VHF Ch 14 / 154.600 MHz · Phone: +251 46 443 0122</p>
              <p className="text-[11px] text-ivory-300/60">Yabelo, Borena Zone, Oromia, Ethiopia</p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-gold-400 transition-all"
              >
                <span>Plan Your Safari / Permit Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}