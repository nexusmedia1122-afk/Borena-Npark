'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import { cldImage } from '@/lib/cloudinary'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Sparkles,
  Filter,
  Maximize2,
  Calendar,
  User,
  SlidersHorizontal,
  LayoutGrid,
  Columns,
  Share2,
  Download,
  Info,
  ArrowRight,
  Check,
} from 'lucide-react'
import { fetchAllGallery } from '@/lib/data-service'
import { GalleryMedia } from '@/data/park-data'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'All',
  'Wildlife',
  'Landscapes',
  'Culture',
  'Conservation',
]

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('grid')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showInfo, setShowInfo] = useState(true)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await fetchAllGallery()
      setItems(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.category === activeCategory)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setShowInfo(true)
  }

  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    )
  }, [filtered.length])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    )
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

  const getMediaSrc = (item: GalleryMedia, highRes = false) => {
    if (item.cldId) {
      return highRes
        ? cldImage(item.cldId, 'w_1920,c_limit,q_auto')
        : cldImage(item.cldId, 'w_800,c_fill,q_auto')
    }
    return item.imageUrl
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
      })
    }
  }

  const featured = items[0]

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src={
              featured?.cldId
                ? cldImage(featured.cldId, 'w_1920,c_limit')
                : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85'
            }
            alt="Gallery hero panorama"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            Curated Visual Archive
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Through the Lens of Borana
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            High-resolution field documentation capturing southern Ethiopia’s rarest wildlife, ancient volcanic salt calderas, and living cultural heritage.
          </p>
        </div>
      </section>

      {/* Main Gallery Workspace */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* Featured Photo of the Month */}
        {featured && (
          <div className="relative overflow-hidden rounded-3xl bg-forest-950 border border-sand-200 shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] bg-forest-900 overflow-hidden group cursor-pointer" onClick={() => openLightbox(0)}>
                <OptimizedImage
                  src={getMediaSrc(featured, true)}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    Click to Open in Fullscreen
                  </span>
                  <span className="font-mono text-[11px] text-gold-300">{featured.cameraSpecs}</span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 space-y-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest-luxury text-gold-400">
                  Featured Archive Photograph
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                  {featured.title}
                </h2>
                <p className="text-sm text-ivory-200/90 leading-relaxed">
                  {featured.caption}
                </p>

                <div className="pt-2 border-t border-forest-800/80 space-y-2 text-xs text-ivory-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>{featured.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                    <span>Photographed by {featured.photographer}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openLightbox(0)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold-600 hover:bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
                  >
                    <span>View High-Res Lightbox</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls & Layout Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 pb-5">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setLightboxIndex(null)
                }}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all',
                  activeCategory === cat
                    ? 'bg-forest-900 text-white shadow-sm ring-1 ring-gold-500/40'
                    : 'bg-white border border-sand-200 text-charcoal-700 hover:border-forest-700 hover:text-forest-900'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right: Layout Switcher & Item Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-charcoal-600 font-medium hidden sm:inline">
              Showing {filtered.length} curated images
            </span>

            <div className="bg-white border border-sand-200 rounded-xl p-1 flex items-center gap-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  viewMode === 'grid'
                    ? 'bg-forest-900 text-white'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                )}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={cn(
                  'p-1.5 rounded-lg transition-colors',
                  viewMode === 'masonry'
                    ? 'bg-forest-900 text-white'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                )}
                title="Masonry Editorial View"
                aria-label="Masonry Editorial View"
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Image Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-sand-100 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-sand-200 p-8 shadow-sm">
            <Camera className="w-12 h-12 text-sand-300 mx-auto mb-3" />
            <p className="font-semibold text-charcoal-900">
              No media found in this category.
            </p>
          </div>
        ) : (
          <div
            className={cn(
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
            )}
          >
            {filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-forest-950 border border-sand-200/80 shadow-sm hover:shadow-luxury transition-all duration-300 break-inside-avoid"
              >
                <div
                  className={cn(
                    'relative overflow-hidden',
                    item.aspect === 'portrait'
                      ? 'aspect-[3/4]'
                      : item.aspect === 'square'
                      ? 'aspect-square'
                      : 'aspect-[4/3]'
                  )}
                >
                  <OptimizedImage
                    src={getMediaSrc(item)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white" />

                  {/* Top Category Badge */}
                  <span className="absolute top-3.5 left-3.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-950/80 text-gold-300 border border-gold-500/30 backdrop-blur-sm">
                    {item.category}
                  </span>

                  {/* Fullscreen Expand Icon */}
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-charcoal-950/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                  </div>

                  {/* Bottom Info on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-1">
                    <h3 className="font-display font-bold text-sm sm:text-base leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-ivory-200/90 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Media Licensing & Filming Permits Callout */}
        <section className="rounded-3xl bg-forest-950 text-white p-8 sm:p-12 border border-forest-800 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-400">
                Media & Commercial Filming
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                Documentary Filming & Research Media Permits
              </h3>
              <p className="text-sm text-ivory-200/80 leading-relaxed max-w-2xl">
                Commercial cinematography, aerial drone operation, and academic photography within Borana National Park require official EWCA accreditation. Submit your media brief to obtain scout clearances.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/contact?inquiryType=Media%20%26%20Filming%20Accreditation"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold-600 hover:bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-glow-gold transition-all text-center"
              >
                <span>Request Media Permit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ===== ADVANCED FULLSCREEN CINEMATIC LIGHTBOX ===== */}
      {lightboxIndex !== null && current && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between animate-fade-in text-white select-none">
          {/* Top Lightbox Header */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 z-20">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-forest-900 text-gold-300 border border-gold-500/30">
                {current.category}
              </span>
              <span className="text-xs text-neutral-400 hidden sm:inline">
                {lightboxIndex + 1} of {filtered.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-200 transition-colors"
                title="Copy link to clipboard"
                aria-label="Share"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  showInfo ? 'bg-gold-500 text-charcoal-950' : 'bg-white/10 hover:bg-white/20 text-neutral-200'
                )}
                title="Toggle Photo Details"
                aria-label="Toggle Info"
              >
                <Info className="w-4 h-4" />
              </button>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Stage View */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden p-4 sm:p-8">
            {/* Previous Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all hover:scale-110 border border-white/10 backdrop-blur-md"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all hover:scale-110 border border-white/10 backdrop-blur-md"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* High-Res Image Display */}
            <div className="relative max-h-[78vh] max-w-[85vw] flex items-center justify-center">
              <img
                src={getMediaSrc(current, true)}
                alt={current.title}
                className="max-h-[78vh] max-w-[85vw] object-contain rounded-2xl shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Floating Collapsible Info Panel */}
            {showInfo && (
              <div className="absolute bottom-6 right-6 z-20 max-w-sm w-full bg-forest-950/90 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl text-xs space-y-2.5 hidden md:block">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="font-display font-bold text-sm text-white">
                    {current.title}
                  </h4>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  {current.caption}
                </p>
                <div className="space-y-1 pt-1 text-[11px] text-neutral-400 font-mono">
                  <div className="flex items-center gap-1.5 text-ivory-200">
                    <MapPin className="w-3 h-3 text-gold-400 shrink-0" />
                    <span>{current.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-ivory-200">
                    <User className="w-3 h-3 text-gold-400 shrink-0" />
                    <span>{current.photographer}</span>
                  </div>
                  {current.cameraSpecs && (
                    <div className="text-gold-300/90 pt-1">
                      {current.cameraSpecs}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="px-6 py-3 border-t border-white/10 bg-black/60 backdrop-blur-md overflow-x-auto z-20">
            <div className="flex items-center gap-2.5 max-w-4xl mx-auto justify-center">
              {filtered.map((item, idx) => {
                const isSelected = idx === lightboxIndex
                return (
                  <button
                    key={item.id}
                    onClick={() => setLightboxIndex(idx)}
                    className={cn(
                      'relative h-12 w-16 rounded-lg overflow-hidden shrink-0 transition-all border',
                      isSelected
                        ? 'border-gold-400 ring-2 ring-gold-400/50 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    )}
                  >
                    <img
                      src={getMediaSrc(item)}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
