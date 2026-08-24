import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { Pagination, EmptyState, ErrorState } from '../usePagination'

export default function ActivityLog() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const perPage = 20

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
        supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).range(from, to),
        supabase.from('activity_logs').select('*', { count: 'exact', head: true })
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

  if (error) return <ErrorState message={error} retry={load} />
  if (!loading && data.length === 0) return <EmptyState message="No activity logged yet" />

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Activity Log</h1>
        <p className="text-slate-600">Track all admin actions and changes</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Action</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Entity</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Entity ID</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">User</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.action}</td>
                  <td className="px-4 py-3 text-slate-600">{item.entity_type || '-'}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{item.entity_id ? item.entity_id.slice(0, 8) : '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{item.user_email || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} goTo={setPage} hasNext={page < totalPages} hasPrev={page > 1} />
    </div>
  )
}
