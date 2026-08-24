'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/components'
import OptimizedImage from '@/components/OptimizedImage'
import { Search, MapPin, Navigation, Maximize2, X, Loader2, Compass, Printer, Info, CheckCircle2 } from 'lucide-react'
import { fetchAllMapPOIs } from '@/lib/data-service'
import { MapPOI } from '@/data/park-data'
import { cn } from '@/lib/utils'

const LeafletMap = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-sand-100 rounded-2xl flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-forest-700" />
      <p className="text-xs font-semibold text-charcoal-700">Loading Topographic GIS Map...</p>
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

  useEffect(() => {
    async function load() {
      const data = await fetchAllMapPOIs()
      setLocations(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    let result = locations
    if (activeCategory !== 'all') {
      result = result.filter(l => l.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(l => l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q))
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
        alert(`Your current GPS coordinates: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`)
      },
      () => alert('Unable to retrieve your location. Ensure GPS location permissions are granted.')
    )
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Map Hero Header */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-35">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1920&q=85"
            alt="Topographic landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Official Topographic & Landmark GIS
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Interactive Park Map
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            Navigate key park landmarks, headquarters, volcanic craters, wildlife observation zones, and designated eco-campsites across the Borana reserve.
          </p>
        </div>
      </section>

      {/* Main Map Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl border border-sand-200 p-5 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-700" />
              <input
                type="text"
                placeholder="Search map landmarks (e.g. Headquarters, El Sod Crater, Dida Hara)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-200 bg-ivory-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 focus:bg-white text-charcoal-900 placeholder:text-charcoal-700 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-700 hover:text-charcoal-900 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLocate}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-900 text-xs font-semibold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-forest-700" /> My GPS Location
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-900 text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-forest-700" /> Print Map
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-sand-100">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all',
                  activeCategory === cat.key
                    ? 'bg-forest-900 text-ivory-50 shadow-sm'
                    : 'bg-sand-50 border border-sand-200 text-charcoal-700 hover:border-forest-700 hover:text-forest-900'
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Map & Landmark Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Map View (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-sand-200 p-2 shadow-sm overflow-hidden min-h-[580px]">
            <LeafletMap
              pois={filtered}
              activeCategory={activeCategory}
              onMarkerClick={setSelectedLocation}
              selectedLocation={selectedLocation}
              searchQuery={searchQuery}
            />
          </div>

          {/* Sidebar Landmark Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {selectedLocation ? (
              <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-card animate-in">
                <div className="relative aspect-video bg-forest-950">
                  {selectedLocation.imageUrl ? (
                    <OptimizedImage
                      src={selectedLocation.imageUrl}
                      alt={selectedLocation.name}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-gold-400" />
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white backdrop-blur-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800">
                    {selectedLocation.category.replace(/-/g, ' ')}
                  </span>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 mt-2">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 mt-2 leading-relaxed">
                    {selectedLocation.description}
                  </p>

                  {selectedLocation.elevation && (
                    <p className="text-xs text-charcoal-700 mt-3 font-medium">
                      <strong>Elevation:</strong> {selectedLocation.elevation}
                    </p>
                  )}

                  {selectedLocation.accessTip && (
                    <p className="text-xs text-forest-800 bg-forest-50 p-2.5 rounded-lg mt-3">
                      <strong>Access Tip:</strong> {selectedLocation.accessTip}
                    </p>
                  )}

                  <div className="mt-5 pt-4 border-t border-sand-200 text-xs text-charcoal-700 flex justify-between items-center">
                    <span className="font-mono text-[11px]">
                      GPS: {selectedLocation.latitude.toFixed(4)}° N, {selectedLocation.longitude.toFixed(4)}° E
                    </span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-sand-200 p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-sand-200 pb-3 mb-4">
                  <h3 className="font-display font-semibold text-charcoal-900 text-base">Key Landmarks</h3>
                  <span className="text-xs font-semibold text-forest-800 bg-forest-100 px-2 py-0.5 rounded-full">
                    {filtered.length} points
                  </span>
                </div>
                <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                  {filtered.map(loc => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className="w-full text-left p-3.5 rounded-xl border border-sand-200 hover:border-forest-700 hover:bg-forest-50/60 transition-all group"
                    >
                      <p className="font-semibold text-sm text-charcoal-900 group-hover:text-forest-900">
                        {loc.name}
                      </p>
                      <p className="text-xs text-charcoal-700 mt-1 line-clamp-1">{loc.description}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-charcoal-700">
                        <span className="capitalize">{loc.category.replace(/-/g, ' ')}</span>
                        <span className="text-forest-800 font-medium group-hover:underline">View on Map →</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
