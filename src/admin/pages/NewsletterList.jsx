import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { deleteRecord } from '../useContentQuery'
import { Pagination, EmptyState, ErrorState } from '../usePagination'

export default function NewsletterList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const perPage = 20
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    load()
  }, [page])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const from = (page - 1) * perPage
      const to = from + perPage - 1
      const [result, countResult] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*').order('created_at', { ascending: false }).range(from, to),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true })
      ])
      if (result.error) throw result.error
      setData(result.data || [])
      setTotal(countResult.count || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / perPage))

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteRecord('newsletter_subscribers', deleteId)
      setDeleteId(null)
      load()
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  const handleToggle = async (item) => {
    try {
      await supabase.from('newsletter_subscribers').update({ active: !item.active }).eq('id', item.id)
      load()
    } catch (err) {
      console.error(err)
    }
  }

  if (error) return <ErrorState message={error} retry={load} />
  if (!loading && data.length === 0) return <EmptyState message="No subscribers yet" />

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>
        <p className="text-slate-600">Manage newsletter subscriptions</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Subscribed</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.email}</td>
                  <td className="px-4 py-3 text-slate-600">{item.name || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>{item.active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleToggle(item)} className="text-xs px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">{item.active ? 'Deactivate' : 'Activate'}</button>
                    <button onClick={() => setDeleteId(item.id)} className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} goTo={setPage} hasNext={page < totalPages} hasPrev={page > 1} />
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Subscriber</h3>
            <p className="text-slate-600 mb-4">Are you sure you want to delete this subscriber? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50">{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
