'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import { Search, BookOpen, Calendar, Clock, ArrowRight, Sparkles, User } from 'lucide-react'
import { fetchAllStories } from '@/lib/data-service'
import { ParkStory } from '@/data/park-data'

const CATEGORIES = ['All', 'Conservation', 'Research', 'Community', 'Field Report']

export default function StoriesPage() {
  const [items, setItems] = useState<ParkStory[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    async function load() {
      const data = await fetchAllStories()
      setItems(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = items.filter(item => {
    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))

    const matchCat = activeCategory === 'All' || item.category === activeCategory

    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Header */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-35">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=85"
            alt="Field dispatches hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Field Dispatches & Research Journal
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Stories from the Field
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            First-hand accounts from EWCA ranger patrols, scientific biodiversity surveys, and centuries-old Gadaa water heritage covenants.
          </p>
        </div>
      </section>

      {/* Main Stories Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl border border-sand-200 p-5 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-700" />
              <input
                type="text"
                placeholder="Search articles by title, topic, or keyword (e.g. Grevy's census, singing wells)..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand-200 bg-ivory-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700 focus:bg-white text-charcoal-900 placeholder:text-charcoal-700 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-sand-100">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-forest-900 text-ivory-50 shadow-sm'
                    : 'bg-sand-50 border border-sand-200 text-charcoal-700 hover:border-forest-700 hover:text-forest-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Listing */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-sand-200 overflow-hidden">
                <div className="aspect-video bg-sand-100 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-sand-100 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-sand-100 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-sand-200 p-8">
            <BookOpen className="w-12 h-12 text-sand-300 mx-auto mb-3" />
            <h3 className="text-xl font-display font-semibold text-charcoal-900 mb-1">No articles found</h3>
            <p className="text-sm text-charcoal-700 max-w-md mx-auto mb-6">
              Try adjusting your search criteria or switch to &quot;All&quot; categories.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All') }}
              className="px-4 py-2 bg-forest-900 text-ivory-50 text-xs font-semibold rounded-lg hover:bg-forest-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(story => (
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="group bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-forest-700/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-forest-950 overflow-hidden">
                    <OptimizedImage
                      src={story.imageUrl}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-900/90 text-gold-300 border border-forest-700/50 backdrop-blur-sm">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-charcoal-700 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {story.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {story.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-charcoal-900 group-hover:text-forest-900 transition-colors leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-sm text-charcoal-700 mt-3 line-clamp-3 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-sand-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-charcoal-700">
                    <div className="w-6 h-6 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-[10px]">
                      {story.author.name.charAt(0)}
                    </div>
                    <span className="truncate max-w-[140px] font-medium">{story.author.name}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest-800 group-hover:text-forest-950">
                    Read Article <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
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
