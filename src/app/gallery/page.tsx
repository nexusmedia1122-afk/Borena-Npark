'use client'

import { useState, useEffect, useCallback } from 'react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Sparkles, Filter, Maximize2 } from 'lucide-react'
import { fetchAllGallery } from '@/lib/data-service'
import { GalleryMedia } from '@/data/park-data'

const CATEGORIES = ['All', 'Wildlife', 'Landscapes', 'Culture', 'Conservation']

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    async function load() {
      const data = await fetchAllGallery()
      setItems(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = useCallback(() => {
    setLightboxIndex(prev => (prev !== null ? (prev + 1) % filtered.length : null))
  }, [filtered.length])

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null))
  }, [filtered.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, nextImage, prevImage])

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85"
            alt="Gallery hero panorama"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            Official Photographic Archive
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            National Park Gallery
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            A curated visual collection documenting the wildlife sanctuaries, volcanic crater calderas, and living cultural heritage of Borana.
          </p>
        </div>
      </section>

      {/* Gallery Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-b border-sand-200 pb-5">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setLightboxIndex(null) }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-forest-900 text-ivory-50 shadow-sm'
                    : 'bg-white border border-sand-200 text-charcoal-700 hover:border-forest-700 hover:text-forest-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-charcoal-700 font-medium">
            Showing {filtered.length} media archive records
          </span>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-sand-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-sand-200 p-8">
            <Camera className="w-12 h-12 text-sand-300 mx-auto mb-3" />
            <p className="font-semibold text-charcoal-900">No media found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((item, index) => (
              <button
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-forest-950 border border-sand-200 text-left focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <OptimizedImage
                  src={item.thumbnailUrl || item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-300">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-display font-semibold text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-ivory-200/90 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gold-400" /> {item.location}
                  </p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Fullscreen Interactive Lightbox Modal */}
      {current && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in">
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-gold-400">
                {current.category} • Photo {lightboxIndex! + 1} of {filtered.length}
              </span>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-white">{current.title}</h3>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Image with Navigation Buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative max-h-[70vh] max-w-[90vw] aspect-[16/10] w-full flex items-center justify-center">
              <OptimizedImage
                src={current.imageUrl}
                alt={current.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Footer Captions & Metadata */}
          <div className="bg-forest-950/90 rounded-2xl border border-forest-800 p-4 max-w-4xl mx-auto w-full text-xs text-ivory-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">{current.caption}</p>
              <p className="text-ivory-200/80 mt-0.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400" /> {current.location}
              </p>
            </div>
            <div className="text-right sm:border-l sm:border-forest-800 sm:pl-4 whitespace-nowrap">
              <p className="text-gold-300 font-semibold">{current.photographer}</p>
              <p className="text-ivory-200/70">{current.date}</p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
