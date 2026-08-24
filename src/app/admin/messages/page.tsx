'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import {
  MessageSquare,
  Mail,
  User,
  Calendar,
  CheckCircle2,
  Trash2,
  Send,
} from 'lucide-react'
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

const DEMO_MESSAGES: MessageItem[] = [
  {
    id: 'msg-001',
    name: 'Dr. Elena Vance (Oxford Biodiversity)',
    email: 'e.vance@oxford.ac.uk',
    subject: 'Grevy’s Zebra Ecological Telemetry Accreditation',
    message: 'Dear EWCA Park Warden, we are preparing a 3-week field research expedition in October 2026 to study rangeland water pan telemetry corridors across the Dida Hara plains. We would like to apply for official research clearance and request two certified scout guides.',
    read: false,
    replied: false,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'msg-002',
    name: 'Marcus Lindqvist (Swedish Safari Club)',
    email: 'marcus@nordicsafari.se',
    subject: '3-Day Caldera Trek & Eco-Camping Booking (6 Guests)',
    message: 'Hello, our group of 6 experienced hikers is planning a 3-day expedition covering El Sod salt caldera and Sarite eco-campsites. Could you please confirm ranger accompaniment and 4WD vehicle permits?',
    read: true,
    replied: true,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'msg-003',
    name: 'Amina Worku (Addis Eco-Tours)',
    email: 'amina@addisecotours.et',
    subject: 'Tula Singing Wells Cultural Visit Protocol',
    message: 'Good day, we have a photographic documentary crew requesting permission to record the morning chanting at Dubuluk Tula Well next week. We have read the cultural guidelines and would like to arrange the community scout briefing.',
    read: false,
    replied: false,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
]

export default function MessagesPage() {
  const [items, setItems] = useState<MessageItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>('msg-001')
  const [messageNotice, setMessageNotice] = useState('')

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    setLoading(true)
    if (isSupabaseConfigured()) {
      try {
        const { data } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })
        setItems(data && data.length > 0 ? data : DEMO_MESSAGES)
      } catch {
        setItems(DEMO_MESSAGES)
      }
    } else {
      setItems(DEMO_MESSAGES)
    }
    setLoading(false)
  }

  async function markAsRead(id: string, read: boolean) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read } : i))
    )
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('contact_messages').update({ read }).eq('id', id)
      } catch {}
    }
  }

  async function markAsReplied(id: string, replied: boolean) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, replied } : i))
    )
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('contact_messages').update({ replied }).eq('id', id)
      } catch {}
    }
  }

  async function deleteMessage(id: string) {
    if (!window.confirm('Delete this visitor message permanently?')) return

    setItems((prev) => prev.filter((i) => i.id !== id))
    if (selectedId === id) setSelectedId(null)
    setMessageNotice('Message deleted.')
    setTimeout(() => setMessageNotice(''), 3000)

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('contact_messages').delete().eq('id', id)
      } catch {}
    }
  }

  const selected = items.find((i) => i.id === selectedId)

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                Visitor & Permit Inquiries
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-800 border border-gold-300">
                {items.filter((i) => !i.read).length} Unread
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Review and manage safari booking inquiries, research accreditations, and media permit requests.
            </p>
          </div>
        </div>

        {messageNotice && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{messageNotice}</span>
          </div>
        )}

        {/* Master-Detail Messages View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Inbox List (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-sand-50 border-b border-sand-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">Inbox</span>
              <span className="text-xs text-charcoal-600">{items.length} Total</span>
            </div>

            <div className="divide-y divide-sand-100 max-h-[600px] overflow-y-auto">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id)
                    markAsRead(item.id, true)
                  }}
                  className={cn(
                    'w-full text-left p-4 hover:bg-ivory-50 transition-all flex flex-col gap-1',
                    selectedId === item.id ? 'bg-forest-50/80 border-l-4 border-forest-800' : '',
                    !item.read ? 'bg-gold-50/40' : ''
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className={cn('text-xs font-bold text-charcoal-900 truncate', !item.read ? 'font-black' : '')}>
                      {item.name}
                    </p>
                    <span className="text-[10px] text-charcoal-600">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-charcoal-800 truncate">
                    {item.subject || '(No Subject)'}
                  </p>

                  <p className="text-[11px] text-charcoal-600 line-clamp-1">
                    {item.message}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Message Detail (7 cols) */}
          <div className="lg:col-span-7">
            {selected ? (
              <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-card space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sand-100 pb-5">
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-display font-bold text-charcoal-900">
                      {selected.subject || '(No Subject)'}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-charcoal-600">
                      <span className="font-semibold text-charcoal-900">{selected.name}</span>
                      <span>•</span>
                      <a href={`mailto:${selected.email}`} className="text-forest-800 underline">
                        {selected.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => markAsReplied(selected.id, !selected.replied)}
                      className={cn(
                        'text-xs px-3 py-1.5 rounded-xl border font-semibold transition-colors',
                        selected.replied
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-white border-sand-200 text-charcoal-700 hover:bg-sand-50'
                      )}
                    >
                      {selected.replied ? '✓ Replied' : 'Mark Replied'}
                    </button>
                    <button
                      onClick={() => deleteMessage(selected.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-xl"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-5 bg-ivory-50 rounded-2xl border border-sand-200/80 text-xs sm:text-sm text-charcoal-900 leading-relaxed whitespace-pre-wrap font-sans">
                  {selected.message}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-charcoal-600">
                  <span>Received: {new Date(selected.created_at).toLocaleString()}</span>
                  <a
                    href={`mailto:${selected.email}?subject=RE: ${encodeURIComponent(selected.subject || 'Borena National Park Inquiry')}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-forest-800 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-gold-400" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-sand-200 p-12 text-center text-charcoal-600">
                Select a message to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
