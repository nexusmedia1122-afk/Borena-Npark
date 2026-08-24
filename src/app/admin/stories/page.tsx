'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import {
  fetchAllStories,
  deleteStory,
} from '@/lib/data-service'
import { ParkStory } from '@/data/park-data'
import {
  BookOpen,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Eye,
  CheckCircle2,
  Calendar,
  User,
} from 'lucide-react'

export default function StoriesPage() {
  const [items, setItems] = useState<ParkStory[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadStories()
  }, [])

  async function loadStories() {
    setLoading(true)
    const data = await fetchAllStories()
    setItems(data)
    setLoading(false)
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete story "${title}" from the public dispatches feed?`)) return

    await deleteStory(id)
    setMessage(`Removed "${title}" from dispatches.`)
    setTimeout(() => setMessage(''), 4000)
    loadStories()
  }

  const filtered = items.filter((item) => {
    return (
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                Field Stories & Dispatches Manager
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Live Feed Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Publish field research, community stories, and census reports. Articles appear live on{' '}
              <Link href="/stories" target="_blank" className="font-semibold text-forest-800 underline">
                /stories
              </Link>{' '}
              in latest-first order.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/stories"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-sand-200 hover:border-forest-700 text-charcoal-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-forest-700" />
              <span>Preview Public Stories</span>
            </Link>

            <Link
              href="/admin/stories/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-earth-800 hover:bg-earth-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 text-gold-400" />
              <span>New Dispatch</span>
            </Link>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-charcoal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stories by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-sand-200 rounded-xl text-xs outline-none focus:border-forest-700 shadow-sm"
          />
        </div>

        {/* Stories List */}
        {loading ? (
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-sand-100 rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-sand-200 p-12 text-center shadow-sm">
            <BookOpen className="w-12 h-12 text-sand-300 mx-auto mb-3" />
            <p className="font-semibold text-charcoal-900">No field stories found.</p>
            <Link
              href="/admin/stories/new"
              className="mt-3 inline-block text-xs font-bold uppercase text-earth-800 hover:underline"
            >
              Write your first dispatch
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-sand-50 border-b border-sand-200 text-[11px] font-bold text-charcoal-700 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Article</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Author</th>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100 text-xs">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-ivory-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-forest-950 shrink-0 border border-sand-200">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-display font-bold text-sm text-charcoal-900">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-charcoal-600 line-clamp-1 max-w-sm">
                              {item.excerpt}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-earth-100 text-earth-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-charcoal-700">
                        {item.author.name}
                      </td>

                      <td className="px-6 py-4 text-charcoal-600">
                        {item.publishedAt}
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          href={`/stories/${item.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest-800 hover:text-forest-950 px-2 py-1 rounded bg-sand-100/60 hover:bg-sand-200"
                          title="View on public site"
                        >
                          <span>Public Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>

                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete story"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
