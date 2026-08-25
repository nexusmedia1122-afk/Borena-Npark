import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HeroVideoSection from '@/components/HeroVideoSection'
import NewsletterForm from '@/components/NewsletterForm'
import SeasonalWildlifeMatrix from '@/components/SeasonalWildlifeMatrix'
import TrailCircuitExplorer from '@/components/TrailCircuitExplorer'
import HomeMapSection from '@/components/HomeMapSection'
import { Button, OptimizedImage, SectionHeading } from '@/components/ui/components'
import { CountUp } from '@/components/ui/CountUp'
import { cldImage, cldVideo } from '@/lib/cloudinary'
import FaqAccordion from '@/components/FaqAccordion'
import Link from 'next/link'
import {
  ArrowRight,
  Shield,
  Leaf,
  Users,
  MapPin,
  BookOpen,
  CheckCircle2,
  Mountain,
  Bird,
  PawPrint,
  Tent,
  Quote,
  CalendarDays,
  Route,
  Ticket,
  Backpack,
  Clock,
  Star,
  Compass,
  Sparkles,
  Moon,
  Droplets,
} from 'lucide-react'

/* ---- Cloudinary verified media assets ---- */
const MEDIA = {
  heroVideo: 'tiktok-v-7644618832073542932_0_53fe155d0d540963',
  heroPoster: '668110576_1374606031380241_6681634558621259739_n',
  welcome: '667817973_1374606124713565_3197675928973472449_n',
  wildlife: [
    '667404940_1374606078046903_3918001419654482747_n',
    '667812556_1374606328046878_2299729915640711788_n',
    '666963146_1374606204713557_5148189493277579201_n',
    '668120447_1374606164713561_8675150383045939896_n',
  ],
  landscape: '666892056_1374606258046885_5010924787227253853_n',
  culture: '782618326_122141256453053365_1096858521163718193_n',
  stories: [
    '782451195_122141256279053365_7936837558989253988_n',
    '782451195_122141256279053365_7936837558989253988_n_1',
    '784080423_122141256609053365_7618537852163299997_n',
  ],
  gallery: [
    '782170688_122141256729053365_672836120563678516_n',
    '782618326_122141256453053365_1096858521163718193_n',
    '783592801_122141256603053365_1923857396616899501_n',
    '780553747_122141256591053365_2969268618095047054_n',
  ],
}

const HERO_STATS = [
  { value: '1.2M+', label: 'Hectares Protected' },
  { value: '450+', label: 'Recorded Species' },
  { value: '320+', label: 'Avian Species' },
  { value: '500+ Yrs', label: 'Gadaa Stewardship' },
]

const PILLARS = [
  {
    icon: Leaf,
    title: 'Rare Biodiversity',
    desc: 'Endangered Grevy’s zebras, endemic bushcrows, Somali ostriches, and Beisa oryx in intact acacia savannas.',
    href: '/wildlife',
    badge: '450+ Species',
  },
  {
    icon: Users,
    title: 'Living Culture & Gadaa',
    desc: 'UNESCO-inscribed egalitarian democracy, the 9 ancient Tula Singing Wells, and customary water covenants.',
    href: '/culture',
    badge: 'UNESCO Heritage',
  },
  {
    icon: Shield,
    title: 'Active Conservation',
    desc: 'SMART telemetry tracking, community scout networks, and scientific habitat restoration across southern corridors.',
    href: '/conservation',
    badge: '120+ Scouts',
  },
  {
    icon: Compass,
    title: 'Guided Safaris',
    desc: 'Bespoke 4WD wildlife circuits, volcanic caldera rim hiking, endemic birding, and wilderness eco-camping.',
    href: '/experiences',
    badge: 'Expeditions',
  },
]

const WILDLIFE_HIGHLIGHTS = [
  {
    name: "Grevy's Zebra",
    scientific: 'Equus grevyi',
    slug: 'grevys-zebra',
    status: 'EN',
    statusLabel: 'Endangered',
    statusColor: 'bg-rose-50 text-rose-800 border-rose-200',
    habitat: 'Open Acacia Savanna & Plains',
    img: MEDIA.wildlife[2],
  },
  {
    name: 'Ethiopian Bushcrow',
    scientific: 'Zavattariornis stresemanni',
    slug: 'ethiopian-bushcrow',
    status: 'EN',
    statusLabel: 'Endangered',
    statusColor: 'bg-rose-50 text-rose-800 border-rose-200',
    habitat: 'Restricted 6,000 km² Borana Thermal Zone',
    img: MEDIA.wildlife[1],
  },
  {
    name: 'Beisa Oryx',
    scientific: 'Oryx beisa beisa',
    slug: 'beisa-oryx',
    status: 'EN',
    statusLabel: 'Endangered',
    statusColor: 'bg-rose-50 text-rose-800 border-rose-200',
    habitat: 'Arid Grasslands & Shrub Savanna',
    img: MEDIA.wildlife[0],
  },
  {
    name: 'African Lion',
    scientific: 'Panthera leo',
    slug: 'african-lion',
    status: 'VU',
    statusLabel: 'Vulnerable',
    statusColor: 'bg-amber-50 text-amber-900 border-amber-200',
    habitat: 'Acacia Scrub & Volcanic Kopjes',
    img: MEDIA.wildlife[3],
  },
]

const REGIONS = [
  {
    name: 'Dida Hara Central Savanna',
    desc: 'Vast golden plains teeming with plains game — the classic African safari heartland.',
    img: MEDIA.heroPoster,
  },
  {
    name: 'El Sod Volcanic Caldera',
    desc: 'A 600m deep ancient crater featuring a subterranean mineral salt lake and rim trails.',
    img: MEDIA.landscape,
  },
  {
    name: 'Magado Highland Crater Lake',
    desc: 'Lush afro-montane cloud forests harboring endemic turacos and pristine mountain waters.',
    img: MEDIA.welcome,
  },
  {
    name: 'Sarite Pastoral Conservancy',
    desc: 'Traditional rangelands where ancestral pastoral grazing harmony meets wildlife corridors.',
    img: MEDIA.culture,
  },
]

const STORIES = [
  {
    title: 'Biannual Grevy’s Zebra Ground Census: Population Resilience in Sarite',
    slug: 'grevys-zebra-census-sarite',
    category: 'Conservation Science',
    date: 'February 2026',
    author: 'EWCA Scientific Unit',
    excerpt: 'The latest collaborative wildlife count conducted by EWCA rangers and community scout networks reveals positive foaling rates across southern rangelands.',
    img: MEDIA.stories[0],
  },
  {
    title: 'The Living Legacy of the Tula Wells: Ancient Hydrological Engineering',
    slug: 'tula-singing-wells-gadaa-heritage',
    category: 'Cultural Heritage',
    date: 'January 2026',
    author: 'Borena Cultural Trust',
    excerpt: 'Subterranean Singing Wells sustain life and customary Gadaa water covenants through rhythmic collective chanting in 30-meter stone shafts.',
    img: MEDIA.stories[1],
  },
  {
    title: 'SMART Outposts & Community Scouts: Southern Corridors Telemetry',
    slug: 'smart-outposts-community-rangers',
    category: 'Field Operations',
    date: 'December 2025',
    author: 'Senior Warden Team',
    excerpt: 'How solar-powered perimeter networks and local scout teams protect cross-border elephant and oryx movements with GPS telemetry.',
    img: MEDIA.stories[2],
  },
]

const ESSENTIALS = [
  {
    icon: CalendarDays,
    title: 'Optimal Seasons',
    desc: 'The dry season (October to March) offers prime game viewing around waterholes. The green season (June to September) transforms the savanna into a lush haven with peak birding.',
  },
  {
    icon: Route,
    title: 'Highway & Flight Access',
    desc: 'Located ~750 km south of Addis Ababa via a scenic asphalted highway through Hawassa and Yabelo. Charter flights operate to the nearby Yabelo airstrip.',
  },
  {
    icon: Ticket,
    title: 'Visitor Permits & Scouts',
    desc: 'Entry permits are arranged seamlessly at headquarters or online in advance. Every walking or trekking circuit is accompanied by an authorized EWCA ranger scout.',
  },
  {
    icon: Backpack,
    title: 'Essential Safari Gear',
    desc: 'Sturdy hiking boots, neutral khaki apparel, binoculars (8x42), wide-brim sun hat, a warm fleece for cool highland dawns, and a refillable water canteen.',
  },
]

const REVIEWS = [
  {
    quote: 'Descending into El Sod crater at sunrise accompanied by our ranger scout was one of the most sublime wilderness moments of my life. Seeing Grevy’s zebras across the open savanna is unforgettable.',
    name: 'Dr. Alistair Campbell',
    origin: 'Edinburgh, UK',
    role: 'Conservation Biologist',
  },
  {
    quote: 'The singing wells at Dubuluk are deeply moving. The harmony of human pastoral democracy and raw wildlife conservation here is something the rest of the world must learn from.',
    name: 'Elena Rossi',
    origin: 'Milan, Italy',
    role: 'Documentary Photographer',
  },
  {
    quote: 'Flawlessly organized guided safaris, welcoming ranger scouts, and star-filled night skies with zero light pollution. A true hidden jewel of East Africa.',
    name: 'Dawit Bekele',
    origin: 'Addis Ababa, Ethiopia',
    role: 'Expedition Leader',
  },
]

const FAQ_ITEMS = [
  {
    question: 'How do I arrange park entry and guided safari permits?',
    answer: 'Entry permits, scout bookings, and vehicle access can be reserved online through our Plan Your Visit portal or directly at the Yabelo Park Headquarters upon arrival. Advance booking is recommended for multi-day trekking and eco-camping.',
  },
  {
    question: 'Is a 4WD vehicle required for traversing the park?',
    answer: 'Yes, a high-clearance 4WD vehicle is essential for navigating interior savanna tracks, volcanic caldera rim lookouts, and wildlife observation corridors.',
  },
  {
    question: 'Are guided safaris and walking routes safe?',
    answer: 'All walking safaris and wilderness treks are led by experienced, certified EWCA rangers who possess deep knowledge of animal behavior, terrain, and first aid protocols.',
  },
  {
    question: 'What accommodation options are available in and around Borena?',
    answer: 'Visitors can stay at quality lodges in Yabelo town (5–10 minutes from park headquarters) or experience designated eco-campsites inside the park beneath the savanna stars with full ranger accompaniment.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 font-sans selection:bg-gold-500 selection:text-charcoal-950">
      <SiteHeader />

      {/* ===== 1. Cinematic Hero Section ===== */}
      <HeroVideoSection
        eyebrow="Southern Ethiopia · Great Rift Valley"
        title="Where Ethiopia's Wild Heart Comes Alive"
        subtitle="Preserving over 1.2 million hectares of acacia savannas, volcanic explosion calderas, and five centuries of living Gadaa democratic heritage."
        primaryCta={{ label: 'Plan Your Visit', href: '/contact' }}
        secondaryCta={{ label: 'Explore Wildlife', href: '/wildlife' }}
        posterSrc={cldImage(MEDIA.heroPoster, 'c_fill,w_1200,h_800')}
        videoSrc={cldVideo(MEDIA.heroVideo)}
        stats={HERO_STATS}
      />

      {/* ===== 2. Institutional Introduction & Living Landscape ===== */}
      <section id="welcome" className="scroll-mt-20 py-24 sm:py-32 bg-ivory-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            {/* Left Narrative Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                eyebrow="Official Sanctuary Mandate"
                title="A Five-Century Covenant Between Humanity & Wild Nature"
                subtitle="Borana National Park protects one of the most critical semi-arid ecosystems in the Horn of Africa — a landscape where ancient pastoral democracy and modern conservation unite."
              />

              <p className="text-base text-charcoal-700 leading-relaxed font-serif drop-cap">
                Spanning the transition between the Ethiopian highlands and the vast southern acacia savannas, Borana National Park is an ecological haven for globally threatened wildlife. Here, endangered Grevy’s zebras roam side-by-side with plains zebras, Somali ostriches, Beisa oryx, and elusive carnivores.
              </p>

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
                What distinguishes Borana on the world stage is its living human heritage. For over five hundred years, the Borana Oromo people have managed these pastures and subterranean <em>Tula</em> wells under the UNESCO-inscribed <strong>Gadaa democratic system</strong> — enforcing customary laws (*Seera Marraa fi Bishaan*) that guarantee universal water and grazing rights for both livestock and wildlife.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button href="/about" variant="secondary" size="md">
                  <span>About Our Mandate</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button href="/conservation" variant="outline" size="md">
                  <span>Conservation Report</span>
                </Button>
              </div>
            </div>

            {/* Right Visual Column (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury border border-sand-200/80 bg-forest-950">
                <OptimizedImage
                  src={cldImage(MEDIA.welcome, 'c_fill,w_800,h_1000')}
                  alt="Borana acacia rangeland landscape at dawn"
                  width={600}
                  height={750}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
              </div>

              {/* Floating Institutional Badge */}
              <div className="absolute -bottom-6 left-6 right-6 sm:left-8 sm:right-auto flex items-center gap-4 rounded-xl bg-white p-4 shadow-card border border-sand-200">
                <div className="w-11 h-11 rounded-lg bg-forest-50 border border-forest-100 flex items-center justify-center shrink-0 text-forest-800">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-display text-base font-bold leading-tight text-charcoal-950">120+ Certified Rangers</p>
                  <p className="text-xs text-charcoal-600">Safeguarding wildlife 24/7 with SMART telemetry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. Four Core Pillars of Impact ===== */}
      <section className="py-24 bg-white border-y border-sand-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            centered
            eyebrow="Institutional Foundations"
            title="Four Pillars of the Borana Landscape"
            subtitle="Four interconnected foundations guide our stewardship of southern Ethiopia’s premier conservation frontier."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group flex flex-col justify-between p-7 rounded-2xl bg-ivory-50 border border-sand-200/80 hover:border-gold-500/60 hover:shadow-card transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center shadow-subtle group-hover:scale-105 transition-transform">
                      <pillar.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-800 border border-forest-200/60">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-charcoal-950 group-hover:text-forest-800 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-charcoal-700 font-light">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-sand-200/60 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-850 group-hover:text-gold-700">
                  <span>Explore Details</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Iconic Biodiversity Archive ===== */}
      <section className="py-24 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Biodiversity Sanctuary"
              title="Flagship & Range-Restricted Wildlife"
              subtitle="Home to over 450 recorded animal species and 320+ birds, including globally threatened endemics found nowhere else on Earth."
            />
            <Button href="/wildlife" variant="outline" size="md">
              <span>View All 10+ Species Dossiers</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WILDLIFE_HIGHLIGHTS.map((animal) => (
              <Link
                key={animal.slug}
                href={`/wildlife/${animal.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-sand-200 shadow-subtle hover:shadow-luxury hover:border-gold-500/50 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-sand-200">
                  <OptimizedImage
                    src={cldImage(animal.img, 'c_fill,w_700,h_875')}
                    alt={animal.name}
                    width={500}
                    height={625}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-transparent to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Status Chip */}
                  <span className={`absolute top-3.5 left-3.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase border shadow-sm ${animal.statusColor}`}>
                    {animal.statusLabel}
                  </span>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-0.5">
                    <p className="text-[11px] font-serif italic text-gold-300/90">{animal.scientific}</p>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-200 transition-colors">
                      {animal.name}
                    </h3>
                    <p className="text-xs text-ivory-200/80 line-clamp-1 font-light">
                      {animal.habitat}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. Seasonal Wildlife Matrix & Climate Index ===== */}
      <section className="py-20 bg-sand-100/50 border-y border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SeasonalWildlifeMatrix />
        </div>
      </section>

      {/* ===== 6. Signature Safari Circuits & Trekking Trails ===== */}
      <section className="py-24 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrailCircuitExplorer />
        </div>
      </section>

      {/* ===== 7. Landscape & Volcanic Geological Diversity ===== */}
      <section className="py-24 bg-white border-y border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            centered
            eyebrow="Topography & Geological Wonders"
            title="Explore Borana by Landscape"
            subtitle="From golden acacia plains to 600m deep volcanic salt craters and lush mountain cloud forests — four distinct ecosystems within one contiguous reserve."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((region) => (
              <Link
                key={region.name}
                href="/map"
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-sand-200/80 shadow-subtle hover:shadow-luxury transition-all"
              >
                <OptimizedImage
                  src={cldImage(region.img, 'c_fill,w_700,h_875')}
                  alt={region.name}
                  width={500}
                  height={625}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest-luxury text-gold-400">Landmark Zone</span>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                    {region.name}
                  </h3>
                  <p className="text-xs text-ivory-200/85 leading-relaxed line-clamp-2 font-light">
                    {region.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Interactive Topographic GIS & Landmark Map Explorer ===== */}
      <HomeMapSection />

      {/* ===== 8. Living Cultural Heritage & Indigenous Astronomy ===== */}
      <section className="py-24 bg-sand-100/60 border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-luxury bg-sand-200 border border-sand-200">
                <OptimizedImage
                  src={cldImage(MEDIA.culture, 'c_fill,w_1000,h_750')}
                  alt="Borena traditional Gadaa council elders assembly"
                  width={800}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 right-6 bg-forest-950 text-white p-4 rounded-xl shadow-card border border-gold-500/30 text-xs">
                <p className="text-gold-400 font-bold uppercase tracking-wider text-[9px]">UNESCO Inscription</p>
                <p className="font-display font-semibold text-sm">Gadaa Democratic System</p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <SectionHeading
                eyebrow="Living Heritage"
                title="Ancient Gadaa Governance & The Singing Wells"
                subtitle="The Borana Oromo have inhabited these rangelands for centuries, stewarding water and pastures through an unwritten egalitarian constitution."
              />

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
                At the legendary <em>Tula</em> Singing Wells (such as Dubuluk and Web), human chains form inside 30-meter deep stone shafts, rhythmically passing leather buckets while singing polyphonic chants (*Weellu*) to water livestock and nourish nocturnal wildlife.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/culture"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-forest-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-850 transition-all shadow-subtle"
                >
                  <Droplets className="w-3.5 h-3.5 text-gold-400" />
                  <span>Singing Wells Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/astronomy"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-sand-200 text-charcoal-800 font-bold text-xs uppercase tracking-wider hover:border-gold-500 transition-all shadow-subtle"
                >
                  <Moon className="w-3.5 h-3.5 text-gold-600" />
                  <span>Indigenous Astronomy (Dhaha)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. Conservation & Impact Numbers (Dark Institutional) ===== */}
      <section className="py-28 bg-forest-950 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                light
                eyebrow="Conservation Impact"
                title="Protecting Ethiopia's Wild Savanna Future"
                subtitle="Through SMART spatial GPS telemetry, solar-powered outposts, community scout networks, and invasive bush clearance, we ensure the Borana ecosystem thrives for generations."
              />

              <div className="pt-2 flex flex-wrap gap-4">
                <Button href="/conservation" variant="primary" size="md">
                  Conservation Report
                </Button>
                <Button href="/contact" variant="hero-outline" size="md">
                  Research Accreditation
                </Button>
              </div>
            </div>

            {/* Impact Counters */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-forest-800 bg-forest-900/60 p-6 text-center backdrop-blur-sm">
                <p className="font-display text-3xl sm:text-4xl font-bold text-gold-300">
                  <CountUp end={120} suffix="+" />
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-ivory-200/70 font-semibold">Active Rangers</p>
              </div>
              <div className="rounded-2xl border border-forest-800 bg-forest-900/60 p-6 text-center backdrop-blur-sm">
                <p className="font-display text-3xl sm:text-4xl font-bold text-gold-300">
                  <CountUp end={8500} suffix=" ha" />
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-ivory-200/70 font-semibold">Restored Savanna</p>
              </div>
              <div className="rounded-2xl border border-forest-800 bg-forest-900/60 p-6 text-center backdrop-blur-sm">
                <p className="font-display text-3xl sm:text-4xl font-bold text-gold-300">
                  <CountUp end={340} suffix="" />
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-ivory-200/70 font-semibold">Monthly Patrols</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. Editorial Pull Quote ===== */}
      <section className="py-20 bg-ivory-50 border-b border-sand-200">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Quote className="mx-auto mb-5 h-9 w-9 text-gold-500 opacity-60" aria-hidden="true" />
          <blockquote className="font-display text-2xl sm:text-3xl font-medium italic leading-relaxed text-charcoal-950 text-balance">
            “The land does not belong to us — we belong to the land. Our sacred covenant is to keep its wildlife whole and its waters flowing for those who walk after us.”
          </blockquote>
          <figcaption className="mt-5 text-xs font-bold uppercase tracking-widest-luxury text-earth-700">
            — Borana Council Elder, Traditional Assembly at Gumii Gaayyo
          </figcaption>
        </div>
      </section>

      {/* ===== 11. Plan Your Visit Essentials ===== */}
      <section id="plan" className="py-24 bg-white border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Safari Planning Guide"
            title="Know Before You Go"
            subtitle="Essential practical guidelines to ensure a smooth, safe, and exhilarating journey to Borana National Park."
          />

          <dl className="mt-14 grid gap-6 md:grid-cols-2">
            {ESSENTIALS.map((item) => (
              <div key={item.title} className="flex gap-5 p-6 rounded-2xl bg-ivory-50 border border-sand-200/80">
                <item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-gold-600 mt-1" />
                <div className="space-y-1">
                  <dt className="font-display text-lg font-bold text-charcoal-950">{item.title}</dt>
                  <dd className="text-xs sm:text-sm leading-relaxed text-charcoal-700 font-light">{item.desc}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="md">
              <span>Permit Calculator & Inquiries</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button href="/map" variant="outline" size="md">
              <span>Interactive Park GIS Map</span>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== 12. Field Stories & Research Reports ===== */}
      <section className="py-24 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Field Journal"
              title="Dispatches from the Savanna"
              subtitle="Quarterly research chronicles, community wildlife tracking, and conservation dispatches directly from our ranger stations."
            />
            <Button href="/stories" variant="outline" size="md">
              <span>All Field Stories</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {STORIES.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-subtle hover:shadow-luxury hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-sand-200">
                  <OptimizedImage
                    src={cldImage(story.img, 'c_fill,w_800,h_500')}
                    alt={story.title}
                    width={600}
                    height={375}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-charcoal-600 mb-2">
                      <span className="font-bold uppercase tracking-wider text-earth-700">{story.category}</span>
                      <span>{story.date}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-charcoal-950 group-hover:text-forest-800 transition-colors leading-snug">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-charcoal-700 line-clamp-3 font-light">
                      {story.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold-700 pt-3 border-t border-sand-100 group-hover:text-gold-850">
                    Read Full Dispatch →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. Curated Photo Gallery Lightbox Preview ===== */}
      <section className="py-24 bg-white border-y border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            centered
            eyebrow="Media Archive"
            title="Through the Lens"
            subtitle="Capturing wildlife encounters, geological calderas, and living cultural traditions across Borana."
          />

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MEDIA.gallery.map((publicId, idx) => (
              <Link
                key={idx}
                href="/gallery"
                className="group relative aspect-square overflow-hidden rounded-2xl bg-sand-200 shadow-subtle hover:shadow-luxury transition-all"
              >
                <OptimizedImage
                  src={cldImage(publicId, 'c_fill,w_600,h_600')}
                  alt={`Borena gallery frame ${idx + 1}`}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-lg bg-white/95 text-charcoal-950 text-xs font-bold uppercase tracking-wider shadow-sm">
                    View Photo
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/gallery" variant="outline" size="md">
              <span>Browse Full Photo Archive</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== 14. Traveler & Researcher Perspectives ===== */}
      <section className="py-24 bg-ivory-50 border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Visitor Insights"
            title="What Travelers & Scientists Report"
            subtitle="Perspectives from field researchers, conservationists, and international safari visitors."
          />

          <div className="mt-14 grid divide-y divide-sand-200 border-y border-sand-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {REVIEWS.map((review) => (
              <figure key={review.name} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0 space-y-4">
                <div className="flex gap-1" aria-label="Rated 5 out of 5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="font-display text-base italic leading-relaxed text-charcoal-950">
                  “{review.quote}”
                </blockquote>
                <figcaption className="text-xs pt-3 border-t border-sand-200/60">
                  <span className="font-bold text-charcoal-950 block">{review.name}</span>
                  <span className="text-charcoal-600 font-light">{review.role} · {review.origin}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 15. Responsible Tourism Ethics & FAQ ===== */}
      <section className="py-24 bg-white border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            centered
            eyebrow="Frequently Asked Questions"
            title="Good to Know Before Your Visit"
            subtitle="Practical answers regarding entry permits, safety, 4WD vehicles, and accommodations."
          />
          <div className="mt-12">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* ===== 16. Field Notes Newsletter ===== */}
      <section className="py-24 bg-ivory-50 border-b border-sand-200">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <BookOpen className="mx-auto mb-4 h-8 w-8 text-gold-600" aria-hidden="true" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-950 tracking-tight">
            Field Notes & Seasonal Dispatches
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-charcoal-700 leading-relaxed font-light">
            Quarterly scientific journals, wildlife migration updates, and seasonal travel advisories directly from our ranger stations.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ===== 17. Final Majestic Dawn CTA Banner ===== */}
      <section className="relative overflow-hidden py-32 bg-forest-950">
        <OptimizedImage
          src={cldImage(MEDIA.heroPoster, 'c_fill,w_1200,h_800')}
          alt=""
          width={1200}
          height={800}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <p className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider-editorial text-gold-400">
              <span className="inline-block h-px w-5 bg-gold-400" />
              <span>Your Safari Awaits</span>
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-white text-balance">
              The Savanna Is Most Alive at Dawn
            </h2>
            <p className="text-base sm:text-lg text-ivory-200/85 leading-relaxed font-light">
              Whether planning a guided 4WD wildlife safari, a descent into El Sod’s volcanic salt caldera, or an academic research expedition — our visitor coordination team is ready to assist.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button href="/contact" size="lg" variant="primary">
                Book Safari Inquiries
              </Button>
              <Button href="/map" size="lg" variant="hero-outline">
                Explore Park Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
