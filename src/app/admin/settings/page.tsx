'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/app/admin/admin-layout-client'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import {
  Settings,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Radio,
  Clock,
  Sparkles,
} from 'lucide-react'

const DEFAULT_SETTINGS = {
  park_name: 'Borena National Park',
  oromo_name: 'Paarkii Biyyooleessa Booranaa',
  hq_address: 'Yabelo, Borena Zone, Southern Ethiopia',
  emergency_phone: '+251 46 443 0122',
  emergency_radio: 'VHF Ch 14 / 154.600 MHz',
  visiting_hours: '06:00 – 18:30 EAT Daily',
  statutory_entry_fee_intl: '20',
  statutory_entry_fee_res: '10',
  statutory_entry_fee_nat: '50',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    setLoading(true)
    try {
      const stored = localStorage.getItem('bnp_site_settings')
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) })
      }
    } catch {}
    setLoading(false)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      localStorage.setItem('bnp_site_settings', JSON.stringify(settings))
      setMessage('Park operational settings saved successfully!')
      setTimeout(() => setMessage(''), 4000)
    } catch (err: any) {
      alert('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                Park Headquarters & Institutional Settings
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Configure global park contact information, emergency VHF frequencies, visiting hours, and fee structures.
            </p>
          </div>
        </div>

        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Institutional Names */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-display font-bold text-charcoal-900 border-b border-sand-100 pb-2">
              Institutional Identity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Official English Title
                </label>
                <input
                  type="text"
                  value={settings.park_name}
                  onChange={(e) => setSettings({ ...settings, park_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm outline-none focus:border-forest-700 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Official Afaan Oromo Title
                </label>
                <input
                  type="text"
                  value={settings.oromo_name}
                  onChange={(e) => setSettings({ ...settings, oromo_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm italic font-serif outline-none focus:border-forest-700"
                />
              </div>
            </div>
          </div>

          {/* Operations & Emergency VHF */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-display font-bold text-charcoal-900 border-b border-sand-100 pb-2">
              Headquarters & Emergency Communications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  HQ Physical Address
                </label>
                <input
                  type="text"
                  value={settings.hq_address}
                  onChange={(e) => setSettings({ ...settings, hq_address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Emergency Ranger Phone
                </label>
                <input
                  type="text"
                  value={settings.emergency_phone}
                  onChange={(e) => setSettings({ ...settings, emergency_phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs font-mono outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Emergency VHF Radio Frequency
                </label>
                <input
                  type="text"
                  value={settings.emergency_radio}
                  onChange={(e) => setSettings({ ...settings, emergency_radio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs font-mono outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Visitor Gate Hours
                </label>
                <input
                  type="text"
                  value={settings.visiting_hours}
                  onChange={(e) => setSettings({ ...settings, visiting_hours: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
