'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  MapPin,
  Compass,
  ArrowRight,
  Maximize2,
  Navigation,
  Loader2,
  Mountain,
} from 'lucide-react'
import { OFFICIAL_MAP_POIS, MapPOI } from '@/data/park-data'
import { cn } from '@/lib/utils'

// Dynamic import with SSR disabled for Leaflet map component
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] w-full bg-sand-100/80 rounded-2xl flex flex-col items-center justify-center gap-3 border border-sand-200">
      <Loader2 className="w-8 h-8 animate-spin text-forest-700" />
      <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
        Loading Topographic GIS Explorer...
      </p>
    </div>
  ),
})

const CATEGORIES = [
  { key: 'all', label: 'All Landmarks' },
  { key: 'visitor-center', label: 'Park HQ' },
  { key: 'wildlife-viewing', label: 'Wildlife Plains' },
  { key: 'cultural-site', label: 'Salt Crater & Wells' },
  { key: 'viewpoint', label: 'Scenic Peaks' },
  { key: 'campsite', label: 'Eco-Campsites' },
]

export default function HomeMapSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedPoi, setSelectedPoi] = useState<MapPOI>(OFFICIAL_MAP_POIS[0])

  const filteredPois =
    activeCategory === 'all'
      ? OFFICIAL_MAP_POIS
      : OFFICIAL_MAP_POIS.filter((p) => p.category === activeCategory)

  return (
    <section id="park-map-section" className="py-24 bg-ivory-50 border-b border-sand-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <Compass className="w-3.5 h-3.5 text-gold-600" />
              <span>Interactive Topographic GIS</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-950 tracking-tight">
              Explore the Living Sanctuary on Map
            </h2>
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
              Navigate official GPS-calibrated ranger outposts, wildlife watering corridors, ancient volcanic calderas, and sacred singing wells across 1.2 million protected hectares.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-900 transition-all shadow-subtle"
            >
              <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
              <span>Full Screen GIS Explorer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all',
                activeCategory === cat.key
                  ? 'bg-forest-950 text-white shadow-subtle'
                  : 'bg-white border border-sand-200 text-charcoal-700 hover:border-forest-700 hover:text-forest-900'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Map & Selected POI Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Leaflet Map Viewer Container (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-sand-200/80 p-2 shadow-subtle overflow-hidden relative">
            <div className="h-[480px] w-full rounded-xl overflow-hidden">
              <MapView
                pois={filteredPois}
                activeCategory={activeCategory}
                selectedLocation={selectedPoi}
                onMarkerClick={(loc) => setSelectedPoi(loc)}
              />
            </div>

            {/* Coordinates Badge */}
            <div className="absolute top-5 left-5 z-[400] bg-forest-950/90 text-gold-300 text-[11px] font-mono px-3 py-1 rounded-md backdrop-blur-sm border border-forest-800 pointer-events-none hidden sm:block">
              GIS Extent: 4°15′N – 5°05′N · 38°03′E – 38°45′E
            </div>
          </div>

          {/* POI Information & Quick Details Card (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-sand-200/80 p-6 shadow-subtle space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-800 border border-forest-200 inline-block">
                  {selectedPoi.category.replace('-', ' ').toUpperCase()}
                </span>
                <h3 className="font-display font-bold text-xl text-charcoal-950">
                  {selectedPoi.name}
                </h3>
                <p className="text-xs font-mono text-charcoal-500">
                  {selectedPoi.latitude.toFixed(4)}° N, {selectedPoi.longitude.toFixed(4)}° E
                </p>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
                {selectedPoi.description}
              </p>

              <div className="pt-2 border-t border-sand-100 space-y-2 text-xs text-charcoal-600">
                {selectedPoi.elevation && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mountain className="w-3.5 h-3.5 text-forest-700" />
                      Elevation
                    </span>
                    <strong className="text-charcoal-950">{selectedPoi.elevation}</strong>
                  </div>
                )}
                {selectedPoi.accessTip && (
                  <div className="p-3 rounded-lg bg-sand-50/80 border border-sand-200/80 space-y-1">
                    <span className="font-bold text-charcoal-950 text-[11px] block">Ranger Access Advice:</span>
                    <p className="text-[11px] leading-relaxed font-light">{selectedPoi.accessTip}</p>
                  </div>
                )}
              </div>

              <Link
                href={`/map?lat=${selectedPoi.latitude}&lng=${selectedPoi.longitude}&zoom=14`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-forest-900 hover:bg-forest-850 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-subtle"
              >
                <span>Navigate on GIS Map</span>
                <Navigation className="w-3.5 h-3.5 text-gold-400" />
              </Link>
            </div>

            {/* Quick Landmark Picker List */}
            <div className="bg-white rounded-2xl border border-sand-200/80 p-4 shadow-subtle space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-600 px-1">
                Major Landmark Coordinates:
              </p>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {OFFICIAL_MAP_POIS.map((poi) => (
                  <button
                    key={poi.id}
                    onClick={() => setSelectedPoi(poi)}
                    className={cn(
                      'w-full text-left p-2.5 rounded-lg transition-all text-xs flex items-center justify-between',
                      selectedPoi.id === poi.id
                        ? 'bg-forest-950 text-white font-medium'
                        : 'hover:bg-sand-50 text-charcoal-800'
                    )}
                  >
                    <span className="truncate pr-2">{poi.name}</span>
                    <MapPin className={cn('w-3.5 h-3.5 shrink-0', selectedPoi.id === poi.id ? 'text-gold-400' : 'text-sand-400')} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
