'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import {
  fetchAllWildlife,
  deleteWildlifeItem,
} from '@/lib/data-service'
import { WildlifeSpecies } from '@/data/park-data'
import {
  Shield,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function WildlifePage() {
  const [items, setItems] = useState<WildlifeSpecies[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadWildlife()
  }, [])

  async function loadWildlife() {
    setLoading(true)
    const data = await fetchAllWildlife()
    setItems(data)
    setLoading(false)
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete "${name}" from the wildlife registry?`)) return

    await deleteWildlifeItem(id)
    setMessage(`Removed "${name}" from database.`)
    setTimeout(() => setMessage(''), 4000)
    loadWildlife()
  }

  const filtered = items.filter((item) => {
    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.scientificName.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      categoryFilter === 'All' || item.category === categoryFilter
    return matchSearch && matchCategory
  })

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                Wildlife Species Registry
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Live Directory Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Manage biodiversity records and field dossiers. Every published species appears live on{' '}
              <Link href="/wildlife" target="_blank" className="font-semibold text-forest-800 underline">
                /wildlife
              </Link>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/wildlife"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-sand-200 hover:border-forest-700 text-charcoal-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-forest-700" />
              <span>Preview Public Directory</span>
            </Link>

            <Link
              href="/admin/wildlife/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold-600 hover:bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Species</span>
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

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-charcoal-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by common or scientific name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-sand-200 rounded-xl text-xs outline-none focus:border-forest-700 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Mammals', 'Birds', 'Endemics', 'Reptiles'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all',
                  categoryFilter === cat
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'bg-white border border-sand-200 text-charcoal-700 hover:border-forest-700'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Wildlife Species Table */}
        {loading ? (
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-sand-100 rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-sand-200 p-12 text-center shadow-sm">
            <Shield className="w-12 h-12 text-sand-300 mx-auto mb-3" />
            <p className="font-semibold text-charcoal-900">No species found.</p>
            <Link
              href="/admin/wildlife/new"
              className="mt-3 inline-block text-xs font-bold uppercase text-forest-800 hover:underline"
            >
              Add a new species record
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-sand-50 border-b border-sand-200 text-[11px] font-bold text-charcoal-700 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Species</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">IUCN Status</th>
                    <th className="px-6 py-3.5">Habitat</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100 text-xs">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-ivory-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-forest-950 shrink-0 border border-sand-200">
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
                            <p className="text-[11px] font-serif italic text-forest-800">
                              {item.scientificName}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-forest-100 text-forest-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-charcoal-800">
                          {item.conservationStatus} ({item.statusLabel})
                        </span>
                      </td>

                      <td className="px-6 py-4 text-charcoal-600 truncate max-w-xs">
                        {item.habitat}
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          href={`/wildlife/${item.slug}`}
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
                          title="Delete species"
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
