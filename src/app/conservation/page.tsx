'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OfficialDownloads from '@/components/OfficialDownloads'
import OptimizedImage from '@/components/OptimizedImage'
import {
  Shield,
  TreePine,
  Users,
  Search,
  ArrowRight,
  Sparkles,
  FileText,
} from 'lucide-react'
import { cldImage } from '@/lib/cloudinary'

const CONSERVATION_METRICS = [
  { value: '1.2M+ ha', label: 'Monitored under SMART Patrols' },
  { value: '140+', label: 'Certified Community Scouts' },
  { value: '98.4%', label: 'Habitat Integrity Index' },
  { value: '32,000 ha', label: 'Savanna Rangeland Restored' },
]

const CONSERVATION_INITIATIVES = [
  {
    icon: Shield,
    title: 'SMART Spatial Anti-Poaching System',
    desc: 'Solar-powered perimeter outposts equipped with SMART (Spatial Monitoring and Reporting Tool) GPS logging, thermal imaging, and rapid-response motorized ranger units guarding core wildlife habitats.',
    metric: '24/7 Monitored',
  },
  {
    icon: TreePine,
    title: 'Acacia Savanna & Watershed Restoration',
    desc: 'Systematic eradication of invasive acacia encroachment, controlled seasonal firebreaks, native grass replanting, and soil erosion barriers across the Dida Hara and Magado catchments.',
    metric: '32,000 ha Restored',
  },
  {
    icon: Users,
    title: 'Community Pastoralist Scout Network',
    desc: 'Over 65% of frontline wildlife monitors are recruited directly from Borana pastoralist villages, receiving formal EWCA tactical training, communications radios, and conservation revenue shares.',
    metric: '140+ Rangers Active',
  },
  {
    icon: Search,
    title: 'Longitudinal Telemetry & Genetic Research',
    desc: 'Biannual ground censuses, GPS satellite collaring on key matriarch zebras, non-invasive scat genetic sequencing, and university biodiversity field stations.',
    metric: '12 Active Studies',
  },
]

export default function ConservationPage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src={cldImage('780553747_122141256591053365_2969268618095047054_n', 'w_1600,h_900,c_fill,q_auto')}
            alt="Conservation in Borana"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Biodiversity Stewardship & Science
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Conservation & Research
          </h1>
          <p className="text-sm md:text-base text-ivory-200/85 max-w-2xl mx-auto leading-relaxed font-light">
            Integrating cutting-edge spatial ranger telemetry with ancient community covenants to secure southern Ethiopia&apos;s wildest ecosystems.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CONSERVATION_METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-2xl border border-sand-200/80 p-6 shadow-subtle text-center space-y-1 hover:border-gold-500/50 transition-colors"
            >
              <p className="font-display font-bold text-3xl sm:text-4xl text-forest-900">{m.value}</p>
              <p className="text-xs font-semibold text-charcoal-600 uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Core Pillars Narrative */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Institutional Strategy</span>
            </p>
            <h2 className="text-3xl font-display font-bold text-charcoal-950">
              Integrated Landscape Conservation Framework
            </h2>
            <p className="text-sm text-charcoal-700 font-light leading-relaxed">
              Borana National Park employs a hybrid protection model that unifies government law enforcement (EWCA) with customary pastoral governance under the Gadaa system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONSERVATION_INITIATIVES.map((init) => (
              <div
                key={init.title}
                className="bg-white rounded-2xl border border-sand-200/80 p-7 shadow-subtle space-y-4 hover:border-gold-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-100">
                      <init.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sand-50 text-forest-900 border border-sand-200">
                      {init.metric}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-charcoal-950">{init.title}</h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">{init.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic & Research Accreditation Portal */}
        <div className="p-8 sm:p-12 rounded-2xl bg-forest-950 text-white border border-forest-800 shadow-luxury flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Academic Affiliation
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold">
              Conduct Field Research in Borana National Park
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/80 leading-relaxed font-light">
              We welcome domestic and international university scholars, ornithologists, and conservation biologists. Registered researchers gain access to long-term monitoring plots, ranger support, and GIS spatial data.
            </p>
          </div>

          <Link
            href="/contact?type=research"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider transition-all shadow-subtle shrink-0"
          >
            <span>Apply for Research Permit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Official Downloads Section */}
        <OfficialDownloads />
      </main>

      <SiteFooter />
    </div>
  )
}
