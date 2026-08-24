'use client'

import { useState, useEffect, useRef } from 'react'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface MediaItem {
  id: string
  filename: string
  title: string | null
  mime_type: string
  size_bytes: number | null
  url: string
  created_at: string
}

function formatSize(bytes: number | null) {
  if (!bytes) return '-'
  const mb = bytes / (1024 * 1024)
  return mb > 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`
}

export default function GalleryPage() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    if (isSupabaseConfigured()) {
      const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false })
      setItems(data || [])
    } else {
      const { fetchAllGallery } = await import('@/lib/data-service')
      const local = await fetchAllGallery()
      setItems(local.map(g => ({
        id: g.id,
        filename: g.title,
        title: g.title,
        mime_type: 'image/jpeg',
        size_bytes: 204800,
        url: g.imageUrl,
        created_at: new Date().toISOString(),
      })))
    }
    setLoading(false)
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    setMessage('')

    try {
      for (const file of Array.from(files)) {
        const filename = `${Date.now()}_${file.name}`
        await supabase.from('media').insert({
          filename: file.name,
          mime_type: file.type,
          size_bytes: file.size,
          url: `/uploads/${filename}`,
          thumbnail_url: null,
        } as any)
      }
      setMessage('Uploaded!')
      loadItems()
    } catch (err: any) {
      setMessage(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function deleteItem(id: string) {
    if (!window.confirm('Delete this media item?')) return
    await supabase.from('media').delete().eq('id', id)
    loadItems()
  }

  if (!isSupabaseConfigured()) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">Supabase is not configured.</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-semibold text-charcoal-900">Gallery / Media</h1>
            <p className="mt-1 text-charcoal-700">{items.length} items</p>
          </div>
          <div>
            <input ref={fileInputRef} type="file" multiple onChange={handleUpload} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-gold-600 text-charcoal-900 px-5 py-2.5 rounded-lg font-medium hover:bg-gold-500 transition-colors disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

        {message && (
          <div className={cn('px-4 py-3 rounded-lg text-sm', message.includes('fail') || message.includes('Failed') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700')}>
            {message}
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-sand-100 rounded-lg" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-sand-200 p-12 text-center">
            <p className="text-charcoal-700 mb-4">No media files found</p>
            <button onClick={() => fileInputRef.current?.click()} className="text-gold-600 hover:text-gold-500 font-medium">Upload files</button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Preview</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Filename</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Uploaded</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-ivory-50">
                      <td className="px-6 py-4">
                        {item.url ? (
                          <img src={item.url} alt={item.filename} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-sand-100 flex items-center justify-center text-xs text-charcoal-700">{item.mime_type?.split('/')[1]?.toUpperCase() || 'FILE'}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-charcoal-900 text-sm">{item.filename}</p>
                        {item.title && <p className="text-xs text-charcoal-700">{item.title}</p>}
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoal-700">{item.mime_type}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-700">{formatSize(item.size_bytes)}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-700">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
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
