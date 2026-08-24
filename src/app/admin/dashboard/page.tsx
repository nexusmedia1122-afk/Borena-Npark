'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import {
  fetchAllWildlife,
  fetchAllStories,
  fetchAllGallery,
  fetchAllMapPOIs,
} from '@/lib/data-service'
import {
  Shield,
  BookOpen,
  Camera,
  MapPin,
  FileCheck,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Plus,
} from 'lucide-react'

interface StatCard {
  label: string
  value: number
  href: string
  color: string
  icon: any
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
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      if (isSupabaseConfigured()) {
        const [
          wildlifeRes,
          storiesRes,
          mediaRes,
          locationsRes,
          messagesRes,
          activityRes,
        ] = await Promise.all([
          supabase.from('contents').select('*', { count: 'exact', head: true }).eq('type', 'wildlife'),
          supabase.from('contents').select('*', { count: 'exact', head: true }).eq('type', 'story'),
          supabase.from('media').select('*', { count: 'exact', head: true }),
          supabase.from('map_locations').select('*', { count: 'exact', head: true }),
          supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('read', false),
          supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(6),
        ])

        setStats([
          { label: 'Wildlife Species', value: wildlifeRes.count || 0, href: '/admin/wildlife', color: 'bg-forest-800 text-gold-300', icon: Shield },
          { label: 'Field Stories', value: storiesRes.count || 0, href: '/admin/stories', color: 'bg-earth-800 text-earth-200', icon: BookOpen },
          { label: 'Media Archive', value: mediaRes.count || 0, href: '/admin/gallery', color: 'bg-gold-600 text-charcoal-950', icon: Camera },
          { label: 'Map Landmarks', value: locationsRes.count || 0, href: '/admin/locations', color: 'bg-forest-600 text-white', icon: MapPin },
          { label: 'Permit Inquiries', value: messagesRes.count || 0, href: '/admin/messages', color: 'bg-charcoal-800 text-gold-400', icon: MessageSquare },
        ])

        if (activityRes.data && activityRes.data.length > 0) {
          setActivities(activityRes.data)
        }
      } else {
        // Resilient Fallback to local verified dataset
        setIsDemoMode(true)
        const [wildlife, stories, gallery, pois] = await Promise.all([
          fetchAllWildlife(),
          fetchAllStories(),
          fetchAllGallery(),
          fetchAllMapPOIs(),
        ])

        setStats([
          { label: 'Wildlife Species', value: wildlife.length, href: '/admin/wildlife', color: 'bg-forest-800 text-gold-300', icon: Shield },
          { label: 'Field Stories', value: stories.length, href: '/admin/stories', color: 'bg-earth-800 text-earth-200', icon: BookOpen },
          { label: 'Media Archive', value: gallery.length, href: '/admin/gallery', color: 'bg-gold-600 text-charcoal-950', icon: Camera },
          { label: 'Map Landmarks', value: pois.length, href: '/admin/locations', color: 'bg-forest-600 text-white', icon: MapPin },
          { label: 'Permit Inquiries', value: 3, href: '/admin/messages', color: 'bg-charcoal-800 text-gold-400', icon: MessageSquare },
        ])

        setActivities([
          { id: '1', action: 'Grevy’s Zebra Census Dossier Updated', content_type: 'wildlife', created_at: new Date().toISOString() },
          { id: '2', action: 'El Sod Crater Elevation Map Verified', content_type: 'map', created_at: new Date(Date.now() - 3600000).toISOString() },
          { id: '3', action: 'Tula Singing Wells Heritage Gallery Added', content_type: 'media', created_at: new Date(Date.now() - 7200000).toISOString() },
        ])
      }
    } catch {
      console.error('Error loading dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Header with Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                Park CMS Dashboard
              </h1>
              {isDemoMode && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-800 border border-gold-300">
                  Local / Demo Mode
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Manage biodiversity records, field research dispatches, photographic assets, and visitor inquiries.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/wildlife/new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-gold-400" />
              <span>Add Species</span>
            </Link>
            <Link
              href="/admin/stories/new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-earth-800 hover:bg-earth-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 text-gold-400" />
              <span>New Dispatch</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-sand-200 hover:border-forest-700 text-charcoal-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-forest-700" />
              <span>View Live Site</span>
            </Link>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-28 bg-sand-100 rounded-2xl animate-pulse" />
              ))
            : stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Link
                    key={stat.label}
                    href={stat.href}
                    className="group bg-white rounded-2xl border border-sand-200 p-5 shadow-sm hover:shadow-card hover:border-gold-500/50 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-charcoal-600">{stat.label}</span>
                      <div className={`w-7 h-7 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <p className="text-3xl font-display font-bold text-charcoal-900 mt-3 group-hover:text-forest-800 transition-colors">
                      {stat.value}
                    </p>
                  </Link>
                )
              })}
        </div>

        {/* Content Management Modules & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quick Management Shortcuts (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-sand-200 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-charcoal-900 text-lg border-b border-sand-100 pb-3">
              Content Management Sections
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/admin/wildlife"
                className="p-4 rounded-xl border border-sand-200 hover:border-forest-700 hover:bg-forest-50/50 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-charcoal-900">Wildlife Encyclopedia</span>
                  <Shield className="w-4 h-4 text-forest-700" />
                </div>
                <p className="text-xs text-charcoal-600">
                  Update IUCN statuses, habitats, and ranger viewing tips.
                </p>
              </Link>

              <Link
                href="/admin/stories"
                className="p-4 rounded-xl border border-sand-200 hover:border-earth-700 hover:bg-earth-50/50 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-charcoal-900">Field Dispatches</span>
                  <BookOpen className="w-4 h-4 text-earth-700" />
                </div>
                <p className="text-xs text-charcoal-600">
                  Publish scientific research and community stories.
                </p>
              </Link>

              <Link
                href="/admin/gallery"
                className="p-4 rounded-xl border border-sand-200 hover:border-gold-600 hover:bg-gold-50/50 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-charcoal-900">Photographic Archive</span>
                  <Camera className="w-4 h-4 text-gold-600" />
                </div>
                <p className="text-xs text-charcoal-600">
                  Manage high-resolution Cloudinary media records.
                </p>
              </Link>

              <Link
                href="/admin/locations"
                className="p-4 rounded-xl border border-sand-200 hover:border-forest-700 hover:bg-forest-50/50 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-charcoal-900">GIS Map Landmarks</span>
                  <MapPin className="w-4 h-4 text-forest-700" />
                </div>
                <p className="text-xs text-charcoal-600">
                  Add verified GPS coordinates, gates, and camp sites.
                </p>
              </Link>
            </div>
          </div>

          {/* Recent Operations Log (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-sand-200 p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-charcoal-900 text-lg border-b border-sand-100 pb-3">
              Recent Activity Log
            </h3>

            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 py-2 border-b border-sand-100 last:border-0 text-xs">
                  <div className="w-2 h-2 bg-gold-600 rounded-full mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-charcoal-900">{activity.action}</p>
                    <div className="flex items-center justify-between text-charcoal-600 text-[11px] mt-0.5">
                      <span className="capitalize">{activity.content_type || 'System'}</span>
                      <span>{new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
