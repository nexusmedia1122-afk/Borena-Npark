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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { cldImage } from '@/lib/cloudinary'

const EXPERIENCES = [
  {
    title: 'Savanna Game Drives & Grevy’s Zebra Safari',
    category: 'Wildlife Safari',
    duration: 'Half-Day or Full-Day',
    difficulty: 'Easy',
    desc: 'Expert-led 4WD tracking across the Dida Hara plains to observe Grevy’s zebras, Beisa oryx, lions, cheetahs, and Somali ostriches with a certified EWCA ranger.',
    image: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: 'Highest density of Grevy’s zebras in southern Ethiopia',
  },
  {
    title: 'El Sod "House of Salt" Crater Caldera Trek',
    category: 'Geotourism & Trekking',
    duration: '3–4 Hours',
    difficulty: 'Moderate',
    desc: 'Descend 600 vertical meters into the ancient volcanic caldera of El Sod to witness traditional mineral salt harvesting from the subterranean black brine lake.',
    image: cldImage('667811241_1374606294713548_4463427384711284519_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: '600m volcanic descent to black brine lake',
  },
  {
    title: 'Tula "Singing Wells" Cultural Immersion',
    category: 'Heritage Tour',
    duration: '2–3 Hours (Morning)',
    difficulty: 'Easy',
    desc: 'Witness the morning watering ritual at Dubuluk, where pastoralist teams chant in ancient rhythmic harmony as they draw water from 30-meter deep stone wells.',
    image: cldImage('782451195_122141256279053365_7936837558989253988_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: 'UNESCO-inscribed living polyphonic chants',
  },
  {
    title: 'Sarite Wilderness Eco-Camping & Stargazing',
    category: 'Overnight Expedition',
    duration: '1–3 Nights',
    difficulty: 'Moderate',
    desc: 'Camp beneath some of East Africa’s darkest night skies in designated eco-campsites accompanied by an armed ranger, with nocturnal wildlife listening walks.',
    image: cldImage('668110576_1374606031380241_6681634558621259739_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: 'Pristine Class-1 Bortle dark sky stargazing',
  },
  {
    title: 'Highland Endemic Birding & Raptor Expedition',
    category: 'Specialist Birding',
    duration: 'Full-Day',
    difficulty: 'Easy–Moderate',
    desc: 'Targeting over 320 recorded avian species including Vulturine Guineafowl, Somali Ostrich, Ruspoli’s Turaco, and cliff-dwelling Verreaux’s eagles.',
    image: cldImage('667812556_1374606328046878_2299729915640711788_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: '320+ species including Ethiopian endemics',
  },
  {
    title: 'Magado Crater Lake & Forest Ascent',
    category: 'Mountain Hiking',
    duration: '4–5 Hours',
    difficulty: 'Challenging',
    desc: 'Trek through lush afro-montane forest slopes surrounding the emerald crater lake of Magado, home to colobus monkeys, bushbucks, and panoramic southern vistas.',
    image: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_800,h_500,c_fill,q_auto'),
    highlight: 'Pristine cloud forest & crater lake panorama',
  },
]

const ITINERARIES = [
  {
    title: '1-Day Savanna & Caldera Express',
    tag: 'Highlights Tour',
    days: '1 Day',
    desc: 'Dawn game drive across Dida Hara Savanna followed by an afternoon hike along the dramatic crater rim of El Sod.',
  },
  {
    title: '3-Day Wildlife, Salt & Singing Wells Classic',
    tag: 'Recommended Safari',
    days: '3 Days / 2 Nights',
    desc: 'Comprehensive expedition covering Dida Hara plains, morning Tula Singing Wells chants, deep caldera descent, and a night of eco-camping.',
  },
  {
    title: '5-Day Transboundary Wilderness Odyssey',
    tag: 'Full Backcountry Trek',
    days: '5 Days / 4 Nights',
    desc: 'Deep multi-day wilderness traverse of Sarite rangelands, Magado cloud forest summit, wildlife corridor telemetry scouting, and Gadaa elder council meetings.',
  },
]

export default function ExperiencesPage() {
  const [visitorType, setVisitorType] = useState<'international' | 'resident' | 'national'>('international')
  const [numGuests, setNumGuests] = useState(2)
  const [numDays, setNumDays] = useState(3)
  const [includeCamping, setIncludeCamping] = useState(true)
  const [includeVehicle, setIncludeVehicle] = useState(true)

  const dailyFeePerGuest = visitorType === 'international' ? 20 : visitorType === 'resident' ? 10 : 2
  const rangerFeePerDay = 15
  const vehicleFeePerDay = includeVehicle ? 10 : 0
  const campingFeePerNight = includeCamping ? 10 * numGuests : 0

  const totalEstimate =
    dailyFeePerGuest * numGuests * numDays +
    rangerFeePerDay * numDays +
    vehicleFeePerDay * numDays +
    campingFeePerNight * Math.max(0, numDays - 1)

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src={cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_1600,h_900,c_fill,q_auto')}
            alt="Experiences Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Curated Safari Circuits & Treks
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Safari Expeditions
          </h1>
          <p className="text-sm md:text-base text-ivory-200/85 max-w-2xl mx-auto leading-relaxed font-light">
            From 4WD wildlife tracking across golden plains to descending 600m volcanic calderas and camping beneath pristine night skies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Core Experiences Grid */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Signature Adventures</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-950">
              Core Safari Activities
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light">
              All expeditions are conducted under the accompaniment of certified EWCA armed scouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={exp.title}
                className="group bg-white rounded-2xl border border-sand-200/80 overflow-hidden shadow-subtle hover:shadow-card hover:border-gold-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-forest-950">
                    <OptimizedImage
                      src={exp.image}
                      alt={exp.title}
                      fill
                      priority={idx < 3}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-sm text-gold-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-gold-500/30">
                      {exp.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-charcoal-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-forest-700" />
                        {exp.duration}
                      </span>
                      <span>•</span>
                      <span className="font-medium text-forest-900">{exp.difficulty}</span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-charcoal-950 leading-snug">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                      {exp.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-sand-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gold-800 italic">
                    {exp.highlight}
                  </span>
                  <Link
                    href={`/contact?safariExp=${encodeURIComponent(exp.title)}`}
                    className="p-2 rounded-lg bg-sand-50 hover:bg-forest-900 hover:text-white text-forest-800 transition-colors"
                    title="Book this experience"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trail Circuit Explorer Component */}
        <TrailCircuitExplorer />

        {/* Multi-Day Sample Itineraries */}
        <section className="bg-white rounded-2xl border border-sand-200/80 p-8 sm:p-12 shadow-subtle space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Recommended Itineraries</span>
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-950">
              Multi-Day Safari Routes
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light">
              Tailored itineraries combining wildlife game drives, volcanic crater descents, and cultural encounters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ITINERARIES.map((itin) => (
              <div
                key={itin.title}
                className="p-6 rounded-xl bg-ivory-50/70 border border-sand-200 hover:border-forest-750 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold-100/80 text-gold-900">
                      {itin.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-forest-900">{itin.days}</span>
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
                      { key: 'national', label: 'Ethiopian Citizen (50 ETB)' },
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
                  *Official fees payable in USD or equivalent ETB at park headquarters. Includes VAT and ranger escort.
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
