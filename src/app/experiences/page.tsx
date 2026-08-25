'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import TrailCircuitExplorer from '@/components/TrailCircuitExplorer'
import {
  Compass,
  Clock,
  ArrowRight,
  Calculator,
  MapPin,
  Calendar,
  Car,
  Shield,
  Binoculars,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { cldImage } from '@/lib/cloudinary'

const EXPERIENCES = [
  {
    title: 'Savanna Game Drives & Sympatric Zebra Tracking',
    category: 'Wildlife Safari',
    duration: 'Half-Day or Full-Day',
    difficulty: 'Easy',
    desc: 'Expert-led 4WD tracking across the Dida-Hara and Sarite conservation blocks to observe coexisting Grevy’s zebras and common plains zebras, Beisa oryx, lions, cheetahs, and Somali ostriches with a certified EWCA ranger.',
    image: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: 'Rare dual-species zebra coexistence & big game tracking',
  },
  {
    title: 'El Sod "House of Salt" (Booqee Sooddaa) Caldera Descent',
    category: 'Geotourism & Trekking',
    duration: '3–4 Hours (Morning Recommended)',
    difficulty: 'Moderate',
    desc: 'Descend 600 vertical meters into the ancient volcanic explosion caldera of El Sod. Follow donkey trails to witness centuries-old artisanal black mineral salt harvesting from the subterranean brine lake.',
    image: cldImage('667811241_1374606294713548_4463427384711284519_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: '600m volcanic descent to black brine lake & 600-year mining culture',
  },
  {
    title: 'Dubuluk Tula "Singing Wells" Heritage Immersion',
    category: 'Cultural Heritage',
    duration: '2–3 Hours (08:00–12:00)',
    difficulty: 'Easy',
    desc: 'Witness the morning watering ritual at Dubuluk, where Borana pastoralist teams chant polyphonic work songs down 12–30m vertical hand-dug limestone shafts while passing leather buckets in rhythm.',
    image: cldImage('782451195_122141256279053365_7936837558989253988_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: 'UNESCO-inscribed living polyphonic chants & customary water law',
  },
  {
    title: 'Sarite Grassland Wilderness Camping & Dark Skies',
    category: 'Overnight Safari',
    duration: '1–3 Nights',
    difficulty: 'Moderate',
    desc: 'Camp beneath pristine Class-1 Bortle dark skies in designated eco-campsites across the Sarite block, accompanied by an armed ranger scout, with nocturnal wildlife listening walks.',
    image: cldImage('668110576_1374606031380241_6681634558621259739_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: 'Pristine dark sky stargazing & open grassland silence',
  },
  {
    title: 'Endemic Birding & Micro-Climate Avian Expedition',
    category: 'Specialist Birding',
    duration: 'Full-Day or Multi-Day',
    difficulty: 'Easy–Moderate',
    desc: 'Targeting 280+ recorded avian species including the 4 globally endangered range endemics: Stresemann’s Bushcrow (Zavattariornis stresemanni), White-tailed Swallow, Prince Ruspoli’s Turaco, and Black-fronted Spurfowl.',
    image: cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: '4 range-restricted endemics in unique thermal envelope',
  },
  {
    title: 'Magado Crater Lake & Highland Forest Ascent',
    category: 'Mountain Hiking',
    duration: '4–5 Hours',
    difficulty: 'Challenging',
    desc: 'Trek through dry evergreen Afromontane juniper and podocarpus forests surrounding the emerald crater lake of Magado, home to colobus monkeys, raptors, and panoramic southern rift vistas.',
    image: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: 'Pristine Afromontane forest & emerald crater lake panorama',
  },
]

const ITINERARIES = [
  {
    title: '1-Day Savanna & Caldera Express',
    tag: 'Highlights Tour',
    days: '1 Day',
    desc: 'Dawn game drive across Dida-Hara Savanna for zebras and oryx, followed by an early afternoon hike down the dramatic crater rim of El Sod.',
  },
  {
    title: '3-Day Wildlife, Salt & Singing Wells Classic',
    tag: 'Recommended Safari',
    days: '3 Days / 2 Nights',
    desc: 'Comprehensive expedition covering Dida-Hara plains, morning Dubuluk Tula Singing Wells chants, deep El Sod caldera descent, and a night of eco-camping at Sarite.',
  },
  {
    title: '5-Day Transboundary Wilderness Odyssey',
    tag: 'Full Backcountry Trek',
    days: '5 Days / 4 Nights',
    desc: 'Deep multi-day wilderness traverse of Sarite rangelands, Magado cloud forest summit, endemic Bushcrow thermal pocket tracking, and Gadaa elder biocultural council meetings.',
  },
]

const VISITING_LOGISTICS = [
  {
    icon: Car,
    title: 'Overland & Air Access',
    desc: 'Located approx. 570 km (7–8 hours) south of Addis Ababa via Hawassa and Yabelo along the paved Trans-African Highway. Domestic flights to Hawassa or Arba Minch shorten the driving route.',
  },
  {
    icon: Compass,
    title: '4WD Vehicle & Local Guide',
    desc: 'A high-clearance 4WD vehicle is essential for navigating backcountry tracks in Dida-Hara, Sarite, and Magado. Hiring a certified local EWCA guide is mandatory and essential for locating endemic birds.',
  },
  {
    icon: MapPin,
    title: 'Base Town & Accommodations',
    desc: 'Yabelo serves as the primary gateway town, offering mid-range tourist lodges, guesthouses, and restaurants. The colorful Saturday regional market in Yabelo is a cultural highlight.',
  },
  {
    icon: Calendar,
    title: 'Optimal Travel Seasons',
    desc: 'Best for birdwatching: Wet seasons (March–May & Sept–Nov) when resident endemics and migrants are most active. Best for general game viewing: Dry seasons (Dec–Feb & June–Aug) when wildlife gathers at watercourses.',
  },
]

export default function ExperiencesPage() {
  const [visitorType, setVisitorType] = useState<'international' | 'resident' | 'national'>('international')
  const [numGuests, setNumGuests] = useState(2)
  const [numDays, setNumDays] = useState(3)
  const [includeCamping, setIncludeCamping] = useState(true)
  const [includeVehicle, setIncludeVehicle] = useState(true)

  // Tariff calculation constants
  const dailyFeePerGuest = visitorType === 'international' ? 20 : visitorType === 'resident' ? 10 : 2
  const rangerFeePerDay = 15
  const campingFeePerNight = visitorType === 'international' ? 10 : 5
  const vehicleFeePerDay = 10

  const totalEstimate =
    dailyFeePerGuest * numGuests * numDays +
    rangerFeePerDay * numDays +
    (includeCamping && numDays > 1 ? campingFeePerNight * (numDays - 1) : 0) +
    (includeVehicle ? vehicleFeePerDay * numDays : 0)

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Banner */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src={cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_1600,h_900,c_fill,q_auto')}
            alt="Experiences in Borana"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Field Expeditions &amp; Geotourism
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Curated Park Experiences
          </h1>
          <p className="text-sm md:text-base text-ivory-200/85 max-w-2xl mx-auto leading-relaxed font-light">
            From sunrise zebra safaris across Dida-Hara to the black-water volcanic caldera of El Sod and the polyphonic Singing Wells of Dubuluk.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Signature Experiences Grid */}
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Signature Adventures</span>
            </p>
            <h2 className="text-3xl font-display font-bold text-charcoal-950">
              Six Guided Field Expeditions
            </h2>
            <p className="text-sm text-charcoal-700 font-light leading-relaxed">
              Every expedition is accompanied by an authorized EWCA wildlife ranger or certified community guide, ensuring safety and authentic biocultural interpretation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.title}
                className="bg-white rounded-2xl border border-sand-200/80 overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-forest-950 overflow-hidden">
                    <OptimizedImage
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-semibold text-gold-300 border border-forest-800">
                      {exp.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-charcoal-600 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-forest-700" />
                        {exp.duration}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-sand-100 text-charcoal-700 text-[11px]">
                        {exp.difficulty}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-charcoal-950 group-hover:text-forest-900 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-charcoal-700 leading-relaxed font-light">{exp.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-sand-100 mt-4">
                  <p className="text-[11px] font-semibold text-earth-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span>{exp.highlight}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trail Circuit Explorer Component */}
        <section>
          <TrailCircuitExplorer />
        </section>

        {/* Suggested Itineraries */}
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Recommended Circuits</span>
            </p>
            <h2 className="text-3xl font-display font-bold text-charcoal-950">
              Curated Safari Itineraries
            </h2>
            <p className="text-sm text-charcoal-700 font-light leading-relaxed">
              Designed for wildlife photographers, birding specialists, and geotourists seeking immersive multi-day expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ITINERARIES.map((itin) => (
              <div
                key={itin.title}
                className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-subtle space-y-4 hover:border-gold-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-50 text-gold-900 border border-gold-200">
                      {itin.tag}
                    </span>
                    <span className="text-xs font-bold font-mono text-forest-900">{itin.days}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-charcoal-950">{itin.title}</h4>
                  <p className="text-xs text-charcoal-700 leading-relaxed font-light">{itin.desc}</p>
                </div>

                <Link
                  href={`/contact?itinerary=${encodeURIComponent(itin.title)}`}
                  className="w-full py-2.5 px-4 bg-forest-900 hover:bg-forest-850 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center inline-flex items-center justify-center gap-1.5 shadow-subtle"
                >
                  <span>Request Custom Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Logistics & Practical Visiting Information (Sourced from Dossier §10) */}
        <section className="bg-white rounded-2xl border border-sand-200/80 p-8 sm:p-10 shadow-subtle space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-earth-700 flex items-center gap-2">
              <Compass className="w-4 h-4 text-forest-800" /> Plan Your Trip
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-950">
              Essential Visitor Logistics &amp; Travel Planning
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
              Planning advice compiled from official EWCA field guidelines and regional destination reports:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {VISITING_LOGISTICS.map((item) => (
              <div key={item.title} className="p-5 rounded-xl bg-ivory-50 border border-sand-200 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-100 shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-base text-charcoal-950">{item.title}</h4>
                </div>
                <p className="text-xs text-charcoal-700 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Park Fee & Tariff Calculator */}
        <section className="bg-forest-950 text-white rounded-2xl border border-forest-800 p-8 sm:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-400 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-gold-400" />
                  Official Statutory Tariffs
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold">
                  Interactive Park Fee Calculator
                </h3>
                <p className="text-xs text-ivory-200/80 font-light">
                  Calculate estimated statutory entry permits, ranger guide services, and camping fees under EWCA regulations.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Visitor Category */}
                <div>
                  <label className="block text-ivory-300 uppercase tracking-wider font-semibold mb-2">
                    Visitor Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'international', label: 'International ($20/day)' },
                      { key: 'resident', label: 'Resident Exp. ($10/day)' },
                      { key: 'national', label: 'Ethiopian Citizen (100 ETB)' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setVisitorType(opt.key as any)}
                        className={cn(
                          'p-2.5 rounded-lg border text-center font-semibold transition-all',
                          visitorType === opt.key
                            ? 'bg-gold-500 text-charcoal-950 border-gold-400 shadow-sm'
                            : 'bg-forest-900/60 border-forest-800 text-ivory-200 hover:border-forest-700'
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Guests & Days */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ivory-300 uppercase tracking-wider font-semibold mb-1.5">
                      Number of Persons
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={numGuests}
                      onChange={(e) => setNumGuests(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-forest-900 border border-forest-800 rounded-lg px-4 py-2.5 text-white font-mono text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-ivory-300 uppercase tracking-wider font-semibold mb-1.5">
                      Expedition Days
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={14}
                      value={numDays}
                      onChange={(e) => setNumDays(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-forest-900 border border-forest-800 rounded-lg px-4 py-2.5 text-white font-mono text-sm outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                {/* Checkbox Options */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeCamping}
                      onChange={(e) => setIncludeCamping(e.target.checked)}
                      className="rounded border-forest-800 bg-forest-900 text-gold-500 focus:ring-gold-500 w-4 h-4"
                    />
                    <span className="text-ivory-200">Include Eco-Camping Permits</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeVehicle}
                      onChange={(e) => setIncludeVehicle(e.target.checked)}
                      className="rounded border-forest-800 bg-forest-900 text-gold-500 focus:ring-gold-500 w-4 h-4"
                    />
                    <span className="text-ivory-200">Include 4WD Vehicle Permit</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Calculated Summary Card */}
            <div className="lg:col-span-5 bg-forest-900/90 border border-forest-800 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400">
                  Estimated Official Tariff
                </span>
                <div className="space-y-2 pb-4 border-b border-forest-800 text-xs text-ivory-300">
                  <div className="flex justify-between">
                    <span>Entry Permits ({numGuests} guests × {numDays} days)</span>
                    <strong className="text-white">${dailyFeePerGuest * numGuests * numDays}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>EWCA Ranger Escort ({numDays} days)</span>
                    <strong className="text-white">${rangerFeePerDay * numDays}</strong>
                  </div>
                  {includeVehicle && (
                    <div className="flex justify-between">
                      <span>4WD Track Vehicle Permit</span>
                      <strong className="text-white">${vehicleFeePerDay * numDays}</strong>
                    </div>
                  )}
                  {includeCamping && numDays > 1 && (
                    <div className="flex justify-between">
                      <span>Eco-Campsite Pitching</span>
                      <strong className="text-white">${campingFeePerNight * (numDays - 1)}</strong>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-display text-lg font-bold text-white">Estimated Total</span>
                  <span className="font-display text-3xl font-bold text-gold-400">
                    ${totalEstimate}
                    <span className="text-xs text-ivory-300 font-sans font-normal ml-1">USD</span>
                  </span>
                </div>
                <p className="text-[10px] text-ivory-300/80 leading-relaxed font-light">
                  *Official statutory fees payable in USD or equivalent ETB at Yabelo park headquarters.
                </p>
              </div>

              <Link
                href={`/contact?estGuests=${numGuests}&estDays=${numDays}&estType=${visitorType}`}
                className="w-full py-3 px-4 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle transition-all text-center inline-flex items-center justify-center gap-2"
              >
                <span>Reserve Expedition Permits</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
