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
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-35">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=75"
            alt="About Borena National Park"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Institutional Overview & Mandate
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            About the National Park
          </h1>
          <p className="text-sm md:text-base text-ivory-200/85 max-w-2xl mx-auto leading-relaxed font-light">
            The Ethiopian Wildlife Conservation Authority’s premier southern sanctuary—safeguarding endemic wildlife, volcanic wonders, and ancient pastoralist heritage.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Mission & Statutory Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Statutory Purpose</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-950 leading-tight">
              Preserving Ethiopia&apos;s Southern Ecological Frontier
            </h2>
            <p className="text-base text-charcoal-800 leading-relaxed font-serif drop-cap">
              Borena National Park encompasses over 1.2 million hectares of protected ecosystems in the Borena Zone of the Oromia Region. Formally gazetted to protect critical migration corridors for endangered Grevy&apos;s zebras, Somali ostriches, and Beisa oryx, the park represents a flagship model of collaborative conservation.
            </p>
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
              Managed directly by the Ethiopian Wildlife Conservation Authority (EWCA) in co-management with traditional Gadaa community leaders, the park integrates modern telemetry wildlife science with centuries of customary pastoral natural resource covenants.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-4 rounded-xl border border-sand-200 shadow-subtle">
                <p className="text-2xl font-display font-bold text-forest-900">1,200,000+ ha</p>
                <p className="text-xs text-charcoal-600 mt-1">Protected Ecosystem</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-sand-200 shadow-subtle">
                <p className="text-2xl font-display font-bold text-forest-900">450+ Species</p>
                <p className="text-xs text-charcoal-600 mt-1">Faunal Diversity</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card border border-sand-200 bg-forest-950">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=800&q=75"
                alt="Protected Savanna Landscape"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Official Emblem & Identity */}
        <div className="bg-white rounded-2xl border border-sand-200/80 p-8 sm:p-10 shadow-subtle grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white p-2 border-2 border-gold-500/50 shadow-luxury overflow-hidden flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Official Seal of Borana National Park"
                className="w-full h-full object-contain transform scale-105"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-earth-700">Official Insignia</span>
            <h3 className="font-display font-bold text-2xl text-charcoal-950">
              The Official Seal of Borana National Park
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
              The circular emblem embodies the park&apos;s dual mission: institutional statutory conservation and ancestral Oromo pastoralist heritage. The typography honors Afaan Oromo (*Paarkii Biyyooleessa Booranaa*), framing the southern acacia rift silhouette and Oromo tricolor palette.
            </p>
          </div>
        </div>

        {/* Institutional Governance Specs */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-earth-700">Governance & Demographics</span>
            <h3 className="font-display font-bold text-2xl text-charcoal-950">
              Key Institutional Facts
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-sand-200/80 shadow-subtle space-y-1">
              <span className="text-xs text-charcoal-600 block">Managing Authority</span>
              <p className="font-display font-bold text-sm text-charcoal-950">{PARK_INSTITUTIONAL_DATA.authority}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-sand-200/80 shadow-subtle space-y-1">
              <span className="text-xs text-charcoal-600 block">Regional State</span>
              <p className="font-display font-bold text-sm text-charcoal-950">{PARK_INSTITUTIONAL_DATA.regionalState}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-sand-200/80 shadow-subtle space-y-1">
              <span className="text-xs text-charcoal-600 block">Park Headquarters</span>
              <p className="font-display font-bold text-sm text-charcoal-950">{PARK_INSTITUTIONAL_DATA.headquarters}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-sand-200/80 shadow-subtle space-y-1">
              <span className="text-xs text-charcoal-600 block">Elevation Range</span>
              <p className="font-display font-bold text-sm text-charcoal-950">{PARK_INSTITUTIONAL_DATA.elevationRange}</p>
            </div>
          </div>
        </div>

        {/* Official Downloads Section */}
        <OfficialDownloads />
      </main>

      <SiteFooter />
    </div>
  )
}
