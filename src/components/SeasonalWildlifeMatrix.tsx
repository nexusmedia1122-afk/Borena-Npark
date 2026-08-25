'use client'

import { useState } from 'react'
import { Sun, CloudRain, Sprout, Compass, Bird, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SeasonData {
  id: string
  name: string
  months: string
  tagline: string
  climate: {
    tempDay: string
    tempNight: string
    rainfall: string
    tracks: string
  }
  wildlifeDynamics: {
    title: string
    description: string
    hotspots: string[]
    keySpecies: { name: string; behavior: string; slug: string }[]
  }
  birdingNotes: string
  recommendedExperience: string
}

const SEASONS: SeasonData[] = [
  {
    id: 'dry-peak',
    name: 'Peak Dry Season',
    months: 'October – March',
    tagline: 'Prime Game Viewing & Concentrated Wildlife at Waterholes',
    climate: {
      tempDay: '26°C – 31°C',
      tempNight: '14°C – 18°C',
      rainfall: 'Minimal (<15mm/month)',
      tracks: 'Excellent — all 4WD savanna tracks accessible',
    },
    wildlifeDynamics: {
      title: 'Plains Game Congregations & Predator Action',
      description:
        'As seasonal waterholes dry up, herds of endangered Grevy’s zebras and Beisa oryx gather around permanent springs and the Dida Hara water points. Predatory lions and caracals are actively observed along game trails at dawn and dusk.',
      hotspots: ['Dida Hara Water Catchment', 'Sarite Rangeland Plains', 'Yabelo Foothills'],
      keySpecies: [
        { name: 'Grevy’s Zebra', behavior: 'Large herds (40–80 individuals) grazing open grasslands', slug: 'grevys-zebra' },
        { name: 'Gerenuk', behavior: 'Browsing high acacia thorny shrubs on hind legs', slug: 'gerenuk' },
        { name: 'Beisa Oryx', behavior: 'Compact breeding herds navigating shimmering plains', slug: 'beisa-oryx' },
        { name: 'African Lion', behavior: 'Pride patrols along seasonal riverbed ambush points', slug: 'african-lion' },
      ],
    },
    birdingNotes: 'Palearctic migratory raptors and songbirds arrive in large numbers across the acacia woodland canopy.',
    recommendedExperience: 'Dawn & sunset 4WD game drives, crater rim walking safaris, and Tula singing wells morning watering rituals.',
  },
  {
    id: 'green-spring',
    name: 'Green Season & Wildflowers',
    months: 'June – September',
    tagline: 'Lush Savanna, Calving Season & Phenomenal Birding',
    climate: {
      tempDay: '22°C – 27°C',
      tempNight: '13°C – 16°C',
      rainfall: 'Moderate scattered afternoon showers',
      tracks: 'Good with standard 4WD; lush trackside vegetation',
    },
    wildlifeDynamics: {
      title: 'Plentiful Grazing, Newborn Calves & Dramatic Horizons',
      description:
        'Rain rejuvenates the rangelands into a sea of green grasses and blooming acacia blossoms. Plains game disperse across the vast conservancies with newborn foals and calves. Visibility is crystal clear against cloud-swept skies.',
      hotspots: ['Central Acacia Savanna', 'Magado Crater Slopes', 'El Sod Rim'],
      keySpecies: [
        { name: 'Somali Ostrich', behavior: 'Vibrant blue-necked courtship displays across flowering plains', slug: 'somali-ostrich' },
        { name: 'Vulturine Guineafowl', behavior: 'Flocks of 50+ foraging through lush underbrush', slug: 'vulturine-guineafowl' },
        { name: 'African Elephant', behavior: 'Family herds foraging deep in high-canopy forest galleries', slug: 'african-elephant' },
        { name: 'Caracal', behavior: 'Hunting abundant savanna rodents and ground birds', slug: 'caracal' },
      ],
    },
    birdingNotes: 'Peak breeding plumage season for Borana endemics: Ethiopian Bushcrow and White-tailed Swallow.',
    recommendedExperience: 'Photography safaris, Magado crater lake hiking, and community cultural exchanges.',
  },
  {
    id: 'short-rains',
    name: 'Short Rains & Rebirth',
    months: 'April – May',
    tagline: 'Dramatic Atmosphere, Tranquil Trails & Refreshing Skies',
    climate: {
      tempDay: '24°C – 28°C',
      tempNight: '15°C – 18°C',
      rainfall: 'Periodic heavy afternoon showers',
      tracks: '4WD required; some remote clay tracks slippery',
    },
    wildlifeDynamics: {
      title: 'Solitary Wilderness & Intimate Nature Encounters',
      description:
        'The park experiences its quietest visitor period. Wildlife is energetic in the cooler air, grazing peacefully along higher ridges. Rain fills natural rock cisterns and brings nocturnal wildlife closer to eco-campsites.',
      hotspots: ['Yabelo Forest Reserve', 'Dubuluk Watercourses', 'Highland Ridges'],
      keySpecies: [
        { name: 'Greater Kudu', behavior: 'Moving through dense woodland thickets with spiral horns', slug: 'greater-kudu' },
        { name: 'Ethiopian Wolf', behavior: 'Highland patrols across montane grassland corridors', slug: 'ethiopian-wolf' },
        { name: 'Beisa Oryx', behavior: 'Resting beneath large umbrella acacia shade', slug: 'beisa-oryx' },
        { name: 'Grevy’s Zebra', behavior: 'Small bachelor groups grazing sweet emerging grasses', slug: 'grevys-zebra' },
      ],
    },
    birdingNotes: 'Migrant birds preparing for northward flights; intense morning dawn chorus across all valleys.',
    recommendedExperience: 'Highland nature walks, botanical photography, and cultural research visits.',
  },
]

export default function SeasonalWildlifeMatrix() {
  const [activeSeason, setActiveSeason] = useState(SEASONS[0])

  return (
    <div className="bg-white rounded-2xl border border-sand-200/80 p-6 sm:p-10 shadow-subtle">
      {/* Header */}
      <div className="max-w-3xl mb-8 space-y-2">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
          <span className="inline-block h-px w-4 bg-gold-600" />
          <span>Wildlife Calendar & Climate Index</span>
        </p>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-950 tracking-tight">
          When to Visit: Seasons of the Borana Savanna
        </h3>
        <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
          Wildlife movement in Borana is shaped by seasonal rains and customary pastoral water cycles. Explore our month-by-month wildlife dynamics to plan your ideal safari.
        </p>
      </div>

      {/* Season Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {SEASONS.map((season) => {
          const isSelected = activeSeason.id === season.id
          return (
            <button
              key={season.id}
              onClick={() => setActiveSeason(season)}
              className={cn(
                'p-4 rounded-xl text-left transition-all border text-sm',
                isSelected
                  ? 'bg-forest-950 text-white border-forest-950 shadow-subtle ring-1 ring-gold-400/50'
                  : 'bg-ivory-50 text-charcoal-800 border-sand-200 hover:bg-sand-50 hover:border-sand-300'
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className={cn('text-xs font-bold tracking-wider uppercase', isSelected ? 'text-gold-400' : 'text-earth-700')}>
                  {season.months}
                </span>
                {season.id === 'dry-peak' && <Sun className={cn('w-4 h-4', isSelected ? 'text-gold-400' : 'text-gold-600')} />}
                {season.id === 'green-spring' && <Sprout className={cn('w-4 h-4', isSelected ? 'text-emerald-400' : 'text-emerald-600')} />}
                {season.id === 'short-rains' && <CloudRain className={cn('w-4 h-4', isSelected ? 'text-sky-400' : 'text-sky-600')} />}
              </div>
              <p className="font-display font-bold text-base leading-snug">{season.name}</p>
            </button>
          )
        })}
      </div>

      {/* Active Season Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Climate & Conditions Card (4 cols) */}
        <div className="lg:col-span-4 bg-sand-50/70 rounded-xl border border-sand-200/80 p-6 space-y-5">
          <h4 className="font-display font-bold text-charcoal-950 text-lg border-b border-sand-200/80 pb-3">
            Field Conditions
          </h4>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div>
              <span className="text-charcoal-600 block text-xs">Day Temperature:</span>
              <span className="font-semibold text-charcoal-900">{activeSeason.climate.tempDay}</span>
            </div>
            <div>
              <span className="text-charcoal-600 block text-xs">Night Temperature:</span>
              <span className="font-semibold text-charcoal-900">{activeSeason.climate.tempNight}</span>
            </div>
            <div>
              <span className="text-charcoal-600 block text-xs">Precipitation:</span>
              <span className="font-semibold text-charcoal-900">{activeSeason.climate.rainfall}</span>
            </div>
            <div>
              <span className="text-charcoal-600 block text-xs">Track Passability:</span>
              <span className="font-semibold text-forest-800">{activeSeason.climate.tracks}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-sand-200/80 text-xs">
            <span className="text-charcoal-600 block mb-1">Recommended Safari Activity:</span>
            <p className="text-charcoal-900 leading-relaxed font-medium">{activeSeason.recommendedExperience}</p>
          </div>
        </div>

        {/* Right: Wildlife Dynamics & Key Sighting Hotspots (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-earth-700">{activeSeason.tagline}</span>
            <h4 className="text-xl sm:text-2xl font-display font-bold text-charcoal-950 mt-1">
              {activeSeason.wildlifeDynamics.title}
            </h4>
            <p className="text-sm text-charcoal-700 mt-2 leading-relaxed font-light">
              {activeSeason.wildlifeDynamics.description}
            </p>
          </div>

          {/* Key Species Behavior Cards */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-600 mb-3">
              Seasonal Wildlife Highlights & Behavior
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeSeason.wildlifeDynamics.keySpecies.map((species) => (
                <Link
                  key={species.slug}
                  href={`/wildlife/${species.slug}`}
                  className="group flex flex-col p-4 rounded-xl border border-sand-200 bg-white hover:border-gold-500/60 hover:shadow-subtle transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-charcoal-950 text-sm group-hover:text-forest-800 transition-colors">
                      {species.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-charcoal-600 mt-1 leading-relaxed font-light">
                    {species.behavior}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Birding & Sighting Locations Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-forest-950 text-white text-xs">
            <div className="flex items-center gap-2.5">
              <Bird className="w-4 h-4 text-gold-400 shrink-0" />
              <span><strong>Birding Note:</strong> {activeSeason.birdingNotes}</span>
            </div>
            <Link
              href="/wildlife"
              className="font-bold text-gold-400 hover:text-gold-300 hover:underline shrink-0"
            >
              All Species Dossiers →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
