'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface LocationItem {
  id: string
  name: string
  description: string | null
  category: string | null
  latitude: number
  longitude: number
  image_url: string | null
  essential_offline: boolean
}

export default function LocationsPage() {
  const [items, setItems] = useState<LocationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const emptyForm = { name: '', description: '', category: '', latitude: '', longitude: '', image_url: '', essential_offline: false }
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    loadItems()
  }, [])

  async function loadItems() {
    const { data } = await supabase.from('map_locations').select('*').order('order', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload = {
        name: form.name,
        description: form.description || null,
        category: form.category || null,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
        image_url: form.image_url || null,
        essential_offline: form.essential_offline,
      }

      if (editingId) {
        await supabase.from('map_locations').update(payload as any).eq('id', editingId)
      } else {
        await supabase.from('map_locations').insert(payload as any)
      }
      setMessage('Saved!')
      setShowForm(false)
      setEditingId(null)
      setForm(emptyForm)
      loadItems()
    } catch (err: any) {
      setMessage(err.message || 'Failed to save')
    }
  }

  function handleEdit(item: LocationItem) {
    setEditingId(item.id)
    setForm({
      name: item.name,
      description: item.description || '',
      category: item.category || '',
      latitude: item.latitude.toString(),
      longitude: item.longitude.toString(),
      image_url: item.image_url || '',
      essential_offline: item.essential_offline,
    })
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this location?')) return
    await supabase.from('map_locations').delete().eq('id', id)
    loadItems()
  }

  if (!isSupabaseConfigured()) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">Supabase is not configured.</div>
      </AdminLayout>
    )
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-sand-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-colors"
  const labelClass = "block text-sm font-medium text-charcoal-700 mb-1.5"

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-semibold text-charcoal-900">Locations</h1>
            <p className="mt-1 text-charcoal-700">{items.length} locations</p>
          </div>
          <button onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }} className="bg-gold-600 text-charcoal-900 px-5 py-2.5 rounded-lg font-medium hover:bg-gold-500 transition-colors">
            Add Location
          </button>
        </div>

        {message && (
          <div className={cn('px-4 py-3 rounded-lg text-sm', message.includes('Failed') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700')}>
            {message}
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl border border-sand-200 p-6">
            <h2 className="text-lg font-semibold text-charcoal-900 mb-4">{editingId ? 'Edit Location' : 'New Location'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <input type="text" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Latitude</label>
                  <input type="number" step="any" value={form.latitude} onChange={e => setForm(f => ({ ...f, latitude: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Longitude</label>
                  <input type="number" step="any" value={form.longitude} onChange={e => setForm(f => ({ ...f, longitude: e.target.value }))} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input type="url" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} className={inputClass} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="essential" checked={form.essential_offline} onChange={e => setForm(f => ({ ...f, essential_offline: e.target.checked }))} className="rounded border-sand-200 text-gold-600 focus:ring-gold-500" />
                <label htmlFor="essential" className="text-sm text-charcoal-700">Essential offline</label>
              </div>
              <div className="flex items-center gap-4">
                <button type="submit" className="bg-gold-600 text-charcoal-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gold-500 transition-colors">
                  {editingId ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="text-charcoal-700 hover:text-charcoal-900">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-sand-100 rounded-lg" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-sand-200 p-12 text-center">
            <p className="text-charcoal-700">No locations found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Coordinates</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Essential</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-ivory-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-charcoal-900">{item.name}</p>
                        {item.description && <p className="text-xs text-charcoal-700 truncate max-w-xs">{item.description}</p>}
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoal-700">{item.category || '-'}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-700">{item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}</td>
                      <td className="px-6 py-4">
                        <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', item.essential_offline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}>
                          {item.essential_offline ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleEdit(item)} className="text-gold-600 hover:text-gold-500 text-sm font-medium">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
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
