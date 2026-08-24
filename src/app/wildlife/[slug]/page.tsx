'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import {
  ArrowLeft,
  Shield,
  MapPin,
  Eye,
  Compass,
  Calendar,
  ArrowRight,
  Loader2,
  Volume2,
  VolumeX,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react'
import { fetchWildlifeBySlug, fetchAllWildlife } from '@/lib/data-service'
import { WildlifeSpecies } from '@/data/park-data'
import { cn } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

const IUCN_LEVELS = [
  { code: 'LC', label: 'Least Concern', color: 'bg-emerald-600' },
  { code: 'NT', label: 'Near Threatened', color: 'bg-teal-600' },
  { code: 'VU', label: 'Vulnerable', color: 'bg-amber-500' },
  { code: 'EN', label: 'Endangered', color: 'bg-orange-600' },
  { code: 'CR', label: 'Critically Endangered', color: 'bg-rose-600' },
]

export default function WildlifeDetailPage({ params }: Props) {
  const [item, setItem] = useState<WildlifeSpecies | null>(null)
  const [related, setRelated] = useState<WildlifeSpecies[]>([])
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState('')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null)

  useEffect(() => {
    params.then((p) => setSlug(p.slug))
  }, [params])

  useEffect(() => {
    if (!slug) return
    async function load() {
      const spec = await fetchWildlifeBySlug(slug)
      setItem(spec)
      if (spec) {
        const all = await fetchAllWildlife()
        setRelated(all.filter((w) => w.slug !== slug).slice(0, 3))
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-50 flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-forest-800" />
          <span className="text-xs font-semibold text-charcoal-600 uppercase tracking-widest">
            Loading Field Dossier...
          </span>
        </div>
        <SiteFooter />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-display font-bold text-forest-950 mb-2">Species Record Not Found</h1>
            <p className="text-charcoal-700 text-sm mb-6">The requested wildlife species is not currently listed in the official park archive.</p>
            <Link
              href="/wildlife"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-900 text-ivory-50 font-semibold rounded-xl text-sm hover:bg-forest-800"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Wildlife Archive
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  const activeIucnIndex = IUCN_LEVELS.findIndex((l) => l.code === item.conservationStatus)

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Header */}
      <section className="relative min-h-[480px] sm:min-h-[560px] flex items-end overflow-hidden bg-forest-950 pt-24">
        <div className="absolute inset-0">
          <OptimizedImage
            src={item.imageUrl}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45 scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            href="/wildlife"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-white bg-forest-900/80 px-3.5 py-1.5 rounded-lg border border-forest-700/80 mb-6 backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Wildlife Archive
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-forest-900/90 text-gold-400 border border-gold-500/30 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
              {item.category}
            </span>
            <span className="bg-white/10 text-ivory-200 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
              Protected Native Fauna
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight leading-tight">
            {item.title}
          </h1>
          <p className="mt-2 text-lg sm:text-2xl text-gold-300 font-serif italic">
            {item.scientificName}
          </p>
        </div>
      </section>

      {/* Main Field Dossier */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* IUCN Status Ribbon & Quick Metrics */}
        <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: IUCN Spectrum Meter */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-charcoal-700 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-forest-700" />
                IUCN Red List Global Assessment
              </span>
              <span className="text-xs font-bold text-forest-900 bg-forest-100 px-2.5 py-0.5 rounded-md">
                Status: {item.statusLabel}
              </span>
            </div>

            {/* Spectrum Bar */}
            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {IUCN_LEVELS.map((lvl, idx) => {
                const isCurrent = lvl.code === item.conservationStatus
                return (
                  <div key={lvl.code} className="space-y-1.5 text-center">
                    <div
                      className={cn(
                        'h-3 rounded-full transition-all',
                        isCurrent
                          ? `${lvl.color} ring-2 ring-forest-950 scale-105 shadow-md`
                          : idx < (activeIucnIndex === -1 ? 0 : activeIucnIndex)
                          ? 'bg-sand-300'
                          : 'bg-sand-200 opacity-50'
                      )}
                    />
                    <span
                      className={cn(
                        'text-[10px] font-bold block truncate',
                        isCurrent ? 'text-charcoal-950 font-black' : 'text-charcoal-700'
                      )}
                    >
                      {lvl.code}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Quick Expedition Details */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-sand-200 lg:pl-8">
            <div className="p-3 bg-ivory-100/60 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-charcoal-600 block">Primary Habitat</span>
              <span className="text-xs font-semibold text-charcoal-900">{item.habitat}</span>
            </div>
            <div className="p-3 bg-ivory-100/60 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-charcoal-600 block">Activity Cycle</span>
              <span className="text-xs font-semibold text-charcoal-900">{item.behavior}</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Dossier (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview & Biology */}
            <div className="bg-white rounded-3xl border border-sand-200 p-8 shadow-sm space-y-5">
              <h2 className="font-display text-2xl font-bold text-charcoal-950">
                Species Overview & Field Biology
              </h2>
              <p className="text-base text-charcoal-800 leading-relaxed font-serif drop-cap">
                {item.body || item.excerpt}
              </p>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                In southern Ethiopia, {item.title} plays an indispensable ecological role in maintaining the equilibrium of the savanna grasslands and acacia woodlands. EWCA ranger patrols monitor herd recruitment, water access at traditional pastoral pans, and migration pathways across the Borana Zone.
              </p>
            </div>

            {/* Simulated Audio & Ranger Vocalization Card */}
            <div className="bg-forest-950 text-white rounded-3xl border border-forest-800 p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                  Field Audio Acoustic Monitor
                </span>
                <h3 className="font-display font-bold text-lg text-white">
                  {item.title} Acoustic Call Simulation
                </h3>
                <p className="text-xs text-ivory-200/80 max-w-md">
                  Simulated field acoustic telemetry frequency recorded during dawn rangeland monitoring in Borana.
                </p>
              </div>

              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gold-600 hover:bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Mute Acoustic Wave</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Play Soundwave</span>
                  </>
                )}
              </button>
            </div>

            {/* Gallery Images */}
            {item.gallery && item.gallery.length > 0 && (
              <div className="bg-white rounded-3xl border border-sand-200 p-8 shadow-sm space-y-4">
                <h3 className="font-display text-xl font-bold text-charcoal-950">
                  Field Photography & Sightings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {item.gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedGalleryIndex(idx)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-sand-200 shadow-sm"
                    >
                      <OptimizedImage
                        src={imgUrl}
                        alt={`${item.title} sighting ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Camera className="w-5 h-5 text-gold-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Ranger Field Advice & Booking (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Ranger Viewing Advice Card */}
            <div className="bg-white rounded-3xl border border-sand-200 p-6 shadow-sm space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600 block">
                EWCA Scout Recommendations
              </span>
              <h3 className="font-display font-bold text-lg text-charcoal-950">
                How to Spot This Species
              </h3>

              <div className="space-y-3 text-xs text-charcoal-700">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-ivory-100/70">
                  <Clock className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal-900 font-semibold">Best Viewing Window</strong>
                    <span>{item.viewingTip || 'Early morning (06:00–08:30) and late afternoon game drives'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-ivory-100/70">
                  <MapPin className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal-900 font-semibold">Key Hotspots</strong>
                    <span>Dida Hara Plains, Sarite Wildlife Corridor, and El Sod Crater periphery</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-ivory-100/70">
                  <Camera className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-charcoal-900 font-semibold">Photographic Gear</strong>
                    <span>Telephoto lens (300mm–600mm) recommended with beanbag vehicle mount</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan a Safari Expedition CTA */}
            <div className="bg-gradient-to-br from-forest-950 to-forest-900 text-white rounded-3xl border border-forest-800 p-6 sm:p-8 shadow-card space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                Custom Safari Planner
              </span>
              <h3 className="font-display font-bold text-xl leading-snug">
                Track {item.title} with Expert EWCA Rangers
              </h3>
              <p className="text-xs text-ivory-200/80 leading-relaxed">
                Book a tailored wildlife tracking expedition led by certified local scouts who know every waterhole and herd territory.
              </p>

              <Link
                href={`/contact?safariFocus=${encodeURIComponent(item.title)}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gold-600 hover:bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-glow-gold transition-all text-center"
              >
                <span>Inquire About Safari</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Species Carousel */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-sand-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-gold-600">Biodiversity Network</span>
                <h3 className="font-display text-2xl font-bold text-charcoal-950">Other Savanna Species</h3>
              </div>
              <Link
                href="/wildlife"
                className="text-xs font-bold uppercase tracking-wider text-forest-800 hover:text-forest-950 inline-flex items-center gap-1"
              >
                <span>View Full Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/wildlife/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-card hover:border-gold-500/50 transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-forest-950">
                    <OptimizedImage
                      src={rel.imageUrl}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-forest-950/80 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-gold-500/30">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h4 className="font-display font-bold text-base text-charcoal-900 group-hover:text-forest-800 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-charcoal-600 font-serif italic">
                        {rel.scientificName}
                      </p>
                    </div>
                    <span className="text-xs text-gold-600 font-semibold inline-flex items-center gap-1 pt-2">
                      Read Field Dossier <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
