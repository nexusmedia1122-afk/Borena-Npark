'use client'

import React from 'react'
import { Sun, CloudRain, Compass, Thermometer, Wind, Eye, CheckCircle2, AlertTriangle } from 'lucide-react'
import { PARK_INSTITUTIONAL_DATA } from '@/data/park-data'

export default function WeatherWidget() {
  return (
    <div className="bg-gradient-to-br from-forest-900 to-forest-950 text-ivory-50 rounded-2xl p-6 sm:p-8 border border-forest-700/60 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest-800 pb-5 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Live Field Report</span>
          <h3 className="text-2xl font-display font-semibold text-white">Park Conditions & Climate</h3>
        </div>
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Optimal Safari Conditions
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Temperature */}
        <div className="bg-forest-800/60 rounded-xl p-4 border border-forest-700/40">
          <div className="flex items-center justify-between text-gold-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-ivory-200">Current Temp</span>
            <Thermometer className="w-4 h-4" />
          </div>
          <p className="text-2xl font-display font-bold text-white">28°C <span className="text-sm font-normal text-ivory-200">/ 82°F</span></p>
          <p className="text-xs text-ivory-200/80 mt-1">High 31°C • Low 16°C</p>
        </div>

        {/* Season Status */}
        <div className="bg-forest-800/60 rounded-xl p-4 border border-forest-700/40">
          <div className="flex items-center justify-between text-gold-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-ivory-200">Season</span>
            <Sun className="w-4 h-4" />
          </div>
          <p className="text-xl font-display font-bold text-white">Dry Season</p>
          <p className="text-xs text-ivory-200/80 mt-1">Peak game viewing season</p>
        </div>

        {/* Road Accessibility */}
        <div className="bg-forest-800/60 rounded-xl p-4 border border-forest-700/40">
          <div className="flex items-center justify-between text-gold-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-ivory-200">Tracks & Roads</span>
            <Compass className="w-4 h-4" />
          </div>
          <p className="text-xl font-display font-bold text-emerald-300">100% Passable</p>
          <p className="text-xs text-ivory-200/80 mt-1">4WD required for inner loops</p>
        </div>

        {/* Visibility */}
        <div className="bg-forest-800/60 rounded-xl p-4 border border-forest-700/40">
          <div className="flex items-center justify-between text-gold-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider text-ivory-200">Visibility</span>
            <Eye className="w-4 h-4" />
          </div>
          <p className="text-2xl font-display font-bold text-white">15+ km</p>
          <p className="text-xs text-ivory-200/80 mt-1">Clear skies & low humidity</p>
        </div>
      </div>

      <div className="bg-forest-950/60 rounded-xl p-4 border border-forest-800 text-xs text-ivory-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong>Ranger Station Advisory:</strong> Dida Hara plains waterhole activity is highest between 06:30–09:00 and 16:30–18:00.
          </span>
        </div>
        <span className="text-gold-400/90 whitespace-nowrap font-mono text-[11px]">
          Updated Daily at 06:00 EAT
        </span>
      </div>
    </div>
  )
}
