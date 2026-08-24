'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/components'
import OptimizedImage from '@/components/OptimizedImage'
import { ArrowLeft, Shield, MapPin, Eye, Compass, Calendar, ArrowRight, Loader2 } from 'lucide-react'
import { fetchWildlifeBySlug, fetchAllWildlife } from '@/lib/data-service'
import { WildlifeSpecies } from '@/data/park-data'

interface Props {
  params: Promise<{ slug: string }>
}

export default function WildlifeDetailPage({ params }: Props) {
  const [item, setItem] = useState<WildlifeSpecies | null>(null)
  const [related, setRelated] = useState<WildlifeSpecies[]>([])
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState('')

  useEffect(() => {
    params.then(p => setSlug(p.slug))
  }, [params])

  useEffect(() => {
    if (!slug) return
    async function load() {
      const spec = await fetchWildlifeBySlug(slug)
      setItem(spec)
      if (spec) {
        const all = await fetchAllWildlife()
        setRelated(all.filter(w => w.slug !== slug).slice(0, 3))
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-50 flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-forest-700" />
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
            <h1 className="text-4xl font-display font-bold text-forest-950 mb-2">Species Not Found</h1>
            <p className="text-charcoal-700 text-sm mb-6">The requested wildlife species record is not currently listed in the park archive.</p>
            <Link
              href="/wildlife"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-900 text-ivory-50 font-semibold rounded-xl text-sm hover:bg-forest-800"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Wildlife Directory
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Header */}
      <section className="relative min-h-[420px] sm:min-h-[500px] flex items-end overflow-hidden bg-forest-950 pt-24">
        <div className="absolute inset-0">
          <OptimizedImage
            src={item.imageUrl}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            href="/wildlife"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-white bg-forest-900/80 px-3 py-1.5 rounded-lg border border-forest-700 mb-6 backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Wildlife Archive
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-forest-800 text-gold-300 border border-forest-700">
              {item.category}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${conservationStatusColor(item.conservationStatus)}`}>
              IUCN Status: {item.conservationStatus} ({item.statusLabel})
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
            {item.title}
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-gold-300/90 font-serif italic">
            {item.scientificName}
          </p>
        </div>
      </section>

      {/* Main Species Dossier Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Description (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-sand-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xs uppercase font-bold tracking-wider text-gold-600 mb-3">Species Overview</h2>
              <p className="text-lg sm:text-xl text-charcoal-900 leading-relaxed font-serif">
                {item.excerpt}
              </p>

              <div className="mt-6 pt-6 border-t border-sand-200 text-charcoal-700 text-base leading-relaxed space-y-4 whitespace-pre-line">
                {item.body}
              </div>
            </div>

            {/* Viewing Tip Card */}
            <div className="bg-forest-900 text-ivory-50 rounded-2xl p-6 sm:p-8 border border-forest-800 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 flex-shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white mb-1">Ranger Field Viewing Guidance</h3>
                <p className="text-sm text-ivory-200 leading-relaxed">
                  {item.viewingTip}
                </p>
                <div className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 underline underline-offset-2"
                  >
                    Request a Certified Scout Guide for this Track <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Facts (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-sand-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 border-b border-sand-200 pb-3 mb-4">
                <Shield className="w-4 h-4 text-forest-700" />
                <h3 className="font-display font-semibold text-charcoal-900 text-base">Taxonomic & Field Data</h3>
              </div>

              <dl className="space-y-4 text-xs sm:text-sm">
                <div>
                  <dt className="text-charcoal-700 font-medium">Scientific Classification</dt>
                  <dd className="font-semibold text-charcoal-900 italic font-serif mt-0.5">{item.scientificName}</dd>
                </div>

                <div>
                  <dt className="text-charcoal-700 font-medium">Habitat Preference</dt>
                  <dd className="font-semibold text-charcoal-900 mt-0.5">{item.habitat}</dd>
                </div>

                <div>
                  <dt className="text-charcoal-700 font-medium">Primary Diet</dt>
                  <dd className="font-semibold text-charcoal-900 mt-0.5">{item.diet}</dd>
                </div>

                <div>
                  <dt className="text-charcoal-700 font-medium">Behavior & Social Structure</dt>
                  <dd className="font-semibold text-charcoal-900 mt-0.5">{item.behavior}</dd>
                </div>

                {item.populationEstimate && (
                  <div>
                    <dt className="text-charcoal-700 font-medium">Population Status in Borana</dt>
                    <dd className="font-semibold text-forest-800 mt-0.5">{item.populationEstimate}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 pt-4 border-t border-sand-200">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold rounded-xl transition-colors"
                >
                  <Compass className="w-4 h-4" /> Book Guided Safari
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Species Row */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-sand-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-gold-600">Discover More Fauna</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">Related Wildlife Species</h2>
              </div>
              <Link
                href="/wildlife"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-forest-950"
              >
                View Full Archive <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(r => (
                <Link
                  key={r.id}
                  href={`/wildlife/${r.slug}`}
                  className="group bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-forest-700/40 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] bg-forest-950 overflow-hidden">
                    <OptimizedImage
                      src={r.imageUrl}
                      alt={r.title}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conservationStatusColor(r.conservationStatus)}`}>
                        {r.conservationStatus}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-charcoal-900 group-hover:text-forest-900">
                      {r.title}
                    </h3>
                    <p className="text-xs text-charcoal-700 italic font-serif mt-0.5">{r.scientificName}</p>
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

function conservationStatusColor(status: string): string {
  switch (status.toUpperCase()) {
    case 'CR':
      return 'bg-red-600 text-white'
    case 'EN':
      return 'bg-rose-600 text-white'
    case 'VU':
      return 'bg-amber-500 text-charcoal-900 font-bold'
    case 'NT':
      return 'bg-yellow-400 text-charcoal-900 font-bold'
    default:
      return 'bg-emerald-600 text-white'
  }
}
