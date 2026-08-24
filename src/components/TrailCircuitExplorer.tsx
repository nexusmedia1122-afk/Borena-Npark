'use client'

import { useState } from 'react'
import { Route, Mountain, Clock, ShieldCheck, Droplets, Footprints, ArrowRight, Compass } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TrailCircuit {
  id: string
  name: string
  subtitle: string
  distance: string
  duration: string
  elevationGain: string
  elevationPeak: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  terrain: string
  highlights: string[]
  waterPoints: string
  rangerRequired: boolean
  gearRecommendation: string
}

const TRAILS: TrailCircuit[] = [
  {
    id: 'el-sod',
    name: 'El Sod "House of Salt" Caldera Descent',
    subtitle: 'Descent into a 600m Deep Volcanic Salt Caldera & Mineral Lake',
    distance: '7.5 km (Return)',
    duration: '3.5 – 4.5 Hours',
    elevationGain: '-620m Descent / +620m Ascent',
    elevationPeak: '1,880m Rim → 1,260m Caldera Floor',
    difficulty: 'Moderate',
    terrain: 'Steep basalt volcanic stone paths and switchback trails',
    highlights: [
      'Panoramic 360° views across the circular volcanic caldera rim',
      'Witness customary mud-salt extraction from subterranean black brine lake',
      'Cliff-nesting raptor spotting including Verreaux’s eagles',
    ],
    waterPoints: 'No potable water inside caldera; carry minimum 2.5L per person',
    rangerRequired: true,
    gearRecommendation: 'Sturdy ankle-support hiking boots, wide-brim sun hat, electrolyte salts, trekking poles',
  },
  {
    id: 'dida-hara',
    name: 'Dida Hara Savanna & Grevy’s Zebra Loop',
    subtitle: 'Classic Open-Acacia Plains Game Drive & Walking Safari',
    distance: '24 km (4WD Loop) + 4 km Nature Walk',
    duration: 'Half-Day (Dawn or Late Afternoon)',
    elevationGain: '+85m Gentle undulating savanna',
    elevationPeak: '1,420m Savanna Basin',
    difficulty: 'Easy',
    terrain: 'Red sandy rangeland tracks, scattered acacia scrub and open grasslands',
    highlights: [
      'Prime sightings of endangered Grevy’s zebra herds and Beisa oryx',
      'Gerenuk antelopes standing tall to browse whistling thorn acacias',
      'Vulturine guineafowl flocks and Somali ostrich courtship displays',
    ],
    waterPoints: 'Water available at Dida Hara ranger station outpost',
    rangerRequired: true,
    gearRecommendation: 'Binoculars (8x42 or 10x42), neutral khaki clothing, telephoto camera lens',
  },
  {
    id: 'magado-crater',
    name: 'Magado Emerald Crater Lake & Montane Forest',
    subtitle: 'Lush Afro-Montane Forest Ridge & Highland Crater Lake Trek',
    distance: '11 km (Circuit)',
    duration: '4 – 5 Hours',
    elevationGain: '+380m Ridge Climb',
    elevationPeak: '2,040m Mountain Lookout',
    difficulty: 'Moderate',
    terrain: 'Forested montane soil, ancient juniper groves, and volcanic crater lip',
    highlights: [
      'Glistening emerald-green volcanic crater lake surrounded by dense rainforest',
      'Endemic birding hotspot (Ruspoli’s Turaco & White-tailed Swallow)',
      'Troops of black-and-white colobus monkeys in high canopy trees',
    ],
    waterPoints: 'Mountain stream sources (requires purification tablets)',
    rangerRequired: true,
    gearRecommendation: 'Layered fleece jacket, rain shell, trail running shoes or light hikers',
  },
  {
    id: 'sarite-wilderness',
    name: 'Sarite Deep Savanna & Stargazing Expedition',
    subtitle: 'Multi-Day Wilderness Traverse & Remote Eco-Camping Circuit',
    distance: '38 km Multi-Day Circuit',
    duration: '2 Days / 1 Night',
    elevationGain: '+220m Wide valley traverses',
    elevationPeak: '1,560m Sunset Rock Plateau',
    difficulty: 'Challenging',
    terrain: 'Remote wilderness rangeland, dry sand rivers (Wadis), and granite kopjes',
    highlights: [
      'Camping under Class 1 dark African skies with zero light pollution',
      'Nocturnal wildlife listening patrols accompanied by veteran EWCA scouts',
      'Sunrise vistas over southern Ethiopian border horizons',
    ],
    waterPoints: 'Water transported via support vehicle to base camp',
    rangerRequired: true,
    gearRecommendation: 'Sub-zero sleeping bag, headlamp with red light mode, high-energy rations',
  },
]

const DIFFICULTY_STYLES = {
  Easy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Moderate: 'bg-gold-100 text-gold-800 border-gold-300',
  Challenging: 'bg-earth-100 text-earth-800 border-earth-300',
}

export default function TrailCircuitExplorer() {
  const [selectedTrail, setSelectedTrail] = useState(TRAILS[0])

  return (
    <div className="bg-white rounded-3xl border border-sand-200/80 p-6 sm:p-10 shadow-card">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-earth-700 bg-earth-50 px-3 py-1 rounded-full border border-earth-200/60 mb-3">
          <Route className="w-3.5 h-3.5" />
          <span>Signature Safari & Trekking Circuits</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900 tracking-tight">
          Explore Borana On Foot & 4WD
        </h3>
        <p className="text-sm sm:text-base text-charcoal-700 mt-2 leading-relaxed">
          From descending 600 vertical meters into ancient volcanic salt calderas to trailing endangered Grevy’s zebras across wide plains — every route is accompanied by a certified ranger scout.
        </p>
      </div>

      {/* Trail Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {TRAILS.map((trail) => {
          const isSelected = selectedTrail.id === trail.id
          return (
            <button
              key={trail.id}
              onClick={() => setSelectedTrail(trail)}
              className={cn(
                'p-4 rounded-2xl text-left transition-all border',
                isSelected
                  ? 'bg-forest-950 text-white border-forest-950 shadow-md ring-2 ring-gold-500/40'
                  : 'bg-ivory-50 text-charcoal-900 border-sand-200 hover:bg-sand-100 hover:border-sand-300'
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full border', DIFFICULTY_STYLES[trail.difficulty])}>
                  {trail.difficulty}
                </span>
                <span className={cn('text-xs font-semibold', isSelected ? 'text-gold-300' : 'text-charcoal-600')}>
                  {trail.duration}
                </span>
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base leading-snug line-clamp-2">
                {trail.name}
              </h4>
            </button>
          )
        })}
      </div>

      {/* Selected Trail Circuit Detail Card */}
      <div className="bg-sand-50/70 rounded-2xl border border-sand-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand-200 pb-6">
          <div>
            <span className={cn('text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider', DIFFICULTY_STYLES[selectedTrail.difficulty])}>
              {selectedTrail.difficulty} Circuit
            </span>
            <h4 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-900 mt-2">
              {selectedTrail.name}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-700 mt-1">
              {selectedTrail.subtitle}
            </p>
          </div>

          <Link
            href={`/contact?visitType=${encodeURIComponent(selectedTrail.name)}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm transition-colors shrink-0"
          >
            <span>Book This Trail</span>
            <ArrowRight className="w-4 h-4 text-gold-400" />
          </Link>
        </div>

        {/* Trail Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-sand-200">
            <span className="text-xs text-charcoal-600 font-medium flex items-center gap-1.5 mb-1">
              <Route className="w-3.5 h-3.5 text-forest-700" /> Total Distance
            </span>
            <p className="font-display font-bold text-base text-charcoal-900">{selectedTrail.distance}</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-sand-200">
            <span className="text-xs text-charcoal-600 font-medium flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-gold-600" /> Estimated Time
            </span>
            <p className="font-display font-bold text-base text-charcoal-900">{selectedTrail.duration}</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-sand-200">
            <span className="text-xs text-charcoal-600 font-medium flex items-center gap-1.5 mb-1">
              <Mountain className="w-3.5 h-3.5 text-earth-700" /> Elevation Change
            </span>
            <p className="font-display font-bold text-base text-charcoal-900">{selectedTrail.elevationGain}</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-sand-200">
            <span className="text-xs text-charcoal-600 font-medium flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-forest-700" /> Ranger Scout
            </span>
            <p className="font-display font-bold text-base text-emerald-700">Mandatory (Included)</p>
          </div>
        </div>

        {/* Highlights List */}
        <div>
          <h5 className="font-display font-bold text-charcoal-900 text-sm uppercase tracking-wider mb-3">
            Trail Highlights & Encounters
          </h5>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {selectedTrail.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-sand-200 text-xs text-charcoal-800 leading-relaxed font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Logistics & Gear Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-sand-200 text-xs">
          <div>
            <strong className="text-charcoal-900 block font-semibold mb-1">Water & Hydration:</strong>
            <p className="text-charcoal-700 leading-relaxed">{selectedTrail.waterPoints}</p>
          </div>
          <div>
            <strong className="text-charcoal-900 block font-semibold mb-1">Recommended Gear:</strong>
            <p className="text-charcoal-700 leading-relaxed">{selectedTrail.gearRecommendation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
