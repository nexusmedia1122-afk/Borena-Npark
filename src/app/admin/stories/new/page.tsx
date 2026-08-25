'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import { saveStory } from '@/lib/data-service'
import { ParkStory } from '@/data/park-data'
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'

const CATEGORIES = ['Conservation', 'Community', 'Research', 'Field Report']

export default function NewStoryPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState<'Conservation' | 'Community' | 'Research' | 'Field Report'>('Conservation')
  const [authorName, setAuthorName] = useState('EWCA Research Unit')
  const [authorRole, setAuthorRole] = useState('Senior Field Ecologist')
  const [imageUrl, setImageUrl] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)
  const [successLink, setSuccessLink] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (title && !slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      )
    }
  }, [title, slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !imageUrl) {
      alert('Please fill out the title and image URL.')
      return
    }

    setSaving(true)
    const newStory: ParkStory = {
      id: `custom-story-${Date.now()}`,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      author: {
        name: authorName,
        role: authorRole,
      },
      publishedAt: new Date().toISOString().slice(0, 10),
      readTime: '4 min read',
      imageUrl,
      excerpt: excerpt || title,
      body: body || excerpt || title,
      tags: ['Borana NP', category, 'Conservation'],
    }

    await saveStory(newStory)
    setSuccessLink(`/stories/${newStory.slug}`)
    setSaving(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                Write Field Story / Dispatch
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Instant Public Dispatch
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Published articles appear immediately on the public{' '}
              <Link href="/stories" target="_blank" className="font-semibold text-forest-800 underline">
                /stories
              </Link>{' '}
              feed in latest-first order.
            </p>
          </div>

          <Link
            href="/admin/stories"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-700 bg-white border border-sand-200 hover:bg-sand-50"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel
          </Link>
        </div>

        {/* Success Banner */}
        {successLink && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-5 rounded-2xl space-y-2 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Story Published Successfully!</span>
            </div>
            <p className="text-xs text-emerald-800">
              Your field dispatch is now live on the public website.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href={successLink}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-earth-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-earth-700"
              >
                <span>Read Live Article</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              </Link>
              <Link
                href="/admin/stories"
                className="text-xs text-emerald-800 font-semibold underline"
              >
                Back to Stories Manager
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-display font-bold text-charcoal-900 border-b border-sand-100 pb-2">
              Article Details
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                Story Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dawn Rangeland Grevy's Zebra Migration Survey"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm outline-none focus:border-forest-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700 bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs font-mono outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Author Title / Role
                </label>
                <input
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                Cover Photograph URL
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/d39v3q6s/... or Cloudinary Public ID"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-xs font-mono outline-none focus:border-forest-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                Summary / Excerpt
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief 1-2 sentence lead paragraph..."
                className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                Article Body Content
              </label>
              <textarea
                rows={8}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Full article content and research findings..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/admin/stories"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-sand-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-earth-800 hover:bg-earth-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all disabled:opacity-60"
            >
              {saving ? 'Publishing...' : 'Publish Story to Public Feed'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
