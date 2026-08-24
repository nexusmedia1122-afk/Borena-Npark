import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { deleteRecord } from '../useContentQuery'
import { Pagination, EmptyState, ErrorState } from '../usePagination'

export default function ContactMessages() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const perPage = 20
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [replyId, setReplyId] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [sending, setSending] = useState(false)

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
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).range(from, to),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true })
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
      await deleteRecord('contact_messages', deleteId)
      setDeleteId(null)
      load()
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  const handleReply = async () => {
    if (!replyId || !replyText) return
    setSending(true)
    try {
      await supabase.from('contact_messages').update({ replied_at: new Date().toISOString(), reply_text: replyText }).eq('id', replyId)
      setReplyId(null)
      setReplyText('')
      load()
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  const handleToggleRead = async (item) => {
    try {
      await supabase.from('contact_messages').update({ read: !item.read }).eq('id', item.id)
      load()
    } catch (err) {
      console.error(err)
    }
  }

  if (error) return <ErrorState message={error} retry={load} />
  if (!loading && data.length === 0) return <EmptyState message="No contact messages yet" />

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-600">Manage incoming contact form submissions</p>
      </div>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Name</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Subject</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Read</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Date</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map(item => (
                <tr key={item.id} className={`hover:bg-slate-50 ${!item.read ? 'bg-green-50' : ''}`}>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.name}</td>
                  <td className="px-4 py-3 text-slate-600">{item.email}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{item.subject || '-'}</td>
                  <td className="px-4 py-3 text-slate-500">{item.read ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleToggleRead(item)} className="text-xs px-2 py-1 border border-slate-300 rounded hover:bg-slate-50">{item.read ? 'Mark Unread' : 'Mark Read'}</button>
                    <button onClick={() => { setReplyId(item.id); setReplyText(item.reply_text || '') }} className="text-xs px-2 py-1 bg-green-700 text-white rounded hover:bg-green-800">Reply</button>
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
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Message</h3>
            <p className="text-slate-600 mb-4">Are you sure you want to delete this message? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 disabled:opacity-50">{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
      {replyId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Reply to Message</h3>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={5} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4" placeholder="Type your reply..." />
            <div className="flex justify-end gap-3">
              <button onClick={() => { setReplyId(null); setReplyText('') }} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={handleReply} disabled={sending || !replyText} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 disabled:opacity-50">{sending ? 'Sending...' : 'Send Reply'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
