export interface MapLocation {
  id: string
  name: string
  description?: string | null
  category: string
  latitude: number
  longitude: number
  imageUrl?: string | null
  image_url?: string | null
  elevation?: string
  accessTip?: string
  essential_offline?: boolean
}
