'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import OptimizedImage from '@/components/OptimizedImage'
import TulaWellsAcousticExplorer from '@/components/TulaWellsAcousticExplorer'
import CultureCloudinaryGallery from '@/components/CultureCloudinaryGallery'
import { cldImage } from '@/lib/cloudinary'
import {
  Users,
  ArrowRight,
  TreePine,
  Droplets,
  Scale,
  CheckCircle2,
  Moon,
  BookOpen,
  Shield,
  Award,
  Sparkles,
  Layers,
  Landmark,
} from 'lucide-react'

/* ---- 11 GADAA GRADES (Asmarom Legesse, 1973: "Gada: Three Approaches to the Study of African Society") ---- */
const GADAA_GRADES = [
  {
    grade: '1. Dabballee',
    age: '0–8 Years',
    role: 'Sacred Childhood & Socialization',
    hair: 'Guduruu (Flowing unbraided hair)',
    desc: 'Children in Dabballee hold a sacred, untouchable status. They cannot be punished or reprimanded. They are blessed by the Abbaa Gadaa and spend their early years under the protective guardianship of mothers and elders.',
  },
  {
    grade: '2. Gaammee Didiqqo',
    age: '9–16 Years',
    role: 'Junior Apprenticeship & Herding',
    hair: 'Gaammee (Shaved crown with fringe)',
    desc: 'Boys undergo their first ceremonial haircut. They begin learning practical ecology, livestock anatomy, rangeland botany, and safe routes across the savanna under older mentors.',
  },
  {
    grade: '3. Gaammee Gurguddo',
    age: '17–24 Years',
    role: 'Senior Youth & Scout Training',
    hair: 'Dambala (Growing youth curls)',
    desc: 'Youth enter physical conditioning, tracking wildlife, orienteering, and reconnaissance scouting along backcountry boundaries. They form the primary physical defense and scouting labor force.',
  },
  {
    grade: '4. Kuusa',
    age: '25–32 Years',
    role: 'Civic Assembly & Leadership Election',
    hair: 'Formal braided warrior styling',
    desc: 'The cohort gathers at the historic assembly grounds to elect their future executive council leaders (Hayyuu Adulaa). They study oral customary jurisprudence and constitutional history.',
  },
  {
    grade: '5. Raaba',
    age: '33–40 Years',
    role: 'Military Command & Transition',
    hair: 'Warrior crest headband',
    desc: 'Serving as the senior defense leadership and field marshals. Members are permitted to marry and begin family formation while preparing intensively for upcoming national governance.',
  },
  {
    grade: '6. Doorii',
    age: '37–40 Years (Sub-grade)',
    role: 'Paternal & Sacred Transition',
    hair: 'Ceremonial transition style',
    desc: 'A sacred transitional sub-grade where members perform the Gubbis fatherhood naming ceremonies, concluding their military obligations before assuming political office.',
  },
  {
    grade: '7. Gadaa (Luba)',
    age: '41–48 Years',
    role: 'Supreme Executive Governance',
    hair: 'Kallacha (Phallic silver headdress)',
    desc: 'The active ruling class of the Borana nation. Headed by the Abbaa Gadaa, the council administers justice, conducts diplomacy, manages rangelands, and enforces the Seera constitution for an unextendable 8-year term.',
  },
  {
    grade: '8. Yuba I',
    age: '49–56 Years',
    role: 'Senior Judicial Advisory',
    hair: 'Elder natural trim',
    desc: 'Having stepped down peacefully, the former Gadaa class transitions into senior judicial advisors, settling rangeland boundaries and water access disputes across the 9 Tula complexes.',
  },
  {
    grade: '9. Yuba II',
    age: '57–64 Years',
    role: 'Constitutional Consultants',
    hair: 'Elder trim with head wrap',
    desc: 'Senior legal experts who serve as impartial constitutional consultants during the 8-yearly national assembly at Gumii Gaayyo.',
  },
  {
    grade: '10. Yuba III',
    age: '65–72 Years',
    role: 'Supreme Court Elder Statesmen',
    hair: 'Venerable elder styling',
    desc: 'Venerated elder statesmen whose oral testimonies resolve historic clan precedence, inter-ethnic treaties, and foundational legal interpretations.',
  },
  {
    grade: '11. Gadammoojjii & Jaarsa',
    age: '73+ Years',
    role: 'Spiritual Peace Keepers & Sages',
    hair: 'Shaved head with sacred Ulee staff',
    desc: 'The final spiritual grade. Elders perform the sacred Jarra peace blessing and retire into contemplative community life. They carry sacred wooden Ulee walking staffs and enjoy universal reverence.',
  },
]

/* ---- 5 GADAA PARTIES / GENERATIONAL CLASSES (Gogeessa / Miseensa) ---- */
const GADAA_PARTIES = [
  {
    name: 'Birmajii',
    meaning: 'The Radiant & Prosperous',
    symbol: 'White ostrich feather & silver Kallacha',
    desc: 'Associated with expansive grazing, rain abundance, and diplomatic harmony with neighboring nations.',
  },
  {
    name: 'Horata (Aldada)',
    meaning: 'The Wealthy in Cattle',
    symbol: 'Bovine horn & milk vessel',
    desc: 'Dedicated to livestock genetics, expanding water reservoirs, and economic stability across Borana rangelands.',
  },
  {
    name: 'Bichile (Michille)',
    meaning: 'The Harmonious & Resilient',
    symbol: 'Olive branch (Ejersa)',
    desc: 'Known for peacemaking treaties, legal arbitration excellence, and restorative justice.',
  },
  {
    name: 'Duulo (Muldhana)',
    meaning: 'The Vigorous & Courageous',
    symbol: 'Shield and scouting spear',
    desc: 'Specialists in territorial defense, wildlife habitat integrity, and border diplomacy.',
  },
  {
    name: 'Roobale',
    meaning: 'The Rain Bringers',
    symbol: 'Water gourd and acacia blossom',
    desc: 'Associated with heavy monsoon rains, replenishment of deep aquifers, and agricultural prosperity.',
  },
]

/* ---- KEY GADAA DEMOCRATIC OFFICES ---- */
const DEMOCRATIC_OFFICES = [
  {
    title: 'Abbaa Gadaa',
    role: 'Head of State & Chief Executive',
    desc: 'The supreme leader, chief spokesman, and premier executive of the nation for a single, non-renewable 8-year term. Governs by consensus with his council.',
  },
  {
    title: 'Abbaa Duulaa',
    role: 'Supreme Commander of Defense',
    desc: 'Commands all youth scouting units, security scouts, and territorial integrity patrols across the rangeland borders.',
  },
  {
    title: 'Abbaa Seeraa',
    role: 'Chief Justice & Constitutional Guardian',
    desc: 'The master of customary oral jurisprudence who presides over constitutional disputes and enforces the integrity of traditional law.',
  },
  {
    title: 'Abbaa Sa’aa',
    role: 'Minister of Pastoral Economy & Herds',
    desc: 'Oversees livestock census, rangeland grazing health, dry-season forage reserves (Kalo), and public cattle welfare funds.',
  },
  {
    title: 'Abbaa Alangee',
    role: 'Speaker of the National Assembly',
    desc: 'Carries the sacred leather whip (Alangee) as the sceptre of legislative order, ensuring all delegates at Gumii Gaayyo speak freely.',
  },
  {
    title: 'Hayyuu Adulaa',
    role: 'Senior Executive Councilors',
    desc: 'Six senior councilors elected from all major clan lineages to deliberate on national policy, foreign relations, and environmental statutes.',
  },
]

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950 pt-20">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src={cldImage('619373301_1313029967537848_472084938184086167_n', 'w_1600,h_900,c_fill,q_auto')}
            alt="Borena Living Cultural Heritage"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            UNESCO Intangible Cultural Heritage
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            The Gadaa Democracy
          </h1>
          <p className="text-sm md:text-base text-ivory-200/85 max-w-2xl mx-auto leading-relaxed font-light">
            Grounded in the landmark anthropological research of Prof. Asmarom Legesse: Africa’s supreme 8-year cyclical democracy, living Singing Wells, and customary conservation law.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Academic Introduction Banner: Asmarom Legesse */}
        <div className="bg-white rounded-2xl border border-sand-200 p-8 sm:p-10 shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <BookOpen className="w-4 h-4 text-gold-600" />
              <span>Seminal Anthropological Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-charcoal-950">
              Documented by Prof. Asmarom Legesse (1973)
            </h2>
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed font-serif italic text-gold-950/90 border-l-4 border-gold-500 pl-4 bg-sand-50/70 p-4 rounded-r-xl">
              “Gada is a system of generation classes that succeed each other every eight years in assuming military, political, judicial, and spiritual leadership... It contains complex mechanisms of checks and balances that prevent the concentration of power in any individual or dynasty.”
              <span className="block text-right text-xs font-sans font-semibold text-charcoal-600 mt-2">
                — Asmarom Legesse, <em>Gada: Three Approaches to the Study of African Society</em>
              </span>
            </p>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-light">
              Unlike Western democracies structured around political parties, Gadaa organizes the entire society into peer generational sets (*Gogeessa*) that advance through 11 distinct developmental grades over their lifetime. Every 8 years, executive power is transferred through the peaceful *Baallii* ceremony with zero hereditary inheritance.
            </p>
          </div>

          <div className="lg:col-span-4 bg-forest-950 text-white p-6 rounded-2xl border border-forest-800 space-y-4 shadow-md">
            <div className="flex items-center gap-2.5 text-gold-400">
              <Award className="w-5 h-5" />
              <h3 className="font-display font-bold text-base">Constitutional Pillars</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-ivory-200/90">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Strict 8-Year Term Limits:</strong> No leader may remain in office past 8 years.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Peaceful Power Transfer:</strong> Symbolized by the sacred wooden <em>Bokuu</em> sceptre.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Gumii Gaayyo Sovereign Parliament:</strong> Supreme law-making assembly of all citizens.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span><strong>Seera Marraa fi Bishaan:</strong> Inviolable public trust over water and rangelands.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The 11-Stage Gadaa Lifecycle Timeline */}
        <section className="bg-white rounded-2xl border border-sand-200/80 p-8 sm:p-12 shadow-subtle space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>The Eleven Generational Grades</span>
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-950">
              The 11 Gadaa Lifecycle Stages
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light">
              From the sacred, unpunishable status of childhood to supreme national leadership and venerated retirement as a spiritual elder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GADAA_GRADES.map((item, idx) => (
              <div
                key={item.grade}
                className="p-6 rounded-2xl border border-sand-200 bg-ivory-50/60 hover:bg-forest-50/60 hover:border-gold-500/50 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gold-900 bg-gold-100/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Grade #{idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-forest-900">{item.age}</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-charcoal-950">{item.grade}</h4>
                  <p className="text-xs font-semibold text-forest-800">{item.role}</p>
                  <p className="text-[11px] font-mono text-earth-800 bg-sand-100/70 px-2.5 py-1 rounded-lg">
                    Style: {item.hair}
                  </p>
                  <p className="text-xs text-charcoal-700 leading-relaxed font-light pt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The 5 Gadaa Parties (Gogeessa) & Generational Rotation */}
        <section className="bg-forest-950 text-white rounded-2xl border border-forest-800 p-8 sm:p-12 shadow-card space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest-luxury text-gold-400">
              Generational Cohorts (Miseensa / Gogeessa)
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              The 5 Gadaa Parties & The 40-Year Generation Cycle
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/80 font-light">
              As explained by Asmarom Legesse, the 5 permanent Gadaa parties rotate in an unbroken 40-year generational rhythm (5 parties × 8 years = 40 years), ensuring sons take power exactly 40 years after their fathers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {GADAA_PARTIES.map((party, idx) => (
              <div
                key={party.name}
                className="bg-forest-900/90 rounded-2xl border border-forest-700/80 p-5 space-y-3 flex flex-col justify-between hover:border-gold-500/60 transition-all"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-gold-400 bg-forest-950 px-2 py-0.5 rounded border border-gold-500/20">
                    Party {idx + 1}
                  </span>
                  <h4 className="font-display font-bold text-base text-white">{party.name}</h4>
                  <p className="text-[11px] text-gold-300 font-semibold">{party.meaning}</p>
                  <p className="text-[10px] font-mono text-ivory-300/80">Symbol: {party.symbol}</p>
                  <p className="text-xs text-ivory-200/80 leading-relaxed font-light pt-1">{party.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Democratic Offices & Separation of Powers */}
        <section className="bg-white rounded-2xl border border-sand-200/80 p-8 sm:p-12 shadow-subtle space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Separation of Powers</span>
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-950">
              The Council of Ministers (Adulaa Council)
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light">
              Executive authority in Borana is never concentrated in a single autocrat. It is distributed across specialized ministerial offices elected by consensus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMOCRATIC_OFFICES.map((office) => (
              <div
                key={office.title}
                className="p-6 rounded-2xl border border-sand-200 bg-ivory-50/60 hover:bg-forest-50/50 hover:border-gold-500/40 transition-all space-y-2"
              >
                <div className="flex items-center gap-2 text-forest-900 font-bold">
                  <Landmark className="w-4 h-4 text-gold-600" />
                  <h4 className="font-display text-base text-charcoal-950">{office.title}</h4>
                </div>
                <p className="text-xs font-semibold text-gold-800">{office.role}</p>
                <p className="text-xs text-charcoal-700 leading-relaxed font-light">{office.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Link to Astronomy */}
        <div className="p-8 rounded-2xl bg-forest-950 text-white border border-gold-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-luxury">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
              <Moon className="w-3.5 h-3.5" />
              <span>Indigenous Astronomy & Timekeeping</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              The 2,300-Year-Old Borana Lunar-Stellar Calendar
            </h3>
            <p className="text-xs text-ivory-200/80 font-light leading-relaxed">
              Explore the 7 anchor stars (*Lamii*, *Buusan*, *Sorsa*), 27 *Ayyaana* astronomical days, and the ancient *Namoratunga* alignment observatory documented by Prof. Asmarom Legesse.
            </p>
          </div>
          <Link
            href="/astronomy"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider transition-all shadow-subtle shrink-0"
          >
            <span>Launch Star Observatory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* People & Cultural Archive from Cloudinary */}
        <CultureCloudinaryGallery />

        {/* Interactive Tula Singing Wells Acoustic Simulator */}
        <section>
          <TulaWellsAcousticExplorer />
        </section>

        {/* Customary Environmental Laws (Seera Marraa fi Bishaan) */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider-editorial text-earth-700">
              <span className="inline-block h-px w-4 bg-gold-600" />
              <span>Customary Ecological Statutes</span>
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-950">
              Seera Marraa fi Bishaan (Laws of Pasture & Water)
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light">
              Traditional covenants established under sacred meeting sycamores that govern wildlife conservation and pasture preservation across the park.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-forest-50 text-forest-800 flex items-center justify-center border border-forest-100">
                <TreePine className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-charcoal-950">1. Kalo Pasture Reserves</h4>
              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                Designated dry-season grass sanctuaries where grazing is prohibited during the rains, providing unhindered forage for wild zebras, gazelles, and migratory herds.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold-50 text-gold-800 flex items-center justify-center border border-gold-100">
                <Droplets className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-charcoal-950">2. Bishaan Water Sanctuary</h4>
              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                Water is legally defined as a non-exclusive divine gift. Denying access to a thirsty traveler, herd, or wild animal is considered a grave moral offense (*Cubbú*).
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-sand-200/80 shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-earth-50 text-earth-800 flex items-center justify-center border border-earth-100">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-charcoal-950">3. Dhaddacha Arbitration</h4>
              <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                All territorial disputes and conservation infractions are arbitrated peacefully under the shade of the sacred *Dhaddacha* tree without carrying weapons.
              </p>
            </div>
          </div>
        </section>

        {/* Responsible Cultural Tourism Etiquette */}
        <div className="bg-white rounded-2xl border border-sand-200/80 p-8 sm:p-12 shadow-subtle space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest-luxury text-earth-700">
              Visitor Guidelines
            </span>
            <h3 className="font-display text-2xl font-bold text-charcoal-950">
              Responsible Cultural Safari Etiquette
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-700 font-light">
              When visiting Gadaa council sites, pastoral villages, and the Singing Wells:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-charcoal-700">
            {[
              'Always be accompanied by a licensed EWCA community scout when visiting traditional wells.',
              'Request explicit permission before photographing community elders or sacred ritual areas.',
              'Do not interrupt the rhythm of chanter lines at the Singing Wells during morning watering shifts.',
              'Support local women’s weaving cooperatives by purchasing directly from certified craft centres in Yabelo.',
              'Remove shoes or headwear when invited into a traditional Borana residential compound (*Odaa*).',
              'Participate respectfully if offered the traditional Buna Qalaa roasted coffee blessing ceremony.',
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-ivory-50 border border-sand-200/80">
                <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                <span className="font-normal">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
