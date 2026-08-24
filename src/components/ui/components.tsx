import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'hero-outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', href, children, className, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-gold-600 text-charcoal-900 hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-600/20',
    secondary: 'bg-forest-700 text-ivory-50 hover:bg-forest-900 hover:shadow-lg hover:shadow-forest-900/20',
    outline: 'border-2 border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-ivory-50 hover:shadow-md',
    ghost: 'text-forest-700 hover:bg-forest-100',
    'hero-outline': 'border-2 border-ivory-50/80 text-ivory-50 hover:bg-ivory-50/10 hover:shadow-lg hover:shadow-charcoal-900/20',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3 text-base' }

  const classNameString = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return <Link href={href} className={classNameString}>{children}</Link>
  }

  return (
    <button className={classNameString} {...props}>
      {children}
    </button>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden', hover && 'hover:shadow-xl hover:shadow-charcoal-900/10 hover:-translate-y-1 hover:border-forest-700/30 transition-all duration-300 ease-out', className)}>
      {children}
    </div>
  )
}

export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'earth' }) {
  const colors = {
    default: 'bg-forest-100 text-forest-700',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    earth: 'bg-earth-100 text-earth-700',
  }
  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', colors[variant])}>{children}</span>
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="text-sm font-semibold text-gold-600 uppercase tracking-wider mb-2">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-display font-semibold text-charcoal-900 text-balance">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-charcoal-700 leading-relaxed">{subtitle}</p>}
    </div>
  )
}

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  loading?: 'lazy' | 'eager'
  unoptimized?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  fill,
  sizes: sizesProp,
  loading,
  unoptimized,
}: ImageProps) {
  const sizes = sizesProp || (fill ? '100vw' : '(max-width: 768px) 100vw, 50vw')
  const isCdn = src.includes('cloudinary.com') || src.includes('images.unsplash.com')
  const shouldBypass = unoptimized ?? isCdn

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={className}
        loading={priority ? 'eager' : loading || 'lazy'}
        unoptimized={shouldBypass}
        decoding={priority ? 'sync' : 'async'}
      />
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizesProp}
      className={className}
      loading={priority ? 'eager' : loading || 'lazy'}
      unoptimized={shouldBypass}
      decoding={priority ? 'sync' : 'async'}
    />
  )
}
