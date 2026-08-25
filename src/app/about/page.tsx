'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OfficialDownloads from '@/components/OfficialDownloads'
import OptimizedImage from '@/components/OptimizedImage'
import {
  Shield,
  Award,
  MapPin,
  Users,
  TreePine,
  Layers,
  Compass,
  ArrowRight,
  Sparkles,
  Mountain,
  CheckCircle2,
} from 'lucide-react'
import { PARK_INSTITUTIONAL_DATA, PARK_BLOCKS } from '@/data/park-data'
import { cldImage } from '@/lib/cloudinary'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src={cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_1600,h_900,c_fill,q_auto')}
            alt="About Borana National Park"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Institutional Profile & Regional Mandate
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            About Borana National Park
          </h1>
          <p className="text-sm md:text-base text-ivory-200/85 max-w-2xl mx-auto leading-relaxed font-light">
            {PARK_INSTITUTIONAL_DATA.oromoName} — Ethiopia&apos;s largest protected area complex, spanning 45,366 km² of volcanic landscapes, endemic wildlife, and living pastoral heritage.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Core Institutional Fact Sheet Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-sand-200/80 shadow-subtle text-center">
            <p className="text-2xl sm:text-3xl font-display font-bold text-forest-900">45,366 km²</p>
            <p className="text-xs text-charcoal-600 mt-1 uppercase font-semibold">Total Protected Area</p>
            <p className="text-[11px] text-charcoal-500 mt-0.5">Ethiopia&apos;s Largest</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sand-200/80 shadow-subtle text-center">
            <p className="text-2xl sm:text-3xl font-display font-bold text-forest-900">5 Blocks</p>
            <p className="text-xs text-charcoal-600 mt-1 uppercase font-semibold">Conservation Sectors</p>
            <p className="text-[11px] text-charcoal-500 mt-0.5">Dida-Hara to Sarite</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sand-200/80 shadow-subtle text-center">
            <p className="text-2xl sm:text-3xl font-display font-bold text-forest-900">280+ Birds</p>
            <p className="text-xs text-charcoal-600 mt-1 uppercase font-semibold">Avian Diversity</p>
            <p className="text-[11px] text-charcoal-500 mt-0.5">4 Range Endemics</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sand-200/80 shadow-subtle text-center">
            <p className="text-2xl sm:text-3xl font-display font-bold text-forest-900">327 Plants</p>
            <p className="text-xs text-charcoal-600 mt-1 uppercase font-semibold">Documented Flora</p>
            <p className="text-[11px] text-charcoal-500 mt-0.5">Dalle et al. 2005</p>
          </div>
        </div>

        {/* Mission & Statutory Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Statutory Framework & History</span>
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-950 leading-tight">
              A Living Biocultural Landscape in Southern Ethiopia
            </h2>
            <p className="text-base text-charcoal-800 leading-relaxed font-serif drop-cap">
              Borana National Park sits at the southern edge of the Ethiopian Highlands in the East African Rift influence zone, approximately 570 km south of Addis Ababa near the gateway town of Yabelo. It extends across the Borena Zone of the Oromia Region toward the Liben Zone, bordering Kenya to the south, Chelbi Wildlife Reserve to the west, and Geraille National Park to the east.
            </p>
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
              Originally established as a controlled hunting zone in <strong>1986</strong>, the ecosystem was formally redesigned, upgraded, and gazetted as a full <strong>National Park in 2017</strong> under joint stewardship of the <strong>Oromia Forest and Wildlife Enterprise (OFWE)</strong> and the <strong>Ethiopian Wildlife Conservation Authority (EWCA)</strong>.
            </p>

            <div className="bg-sand-50/80 p-5 rounded-xl border border-sand-200 text-xs text-charcoal-700 space-y-2">
              <p className="font-semibold text-charcoal-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-forest-800" /> Geographical Reference:
              </p>
              <p>
                <strong>Coordinates:</strong> 4.117°N, 38.567°E · <strong>Elevation:</strong> 1,000 m to 2,050 m ASL · <strong>Ecoregions:</strong> Somali Acacia–Commiphora bushlands &amp; Ethiopian montane forests (near Arero).
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card border border-sand-200 bg-forest-950">
              <OptimizedImage
                src={cldImage('668110576_1374606031380241_6681634558621259739_n', 'w_800,h_600,c_fill,q_auto')}
                alt="Protected Savanna Landscape"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* The Five Conservation Blocks */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Zoning & Architecture</span>
            </p>
            <h3 className="text-3xl font-display font-bold text-charcoal-950">
              The Five Conservation Blocks
            </h3>
            <p className="text-sm text-charcoal-700 font-light leading-relaxed">
              To balance biodiversity conservation with customary pastoralist rangeland agreements, Borana National Park is structured into five distinct ecological blocks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARK_BLOCKS.map((block) => (
              <div
                key={block.id}
                className="bg-white p-6 rounded-2xl border border-sand-200 shadow-subtle space-y-3 hover:border-gold-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-earth-700">
                      {block.oromoName}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-forest-50 text-forest-800 border border-forest-100">
                      Sector
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-xl text-charcoal-950">{block.name}</h4>
                  <p className="text-xs text-charcoal-700 leading-relaxed font-light">{block.character}</p>
                </div>

                <div className="pt-3 border-t border-sand-100 text-[11px] text-charcoal-600 space-y-1.5 font-light">
                  <p>
                    <strong className="font-medium text-charcoal-900">Key Flora:</strong> {block.dominantFlora}
                  </p>
                  <p>
                    <strong className="font-medium text-charcoal-900">Faunal Highlight:</strong> {block.keyFauna}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geological Origins & Booqee Sadeen */}
        <div className="bg-forest-950 text-white rounded-2xl p-8 sm:p-12 border border-forest-800 shadow-luxury space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 flex items-center gap-2">
              <Mountain className="w-4 h-4" /> Landscape &amp; Volcanology
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold">
              Ancient Volcanism &amp; The Maar Craters of Booqee Sadeen
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/85 leading-relaxed font-light">
              Underlain by Precambrian crystalline basement rock overlain by Tertiary volcanic flood basalts, the park’s terrain features gently undulating plains interrupted by volcanic inselbergs, rocky kopjes, and limestone karst sinkholes.
            </p>
            <p className="text-xs sm:text-sm text-ivory-200/85 leading-relaxed font-light">
              The park’s signature geological marvel is <strong>Booqee Sadeen</strong> (&quot;The Three Maar Crater Lakes&quot;), crowned by <strong>El Sod</strong> (<em>Booqee Sooddaa</em> / &quot;House of Salt&quot;)—a deep volcanic caldera holding a black subterranean saline lake where Borana miners have extracted therapeutic mineral salt for over six centuries.
            </p>
          </div>
        </div>

        {/* Official Insignia & Institutional Governance */}
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
            <h3 className="font-display text-2xl font-bold text-charcoal-950">The Institutional Seal</h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed">
              The national park insignia features the sacred Odaa sycamore tree of Gadaa assembly, the iconic horns of the Beisa oryx, and the golden sunrise over the southern Ethiopian rift escarpment, symbolizing democratic governance, wildlife protection, and ecological renewal.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[11px] font-semibold bg-ivory-100 text-charcoal-700 px-3 py-1 rounded-md border border-sand-200">
                OFWE Governed
              </span>
              <span className="text-[11px] font-semibold bg-ivory-100 text-charcoal-700 px-3 py-1 rounded-md border border-sand-200">
                EWCA Regulated
              </span>
              <span className="text-[11px] font-semibold bg-ivory-100 text-charcoal-700 px-3 py-1 rounded-md border border-sand-200">
                Oromia Regional State
              </span>
              <span className="text-[11px] font-semibold bg-ivory-100 text-charcoal-700 px-3 py-1 rounded-md border border-sand-200">
                UNESCO Biocultural Heritage
              </span>
            </div>
          </div>
        </div>

        {/* Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-100">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-charcoal-950">Biodiversity Stewardship</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed font-light">
              Active protection of endangered Grevy&apos;s zebra breeding corridors, endemic bird micro-climates, and predator monitoring through SMART telemetry.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-lg bg-gold-50 text-gold-800 flex items-center justify-center border border-gold-100">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-charcoal-950">Community Co-Management</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed font-light">
              Direct partnership with Gadaa councils, employing local pastoralists as certified wildlife scouts and upholding customary water covenants (<em>Seera Marraa Bisaanii</em>).
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-lg bg-earth-50 text-earth-800 flex items-center justify-center border border-earth-100">
              <TreePine className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-charcoal-950">Sustainable Ecotourism</h4>
            <p className="text-xs text-charcoal-700 leading-relaxed font-light">
              Implementing academic ecotourism recommendations (Dida-Hara framework) to diversify community livelihoods and reduce natural resource pressure.
            </p>
          </div>
        </div>

        {/* Downloads / Management Documents */}
        <OfficialDownloads />
      </main>

      <SiteFooter />
    </div>
  )
}
