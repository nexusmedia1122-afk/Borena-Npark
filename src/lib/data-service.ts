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

export async function fetchAllWildlife(): Promise<WildlifeSpecies[]> {
  if (!isSupabaseConfigured()) {
    return OFFICIAL_WILDLIFE
  }

  try {
    const { data, error } = await supabase
      .from('contents')
      .select('*, wildlife_details(*)')
      .eq('type', 'wildlife')
      .eq('status', 'published')
      .order('title')

    if (error || !data || data.length === 0) {
      return OFFICIAL_WILDLIFE
    }

    return data.map((d: any) => ({
      id: d.id,
      title: d.title,
      slug: d.slug,
      scientificName: d.wildlife_details?.scientific_name || '',
      category: d.wildlife_details?.category || 'Mammals',
      conservationStatus: d.wildlife_details?.conservation_status || 'LC',
      statusLabel: d.wildlife_details?.conservation_status === 'CR' ? 'Critically Endangered' :
                   d.wildlife_details?.conservation_status === 'EN' ? 'Endangered' :
                   d.wildlife_details?.conservation_status === 'VU' ? 'Vulnerable' : 'Least Concern',
      excerpt: d.excerpt || '',
      body: d.body || d.excerpt || '',
      habitat: d.wildlife_details?.habitat || 'Savanna woodland',
      diet: 'Native vegetation and browse',
      behavior: d.wildlife_details?.behavior || 'Diurnal herd activity',
      viewingTip: 'Early morning game drives',
      imageUrl: d.featured_image_url || 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80',
      gallery: Array.isArray(d.gallery) ? d.gallery : [],
    }))
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to official park dataset:', err)
    return OFFICIAL_WILDLIFE
  }
}

export async function fetchWildlifeBySlug(slug: string): Promise<WildlifeSpecies | null> {
  const localMatch = OFFICIAL_WILDLIFE.find(w => w.slug === slug || w.id === slug)
  if (!isSupabaseConfigured()) {
    return localMatch || null
  }

  try {
    const { data, error } = await supabase
      .from('contents')
      .select('*, wildlife_details(*)')
      .eq('type', 'wildlife')
      .eq('status', 'published')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return localMatch || null
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      scientificName: data.wildlife_details?.scientific_name || '',
      category: data.wildlife_details?.category || 'Mammals',
      conservationStatus: data.wildlife_details?.conservation_status || 'LC',
      statusLabel: data.wildlife_details?.conservation_status === 'CR' ? 'Critically Endangered' :
                   data.wildlife_details?.conservation_status === 'EN' ? 'Endangered' :
                   data.wildlife_details?.conservation_status === 'VU' ? 'Vulnerable' : 'Least Concern',
      excerpt: data.excerpt || '',
      body: data.body || data.excerpt || '',
      habitat: data.wildlife_details?.habitat || 'Savanna woodland',
      diet: 'Native vegetation and browse',
      behavior: data.wildlife_details?.behavior || 'Diurnal herd activity',
      viewingTip: 'Early morning game drives',
      imageUrl: data.featured_image_url || localMatch?.imageUrl || 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80',
      gallery: Array.isArray(data.gallery) ? data.gallery : localMatch?.gallery || [],
    }
  } catch {
    return localMatch || null
  }
}

export async function fetchAllStories(): Promise<ParkStory[]> {
  if (!isSupabaseConfigured()) {
    return OFFICIAL_STORIES
  }

  try {
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .eq('type', 'story')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return OFFICIAL_STORIES
    }

    return data.map((d: any) => ({
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
      publishedAt: d.published_at ? d.published_at.slice(0, 10) : '2025-10-01',
      readTime: '5 min read',
      imageUrl: d.featured_image_url || 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80',
      tags: ['Borana NP', 'Conservation', 'Ethiopia'],
    }))
  } catch {
    return OFFICIAL_STORIES
  }
}

export async function fetchStoryBySlug(slug: string): Promise<ParkStory | null> {
  const localMatch = OFFICIAL_STORIES.find(s => s.slug === slug || s.id === slug)
  if (!isSupabaseConfigured()) {
    return localMatch || null
  }

  try {
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .eq('type', 'story')
      .eq('status', 'published')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return localMatch || null
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || '',
      body: data.body || data.excerpt || '',
      category: 'Conservation',
      author: {
        name: 'EWCA Editorial Team',
        role: 'Borana NP Communications',
      },
      publishedAt: data.published_at ? data.published_at.slice(0, 10) : '2025-10-01',
      readTime: '5 min read',
      imageUrl: data.featured_image_url || localMatch?.imageUrl || 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80',
      tags: ['Borana NP', 'Conservation', 'Ethiopia'],
    }
  } catch {
    return localMatch || null
  }
}

export async function fetchAllGallery(): Promise<GalleryMedia[]> {
  if (!isSupabaseConfigured()) {
    return OFFICIAL_GALLERY
  }

  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return OFFICIAL_GALLERY
    }

    return data.map((m: any) => ({
      id: m.id,
      title: m.title || 'Borana National Park',
      caption: m.caption || m.description || 'Scenic photography from Borana National Park.',
      category: 'Landscapes',
      imageUrl: m.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      thumbnailUrl: m.thumbnail_url || m.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      photographer: m.photographer || 'EWCA Media',
      location: 'Borana National Park',
      date: m.created_at ? m.created_at.slice(0, 10) : '2025-01-01',
    }))
  } catch {
    return OFFICIAL_GALLERY
  }
}

export async function fetchAllMapPOIs(): Promise<MapPOI[]> {
  if (!isSupabaseConfigured()) {
    return OFFICIAL_MAP_POIS
  }

  try {
    const { data, error } = await supabase
      .from('map_locations')
      .select('*')
      .order('order', { ascending: true })

    if (error || !data || data.length === 0) {
      return OFFICIAL_MAP_POIS
    }

    return data.map((l: any) => ({
      id: l.id,
      name: l.name,
      description: l.description || '',
      category: l.category || 'visitor-center',
      latitude: l.latitude,
      longitude: l.longitude,
      imageUrl: l.image_url || undefined,
      essential_offline: !!l.essential_offline,
    }))
  } catch {
    return OFFICIAL_MAP_POIS
  }
}
