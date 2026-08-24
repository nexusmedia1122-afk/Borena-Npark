'use client'

import { useState, useEffect } from 'react'
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

export default function NewStoryPage() {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (form.slug === '' && form.title !== '') {
      setForm(f => ({ ...f, slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }))
    }
  }, [form.title])

  async function handleSubmit(e: React.FormEvent, status: 'draft' | 'published') {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const { error } = await supabase.from('contents').insert({
        type: 'story',
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        body: form.body || null,
        featured_image_url: form.featured_image_url || null,
        status,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
        category: form.category || null,
      })
      if (error) throw error
      setMessage('Saved!')
      setTimeout(() => router.push('/admin/stories'), 800)
    } catch (err: any) {
      setMessage(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-sand-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition-colors"
  const labelClass = "block text-sm font-medium text-charcoal-700 mb-1.5"

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-semibold text-charcoal-900">New Story</h1>
            <p className="mt-1 text-charcoal-700">Add a new story</p>
          </div>
          <Link href="/admin/stories" className="text-charcoal-700 hover:text-charcoal-900">Cancel</Link>
        </div>

        {message && (
          <div className={cn('px-4 py-3 rounded-lg text-sm', message.includes('Failed') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700')}>
            {message}
          </div>
        )}

        <form className="space-y-8">
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

          <div className="flex items-center gap-4">
            <button type="submit" onClick={e => handleSubmit(e, 'draft')} disabled={saving} className="bg-forest-700 text-ivory-50 px-6 py-2.5 rounded-lg font-medium hover:bg-forest-900 transition-colors disabled:opacity-60">
              Save Draft
            </button>
            <button type="submit" onClick={e => handleSubmit(e, 'published')} disabled={saving} className="bg-gold-600 text-charcoal-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gold-500 transition-colors disabled:opacity-60">
              Publish
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
