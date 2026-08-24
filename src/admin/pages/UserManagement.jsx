import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { Pagination, EmptyState, ErrorState } from '../usePagination'

export default function UserManagement() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const perPage = 20
  const [editUser, setEditUser] = useState(null)
  const [editRole, setEditRole] = useState('')
  const [saving, setSaving] = useState(false)

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
        supabase.from('profiles').select('*').order('created_at', { ascending: false }).range(from, to),
        supabase.from('profiles').select('*', { count: 'exact', head: true })
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

  const handleRoleUpdate = async () => {
    if (!editUser) return
    setSaving(true)
    try {
      await supabase.from('profiles').update({ role: editRole }).eq('id', editUser.id)
      setEditUser(null)
      load()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) return
    try {
      await supabase.from('profiles').delete().eq('id', id)
      load()
    } catch (err) {
      console.error(err)
    }
  }

  if (error) return <ErrorState message={error} retry={load} />
  if (!loading && data.length === 0) return <EmptyState message="No users yet" />

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="text-slate-600">Manage admin users and roles</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Role</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Joined</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map(user => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{user.full_name || '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>{user.role || 'user'}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => { setEditUser(user); setEditRole(user.role || 'user') }} className="text-xs px-2 py-1 bg-green-700 text-white rounded hover:bg-green-800">Edit Role</button>
                    {user.role !== 'admin' && <button onClick={() => handleDelete(user.id)} className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} totalPages={totalPages} goTo={setPage} hasNext={page < totalPages} hasPrev={page > 1} />
      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Edit Role</h3>
            <p className="text-sm text-slate-600 mb-2">{editUser.full_name || editUser.email}</p>
            <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4">
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditUser(null)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleRoleUpdate} disabled={saving} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
