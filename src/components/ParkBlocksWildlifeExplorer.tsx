'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'
import {
  Compass,
  MapPin,
  Mountain,
  TreePine,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Navigation,
  Layers,
  Binoculars,
  Shield,
  Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { cldImage } from '@/lib/cloudinary'

export interface BlockDetail {
  id: string
  name: string
  oromoName: string
  character: string
  coordinates: { lat: number; lng: number; formatted: string }
  distanceFromHQ: string
  elevation: string
  terrain: string
  dominantFlora: string
  accessTip: string
  bestViewingHours: string
  image: string
  animals: {
    name: string
    scientificName: string
    status: 'CR' | 'EN' | 'VU' | 'NT' | 'LC'
    statusLabel: string
    category: 'Mammals' | 'Birds' | 'Endemics'
    habitatNote: string
    viewingTip: string
    image: string
    slug: string
  }[]
}

export const PARK_BLOCKS_DATA: BlockDetail[] = [
  {
    id: 'dida-hara',
    name: 'Dida-Hara Block',
    oromoName: 'Dida Haaraa',
    character: 'Drought-resistant woodland & open savanna. Highest mammal density and premier ecotourism research site.',
    coordinates: { lat: 4.965, lng: 38.172, formatted: '4.965°N, 38.172°E' },
    distanceFromHQ: '25 km Northeast of Yabelo HQ',
    elevation: '1,550 m – 1,720 m ASL',
    terrain: 'Gently undulating acacia woodland savanna with red volcanic soils',
    dominantFlora: 'Boscia mossambicensis, Acacia tortilis, Commiphora africana',
    accessTip: 'Direct 4WD safari trail via Yabelo Main Gate. Smooth dry-season tracks.',
    bestViewingHours: 'Dawn (06:30 – 09:30) & Dusk (16:30 – 18:30)',
    image: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_1200,h_800,c_fill,q_auto'),
    animals: [
      {
        name: "Grevy's Zebra",
        scientificName: 'Equus grevyi',
        status: 'EN',
        statusLabel: 'Endangered',
        category: 'Endemics',
        habitatNote: 'Territorial stallions defend home ranges up to 10 km² near water pans.',
        viewingTip: 'Early morning game drives along central watering pans.',
        image: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'grevys-zebra',
      },
      {
        name: 'Plains Zebra',
        scientificName: 'Equus quagga',
        status: 'LC',
        statusLabel: 'Least Concern',
        category: 'Mammals',
        habitatNote: 'Forms social family harems grazing sympatrically alongside Grevy’s zebras.',
        viewingTip: 'Open grass meadows feeding during morning hours.',
        image: cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'plains-zebra',
      },
      {
        name: 'Beisa Oryx',
        scientificName: 'Oryx beisa beisa',
        status: 'EN',
        statusLabel: 'Endangered',
        category: 'Mammals',
        habitatNote: 'Desert-adapted antelope roaming in herds of 10–40 individuals.',
        viewingTip: 'Look for spear horns shimmering above whistling thorns.',
        image: cldImage('783592801_122141256603053365_1923857396616899501_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'beisa-oryx',
      },
      {
        name: 'Ethiopian Bushcrow',
        scientificName: 'Zavattariornis stresemanni',
        status: 'EN',
        statusLabel: 'Endangered',
        category: 'Endemics',
        habitatNote: 'Confined to cool micro-climatic thermal pocket (17.5°–20°C).',
        viewingTip: 'Clans foraging on grazed cattle pastures near acacia twig nests.',
        image: cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'ethiopian-bushcrow',
      },
      {
        name: "Gerenuk (Waller's Gazelle)",
        scientificName: 'Litocranius walleri',
        status: 'NT',
        statusLabel: 'Near Threatened',
        category: 'Mammals',
        habitatNote: 'Stands upright on two hind legs to browse high acacia leaflets.',
        viewingTip: 'Thicket margins in mid-morning when browsing succulent shoots.',
        image: cldImage('707545377_122258731046333664_8066991454525016717_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'gerenuk',
      },
      {
        name: 'Somali Ostrich',
        scientificName: 'Struthio molybdophanes',
        status: 'VU',
        statusLabel: 'Vulnerable',
        category: 'Birds',
        habitatNote: 'Cobalt-blue necked desert giant sprinting across open plains.',
        viewingTip: 'Flocks of 4–15 birds walking the open southern edge.',
        image: cldImage('782170688_122141256729053365_672836120563678516_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'somali-ostrich',
      },
    ],
  },
  {
    id: 'sarite',
    name: 'Sarite Block',
    oromoName: 'Sariitee',
    character: 'Vast open tussock grasslands & dry savanna. Classic dual-species zebra grazing and dark-sky wilderness.',
    coordinates: { lat: 4.789, lng: 38.345, formatted: '4.789°N, 38.345°E' },
    distanceFromHQ: '45 km Southeast of Yabelo toward Mega',
    elevation: '1,480 m – 1,650 m ASL',
    terrain: 'Expansive open grass steppe with seasonal water depressions',
    dominantFlora: 'Chrysopogon plumulosus, Cenchrus ciliaris, Acacia drepanolobium',
    accessTip: 'Southern conservancy track via Dubuluk. 4WD vehicle required.',
    bestViewingHours: 'Sunrise (06:00 – 09:00) & Wilderness Stargazing at Night',
    image: cldImage('668110576_1374606031380241_6681634558621259739_n', 'w_1200,h_800,c_fill,q_auto'),
    animals: [
      {
        name: "Grevy's Zebra",
        scientificName: 'Equus grevyi',
        status: 'EN',
        statusLabel: 'Endangered',
        category: 'Endemics',
        habitatNote: 'Breeding populations grazing alongside cattle herds under customary covenants.',
        viewingTip: 'Expansive grassland basins at dawn.',
        image: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'grevys-zebra',
      },
      {
        name: 'Plains Zebra',
        scientificName: 'Equus quagga',
        status: 'LC',
        statusLabel: 'Least Concern',
        category: 'Mammals',
        habitatNote: 'Large migratory harems sharing savanna grazing.',
        viewingTip: 'Around seasonal watering pans and grass glades.',
        image: cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'plains-zebra',
      },
      {
        name: 'African Lion',
        scientificName: 'Panthera leo',
        status: 'VU',
        statusLabel: 'Vulnerable',
        category: 'Mammals',
        habitatNote: 'Resident prides patrolling the open plains and granite kopjes.',
        viewingTip: 'Early morning game drives around granite inselbergs.',
        image: cldImage('668120447_1374606164713561_8675150383045939896_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'african-lion',
      },
      {
        name: 'Kori Bustard',
        scientificName: 'Ardeotis kori',
        status: 'NT',
        statusLabel: 'Near Threatened',
        category: 'Birds',
        habitatNote: 'World’s heaviest flying bird, striding deliberately across short grass.',
        viewingTip: 'Mid-day open plains foraging for grasshoppers and lizards.',
        image: cldImage('782170688_122141256729053365_672836120563678516_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'kori-bustard',
      },
      {
        name: 'Beisa Oryx',
        scientificName: 'Oryx beisa beisa',
        status: 'EN',
        statusLabel: 'Endangered',
        category: 'Mammals',
        habitatNote: 'Endangered oryx herds navigating open pastures.',
        viewingTip: 'Golden hour silhouette against southern horizon.',
        image: cldImage('783592801_122141256603053365_1923857396616899501_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'beisa-oryx',
      },
    ],
  },
  {
    id: 'yabello',
    name: 'Yabello Block',
    oromoName: 'Yaballoo',
    character: 'Park gateway & headquarters. Highland granite inselbergs, acacia woodlands, and core Bushcrow habitat.',
    coordinates: { lat: 4.887, lng: 38.083, formatted: '4.887°N, 38.083°E' },
    distanceFromHQ: 'At Yabelo Gateway (Park Headquarters)',
    elevation: '1,750 m – 2,050 m ASL',
    terrain: 'Rocky granitic inselbergs, foothill kopjes, and mixed acacia woodland',
    dominantFlora: 'Acacia drepanolobium, Acacia brevispica, Aloe megalacantha',
    accessTip: 'Directly off the paved Trans-African Highway. Perfect base for birding.',
    bestViewingHours: 'Morning Avian Walk (07:00 – 11:00)',
    image: cldImage('707739665_1417594383748072_8777943947648670810_n', 'w_1200,h_800,c_fill,q_auto'),
    animals: [
      {
        name: 'Ethiopian Bushcrow',
        scientificName: 'Zavattariornis stresemanni',
        status: 'EN',
        statusLabel: 'Endangered',
        category: 'Endemics',
        habitatNote: 'Highland thorn savanna surrounding Yabelo town and sanctuary buffer.',
        viewingTip: 'Observe communal dome nests in acacia forks near headquarters.',
        image: cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'ethiopian-bushcrow',
      },
      {
        name: 'White-tailed Swallow',
        scientificName: 'Hirundo megaensis',
        status: 'VU',
        statusLabel: 'Vulnerable',
        category: 'Endemics',
        habitatNote: 'Highland plateau glades; nesting under rocky culverts and eaves.',
        viewingTip: 'Skimming low over grassy ridges during warm sunny mornings.',
        image: cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'white-tailed-swallow',
      },
      {
        name: 'Black-fronted Spurfowl',
        scientificName: 'Pternistis atrifrons',
        status: 'VU',
        statusLabel: 'Vulnerable',
        category: 'Endemics',
        habitatNote: 'Dense thorny scrub on rocky foothill slopes.',
        viewingTip: 'Calling from termite mounds at dawn.',
        image: cldImage('667812556_1374606328046878_2299729915640711788_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'black-fronted-spurfowl',
      },
      {
        name: 'Vulturine Guineafowl',
        scientificName: 'Acryllium vulturinum',
        status: 'LC',
        statusLabel: 'Least Concern',
        category: 'Birds',
        habitatNote: 'Cobalt-blue social flocks along sandy trails and foothill bush.',
        viewingTip: 'Trotting in flocks of 30–50 birds along roadsides.',
        image: cldImage('667812556_1374606328046878_2299729915640711788_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'vulturine-guineafowl',
      },
    ],
  },
  {
    id: 'gammedo',
    name: 'Gammedo Block',
    oromoName: 'Gammoojjii Gammeedo',
    character: 'Semi-arid backcountry bushland & vital dry-season wildlife corridor.',
    coordinates: { lat: 4.62, lng: 38.45, formatted: '4.620°N, 38.450°E' },
    distanceFromHQ: '60 km East of Yabelo in backcountry',
    elevation: '1,350 m – 1,580 m ASL',
    terrain: 'Dense commiphora scrub, dry seasonal luggas (riverbeds), and red sand plains',
    dominantFlora: 'Commiphora africana, Acacia reficiens, Boswellia resin species',
    accessTip: 'Eastern 4WD overland trail via Finchawa. Wilderness escort required.',
    bestViewingHours: 'Early Morning & Late Afternoon',
    image: cldImage('666892056_1374606258046885_5010924787227253853_n', 'w_1200,h_800,c_fill,q_auto'),
    animals: [
      {
        name: 'Greater Kudu',
        scientificName: 'Tragelaphus strepsiceros',
        status: 'LC',
        statusLabel: 'Least Concern',
        category: 'Mammals',
        habitatNote: 'Spiral-horned bulls browsing in dense commiphora thickets.',
        viewingTip: 'Early morning along dry riverbed margins.',
        image: cldImage('714881540_1425095369664640_1560666463367040759_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'greater-kudu',
      },
      {
        name: "Gerenuk (Waller's Gazelle)",
        scientificName: 'Litocranius walleri',
        status: 'NT',
        statusLabel: 'Near Threatened',
        category: 'Mammals',
        habitatNote: 'Thrives in dense arid commiphora bushland with high foliage moisture.',
        viewingTip: 'Watch carefully for camouflaged russet coats.',
        image: cldImage('707545377_122258731046333664_8066991454525016717_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'gerenuk',
      },
      {
        name: 'Somali Ostrich',
        scientificName: 'Struthio molybdophanes',
        status: 'VU',
        statusLabel: 'Vulnerable',
        category: 'Birds',
        habitatNote: 'Flocks moving through open corridors between dense thornbush.',
        viewingTip: 'Open gravel pans at mid-morning.',
        image: cldImage('782170688_122141256729053365_672836120563678516_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'somali-ostrich',
      },
      {
        name: 'Beisa Oryx',
        scientificName: 'Oryx beisa beisa',
        status: 'EN',
        statusLabel: 'Endangered',
        category: 'Mammals',
        habitatNote: 'Nomadic herds utilizing the seasonal corridor during dry months.',
        viewingTip: 'Around ephemeral sand river waterpoints.',
        image: cldImage('783592801_122141256603053365_1923857396616899501_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'beisa-oryx',
      },
    ],
  },
  {
    id: 'danbala-dhibayu',
    name: 'Danbala-Dhibayu Block',
    oromoName: 'Danbala Dhibayyuu',
    character: 'Rugged volcanic calderas (El Sod & Magado), karst sinkholes, and dry Afromontane forest.',
    coordinates: { lat: 4.411, lng: 38.305, formatted: '4.411°N, 38.305°E' },
    distanceFromHQ: '70 km South of Yabelo near Mega',
    elevation: '1,600 m – 2,040 m ASL',
    terrain: 'Deep explosion calderas, steep basalt cliffs, and highland forest ridges',
    dominantFlora: 'Juniperus procera, Podocarpus falcatus, Ficus sycomorus, Euphorbia',
    accessTip: '4WD mountain track from Mega or Dubuluk. Sturdy hiking boots essential.',
    bestViewingHours: 'Morning Caldera Rim Hike (07:30 – 12:00)',
    image: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_1200,h_800,c_fill,q_auto'),
    animals: [
      {
        name: "Prince Ruspoli's Turaco",
        scientificName: 'Tauraco ruspolii',
        status: 'VU',
        statusLabel: 'Vulnerable',
        category: 'Endemics',
        habitatNote: 'High canopy of dry Afromontane juniper and wild fig forests near Magado and Arero.',
        viewingTip: 'Listen for loud chuckling calls and watch for crimson wing flashes in the canopy.',
        image: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'prince-ruspolis-turaco',
      },
      {
        name: 'Greater Kudu',
        scientificName: 'Tragelaphus strepsiceros',
        status: 'LC',
        statusLabel: 'Least Concern',
        category: 'Mammals',
        habitatNote: 'Rocky volcanic slopes and dense crater rim vegetation.',
        viewingTip: 'Early morning on the switchback paths of El Sod crater.',
        image: cldImage('714881540_1425095369664640_1560666463367040759_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'greater-kudu',
      },
      {
        name: 'African Lion',
        scientificName: 'Panthera leo',
        status: 'VU',
        statusLabel: 'Vulnerable',
        category: 'Mammals',
        habitatNote: 'Uses elevated rocky volcanic kopjes as lookouts over surrounding plains.',
        viewingTip: 'Resting on warm basalt boulders in late afternoon.',
        image: cldImage('668120447_1374606164713561_8675150383045939896_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'african-lion',
      },
      {
        name: 'Vulturine Guineafowl',
        scientificName: 'Acryllium vulturinum',
        status: 'LC',
        statusLabel: 'Least Concern',
        category: 'Birds',
        habitatNote: 'Forages in dry scrub along the lower crater terraces.',
        viewingTip: 'Flocks running along rocky trails at sunrise.',
        image: cldImage('667812556_1374606328046878_2299729915640711788_n', 'w_600,h_400,c_fill,q_auto'),
        slug: 'vulturine-guineafowl',
      },
    ],
  },
]

// All unique animals extracted for the Animal-to-Block lookup
export const ALL_FLAGSHIP_ANIMALS = [
  {
    name: "Grevy's Zebra",
    slug: 'grevys-zebra',
    status: 'EN',
    statusLabel: 'Endangered',
    scientific: 'Equus grevyi',
    blocksFound: ['dida-hara', 'sarite'],
    img: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: 'Ethiopian Bushcrow',
    slug: 'ethiopian-bushcrow',
    status: 'EN',
    statusLabel: 'Endangered',
    scientific: 'Zavattariornis stresemanni',
    blocksFound: ['yabello', 'dida-hara'],
    img: cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: "Prince Ruspoli's Turaco",
    slug: 'prince-ruspolis-turaco',
    status: 'VU',
    statusLabel: 'Vulnerable',
    scientific: 'Tauraco ruspolii',
    blocksFound: ['danbala-dhibayu'],
    img: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: 'White-tailed Swallow',
    slug: 'white-tailed-swallow',
    status: 'VU',
    statusLabel: 'Vulnerable',
    scientific: 'Hirundo megaensis',
    blocksFound: ['yabello', 'dida-hara'],
    img: cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: 'Beisa Oryx',
    slug: 'beisa-oryx',
    status: 'EN',
    statusLabel: 'Endangered',
    scientific: 'Oryx beisa beisa',
    blocksFound: ['dida-hara', 'sarite', 'gammedo'],
    img: cldImage('783592801_122141256603053365_1923857396616899501_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: 'Gerenuk',
    slug: 'gerenuk',
    status: 'NT',
    statusLabel: 'Near Threatened',
    scientific: 'Litocranius walleri',
    blocksFound: ['dida-hara', 'gammedo'],
    img: cldImage('707545377_122258731046333664_8066991454525016717_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: 'African Lion',
    slug: 'african-lion',
    status: 'VU',
    statusLabel: 'Vulnerable',
    scientific: 'Panthera leo',
    blocksFound: ['sarite', 'danbala-dhibayu'],
    img: cldImage('668120447_1374606164713561_8675150383045939896_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: 'Somali Ostrich',
    slug: 'somali-ostrich',
    status: 'VU',
    statusLabel: 'Vulnerable',
    scientific: 'Struthio molybdophanes',
    blocksFound: ['dida-hara', 'sarite', 'gammedo'],
    img: cldImage('782170688_122141256729053365_672836120563678516_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: 'Plains Zebra',
    slug: 'plains-zebra',
    status: 'LC',
    statusLabel: 'Least Concern',
    scientific: 'Equus quagga',
    blocksFound: ['dida-hara', 'sarite'],
    img: cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_400,h_300,c_fill,q_auto'),
  },
  {
    name: 'Greater Kudu',
    slug: 'greater-kudu',
    status: 'LC',
    statusLabel: 'Least Concern',
    scientific: 'Tragelaphus strepsiceros',
    blocksFound: ['danbala-dhibayu', 'gammedo'],
    img: cldImage('714881540_1425095369664640_1560666463367040759_n', 'w_400,h_300,c_fill,q_auto'),
  },
]

export default function ParkBlocksWildlifeExplorer() {
  const [activeTab, setActiveTab] = useState<'by-block' | 'by-animal'>('by-block')
  const [selectedBlockId, setSelectedBlockId] = useState<string>('dida-hara')
  const [selectedAnimalSlug, setSelectedAnimalSlug] = useState<string>('grevys-zebra')

  const currentBlock = PARK_BLOCKS_DATA.find((b) => b.id === selectedBlockId) || PARK_BLOCKS_DATA[0]
  const currentAnimal = ALL_FLAGSHIP_ANIMALS.find((a) => a.slug === selectedAnimalSlug) || ALL_FLAGSHIP_ANIMALS[0]
  const blocksHostingAnimal = PARK_BLOCKS_DATA.filter((b) => currentAnimal.blocksFound.includes(b.id))

  return (
    <section className="bg-white rounded-3xl border border-sand-200 shadow-card overflow-hidden">
      {/* Top Header & Mode Toggle */}
      <div className="bg-forest-950 text-white p-6 sm:p-10 border-b border-forest-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>Tourist Spatial Guide &amp; Wildlife Habitat Finder</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight">
              Where to Find Wildlife in Borana
            </h2>
            <p className="text-xs sm:text-sm text-ivory-200/85 font-light leading-relaxed">
              Explore the 5 physical conservation blocks of Borana National Park, their exact geographic coordinates, and the specific wildlife species inhabiting each sector.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-forest-900/90 p-1.5 rounded-xl border border-forest-700/80 shrink-0">
            <button
              onClick={() => setActiveTab('by-block')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all',
                activeTab === 'by-block'
                  ? 'bg-gold-500 text-charcoal-950 shadow-sm'
                  : 'text-ivory-300 hover:text-white'
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explore by Block</span>
            </button>
            <button
              onClick={() => setActiveTab('by-animal')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all',
                activeTab === 'by-animal'
                  ? 'bg-gold-500 text-charcoal-950 shadow-sm'
                  : 'text-ivory-300 hover:text-white'
              )}
            >
              <Binoculars className="w-3.5 h-3.5" />
              <span>Find by Animal</span>
            </button>
          </div>
        </div>

        {/* Horizontal Block Selector Pills (when in by-block mode) */}
        {activeTab === 'by-block' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {PARK_BLOCKS_DATA.map((block) => {
              const isSelected = block.id === selectedBlockId
              return (
                <button
                  key={block.id}
                  onClick={() => setSelectedBlockId(block.id)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide shrink-0 transition-all flex items-center gap-2.5 border',
                    isSelected
                      ? 'bg-white text-forest-950 border-gold-400 shadow-md ring-2 ring-gold-400/30'
                      : 'bg-forest-900/60 text-ivory-200 border-forest-800 hover:border-forest-700 hover:bg-forest-900'
                  )}
                >
                  <MapPin className={cn('w-3.5 h-3.5', isSelected ? 'text-forest-800' : 'text-gold-400')} />
                  <span>{block.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({block.animals.length} species)</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Horizontal Animal Selector Pills (when in by-animal mode) */}
        {activeTab === 'by-animal' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            {ALL_FLAGSHIP_ANIMALS.map((animal) => {
              const isSelected = animal.slug === selectedAnimalSlug
              return (
                <button
                  key={animal.slug}
                  onClick={() => setSelectedAnimalSlug(animal.slug)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide shrink-0 transition-all flex items-center gap-2 border',
                    isSelected
                      ? 'bg-white text-forest-950 border-gold-400 shadow-md ring-2 ring-gold-400/30'
                      : 'bg-forest-900/60 text-ivory-200 border-forest-800 hover:border-forest-700 hover:bg-forest-900'
                  )}
                >
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  <span>{animal.name}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Mode 1: Detailed View by Block */}
      {activeTab === 'by-block' && (
        <div className="p-6 sm:p-10 space-y-8 bg-ivory-50/40">
          {/* Block Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Physical Orientation Card */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-sand-200 shadow-subtle space-y-5">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-forest-950 border border-sand-200">
                <OptimizedImage
                  src={currentBlock.image}
                  alt={currentBlock.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-gold-400 border border-forest-800">
                  {currentBlock.oromoName}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold text-charcoal-950">{currentBlock.name}</h3>
                <p className="text-xs text-charcoal-700 leading-relaxed font-light">{currentBlock.character}</p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-sand-100 text-xs text-charcoal-700">
                <div className="flex items-center justify-between py-1 border-b border-sand-100/60">
                  <span className="font-semibold text-charcoal-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-forest-800" /> GPS Coordinates:
                  </span>
                  <span className="font-mono text-forest-900 font-bold">{currentBlock.coordinates.formatted}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-sand-100/60">
                  <span className="font-semibold text-charcoal-900 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-forest-800" /> Distance from HQ:
                  </span>
                  <span>{currentBlock.distanceFromHQ}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-sand-100/60">
                  <span className="font-semibold text-charcoal-900 flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-forest-800" /> Elevation:
                  </span>
                  <span>{currentBlock.elevation}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-sand-100/60">
                  <span className="font-semibold text-charcoal-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-forest-800" /> Peak Viewing:
                  </span>
                  <span className="font-medium text-earth-800">{currentBlock.bestViewingHours}</span>
                </div>
                <div className="pt-1 text-[11px] text-charcoal-600">
                  <strong className="font-medium text-charcoal-900">Access:</strong> {currentBlock.accessTip}
                </div>
              </div>

              <Link
                href={`/map?focus=${encodeURIComponent(currentBlock.name)}&lat=${currentBlock.coordinates.lat}&lng=${currentBlock.coordinates.lng}`}
                className="w-full py-2.5 px-4 bg-forest-950 hover:bg-forest-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all text-center inline-flex items-center justify-center gap-2 shadow-subtle"
              >
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Open Physical Location on GIS Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Right: Key Wildlife Species Found Here */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-xl text-charcoal-950">
                    Wildlife Found in {currentBlock.name}
                  </h4>
                  <p className="text-xs text-charcoal-600 font-light">
                    {currentBlock.animals.length} documented flagship species active in this sector
                  </p>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-forest-100 text-forest-900 border border-forest-200">
                  Verified Survey Data
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentBlock.animals.map((animal) => (
                  <div
                    key={animal.name}
                    className="bg-white rounded-2xl border border-sand-200/90 overflow-hidden shadow-subtle hover:border-gold-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-forest-950">
                        <OptimizedImage
                          src={animal.image}
                          alt={animal.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 30vw"
                          className="object-cover"
                        />
                        <div className="absolute top-2.5 right-2.5">
                          <span
                            className={cn(
                              'text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-sm text-white',
                              animal.status === 'CR'
                                ? 'bg-red-700'
                                : animal.status === 'EN'
                                ? 'bg-rose-600'
                                : animal.status === 'VU'
                                ? 'bg-amber-600'
                                : 'bg-emerald-700'
                            )}
                          >
                            {animal.statusLabel}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div>
                          <h5 className="font-display font-bold text-base text-charcoal-950">{animal.name}</h5>
                          <p className="text-[11px] font-mono italic text-charcoal-600">{animal.scientificName}</p>
                        </div>
                        <p className="text-xs text-charcoal-700 leading-relaxed font-light">
                          {animal.habitatNote}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <div className="p-2.5 rounded-lg bg-sand-50 border border-sand-200/70 text-[11px] text-charcoal-700 space-y-1">
                        <p className="font-semibold text-forest-900 flex items-center gap-1">
                          <Binoculars className="w-3 h-3 text-gold-600" /> Viewing Tip:
                        </p>
                        <p className="font-light">{animal.viewingTip}</p>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <Link
                          href={`/wildlife/${animal.slug}`}
                          className="text-[11px] font-bold text-forest-900 hover:text-gold-700 inline-flex items-center gap-1"
                        >
                          <span>Species Dossier</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Find Block by Animal */}
      {activeTab === 'by-animal' && (
        <div className="p-6 sm:p-10 space-y-8 bg-ivory-50/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Animal Profile Card */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-sand-200 shadow-subtle space-y-5">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-forest-950 border border-sand-200">
                <OptimizedImage
                  src={currentAnimal.img}
                  alt={currentAnimal.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-sm text-white',
                      currentAnimal.status === 'CR'
                        ? 'bg-red-700'
                        : currentAnimal.status === 'EN'
                        ? 'bg-rose-600'
                        : currentAnimal.status === 'VU'
                        ? 'bg-amber-600'
                        : 'bg-emerald-700'
                    )}
                  >
                    {currentAnimal.statusLabel}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-charcoal-950">{currentAnimal.name}</h3>
                <p className="text-xs font-mono italic text-charcoal-600">{currentAnimal.scientific}</p>
                <p className="text-xs text-charcoal-700 leading-relaxed font-light pt-1">
                  This species is recorded in <strong>{blocksHostingAnimal.length}</strong> specific conservation blocks within Borana National Park.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/wildlife/${currentAnimal.slug}`}
                  className="w-full py-2.5 px-4 bg-forest-950 hover:bg-forest-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all text-center inline-flex items-center justify-center gap-2 shadow-subtle"
                >
                  <Eye className="w-3.5 h-3.5 text-gold-400" />
                  <span>Read Full Taxonomic Species Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Specific Blocks Where Animal is Found */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h4 className="font-display font-bold text-xl text-charcoal-950">
                  Where to Spot {currentAnimal.name}
                </h4>
                <p className="text-xs text-charcoal-600 font-light">
                  Select a conservation block below to review its physical location and access routes
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {blocksHostingAnimal.map((block) => (
                  <div
                    key={block.id}
                    className="bg-white p-5 rounded-2xl border border-sand-200/90 shadow-subtle hover:border-gold-500/60 transition-all flex flex-col sm:flex-row gap-5 items-start justify-between"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-forest-800" />
                        <h5 className="font-display font-bold text-lg text-charcoal-950">{block.name}</h5>
                        <span className="text-[10px] font-mono text-earth-800 bg-sand-100 px-2 py-0.5 rounded">
                          {block.oromoName}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-700 leading-relaxed font-light">{block.character}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-charcoal-600 pt-1">
                        <span><strong>GPS:</strong> {block.coordinates.formatted}</span>
                        <span><strong>Distance:</strong> {block.distanceFromHQ}</span>
                        <span><strong>Peak:</strong> {block.bestViewingHours}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setSelectedBlockId(block.id)
                          setActiveTab('by-block')
                        }}
                        className="px-4 py-2 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 text-xs font-bold uppercase tracking-wider transition-all text-center"
                      >
                        Inspect Sector
                      </button>
                      <Link
                        href={`/map?focus=${encodeURIComponent(block.name)}&lat=${block.coordinates.lat}&lng=${block.coordinates.lng}`}
                        className="px-4 py-2 rounded-lg bg-forest-950 hover:bg-forest-900 text-white text-xs font-bold uppercase tracking-wider transition-all text-center inline-flex items-center justify-center gap-1.5 shadow-subtle"
                      >
                        <MapPin className="w-3 h-3 text-gold-400" />
                        <span>View on Map</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
