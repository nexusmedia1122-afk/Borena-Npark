import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export default function CultureForm({ id, onBack, onNavigate }) {
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', body: '', featured_image_url: '', status: 'draft',
    seo_title: '', seo_description: '', og_image_url: '', canonical_url: '', type: 'culture'
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
      const { data } = await supabase.from('contents').select('*').eq('id', id).single()
      if (data) setForm({ ...form, ...data })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const handleTitleChange = (title) => setForm(f => ({ ...f, title, slug: generateSlug(title) }))

  const handleSubmit = async (status) => {
    setSaving(true)
    setError(null)
    try {
      const payload = { ...form, status, type: 'culture' }
      const { error: upsertError } = await supabase.from('contents').upsert({ ...payload, id: id !== 'new' ? id : undefined })
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
    if (!confirm('Are you sure you want to delete this culture entry? This cannot be undone.')) return
    setSaving(true)
    try {
      await supabase.from('contents').delete().eq('id', id)
      onBack && onBack()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    const previewData = encodeURIComponent(JSON.stringify(form))
    window.open(`/preview?data=${previewData}`, '_blank')
  }

  if (!isSupabaseConfigured()) return <div className="text-center py-12 text-slate-600">Supabase is not configured.</div>
  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" /></div>

  const inputClass = "w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
  const labelClass = "block text-sm font-medium text-slate-700 mb-1"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{id === 'new' ? 'New Culture Entry' : 'Edit Culture Entry'}</h1>
          <p className="text-slate-600">Manage cultural heritage content</p>
        </div>
        <button onClick={onBack} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Back</button>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">Saved successfully!</div>}
      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        <div>
          <label className={labelClass}>Title *</label>
          <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input type="text" value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea value={form.excerpt} onChange={(e) => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={2} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Body</label>
          <textarea value={form.body} onChange={(e) => setForm(f => ({ ...f, body: e.target.value }))} rows={8} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Featured Image URL</label>
          <input type="url" value={form.featured_image_url} onChange={(e) => setForm(f => ({ ...f, featured_image_url: e.target.value }))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input type="text" value={form.seo_title} onChange={(e) => setForm(f => ({ ...f, seo_title: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <input type="text" value={form.seo_description} onChange={(e) => setForm(f => ({ ...f, seo_description: e.target.value }))} className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>OG Image URL</label>
            <input type="url" value={form.og_image_url} onChange={(e) => setForm(f => ({ ...f, og_image_url: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Canonical URL</label>
            <input type="url" value={form.canonical_url} onChange={(e) => setForm(f => ({ ...f, canonical_url: e.target.value }))} className={inputClass} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <button onClick={() => handleSubmit('draft')} disabled={saving} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 disabled:opacity-50">Save Draft</button>
        <button onClick={() => handleSubmit('published')} disabled={saving} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 disabled:opacity-50">{saving ? 'Publishing...' : 'Publish'}</button>
        <button onClick={handlePreview} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Preview</button>
        {id !== 'new' && <button onClick={handleDelete} disabled={saving} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50">Delete</button>}
      </div>
    </div>
  )
}
