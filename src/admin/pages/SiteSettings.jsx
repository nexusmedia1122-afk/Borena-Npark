import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    park_name: '', park_description: '', logo_url: '', contact_email: '', contact_phone: '', address: '',
    facebook: '', twitter: '', instagram: '', youtube: '',
    seo_title: '', seo_description: '', seo_keywords: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured()) { setLoading(false); return }
    loadSettings()
  }, [])

  async function loadSettings() {
    setLoading(true)
    setError(null)
    try {
      const { data } = await supabase.from('site_settings').select('*')
      const map = {}
      if (data) data.forEach(s => { map[s.key] = s.value })
      setSettings(prev => ({ ...prev, ...map }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const entries = Object.entries(settings).map(([key, value]) => ({ key, value }))
      await supabase.from('site_settings').upsert(entries)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!isSupabaseConfigured()) return <div className="text-center py-12 text-slate-600">Supabase is not configured.</div>
  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" /></div>

  const inputClass = "w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
  const labelClass = "block text-sm font-medium text-slate-700 mb-1"

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-slate-600">Manage global site settings</p>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">Settings saved successfully!</div>}
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Park Name</label>
              <input type="text" value={settings.park_name} onChange={(e) => setSettings({ ...settings, park_name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Park Description</label>
              <textarea value={settings.park_description} onChange={(e) => setSettings({ ...settings, park_description: e.target.value })} rows={2} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input type="url" value={settings.logo_url} onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Contact Email</label>
              <input type="email" value={settings.contact_email} onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contact Phone</label>
              <input type="tel" value={settings.contact_phone} onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Address</label>
            <textarea value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} rows={2} className={inputClass} />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Facebook URL</label>
              <input type="url" value={settings.facebook} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Twitter URL</label>
              <input type="url" value={settings.twitter} onChange={(e) => setSettings({ ...settings, twitter: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input type="url" value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>YouTube URL</label>
              <input type="url" value={settings.youtube} onChange={(e) => setSettings({ ...settings, youtube: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">SEO Defaults</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Default SEO Title</label>
              <input type="text" value={settings.seo_title} onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Default SEO Description</label>
              <textarea value={settings.seo_description} onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })} rows={2} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Default SEO Keywords</label>
              <input type="text" value={settings.seo_keywords} onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 disabled:opacity-50">{saving ? 'Saving...' : 'Save Settings'}</button>
        </div>
      </div>
    </div>
  )
}
