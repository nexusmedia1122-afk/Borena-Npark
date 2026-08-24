'use client'

import React, { useState } from 'react'
import { Phone, Shield, Globe2, AlertCircle, ChevronDown, Check } from 'lucide-react'
import Link from 'next/link'

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'om', label: 'Afaan Oromoo', native: 'Afaan Oromoo' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ' },
]

export default function OfficialGovBar() {
  const [langOpen, setLangOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en')

  const selectedLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0]

  return (
    <div className="bg-forest-950 text-ivory-100 border-b border-forest-800 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Official Government & Authority Accreditation */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            {/* Government Emblem Seal Badge */}
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gold-500 text-forest-950 font-bold text-[9px] shadow-sm">
              ★
            </span>
            <span className="font-semibold tracking-wide text-ivory-50 uppercase text-[11px]">
              Federal Democratic Republic of Ethiopia
            </span>
          </div>
          <span className="hidden sm:inline text-forest-500">•</span>
          <span className="hidden md:inline text-ivory-200/90 font-medium">
            Ethiopian Wildlife Conservation Authority (EWCA)
          </span>
          <span className="hidden lg:inline text-forest-500">•</span>
          <span className="hidden lg:inline text-gold-300/90">
            Oromia Regional State
          </span>
        </div>

        {/* Right: Emergency Hotline, Status & Language Selector */}
        <div className="flex items-center gap-4">
          {/* 24/7 Ranger Emergency Hotline */}
          <a
            href="tel:+251464440210"
            className="inline-flex items-center gap-1.5 text-gold-300 hover:text-gold-200 transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-gold-400" />
            <span className="hidden sm:inline">Ranger Hotline:</span>
            <span>+251 (0) 46 444 0210</span>
          </a>

          {/* Park Status Badge */}
          <div className="hidden sm:inline-flex items-center gap-1 bg-forest-900/90 px-2 py-0.5 rounded border border-forest-700/60 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-medium">Park Open</span>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-1 text-ivory-200 hover:text-white px-2 py-0.5 rounded hover:bg-forest-900 transition-colors"
              aria-label="Select language"
            >
              <Globe2 className="w-3.5 h-3.5 text-gold-400" />
              <span className="font-medium">{selectedLang.label}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-forest-900 border border-forest-700 rounded-lg shadow-xl py-1 z-50 animate-in">
                <div className="px-3 py-1 border-b border-forest-800 text-[10px] uppercase font-semibold text-gold-400">
                  Select Language
                </div>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code)
                      setLangOpen(false)
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-ivory-100 hover:bg-forest-800 hover:text-white flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-medium">{lang.label}</p>
                      <p className="text-[10px] text-ivory-300/70">{lang.native}</p>
                    </div>
                    {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-gold-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
