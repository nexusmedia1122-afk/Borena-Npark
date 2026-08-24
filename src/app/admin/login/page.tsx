'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Shield, Sparkles, Lock, ArrowLeft } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, user, profile } = useAuth()
  const router = useRouter()

  if (user && profile?.role && ['admin', 'editor'].includes(profile.role)) {
    router.replace('/admin/dashboard')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setEmail('admin@borenapark.gov.et')
    setPassword('admin1234')
    setError('')
    setLoading(true)
    try {
      await login('admin@borenapark.gov.et', 'admin1234')
      router.push('/admin/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-50 px-4 font-sans">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-forest-900 border border-gold-500/40 text-gold-400 font-display font-bold text-xl mb-3 shadow-sm">
            B
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-forest-950">
            EWCA Staff Portal
          </h1>
          <p className="mt-1 text-xs text-charcoal-700">
            Borena National Park Content Management & Operations
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-card border border-sand-200 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs leading-relaxed">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                Staff Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-sand-200 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-sm transition-all"
                placeholder="admin@borenapark.gov.et"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-sand-200 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 outline-none text-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-900 text-ivory-50 font-semibold py-3 rounded-xl hover:bg-forest-800 transition-colors disabled:opacity-60 text-sm shadow-sm"
            >
              {loading ? 'Authenticating...' : 'Sign In to Operations'}
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-4 border-t border-sand-200">
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gold-500 hover:bg-gold-400 text-charcoal-900 font-semibold text-xs rounded-xl shadow-sm transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>One-Click Demo Admin Login</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-charcoal-700">
          <Link href="/" className="inline-flex items-center gap-1 text-forest-800 hover:text-forest-950 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Public National Park Website
          </Link>
        </p>
      </div>
    </div>
  )
}
