'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface VideoBackgroundProps {
  posterSrc: string
  videoSrc?: string
  className?: string
}

export default function VideoBackground({ posterSrc, videoSrc, className }: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    const video = videoRef.current

    const handleLoaded = () => setIsLoaded(true)
    video.addEventListener('loadeddata', handleLoaded)
    return () => video.removeEventListener('loadeddata', handleLoaded)
  }, [videoSrc])

  if (!videoSrc || hasError) {
    return (
      <div className={`absolute inset-0 ${className || ''}`}>
        <Image src={posterSrc} alt="Hero background" fill priority className="object-cover" />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${className || ''}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {!isLoaded && (
        <div className="absolute inset-0 bg-charcoal-900/50">
          <Image src={posterSrc} alt="Hero background loading" fill priority className="object-cover opacity-50" />
        </div>
      )}
    </div>
  )
}
