'use client'

import { useState, useEffect, useCallback } from 'react'
import OptimizedImage from '@/components/OptimizedImage'
import {
  Users,
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Loader2,
  CheckCircle2,
  Tag,
  Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CultureImageItem {
  public_id: string
  title: string
  caption: string
  secure_url: string
  width?: number
  height?: number
  tag?: string
  format?: string
}

const DEFAULT_CULTURE_ITEMS: CultureImageItem[] = [
  {
    public_id: '619373301_1313029967537848_472084938184086167_n',
    title: 'Borana Community Cultural Gathering',
    caption: 'Pastoralist community members in traditional white cotton attire and beads.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608249/619373301_1313029967537848_472084938184086167_n.jpg',
    tag: 'Community Life',
  },
  {
    public_id: '709066803_1417594430414734_281272406725480445_n',
    title: 'Borana Women in Traditional Attire',
    caption: 'Intricate beadwork, colorful shawls, and ceremonial adornments of Borana women.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608249/709066803_1417594430414734_281272406725480445_n.jpg',
    tag: 'Traditional Attire',
  },
  {
    public_id: '707855818_1417594387081405_7960231960741775671_n',
    title: 'Pastoral Elders at Sacred Council',
    caption: 'Elders gathered to discuss customary grazing routes and peaceful community harmony.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608249/707855818_1417594387081405_7960231960741775671_n.jpg',
    tag: 'Gadaa Assembly',
  },
  {
    public_id: '591181585_1272542681586577_5939286583825392173_n',
    title: 'Borana Youth & Cultural Celebration',
    caption: 'Youth participating in ancestral rites of passage and community singing.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608248/591181585_1272542681586577_5939286583825392173_n.jpg',
    tag: 'Youth Rites',
  },
  {
    public_id: '599764433_1424343812415358_2782897952296694273_n',
    title: 'Buna Qalaa Coffee Blessing Ceremony',
    caption: 'Traditional roasting and offering of Buna Qalaa for peace and community prosperity.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608248/599764433_1424343812415358_2782897952296694273_n.jpg',
    tag: 'Sacred Ritual',
  },
  {
    public_id: '600313081_1424343869082019_7813446701461286414_n',
    title: 'Singing Wells Water Overseers',
    caption: 'Hydrological stewards directing cattle drinking shifts at the Tula Wells.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608248/600313081_1424343869082019_7813446701461286414_n.jpg',
    tag: 'Tula Wells',
  },
  {
    public_id: '600354349_1424343905748682_6703919861338467748_n',
    title: 'Oromo Cultural Heritage Documentation',
    caption: 'Living oral traditions, customary laws, and ancestral rangeland songs.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608248/600354349_1424343905748682_6703919861338467748_n.jpg',
    tag: 'Heritage Archive',
  },
  {
    public_id: '591817754_1272542761586569_2936525008646828463_n',
    title: 'Portrait of Borana Pastoralist Leader',
    caption: 'Elder holding traditional Kallacha sacred symbol of peace and spiritual leadership.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608247/591817754_1272542761586569_2936525008646828463_n.jpg',
    tag: 'Leadership Portrait',
  },
  {
    public_id: '6295116500530224167',
    title: 'Traditional Pastoralist Homeland',
    caption: 'Panoramic landscape showing ancestral homesteads and sacred acacia woodlands.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608247/6295116500530224167.jpg',
    tag: 'Homeland',
  },
]

export default function CultureCloudinaryGallery() {
  const [items, setItems] = useState<CultureImageItem[]>(DEFAULT_CULTURE_ITEMS)
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    async function loadCultureImages() {
      try {
        const res = await fetch('/api/cloudinary/culture')
        if (res.ok) {
          const data = await res.json()
          if (data.resources && data.resources.length > 0) {
            setItems(data.resources)
          }
        }
      } catch (err) {
        console.warn('Using verified static culture dataset:', err)
      } finally {
        setLoading(false)
      }
    }
    loadCultureImages()
  }, [])

  const tags = ['All', ...Array.from(new Set(items.map((i) => i.tag || 'Culture')))]

  const filtered =
    activeFilter === 'All' ? items : items.filter((i) => i.tag === activeFilter)

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImg = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filtered.length)
    }
  }, [lightboxIndex, filtered.length])

  const prevImg = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 + filtered.length) % filtered.length)
    }
  }, [lightboxIndex, filtered.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImg()
      if (e.key === 'ArrowLeft') prevImg()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, nextImg, prevImg])

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sand-200/80 pb-6">
        <div className="max-w-2xl space-y-2">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
            <span className="inline-block h-px w-4 bg-gold-600" />
            <Camera className="w-3.5 h-3.5 text-gold-600" />
            <span>Cloudinary Cultural Archive</span>
          </p>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-950">
            People, Heritage & Ancestral Life
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
            High-definition photographic documentation of the Borana pastoralists, Gadaa elders, traditional attire, and sacred ceremonies fetched directly from Cloudinary.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-forest-850 font-semibold bg-forest-50 px-3.5 py-1.5 rounded-full border border-forest-200/60 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" />
          <span>{items.length} Cultural Assets Loaded</span>
        </div>
      </div>

      {/* Filter Tag Chips */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={cn(
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all',
              activeFilter === tag
                ? 'bg-forest-950 text-white shadow-subtle'
                : 'bg-white border border-sand-200 text-charcoal-700 hover:border-forest-700 hover:text-forest-900'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={item.public_id || idx}
            onClick={() => openLightbox(idx)}
            className="group bg-white rounded-2xl border border-sand-200/80 overflow-hidden shadow-subtle hover:shadow-card hover:border-gold-500/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] bg-forest-950 overflow-hidden">
                <OptimizedImage
                  src={item.secure_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Tag Chip */}
                <span className="absolute top-3 left-3 bg-forest-950/90 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-gold-500/30">
                  {item.tag || 'Culture'}
                </span>

                {/* Zoom Icon Button */}
                <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-forest-950/80 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm border border-forest-700">
                  <Maximize2 className="w-4 h-4 text-gold-400" />
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <h4 className="font-display font-bold text-base text-charcoal-950 leading-snug group-hover:text-forest-800 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed font-light">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="px-5 pb-4 pt-1 text-[10px] text-charcoal-400 font-mono border-t border-sand-100/60 flex items-center justify-between">
              <span>Cloudinary ID: {item.public_id.split('_')[0]}</span>
              <span className="text-gold-700 font-sans font-semibold">Click to expand</span>
            </div>
          </div>
        ))}
      </div>

      {/* High-Resolution Modal Lightbox */}
      {lightboxIndex !== null && activeItem && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-forest-900/80 text-ivory-100 hover:text-white hover:bg-forest-800 transition-all border border-forest-700"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous Image */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImg() }}
            className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-forest-900/80 text-ivory-100 hover:text-white hover:bg-forest-800 transition-all border border-forest-700"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Image */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImg() }}
            className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-forest-900/80 text-ivory-100 hover:text-white hover:bg-forest-800 transition-all border border-forest-700"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col bg-forest-950 rounded-2xl overflow-hidden border border-forest-800 shadow-2xl">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <OptimizedImage
                src={activeItem.secure_url}
                alt={activeItem.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1000px"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-forest-950 text-white space-y-2 border-t border-forest-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                  {activeItem.tag || 'Borana Cultural Heritage'}
                </span>
                <span className="text-xs text-ivory-300/60 font-mono">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-ivory-200/80 font-light leading-relaxed">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
