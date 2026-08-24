/**
 * Cloudinary delivery URL helpers with extreme performance optimization.
 * Automatically applies eco auto-format (WebP/AVIF), auto-quality compression,
 * and responsive bounding to prevent multi-megabyte image downloads.
 */

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'd39v3q6s'
const BASE = `https://res.cloudinary.com/${cloudName}`

/**
 * Build an optimized image URL for a Cloudinary public ID.
 * Defaults to f_auto,q_auto:good,w_800,c_limit for fast mobile & desktop delivery (~30KB-60KB).
 */
export function cldImage(publicId: string, transformations?: string): string {
  if (!publicId) return ''

  // If already a full URL or base64, return directly
  if (publicId.startsWith('http') || publicId.startsWith('/') || publicId.startsWith('data:')) {
    return publicId
  }

  const transform = transformations
    ? `f_auto,q_auto:good,${transformations}`
    : 'f_auto,q_auto:good,w_800,c_limit'

  return `${BASE}/image/upload/${transform}/${publicId}`
}

/**
 * Build an MP4 video URL for a Cloudinary video public ID.
 */
export function cldVideo(publicId: string): string {
  if (!publicId) return ''
  if (publicId.startsWith('http') || publicId.startsWith('/')) return publicId
  return `${BASE}/video/upload/q_auto:eco/${publicId}.mp4`
}

/**
 * Build a poster frame (JPG) for a Cloudinary video public ID.
 */
export function cldVideoPoster(publicId: string): string {
  if (!publicId) return ''
  if (publicId.startsWith('http') || publicId.startsWith('/')) return publicId
  return `${BASE}/video/upload/f_auto,q_auto:good,w_1200,so_auto/${publicId}.jpg`
}