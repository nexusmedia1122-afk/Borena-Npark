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
  Orbit,
  Milestone,
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
  conjunctionMonth: string
  ecologicalMeaning: string
  proverb: string
  coordinates: { x: number; y: number }[]
  color: string
}

/* ---- 7 ANCHOR STARS (Urjii Torban) - Asmarom Legesse (1973, Ch. 7) ---- */
const CONSTELLATIONS: Constellation[] = [
  {
    id: 'lamii',
    oromoName: 'Lamii (Camsa)',
    astronomyName: 'Pleiades (The Seven Sisters)',
    starsCount: 7,
    rightAscension: '03h 47m',
    declination: '+24° 07′',
    seasonMarker: 'Onset of Ganna (Primary Heavy Rains)',
    conjunctionMonth: 'Camsa (Month 1)',
    ecologicalMeaning:
      'When the new crescent moon (Addeessa) enters conjunction with Lamii at dusk in Camsa, the Ayyaantuu announce the onset of the long wet season (Ganna). Pastoralists commence water reservoir preparation and rotational rangeland resting.',
    proverb: '“Camsi baanaan bokkaan dhufe — When Pleiades ascends, life-giving rain descends upon the rangeland.”',
    coordinates: [
      { x: 28, y: 36 },
      { x: 36, y: 32 },
      { x: 42, y: 40 },
      { x: 48, y: 35 },
      { x: 55, y: 42 },
      { x: 62, y: 38 },
      { x: 50, y: 50 },
    ],
    color: 'from-amber-400 to-yellow-200',
  },
  {
    id: 'buusan',
    oromoName: 'Buusan (Bufa)',
    astronomyName: 'Aldebaran (Alpha Tauri / Bull’s Eye)',
    starsCount: 5,
    rightAscension: '04h 35m',
    declination: '+16° 30′',
    seasonMarker: 'Peak Pasture Growth & Lactation',
    conjunctionMonth: 'Bufa (Month 2)',
    ecologicalMeaning:
      'Buusan represents fertility, cattle abundance, and the safety of newborn calves. Its conjunction with the waxing moon signals peak milk yield across Borana pastures.',
    proverb: '“Bufi urjii looniti — Aldebaran is the sacred sentinel that watches over the herds.”',
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
    id: 'bakkalcha-sorsa',
    oromoName: 'Bakkalcha / Sorsa',
    astronomyName: 'Bellatrix (Gamma Orionis)',
    starsCount: 4,
    rightAscension: '05h 25m',
    declination: '+06° 20′',
    seasonMarker: 'Early Dry Season Transition (Bona Adoolessa)',
    conjunctionMonth: 'Waxabajjii (Month 3)',
    ecologicalMeaning:
      'Marks the drying of seasonal rainwater pools and commands the council of elders (Jaarsa) to enforce strict water-rationing rules under Seera Marraa fi Bishaan.',
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
    id: 'algajima',
    oromoName: 'Algaajima',
    astronomyName: 'Central Orion Belt (Mintaka, Alnilam, Alnitak)',
    starsCount: 3,
    rightAscension: '05h 36m',
    declination: '-01° 12′',
    seasonMarker: 'Equatorial Meridian Calibration',
    conjunctionMonth: 'Obora Gudda (Month 4)',
    ecologicalMeaning:
      'The central belt stars form the linear ruler of equatorial astronomy. Used by the Ayyaantuu to calibrate the orientation of sacred meeting enclosures and evaluate drought cycles.',
    proverb: '“Algaajimni hidha daandii samii ti — The Belt of Orion is the cosmic anchor across the heavens.”',
    coordinates: [
      { x: 30, y: 50 },
      { x: 50, y: 50 },
      { x: 70, y: 50 },
    ],
    color: 'from-emerald-400 to-teal-200',
  },
  {
    id: 'arbii',
    oromoName: 'Arbii',
    astronomyName: 'Betelgeuse (Alpha Orionis) & Saiph',
    starsCount: 4,
    rightAscension: '05h 55m',
    declination: '+07° 24′',
    seasonMarker: 'Short Rains Preparation (Hagayya)',
    conjunctionMonth: 'Obora Dikka (Month 5)',
    ecologicalMeaning:
      'Signals the transition toward the secondary short rains. Pastoralists begin moving selective herds back toward dry-season grazing reserves (Kalo).',
    proverb: '“Arbiin kormaa samii ti — Betelgeuse is the bull of the sky, heralding seasonal shift.”',
    coordinates: [
      { x: 35, y: 30 },
      { x: 65, y: 35 },
      { x: 30, y: 70 },
      { x: 70, y: 65 },
    ],
    color: 'from-amber-300 to-orange-500',
  },
  {
    id: 'majjandhirra-balla',
    oromoName: 'Majjandhirra / Balla',
    astronomyName: 'Sirius (Alpha Canis Majoris / Dog Star)',
    starsCount: 3,
    rightAscension: '06h 45m',
    declination: '-16° 42′',
    seasonMarker: 'Autumn Harvest & Gadaa Assemblies',
    conjunctionMonth: 'Birra (Month 6)',
    ecologicalMeaning:
      'The brightest stellar beacon in the southern night sky. Guides nighttime scouts, wildlife telemetry monitoring, and national Gadaa clan delegations traveling to Gaayyo.',
    proverb: '“Ballaani ifaa dachee ti — Sirius is the brilliant torch of the night voyager.”',
    coordinates: [
      { x: 50, y: 35 },
      { x: 35, y: 65 },
      { x: 65, y: 70 },
    ],
    color: 'from-cyan-300 to-white',
  },
  {
    id: 'urjii-dhahaa-basa',
    oromoName: 'Urjii Dhahaa (Basa)',
    astronomyName: 'Beta Trianguli (Triangle Constellation)',
    starsCount: 3,
    rightAscension: '02h 09m',
    declination: '+34° 59′',
    seasonMarker: 'Annual Calendar New Year Reset',
    conjunctionMonth: 'Cikawa (Month 7)',
    ecologicalMeaning:
      'The foundational calibrator of Dhaha Boranaa recorded by Asmarom Legesse. When the crescent moon aligns with Beta Trianguli, the annual cycle synchronizes without the need for solar leap years.',
    proverb: '“Urjiin dhahaa hundee baraati — The calendar star is the root from which all time flows.”',
    coordinates: [
      { x: 50, y: 25 },
      { x: 25, y: 65 },
      { x: 75, y: 65 },
    ],
    color: 'from-purple-400 to-pink-300',
  },
]

/* ---- THE 27 AYYAANA DAYS IN EXACT BORANA SEQUENCE (Asmarom Legesse, 1973) ---- */
const FULL_27_AYYAANA = [
  { id: 1, name: 'Areerii Duraa', meaning: 'First Areeri', sign: 'Auspicious day for livestock blessings and well maintenance ceremonies', category: 'pasture' },
  { id: 2, name: 'Areerii Bal’oo', meaning: 'Second Areeri', sign: 'Favorable day for communal pasture rotation decisions and rangeland resting', category: 'pasture' },
  { id: 3, name: 'Adulaa Duraa', meaning: 'First Adula', sign: 'Day of peaceful mediation; convening of elder judicial arbitration under trees', category: 'council' },
  { id: 4, name: 'Adulaa Bal’oo', meaning: 'Second Adula', sign: 'Day for electing community delegates and Gadaa youth council transitions', category: 'council' },
  { id: 5, name: 'Garba Duraa', meaning: 'First Garba', sign: 'Sanctified day for deep aquifer well excavation and singing water shifts', category: 'wells' },
  { id: 6, name: 'Garba Bal’aa', meaning: 'Second Garba', sign: 'Universal water rights renewal; cattle herd access schedules established', category: 'wells' },
  { id: 7, name: 'Garba Dullacha', meaning: 'Elder Garba', sign: 'Day of gratitude and spiritual prayer (Waaqeffannaa) for continuous rain', category: 'sanctuary' },
  { id: 8, name: 'Bittaa Duraa', meaning: 'First Bitta', sign: 'Day for surveying backcountry boundaries and wildlife movement corridors', category: 'conservation' },
  { id: 9, name: 'Bittaa Bal’aa', meaning: 'Second Bitta', sign: 'Environmental sanctuary day: zero tree felling or habitat destruction permitted', category: 'conservation' },
  { id: 10, name: 'Sorsa', meaning: 'The Bellatrix Day', sign: 'Aligned with Gamma Orionis; highly auspicious for scouting long journeys and trade', category: 'travel' },
  { id: 11, name: 'Algaajima', meaning: 'The Orion Belt Day', sign: 'Celestial ruler day: calibration of seasonal herd migration routes', category: 'pasture' },
  { id: 12, name: 'Arba', meaning: 'The Betelgeuse Day', sign: 'Symbolizes strength and endurance; scout physical training and telemetry walks', category: 'travel' },
  { id: 13, name: 'Walla', meaning: 'Day of Equilibrium', sign: 'Day of cosmic balance; resolving internal boundary disputes peacefully', category: 'council' },
  { id: 14, name: 'Basaa Duraa', meaning: 'First Basa', sign: 'Aligned with Triangulum; astronomical timekeeper observations at dusk', category: 'astronomy' },
  { id: 15, name: 'Basaa Bal’aa', meaning: 'Second Basa', sign: 'Deep well maintenance and cleansing of stone troughs (Naanniga)', category: 'wells' },
  { id: 16, name: 'Maganttii Carraa', meaning: 'Magantti of Luck', sign: 'Day of good fortune for newborn livestock and wildlife foals', category: 'pasture' },
  { id: 17, name: 'Maganttii Jaarraa', meaning: 'Magantti of Century', sign: 'Historical remembrance; reciting lineage oral histories and Gadaa laws', category: 'council' },
  { id: 18, name: 'Maganttii Biriitii', meaning: 'Magantti of Purity', sign: 'Day of spiritual purification, Buna Qalaa coffee roasting blessings', category: 'sanctuary' },
  { id: 19, name: 'Salbaana Duraa', meaning: 'First Salban', sign: 'Sanctuary day of absolute peace: hunting or harming wildlife is strictly forbidden', category: 'conservation' },
  { id: 20, name: 'Salbaana Bal’oo', meaning: 'Second Salban', sign: 'Universal wildlife water-sharing covenant reaffirmed at all 9 Tula complexes', category: 'wells' },
  { id: 21, name: 'Salbaana Dullacha', meaning: 'Elder Salban', sign: 'Honoring senior Gadammoojjii elders and wisdom keepers carrying Ulee staffs', category: 'sanctuary' },
  { id: 22, name: 'Gardaaduma', meaning: 'Rangeland Sanctuary', sign: 'Enforcing the Kalo seasonal grazing enclosures against premature entry', category: 'pasture' },
  { id: 23, name: 'Sonsa', meaning: 'Youth Apprenticeship', sign: 'Gaammee youth training in botanical taxonomy, medicinal herbs, and tracks', category: 'conservation' },
  { id: 24, name: 'Rurruma', meaning: 'Regeneration Day', sign: 'Acacia reforestation and soil conservation work around crater slopes', category: 'conservation' },
  { id: 25, name: 'Lumaasa', meaning: 'Livestock Fertility', sign: 'Blessing breeding bulls and selecting pastoral scouts for expeditions', category: 'pasture' },
  { id: 26, name: 'Gidaada', meaning: 'Scout Endurance', sign: 'Equestrian horsemanship and backcountry ranger patrols across Dida Hara', category: 'travel' },
  { id: 27, name: 'Ruuda', meaning: 'Cosmic Sky Realm', sign: 'Full stellar chart evaluation by Ayyaantuu before the next lunar transition', category: 'astronomy' },
]

/* ---- 12 LUNAR-STELLAR MONTHS (Ji'oottan Kudha Laman) ---- */
const BORANA_MONTHS = [
  { no: 1, name: 'Camsa', star: 'Lamii (Pleiades)', season: 'Ganna (Long Rains)', focus: 'Main agricultural & pastoral wet season starts.' },
  { no: 2, name: 'Bufa', star: 'Buusan (Aldebaran)', season: 'Ganna Peak', focus: 'Lactation, milk feasts, abundant water ponds.' },
  { no: 3, name: 'Waxabajjii', star: 'Bakkalcha (Bellatrix)', season: 'Adoolessa (Cool Dry)', focus: 'Surface ponds dry; transition to Tula Wells.' },
  { no: 4, name: 'Obora Gudda', star: 'Algaajima (Belt of Orion)', season: 'Adoolessa Mid', focus: 'Cool winds; cattle herds concentrated near wells.' },
  { no: 5, name: 'Obora Dikka', star: 'Arbii (Betelgeuse/Saiph)', season: 'Adoolessa Late', focus: 'Scouting forage in Kalo dry enclosures.' },
  { no: 6, name: 'Birra', star: 'Majjandhirra (Sirius)', season: 'Birra (Spring Onset)', focus: 'Wildflowers bloom; Gadaa assemblies convene.' },
  { no: 7, name: 'Cikawa', star: 'Urjii Dhahaa (Trianguli)', season: 'Hagayya (Short Rains)', focus: 'Secondary rains; livestock breeding cycle.' },
  { no: 8, name: 'Sadaasa', star: 'Lamii (Pleiades in evening)', season: 'Hagayya Peak', focus: 'Short rain showers replenish crater reservoirs.' },
  { no: 9, name: 'Abraasa', star: 'Buusan (Aldebaran zenith)', season: 'Bona (Dry Season)', focus: 'Communal singing water chains at deep wells.' },
  { no: 10, name: 'Ammaji', star: 'Bakkalcha (Night apex)', season: 'Bona Peak', focus: 'Rigorous grazing rotation and wildlife sharing.' },
  { no: 11, name: 'Gurrandhala', star: 'Algaajima (Night zenith)', season: 'Bona Late', focus: 'Final preparations for Ganna season rains.' },
  { no: 12, name: 'Bitootessa', star: 'Arbii & Lamii (Cycle End)', season: 'Transition to Ganna', focus: 'Year-end reconciliation; Ayyaantuu calendar audit.' },
]

export default function BoranaAstronomyExplorer() {
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation>(CONSTELLATIONS[0])
  const [activeTab, setActiveTab] = useState<'stars' | 'ayyaana' | 'months' | 'academic'>('stars')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredAyyaana =
    filterCategory === 'all'
      ? FULL_27_AYYAANA
      : FULL_27_AYYAANA.filter((a) => a.category === filterCategory)

  return (
    <div className="bg-forest-950 text-white rounded-2xl border border-forest-800/80 p-6 sm:p-10 shadow-card relative overflow-hidden">
      {/* Background Starry Dust Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-3xl mb-8 space-y-2">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-gold-400">
          <span className="inline-block h-px w-4 bg-gold-400" />
          <span>Ethnographic Astronomy · Grounded in Asmarom Legesse (1973)</span>
        </p>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Dhaha Boranaa: The Lunar-Stellar Calendar
        </h2>
        <p className="text-sm sm:text-base text-ivory-200/85 mt-2 leading-relaxed font-light">
          As documented in Professor Asmarom Legesse’s seminal anthropological work <em>Gada: Three Approaches to the Study of African Society</em>, the Borana Oromo developed an empirical <strong>lunar-stellar calendar</strong> that operates without solar leap years, reconciling 12 lunar cycles with 7 anchor constellations and 27 named astronomical days (*Ayyaana*).
        </p>
      </div>

      {/* Nav Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 border-b border-forest-800/80 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('stars')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'stars'
              ? 'bg-gold-500 text-charcoal-950 shadow-subtle'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <Star className="w-3.5 h-3.5" />
          <span>7 Anchor Stars (*Urjii Torban*)</span>
        </button>

        <button
          onClick={() => setActiveTab('ayyaana')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'ayyaana'
              ? 'bg-gold-500 text-charcoal-950 shadow-subtle'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>All 27 Ayyaana Days</span>
        </button>

        <button
          onClick={() => setActiveTab('months')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'months'
              ? 'bg-gold-500 text-charcoal-950 shadow-subtle'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <Orbit className="w-3.5 h-3.5" />
          <span>12 Lunar-Stellar Months</span>
        </button>

        <button
          onClick={() => setActiveTab('academic')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'academic'
              ? 'bg-gold-500 text-charcoal-950 shadow-subtle'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Asmarom Legesse Research & Namoratunga</span>
        </button>
      </div>

      {/* TAB 1: 7 ANCHOR CONSTELLATIONS VISUALIZER */}
      {activeTab === 'stars' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Star Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-400/90 mb-2">
              The 7 Guiding Stars (Legesse, Ch. 7):
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
                      </div>
                      <p className="text-xs text-gold-300/85 font-mono">{c.astronomyName}</p>
                      <p className="text-[11px] text-ivory-200/70 mt-0.5">{c.conjunctionMonth} · {c.seasonMarker}</p>
                    </div>
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 transition-transform shrink-0',
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
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-black to-charcoal-950" />

              {/* Coordinates Grid Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Render Constellation Stars */}
              <svg className="absolute inset-0 w-full h-full">
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
                      stroke="rgba(217, 119, 6, 0.45)"
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
                  <div className="w-3.5 h-3.5 rounded-full bg-gold-300 shadow-[0_0_14px_rgba(251,191,36,0.95)] animate-pulse" />
                  <span className="opacity-0 group-hover/star:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-[9px] font-mono text-gold-200 whitespace-nowrap bg-black/90 px-1.5 py-0.5 rounded border border-gold-500/30 pointer-events-none">
                    Component #{i + 1}
                  </span>
                </div>
              ))}

              {/* Badge Overlay */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl border border-gold-500/30 text-[10px] font-mono text-gold-300">
                RA {selectedConstellation.rightAscension} · Dec {selectedConstellation.declination}
              </div>

              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl border border-gold-500/30 text-[10px] font-semibold text-ivory-200">
                {selectedConstellation.starsCount} Star Components · {selectedConstellation.conjunctionMonth}
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
                <p className="font-semibold text-gold-300 mb-1">Observation & Ecological Directive:</p>
                {selectedConstellation.ecologicalMeaning}
              </div>

              <blockquote className="border-l-2 border-gold-500 pl-4 text-xs sm:text-sm italic font-serif text-gold-200/90">
                {selectedConstellation.proverb}
              </blockquote>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALL 27 AYYAANA DAYS */}
      {activeTab === 'ayyaana' && (
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                The 27 Astronomical Ayyaana Days (Asmarom Legesse, 1973)
              </h3>
              <p className="text-xs sm:text-sm text-ivory-200/80">
                A Borana month is not counted with 7-day weeks, but by the continuous progression of 27 celestial days, each with dedicated ecological, ritual, and governance mandates.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All 27 Days' },
                { id: 'pasture', label: 'Pasture & Livestock' },
                { id: 'wells', label: 'Tula Singing Wells' },
                { id: 'council', label: 'Gadaa Governance' },
                { id: 'conservation', label: 'Sanctuary & Wildlife' },
                { id: 'astronomy', label: 'Astronomical Sightings' },
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
            {filteredAyyaana.map((day) => (
              <div
                key={day.id}
                className="p-4 rounded-2xl bg-forest-900/70 border border-forest-700/80 flex items-start gap-3 hover:border-gold-500/50 transition-all"
              >
                <span className="w-8 h-8 rounded-xl bg-forest-950 border border-gold-500/30 flex items-center justify-center font-mono font-bold text-xs text-gold-400 shrink-0">
                  {day.id}
                </span>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-display font-bold text-sm text-white">{day.name}</h4>
                    <span className="text-[10px] text-gold-400/80 font-mono italic">
                      {day.meaning}
                    </span>
                  </div>
                  <p className="text-xs text-ivory-200/80 leading-relaxed font-light">{day.sign}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 12 LUNAR-STELLAR MONTHS */}
      {activeTab === 'months' && (
        <div className="relative z-10 space-y-6">
          <div className="max-w-2xl space-y-1">
            <h3 className="text-xl font-display font-bold text-white">
              The 12 Lunar-Stellar Months (Ji&apos;oottan Kudha Laman)
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/80">
              Each month begins when the new crescent moon (Addeessa) reaches conjunction with a specific guiding star, aligning seasonal climate shifts with rangeland pasture management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BORANA_MONTHS.map((m) => (
              <div
                key={m.no}
                className="p-5 rounded-2xl bg-forest-900/70 border border-forest-700/80 hover:border-gold-500/50 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    Month {m.no}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">{m.season}</span>
                </div>
                <h4 className="font-display font-bold text-lg text-white">{m.name}</h4>
                <p className="text-xs font-mono text-gold-300/90">Star: {m.star}</p>
                <p className="text-xs text-ivory-200/80 leading-relaxed font-light">{m.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ASMAROM LEGESSE RESEARCH & ARCHAEOASTRONOMY */}
      {activeTab === 'academic' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light">
            <h3 className="text-2xl font-display font-bold text-white">
              Academic Documentation: Prof. Asmarom Legesse
            </h3>
            <p>
              In his groundbreaking 1973 treatise <strong className="text-gold-300"><em>Gada: Three Approaches to the Study of African Society</em></strong> (Macmillan / Free Press) and subsequent work <strong className="text-gold-300"><em>Oromo Democracy</em></strong> (2000), Harvard-trained anthropologist Professor Asmarom Legesse provided the world&apos;s first comprehensive mathematical and ethnographic model of the Borana calendar.
            </p>
            <p className="p-4 rounded-2xl bg-forest-900 border-l-4 border-gold-400 italic text-gold-200/95 font-serif">
              “The Oromo calendar is one of the fullest and most sophisticated time-reckoning systems in Africa... It is a lunar-stellar system that relies on astronomical observations of the moon in conjunction with seven specific stars. It has no solar counterpart, yet achieves empirical alignment without leap years.”
              <span className="block text-right text-[11px] font-sans font-normal text-ivory-300 mt-1">— Asmarom Legesse, <em>Gada</em> (1973, p. 180)</span>
            </p>
            <h4 className="font-display font-bold text-base text-white pt-2">
              Namoratunga II Archaeoastronomy (c. 300 BCE)
            </h4>
            <p>
              In 1978, archaeologists B.M. Lynch and L.H. Robbins discovered the megalithic stone alignment site of <strong className="text-gold-300">Namoratunga II</strong> near Lake Turkana. The 19 upright basalt columns were calibrated to the precise rising azimuths of the 7 Borana stars documented by Asmarom Legesse (Triangulum, Pleiades, Aldebaran, Bellatrix, Central Orion, Saiph, Sirius), providing physical proof that this indigenous science has been practiced for over 2,300 years.
            </p>
          </div>

          <div className="lg:col-span-5 bg-forest-900/90 rounded-3xl border border-gold-500/30 p-6 space-y-5 shadow-xl">
            <div className="flex items-center gap-3 border-b border-forest-800 pb-3">
              <BookOpen className="w-5 h-5 text-gold-400 shrink-0" />
              <h4 className="font-display font-bold text-base text-white">
                Key Ethnographic Findings
              </h4>
            </div>
            <ul className="space-y-3.5 text-xs text-ivory-200/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">The Ayyaantuu Guild:</strong> Hereditary astronomer-philosophers who track celestial angles nightly at twilight without telescopes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Independent Lunar-Stellar Math:</strong> 354-day lunar calendar reconciled with the sidereal rotation of 7 anchor stars rather than the solar equinox.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Gadaa Harmonization:</strong> The 8-year generational transfer (Baallii) and Gumii Gaayyo assemblies are scheduled strictly according to Ayyaana alignments.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Equatorial Advantage:</strong> Borana sits at 4°–5°N, where stellar celestial arcs rise and set vertically, granting exceptional observational clarity.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
