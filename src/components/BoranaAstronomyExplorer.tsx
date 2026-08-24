'use client'

import { useState } from 'react'
import {
  Moon,
  Sun,
  Sparkles,
  Compass,
  Star,
  Info,
  Calendar,
  Layers,
  ChevronRight,
  Eye,
  CheckCircle2,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Constellation {
  id: string
  oromoName: string
  astronomyName: string
  starsCount: number
  rightAscension: string
  declination: string
  seasonMarker: string
  ecologicalMeaning: string
  proverb: string
  coordinates: { x: number; y: number }[]
  color: string
}

const CONSTELLATIONS: Constellation[] = [
  {
    id: 'camsa',
    oromoName: 'Camsa',
    astronomyName: 'The Pleiades (Seven Sisters)',
    starsCount: 7,
    rightAscension: '03h 47m',
    declination: '+24° 07′',
    seasonMarker: 'Onset of Ganna (Long Rains)',
    ecologicalMeaning:
      'When the crescent new moon aligns with Camsa at dusk, the Ayyaantuu declare the start of the major wet season. Pastoralists begin preparing water retention dams and seasonal rangeland resting zones.',
    proverb: '“Camsi baanaan bokkaan dhufe — When Pleiades ascends, life-giving rain descends.”',
    coordinates: [
      { x: 30, y: 35 },
      { x: 38, y: 32 },
      { x: 42, y: 40 },
      { x: 48, y: 36 },
      { x: 54, y: 42 },
      { x: 60, y: 38 },
      { x: 50, y: 48 },
    ],
    color: 'from-amber-400 to-yellow-200',
  },
  {
    id: 'bufa',
    oromoName: 'Bufa',
    astronomyName: 'Aldebaran (Eye of Taurus)',
    starsCount: 5,
    rightAscension: '04h 35m',
    declination: '+16° 30′',
    seasonMarker: 'Mid-Season Grazing Flocks',
    ecologicalMeaning:
      'Bufa represents vitality and the protection of newborn calves. Its rising alongside the gibbous moon signals peak milk production across the Borana rangelands.',
    proverb: '“Bufi urjii looniti — Aldebaran is the star that watches over the herds.”',
    coordinates: [
      { x: 25, y: 60 },
      { x: 45, y: 45 },
      { x: 65, y: 40 },
      { x: 75, y: 55 },
      { x: 55, y: 70 },
    ],
    color: 'from-rose-400 to-orange-300',
  },
  {
    id: 'waxabajjii',
    oromoName: 'Waxabajjii',
    astronomyName: 'Bellatrix (Gamma Orionis)',
    starsCount: 4,
    rightAscension: '05h 25m',
    declination: '+06° 20′',
    seasonMarker: 'Transition to Dry Season (Bona)',
    ecologicalMeaning:
      'Marks the drying of seasonal ponds and alerts the council of elders (*Jaarsa*) to enact the Seera Marraa fi Bishaan water-rationing rules at the deep Tula Wells.',
    proverb: '“Waxabajjiin laga gogsa — Waxabajjii star signals the turning of seasonal waters to stone shafts.”',
    coordinates: [
      { x: 30, y: 25 },
      { x: 65, y: 30 },
      { x: 55, y: 65 },
      { x: 35, y: 60 },
    ],
    color: 'from-sky-400 to-blue-200',
  },
  {
    id: 'obora-gudda',
    oromoName: 'Obora Gudda',
    astronomyName: 'Saiph / Central Belt of Orion',
    starsCount: 6,
    rightAscension: '05h 47m',
    declination: '-09° 40′',
    seasonMarker: 'Zenith Navigation & Gadaa Timelines',
    ecologicalMeaning:
      'The supreme meridian anchor of the southern Ethiopian celestial sphere. Used by the Abbaa Gadaa and Ayyaantuu to calibrate the 8-year generational lifecycle transitions.',
    proverb: '“Oborri guddaan daandii qajeelcha — The Great Orion aligns the paths of humanity and earth.”',
    coordinates: [
      { x: 20, y: 30 },
      { x: 45, y: 35 },
      { x: 75, y: 40 },
      { x: 50, y: 55 },
      { x: 35, y: 70 },
      { x: 65, y: 75 },
    ],
    color: 'from-emerald-400 to-teal-200',
  },
  {
    id: 'obora-dikka',
    oromoName: 'Obora Dikka',
    astronomyName: 'Sirius (The Dog Star / Canis Majoris)',
    starsCount: 3,
    rightAscension: '06h 45m',
    declination: '-16° 42′',
    seasonMarker: 'Nocturnal Safari Sentinel',
    ecologicalMeaning:
      'The brightest stellar beacon in the southern night sky. Guides nighttime scouts, wildlife trackers, and migrating pastoralist caravans across the Dida Hara plains.',
    proverb: '“Oborri diqqaan ifaa dachee ti — The little beacon is the guiding lamp of the traveler.”',
    coordinates: [
      { x: 50, y: 40 },
      { x: 35, y: 60 },
      { x: 65, y: 65 },
    ],
    color: 'from-cyan-300 to-white',
  },
  {
    id: 'bittottessa',
    oromoName: 'Bittottessa',
    astronomyName: 'Triangulum',
    starsCount: 3,
    rightAscension: '02h 10m',
    declination: '+34° 59′',
    seasonMarker: 'Lunar Month Initializer',
    ecologicalMeaning:
      'The critical calibrator of the Dhaha Boranaa lunar year. When the new crescent moon meets Bittottessa, the new annual cycle begins without the need for a leap day.',
    proverb: '“Bittottessi jalqaba baraati — Bittottessa marks the turning of the cosmic year.”',
    coordinates: [
      { x: 50, y: 25 },
      { x: 25, y: 65 },
      { x: 75, y: 65 },
    ],
    color: 'from-purple-400 to-pink-300',
  },
  {
    id: 'urjii-lami',
    oromoName: 'Urjii Lami',
    astronomyName: 'Castor & Pollux (The Gemini Twins)',
    starsCount: 2,
    rightAscension: '07h 34m',
    declination: '+31° 53′',
    seasonMarker: 'Equilibrium & Consensus Council',
    ecologicalMeaning:
      'Symbolizes the dual balance of nature: rain and pasture, humanity and wildlife, law (*Seera*) and custom (*Aadaa*). Convocations of the Gumii Gaayyo frequently convene under its zenith.',
    proverb: '“Urjii lamiin wal qixxee ifti — The twin stars shine in eternal balance.”',
    coordinates: [
      { x: 35, y: 45 },
      { x: 65, y: 45 },
    ],
    color: 'from-yellow-300 to-amber-500',
  },
]

const AYYAANA_DAYS = [
  { name: 'Areeri', sign: 'Auspicious for livestock blessings & water offerings', category: 'pasture' },
  { name: 'Ruda', sign: 'Favorable for long-distance travel and trekking', category: 'travel' },
  { name: 'Basa Dura', sign: 'Day of peaceful mediation & elder councils', category: 'council' },
  { name: 'Basa Ball\'aa', sign: 'Sanctified day for deep well excavation', category: 'wells' },
  { name: 'Gidada', sign: 'Preservation day: harvesting herbal medicines', category: 'pasture' },
  { name: 'Alagaje', sign: 'Ceremonial livestock branding & identification', category: 'pasture' },
  { name: 'Salban Dura', sign: 'Day of cosmic peace: no wildlife hunting permitted', category: 'conservation' },
  { name: 'Salban Ball\'aa', sign: 'Universal water sharing covenants reaffirmed', category: 'wells' },
  { name: 'Gardaduma', sign: 'Communal rangeland rotational planning', category: 'council' },
  { name: 'Sonsa', sign: 'Gadaa youth leadership instruction day', category: 'council' },
  { name: 'Ruruma', sign: 'Preparation of acacia seed scatter for reforestation', category: 'conservation' },
  { name: 'Luma', sign: 'Sacred blessings for newborn wildlife foals & calves', category: 'pasture' },
  { name: 'Gidaada', sign: 'Equestrian and scout physical endurance training', category: 'travel' },
  { name: 'Bidir', sign: 'Resting day for pack animals and draft oxen', category: 'pasture' },
]

export default function BoranaAstronomyExplorer() {
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation>(CONSTELLATIONS[0])
  const [activeTab, setActiveTab] = useState<'stars' | 'ayyaana' | 'philosophy'>('stars')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredAyyaana =
    filterCategory === 'all'
      ? AYYAANA_DAYS
      : AYYAANA_DAYS.filter((a) => a.category === filterCategory)

  return (
    <div className="bg-forest-950 text-white rounded-3xl border border-forest-800/80 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Starry Dust Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest-luxury text-gold-400 bg-gold-950/60 px-3.5 py-1.5 rounded-full border border-gold-500/30 mb-3">
          <Moon className="w-3.5 h-3.5 text-gold-400" />
          <span>Indigenous Lunar-Stellar Science · Dhaha Boranaa</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
          The Celestial Calendar of the Borana
        </h2>
        <p className="text-sm sm:text-base text-ivory-200/80 mt-2 leading-relaxed font-light">
          Originating over 2,300 years ago, the Borana lunar-stellar calendar (*Dhaha Boranaa*) is one of Africa’s oldest astronomical systems. It aligns 12 lunar cycles with 7 anchor constellations to guide pasture management, wildlife protection, and the Gadaa democracy.
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 border-b border-forest-800/80 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('stars')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'stars'
              ? 'bg-gold-500 text-charcoal-950 shadow-md'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-800 border border-forest-700/60'
          )}
        >
          <Star className="w-3.5 h-3.5" />
          <span>7 Anchor Constellations (*Urjii Torban*)</span>
        </button>

        <button
          onClick={() => setActiveTab('ayyaana')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'ayyaana'
              ? 'bg-gold-500 text-charcoal-950 shadow-md'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-800 border border-forest-700/60'
          )}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>The 27 Ayyaana Day-Cycles</span>
        </button>

        <button
          onClick={() => setActiveTab('philosophy')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'philosophy'
              ? 'bg-gold-500 text-charcoal-950 shadow-md'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-800 border border-forest-700/60'
          )}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Ayyaantuu Astronomers</span>
        </button>
      </div>

      {/* TAB 1: 7 ANCHOR CONSTELLATIONS VISUALIZER */}
      {activeTab === 'stars' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Star Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400/90 mb-2">
              Select Anchor Constellation:
            </p>
            <div className="space-y-2">
              {CONSTELLATIONS.map((c) => {
                const isSelected = selectedConstellation.id === c.id
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConstellation(c)}
                    className={cn(
                      'w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between',
                      isSelected
                        ? 'bg-forest-900 border-gold-400 shadow-lg ring-1 ring-gold-400/50'
                        : 'bg-forest-950/70 border-forest-800/80 hover:bg-forest-900/60'
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-white">
                          {c.oromoName}
                        </span>
                        <span className="text-[11px] font-mono text-gold-400/90">
                          ({c.astronomyName.split(' ')[0]})
                        </span>
                      </div>
                      <p className="text-xs text-ivory-200/70 mt-0.5">{c.seasonMarker}</p>
                    </div>
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 transition-transform',
                        isSelected ? 'text-gold-400 translate-x-1' : 'text-forest-600'
                      )}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Constellation Interactive Sky Dome (7 cols) */}
          <div className="lg:col-span-7 bg-forest-900/80 rounded-3xl border border-forest-700/80 p-6 sm:p-8 space-y-6 shadow-xl relative backdrop-blur-sm">
            {/* Sky Dome Canvas Simulation */}
            <div className="relative aspect-[16/9] w-full rounded-2xl bg-charcoal-950 border border-forest-800/80 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-charcoal-950" />

              {/* Coordinates Grid Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Render Constellation Stars */}
              <svg className="absolute inset-0 w-full h-full">
                {/* Connecting Lines */}
                {selectedConstellation.coordinates.map((pt, i, arr) => {
                  if (i === arr.length - 1) return null
                  const next = arr[i + 1]
                  return (
                    <line
                      key={i}
                      x1={`${pt.x}%`}
                      y1={`${pt.y}%`}
                      x2={`${next.x}%`}
                      y2={`${next.y}%`}
                      stroke="rgba(217, 119, 6, 0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  )
                })}
              </svg>

              {/* Star Nodes */}
              {selectedConstellation.coordinates.map((pt, i) => (
                <div
                  key={i}
                  style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/star cursor-pointer"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-gold-300 shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse" />
                  <span className="opacity-0 group-hover/star:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-[9px] font-mono text-gold-200 whitespace-nowrap bg-black/80 px-1.5 py-0.5 rounded border border-gold-500/30 pointer-events-none">
                    Star #{i + 1}
                  </span>
                </div>
              ))}

              {/* Badge Overlay */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-gold-500/30 text-[10px] font-mono text-gold-300">
                RA {selectedConstellation.rightAscension} · Dec {selectedConstellation.declination}
              </div>

              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-gold-500/30 text-[10px] font-semibold text-ivory-200">
                {selectedConstellation.starsCount} Recorded Stars
              </div>
            </div>

            {/* Constellation Details */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400">
                  {selectedConstellation.astronomyName}
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  {selectedConstellation.oromoName}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-forest-950/80 border border-forest-800 text-xs sm:text-sm text-ivory-200/90 leading-relaxed">
                <p className="font-semibold text-gold-300 mb-1">Ecological & Cultural Mandate:</p>
                {selectedConstellation.ecologicalMeaning}
              </div>

              <blockquote className="border-l-2 border-gold-500 pl-4 text-xs sm:text-sm italic font-serif text-gold-200/90">
                {selectedConstellation.proverb}
              </blockquote>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THE 27 AYYAANA DAY-CYCLES */}
      {activeTab === 'ayyaana' && (
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                The 27 Ayyaana Astronomical Days
              </h3>
              <p className="text-xs sm:text-sm text-ivory-200/80">
                Unlike solar 7-day weeks, the Borana month consists of 27 distinct named celestial days, each imbued with unique ecological and spiritual attributes.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Days' },
                { id: 'pasture', label: 'Pasture & Herds' },
                { id: 'wells', label: 'Singing Wells' },
                { id: 'council', label: 'Gadaa Councils' },
                { id: 'conservation', label: 'Sanctuary Days' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterCategory(f.id)}
                  className={cn(
                    'px-3 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all',
                    filterCategory === f.id
                      ? 'bg-gold-500 text-charcoal-950 shadow-sm'
                      : 'bg-forest-900 text-ivory-200/80 border border-forest-700 hover:bg-forest-800'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredAyyaana.map((day, idx) => (
              <div
                key={day.name}
                className="p-4 rounded-2xl bg-forest-900/70 border border-forest-700/80 flex items-start gap-3 hover:border-gold-500/50 transition-all"
              >
                <span className="w-8 h-8 rounded-xl bg-forest-950 border border-gold-500/30 flex items-center justify-center font-mono font-bold text-xs text-gold-400 shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{day.name}</h4>
                  <p className="text-xs text-ivory-200/80 mt-1 leading-relaxed">{day.sign}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: THE AYYAANTUU ASTRONOMERS PHILOSOPHY */}
      {activeTab === 'philosophy' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light">
            <h3 className="text-2xl font-display font-bold text-white">
              Guardians of the Sky: The Role of the Ayyaantuu
            </h3>
            <p>
              In traditional Borana society, the <strong className="text-gold-300">Ayyaantuu</strong> are timekeeper-philosophers and celestial masters who hold lifelong responsibility for charting planetary configurations, star conjunctions, and lunar motions.
            </p>
            <p>
              Unlike Western solar calendars which adjust with quadrennial leap days, the Borana system maintains unbroken precision by observing the <strong className="text-gold-300">lunar conjunction with the seven anchor stars</strong> at each phase transition. Because Borana lies just 4° to 5° north of the equator, stellar paths traverse the zenith in clean, unobstructed arcs throughout the year.
            </p>
            <p>
              Archaeological excavations across the Rift Valley, notably at <em>Namoratunga</em>, have uncovered ancient stone megalithic pillars aligned precisely to these exact seven Borana constellations, proving that this astronomical science has sustained rangeland civilization for thousands of years.
            </p>
          </div>

          <div className="lg:col-span-5 bg-forest-900 rounded-3xl border border-gold-500/30 p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-forest-800 pb-3">
              <Sparkles className="w-5 h-5 text-gold-400 shrink-0" />
              <h4 className="font-display font-bold text-base text-white">
                Core Principles of Dhaha Boranaa
              </h4>
            </div>
            <ul className="space-y-3 text-xs text-ivory-200/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Lunar-Stellar Matrix:</strong> 354-day lunar year reconciled empirically with stellar azimuths.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Ecological Governance:</strong> Determines the exact opening and closing of dry-season grazing enclosures (*Kalo*).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Gadaa Chronology:</strong> Sets the 8-year national assembly timetable at Gumii Gaayyo.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
