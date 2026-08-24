'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle } from 'lucide-react'

export function OfflineIndicator() {
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

  if (online) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-charcoal-900 text-ivory-50 text-sm px-4 py-2.5 rounded-lg shadow-lg flex items-center space-x-2 border border-charcoal-700">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
      </span>
      <span className="font-medium">You&apos;re offline</span>
    </div>
  )
}

export function BackOnlineIndicator() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const goOnline = () => {
      setShow(true)
      setTimeout(() => setShow(false), 3000)
    }
    window.addEventListener('online', goOnline)
    return () => window.removeEventListener('online', goOnline)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-forest-700 text-ivory-50 text-sm px-4 py-2.5 rounded-lg shadow-lg flex items-center space-x-2">
      <CheckCircle className="w-4 h-4" />
      <span className="font-medium">Back online</span>
    </div>
  )
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setShow(false)
    setDeferredPrompt(null)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl shadow-2xl border border-sand-200 p-5 max-w-sm">
      <h3 className="font-display font-semibold text-charcoal-900 mb-1">Install Borena National Park</h3>
      <p className="text-sm text-charcoal-700 mb-4 leading-relaxed">Get quick access to park information, wildlife and your saved guide — even with limited connectivity.</p>
      <div className="flex gap-2">
        <button onClick={handleInstall} className="flex-1 px-4 py-2 bg-gold-600 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-500 transition-colors">Install</button>
        <button onClick={() => setShow(false)} className="px-4 py-2 text-sm text-charcoal-600 hover:text-charcoal-800">Not now</button>
      </div>
    </div>
  )
}

export function DataSaverToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('borena-data-saver')
      if (stored) setEnabled(JSON.parse(stored))
    } catch {}
  }, [])

  const toggle = () => {
    const next = !enabled
    setEnabled(next)
    try { localStorage.setItem('borena-data-saver', JSON.stringify(next)) } catch {}
  }

  return (
    <button
      onClick={toggle}
      className={`hidden md:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${enabled ? 'bg-amber-100 text-amber-800' : 'bg-forest-700/50 text-ivory-100 hover:bg-forest-700'}`}
    >
      {enabled ? 'Data Saver: ON' : 'Data Saver: OFF'}
    </button>
  )
}
