'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  Search,
  ChevronRight,
  ArrowRight,
  Compass,
  Leaf,
  Users,
  Moon,
  Shield,
  Camera,
  BookOpen,
  MapPin,
  Phone,
  Radio,
  FileText,
  ExternalLink,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import QuickSearchModal from '@/components/QuickSearchModal'
import { cn } from '@/lib/utils'

interface NavPillar {
  href: string
  label: string
  subtitle: string
  icon: any
  badge?: string
}

const PRIMARY_NAV = [
  { href: '/wildlife', label: 'Wildlife' },
  { href: '/culture', label: 'Culture' },
  { href: '/astronomy', label: 'Astronomy' },
  { href: '/conservation', label: 'Conservation' },
  { href: '/experiences', label: 'Safaris' },
  { href: '/map', label: 'Map' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/stories', label: 'Stories' },
  { href: '/about', label: 'About' },
]

const SIDEBAR_PILLARS: NavPillar[] = [
  {
    href: '/wildlife',
    label: 'Wildlife Sanctuary',
    subtitle: 'Endangered Grevy’s zebra, Beisa oryx & 280+ bird species',
    icon: Leaf,
    badge: 'Biodiversity',
  },
  {
    href: '/culture',
    label: 'Culture & Gadaa Heritage',
    subtitle: 'UNESCO-inscribed democracy & ancient Tula singing wells',
    icon: Users,
    badge: 'UNESCO',
  },
  {
    href: '/astronomy',
    label: 'Indigenous Astronomy',
    subtitle: 'Dhaha Boranaa lunar-stellar calendar & Urji Daha stars',
    icon: Moon,
    badge: 'Observatory',
  },
  {
    href: '/conservation',
    label: 'Community Conservation',
    subtitle: 'SMART ranger patrols & habitat corridor protection',
    icon: Shield,
    badge: 'Protected',
  },
  {
    href: '/experiences',
    label: 'Guided Safaris',
    subtitle: '4WD wildlife loops, caldera treks & wilderness camping',
    icon: Compass,
    badge: 'Expeditions',
  },
]

const SIDEBAR_EXPLORERS = [
  { href: '/map', label: 'Interactive Topographic GIS Map', icon: MapPin },
  { href: '/gallery', label: 'Curated Photographic Gallery', icon: Camera },
  { href: '/stories', label: 'Ranger Field Reports & Stories', icon: BookOpen },
  { href: '/about', label: 'About the Sanctuary & Authority', icon: FileText },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Lock body scroll and handle Escape key when sidebar is open
  useEffect(() => {
    if (!sidebarOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sidebarOpen])

  const isHome = pathname === '/'
  const isSolid = scrolled || !isHome || sidebarOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300 ease-out',
          isSolid
            ? 'bg-forest-950/96 backdrop-blur-xl shadow-luxury border-b border-forest-850/80 py-0'
            : 'bg-gradient-to-b from-forest-950/85 via-forest-950/40 to-transparent py-1 border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Official Brand Identity */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              title="Borena National Park Official Site"
            >
              <div className="w-11 h-11 rounded-full bg-white/95 p-1 border-2 border-gold-400/80 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Borana National Park Official Seal"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base sm:text-lg text-white leading-tight tracking-tight group-hover:text-gold-300 transition-colors">
                  BORENA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest-luxury text-gold-400/90 leading-none">
                  National Park
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {PRIMARY_NAV.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-2.5 py-1.5 xl:px-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-lg relative',
                      isActive
                        ? 'text-gold-300 font-bold bg-white/5'
                        : 'text-ivory-100 hover:text-gold-300 hover:bg-white/5'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-gold-400 rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Header Right Actions & Sidebar Drawer Trigger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-lg text-ivory-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                title="Search wildlife, stories, and visitor guides (Ctrl+K)"
                aria-label="Search site content"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Primary Plan Your Visit CTA (hidden on tiny screens) */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider shadow-subtle hover:shadow transition-all duration-200"
              >
                <span>Plan Visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Top Right Corner Sidebar / Menu Trigger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/10 hover:bg-white/15 text-ivory-100 hover:text-white border border-forest-700/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                aria-label="Open park directory sidebar"
                title="Open park directory and menu"
              >
                <Menu className="w-5 h-5 text-gold-400" />
                <span className="text-xs font-semibold uppercase tracking-wider hidden md:inline">
                  Menu
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Right Slide-over Sidebar Drawer & Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Right Panel */}
          <aside
            className="relative w-full max-w-md bg-forest-950 border-l border-forest-850 text-ivory-100 shadow-2xl flex flex-col justify-between h-full z-10 animate-in slide-in-from-right duration-300 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Borena National Park Directory"
          >
            {/* Top Branding & Close Header */}
            <div>
              <div className="p-5 sm:p-6 border-b border-forest-850/80 flex items-center justify-between bg-forest-900/60">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white p-1 border border-gold-400/80 flex items-center justify-center shrink-0">
                    <img
                      src="/logo.png"
                      alt="Borana National Park Official Seal"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base text-white leading-none">
                      BORENA
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gold-400 mt-1">
                      National Park Directory
                    </span>
                  </div>
                </Link>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-ivory-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Search Shortcut Bar */}
              <div className="p-4 sm:p-5 border-b border-forest-850/60 bg-forest-900/30">
                <button
                  onClick={() => {
                    setSidebarOpen(false)
                    setSearchOpen(true)
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-forest-900/80 hover:bg-forest-850 border border-forest-800 text-xs text-ivory-300 transition-colors group"
                >
                  <span className="flex items-center gap-2.5">
                    <Search className="w-4 h-4 text-gold-400 group-hover:text-gold-300" />
                    <span>Search wildlife, calderas, trails...</span>
                  </span>
                  <kbd className="hidden sm:inline-block px-2 py-0.5 rounded bg-forest-950 text-[10px] font-mono text-gold-400 border border-forest-800">
                    Ctrl+K
                  </kbd>
                </button>
              </div>

              {/* Navigation Directory Sections */}
              <div className="p-5 sm:p-6 space-y-6">
                {/* 1. Core Sanctuary Pillars */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gold-400/90 mb-3 flex items-center justify-between">
                    <span>Conservation & Heritage Pillars</span>
                    <span className="text-forest-400 text-[9px] font-normal">5 Sectors</span>
                  </p>
                  <nav className="space-y-1.5">
                    {SIDEBAR_PILLARS.map((pillar) => {
                      const Icon = pillar.icon
                      const isActive = pathname === pillar.href
                      return (
                        <Link
                          key={pillar.href}
                          href={pillar.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            'flex items-start gap-3.5 p-3 rounded-xl transition-all group',
                            isActive
                              ? 'bg-forest-900 text-gold-300 border border-gold-500/30'
                              : 'hover:bg-forest-900/70 text-ivory-100 hover:text-white border border-transparent'
                          )}
                        >
                          <div
                            className={cn(
                              'p-2 rounded-lg shrink-0 mt-0.5 transition-colors',
                              isActive
                                ? 'bg-gold-500/20 text-gold-400'
                                : 'bg-forest-900 text-ivory-300 group-hover:text-gold-400'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-sm leading-tight text-white group-hover:text-gold-300">
                                {pillar.label}
                              </p>
                              {pillar.badge && (
                                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-forest-800 text-gold-400 shrink-0">
                                  {pillar.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-ivory-300/80 line-clamp-1 mt-1 font-light">
                              {pillar.subtitle}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                {/* 2. Interactive Explorers & Media */}
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gold-400/90 mb-3">
                    Field Tools & Media
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {SIDEBAR_EXPLORERS.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            'flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors',
                            isActive
                              ? 'bg-forest-900 text-gold-300 font-bold'
                              : 'text-ivory-200 hover:bg-forest-900/60 hover:text-white'
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-gold-400" />
                            <span>{item.label}</span>
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-forest-500" />
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* 3. Emergency & Official Frequency Notice */}
                <div className="p-4 rounded-xl bg-forest-900/70 border border-forest-800 space-y-2 text-xs text-ivory-200/90">
                  <div className="flex items-center gap-2 text-gold-400 font-semibold">
                    <Radio className="w-3.5 h-3.5" />
                    <span>24/7 Ranger Headquarters Dispatch</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-ivory-300/80">
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-gold-400" />
                      <a href="tel:+251464440210" className="hover:text-gold-300 underline underline-offset-2">
                        +251 (0) 46 444 0210
                      </a>
                    </p>
                    <p className="text-ivory-400">VHF Channel 14 / 154.600 MHz (Yabelo Main Station)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions: Plan Visit & Staff CMS */}
            <div className="p-5 sm:p-6 border-t border-forest-850/80 space-y-3 bg-forest-900/50">
              <Link
                href="/contact"
                onClick={() => setSidebarOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-md hover:bg-gold-400 transition-all"
              >
                <span>Plan Your Safari / Permit Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between text-[11px] text-ivory-300/70 pt-1">
                <Link
                  href="/admin/login"
                  onClick={() => setSidebarOpen(false)}
                  className="hover:text-gold-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Staff CMS Login</span>
                  <ExternalLink className="w-3 h-3 text-gold-400" />
                </Link>
                <span>EWCA & Oromia State</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Global Quick Search Modal */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}