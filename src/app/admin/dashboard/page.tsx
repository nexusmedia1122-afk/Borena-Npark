'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface StatCard {
  label: string
  value: number
  href: string
  color: string
}

interface ActivityItem {
  id: string
  action: string
  content_type: string | null
  created_at: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatCard[]>([])
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      setError('Supabase not configured')
      return
    }
    loadData()
  }, [])

  async function loadData() {
    try {
      const [
        wildlifeRes,
        storiesRes,
        mediaRes,
        locationsRes,
        draftRes,
        messagesRes,
        activityRes,
      ] = await Promise.all([
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('type', 'wildlife'),
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('type', 'story'),
        supabase.from('media').select('*', { count: 'exact', head: true }),
        supabase.from('map_locations').select('*', { count: 'exact', head: true }),
        supabase.from('contents').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('read', false),
        supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(10),
      ])

      setStats([
        { label: 'Wildlife', value: wildlifeRes.count || 0, href: '/admin/wildlife', color: 'bg-forest-700' },
        { label: 'Stories', value: storiesRes.count || 0, href: '/admin/stories', color: 'bg-earth-700' },
        { label: 'Media', value: mediaRes.count || 0, href: '/admin/gallery', color: 'bg-gold-600' },
        { label: 'Locations', value: locationsRes.count || 0, href: '/admin/locations', color: 'bg-forest-500' },
        { label: 'Drafts', value: draftRes.count || 0, href: '/admin/wildlife', color: 'bg-charcoal-700' },
        { label: 'Unread Messages', value: messagesRes.count || 0, href: '/admin/messages', color: 'bg-gold-500' },
      ])

      if (activityRes.data) setActivities(activityRes.data)
    } catch {
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (!isSupabaseConfigured()) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-semibold text-charcoal-900">Dashboard</h1>
          <p className="mt-1 text-charcoal-700">Overview of your site content</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={loadData} className="text-sm underline font-medium">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-sand-200 p-6 animate-pulse">
                <div className="h-4 bg-sand-100 rounded w-1/2 mb-3" />
                <div className="h-8 bg-sand-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map(stat => (
              <Link key={stat.label} href={stat.href} className="block">
                <div className="bg-white rounded-xl border border-sand-200 p-6 hover:shadow-md transition-shadow">
                  <div className={`w-2 h-8 ${stat.color} rounded-full mb-4`} />
                  <p className="text-sm text-charcoal-700 mb-1">{stat.label}</p>
                  <p className="text-3xl font-display font-semibold text-charcoal-900">{stat.value}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="bg-white rounded-xl border border-sand-200 p-6">
          <h2 className="text-lg font-display font-semibold text-charcoal-900 mb-4">Recent Activity</h2>
          {activities.length === 0 ? (
            <p className="text-charcoal-700 text-sm">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-sand-100 last:border-0">
                  <div className="w-2 h-2 bg-gold-500 rounded-full mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-charcoal-900">{activity.action.replace(/_/g, ' ')}</p>
                    {activity.content_type && (
                      <p className="text-xs text-charcoal-700 mt-0.5 capitalize">{activity.content_type}</p>
                    )}
                    <p className="text-xs text-charcoal-700 mt-0.5">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
