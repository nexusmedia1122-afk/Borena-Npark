import type { Metadata } from 'next'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import BoranaAstronomyExplorer from '@/components/BoranaAstronomyExplorer'
import { Button, OptimizedImage } from '@/components/ui/components'
import {
  Sparkles,
  Camera,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Indigenous Astronomy & The Borana Calendar · Dhaha Boranaa',
  description:
    'Explore the 2,300-year-old lunar-stellar astronomical system of the Borana Oromo. Learn how the 7 anchor constellations and 27 Ayyaana days govern southern Ethiopian rangeland ecology and the Gadaa system.',
}

const ASTRO_HOTSPOTS = [
  {
    name: 'El Sod Volcanic Caldera Rim',
    elevation: '1,980m ASL',
    bortleClass: 'Class 1 (Pristine Dark Sky)',
    desc: 'Zero ambient light pollution looking into the deep volcanic crater basin; phenomenal views of the Milky Way core and the southern cross.',
  },
  {
    name: 'Mega Mountain Granite Ridge',
    elevation: '2,200m ASL',
    bortleClass: 'Class 1 (Pristine Dark Sky)',
    desc: 'High-altitude panoramic vantage point ideal for observing the seven anchor constellations (Camsa, Bufa, Waxabajjii) in clear mountain air.',
  },
  {
    name: 'Dida Hara Open Savanna Plains',
    elevation: '1,450m ASL',
    bortleClass: 'Class 2 (Truly Dark Night Sky)',
    desc: 'Vast 360-degree flat horizons where ancient Borana Ayyaantuu charted the rising azimuths of the stars over acacia silhouettes.',
  },
]

export default function AstronomyPage() {
  return (
    <div className="min-h-screen bg-forest-950 text-white font-sans selection:bg-gold-500 selection:text-charcoal-950">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-forest-800/80">
        <div className="absolute inset-0 opacity-25">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=75"
            alt="Starlit African night sky over acacia savanna"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/95 to-forest-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest-luxury text-gold-400 bg-gold-950/70 px-4 py-1.5 rounded-full border border-gold-500/30">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>African Indigenous Science & UNESCO Heritage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight max-w-4xl">
            Where the Sky Guides the Land: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500">
              The Borana Lunar-Stellar Calendar
            </span>
          </h1>

          <p className="text-base sm:text-lg text-ivory-200/80 max-w-3xl leading-relaxed font-light">
            Dating back over 2,300 years, the Borana time-reckoning system (*Dhaha Boranaa*) represents one of humanity’s most brilliant indigenous astronomical frameworks. Developed along the equator, it aligns the moon with seven anchor constellations to govern pasture regeneration, deep well management, and the Gadaa democratic lifecycle.
          </p>
        </div>
      </section>

      {/* Main Interactive Observatory */}
      <section className="py-20 bg-forest-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BoranaAstronomyExplorer />
        </div>
      </section>

      {/* Dark Sky Safari & Astrophotography Guide */}
      <section className="py-24 bg-forest-900/60 border-y border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Camera className="w-4 h-4 text-gold-400" />
              <span>Astrotourism & Night Sky Safaris</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
              Pristine Dark Sky Observatories in Borana
            </h2>
            <p className="text-sm sm:text-base text-ivory-200/80 font-light leading-relaxed">
              With virtually zero artificial light pollution, high-altitude arid air, and near-equatorial latitude, Borana National Park offers world-class stargazing and celestial photography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ASTRO_HOTSPOTS.map((spot) => (
              <div
                key={spot.name}
                className="p-6 rounded-2xl bg-forest-950 border border-forest-800 space-y-3.5 hover:border-gold-500/40 transition-all shadow-subtle"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-gold-400">{spot.elevation}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {spot.bortleClass}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white">{spot.name}</h3>
                <p className="text-xs text-ivory-200/80 leading-relaxed font-light">{spot.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-forest-950 border border-gold-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-luxury">
            <div className="space-y-1 max-w-xl">
              <h4 className="font-display font-bold text-lg text-white">
                Experience a Guided Night Sky & Safari Expedition
              </h4>
              <p className="text-xs text-ivory-200/80 font-light">
                Accompanied by EWCA ranger guides and traditional Borana cultural elders, experience the constellations beneath the southern Ethiopian savanna skies.
              </p>
            </div>
            <Button href="/contact" variant="primary" size="lg" className="shrink-0">
              Inquire About Dark Sky Safari
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
