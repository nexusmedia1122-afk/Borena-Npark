'use client'

import React, { useState } from 'react'
import { Info, X, ShieldAlert, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ParkAlertBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 text-ivory-100 border-b border-gold-600/30 px-4 py-2 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="flex-shrink-0 inline-flex items-center gap-1 bg-gold-600/20 text-gold-300 border border-gold-500/40 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider">
            <Info className="w-3 h-3 text-gold-400" />
            Advisory
          </span>
          <p className="text-ivory-100 leading-tight">
            <span className="font-semibold text-white">Seasonal Wildlife Update:</span> Dry season game viewing is currently optimal across Dida Hara plains. 4WD vehicles and certified EWCA ranger guides are mandatory for all backcountry tracks.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 font-semibold text-xs underline underline-offset-2"
          >
            Permit Guidelines <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-ivory-200 hover:text-white rounded hover:bg-forest-700/50 transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
