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
  HelpCircle,
  Clock,
  Compass as CompassIcon,
  Activity,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* =========================================================================
   SCIENTIFIC & ETHNOGRAPHIC DATASET
   Hierarchy:
   1. Borana star names: Legesse 1973; Bassi 1988
   2. Star patterns & relative angular positions: Legesse Fig 7-1; Bassi 1988 Fig 1
   3. Calendar structure & synodic/sidereal correlation: Legesse Fig 7-2; Bassi Table 5
   4. Real astronomical coordinates (J2000.0): Menzel & Pasachoff 1983 / Wil Tirion
   5. Field identifications & 8th star (Bassa Diqqo): Bassi 1988 (Bante Abbagala)
   6. Moon-star observation & lunar phases: Bassi 1988; Doyle 1986; Ruggles 1987
   ========================================================================= */

export interface UrjiStar {
  id: string
  boranaName: string
  astronomicalName: string
  bayerDesignation: string
  constellation: string
  ra: string // Right Ascension (J2000.0)
  dec: string // Declination (J2000.0)
  angularDistance: number // Relative RA angular distance from Sheratan (West 0° to East 86°)
  deltaDistance: string // Distance from previous star in the sequence
  conjunctionDay: string // Corresponding Ayyaana day in 8-night observation sequence
  conjunctionMonth: string
  seasonRole: string
  observationRule: string
  proverb: string
  xPos: number // Visual X coordinate on Sky Dome canvas (0-100%)
  yPos: number // Visual Y coordinate on Sky Dome canvas (0-100%)
  color: string
}

export const URJI_DAHA_STARS: UrjiStar[] = [
  {
    id: 'lami',
    boranaName: 'Lami',
    astronomicalName: 'Sheratan & Hamal',
    bayerDesignation: 'β & α Arietis',
    constellation: 'Aries (The Ram)',
    ra: '1h 55m – 2h 07m',
    dec: '+20° 48′ to +23° 28′',
    angularDistance: 0,
    deltaDistance: 'Western datum point (0°)',
    conjunctionDay: 'Bita Kara (First Bita)',
    conjunctionMonth: 'Bittottessa / Camsa (Month 5 & 6)',
    seasonRole: 'Primary Western Sky Datum & Wet Season Initializer',
    observationRule:
      'Western reference star. When the moon is sighted to the east of Sheratan at dawn or dusk, conjunction with Lami is provisionally declared, designating the day as Bita Kara.',
    proverb: '“Lamiin dura baana, bokkaan dachee qabbaneessa — When Lami leads the sky, rain cools the earth.”',
    xPos: 12,
    yPos: 38,
    color: 'from-amber-300 to-yellow-100',
  },
  {
    id: 'busan',
    boranaName: 'Busan',
    astronomicalName: 'The Pleiades (Seven Sisters)',
    bayerDesignation: 'η Tauri (Alcyone)',
    constellation: 'Taurus (The Bull)',
    ra: '3h 47m',
    dec: '+24° 06′',
    angularDistance: 28,
    deltaDistance: '+26.5° from Lami',
    conjunctionDay: 'Bita Balla (Second Bita)',
    conjunctionMonth: 'Camsa / Bufa (Month 6 & 7)',
    seasonRole: 'Peak Lactation & Rangeland Regeneration',
    observationRule:
      'Represented by Alcyone. When the moon shifts eastward to Busan on the second night of observation, the day is established as Bita Balla.',
    proverb: '“Camsi baanaan bokkaan dhufe — When Pleiades ascends, life-giving rain descends.”',
    xPos: 25,
    yPos: 32,
    color: 'from-amber-400 to-yellow-300',
  },
  {
    id: 'baqqalch-sors',
    boranaName: 'Baqqalch Sors',
    astronomicalName: 'Aldebaran',
    bayerDesignation: 'α Tauri (Bull’s Eye)',
    constellation: 'Taurus (The Bull)',
    ra: '4h 36m',
    dec: '+16° 31′',
    angularDistance: 40.25,
    deltaDistance: '+12.25° from Busan',
    conjunctionDay: 'Sors (Sorsa)',
    conjunctionMonth: 'Bufa (Month 7)',
    seasonRole: 'Primary Checking Datum & Herd Fertility Anchor',
    observationRule:
      'Supreme reference star of the Ayyaantuu. On the 4th checking night, if the moon has not overtaken Aldebaran, conjunction with Baqqalch Sors prevails over all other provisional sightings.',
    proverb: '“Bufi urjii looniti — Aldebaran is the sacred sentinel that watches over the cattle herds.”',
    xPos: 38,
    yPos: 54,
    color: 'from-rose-400 to-orange-300',
  },
  {
    id: 'baqqalch-algajim',
    boranaName: 'Baqqalch Algajim',
    astronomicalName: 'Bellatrix',
    bayerDesignation: 'γ Orionis',
    constellation: 'Orion (The Hunter)',
    ra: '5h 25m',
    dec: '+06° 21′',
    angularDistance: 52.5,
    deltaDistance: '+12.25° from Sors',
    conjunctionDay: 'Algajim (Algaajima)',
    conjunctionMonth: 'Wachabajji (Month 8)',
    seasonRole: 'Onset of Dry Season (Bona Adoolessa)',
    observationRule:
      'Marks the transition when surface rain ponds dry up and communities enact water-rationing rules at the deep Tula Wells.',
    proverb: '“Waxabajjiin laga gogsa — Waxabajjii star signals the turning of seasonal waters to stone shafts.”',
    xPos: 50,
    yPos: 46,
    color: 'from-sky-300 to-blue-200',
  },
  {
    id: 'arb-gaddu',
    boranaName: 'Arb Gaddu',
    astronomicalName: 'Central Orion Belt (Mintaka, Alnilam, Alnitak)',
    bayerDesignation: 'δ, ε, ζ Orionis',
    constellation: 'Orion (The Hunter)',
    ra: '5h 32m – 5h 41m',
    dec: '-00° 18′ to -01° 57′',
    angularDistance: 55.25,
    deltaDistance: '+2.45° from Algajim',
    conjunctionDay: 'Arb (Arba)',
    conjunctionMonth: 'Obora Gudda (Month 9)',
    seasonRole: 'Equatorial Celestial Meridian Anchor',
    observationRule:
      'Represented by central star Alnilam. Located virtually on the celestial equator (0° Dec), providing a linear ruler across the night sky.',
    proverb: '“Arbiin kormaa samii ti — The Orion belt is the cosmic ruler bridging North and South.”',
    xPos: 61,
    yPos: 52,
    color: 'from-emerald-400 to-teal-200',
  },
  {
    id: 'baqqalch-walla',
    boranaName: 'Baqqalch Walla',
    astronomicalName: 'Betelgeuse',
    bayerDesignation: 'α Orionis',
    constellation: 'Orion (The Hunter)',
    ra: '5h 55m',
    dec: '+07° 24′',
    angularDistance: 60,
    deltaDistance: '+4.75° from Arb Gaddu',
    conjunctionDay: 'Walla',
    conjunctionMonth: 'Obora Diqqa (Month 10)',
    seasonRole: 'Preparation for Secondary Rains (Hagayya)',
    observationRule:
      'Identified as Betelgeuse in field observations by Bassi (1988). When the moon reaches Walla, dry-season forage reserves (Kalo) are surveyed.',
    proverb: '“Wallaani qajeelfama bonaati — Walla guides the pastoralist through the heart of the dry season.”',
    xPos: 71,
    yPos: 35,
    color: 'from-amber-300 to-orange-400',
  },
  {
    id: 'baqqalch-basa-guddo',
    boranaName: 'Baqqalch Basa Guddo',
    astronomicalName: 'Sirius (The Dog Star)',
    bayerDesignation: 'α Canis Majoris',
    constellation: 'Canis Major (Greater Dog)',
    ra: '6h 45m',
    dec: '-16° 43′',
    angularDistance: 72.5,
    deltaDistance: '+12.5° from Walla',
    conjunctionDay: 'Basa Kara (First Basa)',
    conjunctionMonth: 'Birra (Month 11)',
    seasonRole: 'Brilliant Southern Sentinel & Assembly Guide',
    observationRule:
      'The brightest star in the night sky. In conjunction with the moon on the 8th night of the observation series, designating Basa Kara.',
    proverb: '“Ballaani ifaa dachee ti — Sirius is the great nocturnal torch of the traveler.”',
    xPos: 83,
    yPos: 68,
    color: 'from-cyan-300 to-white',
  },
  {
    id: 'baqqalch-basa-diqqo',
    boranaName: 'Baqqalch Basa Diqqo',
    astronomicalName: 'Procyon',
    bayerDesignation: 'α Canis Minoris',
    constellation: 'Canis Minor (Lesser Dog)',
    ra: '7h 39m',
    dec: '+05° 13′',
    angularDistance: 86,
    deltaDistance: '+13.5° from Basa Guddo',
    conjunctionDay: 'Basa Balla (Second Basa)',
    conjunctionMonth: 'Chiqa (Month 12)',
    seasonRole: 'Final Eastern Sighting & Year-End Closure',
    observationRule:
      'Documented by Marco Bassi from elder Bante Abbagala (1988). The 8th star in the Urji Daha sequence that completes the monthly conjunction sweep.',
    proverb: '“Basa diqqaan goolaba samii ti — The lesser Basa closes the eastern arch of observation.”',
    xPos: 94,
    yPos: 42,
    color: 'from-purple-300 to-pink-200',
  },
]

/* ---- THE 27 AYYAANA DAYS IN EXACT BORANA ORDER (Legesse 1973; Bassi 1988) ---- */
export const FULL_27_AYYAANA = [
  { id: 1, name: 'Areerii Duraa (Kara)', meaning: 'First Areeri', sign: 'Livestock health blessings, deep well inspection', category: 'pasture' },
  { id: 2, name: 'Areerii Bal’oo', meaning: 'Second Areeri', sign: 'Rangeland forage rotation, seasonal herd moving', category: 'pasture' },
  { id: 3, name: 'Adulaa Duraa (Kara)', meaning: 'First Adula', sign: 'Judicial arbitration under shade trees, peace covenants', category: 'council' },
  { id: 4, name: 'Adulaa Bal’oo', meaning: 'Second Adula', sign: 'Youth council elections, community delegation mandates', category: 'council' },
  { id: 5, name: 'Garba Duraa (Kara)', meaning: 'First Garba', sign: 'Deep aquifer well excavation and chanting shifts', category: 'wells' },
  { id: 6, name: 'Garba Bal’aa', meaning: 'Second Garba', sign: 'Universal water rights renewal, livestock watering schedules', category: 'wells' },
  { id: 7, name: 'Garba Dullacha', meaning: 'Elder Garba', sign: 'Waaqeffannaa prayers for continuous rain and blessing', category: 'sanctuary' },
  { id: 8, name: 'Bittaa Duraa (Kara)', meaning: 'First Bitta', sign: 'Boundary scouting, wildlife movement observation', category: 'conservation' },
  { id: 9, name: 'Bittaa Bal’aa', meaning: 'Second Bitta', sign: 'Environmental sanctuary: zero tree cutting or hunting', category: 'conservation' },
  { id: 10, name: 'Sorsa', meaning: 'Bellatrix Sighting Day', sign: 'Aligned with Baqqalch Sors; scouting long trade journeys', category: 'astronomy' },
  { id: 11, name: 'Algaajima', meaning: 'Orion Belt Day', sign: 'Celestial ruler day; seasonal herd route calibration', category: 'astronomy' },
  { id: 12, name: 'Arba', meaning: 'Betelgeuse Strength Day', sign: 'Scout endurance training, backcountry border patrols', category: 'council' },
  { id: 13, name: 'Walla', meaning: 'Equilibrium Day', sign: 'Resolving rangeland disputes with impartial consensus', category: 'council' },
  { id: 14, name: 'Basaa Duraa (Kara)', meaning: 'First Basa (Sirius)', sign: 'Sirius conjunction observation; astronomical recording', category: 'astronomy' },
  { id: 15, name: 'Basaa Bal’aa', meaning: 'Second Basa (Procyon)', sign: 'Deep well trough cleansing (Naanniga repairs)', category: 'wells' },
  { id: 16, name: 'Maganttii Carraa', meaning: 'Magantti of Luck', sign: 'Favorable fortune for newborn livestock and foals', category: 'pasture' },
  { id: 17, name: 'Maganttii Jaarraa', meaning: 'Magantti of Century', sign: 'Oral history recitations, Gadaa constitution memory', category: 'council' },
  { id: 18, name: 'Maganttii Biriitii', meaning: 'Magantti of Purity', sign: 'Buna Qalaa roasted coffee ceremonies and purification', category: 'sanctuary' },
  { id: 19, name: 'Salbaana Duraa (Kara)', meaning: 'First Salban', sign: 'Sanctuary day of absolute peace: zero hunting permitted', category: 'conservation' },
  { id: 20, name: 'Salbaana Bal’oo', meaning: 'Second Salban', sign: 'Wildlife water sharing covenant reaffirmed at all 9 Tula', category: 'wells' },
  { id: 21, name: 'Salbaana Dullacha', meaning: 'Elder Salban', sign: 'Honoring Gadammoojjii sage elders with Ulee staffs', category: 'sanctuary' },
  { id: 22, name: 'Gardaaduma', meaning: 'Rangeland Sanctuary', sign: 'Enforcing dry-season grazing enclosure (Kalo) laws', category: 'pasture' },
  { id: 23, name: 'Sonsa', meaning: 'Youth Instruction', sign: 'Gaammee apprentice education in botany and tracking', category: 'conservation' },
  { id: 24, name: 'Rurruma', meaning: 'Regeneration Day', sign: 'Acacia reforestation and soil conservation work', category: 'conservation' },
  { id: 25, name: 'Lumaasa', meaning: 'Herd Fertility Day', sign: 'Breeding bull selection and pasture scout planning', category: 'pasture' },
  { id: 26, name: 'Gidaada', meaning: 'Endurance Day', sign: 'Horsemanship and backcountry ranger patrols', category: 'council' },
  { id: 27, name: 'Ruuda', meaning: 'Cosmic Sky Realm', sign: 'Full astronomical evaluation before lunar transition', category: 'astronomy' },
]

/* ---- CORRELATION OF SIDEREAL & SYNODIC PERIODS (Bassi 1988 Table 5; Legesse 1973 Fig 7-2) ---- */
export const BORANA_CALENDAR_MONTHS = [
  { no: 1, name: 'Sadasa', initialDays: 'Gidaada, Ruuda', starConjunction: 'Lami / Pleiades in evening', isIntercalary: false, season: 'Hagayya (Short Rains Peak)', focus: 'Short showers replenish volcanic caldera reservoirs.' },
  { no: 2, name: 'Abrasa', initialDays: 'Areerii Duraa, Areerii Bal’oo', starConjunction: 'Buusan (Aldebaran zenith)', isIntercalary: false, season: 'Bona (Dry Season Early)', focus: 'Transition to dry season; herd grazing organized.' },
  { no: 3, name: 'Ammaji', initialDays: 'Adulaa Duraa, Adulaa Bal’oo', starConjunction: 'Baqqalch Sors (Midnight apex)', isIntercalary: false, season: 'Bona Peak', focus: 'Intensive watering shifts at Tula Singing Wells.' },
  { no: 4, name: 'Gurrandala', initialDays: 'Garba Duraa, Garba Bal’aa', starConjunction: 'Arb Gaddu (Orion Belt)', isIntercalary: false, season: 'Bona Late', focus: 'Final dry season grazing in Kalo enclosures.' },
  { no: '4a', name: 'Gurrandala (bis)', initialDays: 'Garba Dullacha', starConjunction: 'Intercalary Leap Month (Every ~3 Yrs)', isIntercalary: true, season: 'Intercalary Reset', focus: 'Added to reconcile the 11-day annual solar difference.' },
  { no: 5, name: 'Bittottessa', initialDays: 'Bittaa Duraa, Bittaa Bal’aa', starConjunction: 'Lami (Sheratan & Hamal)', isIntercalary: false, season: 'Transition to Ganna', focus: 'Year-end reconciliation; Ayyaantuu calendar audit.' },
  { no: 6, name: 'Camsa', initialDays: 'Sorsa, Algaajima', starConjunction: 'Lamii (Pleiades at Dusk)', isIntercalary: false, season: 'Ganna (Long Rains Start)', focus: 'Major wet season starts; pasture expansion.' },
  { no: 7, name: 'Bufa', initialDays: 'Arba, Walla', starConjunction: 'Buusan (Aldebaran at Dusk)', isIntercalary: false, season: 'Ganna Peak', focus: 'Peak milk production, herd fertility celebrations.' },
  { no: 8, name: 'Wachabajji', initialDays: 'Basaa Duraa, Basaa Bal’aa', starConjunction: 'Baqqalch Algajim (Bellatrix)', isIntercalary: false, season: 'Adoolessa (Cool Dry)', focus: 'Surface rainwater ponds dry; well shifts resume.' },
  { no: 9, name: 'Obora Gudda', initialDays: 'Maganttii Jaarraa, Maganttii Biriitii', starConjunction: 'Arb Gaddu (Orion Belt at Dusk)', isIntercalary: false, season: 'Adoolessa Mid', focus: 'Cool winds; cattle herds concentrated near aquifers.' },
  { no: 10, name: 'Obora Diqqa', initialDays: 'Salbaana Duraa, Salbaana Bal’oo', starConjunction: 'Baqqalch Walla (Betelgeuse)', isIntercalary: false, season: 'Adoolessa Late', focus: 'Scouting forage in reserved grasslands.' },
  { no: '10a', name: 'Obora Diqqa (bis)', initialDays: 'Salbaana Dullacha', starConjunction: 'Intercalary Leap Month (Every ~3 Yrs)', isIntercalary: true, season: 'Intercalary Reset', focus: 'Alternative leap month added based on lunar phase in duqqana.' },
  { no: 11, name: 'Birra', initialDays: 'Gardaaduma, Sonsa', starConjunction: 'Majjandhirra (Sirius at Dawn)', isIntercalary: false, season: 'Birra (Spring Onset)', focus: 'Wildflowers bloom; Gadaa assemblies convene at Gaayyo.' },
  { no: 12, name: 'Chiqa', initialDays: 'Rurruma, Lumaasa', starConjunction: 'Bassa Diqqo (Procyon at Dawn)', isIntercalary: false, season: 'Hagayya Onset', focus: 'Preparation for secondary planting and livestock breeding.' },
]

export default function BoranaAstronomyExplorer() {
  const [selectedStar, setSelectedStar] = useState<UrjiStar>(URJI_DAHA_STARS[2]) // Default to Baqqalch Sors (Aldebaran)
  const [activeTab, setActiveTab] = useState<'skyDome' | 'conjunctions' | 'calendar' | 'ayyaana' | 'scholarship'>('skyDome')
  const [selectedMonth, setSelectedMonth] = useState(BORANA_CALENDAR_MONTHS[5]) // Default Camsa
  const [filterCategory, setFilterCategory] = useState('all')
  const [showObservationNights, setShowObservationNights] = useState(true)

  const filteredAyyaana =
    filterCategory === 'all'
      ? FULL_27_AYYAANA
      : FULL_27_AYYAANA.filter((a) => a.category === filterCategory)

  return (
    <div className="bg-forest-950 text-white rounded-2xl border border-forest-800/80 p-6 sm:p-10 shadow-card relative overflow-hidden font-sans">
      {/* Starry Nebula Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/15 via-forest-950/80 to-forest-950 pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 max-w-3xl mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-gold-400 bg-gold-950/80 px-3.5 py-1 rounded-full border border-gold-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Scientific Ethnography: Legesse (1973) · Bassi (1988) · Doyle (1986)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Dhaha Boranaa: The Celestial Astronomy Simulator
        </h2>
        <p className="text-sm sm:text-base text-ivory-200/85 leading-relaxed font-light">
          An empirical indigenous astronomical system that charts the right ascension of 8 anchor stars (*Urji Daha*) in conjunction with the moon, reconciling the 27.3-day sidereal cycle with 29.5-day synodic lunar months without relying on solar equinoxes.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 flex flex-wrap gap-2 border-b border-forest-800 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('skyDome')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'skyDome'
              ? 'bg-gold-500 text-charcoal-950 shadow-sm'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <CompassIcon className="w-3.5 h-3.5" />
          <span>1. Sky Dome & 8 Stars (*Urji Daha*)</span>
        </button>

        <button
          onClick={() => setActiveTab('conjunctions')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'conjunctions'
              ? 'bg-gold-500 text-charcoal-950 shadow-sm'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>2. 8-Night Moon Observation (Bassi Fig. 1)</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'calendar'
              ? 'bg-gold-500 text-charcoal-950 shadow-sm'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <Orbit className="w-3.5 h-3.5" />
          <span>3. 12 Months & Intercalation (Table 5)</span>
        </button>

        <button
          onClick={() => setActiveTab('ayyaana')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'ayyaana'
              ? 'bg-gold-500 text-charcoal-950 shadow-sm'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>4. All 27 Ayyaana Days</span>
        </button>

        <button
          onClick={() => setActiveTab('scholarship')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
            activeTab === 'scholarship'
              ? 'bg-gold-500 text-charcoal-950 shadow-sm'
              : 'bg-forest-900/60 text-ivory-200 hover:bg-forest-850 border border-forest-700/60'
          )}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>5. Academic Literature & Namoratunga</span>
        </button>
      </div>

      {/* TAB 1: SKY DOME & 8 ANCHOR STARS (URJI DAHA) */}
      {activeTab === 'skyDome' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Star Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-400">
                The 8 Stars of Urji Daha (West → East):
              </p>
              <span className="text-[10px] font-mono text-ivory-300/80">0° to 86° RA</span>
            </div>
            <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
              {URJI_DAHA_STARS.map((s, idx) => {
                const isSelected = selectedStar.id === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStar(s)}
                    className={cn(
                      'w-full text-left p-3.5 rounded-2xl transition-all border flex items-center justify-between',
                      isSelected
                        ? 'bg-forest-900 border-gold-400 shadow-md ring-1 ring-gold-400/50'
                        : 'bg-forest-950/70 border-forest-800/80 hover:bg-forest-900/50'
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-forest-950 text-gold-400 border border-gold-500/20">
                          #{idx + 1}
                        </span>
                        <span className="font-display font-bold text-sm text-white">{s.boranaName}</span>
                      </div>
                      <p className="text-xs text-gold-300/90 font-mono mt-0.5">{s.astronomicalName} ({s.bayerDesignation})</p>
                      <p className="text-[10px] text-ivory-300/70 font-mono">RA {s.angularDistance}° · Conjunction Day: {s.conjunctionDay}</p>
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

          {/* Right: Interactive Sky Dome Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-forest-900/90 rounded-3xl border border-forest-700/80 p-6 sm:p-8 space-y-6 shadow-xl relative backdrop-blur-sm">
            {/* Celestial Sky Dome Simulation */}
            <div className="relative aspect-[16/9] w-full rounded-2xl bg-charcoal-950 border border-forest-800 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950/40 via-black to-charcoal-950" />

              {/* Equatorial Celestial Grid (Right Ascension Lines) */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:32px_32px]" />

              {/* Celestial Equator / Zero Declination Guideline */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-b border-dashed border-cyan-500/30">
                <span className="absolute left-3 bottom-1 text-[9px] font-mono text-cyan-400/60 uppercase">Celestial Equator (0° Dec)</span>
              </div>

              {/* Star Nodes along the Celestial Arc */}
              {URJI_DAHA_STARS.map((s) => {
                const isSelected = selectedStar.id === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStar(s)}
                    style={{ left: `${s.xPos}%`, top: `${s.yPos}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer z-10"
                  >
                    <div
                      className={cn(
                        'rounded-full transition-all duration-300',
                        isSelected
                          ? 'w-5 h-5 bg-gold-300 shadow-[0_0_18px_rgba(251,191,36,1)] ring-2 ring-white scale-125'
                          : 'w-3 h-3 bg-gold-400/90 shadow-[0_0_8px_rgba(251,191,36,0.7)] group-hover/node:scale-125'
                      )}
                    />
                    <span className="opacity-0 group-hover/node:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 text-[9px] font-mono text-gold-200 whitespace-nowrap bg-black/90 px-2 py-0.5 rounded border border-gold-500/40 pointer-events-none">
                      {s.boranaName} ({s.astronomicalName})
                    </span>
                  </button>
                )
              })}

              {/* Sky Dome Top Metadata Badges */}
              <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gold-500/30 text-[10px] font-mono text-gold-300">
                West (0° Lami) ──────── East (86° Basa Diqqo)
              </div>

              <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gold-500/30 text-[10px] font-mono text-ivory-200">
                Selected: <strong className="text-gold-400">{selectedStar.boranaName}</strong> (RA {selectedStar.angularDistance}°)
              </div>
            </div>

            {/* Selected Star Deep Dossier */}
            <div className="space-y-4 pt-1">
              <div className="flex items-baseline justify-between gap-4 border-b border-forest-800 pb-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
                    {selectedStar.astronomicalName} · {selectedStar.bayerDesignation}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    {selectedStar.boranaName}
                  </h3>
                </div>
                <div className="text-right font-mono text-xs">
                  <p className="text-gold-300 font-bold">RA {selectedStar.ra}</p>
                  <p className="text-ivory-300/70">Dec {selectedStar.dec}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-forest-950/80 p-3.5 rounded-xl border border-forest-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block mb-0.5">
                    Conjunction Day (Ayyaana)
                  </span>
                  <p className="font-semibold text-white">{selectedStar.conjunctionDay}</p>
                  <p className="text-[11px] text-ivory-300/80 mt-1">{selectedStar.deltaDistance}</p>
                </div>

                <div className="bg-forest-950/80 p-3.5 rounded-xl border border-forest-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                    Ecological Season Mandate
                  </span>
                  <p className="font-semibold text-white">{selectedStar.seasonRole}</p>
                  <p className="text-[11px] text-ivory-300/80 mt-1">{selectedStar.conjunctionMonth}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-forest-950/80 border border-forest-800 text-xs text-ivory-200/90 leading-relaxed space-y-1.5">
                <p className="font-bold text-gold-300 uppercase tracking-wider text-[10px]">
                  Ayyaantuu Observational Directive:
                </p>
                <p>{selectedStar.observationRule}</p>
              </div>

              <blockquote className="border-l-2 border-gold-500 pl-4 text-xs italic font-serif text-gold-200/95">
                {selectedStar.proverb}
              </blockquote>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 8-NIGHT MOON-STAR CONJUNCTION SEQUENCE (Bassi 1988 Fig. 1 & Table 3/4) */}
      {activeTab === 'conjunctions' && (
        <div className="relative z-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              The 8-Night Monthly Conjunction Sweep (Bassi 1988, Fig. 1)
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed font-light">
              Every month over 8 consecutive nights, the moon travels eastward across the 8 stars of *Urji Daha*. Because the moon moves ~13° eastward every 24 hours, the *Ayyaantuu* check two critical reference anchors at dawn/dusk: <strong>Sheratan (Lami, 0°)</strong> and <strong>Aldebaran (Baqqalch Sors, 40.25°)</strong>.
            </p>
          </div>

          {/* Conjunction Mapping Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { night: 'Night 1–2', star: 'Lami (Sheratan/Hamal)', day: 'Bita Kara', ra: '0° – 3°', note: 'If moon is east of Sheratan at dawn, conjunction with Lami is provisionally declared.' },
              { night: 'Night 3', star: 'Busan (Pleiades)', day: 'Bita Balla', ra: '28°', note: 'Moon advances +26.5° eastward to Alcyone, designating Bita Balla.' },
              { night: 'Night 4 (Checking)', star: 'Baqqalch Sors (Aldebaran)', day: 'Sors (Sorsa)', ra: '40.25°', note: 'The supreme checking night. If moon has not overtaken Aldebaran, Sors prevails.' },
              { night: 'Night 5', star: 'Baqqalch Algajim (Bellatrix)', day: 'Algajim', ra: '52.5°', note: 'Moon enters Orion head constellation.' },
              { night: 'Night 6', star: 'Arb Gaddu (Orion Belt)', day: 'Arb', ra: '55.25°', note: 'Conjunction with Alnilam across the celestial equator.' },
              { night: 'Night 7', star: 'Baqqalch Walla (Betelgeuse)', day: 'Walla', ra: '60°', note: 'Aligned with Betelgeuse in eastern Orion.' },
              { night: 'Night 8', star: 'Basa Guddo (Sirius)', day: 'Basa Kara', ra: '72.5°', note: 'Conjunction with the brightest star Sirius in Canis Major.' },
              { night: 'Night 9', star: 'Basa Diqqo (Procyon)', day: 'Basa Balla', ra: '86°', note: 'Final eastern boundary sighting in Canis Minor before cycle completion.' },
            ].map((c, i) => (
              <div
                key={c.star}
                className="p-4 rounded-2xl bg-forest-900/80 border border-forest-700/80 space-y-2 hover:border-gold-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-gold-400 bg-forest-950 px-2 py-0.5 rounded border border-gold-500/30">
                      {c.night}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">RA {c.ra}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-white mt-2">{c.star}</h4>
                  <p className="text-xs font-semibold text-gold-300">Ayyaana: {c.day}</p>
                  <p className="text-xs text-ivory-200/80 font-light mt-1 leading-relaxed">{c.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Three Periods of the Lunar Month (Bati, Gobana, Duqqana) */}
          <div className="bg-forest-900/90 rounded-2xl border border-forest-700 p-6 space-y-4">
            <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Moon className="w-4 h-4 text-gold-400" />
              The Three Lunar Periods of the Synodic Month (*Bassi 1988: 623*)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-forest-950 p-4 rounded-xl border border-forest-800 space-y-1">
                <strong className="text-gold-400 text-sm block">1. Bati (Waxing Crescent to Full)</strong>
                <p className="text-ivory-200/80">From new moon to day before full moon (13–14 days). Observed above western horizon after sunset.</p>
              </div>
              <div className="bg-forest-950 p-4 rounded-xl border border-forest-800 space-y-1">
                <strong className="text-emerald-400 text-sm block">2. Gobana (The Full Moon Day)</strong>
                <p className="text-ivory-200/80">The single day on which the moon has not yet risen at sunset. Critical checkpoint for calendar audit.</p>
              </div>
              <div className="bg-forest-950 p-4 rounded-xl border border-forest-800 space-y-1">
                <strong className="text-rose-400 text-sm block">3. Duqqana (Waning Moon)</strong>
                <p className="text-ivory-200/80">From day after gobana to day before new moon (~15 days). Days counted to determine intercalary month needs.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 12 LUNAR-STELLAR MONTHS & INTERCALATION (Table 5 & Legesse Fig 7-2) */}
      {activeTab === 'calendar' && (
        <div className="relative z-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Correlation of Sidereal & Synodic Periods (Table 5)
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed font-light">
              Because 12 lunar months (354 days) are 11 days shorter than the solar year, the Borana system introduces an <strong>intercalary month approximately every 3 years</strong>. According to elder Bante Abbagala, only two months can ever be repeated: <strong>Gurrandala (bis)</strong> (4a) and <strong>Obora Diqqa (bis)</strong> (10a).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BORANA_CALENDAR_MONTHS.map((m) => (
              <div
                key={m.name}
                onClick={() => setSelectedMonth(m)}
                className={cn(
                  'p-5 rounded-2xl border transition-all cursor-pointer space-y-2 flex flex-col justify-between',
                  m.isIntercalary
                    ? 'bg-amber-950/40 border-gold-500/50 hover:bg-amber-950/60'
                    : selectedMonth.name === m.name
                    ? 'bg-forest-900 border-gold-400 shadow-md ring-1 ring-gold-400/40'
                    : 'bg-forest-900/60 border-forest-800 hover:bg-forest-850'
                )}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded',
                        m.isIntercalary
                          ? 'bg-gold-500 text-charcoal-950'
                          : 'bg-forest-950 text-gold-400 border border-gold-500/20'
                      )}
                    >
                      Month {m.no}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400">{m.season}</span>
                  </div>

                  <h4 className="font-display font-bold text-base text-white">{m.name}</h4>
                  <p className="text-xs font-mono text-gold-300/90">Initial Days (Bati): {m.initialDays}</p>
                  <p className="text-[11px] text-ivory-200/80 leading-relaxed font-light">{m.focus}</p>
                </div>

                {m.isIntercalary && (
                  <div className="pt-2 border-t border-gold-500/30 text-[10px] font-mono text-gold-400">
                    ★ Intercalary Leap Month (Every ~3 Years)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ALL 27 AYYAANA DAYS */}
      {activeTab === 'ayyaana' && (
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                The 27 Named Ayyaana Astronomical Days (Legesse 1973; Bassi 1988)
              </h3>
              <p className="text-xs sm:text-sm text-ivory-200/80">
                The 27-day cycle represents the exact lunar sidereal period (27.3 days). The 0.3-day deviation is corrected immediately when the moon aligns with Lami, adding a day every ~3 sidereal cycles.
              </p>
            </div>

            {/* Filter Chips */}
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

      {/* TAB 5: ACADEMIC LITERATURE & NAMORATUNGA HIERARCHY */}
      {activeTab === 'scholarship' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5 text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light">
            <h3 className="text-2xl font-display font-bold text-white">
              Academic Hierarchy & Research Synthesis
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-forest-900/90 border border-forest-700 space-y-1">
                <span className="text-[10px] font-mono uppercase text-gold-400 font-bold block">
                  1. Foundational Discovery: Legesse (1973)
                </span>
                <p>
                  Prof. Asmarom Legesse published the first mathematical and ethnographic model of the Borana calendar in <em>Gada: Three Approaches to the Study of African Society</em> (1973, Ch. 7, Figures 7-1 & 7-2), discovering the 7-star system and 27-day *Ayyaana* cycle.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-forest-900/90 border border-forest-700 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  2. Archaeoastronomical Calibration: Lynch & Robbins (1978); Doyle (1986); Ruggles (1987)
                </span>
                <p>
                  At Namoratunga II (Lake Turkana), 19 basalt stone pillars dating to ~300 BCE align with the 7 Borana stars. L.R. Doyle (1986) demonstrated how ancient declination alignments evolved into modern right-ascension tracking.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-forest-900/90 border border-forest-700 space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                  3. Field Observational Precision: Marco Bassi (1988)
                </span>
                <p>
                  In <em>Current Anthropology</em> (Vol. 29, No. 4, 1988), Marco Bassi worked with master *Ayyaantuu* elder Bante Abbagala to document the exact 8-night observation sequence, identify the 8th star (Procyon / Bassa Diqqo), and establish the intercalary month rules (*Gurrandala bis* and *Obora Diqqa bis*).
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-forest-900/90 rounded-3xl border border-gold-500/30 p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-forest-800 pb-3">
              <BookOpen className="w-5 h-5 text-gold-400 shrink-0" />
              <h4 className="font-display font-bold text-base text-white">
                Core Citations
              </h4>
            </div>

            <ul className="space-y-3 text-xs text-ivory-200/90 font-mono">
              <li className="p-2.5 rounded-xl bg-forest-950 border border-forest-800">
                <strong>Legesse, A. (1973)</strong> — <em>Gada: Three Approaches to the Study of African Society</em>. Free Press / Macmillan.
              </li>
              <li className="p-2.5 rounded-xl bg-forest-950 border border-forest-800">
                <strong>Bassi, M. (1988)</strong> — “On the Borana Calendrical System: A Preliminary Field Report”. <em>Current Anthropology</em>, 29(4):619–624.
              </li>
              <li className="p-2.5 rounded-xl bg-forest-950 border border-forest-800">
                <strong>Lynch, B.M. & Robbins, L.H. (1978)</strong> — “Namoratunga: The First Archaeoastronomical Evidence in Sub-Saharan Africa”. <em>Science</em>, 200:766–768.
              </li>
              <li className="p-2.5 rounded-xl bg-forest-950 border border-forest-800">
                <strong>Doyle, L.R. (1986)</strong> — “The Borana Calendar Revisited”. <em>Current Anthropology</em>, 27(3):286–287.
              </li>
              <li className="p-2.5 rounded-xl bg-forest-950 border border-forest-800">
                <strong>Menzel, D.H. & Pasachoff, J.M. (1983)</strong> — <em>Field Guide to the Stars and Planets</em> (Wil Tirion charts).
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
