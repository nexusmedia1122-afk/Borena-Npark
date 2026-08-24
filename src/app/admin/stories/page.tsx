'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface ContentItem {
  id: string
  title: string
  type: string
  status: string
  published_at: string | null
  updated_at: string
}

export default function StoriesPage() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 20

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    loadItems()
  }, [search, statusFilter, currentPage])

  async function loadItems() {
    setLoading(true)
    try {
      let query = supabase
        .from('contents')
        .select('*', { count: 'exact' })
        .eq('type', 'story')
        .order('updated_at', { ascending: false })

      if (statusFilter !== 'all') query = query.eq('status', statusFilter)
      if (search) query = query.ilike('title', `%${search}%`)

      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1
      const { data, count } = await query.range(from, to)
      setItems(data || [])
      setTotalCount(count || 0)
    } catch {
      console.error('Failed to load stories')
    } finally {
      setLoading(false)
    }
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const next = currentStatus === 'published' ? 'draft' : 'published'
    await supabase.from('contents').update({ status: next }).eq('id', id)
    loadItems()
  }

  async function deleteItem(id: string) {
    if (!window.confirm('Delete this story? This cannot be undone.')) return
    const { error } = await supabase.from('contents').delete().eq('id', id)
    if (!error) loadItems()
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  if (!isSupabaseConfigured()) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Supabase is not configured.
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-semibold text-charcoal-900">Stories</h1>
            <p className="mt-1 text-charcoal-700">{totalCount} entries</p>
          </div>
          <Link href="/admin/stories/new" className="bg-gold-600 text-charcoal-900 px-5 py-2.5 rounded-lg font-medium hover:bg-gold-500 transition-colors">
            Add Story
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
            className="flex-1 px-4 py-2.5 rounded-lg border border-sand-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
            className="px-4 py-2.5 rounded-lg border border-sand-200 focus:border-gold-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-sand-100 rounded-lg" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-sand-200 p-12 text-center">
            <p className="text-charcoal-700 mb-4">No stories found</p>
            <Link href="/admin/stories/new" className="text-gold-600 hover:text-gold-500 font-medium">Add your first story</Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sand-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Published</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-100">
                    {items.map(item => (
                      <tr key={item.id} className="hover:bg-ivory-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-charcoal-900">{item.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            item.status === 'published' ? 'bg-green-100 text-green-800' :
                            item.status === 'draft' ? 'bg-amber-100 text-amber-800' :
                            'bg-gray-100 text-gray-800'
                          )}>{item.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-charcoal-700">
                          {item.published_at ? new Date(item.published_at).toLocaleDateString() : '-'}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Link href={`/admin/stories/${item.id}/edit`} className="text-gold-600 hover:text-gold-500 text-sm font-medium">Edit</Link>
                          <button onClick={() => toggleStatus(item.id, item.status)} className="text-charcoal-700 hover:text-charcoal-900 text-sm font-medium">
                            {item.status === 'published' ? 'Unpublish' : 'Publish'}
                          </button>
                          <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-4 py-2 rounded-lg border border-sand-200 text-charcoal-700 disabled:opacity-50 hover:bg-sand-100 transition-colors">Previous</button>
                <span className="text-sm text-charcoal-700">Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-4 py-2 rounded-lg border border-sand-200 text-charcoal-700 disabled:opacity-50 hover:bg-sand-100 transition-colors">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}
