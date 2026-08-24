'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import {
  Sparkles,
  Users,
  Award,
  Compass,
  ArrowRight,
  ShieldCheck,
  Music,
  TreePine,
  Droplets,
  Scale,
  CheckCircle2,
  HeartHandshake,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const GADAA_GRADES = [
  { grade: 'Dabballee', age: '0–8 Years', role: 'Childhood & Socialization', desc: 'Protected status in the community, blessed by the Abbaa Gadaa.' },
  { grade: 'Gaammee Didiqqoo', age: '9–16 Years', role: 'Apprenticeship & Herding', desc: 'Learning livestock ecology, rangeland routes, and wildlife identification.' },
  { grade: 'Gaammee Gurguddoo', age: '17–24 Years', role: 'Youth & Scout Training', desc: 'Physical endurance, scouting backcountry borders, and wildlife tracking.' },
  { grade: 'Kuusa', age: '25–32 Years', role: 'Civic Assembly & Law', desc: 'Studying customary jurisprudence and election into Gadaa council candidacy.' },
  { grade: 'Raaba Doorii', age: '33–40 Years', role: 'Transition & Family Leadership', desc: 'Preparation for executive power, peacemaking, and sacred tree ceremonies.' },
  { grade: 'Gadaa (Executive)', age: '41–48 Years', role: 'Supreme Governance', desc: 'Active national leadership headed by the Abbaa Gadaa and council of ministers.' },
  { grade: 'Yuba & Jaarsa', age: '49+ Years', role: 'Senior Advisory Elders', desc: 'Judicial supreme arbitration, natural resource oversight, and cultural memory.' },
]

const TULA_WELL_SYSTEMS = [
  { name: 'Dhaas Tula Complex', depth: '28 meters', chains: '18 people', location: 'Eastern Rangelands' },
  { name: 'Dubuluq Limestone Well', depth: '32 meters', chains: '22 people', location: 'Central Plains' },
  { name: 'Goofa Deep Aquifer', depth: '25 meters', chains: '16 people', location: 'Southern Corridor' },
  { name: 'Web Hand-Hewn Well', depth: '30 meters', chains: '20 people', location: 'Northern Foothills' },
]

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=75"
            alt="Borena Culture"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            UNESCO Intangible Cultural Heritage
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Living Borena Heritage
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            Where ancestral indigenous governance, rhythmic Singing Wells, and customary conservation covenants sustain both humans and wild nature.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Living Covenant Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-600">
              Indigenous Bio-Cultural Landscape
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 leading-tight">
              A Five-Century Democratic Covenant for Earth and Wildlife
            </h2>
            <p className="text-base text-charcoal-700 leading-relaxed font-serif drop-cap">
              For more than five centuries, the Borana Oromo pastoralists have maintained a sophisticated democratic civilization that views wildlife, grasslands, and deep underground aquifers as inseparable gifts held in sacred public trust.
            </p>
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
              Formally inscribed by UNESCO as Intangible Cultural Heritage of Humanity, the Gadaa system is an indigenous egalitarian democracy that changes political leadership every 8 years without bloodshed, incorporating strict rangeland and wildlife protection laws into its supreme constitution (*Seera*).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-sand-200 shadow-sm">
                <p className="text-xl font-display font-bold text-forest-900">8-Year Cycles</p>
                <p className="text-xs text-charcoal-600 mt-0.5">Democratic Transition</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-sand-200 shadow-sm">
                <p className="text-xl font-display font-bold text-forest-900">9 Tula Complexes</p>
                <p className="text-xs text-charcoal-600 mt-0.5">Ancient Singing Wells</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-sand-200 shadow-sm">
                <p className="text-xl font-display font-bold text-forest-900">100% Shared</p>
                <p className="text-xs text-charcoal-600 mt-0.5">Wildlife Water Rights</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card border border-sand-200 bg-forest-950">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=75"
                alt="Gadaa Elders Assembly"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* The 8-Year Gadaa Lifecycle Timeline */}
        <section className="bg-white rounded-3xl border border-sand-200 p-8 sm:p-12 shadow-card space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-600">
              Egalitarian Generation Classes
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900">
              The 8-Year Gadaa Lifecycle
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Every Borana male advances through distinct 8-year developmental stages, culminating in supreme democratic stewardship of the nation and its natural habitats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {GADAA_GRADES.map((item, idx) => (
              <div
                key={item.grade}
                className="p-5 rounded-2xl border border-sand-200 bg-ivory-50/60 hover:bg-forest-50/60 hover:border-forest-700/50 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-700 bg-gold-100/80 px-2 py-0.5 rounded-md">
                    Stage {idx + 1}
                  </span>
                  <span className="text-[11px] font-mono text-charcoal-600">{item.age}</span>
                </div>
                <h4 className="font-display font-bold text-base text-charcoal-900">{item.grade}</h4>
                <p className="text-xs font-semibold text-forest-800">{item.role}</p>
                <p className="text-xs text-charcoal-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tula Singing Wells Showcase */}
        <section className="bg-forest-950 text-white rounded-3xl border border-forest-800 p-8 sm:p-12 shadow-card space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-400 flex items-center gap-2">
                <Music className="w-4 h-4 text-gold-400" />
                Hydrological Marvel
              </span>
              <h3 className="font-display text-2xl sm:text-4xl font-bold leading-tight">
                The Ancient Tula Singing Wells
              </h3>
              <p className="text-sm text-ivory-200 leading-relaxed">
                Excavated by hand through solid limestone up to 30 meters deep, the nine historic Tula well complexes of Borana operate through human bucket-chains of 15 to 25 people.
              </p>
              <p className="text-sm text-ivory-200 leading-relaxed">
                As they pass the traditional giraffe-hide water buckets (*Okolee*), the chanters sing rhythmic polyphonic working songs. The tempo sets the speed of the water flow. By customary law, water left in the ground-level troughs at dusk is dedicated exclusively for nocturnal wild animals—including lions, leopards, zebras, and antelopes.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TULA_WELL_SYSTEMS.map((well) => (
                <div key={well.name} className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800 space-y-2">
                  <Droplets className="w-5 h-5 text-gold-400" />
                  <h4 className="font-display font-bold text-base text-white">{well.name}</h4>
                  <div className="text-xs text-ivory-300 space-y-1 pt-1">
                    <p>Excavation Depth: <strong className="text-white">{well.depth}</strong></p>
                    <p>Bucket Chain: <strong className="text-white">{well.chains}</strong></p>
                    <p>Zone: <span className="text-gold-300">{well.location}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customary Environmental Laws (Seera Marraa fi Bishaan) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-600">
              Customary Ecological Statutes
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900">
              Seera Marraa fi Bishaan (Laws of Pasture & Water)
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Traditional covenants established under sacred meeting sycamores that govern wildlife conservation and pasture preservation across the park.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl border border-sand-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                <TreePine className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-charcoal-900">1. Kalo Pasture Reserves</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Designated dry-season grass sanctuaries where grazing is prohibited during the rains, providing unhindered forage for wild zebras, gazelles, and migratory herds.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-sand-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-charcoal-900">2. Bishaan Water Sanctuary</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Water is legally defined as a non-exclusive divine gift. Denying access to a thirsty traveler, herd, or wild animal is considered a grave moral offense (*Cubbú*).
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-sand-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-earth-100 text-earth-800 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-charcoal-900">3. Dhaddacha Arbitration</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                All territorial disputes and conservation infractions are arbitrated peacefully under the shade of the sacred *Dhaddacha* tree without carrying weapons.
              </p>
            </div>
          </div>
        </section>

        {/* Responsible Cultural Tourism Etiquette */}
        <div className="bg-white rounded-3xl border border-sand-200 p-8 sm:p-12 shadow-card space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-600">
              Visitor Guidelines
            </span>
            <h3 className="font-display text-2xl font-bold text-charcoal-900">
              Responsible Cultural Safari Etiquette
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600">
              When visiting Gadaa council sites, pastoral villages, and the Singing Wells:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-charcoal-700">
            {[
              'Always be accompanied by a licensed EWCA community scout when visiting traditional wells.',
              'Request explicit permission before photographing community elders or sacred ritual areas.',
              'Do not interrupt the rhythm of chanter lines at the Singing Wells during morning watering shifts.',
              'Support local women’s weaving cooperatives by purchasing directly from certified craft centres in Yabelo.',
              'Remove shoes or headwear when invited into a traditional Borana residential compound (*Odaa*).',
              'Participate respectfully if offered the traditional Buna Qalaa roasted coffee blessing ceremony.',
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-ivory-50 border border-sand-200">
                <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
