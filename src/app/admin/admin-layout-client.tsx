'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboard,
  Shield,
  BookOpen,
  Camera,
  MapPin,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/admin/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ivory-50 gap-3">
        <div className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
          Verifying Staff Credentials...
        </p>
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/wildlife', label: 'Wildlife', icon: Shield },
  { href: '/admin/stories', label: 'Stories', icon: BookOpen },
  { href: '/admin/gallery', label: 'Gallery', icon: Camera },
  { href: '/admin/locations', label: 'Locations', icon: MapPin },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-ivory-50 flex font-sans">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 w-64 bg-forest-950 text-ivory-50 transform transition-transform duration-200 lg:translate-x-0 border-r border-forest-800/80 flex flex-col justify-between',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div>
            {/* Brand */}
            <div className="p-6 border-b border-forest-900 flex items-center justify-between">
              <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-gold-400/60 overflow-hidden shrink-0 flex items-center justify-center">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain transform scale-110" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg text-white leading-none">Borena</span>
                  <span className="text-[9px] uppercase tracking-wider text-gold-400 font-semibold mt-1">
                    Staff CMS
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-ivory-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all',
                      isActive
                        ? 'bg-forest-900 text-gold-300 shadow-sm ring-1 ring-gold-500/30'
                        : 'text-ivory-200 hover:bg-forest-900/60 hover:text-white'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Bottom user card & logout */}
          <div className="p-4 border-t border-forest-900 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-forest-900/50 hover:bg-forest-900 text-[11px] font-semibold text-ivory-200 transition-colors"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
            </Link>

            <div className="pt-2 border-t border-forest-900/60 flex items-center justify-between px-2">
              <div className="truncate pr-2">
                <p className="text-[11px] font-bold text-white truncate">{user?.email || 'admin'}</p>
                <p className="text-[9px] uppercase tracking-wider text-gold-400">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-ivory-300 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
          {/* Mobile Top Header */}
          <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-forest-950 text-white border-b border-forest-800">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-ivory-200 hover:text-white"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-white">Borena Staff Portal</span>
            </div>
            <div className="w-6" />
          </header>

          <main className="p-6 sm:p-10 max-w-7xl w-full mx-auto flex-1">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  )
}
