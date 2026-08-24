'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/components'
import OptimizedImage from '@/components/OptimizedImage'
import {
  Search,
  MapPin,
  Navigation,
  Compass,
  Printer,
  Info,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Route,
  Mountain,
  Loader2,
  X,
} from 'lucide-react'
import { fetchAllMapPOIs } from '@/lib/data-service'
import { MapPOI } from '@/data/park-data'
import { cn } from '@/lib/utils'

// Dynamic import with SSR disabled for Leaflet map component
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-[620px] w-full bg-sand-100/80 rounded-2xl flex flex-col items-center justify-center gap-3 border border-sand-200">
      <Loader2 className="w-8 h-8 animate-spin text-forest-700" />
      <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
        Loading Topographic GIS Explorer...
      </p>
    </div>
  ),
})

const CATEGORIES = [
  { key: 'all', label: 'All Landmarks', icon: '🗺️' },
  { key: 'visitor-center', label: 'Park HQ & Centers', icon: '🏛️' },
  { key: 'entrance', label: 'Gates & Checkpoints', icon: '🚗' },
  { key: 'wildlife-viewing', label: 'Wildlife Viewpoints', icon: '🔭' },
  { key: 'cultural-site', label: 'Heritage & Salt Crater', icon: '⛰️' },
  { key: 'viewpoint', label: 'Scenic Lookout Peaks', icon: '🌄' },
  { key: 'campsite', label: 'Designated Campsites', icon: '⛺' },
  { key: 'emergency', label: 'Ranger & Emergency', icon: '🚨' },
]

export default function MapPage() {
  const [locations, setLocations] = useState<MapPOI[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<MapPOI | null>(null)
  const [copiedGps, setCopiedGps] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await fetchAllMapPOIs()
      setLocations(data)
      setLoading(false)
      // Default select the Park HQ
      if (data.length > 0) {
        setSelectedLocation(data[0])
      }
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let result = locations
    if (activeCategory !== 'all') {
      result = result.filter((l) => l.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [locations, activeCategory, searchQuery])

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        alert(
          `Your Current GPS Coordinates:\nLatitude: ${pos.coords.latitude.toFixed(4)}° N\nLongitude: ${pos.coords.longitude.toFixed(4)}° E`
        )
      },
      () =>
        alert('Unable to retrieve location. Please check browser GPS permissions.')
    )
  }, [])

  const handleCopyGps = useCallback((lat: number, lng: number) => {
    const text = `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`
    navigator.clipboard.writeText(text).then(() => {
      setCopiedGps(true)
      setTimeout(() => setCopiedGps(false), 2000)
    })
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Map Hero Header */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1920&q=85"
            alt="Topographic landscape of Borana"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Official Topographic & Landmark GIS
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Interactive Park Map
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            Explore verified GPS coordinates, volcanic crater rims, wildlife corridors, and designated ranger eco-campsites across Borana.
          </p>
        </div>
      </section>

      {/* Main Map Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-sand-200 p-5 shadow-card mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-700" />
              <input
                type="text"
                placeholder="Search landmarks (e.g. Yabelo HQ, El Sod Crater, Dida Hara, Singing Wells)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-16 py-2.5 rounded-xl border border-sand-200 bg-ivory-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 focus:bg-white text-charcoal-900 placeholder:text-charcoal-700 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal-600 hover:text-charcoal-900 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Utility Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLocate}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-900 text-xs font-semibold transition-colors"
                title="Detect your current GPS location"
              >
                <Navigation className="w-3.5 h-3.5 text-forest-700" />
                <span>My Location</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-900 text-xs font-semibold transition-colors"
                title="Print official map field sheet"
              >
                <Printer className="w-3.5 h-3.5 text-forest-700" />
                <span>Print Map</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-sand-100">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all',
                  activeCategory === cat.key
                    ? 'bg-forest-900 text-white shadow-sm ring-1 ring-gold-500/50'
                    : 'bg-sand-50 border border-sand-200 text-charcoal-700 hover:border-forest-700 hover:text-forest-900'
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Map & Landmark Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <MapView
              pois={filtered}
              activeCategory={activeCategory}
              onMarkerClick={(loc) => setSelectedLocation(loc)}
              selectedLocation={selectedLocation}
              searchQuery={searchQuery}
            />

            {/* Map Usage Hint */}
            <div className="flex items-center justify-between text-xs text-charcoal-600 px-2">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-forest-700" /> Click any marker or landmark card to view terrain specs.
              </span>
              <span>Showing {filtered.length} of {locations.length} landmarks</span>
            </div>
          </div>

          {/* Landmark Dossier Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {selectedLocation ? (
              <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-card animate-in">
                {/* Landmark Photo Frame */}
                <div className="relative aspect-[16/10] bg-forest-950">
                  {selectedLocation.imageUrl ? (
                    <OptimizedImage
                      src={selectedLocation.imageUrl}
                      alt={selectedLocation.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-forest-950 text-gold-400">
                      <MapPin className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-forest-950/90 text-gold-300 border border-gold-500/30 backdrop-blur-sm">
                    {selectedLocation.category.replace(/-/g, ' ')}
                  </span>
                </div>

                {/* Landmark Detail Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-charcoal-900 leading-tight">
                      {selectedLocation.name}
                    </h3>
                    <p className="text-sm text-charcoal-700 mt-2 leading-relaxed">
                      {selectedLocation.description}
                    </p>
                  </div>

                  {/* Elevation & Terrain Specs */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {selectedLocation.elevation && (
                      <div className="bg-sand-50 rounded-xl p-3 border border-sand-200">
                        <span className="text-[11px] font-semibold text-charcoal-600 flex items-center gap-1 mb-0.5">
                          <Mountain className="w-3.5 h-3.5 text-earth-700" /> Elevation
                        </span>
                        <p className="font-mono text-sm font-bold text-charcoal-900">
                          {selectedLocation.elevation}
                        </p>
                      </div>
                    )}
                    <div className="bg-sand-50 rounded-xl p-3 border border-sand-200">
                      <span className="text-[11px] font-semibold text-charcoal-600 flex items-center gap-1 mb-0.5">
                        <Route className="w-3.5 h-3.5 text-forest-700" /> Access Requirement
                      </span>
                      <p className="text-xs font-bold text-forest-900">
                        Ranger Scout Accompaniment
                      </p>
                    </div>
                  </div>

                  {/* Access & Logistics Tip */}
                  {selectedLocation.accessTip && (
                    <div className="bg-forest-50 border border-forest-100 rounded-xl p-3.5 text-xs text-forest-900 leading-relaxed">
                      <strong>Field Access Note:</strong> {selectedLocation.accessTip}
                    </div>
                  )}

                  {/* GPS Coordinates with One-Click Copy */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-50 border border-sand-200 text-xs">
                    <div>
                      <span className="text-[10px] text-charcoal-600 uppercase font-bold block">Verified Coordinates</span>
                      <span className="font-mono font-bold text-charcoal-900">
                        {selectedLocation.latitude.toFixed(4)}° N, {selectedLocation.longitude.toFixed(4)}° E
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyGps(selectedLocation.latitude, selectedLocation.longitude)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-sand-200 hover:border-forest-700 text-xs font-semibold text-charcoal-800 transition-colors shadow-sm"
                      title="Copy GPS coordinates to clipboard"
                    >
                      {copiedGps ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-forest-700" />
                          <span>Copy GPS</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Safari Booking CTA */}
                  <div className="pt-2">
                    <Link
                      href={`/contact?visitType=${encodeURIComponent(selectedLocation.name)}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all text-center"
                    >
                      <span>Plan Expedition to {selectedLocation.name}</span>
                      <ArrowRight className="w-4 h-4 text-gold-400" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Landmark Directory List */}
            <div className="bg-white rounded-2xl border border-sand-200 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-sand-200 pb-3 mb-4">
                <h3 className="font-display font-semibold text-charcoal-900 text-base">
                  Park Landmark Directory
                </h3>
                <span className="text-xs font-semibold text-forest-800 bg-forest-100 px-2.5 py-0.5 rounded-full">
                  {filtered.length} POIs
                </span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filtered.map((loc) => {
                  const isSelected = selectedLocation?.id === loc.id
                  return (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border transition-all',
                        isSelected
                          ? 'border-forest-700 bg-forest-50/70 shadow-sm ring-1 ring-forest-700'
                          : 'border-sand-200 hover:border-sand-300 hover:bg-sand-50'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn('font-semibold text-sm', isSelected ? 'text-forest-900' : 'text-charcoal-900')}>
                          {loc.name}
                        </p>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sand-100 text-charcoal-700 shrink-0">
                          {loc.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-600 mt-1 line-clamp-1">
                        {loc.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
