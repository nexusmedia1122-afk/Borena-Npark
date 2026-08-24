'use client'

import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export function useOnlineStatus() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return online
}

export function useDataSaver() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('borena-data-saver')
      if (stored) setEnabled(JSON.parse(stored))
    } catch {}
  }, [])

  const toggle = () => {
    setEnabled(prev => {
      const next = !prev
      try { localStorage.setItem('borena-data-saver', JSON.stringify(next)) } catch {}
      return next
    })
  }

  return { dataSaver: enabled, toggleDataSaver: toggle }
}
