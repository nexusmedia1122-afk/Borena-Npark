'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import AdminLayout from '@/app/admin/admin-layout-client'
import {
  fetchAllGallery,
  saveGalleryItem,
  deleteGalleryItem,
} from '@/lib/data-service'
import { GalleryMedia } from '@/data/park-data'
import {
  Camera,
  Plus,
  Upload,
  ExternalLink,
  Trash2,
  MapPin,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  SlidersHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = ['Wildlife', 'Landscapes', 'Culture', 'Conservation']
const ASPECTS: Array<'wide' | 'portrait' | 'square'> = ['wide', 'portrait', 'square']

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<string>('Wildlife')
  const [aspect, setAspect] = useState<'wide' | 'portrait' | 'square'>('wide')
  const [location, setLocation] = useState('Dida Hara Savanna')
  const [photographer, setPhotographer] = useState('EWCA Scout Patrol')
  const [cameraSpecs, setCameraSpecs] = useState('Sony A1 · 400mm f/2.8 GM')
  const [caption, setCaption] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadGallery()
  }, [])

  async function loadGallery() {
    setLoading(true)
    const data = await fetchAllGallery()
    setItems(data)
    setLoading(false)
  }

  // Handle local file selection and convert to high-res data URL for instant reactivity
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setImageUrl(dataUrl)
      setPreviewUrl(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUrl) {
      alert('Please upload an image file or provide an image URL.')
      return
    }

    setSaving(true)
    const newMedia: GalleryMedia = {
      id: `custom-media-${Date.now()}`,
      title: title || 'Borana National Park Capture',
      category: category as any,
      aspect: aspect,
      imageUrl: imageUrl,
      thumbnailUrl: imageUrl,
      location: location || 'Borana National Park',
      photographer: photographer || 'EWCA Field Team',
      cameraSpecs: cameraSpecs || undefined,
      caption: caption || 'Official high-resolution documentation from Borana National Park.',
      date: new Date().toISOString().slice(0, 10),
    }

    await saveGalleryItem(newMedia)
    setSuccessMessage(`"${newMedia.title}" published! It is now live on the public website.`)
    setTimeout(() => setSuccessMessage(''), 5000)

    // Reset Form
    setTitle('')
    setImageUrl('')
    setPreviewUrl('')
    setCaption('')
    setShowUploadModal(false)
    setSaving(false)

    // Reload latest items
    loadGallery()
  }

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Are you sure you want to remove "${itemTitle}" from the public gallery?`)) return

    await deleteGalleryItem(id)
    setSuccessMessage(`Removed "${itemTitle}" from archive.`)
    setTimeout(() => setSuccessMessage(''), 4000)
    loadGallery()
  }

  const filteredItems =
    categoryFilter === 'All'
      ? items
      : items.filter((i) => i.category === categoryFilter)

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl">
        {/* Top Operational Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900">
                Photo & Media Archive Manager
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Live Public Sync Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Upload, tag, and organize photographs. New uploads appear immediately on{' '}
              <Link href="/gallery" target="_blank" className="font-semibold text-forest-800 underline">
                /gallery
              </Link>{' '}
              in latest-first order.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-sand-200 hover:border-forest-700 text-charcoal-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-forest-700" />
              <span>Preview Public Gallery</span>
            </Link>

            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold-600 hover:bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Photo</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Explanatory Public Link Info Box */}
        <div className="bg-forest-950 text-white rounded-2xl p-5 border border-forest-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-gold-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Public Website Connection
            </p>
            <p className="text-ivory-200/80">
              Every photo in this archive is served with responsive Cloudinary CDN scaling, EXIF data drawer in the fullscreen lightbox, and category filters.
            </p>
          </div>
          <Link
            href="/gallery"
            target="_blank"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gold-600 text-charcoal-950 font-bold text-[11px] uppercase tracking-wider hover:bg-gold-500 shrink-0"
          >
            <span>Open /gallery</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 pb-4">
          <div className="flex flex-wrap gap-2">
            {['All', ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all',
                  categoryFilter === cat
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'bg-white border border-sand-200 text-charcoal-700 hover:border-forest-700'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-charcoal-600 font-medium">
            Total Photos: {filteredItems.length}
          </span>
        </div>

        {/* Media Grid Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-sand-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-sand-200 p-8 shadow-sm">
            <Camera className="w-12 h-12 text-sand-300 mx-auto mb-3" />
            <p className="font-semibold text-charcoal-900">No media found in this category.</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-forest-800 hover:underline"
            >
              Upload the first photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] bg-forest-950 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-forest-950/90 text-gold-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border border-gold-500/30 backdrop-blur-sm">
                        {item.category}
                      </span>
                      {idx === 0 && (
                        <span className="bg-gold-500 text-charcoal-950 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-display font-bold text-base text-charcoal-900 leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>

                    <div className="pt-2 border-t border-sand-100 space-y-1 text-[11px] text-charcoal-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-gold-600 shrink-0" />
                        <span className="truncate">{item.photographer}</span>
                      </div>
                      {item.cameraSpecs && (
                        <div className="text-[10px] font-mono text-forest-800 truncate">
                          {item.cameraSpecs}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-ivory-50 border-t border-sand-100 flex items-center justify-between">
                  <Link
                    href="/gallery"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-forest-800 hover:text-forest-950"
                  >
                    <span>View on /gallery</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from public gallery"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== UPLOAD NEW PHOTO MODAL ===== */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-sand-200 max-h-[90vh] overflow-y-auto space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-sand-200 pb-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-charcoal-900">
                    Upload Photograph to Public Archive
                  </h3>
                  <p className="text-xs text-charcoal-600">
                    The photo will appear at the top of the public /gallery immediately.
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-charcoal-600 hover:text-charcoal-950 font-bold text-sm p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSavePhoto} className="space-y-4">
                {/* Image Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                    Select Image File or Enter URL
                  </label>
                  <div className="space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="block w-full text-xs text-charcoal-700 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-forest-900 file:text-white hover:file:bg-forest-800 cursor-pointer"
                    />
                    <div className="text-[11px] text-charcoal-600 font-medium">or paste image URL:</div>
                    <input
                      type="url"
                      value={imageUrl.startsWith('data:') ? '' : imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value)
                        setPreviewUrl(e.target.value)
                      }}
                      placeholder="https://res.cloudinary.com/d39v3q6s/... or Cloudinary Public ID"
                      className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                    />
                  </div>

                  {/* Live Preview */}
                  {previewUrl && (
                    <div className="mt-3 relative aspect-[16/10] rounded-2xl overflow-hidden border border-sand-200 bg-forest-950">
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                        Live Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                    Photograph Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Grevy's Zebras at Dawn Gathering"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-sm outline-none focus:border-forest-700"
                  />
                </div>

                {/* Category & Aspect Ratio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700 bg-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                      Aspect Ratio
                    </label>
                    <select
                      value={aspect}
                      onChange={(e) => setAspect(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700 bg-white"
                    >
                      <option value="wide">Wide (16:9 / 4:3)</option>
                      <option value="portrait">Portrait (3:4)</option>
                      <option value="square">Square (1:1)</option>
                    </select>
                  </div>
                </div>

                {/* Location & Photographer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                      Location Tag
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. El Sod Caldera Rim"
                      className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                      Photographer Credit
                    </label>
                    <input
                      type="text"
                      value={photographer}
                      onChange={(e) => setPhotographer(e.target.value)}
                      placeholder="e.g. EWCA Field Scout"
                      className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                    />
                  </div>
                </div>

                {/* Camera EXIF Specs */}
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                    Camera Specs / EXIF (Optional)
                  </label>
                  <input
                    type="text"
                    value={cameraSpecs}
                    onChange={(e) => setCameraSpecs(e.target.value)}
                    placeholder="e.g. Sony A1 · 400mm f/2.8 · 1/2500s · ISO 200"
                    className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs font-mono outline-none focus:border-forest-700"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-xs font-bold uppercase text-charcoal-700 mb-1.5">
                    Editorial Caption / Context
                  </label>
                  <textarea
                    rows={2}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Brief description of the subject or wildlife observation..."
                    className="w-full px-3.5 py-2 rounded-xl border border-sand-200 text-xs outline-none focus:border-forest-700"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-sand-200">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-charcoal-700 hover:bg-sand-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm disabled:opacity-60"
                  >
                    {saving ? 'Publishing...' : 'Publish to Public Gallery'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
