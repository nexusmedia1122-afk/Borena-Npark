'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import { Sparkles, Users, Award, HeartHandshake, Compass, ArrowRight, ShieldCheck } from 'lucide-react'

const CULTURAL_HIGHLIGHTS = [
  {
    title: 'The UNESCO-Inscribed Gadaa Governance System',
    desc: 'An indigenous egalitarian democratic system structuring political, social, and environmental stewardship across generation sets for over five centuries.',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Tula "Singing Wells" Hydrological Heritage',
    desc: 'Deep limestone shafts where human chains rhythmically chant while passing leather water buckets to quench livestock and nocturnal wildlife.',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Customary Pastoral Pasture Covenants (Seera)',
    desc: 'Traditional ecological rotational grazing rules that designate dry-season refuge pastures and protect critical wildlife calving zones.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=85"
            alt="Borena Culture"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            UNESCO Intangible Cultural Heritage
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Living Borena Heritage
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            Where ancestral indigenous knowledge systems, democratic Gadaa councils, and timeless water covenants sustain both human communities and wild nature.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Lead Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-600">Sacred Ecology</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 leading-tight">
              A Living Covenant Between Humans and Wilderness
            </h2>
            <p className="text-base text-charcoal-700 leading-relaxed">
              For countless generations, the Borena Oromo pastoralists have cultivated an intricate symbiosis with the arid savannah of southern Ethiopia. Far from being an empty wilderness, Borana National Park is an ancestral biocultural landscape where every volcanic ridge, water pan, and acacia grove carries historical and spiritual resonance.
            </p>
            <p className="text-base text-charcoal-700 leading-relaxed">
              Central to Borena society is the Gadaa system—an indigenous democratic philosophy recognized globally by UNESCO. Gadaa principles mandate that water and natural pastures are communal blessings held in trust for future generations and wild animals alike.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-sand-200 bg-forest-950">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
                alt="Borena Elder and Heritage"
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-600">Cultural Treasures</span>
            <h2 className="text-3xl font-display font-bold text-charcoal-900 mt-1">Key Cultural Heritage Elements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CULTURAL_HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video bg-forest-950">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-charcoal-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-charcoal-700 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-sand-100">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-forest-950"
                  >
                    Inquire for Cultural Tours <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
