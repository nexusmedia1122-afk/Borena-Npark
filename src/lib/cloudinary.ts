/**
 * Cloudinary delivery URL helpers.
 *
 * The cloud name is public (safe in the browser); API credentials stay
 * server-side via CLOUDINARY_URL / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET.
 */

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'd39v3q6s'

const BASE = `https://res.cloudinary.com/${cloudName}`

/**
 * Build an optimized image URL for a Cloudinary public ID.
 * Applies automatic format + quality by default; pass extra
 * transformations as a comma-separated string, e.g. 'w_1600,c_fill'.
 */
export function cldImage(publicId: string, transformations?: string): string {
  const extra = transformations ? `${transformations}/` : ''
  return `${BASE}/image/upload/f_auto,q_auto/${extra}${publicId}`
}

/**
 * Build an MP4 video URL for a Cloudinary video public ID.
 */
export function cldVideo(publicId: string): string {
  return `${BASE}/video/upload/${publicId}.mp4`
}

/**
 * Build a poster frame (JPG) for a Cloudinary video public ID.
 * `so_auto` picks a representative frame instead of a black opening frame.
 */
export function cldVideoPoster(publicId: string): string {
  return `${BASE}/video/upload/so_auto/${publicId}.jpg`
}