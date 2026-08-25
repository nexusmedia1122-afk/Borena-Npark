'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Music,
  Volume2,
  VolumeX,
  MapPin,
  Shield,
  Droplets,
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
  const [currentBeat, setCurrentBeat] = useState(0)
  const [volume, setVolume] = useState(0.8)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const isPlayingRef = useRef(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)

  // 76 BPM = 60 / 76 = 0.789s per beat
  const BEAT_DURATION = 60 / 76

  const CHANT_BEATS = [
    {
      scout: 'Abbaa Eelaa (Deep Aquifer -30m)',
      lyric: '“Hoo-ye... Eelaa Tulaa!”',
      action: 'Subterranean Scoop & Water Dip',
      rootFreq: 110, // A2 deep chant
      waterAction: 'dip',
    },
    {
      scout: 'Kalloo 2 (Lower Relay -20m)',
      lyric: '“Wallaaluu... Sa’aa obaasaa!”',
      action: 'Vertical Hand-off & Shaft Echo',
      rootFreq: 164.8, // E3 harmonic
      waterAction: 'echo',
    },
    {
      scout: 'Kalloo 1 (Mid Relay -12m)',
      lyric: '“Dadhabaa hinqabnuu!”',
      action: 'Mid-Shaft Momentum Rhythm',
      rootFreq: 220, // A3 vocal
      waterAction: 'handoff',
    },
    {
      scout: 'Abbaa Okolee (Surface Trough 0m)',
      lyric: '“Bishaan dhugaa yaa loonii!”',
      action: 'Pour into Naanniga Stone Trough',
      rootFreq: 277.18, // C#4 resolution
      waterAction: 'pour',
    },
  ]

  // Play a single procedural beat with realistic chant harmonics and water acoustics
  const playProceduralBeat = (beatIndex: number) => {
    try {
      const ctx = audioCtxRef.current
      if (!ctx || ctx.state !== 'running') return

      const now = ctx.currentTime
      const beatInfo = CHANT_BEATS[beatIndex]

      // Master output node
      const beatGain = ctx.createGain()
      beatGain.gain.setValueAtTime(volume * 0.7, now)
      beatGain.connect(ctx.destination)

      // 1. Polyphonic Vocal Chant Layer (Dual Formant Oscillator)
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const vocalGain = ctx.createGain()
      const formantFilter = ctx.createBiquadFilter()

      osc1.type = 'triangle'
      osc1.frequency.setValueAtTime(beatInfo.rootFreq, now)
      // Slight pitch glide typical of pastoral chanting
      osc1.frequency.exponentialRampToValueAtTime(beatInfo.rootFreq * 1.02, now + 0.15)
      osc1.frequency.exponentialRampToValueAtTime(beatInfo.rootFreq, now + 0.6)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(beatInfo.rootFreq * 1.5, now) // Perfect fifth overtone

      // Formant vowel filter (Acoustic cavity of limestone shaft)
      formantFilter.type = 'bandpass'
      formantFilter.frequency.setValueAtTime(beatInfo.rootFreq * 3.2, now)
      formantFilter.Q.setValueAtTime(3.5, now)

      vocalGain.gain.setValueAtTime(0.001, now)
      vocalGain.gain.linearRampToValueAtTime(0.35, now + 0.12)
      vocalGain.gain.exponentialRampToValueAtTime(0.001, now + BEAT_DURATION * 0.9)

      osc1.connect(formantFilter)
      osc2.connect(formantFilter)
      formantFilter.connect(vocalGain)
      vocalGain.connect(beatGain)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + BEAT_DURATION)
      osc2.stop(now + BEAT_DURATION)

      // 2. Leather Bucket & Water Splash Layer (Noise Synthesizer)
      const bufferSize = ctx.sampleRate * 0.4
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer

      const noiseFilter = ctx.createBiquadFilter()
      const noiseGain = ctx.createGain()

      if (beatInfo.waterAction === 'dip' || beatInfo.waterAction === 'pour') {
        // Deep aquifer splash or surface trough pour
        noiseFilter.type = beatInfo.waterAction === 'pour' ? 'bandpass' : 'lowpass'
        noiseFilter.frequency.setValueAtTime(beatInfo.waterAction === 'pour' ? 1800 : 650, now)
        noiseFilter.Q.setValueAtTime(2.0, now)

        noiseGain.gain.setValueAtTime(0.001, now + 0.05)
        noiseGain.gain.linearRampToValueAtTime(beatInfo.waterAction === 'pour' ? 0.4 : 0.28, now + 0.1)
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)
      } else {
        // Wooden scaffolding & leather bucket handoff click
        noiseFilter.type = 'highpass'
        noiseFilter.frequency.setValueAtTime(2200, now)
        noiseGain.gain.setValueAtTime(0.001, now + 0.02)
        noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.05)
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
      }

      whiteNoise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(beatGain)

      whiteNoise.start(now)
      whiteNoise.stop(now + 0.5)

      // 3. Subterranean Shaft Reverb Echo (Simulating 30m limestone shaft)
      const delay = ctx.createDelay()
      delay.delayTime.setValueAtTime(0.24, now)
      const delayFeedback = ctx.createGain()
      delayFeedback.gain.setValueAtTime(0.35, now)

      vocalGain.connect(delay)
      delay.connect(delayFeedback)
      delayFeedback.connect(delay)
      delay.connect(beatGain)
    } catch (err) {
      console.warn('Audio synthesis error:', err)
    }
  }

  const startAudioEngine = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }

      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume()
      }

      isPlayingRef.current = true
      setIsPlayingAudio(true)

      let step = 0
      playProceduralBeat(step)
      setCurrentBeat(step)

      timerRef.current = setInterval(() => {
        if (!isPlayingRef.current) return
        step = (step + 1) % 4
        setCurrentBeat(step)
        playProceduralBeat(step)
      }, BEAT_DURATION * 1000)
    } catch (err) {
      console.error('Failed to start Web Audio engine:', err)
      setIsPlayingAudio(false)
    }
  }

  const stopAudioEngine = () => {
    isPlayingRef.current = false
    setIsPlayingAudio(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudioEngine()
    } else {
      startAudioEngine()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isPlayingRef.current = false
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <div className="bg-white rounded-2xl border border-sand-200/80 p-6 sm:p-10 shadow-subtle space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
          <span className="inline-block h-px w-4 bg-gold-600" />
          <span>Hydrological Engineering & UNESCO Heritage</span>
        </p>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-950 tracking-tight">
          The 9 Sacred Tula Singing Wells (*Eela Tula Saglan*)
        </h2>
        <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
          Hand-carved down to 30 meters through solid volcanic rock over 500 years ago, the Tula Wells represent one of the world’s most astonishing living hydrological systems. Human bucket chains chant polyphonic <em>Weellu</em> songs in cadence to bring water to thousands of cattle and wild savanna animals.
        </p>
      </div>

      {/* Well Selector Carousel / Grid */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-charcoal-600">
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
                  'p-3 rounded-xl text-left transition-all border text-xs flex flex-col justify-between h-24',
                  isSelected
                    ? 'bg-forest-950 text-white border-forest-950 shadow-subtle ring-1 ring-gold-400/50'
                    : 'bg-ivory-50 text-charcoal-800 border-sand-200 hover:border-sand-300 hover:bg-sand-50'
                )}
              >
                <span className={cn('text-[10px] font-bold uppercase truncate', isSelected ? 'text-gold-400' : 'text-earth-700')}>
                  {well.depthMeters}m Depth
                </span>
                <p className="font-display font-bold text-xs leading-snug line-clamp-2">
                  {well.name.replace(' Tula Well Complex', '').replace(' Subterranean Well', '').replace(' Ancient Stone Wells', '').replace(' Constitutional Well Cluster', '').replace(' Mineral Spring Well', '').replace(' Volcanic Rift Shaft', '').replace(' Highland Reservoir Shaft', '').replace(' Red-Earth Well', '').replace(' Deep Desert Outpost Well', '')}
                </p>
                <span className="text-[9px] text-charcoal-500 truncate">{well.chainSize} Scouts</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Well Deep Dossier & Acoustic Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Well Architecture & Specs (5 cols) */}
        <div className="lg:col-span-5 bg-sand-50/70 rounded-xl border border-sand-200/80 p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-800 mb-1">
              <MapPin className="w-3.5 h-3.5 text-gold-600" />
              <span>{selectedWell.location}</span>
            </div>
            <h3 className="text-xl font-display font-bold text-charcoal-950">
              {selectedWell.name}
            </h3>
            <p className="text-xs font-mono text-charcoal-600 mt-0.5">{selectedWell.gps}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-sand-200">
              <span className="text-charcoal-600 block text-[11px]">Shaft Depth</span>
              <span className="font-display font-bold text-lg text-charcoal-950">{selectedWell.depthMeters} Meters</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-sand-200">
              <span className="text-charcoal-600 block text-[11px]">Bucket Relay Chain</span>
              <span className="font-display font-bold text-lg text-forest-800">{selectedWell.chainSize} Scouts</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-sand-200 col-span-2">
              <span className="text-charcoal-600 block text-[11px]">Watering Throughput</span>
              <span className="font-display font-bold text-base text-gold-700">~{selectedWell.capacityCattlePerHour} Cattle / Hour</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-sand-200 text-xs text-charcoal-700 leading-relaxed space-y-1.5 font-light">
            <p className="font-bold text-charcoal-950">Geological & Historical Profile:</p>
            <p>{selectedWell.historicalSignificance}</p>
          </div>

          {/* Polyphonic Song Acoustic Player Card with Real Web Audio Synthesis */}
          <div className="p-5 rounded-2xl bg-forest-950 text-white space-y-4 shadow-card border border-forest-800">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-300">
                <Music className="w-4 h-4 text-gold-400 animate-pulse" />
                <span>Weellu Acoustic Cadence Simulator</span>
              </div>
              <button
                onClick={toggleAudio}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider transition-all shadow-subtle shrink-0"
              >
                {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Stop Cadence' : 'Listen Cadence'}</span>
              </button>
            </div>

            <p className="text-xs text-ivory-200/80 leading-relaxed font-light">
              Procedural Web Audio synthesis of the polyphonic call-and-response chant at a rhythmic <strong>76 BPM tempo</strong>, matching each bucket handoff and water splash down the 30m shaft.
            </p>

            {/* Live Lyric & Action Banner */}
            <div className="p-3 rounded-xl bg-forest-900/90 border border-forest-800 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gold-400 font-bold uppercase tracking-wider">
                  {isPlayingAudio ? CHANT_BEATS[currentBeat].scout : 'Scout Chain Inactive'}
                </span>
                <span className="font-mono text-ivory-400 text-[10px]">
                  {isPlayingAudio ? `Step ${currentBeat + 1} of 4 (76 BPM)` : 'Press Listen Cadence to Start'}
                </span>
              </div>
              <p className="text-sm font-display font-bold text-white italic">
                {isPlayingAudio ? CHANT_BEATS[currentBeat].lyric : '“Hoo-ye... Eelaa Tulaa! Sa’aa obaasaa!”'}
              </p>
              <p className="text-[11px] text-ivory-300 font-light">
                {isPlayingAudio ? `Action: ${CHANT_BEATS[currentBeat].action}` : 'Click button above to hear authentic multi-voice chanting & water splash cadence.'}
              </p>
            </div>

            {/* 4-Beat Step Indicator */}
            <div className="grid grid-cols-4 gap-1.5">
              {CHANT_BEATS.map((beat, idx) => {
                const isActive = isPlayingAudio && currentBeat === idx
                return (
                  <div
                    key={idx}
                    className={cn(
                      'py-1.5 px-2 rounded-lg text-center border transition-all text-[10px] font-bold',
                      isActive
                        ? 'bg-gold-500 text-charcoal-950 border-gold-400 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-[1.02]'
                        : 'bg-forest-900/60 text-ivory-400 border-forest-800'
                    )}
                  >
                    <span>{idx === 0 ? '1. Scoop' : idx === 1 ? '2. Low' : idx === 2 ? '3. Mid' : '4. Pour'}</span>
                  </div>
                )
              })}
            </div>

            {/* Animated Acoustic Waveform */}
            <div className="h-9 rounded-lg bg-forest-900/90 border border-forest-800 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
              {[4, 8, 14, 22, 30, 24, 18, 28, 32, 26, 16, 20, 28, 12, 6, 18, 24, 10, 4].map((h, i) => {
                const barHeight = isPlayingAudio
                  ? Math.min(28, h * (0.6 + ((currentBeat + i) % 4) * 0.25))
                  : 5
                return (
                  <div
                    key={i}
                    style={{ height: `${barHeight}px` }}
                    className={cn(
                      'w-1.5 rounded-full transition-all duration-150',
                      isPlayingAudio ? 'bg-gold-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-forest-700'
                    )}
                  />
                )
              })}
            </div>

            {/* Volume Control */}
            {isPlayingAudio && (
              <div className="flex items-center justify-between gap-3 pt-1 text-[11px] text-ivory-300">
                <span className="flex items-center gap-1 font-medium">
                  <Volume2 className="w-3.5 h-3.5 text-gold-400" /> Volume:
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-32 h-1.5 bg-forest-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
                <span className="font-mono text-[10px] text-ivory-400">{Math.round(volume * 100)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 3D Cross-Section Shaft Tier Visualizer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-sand-200/80 p-6 sm:p-8 space-y-6 shadow-subtle">
          <div className="border-b border-sand-200/80 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-earth-700">
              Cross-Sectional Shaft Architecture
            </span>
            <h3 className="text-xl font-display font-bold text-charcoal-950 mt-0.5">
              30-Meter Subterranean Chain Mechanics
            </h3>
          </div>

          {/* Interactive Depth Tiers */}
          <div className="space-y-2.5">
            {DEPTH_TIERS.map((tier, idx) => {
              const isSelected = selectedTier.depth === tier.depth
              return (
                <button
                  key={tier.depth}
                  onClick={() => setSelectedTier(tier)}
                  className={cn(
                    'w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5',
                    isSelected
                      ? 'bg-ivory-50 border-gold-600 shadow-subtle ring-1 ring-gold-600/30'
                      : 'bg-white border-sand-200 hover:bg-sand-50/60'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono shrink-0 text-center border',
                    isSelected ? 'bg-forest-950 text-gold-300 border-gold-500/40' : 'bg-sand-50 text-charcoal-700 border-sand-200'
                  )}>
                    <span className="text-[9px] uppercase font-bold leading-none">Tier {idx + 1}</span>
                    <span className="text-xs font-black mt-0.5 leading-none">{tier.depth.split(' ')[0]}</span>
                  </div>

                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-sm text-charcoal-950">{tier.role}</h4>
                      <span className="text-[10px] text-charcoal-500 font-mono">{tier.elevation}</span>
                    </div>
                    <p className="text-xs text-charcoal-700 leading-relaxed font-light">{tier.desc}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Seera Marraa fi Bishaan Customary Law Box */}
          <div className="p-4 rounded-xl bg-earth-50 border border-earth-200/80 text-xs text-earth-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-earth-800">
              <Shield className="w-4 h-4 text-earth-700" />
              Customary Ecological Law (*Seera Marraa fi Bishaan*):
            </p>
            <p className="leading-relaxed font-light">
              Under Borana customary law, water drawn from the Tula Wells cannot be commercialized or sold. Any passerby, foreign traveler, or wild animal has an uninfringeable right to drink freely.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
