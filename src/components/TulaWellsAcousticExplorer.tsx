'use client'

import { useState, useEffect } from 'react'
import {
  Waves,
  Music,
  Volume2,
  VolumeX,
  Layers,
  MapPin,
  ChevronRight,
  Info,
  Shield,
  Sparkles,
  Droplets,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TulaWell {
  id: string
  name: string
  location: string
  depthMeters: number
  chainSize: number
  capacityCattlePerHour: number
  rockFormation: string
  historicalSignificance: string
  gps: string
}

const TULA_WELLS: TulaWell[] = [
  {
    id: 'dubuluk',
    name: 'Dubuluk Tula Well Complex',
    location: 'Dubuluk District, Central BNP Corridor',
    depthMeters: 30,
    chainSize: 7,
    capacityCattlePerHour: 1200,
    rockFormation: 'Karst Limestone & Volcanic Basalt Fissure',
    historicalSignificance:
      'The most famous of the nine Tula clusters, actively sustaining upwards of 15,000 cattle daily during peak dry season with 7-man synchronized bucket chains.',
    gps: '4°53′12″N 38°18′45″E',
  },
  {
    id: 'web',
    name: 'Web Subterranean Well',
    location: 'Web Basin, Eastern Borana Savanna',
    depthMeters: 28,
    chainSize: 6,
    capacityCattlePerHour: 950,
    rockFormation: 'Crystalline Calcite Aquifer',
    historicalSignificance:
      'Known for its cold, ultra-pure water emerging from deep bedrock fissures; nocturnal watering reserve for Grevy’s zebras and antelopes.',
    gps: '4°48′20″N 38°22′10″E',
  },
  {
    id: 'melbana',
    name: 'Melbana Ancient Stone Wells',
    location: 'Melbana Valley Foothills',
    depthMeters: 25,
    chainSize: 6,
    capacityCattlePerHour: 800,
    rockFormation: 'Ancient Carved Quartzite Strata',
    historicalSignificance:
      'Features monolithic drinking troughs (*Naanniga*) carved by hand from single granite boulders over four centuries ago.',
    gps: '4°41′05″N 38°12′30″E',
  },
  {
    id: 'gayo',
    name: 'Gayo Constitutional Well Cluster',
    location: 'Gaayyo Assembly Grounds near Mega',
    depthMeters: 26,
    chainSize: 6,
    capacityCattlePerHour: 1100,
    rockFormation: 'Sedimentary Sandstone & Basalt',
    historicalSignificance:
      'Located adjacent to the holy Dhaddacha acacia tree where the supreme Gumii Gaayyo assembly convenes every 8 years to proclaim Oromo customary law.',
    gps: '4°22′15″N 38°19′55″E',
  },
  {
    id: 'egder',
    name: 'Egder Mineral Spring Well',
    location: 'Egder Rangeland Conservancy',
    depthMeters: 27,
    chainSize: 6,
    capacityCattlePerHour: 750,
    rockFormation: 'Volcanic Tuff & Mineral Travertine',
    historicalSignificance:
      'Rich in natural trace minerals, celebrated by herdsmen for invigorating breeding bulls and nursing cows during dry spells.',
    gps: '4°35′50″N 38°08′15″E',
  },
  {
    id: 'borbor',
    name: 'Borbor Volcanic Rift Shaft',
    location: 'Borbor Fault Line Basin',
    depthMeters: 29,
    chainSize: 7,
    capacityCattlePerHour: 900,
    rockFormation: 'Fractured Volcanic Rift Column',
    historicalSignificance:
      'Plunges deep into a volcanic fracture zone; famous for its acoustic resonance that amplifies the polyphonic singing of the bucket team.',
    gps: '4°58′40″N 38°29′20″E',
  },
  {
    id: 'irdar',
    name: 'Irdar Highland Reservoir Shaft',
    location: 'Yabelo-Irdar Highland Slopes',
    depthMeters: 24,
    chainSize: 5,
    capacityCattlePerHour: 650,
    rockFormation: 'Hard Granitic Gneiss',
    historicalSignificance:
      'High-elevation shaft that serves pastoralist herds traversing between highland dry pastures and lowland scrub.',
    gps: '5°04′10″N 38°10′05″E',
  },
  {
    id: 'dharito',
    name: 'Dharito Red-Earth Well',
    location: 'Dharito Rangeland District',
    depthMeters: 23,
    chainSize: 5,
    capacityCattlePerHour: 700,
    rockFormation: 'Laterite Sandstone Strata',
    historicalSignificance:
      'A crucial seasonal waypoint connecting southern migratory cattle herds with central conservation zones.',
    gps: '4°44′18″N 38°03′40″E',
  },
  {
    id: 'wachile',
    name: 'Wachile Deep Desert Outpost Well',
    location: 'Wachile Southern Desert Plains',
    depthMeters: 31,
    chainSize: 8,
    capacityCattlePerHour: 1300,
    rockFormation: 'Deep Semi-Arid Limestone Basin',
    historicalSignificance:
      'The deepest and southernmost of all 9 Tula networks, requiring an 8-man relay team to bring water 31 meters to the desert surface.',
    gps: '4°15′30″N 38°45′10″E',
  },
]

const DEPTH_TIERS = [
  {
    depth: '0m (Surface)',
    role: 'Naanniga (Drinking Troughs) & Abbaa Herregaa (Supervisor)',
    desc: 'Cattle queue orderly in groups of 30. The water overseer directs the cadence and enforces universal drinking rights.',
    elevation: 'Ground Level (Savanna Surface)',
  },
  {
    depth: '-5m (Upper Scaffolding)',
    role: 'Abbaa Okolee (Top Bucket Pourer)',
    desc: 'Catches the filled 15-liter leather bucket (*Okolee*) with one hand and empties it continuously into the stone trough.',
    elevation: 'Upper Tier Wooden Scaffolding',
  },
  {
    depth: '-12m (Mid-Shaft Relay 1)',
    role: 'Kalloo 1 (Mid Relay Scout)',
    desc: 'Maintains rhythmic momentum, passing loaded buckets upward and empty buckets downward without missing a beat.',
    elevation: 'Middle Carved Rock Ledge',
  },
  {
    depth: '-20m (Deep-Shaft Relay 2)',
    role: 'Kalloo 2 (Lower Relay Scout)',
    desc: 'Works in near darkness, singing the call chorus (*Weellu*) to coordinate vertical handoffs in humid cave air.',
    elevation: 'Lower Hand-Hewn Foothold',
  },
  {
    depth: '-30m (Groundwater Aquifer)',
    role: 'Abbaa Eelaa (Subterranean Water Scooper)',
    desc: 'Standing waist-deep in the cold limestone water source, rapidly filling leather buckets in continuous synchrony.',
    elevation: 'Primary Groundwater Strata',
  },
]

export default function TulaWellsAcousticExplorer() {
  const [selectedWell, setSelectedWell] = useState<TulaWell>(TULA_WELLS[0])
  const [selectedTier, setSelectedTier] = useState(DEPTH_TIERS[0])
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [waveCadence, setWaveCadence] = useState(1)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setWaveCadence((prev) => (prev >= 4 ? 1 : prev + 1))
      }, 400)
    }
    return () => clearInterval(interval)
  }, [isPlayingAudio])

  return (
    <div className="bg-white rounded-3xl border border-sand-200/90 p-6 sm:p-10 shadow-card space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest-luxury text-earth-800 bg-earth-100/70 px-3.5 py-1 rounded-full border border-earth-300">
          <Droplets className="w-3.5 h-3.5 text-earth-700" />
          <span>Hydrological Engineering & UNESCO Cultural Heritage</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-charcoal-900 tracking-tight">
          The 9 Sacred Tula Singing Wells (*Eela Tula Saglan*)
        </h2>
        <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
          Hand-carved down to 30 meters through solid volcanic rock over 500 years ago, the Tula Wells represent one of the world’s most astonishing living hydrological systems. Human bucket chains chant polyphonic <em>Weellu</em> songs in cadence to bring water to thousands of cattle and wild savanna animals.
        </p>
      </div>

      {/* Well Selector Carousel / Grid */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
          Select One of the 9 Historic Tula Well Networks:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {TULA_WELLS.map((well) => {
            const isSelected = selectedWell.id === well.id
            return (
              <button
                key={well.id}
                onClick={() => setSelectedWell(well)}
                className={cn(
                  'p-3 rounded-2xl text-left transition-all border text-xs flex flex-col justify-between h-24',
                  isSelected
                    ? 'bg-forest-950 text-white border-forest-950 shadow-md ring-2 ring-gold-500/50'
                    : 'bg-ivory-50 text-charcoal-800 border-sand-200 hover:border-sand-300 hover:bg-sand-100/60'
                )}
              >
                <span className={cn('text-[10px] font-bold uppercase truncate', isSelected ? 'text-gold-400' : 'text-earth-700')}>
                  {well.depthMeters}m Depth
                </span>
                <p className="font-display font-bold text-xs leading-snug line-clamp-2">
                  {well.name.replace(' Tula Well Complex', '').replace(' Subterranean Well', '').replace(' Ancient Stone Wells', '').replace(' Constitutional Well Cluster', '').replace(' Mineral Spring Well', '').replace(' Volcanic Rift Shaft', '').replace(' Highland Reservoir Shaft', '').replace(' Red-Earth Well', '').replace(' Deep Desert Outpost Well', '')}
                </p>
                <span className="text-[9px] text-charcoal-600 truncate">{well.chainSize} Scouts</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Well Deep Dossier & Acoustic Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Well Architecture & Specs (5 cols) */}
        <div className="lg:col-span-5 bg-sand-50/80 rounded-3xl border border-sand-200 p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-800 mb-1">
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              <span>{selectedWell.location}</span>
            </div>
            <h3 className="text-xl font-display font-bold text-charcoal-900">
              {selectedWell.name}
            </h3>
            <p className="text-xs font-mono text-charcoal-600 mt-0.5">{selectedWell.gps}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-sand-200">
              <span className="text-charcoal-600 block text-[11px]">Shaft Depth</span>
              <span className="font-display font-bold text-lg text-charcoal-900">{selectedWell.depthMeters} Meters</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-sand-200">
              <span className="text-charcoal-600 block text-[11px]">Bucket Relay Chain</span>
              <span className="font-display font-bold text-lg text-forest-800">{selectedWell.chainSize} Scouts</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-sand-200 col-span-2">
              <span className="text-charcoal-600 block text-[11px]">Watering Throughput</span>
              <span className="font-display font-bold text-base text-gold-700">~{selectedWell.capacityCattlePerHour} Cattle / Hour</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-sand-200 text-xs text-charcoal-700 leading-relaxed space-y-1.5">
            <p className="font-bold text-charcoal-900">Geological & Historical Profile:</p>
            <p>{selectedWell.historicalSignificance}</p>
          </div>

          {/* Polyphonic Song Acoustic Player Card */}
          <div className="p-5 rounded-2xl bg-forest-950 text-white space-y-3.5 shadow-lg border border-forest-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-300">
                <Music className="w-4 h-4 text-gold-400" />
                <span>Weellu Acoustic Cadence Simulator</span>
              </div>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-all shadow-sm"
              >
                {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Mute Song' : 'Listen Cadence'}</span>
              </button>
            </div>

            <p className="text-xs text-ivory-200/80 leading-relaxed font-light">
              The polyphonic call-and-response chant sets a rhythmic 76 BPM tempo. Each syllable matches the exact micro-second of a leather bucket handoff between scouts.
            </p>

            {/* Simulated Acoustic Wave Bars */}
            <div className="h-10 rounded-xl bg-forest-900/90 border border-forest-800 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
              {[4, 8, 14, 22, 30, 24, 18, 28, 32, 26, 16, 20, 28, 12, 6, 18, 24, 10, 4].map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: isPlayingAudio ? `${Math.min(32, h * (0.8 + (waveCadence % 3) * 0.3))}px` : '6px',
                  }}
                  className={cn(
                    'w-1.5 rounded-full transition-all duration-200',
                    isPlayingAudio ? 'bg-gold-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-forest-700'
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Cross-Section Shaft Tier Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-sand-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-earth-800">
              Cross-Sectional Shaft Architecture
            </span>
            <h3 className="text-xl font-display font-bold text-charcoal-900 mt-0.5">
              30-Meter Subterranean Chain Mechanics
            </h3>
          </div>

          {/* Interactive Depth Tiers */}
          <div className="space-y-3">
            {DEPTH_TIERS.map((tier, idx) => {
              const isSelected = selectedTier.depth === tier.depth
              return (
                <button
                  key={tier.depth}
                  onClick={() => setSelectedTier(tier)}
                  className={cn(
                    'w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4',
                    isSelected
                      ? 'bg-ivory-50 border-gold-600 shadow-md ring-1 ring-gold-600/30'
                      : 'bg-white border-sand-200 hover:bg-sand-50/60'
                  )}
                >
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-mono shrink-0 text-center border',
                    isSelected ? 'bg-forest-950 text-gold-300 border-gold-500/40' : 'bg-sand-100 text-charcoal-700 border-sand-200'
                  )}>
                    <span className="text-[10px] uppercase font-bold leading-none">Tier {idx + 1}</span>
                    <span className="text-xs font-black mt-0.5 leading-none">{tier.depth.split(' ')[0]}</span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-charcoal-900">{tier.role}</h4>
                      <span className="text-[10px] text-charcoal-600 font-mono">{tier.elevation}</span>
                    </div>
                    <p className="text-xs text-charcoal-700 leading-relaxed">{tier.desc}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Seera Marraa fi Bishaan Customary Law Box */}
          <div className="p-4 rounded-2xl bg-earth-50 border border-earth-200 text-xs text-earth-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-earth-800">
              <Shield className="w-4 h-4 text-earth-700" />
              Customary Ecological Law (*Seera Marraa fi Bishaan*):
            </p>
            <p className="leading-relaxed">
              Under Borana customary law, water drawn from the Tula Wells cannot be commercialized or sold. Any passerby, foreign traveler, or wild animal has an uninfringeable right to drink freely.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
