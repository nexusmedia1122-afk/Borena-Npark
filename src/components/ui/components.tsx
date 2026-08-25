'use client'

import { useState } from 'react'
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
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-gold-500 text-charcoal-950 hover:bg-gold-400 font-semibold shadow-subtle hover:shadow hover:-translate-y-0.5 active:translate-y-0 active:bg-gold-600',
    secondary: 'bg-forest-900 text-white hover:bg-forest-850 font-semibold shadow-subtle hover:shadow hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border border-forest-800 text-forest-900 hover:bg-forest-900 hover:text-white active:bg-forest-950 font-semibold',
    ghost: 'text-forest-900 hover:bg-forest-100/60 font-medium',
    'hero-outline': 'border border-ivory-100/40 text-ivory-50 hover:bg-white/10 hover:border-ivory-50 backdrop-blur-xs font-semibold',
  }
  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-sm sm:text-base',
  }

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
    <div className={cn('bg-white rounded-2xl border border-sand-200/80 shadow-subtle overflow-hidden', hover && 'hover:shadow-card hover:-translate-y-1 hover:border-forest-800/30 transition-all duration-300 ease-out', className)}>
      {children}
    </div>
  )
}

export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'earth' | 'gold' }) {
  const colors = {
    default: 'bg-forest-50 text-forest-800 border-forest-200/60',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-900 border-amber-200/60',
    earth: 'bg-earth-50 text-earth-800 border-earth-200/60',
    gold: 'bg-gold-50 text-gold-800 border-gold-200/60',
  }
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border', colors[variant])}>
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  light = false,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}) {
  return (
    <div className={cn('max-w-3xl space-y-3', centered && 'mx-auto text-center')}>
      {eyebrow && (
        <p className={cn('inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider-editorial', light ? 'text-gold-400' : 'text-earth-700')}>
          <span aria-hidden="true" className={cn('inline-block h-px w-5', light ? 'bg-gold-400/80' : 'bg-gold-600')} />
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 className={cn('text-3xl sm:text-4xl lg:text-[2.65rem] font-display font-bold leading-[1.12] tracking-tight text-balance', light ? 'text-white' : 'text-charcoal-950')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-sm sm:text-base leading-relaxed', light ? 'text-ivory-200/85 font-light' : 'text-charcoal-700')}>
          {subtitle}
        </p>
      )}
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
  const [imgSrc, setImgSrc] = useState(src)
  const [loaded, setLoaded] = useState(false)

  const sizes = sizesProp || (fill ? '100vw' : '(max-width: 768px) 100vw, 50vw')
  const isCdn = (imgSrc || '').includes('cloudinary.com')
  const shouldBypass = unoptimized ?? isCdn

  const CLOUDINARY_FALLBACK =
    'https://res.cloudinary.com/d39v3q6s/image/upload/f_auto,q_auto:good,w_1200,c_fill/668110576_1374606031380241_6681634558621259739_n.jpg'

  const handleError = () => {
    // If remote image fails, gracefully fallback to Cloudinary master asset
    if (imgSrc !== CLOUDINARY_FALLBACK) {
      setImgSrc(CLOUDINARY_FALLBACK)
    }
  }

  if (fill) {
    return (
      <Image
        src={imgSrc || CLOUDINARY_FALLBACK}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(className, 'transition-opacity duration-500 ease-out', loaded ? 'opacity-100' : 'opacity-85')}
        loading={priority ? 'eager' : loading || 'lazy'}
        unoptimized={shouldBypass}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={imgSrc || CLOUDINARY_FALLBACK}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizesProp}
      className={cn(className, 'transition-opacity duration-500 ease-out', loaded ? 'opacity-100' : 'opacity-85')}
      loading={priority ? 'eager' : loading || 'lazy'}
      unoptimized={shouldBypass}
      decoding={priority ? 'sync' : 'async'}
      onLoad={() => setLoaded(true)}
      onError={handleError}
    />
  )
}
