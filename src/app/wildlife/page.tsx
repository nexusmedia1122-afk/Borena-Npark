'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Button } from '@/components/ui/components'
import OptimizedImage from '@/components/OptimizedImage'
import { Search, Shield, ArrowRight, Sparkles } from 'lucide-react'
import { fetchAllWildlife } from '@/lib/data-service'
import { WildlifeSpecies } from '@/data/park-data'

const CATEGORIES = ['All', 'Mammals', 'Birds', 'Endemics', 'Reptiles']

export default function WildlifePage() {
  const [items, setItems] = useState<WildlifeSpecies[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    async function load() {
      const data = await fetchAllWildlife()
      setItems(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = items.filter(item => {
    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase())

    const matchCat = activeCategory === 'All' || item.category === activeCategory
    const matchStatus = statusFilter === 'All' || item.conservationStatus === statusFilter

    return matchSearch && matchCat && matchStatus
  })

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Banner */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-35">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=75"
            alt="Borena wildlife savanna"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Taxonomic Biodiversity Archive
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight text-balance">
            Wildlife of Borena
          </h1>
          <p className="text-sm md:text-base text-ivory-200/85 max-w-2xl mx-auto leading-relaxed font-light">
            Explore 450+ recorded species across the southern Ethiopian savanna, including critically endangered endemics and majestic Horn of Africa fauna.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl border border-sand-200/80 p-5 shadow-subtle mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500" />
              <input
                type="text"
                placeholder="Search species by common or scientific name (e.g. Grevy's Zebra, Bushcrow)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-200 bg-ivory-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest-800 focus:bg-white transition-all text-charcoal-950 placeholder:text-charcoal-500"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-charcoal-700 whitespace-nowrap">IUCN Status:</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="text-xs font-medium bg-ivory-50 border border-sand-200 rounded-lg px-3 py-2 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800"
              >
                <option value="All">All Statuses</option>
                <option value="CR">Critically Endangered (CR)</option>
                <option value="EN">Endangered (EN)</option>
                <option value="VU">Vulnerable (VU)</option>
                <option value="NT">Near Threatened (NT)</option>
                <option value="LC">Least Concern (LC)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-sand-100">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-forest-950 text-white shadow-subtle'
                    : 'bg-sand-50/80 border border-sand-200 text-charcoal-700 hover:border-forest-700 hover:text-forest-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Species Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-subtle">
                <div className="aspect-[4/3] bg-sand-100 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-sand-100 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-sand-100 rounded w-1/2 animate-pulse" />
                  <div className="h-12 bg-sand-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-sand-200 p-8 shadow-subtle">
            <Shield className="w-12 h-12 text-sand-300 mx-auto mb-3" />
            <h3 className="text-xl font-display font-bold text-charcoal-950 mb-1">No wildlife records found</h3>
            <p className="text-sm text-charcoal-700 max-w-md mx-auto mb-6 font-light">
              Try adjusting your search criteria or reset your category and IUCN conservation filters.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); setStatusFilter('All') }}
              className="px-4 py-2 bg-forest-900 text-white text-xs font-semibold rounded-lg hover:bg-forest-850"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(spec => (
              <Link
                key={spec.id}
                href={`/wildlife/${spec.slug}`}
                className="group bg-white rounded-2xl border border-sand-200/80 overflow-hidden shadow-subtle hover:shadow-card hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-forest-950 overflow-hidden">
                    <OptimizedImage
                      src={spec.imageUrl}
                      alt={spec.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-950/90 text-gold-300 border border-forest-700/50 backdrop-blur-sm">
                        {spec.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm ${conservationStatusColor(spec.conservationStatus)}`}>
                        {spec.conservationStatus} • {spec.statusLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-charcoal-950 group-hover:text-forest-800 transition-colors">
                      {spec.title}
                    </h3>
                    <p className="text-xs text-charcoal-600 italic mt-0.5 font-serif">
                      {spec.scientificName}
                    </p>
                    <p className="text-xs sm:text-sm text-charcoal-700 mt-3 line-clamp-2 leading-relaxed font-light">
                      {spec.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-sand-100 flex items-center justify-between text-xs font-semibold text-forest-850 group-hover:text-gold-700">
                  <span>Species Dossier</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
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
      return 'bg-amber-600 text-white'
    case 'NT':
      return 'bg-yellow-500 text-charcoal-950 font-bold'
    default:
      return 'bg-emerald-700 text-white'
  }
}
