'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'

interface MessageItem {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  replied: boolean
  created_at: string
}

export default function MessagesPage() {
  const [items, setItems] = useState<MessageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    loadItems()
  }, [])

  async function loadItems() {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  async function markAsRead(id: string, read: boolean) {
    await supabase.from('contact_messages').update({ read }).eq('id', id)
    loadItems()
  }

  async function markAsReplied(id: string, replied: boolean) {
    await supabase.from('contact_messages').update({ replied }).eq('id', id)
    loadItems()
  }

  async function deleteMessage(id: string) {
    if (!window.confirm('Delete this message permanently?')) return
    await supabase.from('contact_messages').delete().eq('id', id)
    if (selectedId === id) setSelectedId(null)
    loadItems()
  }

  const selected = items.find(i => i.id === selectedId)

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
        <div>
          <h1 className="text-3xl font-display font-semibold text-charcoal-900">Messages</h1>
          <p className="mt-1 text-charcoal-700">{items.length} messages</p>
        </div>

        {message && (
          <div className="px-4 py-3 rounded-lg text-sm bg-green-50 border border-green-200 text-green-700">{message}</div>
        )}

        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-sand-100 rounded-lg" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl border border-sand-200 p-12 text-center">
            <p className="text-charcoal-700">No messages yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white rounded-xl border border-sand-200 overflow-hidden">
              <div className="overflow-y-auto max-h-[600px]">
                {items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={cn('w-full text-left p-4 border-b border-sand-100 hover:bg-ivory-50 transition-colors', selectedId === item.id ? 'bg-ivory-50' : '', !item.read ? 'border-l-4 border-l-gold-500' : '')}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-charcoal-900 text-sm truncate">{item.name}</p>
                      <span className="text-xs text-charcoal-700 flex-shrink-0 ml-2">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-700 truncate mt-0.5">{item.subject || '(No subject)'}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              {selected ? (
                <div className="bg-white rounded-xl border border-sand-200 p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-charcoal-900">{selected.name}</h2>
                      <p className="text-sm text-charcoal-700">{selected.email}</p>
                      <p className="text-xs text-charcoal-700 mt-1">{new Date(selected.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => markAsRead(selected.id, !selected.read)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', selected.read ? 'border-sand-200 text-charcoal-700' : 'border-gold-600 text-gold-600 hover:bg-gold-50')}>
                        {selected.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button onClick={() => markAsReplied(selected.id, !selected.replied)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', selected.replied ? 'border-sand-200 text-charcoal-700' : 'border-green-600 text-green-600 hover:bg-green-50')}>
                        {selected.replied ? 'Mark Unreplied' : 'Mark Replied'}
                      </button>
                    </div>
                  </div>
                  {selected.subject && <p className="text-sm font-medium text-charcoal-900">{selected.subject}</p>}
                  <div className="bg-sand-100 rounded-lg p-4">
                    <p className="text-charcoal-900 whitespace-pre-wrap">{selected.message}</p>
                  </div>
                  <button onClick={() => deleteMessage(selected.id)} className="text-red-600 hover:text-red-700 text-sm font-medium">Delete Message</button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-sand-200 p-12 text-center">
                  <p className="text-charcoal-700">Select a message to read</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
