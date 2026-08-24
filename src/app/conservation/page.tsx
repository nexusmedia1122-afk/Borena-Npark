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
  Activity,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Radio,
  Sparkles,
  Globe2,
  HeartHandshake,
  FileText,
} from 'lucide-react'

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
            src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=1200&q=75"
            alt="Conservation in Borana"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            Biodiversity Stewardship & Science
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Conservation & Research
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
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
              className="bg-white rounded-2xl border border-sand-200 p-6 shadow-sm text-center space-y-1 hover:border-gold-500/50 transition-colors"
            >
              <p className="font-display font-bold text-3xl sm:text-4xl text-forest-900">{m.value}</p>
              <p className="text-xs font-semibold text-charcoal-600 uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Strategic Pillars */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-600">
              Operational Matrix
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900">
              Core Conservation Programs
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600">
              Co-managed by the Ethiopian Wildlife Conservation Authority (EWCA) and traditional Gadaa community elders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONSERVATION_INITIATIVES.map((init, idx) => {
              const Icon = init.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-sand-200 p-8 shadow-sm hover:shadow-card hover:border-forest-700/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-gold-700 bg-gold-100/70 px-2.5 py-1 rounded-lg">
                        {init.metric}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-charcoal-900 leading-snug">
                      {init.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                      {init.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Academic & Scientific Research Permits Callout */}
        <section className="bg-forest-950 text-white rounded-3xl border border-forest-800 p-8 sm:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-400 flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-gold-400" />
                Scientific Research Accreditations
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                Field Research Stations & University Partnerships
              </h3>
              <p className="text-sm text-ivory-200/80 leading-relaxed max-w-2xl">
                Borena National Park welcomes academic researchers, zoologists, and botanical institutes. EWCA provides field base station logistics, telemetry access, and certified armed scout escorts for registered studies.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/contact?inquiryType=Scientific%20Research%20Accreditation"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold-600 hover:bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-glow-gold transition-all text-center"
              >
                <span>Apply for Research Permit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Official Downloads & Conservation Directives */}
        <OfficialDownloads />
      </main>

      <SiteFooter />
    </div>
  )
}
