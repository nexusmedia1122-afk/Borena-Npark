import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export default function ConservationForm({ id, onBack, onNavigate }) {
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', body: '', featured_image_url: '', status: 'draft', seo_title: '', seo_description: '', og_image_url: '', canonical_url: '', essential_offline: false })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id && id !== 'new' && isSupabaseConfigured()) {
      setLoading(true)
      supabase.from('contents').select('*').eq('id', id).single().then(({ data }) => {
        if (data) setForm(data)
        setLoading(false)
      })
    }
  }, [id])

  useEffect(() => {
    if (!form.slug && form.title) {
      setForm(f => ({ ...f, slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }))
    }
  }, [form.title])

  const handleSubmit = async (e, status) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      requireEnv()
      const payload = { ...form, type: 'conservation', status, published_at: status === 'published' ? new Date().toISOString() : form.published_at }
      if (id === 'new') {
        const { data, error } = await supabase.from('contents').insert([payload]).select().single()
        if (error) throw error
        onNavigate('conservation')
      } else {
        const { error } = await supabase.from('contents').update(payload).eq('id', id)
        if (error) throw error
        onBack()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this? This cannot be undone.')) return
    setSaving(true)
    try {
      await deleteRecord('contents', id)
      onNavigate('conservation')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" /></div>

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{id === 'new' ? 'New Conservation' : 'Edit Conservation'}</h1>
        <button onClick={onBack} className="text-slate-600 hover:text-slate-900">← Back</button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}

      <form onSubmit={(e) => handleSubmit(e, 'draft')} className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Body</label>
            <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} rows={8} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Featured Image URL</label>
            <input type="text" value={form.featured_image_url} onChange={(e) => setForm({ ...form, featured_image_url: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={form.essential_offline} onChange={(e) => setForm({ ...form, essential_offline: e.target.checked })} className="w-4 h-4 text-green-600 rounded" />
            <span className="text-sm text-slate-700">Available offline</span>
          </label>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <h3 className="font-semibold text-slate-900">SEO</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SEO Title</label>
            <input type="text" value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SEO Description</label>
            <textarea value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Open Graph Image URL</label>
            <input type="text" value={form.og_image_url} onChange={(e) => setForm({ ...form, og_image_url: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Canonical URL</label>
            <input type="text" value={form.canonical_url} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button type="submit" disabled={saving} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50">Save Draft</button>
            <button type="button" onClick={(e) => handleSubmit(e, 'published')} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">Publish</button>
          </div>
          <div className="flex items-center space-x-3">
            <button type="button" onClick={() => window.open(`#preview/${form.slug || 'preview'}`, '_blank')} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">Preview</button>
            {id !== 'new' && <button type="button" onClick={handleDelete} className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">Delete</button>}
          </div>
        </div>
      </form>
    </div>
  )
}
