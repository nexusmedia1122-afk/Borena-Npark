'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import { ArrowLeft, Calendar, Clock, User, Share2, Tag, ArrowRight, Loader2, BookOpen } from 'lucide-react'
import { fetchStoryBySlug, fetchAllStories } from '@/lib/data-service'
import { ParkStory } from '@/data/park-data'

interface Props {
  params: Promise<{ slug: string }>
}

export default function StoryDetailPage({ params }: Props) {
  const [item, setItem] = useState<ParkStory | null>(null)
  const [related, setRelated] = useState<ParkStory[]>([])
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState('')

  useEffect(() => {
    params.then(p => setSlug(p.slug))
  }, [params])

  useEffect(() => {
    if (!slug) return
    async function load() {
      const story = await fetchStoryBySlug(slug)
      setItem(story)
      if (story) {
        const all = await fetchAllStories()
        setRelated(all.filter(s => s.slug !== slug).slice(0, 3))
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
            <h1 className="text-4xl font-display font-bold text-forest-950 mb-2">Article Not Found</h1>
            <p className="text-charcoal-700 text-sm mb-6">The requested field dispatch or research article could not be located.</p>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-900 text-ivory-50 font-semibold rounded-xl text-sm hover:bg-forest-800"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Stories & Research
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
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-end overflow-hidden bg-forest-950 pt-24">
        <div className="absolute inset-0">
          <OptimizedImage
            src={item.imageUrl}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-white bg-forest-900/80 px-3 py-1.5 rounded-lg border border-forest-700 mb-6 backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Dispatches & Research
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gold-300 mb-3">
            <span className="uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-800 border border-forest-700">
              {item.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            {item.title}
          </h1>
        </div>
      </section>

      {/* Main Editorial Body */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Author Bylines */}
        <div className="flex items-center justify-between border-b border-sand-200 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-forest-800 text-gold-300 flex items-center justify-center font-display font-bold text-base shadow-sm">
              {item.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-charcoal-900 text-sm">{item.author.name}</p>
              <p className="text-xs text-charcoal-700">{item.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-forest-800 bg-forest-100 px-3 py-1 rounded-full">
              Field Dispatch Report
            </span>
          </div>
        </div>

        {/* Lead Excerpt */}
        <p className="text-xl sm:text-2xl text-charcoal-900 font-serif leading-relaxed mb-8 border-l-4 border-gold-500 pl-4">
          {item.excerpt}
        </p>

        {/* Article Body */}
        <article className="prose prose-lg max-w-none text-charcoal-800 leading-relaxed font-sans space-y-6 whitespace-pre-line text-base sm:text-lg">
          {item.body}
        </article>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-sand-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-charcoal-700 mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Filed under:
            </span>
            {item.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-medium text-forest-900 bg-sand-100 px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Stories */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-sand-200">
            <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-6">More Field Dispatches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map(r => (
                <Link
                  key={r.id}
                  href={`/stories/${r.slug}`}
                  className="group bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative aspect-video bg-forest-950">
                    <OptimizedImage
                      src={r.imageUrl}
                      alt={r.title}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600">{r.category}</span>
                    <h3 className="font-display font-bold text-charcoal-900 text-sm mt-1 group-hover:text-forest-900 line-clamp-2">
                      {r.title}
                    </h3>
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
