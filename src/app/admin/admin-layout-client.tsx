'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { cn } from '@/lib/utils'

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user) router.replace('/admin/login')
    else if (!profile?.role || !['admin', 'editor'].includes(profile.role))
      router.replace('/')
  }, [user, profile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50">
        <div className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  if (!user || !profile?.role || !['admin', 'editor'].includes(profile.role)) return null
  return <>{children}</>
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-ivory-50 flex">
        <aside className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-forest-900 text-ivory-50 transform transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="p-6">
            <Link href="/admin/dashboard" className="text-xl font-display font-semibold text-gold-400 hover:text-gold-300">
              Admin
            </Link>
          </div>
          <nav className="px-4 space-y-1">
            {[
              { href: '/admin/dashboard', label: 'Dashboard' },
              { href: '/admin/wildlife', label: 'Wildlife' },
              { href: '/admin/stories', label: 'Stories' },
              { href: '/admin/gallery', label: 'Gallery' },
              { href: '/admin/locations', label: 'Locations' },
              { href: '/admin/messages', label: 'Messages' },
              { href: '/admin/settings', label: 'Settings' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="block px-4 py-2.5 rounded-lg text-ivory-200 hover:bg-forest-700 hover:text-ivory-50 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="border-t border-forest-700 pt-4">
              {user?.email && <p className="text-sm text-ivory-300 px-4 mb-2">{user.email}</p>}
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-ivory-200 hover:text-white transition-colors">
                Logout
              </button>
            </div>
          </div>
        </aside>
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <main className="flex-1 lg:ml-64 min-h-screen">
          <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-sand-200">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-sand-100 text-forest-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <Link href="/admin/dashboard" className="font-display font-semibold text-forest-900">Admin</Link>
            <div className="w-8" />
          </header>
          <div className="p-6 lg:p-10 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
