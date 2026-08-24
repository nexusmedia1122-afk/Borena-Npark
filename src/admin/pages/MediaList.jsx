import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { deleteRecord } from '../useContentQuery'
import { Pagination, EmptyState, ErrorState } from '../usePagination'

export default function MediaList() {
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
        supabase.from('media').select('*').order('created_at', { ascending: false }).range(from, to),
        supabase.from('media').select('*', { count: 'exact', head: true })
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
      await deleteRecord('media', deleteId)
      setDeleteId(null)
      load()
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  if (error) return <ErrorState message={error} retry={load} />
  if (!loading && data.length === 0) return <EmptyState message="No media files yet" />

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
        <p className="text-slate-600">Manage uploaded media files</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Preview</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Filename</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Type</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Size</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Uploaded</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    {item.url ? (
                      <img src={item.url} alt={item.filename} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500">N/A</div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.filename || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{item.mime_type || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{item.size ? `${(item.size / 1024).toFixed(1)} KB` : '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
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
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Media</h3>
            <p className="text-slate-600 mb-4">Are you sure you want to delete this media file? This action cannot be undone.</p>
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
