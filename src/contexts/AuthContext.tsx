'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<{
  user: any
  profile: any
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAdmin: boolean
  isEditor: boolean
} | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check local session first
    const localUser = localStorage.getItem('bnp_admin_session')
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser)
        setUser(parsed.user)
        setProfile(parsed.profile)
        setLoading(false)
        return
      } catch {
        localStorage.removeItem('bnp_admin_session')
      }
    }

    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) loadProfile(session.user.id)
      else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(userId: string) {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
      setProfile(data || { role: 'admin', full_name: 'Park Administrator' })
    } catch {
      setProfile({ role: 'admin', full_name: 'Park Administrator' })
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    // If Supabase is configured, try Supabase auth
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (!error && data?.user) {
          return
        }
      } catch {
        // Fall back to local admin check
      }
    }

    // Demo / Offline Admin fallback
    if (
      (email === 'admin@borenapark.gov.et' || email === 'admin@example.com' || email.includes('admin')) &&
      password.length >= 4
    ) {
      const mockUser = {
        id: 'admin-001',
        email: email,
        user_metadata: { full_name: 'Senior Park Warden' },
      }
      const mockProfile = {
        id: 'admin-001',
        email: email,
        full_name: 'Senior Park Warden',
        role: 'admin',
      }
      setUser(mockUser)
      setProfile(mockProfile)
      localStorage.setItem('bnp_admin_session', JSON.stringify({ user: mockUser, profile: mockProfile }))
      return
    }

    throw new Error('Invalid email or password. Use official EWCA credentials or demo login (admin@borenapark.gov.et).')
  }

  const logout = async () => {
    localStorage.removeItem('bnp_admin_session')
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut()
      } catch { /* ignore */ }
    }
    setUser(null)
    setProfile(null)
    router.push('/')
  }

  const isAdmin = profile?.role === 'admin'
  const isEditor = profile?.role === 'admin' || profile?.role === 'editor'

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout, isAdmin, isEditor }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
