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
  AlertTriangle,
  Flame,
  Droplets,
  BarChart3,
  CheckCircle2,
} from 'lucide-react'
import { cldImage } from '@/lib/cloudinary'

const CONSERVATION_METRICS = [
  { value: '45,366 km²', label: 'Protected Area Complex' },
  { value: '4 Endemics', label: 'Globally Threatened Birds' },
  { value: '2 Equids', label: 'Coexisting Zebra Species' },
  { value: '97.8%', label: 'Ecotourist Support Rate' },
]

const CONSERVATION_INITIATIVES = [
  {
    icon: Shield,
    title: 'SMART Spatial Anti-Poaching & Telemetry',
    desc: 'Solar-powered perimeter outposts equipped with SMART (Spatial Monitoring and Reporting Tool) GPS logging, satellite mesh radios, and ranger patrol units safeguarding core wildlife habitats.',
    metric: '24/7 Monitored',
  },
  {
    icon: TreePine,
    title: 'Invasive Prosopis juliflora Eradication',
    desc: 'Targeted physical removal and canopy management of invasive thorny mesquite (Prosopis juliflora) to protect the open short-grass savanna habitat required by the endangered Ethiopian Bushcrow and grazing zebras.',
    metric: 'Habitat Defense',
  },
  {
    icon: Users,
    title: 'Pastoralist Scout Network & Gadaa Covenants',
    desc: 'Frontline wildlife monitors recruited directly from Borana pastoralist villages, implementing customary pasture and water covenants (Seera Marraa fi Bisaanii) to share grazing and water with wildlife.',
    metric: 'Community Led',
  },
  {
    icon: Search,
    title: 'Thermal Envelope & Climate Modeling Research',
    desc: 'Longitudinal studies with university ornithologists tracking the micro-climatic thermal boundaries (17.5°C–20°C) of Zavattariornis stresemanni and Hirundo megaensis under climate change scenarios.',
    metric: 'Academic Rigor',
  },
]

const CONSERVATION_CHALLENGES = [
  {
    title: 'Livestock Grazing Pressure & Rangeland Balance',
    desc: 'Borana cattle herds inside and around the park require careful coordination to avoid overgrazing. Customary Gadaa pasture covenants ensure rotational grazing zones that preserve wildlife forage.',
    tag: 'Rangeland Ecology',
  },
  {
    title: 'Invasive Prosopis juliflora Encroachment',
    desc: 'Invasive mesquite converts open grasslands into dense impenetrable thorny thickets, destroying the short-grass habitat essential for the Bushcrow and large grazing ungulates.',
    tag: 'Habitat Threat',
  },
  {
    title: 'Climate Change & Thermal Micro-Climate Shifts',
    desc: 'Stresemann’s bushcrow is strictly bounded by a narrow thermal envelope. Climate models project up to a 90% range contraction by 2070, making Borana the critical planetary refuge.',
    tag: 'Climate Vulnerability',
  },
  {
    title: 'Habitat Fragmentation & Acacia Tree-Felling',
    desc: 'Cutting mature acacia trees for firewood and charcoal degrades the communal nesting structures of endemic birds. Ranger units and community elders enforce strict tree-cutting bans.',
    tag: 'Flora Protection',
  },
  {
    title: 'Recurrent Multi-Year Droughts',
    desc: 'Severe droughts (such as 2021–2023) cause serious stress on both wildlife and livestock. Sustainable water access at Tula wells and dedicated wildlife troughs are vital.',
    tag: 'Hydrology',
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
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Biodiversity Stewardship &amp; Applied Science
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Conservation &amp; Ecological Research
          </h1>
          <p className="text-sm md:text-base text-ivory-200/85 max-w-2xl mx-auto leading-relaxed font-light">
            Pairing spatial ranger telemetry with traditional Gadaa customary law to protect 45,366 km² of southern Ethiopia&apos;s most critical savanna ecosystems.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Sourced Metrics Grid */}
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

        {/* Core Strategic Pillars */}
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
              Borana National Park operates on a co-management model uniting the <strong>Oromia Forest and Wildlife Enterprise (OFWE)</strong>, the <strong>Ethiopian Wildlife Conservation Authority (EWCA)</strong>, and traditional Gadaa pastoralist councils.
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

        {/* Real Conservation Challenges (Sourced from Dossier §11) */}
        <div className="bg-sand-50/80 rounded-2xl border border-sand-200 p-8 sm:p-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-earth-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700" /> Ground Realities &amp; Ecological Pressures
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-950">
              Primary Conservation Challenges
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
              Transparent, evidence-based conservation requires confronting the complex environmental and socio-economic dynamics of the southern Ethiopian rangelands:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {CONSERVATION_CHALLENGES.map((c) => (
              <div
                key={c.title}
                className="bg-white p-5 rounded-xl border border-sand-200 shadow-subtle space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-earth-700 bg-earth-50 px-2 py-0.5 rounded border border-earth-100">
                    {c.tag}
                  </span>
                  <h4 className="font-display font-bold text-base text-charcoal-950">{c.title}</h4>
                  <p className="text-xs text-charcoal-700 leading-relaxed font-light">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Conservation Victory: Booqee Sadeen Defense */}
        <div className="bg-forest-950 text-white rounded-2xl p-8 sm:p-12 border border-forest-800 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Community-Led Conservation Victory
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold">
              The Defense of Booqee Sadeen &amp; El Sod Crater Lake
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/85 leading-relaxed font-light">
              When industrial mining concessions were proposed for the El Sod volcanic caldera, the Borana pastoralist community mobilized through customary councils (<em>Jaarsa</em>) and Gadaa leaders. They demonstrated that centuries of artisanal, hand-harvested mineral salt extraction maintained the crater’s delicate hydrology without mechanical destruction.
            </p>
            <p className="text-xs sm:text-sm text-ivory-200/85 leading-relaxed font-light">
              The government withdrew the industrial mining tenders, securing customary community stewardship and setting a landmark precedent for indigenous biocultural conservation in East Africa.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="bg-forest-900/80 p-6 rounded-2xl border border-forest-700/60 text-center space-y-3 w-full">
              <p className="text-4xl font-display font-bold text-gold-400">600+ Yrs</p>
              <p className="text-xs font-medium text-ivory-200 uppercase tracking-wider">
                Sustainable Artisanal Salt Extraction
              </p>
              <div className="pt-2 border-t border-forest-800 text-[11px] text-ivory-300 font-light">
                Customary community stewardship over industrial extraction.
              </div>
            </div>
          </div>
        </div>

        {/* Academic Research (Dida Hara Ecotourism Study, Nigatu 2016) */}
        <div className="bg-white rounded-2xl border border-sand-200/80 p-8 sm:p-10 shadow-subtle space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-earth-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-forest-800" /> Academic Ecotourism Assessment (Nigatu, 2016)
            </span>
            <h3 className="text-2xl font-display font-bold text-charcoal-950">
              Community-Based Ecotourism Potential in Dida-Hara
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
              An academic study published in the <em>International Journal of Tourism &amp; Hospitality Reviews</em> (Nigatu, 2016) evaluated visitor demand and community readiness in the Dida-Hara conservation block:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-center">
              <p className="text-2xl font-display font-bold text-forest-900">&gt;90%</p>
              <p className="text-xs text-charcoal-700 mt-1">Visitor Wildlife Interest</p>
            </div>
            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-center">
              <p className="text-2xl font-display font-bold text-forest-900">86.5%</p>
              <p className="text-xs text-charcoal-700 mt-1">Destination Recommendation</p>
            </div>
            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-center">
              <p className="text-2xl font-display font-bold text-forest-900">97.8%</p>
              <p className="text-xs text-charcoal-700 mt-1">Identified as Ecotourists</p>
            </div>
            <div className="p-4 rounded-xl bg-sand-50 border border-sand-200 text-center">
              <p className="text-2xl font-display font-bold text-forest-900">37.2%</p>
              <p className="text-xs text-charcoal-700 mt-1">Local Livelihood Diversification</p>
            </div>
          </div>
        </div>

        {/* Research Portal CTA */}
        <div className="p-8 sm:p-12 rounded-2xl bg-forest-950 text-white border border-forest-800 shadow-luxury flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Academic Research Permits
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
