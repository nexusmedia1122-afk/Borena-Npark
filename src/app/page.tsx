import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HeroVideoSection from '@/components/HeroVideoSection'
import NewsletterForm from '@/components/NewsletterForm'
import SeasonalWildlifeMatrix from '@/components/SeasonalWildlifeMatrix'
import TrailCircuitExplorer from '@/components/TrailCircuitExplorer'
import { Button, OptimizedImage } from '@/components/ui/components'
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
  Sun,
  CloudRain,
  Sprout,
  Compass,
  Sparkles,
} from 'lucide-react'

/* ---- Cloudinary media library (verified public IDs) ---- */
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
  experiences: [
    '784080426_122141256597053365_7431476180305400811_n',
    '780553747_122141256591053365_2969268618095047054_n',
    '783592801_122141256603053365_1923857396616899501_n',
  ],
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
  { value: '450+', label: 'Wildlife Species' },
  { value: '320+', label: 'Avian Species' },
  { value: '100%', label: 'Community Stewardship' },
]

const PILLARS = [
  {
    icon: Leaf,
    title: 'Rare Wildlife',
    desc: 'Endangered Grevy’s zebras, Somali ostriches, Beisa oryx, and elusive carnivores in pristine savanna habitats.',
    href: '/wildlife',
    color: 'text-forest-700 bg-forest-100',
  },
  {
    icon: Users,
    title: 'Living Culture',
    desc: 'UNESCO-inscribed Gadaa democracy, ancient Singing Wells, and customary pasture covenants.',
    href: '/culture',
    color: 'text-earth-700 bg-earth-100',
  },
  {
    icon: Shield,
    title: 'Active Conservation',
    desc: 'Community-led ranger patrols, satellite telemetry monitoring, and savanna habitat restoration.',
    href: '/conservation',
    color: 'text-forest-700 bg-forest-100',
  },
  {
    icon: Compass,
    title: 'Guided Safaris',
    desc: 'Bespoke 4WD game drives, volcanic caldera treks, birding expeditions, and wilderness camping.',
    href: '/experiences',
    color: 'text-gold-700 bg-gold-100',
  },
]

const WILDLIFE_HIGHLIGHTS = [
  {
    name: 'African Elephant',
    slug: 'african-elephant',
    status: 'EN',
    statusLabel: 'Endangered',
    statusColor: 'bg-rose-100 text-rose-800 border-rose-200',
    habitat: 'Riverine Woodlands & Forest Galleries',
    img: MEDIA.wildlife[0],
  },
  {
    name: 'Ethiopian Wolf',
    slug: 'ethiopian-wolf',
    status: 'CR',
    statusLabel: 'Critically Endangered',
    statusColor: 'bg-rose-100 text-rose-800 border-rose-200',
    habitat: 'Highland Montane Grasslands',
    img: MEDIA.wildlife[1],
  },
  {
    name: "Grevy's Zebra",
    slug: 'grevys-zebra',
    status: 'EN',
    statusLabel: 'Endangered',
    statusColor: 'bg-rose-100 text-rose-800 border-rose-200',
    habitat: 'Open Acacia Savanna & Plains',
    img: MEDIA.wildlife[2],
  },
  {
    name: 'African Lion',
    slug: 'african-lion',
    status: 'VU',
    statusLabel: 'Vulnerable',
    statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
    habitat: 'Acacia Scrub & Kopjes',
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
    desc: 'A 600m deep ancient crater featuring a subterranean mineral salt lake and dramatic rim trails.',
    img: MEDIA.landscape,
  },
  {
    name: 'Magado Highland Crater Lake',
    desc: 'Lush afro-montane cloud forests harboring endemic turacos, colobus monkeys, and pristine waters.',
    img: MEDIA.welcome,
  },
  {
    name: 'Sarite Pastoral Conservancy',
    desc: 'Traditional rangelands where ancestral pastoral grazing harmony meets wildlife conservation.',
    img: MEDIA.culture,
  },
]

const STORIES = [
  {
    title: 'Biannual Grevy’s Zebra Ground Census',
    slug: 'grevys-zebra-census-sarite',
    category: 'Conservation Science',
    date: 'February 2026',
    author: 'EWCA Scientific Unit',
    excerpt: 'The latest collaborative wildlife count conducted by EWCA rangers and community scout networks reveals positive recruitment rates across the Sarite rangelands.',
    img: MEDIA.stories[0],
  },
  {
    title: 'The Living Legacy of the Tula Wells',
    slug: 'tula-singing-wells-gadaa-heritage',
    category: 'Cultural Heritage',
    date: 'January 2026',
    author: 'Borena Cultural Trust',
    excerpt: 'Ancient subterranean Singing Wells sustain life and customary Gadaa water covenants through rhythmic collective chanting in deep stone shafts.',
    img: MEDIA.stories[1],
  },
  {
    title: 'Smart Outposts & Community Rangers',
    slug: 'smart-outposts-community-rangers',
    category: 'Field Operations',
    date: 'December 2025',
    author: 'Senior Warden Team',
    excerpt: 'How solar-powered perimeter networks and local scout teams protect southern corridors with satellite-linked telemetry.',
    img: MEDIA.stories[2],
  },
]

const ESSENTIALS = [
  {
    icon: CalendarDays,
    title: 'Optimal Seasons',
    desc: 'The dry season (October to March) offers exceptional game viewing as herds concentrate near waterholes. The green season (June to September) transforms the savanna into a lush wildflower haven with peak birding.',
  },
  {
    icon: Route,
    title: 'Getting to Borena',
    desc: 'Located ~750 km south of Addis Ababa via a fully asphalted scenic highway through Hawassa and Yabelo. Charter flights operate regularly to the nearby Yabelo airstrip.',
  },
  {
    icon: Ticket,
    title: 'Visitor Permits & Scouts',
    desc: 'Entry permits are arranged seamlessly at headquarters or online in advance. Every walking or trekking experience is accompanied by a certified EWCA ranger scout.',
  },
  {
    icon: Backpack,
    title: 'Essential Safari Gear',
    desc: 'Sturdy hiking shoes, neutral khaki clothing, binoculars (8x42), wide-brim sun protection, a warm fleece for cool highland dawns, and a refillable water canteen.',
  },
]

const REVIEWS = [
  {
    quote: 'Descending into El Sod crater at sunrise accompanied by our ranger was one of the most sublime wilderness moments of my life. Seeing Grevy’s zebras across the open savanna is unforgettable.',
    name: 'Dr. Alistair Campbell',
    origin: 'Edinburgh, UK',
    role: 'Conservation Biologist',
  },
  {
    quote: 'The singing wells at Dubuluk are deeply moving. The harmony of human culture and raw wildlife conservation here is something the rest of the world needs to learn from.',
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

const GOLDEN_RULES = [
  'Maintain respectful observation distances — never crowd or harass wildlife',
  'Always stay on established 4WD tracks and designated walking trails',
  'Carry out all waste — leave zero environmental footprint behind',
  'Always seek respectful permission before photographing community elders',
  'Campfires are permitted only in designated eco-campsites with ranger supervision',
  'Follow the directives and safety guidance of your assigned EWCA ranger at all times',
]

const FAQ_ITEMS = [
  {
    question: 'How do I arrange park entry and guided safari permits?',
    answer: 'Entry permits, scout bookings, and vehicle access can be reserved online through our Plan Your Visit portal or directly at the Yabelo Park Visitor Complex upon arrival. Advance booking is recommended for multi-day trekking and eco-camping.',
  },
  {
    question: 'Is a 4WD vehicle required for traversing the park?',
    answer: 'Yes, a high-clearance 4WD vehicle is essential for navigating interior savanna tracks, crater rim lookouts, and wildlife observation corridors.',
  },
  {
    question: 'Are guided safaris and walking routes safe?',
    answer: 'All walking safaris and wilderness treks are led by experienced, armed EWCA rangers who possess deep knowledge of animal behavior, terrain, and first aid protocols.',
  },
  {
    question: 'What accommodation options are available in and around Borena?',
    answer: 'Visitors can stay at quality lodges in Yabelo town (5–10 minutes from park headquarters) or experience designated eco-campsites inside the park beneath the savanna stars with full ranger accompaniment.',
  },
]

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider-editorial ${light ? 'text-gold-400' : 'text-earth-700'}`}>
      <span aria-hidden="true" className={`inline-block h-px w-6 ${light ? 'bg-gold-400' : 'bg-gold-600'}`} />
      {children}
    </p>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ivory-50 text-charcoal-900 font-sans selection:bg-gold-500 selection:text-charcoal-900">
      <SiteHeader />

      {/* ===== Hero Video Section ===== */}
      <HeroVideoSection
        eyebrow="Southern Ethiopia · Great Rift Valley"
        title="Where Ethiopia's Wild Heart Comes Alive"
        subtitle="Vast acacia savannas, ancient volcanic calderas, and living Gadaa heritage — experience one of East Africa's most extraordinary conservation frontiers."
        primaryCta={{ label: 'Plan Your Safari', href: '/contact' }}
        secondaryCta={{ label: 'Explore Wildlife', href: '/wildlife' }}
        posterSrc={cldImage(MEDIA.heroPoster)}
        videoSrc={cldVideo(MEDIA.heroVideo)}
        stats={HERO_STATS}
      />

      {/* ===== Welcome / Living Landscape Narrative ===== */}
      <section id="welcome" className="scroll-mt-20 py-24 sm:py-32 bg-ivory-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow>Welcome to Borena</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-charcoal-950 text-balance">
                A Vast Sanctuary Guarded by Nature and Tradition
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-charcoal-700">
                Stretching across more than 1.2 million hectares of sun-warmed savannas, afro-montane forests, and volcanic calderas, Borena National Park protects one of the Horn of Africa’s most vital biodiversity corridors.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-charcoal-700">
                Here, wildlife conservation is deeply intertwined with ancient Borana pastoral traditions. From dawn game drives trailing endangered Grevy’s zebras to the rhythmic morning chants of the Tula Singing Wells, every visit directly empowers local rangers, researchers, and community guardians.
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-sand-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-charcoal-900">Community Scout Patrols</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-charcoal-900">Habitat Restoration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-charcoal-900">Low-Impact Ecotourism</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button href="/about" variant="primary">Our Story & Mandate</Button>
                <Button href="/experiences" variant="secondary">Safari Itineraries</Button>
              </div>
            </div>

            {/* Asymmetric Photography Frame */}
            <div className="lg:col-span-5 relative">
              <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold-500/30" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-luxury bg-sand-200">
                <OptimizedImage
                  src={cldImage(MEDIA.welcome, 'c_fill,w_1000,h_1250')}
                  alt="Rangers on morning patrol across the Borana savanna"
                  width={800}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
              </div>

              {/* Floating Ranger Badge */}
              <div className="absolute -bottom-6 left-6 right-6 sm:left-10 sm:right-auto flex items-center gap-4 rounded-2xl bg-white p-5 shadow-luxury border border-sand-200/90">
                <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center shrink-0 text-gold-700">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold leading-none text-charcoal-900">120+ Active Rangers</p>
                  <p className="mt-1 text-xs text-charcoal-600">Patrolling & safeguarding wildlife 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4 Pillars of the Borena Experience ===== */}
      <section className="py-24 bg-white border-y border-sand-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <Eyebrow>Four Pillars</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              More Than Just a National Park
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-700 leading-relaxed">
              Four interconnected foundations define the Borena landscape — where wildlife, ancient human democracy, and modern conservation unite.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <Link key={pillar.title} href={pillar.href} className="group flex flex-col justify-between p-8 rounded-3xl bg-ivory-50 border border-sand-200/80 hover:border-gold-500/50 hover:shadow-luxury transition-all duration-300">
                <div>
                  <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${pillar.color} shadow-sm`}>
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal-900 group-hover:text-forest-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-700">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-sand-200/60 flex items-center text-xs font-bold uppercase tracking-wider text-gold-600 group-hover:text-gold-700">
                  <span>Explore Details</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Iconic Wildlife Highlights ===== */}
      <section className="py-24 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Biodiversity Archive</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                Iconic & Endemic Wildlife
              </h2>
              <p className="mt-2 text-sm sm:text-base text-charcoal-700 max-w-xl">
                Home to over 450 recorded animal species and 320+ birds, including globally threatened and range-restricted species.
              </p>
            </div>
            <Button href="/wildlife" variant="outline">
              View All Species Dossiers
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WILDLIFE_HIGHLIGHTS.map((animal) => (
              <Link
                key={animal.slug}
                href={`/wildlife/${animal.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-sand-200 shadow-sm hover:shadow-luxury hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-sand-200">
                  <OptimizedImage
                    src={cldImage(animal.img, 'c_fill,w_700,h_875')}
                    alt={animal.name}
                    width={500}
                    height={625}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Status Chip */}
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase border shadow-sm ${animal.statusColor}`}>
                    {animal.statusLabel}
                  </span>

                  {/* Bottom Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                      {animal.name}
                    </h3>
                    <p className="text-xs text-ivory-200/90 mt-0.5 line-clamp-1">
                      {animal.habitat}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Interactive Seasonal Wildlife Matrix ===== */}
      <section className="py-20 bg-sand-100/60 border-y border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SeasonalWildlifeMatrix />
        </div>
      </section>

      {/* ===== Signature Safari Trails & Trekking Circuits ===== */}
      <section className="py-24 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrailCircuitExplorer />
        </div>
      </section>

      {/* ===== Landscape & Regional Diversity ===== */}
      <section className="py-24 bg-white border-y border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <Eyebrow>Topography & Geography</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              Explore Borena by Landscape
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-700 leading-relaxed">
              From open acacia rangelands to volcanic brine craters and cloud forest peaks — four distinct ecosystems within one contiguous reserve.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((region) => (
              <Link key={region.name} href="/map" className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-sm hover:shadow-luxury transition-all">
                <OptimizedImage
                  src={cldImage(region.img, 'c_fill,w_700,h_875')}
                  alt={region.name}
                  width={500}
                  height={625}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest-luxury text-gold-400">Landmark Zone</span>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {region.name}
                  </h3>
                  <p className="text-xs text-ivory-200/90 leading-relaxed line-clamp-2">
                    {region.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Living Cultural Heritage ===== */}
      <section className="py-24 bg-sand-100/70 border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-luxury bg-sand-200">
                <OptimizedImage
                  src={cldImage(MEDIA.culture, 'c_fill,w_1200,h_900')}
                  alt="Borena traditional Gadaa community gathering"
                  width={900}
                  height={675}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-6 bg-forest-950 text-white p-4 rounded-2xl shadow-luxury border border-gold-500/30 text-xs">
                <p className="text-gold-400 font-bold uppercase tracking-wider text-[10px]">UNESCO Inscription</p>
                <p className="font-display font-semibold text-sm">Gadaa Democratic System</p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <Eyebrow>Living Heritage</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
                Ancient Gadaa Governance & The Singing Wells
              </h2>
              <p className="text-base text-charcoal-700 leading-relaxed">
                The Borana Oromo people have inhabited these rangelands for centuries, stewarding water and pastures through the world-renowned Gadaa democratic governance system.
              </p>
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
                At the legendary <em>Tula</em> Singing Wells (such as Dubuluk and Web), human chains form inside 30-meter deep stone shafts, rhythmically passing leather buckets while singing ancient chants to water their livestock and nourish local wildlife.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/culture"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-forest-800 transition-all shadow-sm"
                >
                  <span>Explore Singing Wells & Gadaa</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                </Link>
                <Link
                  href="/astronomy"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-sand-200 text-charcoal-800 font-bold text-xs uppercase tracking-wider hover:border-gold-500 transition-all shadow-sm"
                >
                  <span>Indigenous Astronomy (Dhaha)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Conservation & Impact Stats (Dark Luxury) ===== */}
      <section className="py-28 bg-forest-950 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <Eyebrow light>Conservation Frontier</Eyebrow>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Protecting Ethiopia&apos;s Wild Savanna Future
              </h2>
              <p className="text-base sm:text-lg text-ivory-200/80 leading-relaxed">
                Through satellite telemetry, anti-poaching outposts, community scout networks, and invasive bush clearance, we ensure the Borana ecosystem remains resilient for generations.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Button href="/conservation" variant="primary">Conservation Report</Button>
                <Button href="/contact" variant="hero-outline">Research Permits</Button>
              </div>
            </div>

            {/* Impact Counters Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-forest-800 bg-forest-900/60 p-6 text-center backdrop-blur-sm">
                <p className="font-display text-3xl sm:text-4xl font-bold text-gold-300">
                  <CountUp end={120} suffix="+" />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-ivory-200/70 font-semibold">Active Rangers</p>
              </div>
              <div className="rounded-2xl border border-forest-800 bg-forest-900/60 p-6 text-center backdrop-blur-sm">
                <p className="font-display text-3xl sm:text-4xl font-bold text-gold-300">
                  <CountUp end={8500} suffix=" ha" />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-ivory-200/70 font-semibold">Restored Savanna</p>
              </div>
              <div className="rounded-2xl border border-forest-800 bg-forest-900/60 p-6 text-center backdrop-blur-sm">
                <p className="font-display text-3xl sm:text-4xl font-bold text-gold-300">
                  <CountUp end={340} suffix="" />
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-ivory-200/70 font-semibold">Monthly Patrols</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Editorial Pull Quote ===== */}
      <section className="py-20 bg-ivory-50 border-b border-sand-200">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Quote className="mx-auto mb-6 h-10 w-10 text-gold-500 opacity-70" aria-hidden="true" />
          <blockquote className="font-display text-2xl sm:text-3xl font-medium italic leading-relaxed text-charcoal-900 text-balance">
            “The land does not belong to us — we belong to the land. Our sacred covenant is to keep its wildlife whole and its waters flowing for those who walk after us.”
          </blockquote>
          <figcaption className="mt-6 text-xs font-bold uppercase tracking-widest-luxury text-earth-700">
            — Borana Council Elder, Traditional Assembly
          </figcaption>
        </div>
      </section>

      {/* ===== Plan Your Visit Essentials ===== */}
      <section id="plan" className="py-24 bg-white border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Trip Planning Guide</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              Know Before You Go
            </h2>
            <p className="mt-3 text-sm sm:text-base text-charcoal-700 leading-relaxed">
              Essential practical guidelines to ensure a smooth, safe, and exhilarating journey to Borana National Park.
            </p>
          </div>

          <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {ESSENTIALS.map((item) => (
              <div key={item.title} className="flex gap-5 p-6 rounded-2xl bg-ivory-50 border border-sand-200/80">
                <item.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-gold-600 mt-1" />
                <div>
                  <dt className="font-display text-lg font-bold text-charcoal-900">{item.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-charcoal-700">{item.desc}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">Permit Calculator & Bookings</Button>
            <Button href="/map" variant="secondary">Interactive Park GIS Map</Button>
          </div>
        </div>
      </section>

      {/* ===== Field Stories & Research Reports ===== */}
      <section className="py-24 bg-ivory-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Field Journal</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
                Dispatches from the Savanna
              </h2>
            </div>
            <Button href="/stories" variant="outline">All Field Stories</Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {STORIES.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm hover:shadow-luxury hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-sand-200">
                  <OptimizedImage
                    src={cldImage(story.img, 'c_fill,w_800,h_500')}
                    alt={story.title}
                    width={600}
                    height={375}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-7 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-charcoal-600 mb-2">
                      <span className="font-bold uppercase tracking-wider text-earth-700">{story.category}</span>
                      <span>{story.date}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-charcoal-900 group-hover:text-forest-700 transition-colors">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-700 line-clamp-3">
                      {story.excerpt}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold-600 pt-3 border-t border-sand-100 group-hover:text-gold-700">
                    Read Full Dispatch →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Photo Gallery Lightbox Preview ===== */}
      <section className="py-24 bg-white border-y border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <Eyebrow>Media Archive</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              Through the Lens
            </h2>
            <p className="mt-2 text-sm sm:text-base text-charcoal-700">
              Capturing wildlife encounters, geological calderas, and living cultural traditions across Borana.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MEDIA.gallery.map((publicId, idx) => (
              <Link
                key={idx}
                href="/gallery"
                className="group relative aspect-square overflow-hidden rounded-2xl bg-sand-200 shadow-sm hover:shadow-luxury transition-all"
              >
                <OptimizedImage
                  src={cldImage(publicId, 'c_fill,w_600,h_600')}
                  alt={`Borena gallery frame ${idx + 1}`}
                  width={400}
                  height={400}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 text-charcoal-900 text-xs font-bold">
                    View Gallery
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button href="/gallery" variant="outline">Browse Full Photo Archive</Button>
          </div>
        </div>
      </section>

      {/* ===== Traveler Testimonials ===== */}
      <section className="py-24 bg-ivory-50 border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Visitor Insights</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              What Travelers & Researchers Report
            </h2>
          </div>

          <div className="grid divide-y divide-sand-200 border-y border-sand-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {REVIEWS.map((review) => (
              <figure key={review.name} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0 space-y-4">
                <div className="flex gap-1" aria-label="Rated 5 out of 5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="font-display text-base italic leading-relaxed text-charcoal-900">
                  “{review.quote}”
                </blockquote>
                <figcaption className="text-xs pt-2 border-t border-sand-200/60">
                  <span className="font-bold text-charcoal-900 block">{review.name}</span>
                  <span className="text-charcoal-600">{review.role} · {review.origin}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Golden Rules of Tourism ===== */}
      <section className="py-20 bg-sand-100 border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>Responsible Exploration</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              The Golden Rules of Wildlife Ethics
            </h2>
          </div>

          <ol className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {GOLDEN_RULES.map((rule, i) => (
              <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/80 border border-sand-200">
                <span className="font-display text-xl font-bold text-gold-600 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-charcoal-800 font-medium">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== FAQ Accordion ===== */}
      <section className="py-24 bg-white border-b border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <Eyebrow>Frequently Asked Questions</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
              Good to Know Before Your Visit
            </h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ===== Newsletter Subscription ===== */}
      <section className="py-24 bg-ivory-50 border-b border-sand-200">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <BookOpen className="mx-auto mb-4 h-9 w-9 text-gold-600" aria-hidden="true" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 tracking-tight">
            Field Notes & Seasonal Dispatches
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-charcoal-700 leading-relaxed">
            Quarterly research journals, wildlife migration updates, and seasonal travel advisories directly from our ranger stations.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ===== Final Majestic Dawn CTA ===== */}
      <section className="relative overflow-hidden py-32 bg-forest-950">
        <OptimizedImage
          src={cldImage(MEDIA.heroPoster, 'c_fill,w_1920,h_1080')}
          alt=""
          width={1920}
          height={1080}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <Eyebrow light>Your Journey Awaits</Eyebrow>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-white text-balance">
              The Savanna Is Most Alive at Dawn
            </h2>
            <p className="text-base sm:text-lg text-ivory-200/90 leading-relaxed">
              Whether you are planning a guided 4WD wildlife safari, a descent into El Sod’s volcanic salt caldera, or an academic research expedition — our visitor coordination team is ready to assist.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button href="/contact" size="lg" variant="primary">Book Safari Inquiries</Button>
              <Button href="/map" size="lg" variant="hero-outline">Explore Park Map</Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
