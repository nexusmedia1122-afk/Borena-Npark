'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import { Compass, Tent, Bird, Camera, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react'

const EXPERIENCES = [
  {
    title: 'Savanna Game Drives & Grevy’s Zebra Safari',
    category: 'Wildlife Safari',
    duration: 'Half-Day or Full-Day',
    difficulty: 'Easy',
    desc: 'Expert-led 4WD tracking across the Dida Hara plains to observe Grevy’s zebras, Beisa oryx, lions, cheetahs, and Somali ostriches with a certified EWCA ranger.',
    image: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'El Sod "House of Salt" Crater Caldera Trek',
    category: 'Geotourism & Trekking',
    duration: '3–4 Hours',
    difficulty: 'Moderate',
    desc: 'Descend 600 vertical meters into the ancient volcanic caldera of El Sod to witness traditional mineral salt harvesting from the subterranean black brine lake.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Tula "Singing Wells" Cultural Immersion',
    category: 'Heritage Tour',
    duration: '2–3 Hours (Morning)',
    difficulty: 'Easy',
    desc: 'Witness the morning watering ritual at Dubuluk, where pastoralist teams chant in ancient rhythmic harmony as they draw water from 30-meter deep stone wells.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Sarite Wilderness Eco-Camping & Stargazing',
    category: 'Overnight Expedition',
    duration: '1–3 Nights',
    difficulty: 'Moderate',
    desc: 'Camp beneath some of East Africa’s darkest night skies in designated eco-campsites accompanied by an armed ranger, with nocturnal wildlife listening walks.',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Highland Endemic Birding & Raptor Expedition',
    category: 'Specialist Birding',
    duration: 'Full-Day',
    difficulty: 'Easy–Moderate',
    desc: 'Targeting over 320 recorded avian species including Vulturine Guineafowl, Somali Ostrich, Ruspoli’s Turaco, and cliff-dwelling Verreaux’s eagles.',
    image: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Magado Crater Lake & Forest Ascent',
    category: 'Mountain Hiking',
    duration: '4–5 Hours',
    difficulty: 'Challenging',
    desc: 'Trek through lush afro-montane forest slopes surrounding the emerald crater lake of Magado, home to colobus monkeys, bushbucks, and panoramic southern vistas.',
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85"
            alt="Experiences Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            Official Guided Safaris & Expeditions
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Park Experiences
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            From sunrise game drives across the savanna to volcanic crater descents and singing well cultural tours—discover authorized park itineraries.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-forest-700/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-forest-950 overflow-hidden">
                  <OptimizedImage
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-900/90 text-gold-300 border border-forest-700/50 backdrop-blur-sm">
                      {exp.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-charcoal-700 mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exp.duration}</span>
                    <span>•</span>
                    <span className="font-medium text-forest-800">{exp.difficulty}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-charcoal-700 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-sand-100 flex items-center justify-between">
                <Link
                  href={`/contact?visitType=${encodeURIComponent(exp.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold rounded-xl transition-colors"
                >
                  <span>Inquire / Book Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
