'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OfficialDownloads from '@/components/OfficialDownloads'
import OptimizedImage from '@/components/OptimizedImage'
import { Button } from '@/components/ui/components'
import { Shield, Award, MapPin, Users, TreePine, FileText, CheckCircle2, ArrowRight } from 'lucide-react'
import { PARK_INSTITUTIONAL_DATA } from '@/data/park-data'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1920&q=85"
            alt="About Borena National Park"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Institutional Overview & Mandate
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            About the National Park
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            The Ethiopian Wildlife Conservation Authority’s premier southern sanctuary—safeguarding endemic wildlife, volcanic wonders, and ancient pastoralist heritage.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Mission & Statutory Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-600">Statutory Purpose</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 leading-tight">
              Preserving Ethiopia&apos;s Southern Ecological Frontier
            </h2>
            <p className="text-base text-charcoal-700 leading-relaxed">
              Borena National Park encompasses over 1.2 million hectares of protected ecosystems in the Borena Zone of the Oromia Region. Formally gazetted to protect critical migration corridors for endangered Grevy&apos;s zebras, Somali ostriches, and Beisa oryx, the park represents a flagship model of collaborative conservation.
            </p>
            <p className="text-base text-charcoal-700 leading-relaxed">
              Managed directly by the Ethiopian Wildlife Conservation Authority (EWCA) in co-management with traditional Gadaa community leaders, the park integrates modern telemetry wildlife science with centuries of customary pastoral natural resource covenants.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-sand-200 shadow-sm">
                <p className="text-2xl font-display font-bold text-forest-900">1,200,000+ ha</p>
                <p className="text-xs text-charcoal-700 mt-1">Protected Ecosystem</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-sand-200 shadow-sm">
                <p className="text-2xl font-display font-bold text-forest-900">450+ Species</p>
                <p className="text-xs text-charcoal-700 mt-1">Faunal Diversity</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-sand-200 bg-forest-950">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80"
                alt="Protected Savanna Landscape"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Institutional Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-600">Core Objectives</span>
            <h2 className="text-3xl font-display font-bold text-charcoal-900 mt-1">Three Pillars of Park Stewardship</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-charcoal-900 mb-3">1. Biodiversity Protection</h3>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                24/7 anti-poaching foot patrols, satellite smart-outposts, ecological censuses, and veterinary interventions preserving endangered Horn endemic species.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-charcoal-900 mb-3">2. Community Gadaa Partnership</h3>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                Direct revenue-sharing with pastoralist cooperatives, employing over 65% local rangers, and protecting sacred hydrological Tula well systems.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-sand-200 p-8 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center mb-5">
                <TreePine className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-charcoal-900 mb-3">3. Low-Impact Eco-Tourism</h3>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                Regulated safari circuits, certified local scout escorts, wilderness trekking trails, and geological study tours generating sustainable green livelihoods.
              </p>
            </div>
          </div>
        </div>

        {/* Official Park Code & Regulations */}
        <div className="bg-forest-950 text-ivory-50 rounded-3xl p-8 sm:p-12 border border-forest-800 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase font-bold tracking-wider text-gold-400">Ministerial Directives</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">Official Park Code of Conduct</h2>
            <p className="text-sm text-ivory-200 mt-2">
              All visitors, tour operators, and researchers must abide by federal wildlife conservation statutes under Ethiopian law:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-ivory-100">
            {[
              'Always remain accompanied by a certified EWCA ranger scout on all backcountry trails.',
              'Maintain a minimum observation distance of 30 meters from all wild mammals.',
              'Maximum vehicle speed limit is 40 km/h on main roads and 25 km/h on wildlife tracks.',
              'Strict zero-tolerance policy for littering: pack out all non-biodegradable waste.',
              'Commercial drone flights require written prior permit from the Ministry of Tourism.',
              'Open campfires are prohibited except in designated campsite fire enclosures.',
              'Off-road driving is strictly forbidden to protect fragile savanna grasslands and root systems.',
              'Observe cultural respect when visiting Gadaa council sites and traditional Tula wells.',
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-forest-900/60 p-4 rounded-xl border border-forest-800/80">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Official Downloads */}
        <OfficialDownloads />
      </main>

      <SiteFooter />
    </div>
  )
}
