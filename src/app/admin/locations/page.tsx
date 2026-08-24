'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import {
  fetchAllMapPOIs,
  saveMapPOI,
  deleteMapPOI,
} from '@/lib/data-service'
import { MapPOI } from '@/data/park-data'
import {
  MapPin,
  Plus,
  Search,
  ExternalLink,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  'visitor-center',
  'crater',
  'wildlife',
  'heritage',
  'campsite',
  'gate',
]

export default function LocationsPage() {
  const [items, setItems] = useState<MapPOI[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const emptyForm = {
    name: '',
    description: '',
    category: 'visitor-center',
    latitude: '4.8500',
    longitude: '38.2500',
    imageUrl: '',
    essential_offline: true,
  }
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    loadLocations()
  }, [])

  async function loadLocations() {
    setLoading(true)
    const data = await fetchAllMapPOIs()
    setItems(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name) return

    const newPOI: MapPOI = {
      id: editingId || `custom-poi-${Date.now()}`,
      name: form.name,
      description: form.description || '',
      category: form.category as any,
      latitude: parseFloat(form.latitude) || 4.85,
      longitude: parseFloat(form.longitude) || 38.25,
      imageUrl: form.imageUrl || undefined,
      essential_offline: form.essential_offline,
    }

    await saveMapPOI(newPOI)
    setMessage(`Location "${newPOI.name}" saved! It is live on the public interactive map.`)
    setTimeout(() => setMessage(''), 4000)

    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    loadLocations()
  }

  function handleEdit(item: MapPOI) {
    setEditingId(item.id)
    setForm({
      name: item.name,
      description: item.description || '',
      category: item.category,
      latitude: item.latitude.toString(),
      longitude: item.longitude.toString(),
      imageUrl: item.imageUrl || '',
      essential_offline: item.essential_offline,
    })
    setShowForm(true)
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete landmark "${name}" from the GIS map?`)) return

    await deleteMapPOI(id)
    setMessage(`Removed "${name}" from map.`)
    setTimeout(() => setMessage(''), 4000)
    loadLocations()
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                GIS Map Landmarks & POI Manager
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Live Leaflet Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Add and update GPS coordinates, entrance gates, and viewpoints. Points appear live on{' '}
              <Link href="/map" target="_blank" className="font-semibold text-forest-800 underline">
                /map
              </Link>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/map"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-sand-200 hover:border-forest-700 text-charcoal-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-forest-700" />
              <span>Preview Public GIS Map</span>
            </Link>

            <button
              onClick={() => {
                setShowForm(true)
                setEditingId(null)
                setForm(emptyForm)
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold-600 hover:bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Landmark</span>
            </button>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Add/Edit Form Drawer / Modal */}
        {showForm && (
          <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-card space-y-5 animate-fade-in">
            <div className="flex items-center justify-between border-b border-sand-200 pb-3">
              <h2 className="text-lg font-display font-bold text-charcoal-900">
                {editingId ? 'Edit Map Landmark' : 'Add New Map Landmark'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
                className="text-charcoal-600 hover:text-charcoal-950 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">
                    Landmark Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. El Sod Salt Caldera Viewpoint"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">
                    Category Pin
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">
                    Latitude (°N)
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={form.latitude}
                    onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                    placeholder="e.g. 4.8850"
                    className="w-full px-3.5 py-2 rounded-xl border border-sand-200 font-mono text-xs outline-none focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-charcoal-700 mb-1">
                    Longitude (°E)
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={form.longitude}
                    onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                    placeholder="e.g. 38.2850"
                    className="w-full px-3.5 py-2 rounded-xl border border-sand-200 font-mono text-xs outline-none focus:border-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">
                  Description & Access Advice
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Visitor access notes, 4WD trail status, elevation..."
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-charcoal-700 mb-1">
                  Photo URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 font-mono text-xs outline-none focus:border-forest-700"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                  }}
                  className="px-4 py-2 rounded-xl font-semibold text-charcoal-700 hover:bg-sand-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all"
                >
                  {editingId ? 'Update Landmark' : 'Save Landmark to Map'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* POI Table */}
        {loading ? (
          <div className="animate-pulse space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-sand-100 rounded-2xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-sand-200 p-12 text-center shadow-sm">
            <MapPin className="w-12 h-12 text-sand-300 mx-auto mb-3" />
            <p className="font-semibold text-charcoal-900">No landmarks found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-sand-50 border-b border-sand-200 text-[11px] font-bold text-charcoal-700 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Landmark</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">GPS Coordinates</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100 text-xs">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-ivory-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-display font-bold text-sm text-charcoal-900">{item.name}</p>
                        {item.description && (
                          <p className="text-[11px] text-charcoal-600 line-clamp-1 max-w-sm">
                            {item.description}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-forest-100 text-forest-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-mono text-charcoal-700 text-[11px]">
                        {item.latitude.toFixed(4)}°N, {item.longitude.toFixed(4)}°E
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-forest-800 hover:text-forest-950 rounded bg-sand-100 hover:bg-sand-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete landmark"
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
