'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { Search, MapPin, Navigation, Maximize2, Minimize2, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ---------- Marker icon factory ----------
const CATEGORY_COLORS: Record<string, string> = {
  'all': '#2E5740',
  'entrance': '#B8912F',
  'visitor-center': '#2E5740',
  'trail': '#8A5A3B',
  'wildlife-viewing': '#6E4527',
  'campsite': '#45805D',
  'cultural-site': '#96741F',
  'emergency': '#C53030',
}

function createMarkerIcon(category: string, isActive: boolean) {
  const color = CATEGORY_COLORS[category] || '#2E5740'
  const size = isActive ? 36 : 28
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="${size}" height="${size}">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.3"/>
      </filter>
    </defs>
    <path d="M18 4C11.37 4 6 9.37 6 16c0 8.25 12 18 12 18s12-9.75 12-18c0-6.63-5.37-12-12-12z" fill="${color}" stroke="#fff" stroke-width="2" filter="url(#shadow)"/>
    <circle cx="18" cy="16" r="5" fill="#fff" opacity="0.9"/>
  </svg>`
  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

// ---------- Map event handlers ----------
function MapEvents({ onMapClick, onLocationSelect }: { onMapClick?: () => void; onLocationSelect?: (lat: number, lng: number) => void }) {
  useMapEvent('click', () => {
    onMapClick?.()
  })
  return null
}

function FitBounds({ locations }: { locations: { lat: number; lng: number }[] }) {
  const map = useMap()
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]))
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
    }
  }, [locations, map])
  return null
}

import { MapLocation } from '@/types/map'
import { MapPOI } from '@/data/park-data'

interface MapViewProps {
  pois?: (MapLocation | MapPOI)[]
  activeCategory?: string
  onMarkerClick?: (location: any) => void
  selectedLocation?: MapLocation | MapPOI | null
  searchQuery?: string
}

export default function MapView({ pois = [], activeCategory = 'all', onMarkerClick, selectedLocation, searchQuery = '' }: MapViewProps) {
  const [mapReady, setMapReady] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    let result = pois
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p => p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q))
    }
    return result
  }, [pois, activeCategory, searchQuery])

  const handleFullscreen = () => {
    if (!mapRef.current) return
    if (!document.fullscreenElement) {
      mapRef.current.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  if (mapError) {
    return (
      <div className="h-[600px] rounded-xl overflow-hidden shadow-lg border border-sand-200 bg-sand-100 flex items-center justify-center">
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-charcoal-700 mx-auto mb-3" />
          <p className="text-charcoal-700 font-medium">Unable to load map</p>
          <p className="text-sm text-charcoal-700/70 mt-1">Please check your connection and try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={mapRef} className={cn('relative rounded-xl overflow-hidden shadow-lg border border-sand-200 transition-all duration-300', isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[600px]')}>
      <MapContainer
        center={[5.5, 39.5]}
        zoom={10}
        scrollWheelZoom
        className="h-full w-full"
        style={{ background: '#E9DAB6' }}
        onReady={() => setMapReady(true)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds locations={filtered.map(p => ({ lat: p.latitude, lng: p.longitude }))} />

        {filtered.map(poi => (
          <Marker
            key={poi.id}
            position={[poi.latitude, poi.longitude]}
            icon={createMarkerIcon(poi.category, selectedLocation?.id === poi.id)}
            eventHandlers={{
              click: () => onMarkerClick?.(poi),
            }}
          >
            <Popup className="custom-popup" maxWidth={280}>
              <div className="p-1">
                {(poi.imageUrl || (poi as any).image_url) && (
                  <img src={poi.imageUrl || (poi as any).image_url} alt={poi.name} className="w-full h-32 object-cover rounded-md mb-2" />
                )}
                <p className="font-display font-semibold text-charcoal-900 text-sm">{poi.name}</p>
                {poi.description && <p className="text-xs text-charcoal-700 mt-1 line-clamp-2">{poi.description}</p>}
                <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-medium text-earth-700 bg-earth-100 px-2 py-0.5 rounded-full">
                  {poi.category.replace(/-/g, ' ')}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Controls overlay */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-2">
        <button
          onClick={handleFullscreen}
          className="p-2 bg-white rounded-lg shadow-md border border-sand-200 text-charcoal-700 hover:text-forest-700 transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {filtered.length === 0 && mapReady && (
        <div className="absolute inset-0 z-[400] flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center shadow-lg">
            <MapPin className="w-8 h-8 text-charcoal-700 mx-auto mb-2" />
            <p className="text-sm text-charcoal-700 font-medium">No locations match your filters</p>
          </div>
        </div>
      )}
    </div>
  )
}
