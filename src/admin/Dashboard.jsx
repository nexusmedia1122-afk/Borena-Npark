import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const STATS = [
  { id: 'wildlife', label: 'Total Wildlife', query: 'contents', filter: { type: 'wildlife' } },
  { id: 'stories', label: 'Total Stories', query: 'contents', filter: { type: 'story' } },
  { id: 'experiences', label: 'Total Experiences', query: 'contents', filter: { type: 'experience' } },
  { id: 'gallery', label: 'Total Gallery Images', query: 'media', filter: {} },
  { id: 'locations', label: 'Total Locations', query: 'map_locations', filter: {} },
]

export default function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState({})
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }
    loadData()
  }, [])

  async function loadData() {
    try {
      const [wildlifeRes, storiesRes, experiencesRes, mediaRes, locationsRes, draftRes, publishedRes, messagesRes, activityRes] = await Promise.all([
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('type', 'wildlife'),
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('type', 'story'),
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('type', 'experience'),
        supabase.from('media').select('*', { count: 'exact', head: true }),
        supabase.from('map_locations').select('*', { count: 'exact', head: true }),
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('read', false),
        supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(5)
      ])

      setStats({
        wildlife: wildlifeRes.count || 0,
        stories: storiesRes.count || 0,
        experiences: experiencesRes.count || 0,
        gallery: mediaRes.count || 0,
        locations: locationsRes.count || 0,
        drafts: draftRes.count || 0,
        published: publishedRes.count || 0,
        unreadMessages: messagesRes.count || 0
      })

      setRecent(activityRes.data || [])
    } catch (err) {
      console.error('Failed to load dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Welcome back. Here's what's happening with your park website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Wildlife', value: stats.wildlife, page: 'wildlife' },
          { label: 'Total Stories', value: stats.stories, page: 'stories' },
          { label: 'Total Experiences', value: stats.experiences, page: 'experiences' },
          { label: 'Gallery Images', value: stats.gallery, page: 'media' },
          { label: 'Locations', value: stats.locations, page: 'map-locations' },
          { label: 'Draft Content', value: stats.drafts, page: 'wildlife' },
          { label: 'Published Content', value: stats.published, page: 'wildlife' },
          { label: 'Unread Messages', value: stats.unreadMessages, page: 'messages' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-lg border border-slate-200 p-4 hover:border-green-400 transition-colors cursor-pointer" onClick={() => onNavigate(stat.page)}>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
        {recent.length === 0 ? (
          <p className="text-slate-500">No recent activity.</p>
        ) : (
          <div className="space-y-3">
            {recent.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700">{activity.action}</p>
                  <p className="text-xs text-slate-500">{new Date(activity.created_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
