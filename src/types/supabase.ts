export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'editor' | 'viewer'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'editor' | 'viewer'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'editor' | 'viewer'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contents: {
        Row: {
          id: string
          type: 'wildlife' | 'story' | 'experience' | 'culture' | 'conservation' | 'research' | 'visitor_info'
          title: string
          slug: string
          excerpt: string | null
          body: string | null
          featured_image_url: string | null
          gallery: Json
          status: 'draft' | 'published' | 'archived'
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          canonical_url: string | null
          essential_offline: boolean
          created_at: string
          updated_at: string
          published_at: string | null
          author_id: string | null
        }
        Insert: {
          id?: string
          type: 'wildlife' | 'story' | 'experience' | 'culture' | 'conservation' | 'research' | 'visitor_info'
          title: string
          slug: string
          excerpt?: string | null
          body?: string | null
          featured_image_url?: string | null
          gallery?: Json
          status?: 'draft' | 'published' | 'archived'
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          canonical_url?: string | null
          essential_offline?: boolean
          created_at?: string
          updated_at?: string
          published_at?: string | null
          author_id?: string | null
        }
        Update: {
          type?: 'wildlife' | 'story' | 'experience' | 'culture' | 'conservation' | 'research' | 'visitor_info'
          title?: string
          slug?: string
          excerpt?: string | null
          body?: string | null
          featured_image_url?: string | null
          gallery?: Json
          status?: 'draft' | 'published' | 'archived'
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          canonical_url?: string | null
          essential_offline?: boolean
          created_at?: string
          updated_at?: string
          published_at?: string | null
          author_id?: string | null
        }
      }
      wildlife_details: {
        Row: {
          id: string
          content_id: string
          scientific_name: string | null
          category: string | null
          conservation_status: string | null
          habitat: string | null
          behavior: string | null
        }
        Insert: {
          id?: string
          content_id: string
          scientific_name?: string | null
          category?: string | null
          conservation_status?: string | null
          habitat?: string | null
          behavior?: string | null
        }
        Update: {
          content_id?: string
          scientific_name?: string | null
          category?: string | null
          conservation_status?: string | null
          habitat?: string | null
          behavior?: string | null
        }
      }
      map_locations: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string | null
          latitude: number
          longitude: number
          image_url: string | null
          essential_offline: boolean
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: string | null
          latitude: number
          longitude: number
          image_url?: string | null
          essential_offline?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          category?: string | null
          latitude?: number
          longitude?: number
          image_url?: string | null
          essential_offline?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          filename: string
          title: string | null
          description: string | null
          alt_text: string | null
          caption: string | null
          photographer: string | null
          copyright: string | null
          category: string | null
          mime_type: string
          size_bytes: number | null
          width: number | null
          height: number | null
          url: string
          thumbnail_url: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          title?: string | null
          description?: string | null
          alt_text?: string | null
          caption?: string | null
          photographer?: string | null
          copyright?: string | null
          category?: string | null
          mime_type: string
          size_bytes?: number | null
          width?: number | null
          height?: number | null
          url: string
          thumbnail_url?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          filename?: string
          title?: string | null
          description?: string | null
          alt_text?: string | null
          caption?: string | null
          photographer?: string | null
          copyright?: string | null
          category?: string | null
          mime_type?: string
          size_bytes?: number | null
          width?: number | null
          height?: number | null
          url?: string
          thumbnail_url?: string | null
          created_by?: string | null
          created_at?: string
        }
      }
      galleries: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'draft' | 'published' | 'archived'
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'draft' | 'published' | 'archived'
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          status?: 'draft' | 'published' | 'archived'
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      gallery_items: {
        Row: {
          id: string
          gallery_id: string
          media_id: string
          order: number
          caption: string | null
        }
        Insert: {
          id?: string
          gallery_id: string
          media_id: string
          order?: number
          caption?: string | null
        }
        Update: {
          gallery_id?: string
          media_id?: string
          order?: number
          caption?: string | null
        }
      }
      accommodations: {
        Row: {
          id: string
          name: string
          description: string | null
          type: string | null
          price_range: string | null
          contact_email: string | null
          contact_phone: string | null
          website: string | null
          image_url: string | null
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type?: string | null
          price_range?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          image_url?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          type?: string | null
          price_range?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          image_url?: string | null
          status?: 'draft' | 'published' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      visitor_infos: {
        Row: {
          id: string
          title: string
          content: string
          category: string | null
          essential_offline: boolean
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category?: string | null
          essential_offline?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          content?: string
          category?: string | null
          essential_offline?: boolean
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          read: boolean
          replied: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          read?: boolean
          replied?: boolean
          created_at?: string
        }
        Update: {
          name?: string
          email?: string
          subject?: string | null
          message?: string
          read?: boolean
          replied?: boolean
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          active: boolean
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          name?: string | null
          active?: boolean
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          content_type: string | null
          content_id: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          content_type?: string | null
          content_id?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          user_id?: string | null
          action?: string
          content_type?: string | null
          content_id?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
          updated_by?: string | null
        }
      }
      navigation_items: {
        Row: {
          id: string
          label: string
          url: string
          order: number
          visible: boolean
          open_in_new_tab: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          url: string
          order?: number
          visible?: boolean
          open_in_new_tab?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          label?: string
          url?: string
          order?: number
          visible?: boolean
          open_in_new_tab?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
