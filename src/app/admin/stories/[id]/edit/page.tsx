'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  featured_image_url: '',
  category: '',
  author: '',
  status: 'draft' as const,
  seo_title: '',
  seo_description: '',
}

export default function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const id = use(params)

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    loadItem()
  }, [])

  async function loadItem() {
    const { data } = await supabase.from('contents').select('*').eq('id', id).single()
    if (data) {
      setForm({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        body: data.body || '',
        featured_image_url: data.featured_image_url || '',
        category: (data as any).category || '',
        author: (data as any).author || '',
        status: data.status || 'draft',
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
      })
    }
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const { error } = await supabase.from('contents').update({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        body: form.body || null,
        featured_image_url: form.featured_image_url || null,
        status: form.status,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
        category: form.category || null,
      }).eq('id', id)
      if (error) throw error
      setMessage('Saved!')
    } catch (err: any) {
      setMessage(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this story permanently?')) return
    await supabase.from('contents').delete().eq('id', id)
    router.push('/admin/stories')
  }

  if (!isSupabaseConfigured()) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">Supabase is not configured.</div>
      </AdminLayout>
    )
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <div className="h-8 bg-sand-100 rounded w-1/3 animate-pulse" />
          {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-sand-100 rounded-lg animate-pulse" />)}
        </div>
      </AdminLayout>
    )
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-sand-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-colors"
  const labelClass = "block text-sm font-medium text-charcoal-700 mb-1.5"

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-semibold text-charcoal-900">Edit Story</h1>
            <p className="mt-1 text-charcoal-700">{form.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleDelete} className="text-red-600 hover:text-red-700 text-sm font-medium px-4 py-2 rounded-lg border border-red-200 hover:bg-red-50 transition-colors">Delete</button>
            <Link href="/admin/stories" className="text-charcoal-700 hover:text-charcoal-900">Cancel</Link>
          </div>
        </div>

        {message && (
          <div className={cn('px-4 py-3 rounded-lg text-sm', message.includes('Failed') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700')}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl border border-sand-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-charcoal-900">Story Details</h2>
            <div>
              <label className={labelClass}>Title</label>
              <input type="text" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input type="text" required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Excerpt</label>
              <textarea rows={3} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Body</label>
              <textarea rows={8} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Featured Image URL</label>
                <input type="url" value={form.featured_image_url} onChange={e => setForm(f => ({ ...f, featured_image_url: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <input type="text" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Author</label>
                <input type="text" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))} className={inputClass}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-sand-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-charcoal-900">SEO</h2>
            <div>
              <label className={labelClass}>SEO Title</label>
              <input type="text" value={form.seo_title} onChange={e => setForm(f => ({ ...f, seo_title: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>SEO Description</label>
              <textarea rows={3} value={form.seo_description} onChange={e => setForm(f => ({ ...f, seo_description: e.target.value }))} className={inputClass} />
            </div>
          </div>

          <button type="submit" disabled={saving} className="bg-gold-600 text-charcoal-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gold-500 transition-colors disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </AdminLayout>
  )
}
