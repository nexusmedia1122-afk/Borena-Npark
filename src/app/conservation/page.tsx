'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OfficialDownloads from '@/components/OfficialDownloads'
import OptimizedImage from '@/components/OptimizedImage'
import { Shield, TreePine, Users, Search, Activity, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react'

const CONSERVATION_INITIATIVES = [
  {
    icon: Shield,
    title: '24/7 Smart Anti-Poaching Patrols',
    desc: 'Solar-powered perimeter outposts equipped with SMART spatial data tracking, thermal optics, and mobile ranger response units guarding core elephant and zebra sanctuaries.',
  },
  {
    icon: TreePine,
    title: 'Savanna & Acacia Habitat Restoration',
    desc: 'Systematic removal of invasive bush species, native acacia woodland replanting, controlled firebreaks, and erosion abatement across the Dida Hara catchment.',
  },
  {
    icon: Users,
    title: 'Community Pastoralist Scout Networks',
    desc: 'Over 65% of field monitors are recruited from local villages, receiving formal EWCA training, communications radios, and equitable conservation revenue shares.',
  },
  {
    icon: Search,
    title: 'Longitudinal Ecological & Genetic Research',
    desc: 'Collaborative wildlife population censuses, non-invasive genetic sampling, and GPS telemetry monitoring with Ethiopian and international university researchers.',
  },
]

export default function ConservationPage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=1920&q=85"
            alt="Conservation in Borana"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            EWCA Biodiversity Protection Program
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Conservation & Science
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            Integrating cutting-edge spatial ranger technology with traditional community governance to secure southern Ethiopia&apos;s wildlife heritage.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Core Initiatives */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-600">Strategic Operations</span>
            <h2 className="text-3xl font-display font-bold text-charcoal-900 mt-1">Key Conservation Programs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CONSERVATION_INITIATIVES.map((init, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm hover:shadow-lg transition-all flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center flex-shrink-0">
                  <init.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-charcoal-900 mb-2">{init.title}</h3>
                  <p className="text-sm text-charcoal-700 leading-relaxed">{init.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistical Metrics */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-950 text-ivory-50 rounded-3xl p-8 sm:p-12 border border-forest-800 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-400">Impact Indicators</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">Park Protection in Numbers</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-forest-800/50 rounded-2xl p-6 border border-forest-700/50">
              <p className="text-3xl sm:text-4xl font-display font-bold text-gold-400">1.2M+</p>
              <p className="text-xs uppercase font-semibold text-ivory-200 mt-2">Hectares Protected</p>
            </div>
            <div className="bg-forest-800/50 rounded-2xl p-6 border border-forest-700/50">
              <p className="text-3xl sm:text-4xl font-display font-bold text-gold-400">450+</p>
              <p className="text-xs uppercase font-semibold text-ivory-200 mt-2">Documented Species</p>
            </div>
            <div className="bg-forest-800/50 rounded-2xl p-6 border border-forest-700/50">
              <p className="text-3xl sm:text-4xl font-display font-bold text-gold-400">85+</p>
              <p className="text-xs uppercase font-semibold text-ivory-200 mt-2">Active Field Rangers</p>
            </div>
            <div className="bg-forest-800/50 rounded-2xl p-6 border border-forest-700/50">
              <p className="text-3xl sm:text-4xl font-display font-bold text-gold-400">65%</p>
              <p className="text-xs uppercase font-semibold text-ivory-200 mt-2">Community Staff</p>
            </div>
          </div>
        </div>

        {/* Research Application & Downloads */}
        <OfficialDownloads />
      </main>

      <SiteFooter />
    </div>
  )
}
