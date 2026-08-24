import { useState, useEffect } from 'react'
import { useContentQuery, deleteRecord, updateStatus } from '../useContentQuery'
import { SearchAndFilter, Pagination, EmptyState, ErrorState } from '../usePagination'

export default function ExperienceList({ onCreate, onEdit }) {
  const { data, loading, error, search, setSearch, statusFilter, setStatusFilter, total, onTotal } = useContentQuery('contents', { typeFilter: 'experience', perPage: 20 })
  const { page, totalPages, goTo, hasNext, hasPrev } = usePagination(total || 0)

  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => { onTotal && onTotal(total) }, [total])

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteRecord('contents', deleteId)
      setDeleteId(null)
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  const handleStatusToggle = async (item) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published'
    try {
      await updateStatus('contents', item.id, newStatus)
    } catch (err) {
      console.error(err)
    }
  }

  const statusBadge = (status) => {
    const colors = { draft: 'bg-slate-100 text-slate-700', published: 'bg-green-100 text-green-700', archived: 'bg-amber-100 text-amber-700' }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.draft}`}>{status}</span>
  }

  if (error) return <ErrorState message={error} retry={() => window.location.reload()} />
  if (!loading && data.length === 0) return <EmptyState message="No experiences yet" action={onCreate} actionLabel="Add Experience" />

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Experiences</h1>
          <p className="text-slate-600">Manage park experiences and activities</p>
        </div>
        <button onClick={onCreate} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm font-medium">Add Experience</button>
      </div>
      <SearchAndFilter search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Title</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Updated</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.title}</td>
                  <td className="px-4 py-3">{statusBadge(item.status)}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(item.updated_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleStatusToggle(item)} className="text-xs px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">{item.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                    <button onClick={() => onEdit(item.id)} className="text-xs px-2 py-1 bg-green-700 text-white rounded hover:bg-green-800">Edit</button>
                    <button onClick={() => setDeleteId(item.id)} className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} goTo={goTo} hasNext={hasNext} hasPrev={hasPrev} />
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Experience</h3>
            <p className="text-slate-600 mb-4">Are you sure you want to delete this experience? This action cannot be undone.</p>
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
