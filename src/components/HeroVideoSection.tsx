'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Volume2, VolumeX, ChevronDown, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/components'
import { useDataSaver } from '@/hooks/useDataSaver'

export interface HeroStat {
  value: string
  label: string
}

interface HeroVideoSectionProps {
  eyebrow: string
  title: string
  subtitle?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  posterSrc: string
  videoSrc?: string
  stats?: HeroStat[]
}

/**
 * Cinematic full-screen hero with background video.
 * - Falls back to a Ken Burns poster when video fails, data-saver is on,
 *   or the visitor prefers reduced motion.
 * - Staggered entrance animations, mute toggle, scroll cue and stats strip.
 */
export default function HeroVideoSection({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  posterSrc,
  videoSrc,
  stats = [],
}: HeroVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [muted, setMuted] = useState(true)
  const { dataSaver } = useDataSaver()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => setVideoReady(true)
    const handleError = () => setVideoFailed(true)

    video.addEventListener('loadeddata', handleCanPlay)
    video.addEventListener('error', handleError)

    // Some browsers reject autoplay silently — surface it as a fallback.
    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => setVideoFailed(true))
    }

    return () => {
      video.removeEventListener('loadeddata', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [videoSrc])

  const showVideo = Boolean(videoSrc) && !videoFailed && !dataSaver && !reducedMotion

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-charcoal-900">
      {/* Media layer */}
      <div className="absolute inset-0">
        <Image
          src={posterSrc}
          alt="Borena National Park landscape"
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${showVideo && videoReady ? 'opacity-0' : 'opacity-100 animate-kenburns'}`}
        />
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterSrc}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Cinematic overlays — top shade for header legibility, bottom gradient for text */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/20 to-charcoal-900/80" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(15,31,22,0.10) 0%, rgba(15,31,22,0.35) 65%, rgba(15,31,22,0.70) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-44 pt-32 text-center sm:px-6 lg:px-8">
        <span className="hero-rise inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-charcoal-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300 backdrop-blur-sm" style={{ animationDelay: '0ms' }}>
          <MapPin className="h-3.5 w-3.5" />
          {eyebrow}
        </span>

        <h1
          className="hero-rise mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ivory-50 text-balance sm:text-6xl md:text-7xl"
          style={{ animationDelay: '150ms' }}
        >
          {title}
        </h1>

        <div className="hero-rise mt-7 flex items-center justify-center gap-3" style={{ animationDelay: '300ms' }} aria-hidden="true">
          <span className="ornament-line" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />
          <span className="ornament-line-reverse" />
        </div>

        {subtitle && (
          <p
            className="hero-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory-50/85 text-balance md:text-xl"
            style={{ animationDelay: '420ms' }}
          >
            {subtitle}
          </p>
        )}

        <div className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '560ms' }}>
          <Button href={primaryCta.href} size="lg" variant="primary">
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button href={secondaryCta.href} size="lg" variant="hero-outline">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>

      {/* Sound toggle */}
      {showVideo && (
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute background video' : 'Mute background video'}
          className="absolute right-5 top-24 z-20 rounded-full border border-ivory-50/25 bg-charcoal-900/40 p-3 text-ivory-50 backdrop-blur-md transition-all duration-300 hover:bg-charcoal-900/60 hover:scale-105 md:right-8 md:top-28"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}

      {/* Scroll cue */}
      <Link
        href="#welcome"
        aria-label="Scroll to explore"
        className="absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-ivory-50/70 transition-colors hover:text-ivory-50 sm:flex"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.3em]">Explore</span>
        <ChevronDown className="h-5 w-5 animate-bounce-soft" />
      </Link>

      {/* Stats strip */}
      {stats.length > 0 && (
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-ivory-50/10 bg-charcoal-900/45 backdrop-blur-md">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-ivory-50/10 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-5 text-center">
                <dt className="order-2 mt-1 block text-[11px] font-medium uppercase tracking-[0.18em] text-ivory-50/65">
                  {stat.label}
                </dt>
                <dd className="font-display text-xl font-semibold text-gold-300 md:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  )
}