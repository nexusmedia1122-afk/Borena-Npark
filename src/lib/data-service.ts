import { supabase, isSupabaseConfigured } from './supabase'
import {
  OFFICIAL_WILDLIFE,
  OFFICIAL_STORIES,
  OFFICIAL_GALLERY,
  OFFICIAL_MAP_POIS,
  WildlifeSpecies,
  ParkStory,
  GalleryMedia,
  MapPOI,
} from '@/data/park-data'

// Storage keys
const STORAGE_KEYS = {
  GALLERY: 'bnp_custom_gallery',
  WILDLIFE: 'bnp_custom_wildlife',
  STORIES: 'bnp_custom_stories',
  LOCATIONS: 'bnp_custom_locations',
}

function getLocalStore<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function setLocalStore<T>(key: string, items: T[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(items))
  } catch (err) {
    console.error('Failed to save to localStorage:', err)
  }
}

// ==========================================
// 1. GALLERY MEDIA
// ==========================================

export async function fetchAllGallery(): Promise<GalleryMedia[]> {
  const localCustom = getLocalStore<GalleryMedia>(STORAGE_KEYS.GALLERY)

  if (!isSupabaseConfigured()) {
    // Return custom uploads first, then official baseline
    return [...localCustom, ...OFFICIAL_GALLERY]
  }

  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return [...localCustom, ...OFFICIAL_GALLERY]
    }

    const mappedSupabase: GalleryMedia[] = data.map((m: any) => ({
      id: m.id,
      title: m.title || m.filename || 'Borana National Park',
      caption: m.caption || m.alt_text || 'Scenic documentation from Borana National Park.',
      category: m.category || 'Landscapes',
      imageUrl: m.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=75',
      thumbnailUrl: m.thumbnail_url || m.url,
      photographer: m.photographer || 'EWCA Media',
      location: m.location || 'Borana National Park',
      date: m.created_at ? m.created_at.slice(0, 10) : '2026-02-01',
      aspect: m.aspect || 'wide',
      cameraSpecs: m.camera_specs || undefined,
    }))

    return [...localCustom, ...mappedSupabase]
  } catch {
    return [...localCustom, ...OFFICIAL_GALLERY]
  }
}

export async function saveGalleryItem(item: GalleryMedia): Promise<GalleryMedia> {
  // 1. Prepend to local storage for immediate public view
  const current = getLocalStore<GalleryMedia>(STORAGE_KEYS.GALLERY)
  const updated = [item, ...current.filter((i) => i.id !== item.id)]
  setLocalStore(STORAGE_KEYS.GALLERY, updated)

  // 2. Persist to Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      await supabase.from('media').insert({
        id: item.id,
        title: item.title,
        filename: item.title,
        url: item.imageUrl,
        thumbnail_url: item.thumbnailUrl,
        alt_text: item.caption,
        category: item.category,
        photographer: item.photographer,
        location: item.location,
        camera_specs: item.cameraSpecs,
        mime_type: 'image/jpeg',
        created_at: new Date().toISOString(),
      } as any)
    } catch (err) {
      console.warn('Supabase insert skipped or failed:', err)
    }
  }

  return item
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const current = getLocalStore<GalleryMedia>(STORAGE_KEYS.GALLERY)
  setLocalStore(
    STORAGE_KEYS.GALLERY,
    current.filter((i) => i.id !== id)
  )

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('media').delete().eq('id', id)
    } catch {}
  }

  return true
}

// ==========================================
// 2. WILDLIFE SPECIES
// ==========================================

export async function fetchAllWildlife(): Promise<WildlifeSpecies[]> {
  const localCustom = getLocalStore<WildlifeSpecies>(STORAGE_KEYS.WILDLIFE)

  if (!isSupabaseConfigured()) {
    return [...localCustom, ...OFFICIAL_WILDLIFE]
  }

  try {
    const { data, error } = await supabase
      .from('contents')
      .select('*, wildlife_details(*)')
      .eq('type', 'wildlife')
      .eq('status', 'published')
      .order('title')

    if (error || !data || data.length === 0) {
      return [...localCustom, ...OFFICIAL_WILDLIFE]
    }

    const mapped: WildlifeSpecies[] = data.map((d: any) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      scientificName: d.wildlife_details?.scientific_name || '',
      category: d.wildlife_details?.category || 'Mammals',
      conservationStatus: d.wildlife_details?.conservation_status || 'LC',
      statusLabel:
        d.wildlife_details?.conservation_status === 'CR'
          ? 'Critically Endangered'
          : d.wildlife_details?.conservation_status === 'EN'
          ? 'Endangered'
          : d.wildlife_details?.conservation_status === 'VU'
          ? 'Vulnerable'
          : 'Least Concern',
      excerpt: d.excerpt || '',
      body: d.body || d.excerpt || '',
      habitat: d.wildlife_details?.habitat || 'Savanna woodland',
      diet: 'Native vegetation and browse',
      behavior: d.wildlife_details?.behavior || 'Diurnal herd activity',
      viewingTip: d.wildlife_details?.viewing_tip || 'Early morning game drives',
      imageUrl: d.featured_image_url || 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=800&q=75',
      gallery: Array.isArray(d.gallery) ? d.gallery : [],
    }))

    return [...localCustom, ...mapped]
  } catch {
    return [...localCustom, ...OFFICIAL_WILDLIFE]
  }
}

export async function fetchWildlifeBySlug(slug: string): Promise<WildlifeSpecies | null> {
  const all = await fetchAllWildlife()
  return all.find((w) => w.slug === slug || w.id === slug) || null
}

export async function saveWildlifeItem(item: WildlifeSpecies): Promise<WildlifeSpecies> {
  const current = getLocalStore<WildlifeSpecies>(STORAGE_KEYS.WILDLIFE)
  const updated = [item, ...current.filter((w) => w.id !== item.id && w.slug !== item.slug)]
  setLocalStore(STORAGE_KEYS.WILDLIFE, updated)

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('contents').upsert({
        id: item.id,
        title: item.title,
        slug: item.slug,
        type: 'wildlife',
        status: 'published',
        excerpt: item.excerpt,
        body: item.body,
        featured_image_url: item.imageUrl,
        gallery: item.gallery,
        updated_at: new Date().toISOString(),
      } as any)
    } catch {}
  }

  return item
}

export async function deleteWildlifeItem(id: string): Promise<boolean> {
  const current = getLocalStore<WildlifeSpecies>(STORAGE_KEYS.WILDLIFE)
  setLocalStore(
    STORAGE_KEYS.WILDLIFE,
    current.filter((w) => w.id !== id)
  )

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('contents').delete().eq('id', id)
    } catch {}
  }

  return true
}

// ==========================================
// 3. FIELD STORIES & DISPATCHES
// ==========================================

export async function fetchAllStories(): Promise<ParkStory[]> {
  const localCustom = getLocalStore<ParkStory>(STORAGE_KEYS.STORIES)

  if (!isSupabaseConfigured()) {
    return [...localCustom, ...OFFICIAL_STORIES]
  }

  try {
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .eq('type', 'story')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return [...localCustom, ...OFFICIAL_STORIES]
    }

    const mapped: ParkStory[] = data.map((d: any) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      excerpt: d.excerpt || '',
      body: d.body || d.excerpt || '',
      category: 'Conservation',
      author: {
        name: 'EWCA Editorial Team',
        role: 'Borana NP Communications',
      },
      publishedAt: d.published_at ? d.published_at.slice(0, 10) : '2026-02-01',
      readTime: '5 min read',
      imageUrl: d.featured_image_url || 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=800&q=75',
      tags: ['Borana NP', 'Conservation', 'Ethiopia'],
    }))

    return [...localCustom, ...mapped]
  } catch {
    return [...localCustom, ...OFFICIAL_STORIES]
  }
}

export async function fetchStoryBySlug(slug: string): Promise<ParkStory | null> {
  const all = await fetchAllStories()
  return all.find((s) => s.slug === slug || s.id === slug) || null
}

export async function saveStory(story: ParkStory): Promise<ParkStory> {
  const current = getLocalStore<ParkStory>(STORAGE_KEYS.STORIES)
  const updated = [story, ...current.filter((s) => s.id !== story.id && s.slug !== story.slug)]
  setLocalStore(STORAGE_KEYS.STORIES, updated)

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('contents').upsert({
        id: story.id,
        title: story.title,
        slug: story.slug,
        type: 'story',
        status: 'published',
        excerpt: story.excerpt,
        body: story.body,
        featured_image_url: story.imageUrl,
        published_at: story.publishedAt,
        updated_at: new Date().toISOString(),
      } as any)
    } catch {}
  }

  return story
}

export async function deleteStory(id: string): Promise<boolean> {
  const current = getLocalStore<ParkStory>(STORAGE_KEYS.STORIES)
  setLocalStore(
    STORAGE_KEYS.STORIES,
    current.filter((s) => s.id !== id)
  )

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('contents').delete().eq('id', id)
    } catch {}
  }

  return true
}

// ==========================================
// 4. MAP LANDMARKS & POIS
// ==========================================

export async function fetchAllMapPOIs(): Promise<MapPOI[]> {
  const localCustom = getLocalStore<MapPOI>(STORAGE_KEYS.LOCATIONS)

  if (!isSupabaseConfigured()) {
    return [...localCustom, ...OFFICIAL_MAP_POIS]
  }

  try {
    const { data, error } = await supabase
      .from('map_locations')
      .select('*')
      .order('order', { ascending: true })

    if (error || !data || data.length === 0) {
      return [...localCustom, ...OFFICIAL_MAP_POIS]
    }

    const mapped: MapPOI[] = data.map((l: any) => ({
      id: l.id,
      name: l.name,
      description: l.description || '',
      category: l.category || 'visitor-center',
      latitude: l.latitude,
      longitude: l.longitude,
      imageUrl: l.image_url || undefined,
      essential_offline: !!l.essential_offline,
    }))

    return [...localCustom, ...mapped]
  } catch {
    return [...localCustom, ...OFFICIAL_MAP_POIS]
  }
}

export async function saveMapPOI(poi: MapPOI): Promise<MapPOI> {
  const current = getLocalStore<MapPOI>(STORAGE_KEYS.LOCATIONS)
  const updated = [poi, ...current.filter((p) => p.id !== poi.id)]
  setLocalStore(STORAGE_KEYS.LOCATIONS, updated)

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('map_locations').upsert({
        id: poi.id,
        name: poi.name,
        description: poi.description,
        category: poi.category,
        latitude: poi.latitude,
        longitude: poi.longitude,
        image_url: poi.imageUrl,
        essential_offline: poi.essential_offline,
      } as any)
    } catch {}
  }

  return poi
}

export async function deleteMapPOI(id: string): Promise<boolean> {
  const current = getLocalStore<MapPOI>(STORAGE_KEYS.LOCATIONS)
  setLocalStore(
    STORAGE_KEYS.LOCATIONS,
    current.filter((p) => p.id !== id)
  )

  if (isSupabaseConfigured()) {
    try {
      await supabase.from('map_locations').delete().eq('id', id)
    } catch {}
  }

  return true
}
