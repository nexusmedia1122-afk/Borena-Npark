import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export default function HomepageEditor() {
  const [settings, setSettings] = useState({
    hero_title: '', hero_subtitle: '', hero_image: '', hero_cta: '', hero_cta_link: '',
    featured_wildlife: '', featured_stories: '', featured_experiences: ''
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
      const { data } = await supabase.from('site_settings').select('*').in('key', ['homepage_hero', 'homepage_featured_wildlife', 'homepage_featured_stories', 'homepage_featured_experiences'])
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
      const heroData = { key: 'homepage_hero', value: { title: settings.hero_title, subtitle: settings.hero_subtitle, image: settings.hero_image, cta: settings.hero_cta, cta_link: settings.hero_cta_link } }
      const wildlifeData = { key: 'homepage_featured_wildlife', value: { ids: settings.featured_wildlife ? settings.featured_wildlife.split(',').map(s => s.trim()) : [] } }
      const storiesData = { key: 'homepage_featured_stories', value: { ids: settings.featured_stories ? settings.featured_stories.split(',').map(s => s.trim()) : [] } }
      const experiencesData = { key: 'homepage_featured_experiences', value: { ids: settings.featured_experiences ? settings.featured_experiences.split(',').map(s => s.trim()) : [] } }
      await Promise.all([
        supabase.from('site_settings').upsert(heroData),
        supabase.from('site_settings').upsert(wildlifeData),
        supabase.from('site_settings').upsert(storiesData),
        supabase.from('site_settings').upsert(experiencesData)
      ])
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
        <h1 className="text-2xl font-bold text-slate-900">Homepage Editor</h1>
        <p className="text-slate-600">Edit homepage settings and featured sections</p>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">Settings saved successfully!</div>}
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Hero Title</label>
              <input type="text" value={settings.hero_title} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Hero Subtitle</label>
              <textarea value={settings.hero_subtitle} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} rows={2} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Hero Image URL</label>
              <input type="url" value={settings.hero_image} onChange={(e) => setSettings({ ...settings, hero_image: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>CTA Text</label>
              <input type="text" value={settings.hero_cta} onChange={(e) => setSettings({ ...settings, hero_cta: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>CTA Link</label>
              <input type="text" value={settings.hero_cta_link} onChange={(e) => setSettings({ ...settings, hero_cta_link: e.target.value })} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Featured Sections</h2>
          <p className="text-sm text-slate-600 mb-4">Enter comma-separated content IDs for featured items</p>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Featured Wildlife IDs</label>
              <input type="text" value={settings.featured_wildlife} onChange={(e) => setSettings({ ...settings, featured_wildlife: e.target.value })} className={inputClass} placeholder="e.g. uuid1, uuid2, uuid3" />
            </div>
            <div>
              <label className={labelClass}>Featured Stories IDs</label>
              <input type="text" value={settings.featured_stories} onChange={(e) => setSettings({ ...settings, featured_stories: e.target.value })} className={inputClass} placeholder="e.g. uuid1, uuid2, uuid3" />
            </div>
            <div>
              <label className={labelClass}>Featured Experiences IDs</label>
              <input type="text" value={settings.featured_experiences} onChange={(e) => setSettings({ ...settings, featured_experiences: e.target.value })} className={inputClass} placeholder="e.g. uuid1, uuid2, uuid3" />
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
