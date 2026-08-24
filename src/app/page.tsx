import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HeroVideoSection from '@/components/HeroVideoSection'
import NewsletterForm from '@/components/NewsletterForm'
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
  HeartHandshake,
  Clock,
  Star,
  Sun,
  CloudRain,
  Sprout,
  BedDouble,
} from 'lucide-react'

/* ---- Cloudinary media library (public IDs) ---- */
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
    '756340540_122203049024521144_6345814349121098685_n',
    '755694569_122203049060521144_3732885686617002677_n',
    '753551119_122203048982521144_5036600448828198298_n',
    '667811241_1374606294713548_4463427384711284519_n',
    '666935657_1374606371380207_334296717269952182_n',
    '783592782_122141256459053365_1584076652469108423_n',
    'samples/landscapes/nature-mountains',
  ],
}

const HERO_STATS = [
  { value: '1.2M+', label: 'Hectares Protected' },
  { value: '450+', label: 'Wildlife Species' },
  { value: '320+', label: 'Bird Species' },
  { value: '50+', label: 'Community Partners' },
]

const PILLARS = [
  { icon: Leaf, title: 'Wildlife', desc: 'Rare and iconic species across diverse savanna and woodland habitats.', href: '/wildlife', color: 'text-forest-700 bg-forest-100' },
  { icon: Users, title: 'Culture', desc: 'Living Borena traditions, crafts, and community partnerships.', href: '/culture', color: 'text-earth-700 bg-earth-100' },
  { icon: Shield, title: 'Conservation', desc: 'Anti-poaching, habitat restoration, and community-led monitoring.', href: '/conservation', color: 'text-forest-700 bg-forest-100' },
  { icon: MapPin, title: 'Experiences', desc: 'Guided tours, research visits, and immersive nature stays.', href: '/experiences', color: 'text-earth-700 bg-earth-100' },
]

const WILDLIFE_HIGHLIGHTS = [
  { name: 'African Elephant', slug: 'african-elephant', status: 'EN', statusColor: 'bg-red-100 text-red-800', img: MEDIA.wildlife[0] },
  { name: 'Ethiopian Wolf', slug: 'ethiopian-wolf', status: 'CR', statusColor: 'bg-red-100 text-red-800', img: MEDIA.wildlife[1] },
  { name: "Grevy's Zebra", slug: 'grevys-zebra', status: 'EN', statusColor: 'bg-red-100 text-red-800', img: MEDIA.wildlife[2] },
  { name: 'Lion', slug: 'african-lion', status: 'VU', statusColor: 'bg-amber-100 text-amber-800', img: MEDIA.wildlife[3] },
]

const EXPERIENCES = [
  { icon: Tent, title: 'Guided Tours', desc: 'Expert-led game drives and walking safaris through prime wildlife territory.', img: MEDIA.experiences[0] },
  { icon: Bird, title: 'Research Visits', desc: 'Field research opportunities with permits, accommodation, and local guides.', img: MEDIA.experiences[1] },
  { icon: PawPrint, title: 'Cultural Stays', desc: 'Community-based tourism with Borena families — crafts, food, and storytelling.', img: MEDIA.experiences[2] },
]

const STORIES = [
  { title: 'Biannual Grevy’s Zebra Ground Census', slug: 'grevys-zebra-census-sarite', excerpt: "The latest collaborative wildlife count conducted by EWCA rangers and community scout networks reveals positive recruitment rates.", img: MEDIA.stories[0] },
  { title: 'The Living Legacy of the Tula Wells', slug: 'tula-singing-wells-gadaa-heritage', excerpt: 'Ancient subterranean Singing Wells sustain life and customary Gadaa water covenants.', img: MEDIA.stories[1] },
  { title: 'Smart Outposts & Community Rangers', slug: 'smart-outposts-community-rangers', excerpt: 'How solar-powered perimeter networks and local scout teams protect southern corridors.', img: MEDIA.stories[2] },
]

/* ---- Plan Your Visit (inspired by balemountains.org trip-planning hub) ---- */
const ESSENTIALS = [
  { icon: CalendarDays, title: 'When to Go', desc: 'The dry season runs from October to March and offers the easiest travel and best game viewing. June to September is greener and quieter, with peak birding.' },
  { icon: Route, title: 'Getting There', desc: 'The park is roughly 750 km south of Addis Ababa via Yabelo. A 4×4 is recommended for park tracks; charter flights serve nearby airstrips.' },
  { icon: Ticket, title: 'Park Fees', desc: 'Entry permits, guided walks and camping are paid at the gate or head office. Rates vary by residency, activity and vehicle type.' },
  { icon: Backpack, title: 'What to Bring', desc: 'Layers for cool highland mornings, sun protection, sturdy footwear, binoculars and a refillable water bottle.' },
]

const ITINERARIES = [
  {
    name: 'Day Trip', duration: '1 day', level: 'Easy',
    points: ['Dawn game drive across the acacia plains', 'Headquarters nature walk with a ranger', 'Lunch at a community cooperative', 'Sunset at the volcanic ridge viewpoint'],
  },
  {
    name: 'Classic Safari', duration: '3 days', level: 'Moderate',
    points: ['Day 1 — Savanna wildlife & crater lakes', 'Day 2 — Highland trails & waterfall hike', 'Day 3 — Borena culture, crafts & storytelling'],
  },
  {
    name: 'Wilderness Expedition', duration: '7 days', level: 'Challenging',
    points: ["Multi-day trek through remote valleys", 'Camping beneath some of Africa\'s darkest skies', 'Birding hotspots with 320+ recorded species', 'Visit a community-run research station'],
  },
]

const TRAILS = [
  { name: 'Headquarters Nature Walk', distance: '3 km', time: '1–2 hrs', level: 'Easy' },
  { name: 'Acacia Woodland Trail', distance: '6 km', time: '2–3 hrs', level: 'Easy' },
  { name: 'Crater Lakes Rim Walk', distance: '9 km', time: '3–4 hrs', level: 'Moderate' },
  { name: 'Waterfall & Bamboo Trail', distance: '12 km', time: '4–5 hrs', level: 'Moderate' },
  { name: 'Highland Peak Ascent', distance: '16 km', time: 'Full day', level: 'Challenging' },
]

const LEVEL_STYLES: Record<string, string> = {
  Easy: 'bg-forest-100 text-forest-700',
  Moderate: 'bg-gold-100 text-gold-700',
  Challenging: 'bg-red-100 text-red-800',
}

const GOLDEN_RULES = [
  'Keep wildlife wild — observe from a respectful distance',
  'Stay on designated tracks and trails',
  'Pack out everything you pack in',
  'Ask permission before photographing people',
  'Campfires only in designated areas, with a guide',
  'Always follow your ranger\u2019s guidance',
]

const FAQ_ITEMS = [
  { question: 'Do I need a permit to enter the park?', answer: 'Yes. All visitors need an entry permit, available at the park gate and head office in Yabelo. Guided activities such as treks and game drives are booked separately and always include a licensed ranger.' },
  { question: 'When is the best time to visit?', answer: 'The dry season (October–March) offers the easiest travel and best wildlife viewing. The green season (June–September) transforms the landscape and is superb for birding, though some tracks become muddy.' },
  { question: 'How do I get to Borena National Park?', answer: 'The park lies roughly 750 km south of Addis Ababa, reached via Yabelo. Most visitors hire a 4×4 with driver; charter flights to nearby airstrips can be arranged through tour operators.' },
  { question: 'Are guided tours required?', answer: 'Guides are required for walking safaris and trekking routes, and strongly recommended for game drives. Community cultural visits must be arranged through registered cooperatives.' },
  { question: 'Is Borena suitable for families?', answer: 'Yes — day trips, headquarters walks and cultural visits are family-friendly. For remote treks we recommend children be at least 12 years old due to altitude and trail length.' },
  { question: 'Can I camp inside the park?', answer: 'Designated campsites are available with basic facilities. Camping must be booked in advance through the visitor office, and any night outside designated sites requires ranger accompaniment.' },
]

/* ---- Serengeti.com-inspired additions ---- */
const REGIONS = [
  { name: 'Central Plains', desc: 'Open grassland teeming with plains game — the classic safari heartland.', img: MEDIA.heroPoster },
  { name: 'Volcanic Highlands', desc: 'Crater lakes, lava fields and sweeping ridge-top vistas.', img: MEDIA.landscape },
  { name: 'Riverine Woodlands', desc: 'Acacia and palm galleries along seasonal rivers — prime birding territory.', img: MEDIA.welcome },
  { name: 'Community Conservancy', desc: 'Community-managed rangelands where culture and conservation meet.', img: MEDIA.culture },
]

const CLIMATE_SEASONS = [
  { icon: Sun, name: 'Dry Season', months: 'October – March', temp: '25–30°C days', note: 'Clear skies, passable tracks and wildlife concentrated around permanent water.' },
  { icon: CloudRain, name: 'Long Rains', months: 'March – May', temp: '22–27°C days', note: 'Afternoon showers, fewer visitors and dramatic skies over the plains.' },
  { icon: Sprout, name: 'Green Season', months: 'June – September', temp: '20–26°C days', note: 'Fresh grazing lands, migratory birds and the main cultural calendar.' },
]

const STAYS = [
  { icon: BedDouble, name: 'Safari Lodge', desc: 'Comfortable rooms, a restaurant and guided activities at the park gateway.' },
  { icon: Tent, name: 'Tented Camps', desc: 'Canvas camps on the open plains, operated seasonally with full board.' },
  { icon: Users, name: 'Community Campsites', desc: 'Designated sites run by local cooperatives, with basic facilities and ranger support.' },
]

const REVIEWS = [
  { quote: 'We saw elephants within our first hour in the park. Our ranger knew every birdcall on the trail.', name: 'S. Mitchell', origin: 'United Kingdom' },
  { quote: 'Well-run campsites and straightforward permits. The night sounds alone are worth the trip.', name: 'D. Kiptoo', origin: 'Kenya' },
  { quote: 'The community visit was the highlight — honest, welcoming and beautifully organised.', name: 'L. Hoffmann', origin: 'Germany' },
]

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${light ? 'text-ivory-50/70' : 'text-charcoal-700'}`}>
      <span aria-hidden="true" className={`inline-block h-px w-8 ${light ? 'bg-gold-400' : 'bg-gold-600'}`} />
      {children}
    </p>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* ===== Hero Video Section ===== */}
      <HeroVideoSection
        eyebrow="Borena National Park · Southern Ethiopia"
        title="Where Ethiopia's Wild Heart Comes Alive"
        subtitle="Vast savannas, volcanic highlands and living cultures — discover one of East Africa's most extraordinary conservation landscapes."
        primaryCta={{ label: 'Plan Your Visit', href: '/contact' }}
        secondaryCta={{ label: 'Explore the Park', href: '/wildlife' }}
        posterSrc={cldImage(MEDIA.heroPoster)}
        videoSrc={cldVideo(MEDIA.heroVideo)}
        stats={HERO_STATS}
      />

      {/* ===== Welcome / Intro ===== */}
      <section id="welcome" className="scroll-mt-20 bg-ivory-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Eyebrow>Welcome to Borena</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal-900 text-balance md:text-4xl">
                A Living Landscape, Guarded by Its People
              </h2>
              <p className="mt-5 leading-relaxed text-charcoal-700">
                Stretching across acacia plains and volcanic ridges, Borena National Park protects
                one of southern Ethiopia's most vital ecosystems. Here, conservation is not a
                barrier between people and nature — it is a partnership written into daily life.
              </p>
              <p className="mt-4 leading-relaxed text-charcoal-700">
                From dawn game drives to evenings of storytelling under acacia trees, every visit
                directly supports the rangers, researchers, and families who call this land home.
              </p>
              <ul className="mt-7 space-y-3">
                {['Community-led ranger patrols', 'Science-driven habitat restoration', 'Sustainable, low-impact tourism'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-charcoal-900">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-100">
                      <CheckCircle2 className="h-4 w-4 text-forest-700" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <Button href="/about" variant="secondary">Our Story</Button>
              </div>
            </div>

            <div className="relative">
              {/* Offset frame accent */}
              <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-gold-500/40" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
                <OptimizedImage
                  src={cldImage(MEDIA.welcome)}
                  alt="Rangers walking through the Borena savanna at dawn"
                  width={900}
                  height={675}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-xl border border-sand-200 bg-white px-5 py-4 shadow-card sm:left-10">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold-100">
                  <Shield className="h-5 w-5 text-gold-700" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold leading-none text-charcoal-900">120+ Rangers</p>
                  <p className="mt-1 text-xs text-charcoal-700">Protecting the park, every day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Explore Pillars ===== */}
      <section className="border-y border-sand-200 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Eyebrow>Explore</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">More Than a Park</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-700">
              Four pillars define the Borena experience — each rooted in the land and its people.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((feature) => (
              <Link key={feature.title} href={feature.href} className="group">
                <div className="h-full rounded-lg border border-sand-200 bg-white p-7 transition-colors duration-300 hover:border-forest-700/30">
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-charcoal-900 transition-colors duration-300 group-hover:text-forest-700">
                    {feature.title}
                  </h3>
                  <p className="mb-5 mt-2 text-sm leading-relaxed text-charcoal-700">{feature.desc}</p>
                  <span className="inline-flex items-center text-sm font-medium text-gold-600 transition-colors duration-300 group-hover:text-gold-700">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Wildlife Highlights ===== */}
      <section className="bg-ivory-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Wildlife</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Iconic Species</h2>
            </div>
            <Button href="/wildlife" variant="outline" className="hidden sm:inline-flex">View all wildlife</Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WILDLIFE_HIGHLIGHTS.map((animal) => (
              <Link key={animal.name} href={`/wildlife/${animal.slug}`} className="group block">
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-lg bg-sand-100">
                  <OptimizedImage
                    src={cldImage(animal.img, 'c_fill,w_600,h_750')}
                    alt={animal.name}
                    width={480}
                    height={600}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide ${animal.statusColor}`}>
                    IUCN {animal.status}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-charcoal-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h3 className="font-display text-lg font-semibold text-charcoal-900 transition-colors duration-300 group-hover:text-forest-700">
                  {animal.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Landscape Storytelling ===== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Eyebrow>Landscape</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal-900 text-balance md:text-4xl">
                Acacia Savannas & Volcanic Highlands
              </h2>
              <p className="mt-5 leading-relaxed text-charcoal-700">
                Borena's dramatic scenery stretches from acacia-dotted savannas to montane
                forests and sweeping volcanic highlands. Every horizon tells a geological story
                shaped by fire, wind, and time.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-forest-50 p-4">
                  <Mountain className="mb-2 h-5 w-5 text-forest-700" />
                  <p className="font-display text-xl font-semibold text-charcoal-900">2,000m</p>
                  <p className="text-xs text-charcoal-700">Peak elevation</p>
                </div>
                <div className="rounded-xl bg-earth-100 p-4">
                  <Bird className="mb-2 h-5 w-5 text-earth-700" />
                  <p className="font-display text-xl font-semibold text-charcoal-900">320+</p>
                  <p className="text-xs text-charcoal-700">Recorded bird species</p>
                </div>
              </div>
              <div className="mt-8">
                <Button href="/map" variant="secondary">Explore the Map</Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-2xl shadow-soft">
                <OptimizedImage
                  src={cldImage(MEDIA.landscape, 'c_fill,w_1200,h_675')}
                  alt="Volcanic highlands of Borena"
                  width={900}
                  height={506}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-6 rounded-xl border border-sand-200 bg-white px-5 py-3 shadow-card">
                <p className="text-xs font-medium uppercase tracking-wider text-charcoal-700">Yabelo Highlands</p>
                <p className="font-display text-sm font-semibold text-forest-700">Southern Ethiopia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Explore by Region ===== */}
      <section className="bg-ivory-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Eyebrow>The Park</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Explore Borena by Region</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-700">
              Four distinct landscapes, each with its own character, wildlife and stories.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((region) => (
              <Link key={region.name} href="/map" className="group relative block aspect-[4/5] overflow-hidden rounded-lg">
                <OptimizedImage
                  src={cldImage(region.img, 'c_fill,w_600,h_750')}
                  alt={region.name}
                  width={480}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg font-semibold text-ivory-50">{region.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ivory-50/85">{region.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Experiences ===== */}
      <section className="bg-sand-100 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Eyebrow>Experiences</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Plan Your Visit</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-700">
              From day trips to research stays — safe, memorable access to one of Ethiopia's most important conservation areas.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {EXPERIENCES.map((item) => (
              <Link key={item.title} href="/contact" className="group block">
                <div className="h-full overflow-hidden rounded-lg border border-sand-200 bg-white transition-colors duration-300 hover:border-forest-700/30">
                  <div className="relative aspect-video overflow-hidden bg-sand-200">
                    <OptimizedImage
                      src={cldImage(item.img, 'c_fill,w_800,h_450')}
                      alt={item.title}
                      width={600}
                      height={340}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-charcoal-900/55 text-ivory-50 backdrop-blur-sm">
                      <item.icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-charcoal-900 transition-colors duration-300 group-hover:text-forest-700">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Culture ===== */}
      <section className="border-y border-earth-100 bg-earth-100/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="aspect-video overflow-hidden rounded-2xl shadow-soft">
                <OptimizedImage
                  src={cldImage(MEDIA.culture, 'c_fill,w_1200,h_675')}
                  alt="Borena cultural ceremony"
                  width={900}
                  height={506}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>Culture</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Borena Heritage</h2>
              <p className="mt-5 leading-relaxed text-charcoal-700">
                Living alongside the park are pastoralist communities whose ancient Gadaa governance,
                hand-carved Singing Wells, and customary conservation covenants have protected this savanna
                ecosystem for centuries.
              </p>
              <div className="mt-7">
                <Link href="/culture" className="inline-flex items-center font-medium text-earth-700 transition-colors hover:text-earth-800">
                  Discover Borena culture & traditions
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Conservation (dark, animated counters) ===== */}
      <section className="bg-forest-950 py-24 text-ivory-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Eyebrow light>Conservation</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-balance md:text-4xl">
                Protecting What Matters
              </h2>
              <p className="mt-5 leading-relaxed text-ivory-50/80">
                Anti-poaching patrols, habitat restoration, and community-led monitoring keep
                Borena's ecosystems resilient — season after season, generation after generation.
              </p>
              <ul className="mb-10 mt-7 space-y-3">
                {['Anti-poaching patrols', 'Habitat restoration', 'Community-led monitoring', 'Wildlife research'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ivory-50/85">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/conservation" className="inline-flex items-center font-medium text-gold-400 transition-colors hover:text-gold-300">
                Read more
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { end: 120, suffix: '+', label: 'Active rangers' },
                { end: 8500, suffix: '', label: 'Hectares restored' },
                { end: 340, suffix: '', label: 'Patrols per month' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-forest-700/40 bg-forest-900/60 p-6 text-center backdrop-blur-sm">
                  <p className="font-display text-3xl font-semibold text-gold-300 md:text-4xl">
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ivory-50/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Quote Band ===== */}
      <section className="bg-sand-100 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Quote className="mx-auto mb-6 h-10 w-10 text-gold-500" aria-hidden="true" />
          <blockquote className="font-display text-2xl font-medium italic leading-relaxed text-charcoal-900 text-balance md:text-3xl">
            “The park does not belong to us — we belong to the park. Our task is simply to keep it
            whole for those who come after.”
          </blockquote>
          <figcaption className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-charcoal-700">
            Elder, Borena Community Council
          </figcaption>
        </div>
      </section>

      {/* ===== Plan Your Visit — Essentials ===== */}
      <section id="plan" className="scroll-mt-20 border-t border-sand-200 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>Plan Your Visit</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Know Before You Go</h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-700">
              Practical information for preparing a safe, memorable, and well-organised journey to Borena.
            </p>
          </div>
          <dl className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {ESSENTIALS.map((item) => (
              <div key={item.title} className="flex gap-5">
                <item.icon aria-hidden="true" className="mt-1 h-5 w-5 flex-shrink-0 text-gold-600" />
                <div>
                  <dt className="font-display text-lg font-semibold text-charcoal-900">{item.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-charcoal-700">{item.desc}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">Permits & Fees</Button>
            <Button href="/experiences" variant="secondary">View Safari Itineraries</Button>
          </div>
        </div>
      </section>

      {/* ===== Weather & Climate ===== */}
      <section className="border-t border-sand-200 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Weather & Climate</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Seasons of the Savanna</h2>
          </div>
          <div className="grid divide-y divide-sand-200 border-y border-sand-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {CLIMATE_SEASONS.map((season) => (
              <div key={season.name} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-earth-700">{season.months}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-charcoal-900">{season.name}</h3>
                <p className="mt-3 font-display text-2xl font-semibold text-forest-700">{season.temp}</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{season.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Suggested Itineraries ===== */}
      <section className="bg-ivory-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Eyebrow>Itineraries</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Choose Your Journey</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-charcoal-700">
              Tried-and-tested routes shaped by our rangers — from a single perfect day to a full wilderness week.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {ITINERARIES.map((plan) => (
              <div key={plan.name} className="flex h-full flex-col border border-sand-200 bg-white transition-colors duration-300 hover:border-forest-700/30">
                <div className="flex items-baseline justify-between gap-3 border-b border-sand-200 px-6 py-5">
                  <h3 className="font-display text-xl font-semibold text-charcoal-900">{plan.name}</h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-earth-700">{plan.duration}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className={`w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${LEVEL_STYLES[plan.level]}`}>
                    {plan.level}
                  </span>
                  <ul className="mt-5 flex-1 space-y-3">
                    {plan.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-700">
                        <span aria-hidden="true" className="mt-[9px] h-px w-4 flex-shrink-0 bg-gold-600" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="mt-6 inline-flex items-center text-sm font-medium text-forest-700 transition-colors hover:text-forest-600">
                    Request this itinerary
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Signature Trails ===== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Trails</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal-900 md:text-4xl">Signature Walking Routes</h2>
              <p className="mt-5 leading-relaxed text-charcoal-700">
                Every trail is walked with a licensed ranger who knows its birds, plants and stories.
                Distances are return; times include rest stops.
              </p>
              <div className="mt-7">
                <Button href="/experiences" variant="secondary">All activities</Button>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm">
                {TRAILS.map((trail) => (
                  <Link key={trail.name} href="/contact" className="group flex flex-wrap items-center justify-between gap-3 px-6 py-5 transition-colors hover:bg-ivory-50">
                    <div>
                      <h3 className="font-display text-base font-semibold text-charcoal-900 transition-colors duration-300 group-hover:text-forest-700 md:text-lg">
                        {trail.name}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-3 text-xs text-charcoal-700">
                        <span className="inline-flex items-center gap-1"><Route className="h-3.5 w-3.5" />{trail.distance}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{trail.time}</span>
                      </p>
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${LEVEL_STYLES[trail.level]}`}>
                      {trail.level}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Where to Stay ===== */}
      <section className="border-t border-sand-200 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Accommodation</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Where to Stay</h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-700">
              From a full-service lodge at the gateway to nights under canvas on the plains.
            </p>
          </div>
          <div className="grid divide-y divide-sand-200 border-y border-sand-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {STAYS.map((stay) => (
              <div key={stay.name} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                <stay.icon aria-hidden="true" className="h-5 w-5 text-gold-600" />
                <h3 className="mt-4 font-display text-xl font-semibold text-charcoal-900">{stay.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{stay.desc}</p>
                <Link href="/contact" className="mt-4 inline-flex items-center text-sm font-medium text-forest-700 transition-colors hover:text-forest-600">
                  Check availability
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stories ===== */}
      <section className="bg-ivory-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Stories</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">From the Field</h2>
            </div>
            <Button href="/stories" variant="outline" className="hidden sm:inline-flex">All stories</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STORIES.map((story) => (
              <Link
                key={story.title}
                href={`/stories/${story.slug}`}
                className="group block"
              >
                <article className="h-full overflow-hidden rounded-lg border border-sand-200 bg-white transition-colors duration-300 hover:border-forest-700/30">
                  <div className="aspect-video overflow-hidden bg-sand-100">
                    <OptimizedImage
                      src={cldImage(story.img, 'c_fill,w_800,h_450')}
                      alt={story.title}
                      width={600}
                      height={340}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-charcoal-900 transition-colors duration-300 group-hover:text-forest-700">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-700">{story.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section className="border-y border-sand-200 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Through the Lens</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {MEDIA.gallery.map((publicId, i) => (
              <div
                key={i}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-sand-100 transition-all duration-300 ease-out hover:shadow-card"
              >
                <OptimizedImage
                  src={cldImage(publicId, 'c_fill,w_600,h_600')}
                  alt={`Gallery image ${i + 1}`}
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/gallery" variant="outline">View full gallery</Button>
          </div>
        </div>
      </section>

      {/* ===== Visitor Reviews ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Visitor Feedback</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">What Visitors Report</h2>
          </div>
          <div className="grid divide-y divide-sand-200 border-y border-sand-200 md:grid-cols-3 md:divide-x md:divide-y-0">
            {REVIEWS.map((review) => (
              <figure key={review.name} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-base italic leading-relaxed text-charcoal-900">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-charcoal-900">{review.name}</span>
                  <span className="text-charcoal-700"> · {review.origin}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Golden Rules of Tourism ===== */}
      <section className="bg-gold-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>Travel Responsibly</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">The Golden Rules of Tourism</h2>
          </div>
          <ol className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {GOLDEN_RULES.map((rule, i) => (
              <li key={i} className="flex gap-4">
                <span aria-hidden="true" className="font-display text-xl font-semibold leading-none text-gold-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed text-charcoal-900">{rule}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-ivory-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Eyebrow>Good to Know</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Frequently Asked Questions</h2>
          </div>
          <FaqAccordion items={FAQ_ITEMS} />
          <p className="mt-8 text-center text-sm text-charcoal-700">
            Still have questions?{' '}
            <Link href="/contact" className="font-semibold text-forest-700 underline decoration-gold-500 decoration-2 underline-offset-4 hover:text-forest-600">
              Ask our visitor team
            </Link>
          </p>
        </div>
      </section>

      {/* ===== Support Conservation ===== */}
      <section className="bg-forest-950 py-24 text-ivory-50">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Eyebrow light>Support Borena</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-balance md:text-4xl">
            Every Contribution Protects Borena
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ivory-50/85">
            Donations fund ranger patrols, habitat restoration and community conservation programmes.
            Partnership enquiries from researchers, operators and institutions are welcome.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg" variant="primary">Donate Today</Button>
            <Button href="/contact" size="lg" variant="hero-outline">Become a Partner</Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-ivory-50/50">
            Managed together with government agencies · NGOs · research institutions · community cooperatives
          </p>
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="bg-earth-100 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <BookOpen className="mx-auto mb-5 h-9 w-9 text-earth-700" aria-hidden="true" />
          <h2 className="font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Field Notes, Monthly</h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-700">
            Ranger dispatches, wildlife sightings, and seasonal travel tips — straight from the savanna to your inbox.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="relative overflow-hidden py-28">
        <OptimizedImage
          src={cldImage(MEDIA.heroPoster, 'c_fill,w_1920,h_1080')}
          alt=""
          width={1920}
          height={1080}
          priority={false}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/70 to-forest-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Eyebrow light>Your Adventure Awaits</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ivory-50 text-balance md:text-5xl">
              The Savanna Is Best at Dawn
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ivory-50/85">
              Whether you are a day visitor or a researcher, Borena provides safe, memorable access
              to one of Ethiopia's most important conservation areas.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact" size="lg" variant="primary">Book an Inquiry</Button>
              <Button href="/map" size="lg" variant="hero-outline">View Map</Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
