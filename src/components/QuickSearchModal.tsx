'use client'

import React, { useState, useEffect } from 'react'
import { Search, X, MapPin, Leaf, BookOpen, Compass, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { OFFICIAL_WILDLIFE, OFFICIAL_STORIES, OFFICIAL_MAP_POIS } from '@/data/park-data'

interface QuickSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const q = query.trim().toLowerCase()

  const matchedWildlife = OFFICIAL_WILDLIFE.filter(
    w => w.title.toLowerCase().includes(q) || w.scientificName.toLowerCase().includes(q) || w.excerpt.toLowerCase().includes(q)
  )

  const matchedStories = OFFICIAL_STORIES.filter(
    s => s.title.toLowerCase().includes(q) || s.excerpt.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q))
  )

  const matchedPOIs = OFFICIAL_MAP_POIS.filter(
    p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  )

  const hasResults = matchedWildlife.length > 0 || matchedStories.length > 0 || matchedPOIs.length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-charcoal-900/70 backdrop-blur-sm animate-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-sand-200 overflow-hidden z-10">
        {/* Search Bar Input */}
        <div className="p-4 border-b border-sand-200 flex items-center gap-3 bg-ivory-50/50">
          <Search className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search wildlife, stories, map locations, permits..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-charcoal-900 placeholder:text-charcoal-700 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-charcoal-700 hover:text-charcoal-900 px-1.5 py-0.5 rounded bg-sand-200"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-charcoal-700 hover:text-charcoal-900 rounded-lg hover:bg-sand-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query && (
            <div className="space-y-3 py-2">
              <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Quick Links</p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/wildlife"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-sand-200 hover:bg-forest-50 hover:border-forest-700/40 text-sm text-charcoal-900"
                >
                  <Leaf className="w-4 h-4 text-forest-700" /> Wildlife Encyclopedia
                </Link>
                <Link
                  href="/map"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-sand-200 hover:bg-forest-50 hover:border-forest-700/40 text-sm text-charcoal-900"
                >
                  <MapPin className="w-4 h-4 text-forest-700" /> Interactive Park Map
                </Link>
                <Link
                  href="/stories"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-sand-200 hover:bg-forest-50 hover:border-forest-700/40 text-sm text-charcoal-900"
                >
                  <BookOpen className="w-4 h-4 text-forest-700" /> Field Stories & Research
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-sand-200 hover:bg-forest-50 hover:border-forest-700/40 text-sm text-charcoal-900"
                >
                  <FileText className="w-4 h-4 text-forest-700" /> Official Permits & Booking
                </Link>
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-12 text-center text-charcoal-700">
              <p className="font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try searching for &quot;zebra&quot;, &quot;salt crater&quot;, &quot;permit&quot;, or &quot;camping&quot;</p>
            </div>
          )}

          {/* Wildlife Results */}
          {matchedWildlife.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-forest-700" /> Wildlife Species ({matchedWildlife.length})
              </p>
              <div className="space-y-1.5">
                {matchedWildlife.slice(0, 4).map(w => (
                  <Link
                    key={w.id}
                    href={`/wildlife/${w.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-sand-100/70 group transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-charcoal-900 group-hover:text-forest-800">{w.title}</p>
                      <p className="text-xs text-charcoal-700 italic">{w.scientificName} • {w.statusLabel}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-700 group-hover:text-forest-800" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Stories Results */}
          {matchedStories.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-forest-700" /> Field Stories ({matchedStories.length})
              </p>
              <div className="space-y-1.5">
                {matchedStories.slice(0, 3).map(s => (
                  <Link
                    key={s.id}
                    href={`/stories/${s.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-sand-100/70 group transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-charcoal-900 group-hover:text-forest-800">{s.title}</p>
                      <p className="text-xs text-charcoal-700">{s.category} • {s.readTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-700 group-hover:text-forest-800" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Map POI Results */}
          {matchedPOIs.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-forest-700" /> Park Locations & Landmarks ({matchedPOIs.length})
              </p>
              <div className="space-y-1.5">
                {matchedPOIs.slice(0, 3).map(p => (
                  <Link
                    key={p.id}
                    href="/map"
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-sand-100/70 group transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-charcoal-900 group-hover:text-forest-800">{p.name}</p>
                      <p className="text-xs text-charcoal-700 line-clamp-1">{p.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-700 group-hover:text-forest-800" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-sand-50 border-t border-sand-200 text-xs text-charcoal-700 flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-sand-300 rounded font-mono text-[10px]">Esc</kbd> to close</span>
          <span>Official Portal of Borena National Park</span>
        </div>
      </div>
    </div>
  )
}
