'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface SettingItem {
  id: string
  key: string
  value: any
  updated_at: string
}

export default function SettingsPage() {
  const [items, setItems] = useState<SettingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [message, setMessage] = useState('')

  const emptyItem = { key: '', value: '' }
  const [form, setForm] = useState(emptyItem)

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    loadItems()
  }, [])

  async function loadItems() {
    const { data } = await supabase.from('site_settings').select('*').order('key', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    try {
      let parsedValue: any = form.value
      try { parsedValue = JSON.parse(form.value) } catch { /* keep as string */ }

      if (editingId) {
        await supabase.from('site_settings').update({ key: form.key, value: parsedValue }).eq('id', editingId)
      } else {
        await supabase.from('site_settings').insert({ key: form.key, value: parsedValue })
      }
      setMessage('Saved!')
      setEditingId(null)
      setShowAdd(false)
      setForm(emptyItem)
      loadItems()
    } catch (err: any) {
      setMessage(err.message || 'Failed to save')
    }
  }

  function handleEdit(item: SettingItem) {
    setEditingId(item.id)
    setShowAdd(false)
    setForm({ key: item.key, value: typeof item.value === 'string' ? item.value : JSON.stringify(item.value) })
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this setting?')) return
    await supabase.from('site_settings').delete().eq('id', id)
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
            <h1 className="text-3xl font-display font-semibold text-charcoal-900">Settings</h1>
            <p className="mt-1 text-charcoal-700">{items.length} settings</p>
          </div>
          <button onClick={() => { setShowAdd(true); setEditingId(null); setForm(emptyItem); }} className="bg-gold-600 text-charcoal-900 px-5 py-2.5 rounded-lg font-medium hover:bg-gold-500 transition-colors">
            Add Setting
          </button>
        </div>

        {message && (
          <div className={cn('px-4 py-3 rounded-lg text-sm', message.includes('Failed') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700')}>
            {message}
          </div>
        )}

        {(showAdd || editingId) && (
          <div className="bg-white rounded-xl border border-sand-200 p-6">
            <h2 className="text-lg font-semibold text-charcoal-900 mb-4">{editingId ? 'Edit Setting' : 'New Setting'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Key</label>
                <input type="text" required value={form.key} onChange={e => setForm(f => ({ ...f, key: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-sand-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Value (JSON or text)</label>
                <textarea rows={4} value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-sand-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none font-mono text-sm" />
              </div>
              <div className="flex items-center gap-4">
                <button type="submit" className="bg-gold-600 text-charcoal-900 px-6 py-2.5 rounded-lg font-medium hover:bg-gold-500 transition-colors">
                  {editingId ? 'Update' : 'Save'}
                </button>
                <button type="button" onClick={() => { setShowAdd(false); setEditingId(null); }} className="text-charcoal-700 hover:text-charcoal-900">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-sand-100 rounded-lg" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-sand-200 p-12 text-center">
            <p className="text-charcoal-700">No settings found</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-sand-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Key</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Updated</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-charcoal-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-100">
                  {items.map(item => (
                    <tr key={item.id} className="hover:bg-ivory-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-charcoal-900 text-sm">{item.key}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoal-700 max-w-xs truncate">
                        {typeof item.value === 'string' ? item.value : JSON.stringify(item.value)}
                      </td>
                      <td className="px-6 py-4 text-sm text-charcoal-700">
                        {new Date(item.updated_at).toLocaleDateString()}
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
