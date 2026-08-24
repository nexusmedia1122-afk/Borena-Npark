'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MapPin,
  Maximize2,
  Minimize2,
  Layers,
  Compass,
  Navigation,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MapPOI } from '@/data/park-data'
import { MapLocation } from '@/types/map'

// Category colors for custom SVG pins
const CATEGORY_COLORS: Record<string, { bg: string; border: string }> = {
  'all': { bg: '#2E5740', border: '#D8AF3B' },
  'visitor-center': { bg: '#142C1D', border: '#D8AF3B' },
  'entrance': { bg: '#C59B27', border: '#FFFFFF' },
  'wildlife-viewing': { bg: '#73351C', border: '#EFD58D' },
  'cultural-site': { bg: '#8C4326', border: '#EFD58D' },
  'viewpoint': { bg: '#386D4E', border: '#FFFFFF' },
  'campsite': { bg: '#2A543B', border: '#94C3A9' },
  'emergency': { bg: '#A82828', border: '#FFFFFF' },
  'trail': { bg: '#AA5836', border: '#FFFFFF' },
}

function createMarkerIcon(category: string, isSelected: boolean) {
  const scheme = CATEGORY_COLORS[category] || { bg: '#1E3F2B', border: '#D8AF3B' }
  const size = isSelected ? 42 : 32

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 42" width="${size}" height="${size * 1.15}" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.45));">
      <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 24 18 24s18-10.5 18-24c0-9.94-8.06-18-18-18z" fill="${scheme.bg}" stroke="${isSelected ? '#D8AF3B' : scheme.border}" stroke-width="${isSelected ? '3' : '2'}"/>
      <circle cx="18" cy="18" r="${isSelected ? '7' : '6'}" fill="#FFFFFF" opacity="0.95"/>
      <circle cx="18" cy="18" r="3" fill="${scheme.bg}"/>
    </svg>
  `

  return L.divIcon({
    html: svg,
    className: 'custom-leaflet-marker',
    iconSize: [size, size * 1.15],
    iconAnchor: [size / 2, size * 1.15],
    popupAnchor: [0, -size * 1.05],
  })
}

// Tile Layer Configurations
const TILE_LAYERS = {
  topo: {
    name: 'Topographic',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap contributors',
    maxZoom: 17,
  },
  osm: {
    name: 'Standard Terrain',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  },
}

interface MapViewProps {
  pois?: (MapPOI | MapLocation)[]
  activeCategory?: string
  onMarkerClick?: (location: any) => void
  selectedLocation?: MapPOI | MapLocation | null
  searchQuery?: string
}

export default function MapView({
  pois = [],
  activeCategory = 'all',
  onMarkerClick,
  selectedLocation,
  searchQuery = '',
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)

  const [activeTileKey, setActiveTileKey] = useState<keyof typeof TILE_LAYERS>('osm')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Filter POIs based on search and category
  const filtered = useMemo(() => {
    let result = pois
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q)
      )
    }
    return result
  }, [pois, activeCategory, searchQuery])

  // 1. Initialize Map Instance
  useEffect(() => {
    if (!containerRef.current || mapInstanceRef.current) return

    // Center of Borana National Park (~4.8° N, 38.3° E)
    const initialCenter: [number, number] = [4.82, 38.28]
    const map = L.map(containerRef.current, {
      center: initialCenter,
      zoom: 9,
      zoomControl: false,
      scrollWheelZoom: true,
    })

    // Custom top-left zoom control
    L.control.zoom({ position: 'topleft' }).addTo(map)

    // Base Tile Layer
    const layerCfg = TILE_LAYERS[activeTileKey]
    const tileLayer = L.tileLayer(layerCfg.url, {
      attribution: layerCfg.attribution,
      maxZoom: layerCfg.maxZoom,
    }).addTo(map)
    tileLayerRef.current = tileLayer

    // Markers layer group
    const markersLayer = L.layerGroup().addTo(map)
    markersLayerRef.current = markersLayer

    mapInstanceRef.current = map
    setMapLoaded(true)

    // Force map resize calculation
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 150)

    return () => {
      clearTimeout(timer)
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // 2. Handle Tile Layer Switch
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current)
    }

    const cfg = TILE_LAYERS[activeTileKey]
    const newLayer = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
    }).addTo(map)

    tileLayerRef.current = newLayer
  }, [activeTileKey])

  // 3. Render Markers & Fit Bounds
  useEffect(() => {
    const map = mapInstanceRef.current
    const layer = markersLayerRef.current
    if (!map || !layer) return

    layer.clearLayers()

    if (filtered.length === 0) return

    const latLngs: L.LatLngTuple[] = []

    filtered.forEach((poi) => {
      const isSelected = selectedLocation?.id === poi.id
      const pos: L.LatLngTuple = [poi.latitude, poi.longitude]
      latLngs.push(pos)

      const icon = createMarkerIcon(poi.category, isSelected)
      const marker = L.marker(pos, { icon })

      // Custom HTML Popup
      const popupContent = document.createElement('div')
      popupContent.className = 'p-1 font-sans text-xs space-y-2'
      popupContent.innerHTML = `
        ${
          poi.imageUrl || (poi as any).image_url
            ? `<div class="aspect-video w-full overflow-hidden rounded-lg mb-1.5 bg-neutral-900">
                 <img src="${poi.imageUrl || (poi as any).image_url}" alt="${poi.name}" class="h-full w-full object-cover" />
               </div>`
            : ''
        }
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-900">
            ${poi.category.replace(/-/g, ' ')}
          </span>
          ${
            poi.elevation
              ? `<span class="text-[10px] font-medium text-neutral-500 font-mono">${poi.elevation}</span>`
              : ''
          }
        </div>
        <h4 class="font-display font-bold text-sm text-neutral-900 leading-snug">${poi.name}</h4>
        ${
          poi.description
            ? `<p class="text-neutral-600 text-[11px] leading-relaxed line-clamp-2">${poi.description}</p>`
            : ''
        }
        <div class="pt-1 text-[10px] font-mono text-neutral-500 border-t border-neutral-100">
          GPS: ${poi.latitude.toFixed(4)}°N, ${poi.longitude.toFixed(4)}°E
        </div>
      `

      marker.bindPopup(popupContent, { maxWidth: 280 })

      marker.on('click', () => {
        onMarkerClick?.(poi)
      })

      marker.addTo(layer)

      // If this POI is selected, open popup
      if (isSelected) {
        marker.openPopup()
      }
    })

    // Fit bounds if no specific selected location
    if (!selectedLocation && latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs)
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 })
      }
    }
  }, [filtered, selectedLocation, onMarkerClick])

  // 4. Fly to Selected Location
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !selectedLocation) return

    map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 14, {
      duration: 1.2,
      easeLinearity: 0.25,
    })
  }, [selectedLocation])

  // 5. Handle Fullscreen
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return
    setIsFullscreen((prev) => !prev)

    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize()
    }, 200)
  }

  // 6. Recenter Park
  const handleRecenterPark = () => {
    if (!mapInstanceRef.current) return
    mapInstanceRef.current.flyTo([4.82, 38.28], 9, { duration: 1 })
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-sand-200 shadow-card bg-sand-100 transition-all duration-300',
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'h-[620px]'
      )}
    >
      {/* Leaflet Map Root */}
      <div ref={containerRef} className="h-full w-full z-0" />

      {/* Map Header Floating Overlay */}
      <div className="absolute top-4 right-4 z-[400] flex items-center gap-2">
        {/* Layer Switcher */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-md border border-sand-200 flex items-center gap-1 text-xs">
          {(Object.keys(TILE_LAYERS) as Array<keyof typeof TILE_LAYERS>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTileKey(key)}
              className={cn(
                'px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all',
                activeTileKey === key
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-sand-100'
              )}
            >
              {TILE_LAYERS[key].name}
            </button>
          ))}
        </div>

        {/* Recenter Button */}
        <button
          onClick={handleRecenterPark}
          className="p-2 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-sand-200 text-charcoal-700 hover:text-forest-800 transition-colors"
          title="Recenter whole park"
          aria-label="Recenter park"
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={handleToggleFullscreen}
          className="p-2 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-sand-200 text-charcoal-700 hover:text-forest-800 transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          aria-label="Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Legend Badge */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-sand-200 text-[11px] space-y-1.5 hidden sm:block">
        <p className="font-bold text-charcoal-900 uppercase tracking-wider text-[10px]">
          Borena National Park GIS
        </p>
        <div className="flex items-center gap-3 text-charcoal-700">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-forest-900 inline-block" /> HQ & Gates
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-earth-700 inline-block" /> Calderas & Culture
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-600 inline-block" /> Wildlife Points
          </span>
        </div>
      </div>

      {/* Empty Search Overlay */}
      {filtered.length === 0 && mapLoaded && (
        <div className="absolute inset-0 z-[400] flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 text-center shadow-luxury border border-sand-200 max-w-sm mx-4 pointer-events-auto">
            <MapPin className="w-8 h-8 text-gold-600 mx-auto mb-2" />
            <p className="font-display font-bold text-charcoal-900 text-base">No Landmarks Found</p>
            <p className="text-xs text-charcoal-600 mt-1">
              Try adjusting your search query or choosing a different category filter.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
