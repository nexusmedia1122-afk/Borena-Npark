'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import { saveWildlifeItem } from '@/lib/data-service'
import { WildlifeSpecies } from '@/data/park-data'
import {
  Shield,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Mammals', 'Birds', 'Endemics', 'Reptiles']
const STATUSES = [
  { code: 'LC', label: 'Least Concern' },
  { code: 'NT', label: 'Near Threatened' },
  { code: 'VU', label: 'Vulnerable' },
  { code: 'EN', label: 'Endangered' },
  { code: 'CR', label: 'Critically Endangered' },
]

export default function NewWildlifePage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [scientificName, setScientificName] = useState('')
  const [category, setCategory] = useState('Mammals')
  const [conservationStatus, setConservationStatus] = useState('EN')
  const [habitat, setHabitat] = useState('Acacia savanna and grassland plains')
  const [diet, setDiet] = useState('Herbivorous browser and grazer')
  const [behavior, setBehavior] = useState('Diurnal herd activity with matriarch leadership')
  const [viewingTip, setViewingTip] = useState('Early morning game drives on Dida Hara Plains')
  const [imageUrl, setImageUrl] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)
  const [successLink, setSuccessLink] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (title && !slug) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      )
    }
  }, [title, slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !imageUrl) {
      alert('Please fill out the title and image URL.')
      return
    }

    setSaving(true)
    const activeStatus = STATUSES.find((s) => s.code === conservationStatus)
    const newSpecies: WildlifeSpecies = {
      id: `custom-wildlife-${Date.now()}`,
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      scientificName: scientificName || 'Fauna aethiopica',
      category: category as any,
      conservationStatus: conservationStatus as any,
      statusLabel: activeStatus?.label || 'Protected',
      habitat,
      diet,
      behavior,
      viewingTip,
      imageUrl,
      excerpt: excerpt || `${title} protected inside Borana National Park.`,
      body: body || excerpt || `${title} is an integral species in the southern Ethiopian savanna ecosystem.`,
      gallery: [imageUrl],
    }

    await saveWildlifeItem(newSpecies)
    setSuccessLink(`/wildlife/${newSpecies.slug}`)
    setSaving(false)
  }

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                Add New Wildlife Species
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Instant Public Dossier
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Published species dossiers appear immediately on the public{' '}
              <Link href="/wildlife" target="_blank" className="font-semibold text-forest-800 underline">
                /wildlife
              </Link>{' '}
              directory.
            </p>
          </div>

          <Link
            href="/admin/wildlife"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-charcoal-700 bg-white border border-sand-200 hover:bg-sand-50"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel
          </Link>
        </div>

        {/* Success Banner */}
        {successLink && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-5 rounded-2xl space-y-2 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Species Successfully Published!</span>
            </div>
            <p className="text-xs text-emerald-800">
              Your new species dossier has been created and is now live on the public website.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href={successLink}
                target="_blank"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-forest-800"
              >
                <span>View Live Species Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
              </Link>
              <Link
                href="/admin/wildlife"
                className="text-xs text-emerald-800 font-semibold underline"
              >
                Back to Species Manager
              </Link>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Taxonomy & Identification */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-display font-bold text-charcoal-900 border-b border-sand-100 pb-2">
              1. Nomenclature & Taxonomy
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Common Name
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Grevy's Zebra"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Scientific (Latin) Name
                </label>
                <input
                  type="text"
                  required
                  value={scientificName}
                  onChange={(e) => setScientificName(e.target.value)}
                  placeholder="e.g. Equus grevyi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm italic font-serif outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="grevys-zebra"
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs font-mono outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700 bg-white"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  IUCN Threat Status
                </label>
                <select
                  value={conservationStatus}
                  onChange={(e) => setConservationStatus(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700 bg-white font-semibold"
                >
                  {STATUSES.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.code} - {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Image & Field Media */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-display font-bold text-charcoal-900 border-b border-sand-100 pb-2">
              2. Photography & Cover Image
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                Featured Photograph URL
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/d39v3q6s/... or Cloudinary Public ID"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700 font-mono"
              />
            </div>

            {imageUrl && (
              <div className="relative aspect-[16/10] max-w-sm rounded-2xl overflow-hidden border border-sand-200 bg-forest-950">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Section 3: Ecology & Ranger Tips */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-display font-bold text-charcoal-900 border-b border-sand-100 pb-2">
              3. Ecological Profile & Viewing Advice
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Habitat Zone
                </label>
                <input
                  type="text"
                  value={habitat}
                  onChange={(e) => setHabitat(e.target.value)}
                  placeholder="e.g. Acacia savanna and shrubland"
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                  Ranger Viewing Tip
                </label>
                <input
                  type="text"
                  value={viewingTip}
                  onChange={(e) => setViewingTip(e.target.value)}
                  placeholder="e.g. Early morning 06:00–08:30 at waterpans"
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                Field Dossier Description
              </label>
              <textarea
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Comprehensive scientific description of the species biology, herd size, and Borana conservation status..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/wildlife"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-sand-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all disabled:opacity-60"
            >
              {saving ? 'Publishing...' : 'Publish Species to Public Directory'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
