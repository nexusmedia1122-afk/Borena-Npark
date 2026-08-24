import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export default function MapLocationForm({ id, onBack, onNavigate }) {
  const [form, setForm] = useState({
    name: '', description: '', category: '', latitude: '', longitude: '', image_url: '', essential_offline: false, order: 0
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (id !== 'new') loadData()
  }, [id])

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const { data } = await supabase.from('map_locations').select('*').eq('id', id).single()
      if (data) setForm({ ...form, ...data })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setSaving(true)
    setError(null)
    try {
      const payload = { ...form, latitude: form.latitude ? parseFloat(form.latitude) : null, longitude: form.longitude ? parseFloat(form.longitude) : null }
      const { error: upsertError } = await supabase.from('map_locations').upsert({ ...payload, id: id !== 'new' ? id : undefined })
      if (upsertError) throw upsertError
      setSuccess(true)
      setTimeout(() => { setSuccess(false); onBack && onBack() }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this location? This cannot be undone.')) return
    setSaving(true)
    try {
      await supabase.from('map_locations').delete().eq('id', id)
      onBack && onBack()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!isSupabaseConfigured()) return <div className="text-center py-12 text-slate-600">Supabase is not configured.</div>
  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" /></div>

  const inputClass = "w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
  const labelClass = "block text-sm font-medium text-slate-700 mb-1"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{id === 'new' ? 'New Map Location' : 'Edit Map Location'}</h1>
          <p className="text-slate-600">Manage map point of interest</p>
        </div>
        <button onClick={onBack} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Back</button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">Saved successfully!</div>}
      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input type="text" value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Latitude</label>
            <input type="number" step="any" value={form.latitude} onChange={(e) => setForm(f => ({ ...f, latitude: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <input type="number" step="any" value={form.longitude} onChange={(e) => setForm(f => ({ ...f, longitude: e.target.value }))} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Image URL</label>
          <input type="url" value={form.image_url} onChange={(e) => setForm(f => ({ ...f, image_url: e.target.value }))} className={inputClass} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="essential_offline" checked={form.essential_offline} onChange={(e) => setForm(f => ({ ...f, essential_offline: e.target.checked }))} className="w-4 h-4 text-green-700 rounded border-slate-300 focus:ring-green-500" />
          <label htmlFor="essential_offline" className="text-sm text-slate-700">Essential Offline</label>
        </div>
        <div>
          <label className={labelClass}>Display Order</label>
          <input type="number" value={form.order} onChange={(e) => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} className={inputClass} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <button onClick={handleSubmit} disabled={saving} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
        {id !== 'new' && <button onClick={handleDelete} disabled={saving} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50">Delete</button>}
      </div>
    </div>
  )
}
