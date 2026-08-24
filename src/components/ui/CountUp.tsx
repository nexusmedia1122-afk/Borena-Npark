'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  end: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
}

/** Animates a number from 0 to `end` when scrolled into view. */
export function CountUp({ end, suffix = '', prefix = '', decimals = 0, duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || !ref.current) return

    let raf: number
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = (end * eased).toFixed(decimals)
      const formatted = Number(value).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
      if (ref.current) ref.current.textContent = `${prefix}${formatted}${suffix}`
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, end, prefix, suffix, decimals, duration])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}