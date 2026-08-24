import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { Pagination, EmptyState, ErrorState } from '../usePagination'

export default function NavigationEditor() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ label: '', href: '', parent_id: null, order: 0, open_in_new_tab: false })
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    loadItems()
  }, [])

  async function loadItems() {
    setLoading(true)
    setError(null)
    try {
      const { data } = await supabase.from('navigation_items').select('*').order('order', { ascending: true }).order('created_at', { ascending: true })
      setItems(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      if (editing) {
        await supabase.from('navigation_items').update(form).eq('id', editing)
      } else {
        await supabase.from('navigation_items').insert([form])
      }
      setEditing(null)
      setForm({ label: '', href: '', parent_id: null, order: 0, open_in_new_tab: false })
      loadItems()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this navigation item?')) return
    try {
      await supabase.from('navigation_items').delete().eq('id', id)
      loadItems()
    } catch (err) {
      console.error(err)
    }
  }

  const startEdit = (item) => {
    setEditing(item.id)
    setForm({ label: item.label, href: item.href, parent_id: item.parent_id, order: item.order, open_in_new_tab: item.open_in_new_tab })
  }

  if (error) return <ErrorState message={error} retry={loadItems} />
  if (!loading && items.length === 0) return <EmptyState message="No navigation items yet" action={() => setEditing('new')} actionLabel="Add Navigation Item" />

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Navigation Editor</h1>
        <p className="text-slate-600">Manage site navigation menu</p>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}
      <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">{editing ? 'Edit Navigation Item' : 'Add Navigation Item'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Label *</label>
            <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Link *</label>
            <input type="text" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
            <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="open_new_tab" checked={form.open_in_new_tab} onChange={(e) => setForm({ ...form, open_in_new_tab: e.target.checked })} className="w-4 h-4 text-green-700 rounded border-slate-300 focus:ring-green-500" />
            <label htmlFor="open_new_tab" className="text-sm text-slate-700">Open in new tab</label>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          {editing && <button onClick={() => { setEditing(null); setForm({ label: '', href: '', parent_id: null, order: 0, open_in_new_tab: false }) }} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Cancel</button>}
          <button onClick={handleSave} disabled={saving || !form.label || !form.href} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 disabled:opacity-50">{saving ? 'Saving...' : editing ? 'Update' : 'Add Item'}</button>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Label</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Link</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">New Tab</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Order</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.label}</td>
                  <td className="px-4 py-3 text-slate-600">{item.href}</td>
                  <td className="px-4 py-3 text-slate-500">{item.open_in_new_tab ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-slate-500">{item.order}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => startEdit(item)} className="text-xs px-2 py-1 bg-green-700 text-white rounded hover:bg-green-800">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
