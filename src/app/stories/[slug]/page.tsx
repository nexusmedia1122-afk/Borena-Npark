'use client'

import { use, useState, useEffect } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import { ArrowLeft, Calendar, Clock, User, ArrowRight, Loader2 } from 'lucide-react'
import { fetchStoryBySlug, fetchAllStories } from '@/lib/data-service'
import { ParkStory, OFFICIAL_STORIES } from '@/data/park-data'

interface Props {
  params: Promise<{ slug: string }>
}

export default function StoryDetailPage({ params }: Props) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const initialStory = OFFICIAL_STORIES.find(s => s.slug === slug || s.id === slug) || null

  const [item, setItem] = useState<ParkStory | null>(initialStory)
  const [related, setRelated] = useState<ParkStory[]>(() =>
    OFFICIAL_STORIES.filter(s => s.slug !== slug).slice(0, 3)
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStoryBySlug(slug).then(story => {
      if (story) {
        setItem(story)
        fetchAllStories().then(all => {
          setRelated(all.filter(s => s.slug !== slug).slice(0, 3))
        })
      }
    })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-50 flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-forest-800" />
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
          <div className="text-center max-w-md space-y-4">
            <h1 className="text-4xl font-display font-bold text-forest-950">Article Not Found</h1>
            <p className="text-charcoal-700 text-sm font-light">The requested field dispatch or research article could not be located.</p>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-900 text-white font-semibold rounded-lg text-sm hover:bg-forest-850"
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
            className="object-cover opacity-40 scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-4">
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-white bg-forest-900/80 px-3.5 py-1.5 rounded-lg border border-forest-700 backdrop-blur-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Dispatches & Research
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gold-300">
            <span className="uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-900/90 border border-forest-700/60 backdrop-blur-sm">
              {item.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-ivory-200">
              <Calendar className="w-3.5 h-3.5" /> {item.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-ivory-200">
              <Clock className="w-3.5 h-3.5" /> {item.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            {item.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-ivory-200/90 pt-1">
            <User className="w-3.5 h-3.5 text-gold-400" />
            <span>By <strong className="text-white font-medium">{item.author?.name || 'Park Dispatcher'}</strong></span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <article className="bg-white rounded-2xl border border-sand-200/80 p-8 sm:p-12 shadow-subtle space-y-6">
          <p className="text-base sm:text-lg text-charcoal-900 leading-relaxed font-serif drop-cap">
            {item.body || item.excerpt}
          </p>

          <div className="prose prose-forest max-w-none text-sm sm:text-base text-charcoal-700 leading-relaxed space-y-4 pt-2 font-light">
            <p>
              In the semi-arid acacia rangelands of southern Ethiopia, continuous ecological telemetry and community partnerships provide an invaluable barometer of biodiversity health. Rangers and local elders collaborate daily to ensure water point safety, mitigate illegal firewood collection, and record census metrics.
            </p>
            <p>
              Under the institutional framework of the Ethiopian Wildlife Conservation Authority (EWCA), research findings are shared across regional biodiversity databases, contributing directly to Horn of Africa species recovery strategies.
            </p>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="pt-8 border-t border-sand-200/80 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-charcoal-600">Article Tags:</span>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-sand-50 border border-sand-200/80 text-charcoal-800 px-2.5 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-14 space-y-6">
            <h3 className="font-display font-bold text-2xl text-charcoal-950">
              More Dispatches & Research
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/stories/${rel.slug}`}
                  className="group bg-white rounded-2xl border border-sand-200/80 overflow-hidden shadow-subtle hover:shadow-card hover:border-gold-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-forest-950 overflow-hidden">
                    <OptimizedImage
                      src={rel.imageUrl}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-earth-700 block">{rel.category}</span>
                    <h4 className="font-display font-bold text-base text-charcoal-950 group-hover:text-forest-800 transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-charcoal-600 line-clamp-2 font-light">{rel.excerpt}</p>
                  </div>
                  <div className="px-5 pb-5 pt-2 border-t border-sand-100 flex items-center justify-between text-xs font-semibold text-forest-850 group-hover:text-gold-700">
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
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
