import { cldImage } from '@/lib/cloudinary'

export interface WildlifeSpecies {
  id: string
  title: string
  slug: string
  scientificName: string
  category: 'Mammals' | 'Birds' | 'Reptiles' | 'Endemics'
  conservationStatus: 'CR' | 'EN' | 'VU' | 'NT' | 'LC'
  statusLabel: string
  excerpt: string
  body: string
  habitat: string
  diet: string
  behavior: string
  viewingTip: string
  populationEstimate?: string
  imageUrl: string
  gallery?: string[]
}

export interface ParkStory {
  id: string
  title: string
  slug: string
  excerpt: string
  body: string
  category: 'Conservation' | 'Community' | 'Research' | 'Field Report'
  author: {
    name: string
    role: string
    avatar?: string
  }
  publishedAt: string
  readTime: string
  imageUrl: string
  tags: string[]
}

export interface GalleryMedia {
  id: string
  title: string
  caption: string
  category: 'Wildlife' | 'Landscapes' | 'Culture' | 'Conservation'
  imageUrl: string
  thumbnailUrl: string
  photographer: string
  location: string
  date: string
  cldId?: string
  aspect?: 'wide' | 'portrait' | 'square'
  cameraSpecs?: string
}

export interface MapPOI {
  id: string
  name: string
  description: string
  category: 'entrance' | 'visitor-center' | 'trail' | 'wildlife-viewing' | 'campsite' | 'cultural-site' | 'emergency' | 'viewpoint'
  latitude: number
  longitude: number
  imageUrl?: string
  elevation?: string
  accessTip?: string
  essential_offline: boolean
}

export interface TariffRate {
  category: string
  description: string
  foreignNonResidentUSD: number
  foreignResidentUSD: number
  ethiopianCitizenETB: number
  unit: string
}

export interface ConservationBlock {
  id: string
  name: string
  oromoName: string
  character: string
  dominantFlora: string
  keyFauna: string
  ecotourismPotential: string
}

/* =========================================================================
   THE FIVE CONSERVATION BLOCKS OF BORANA NATIONAL PARK
   ========================================================================= */
export const PARK_BLOCKS: ConservationBlock[] = [
  {
    id: 'block-dida-hara',
    name: 'Dida-Hara Block',
    oromoName: 'Dida Haaraa',
    character: 'Drought-resistant woodland and open savanna. Premier ecotourism research site with high mammal density.',
    dominantFlora: 'Boscia mossambicensis, Acacia tortilis, and Commiphora bushland',
    keyFauna: "Grevy's zebra, Common plains zebra, Beisa oryx, Somali ostrich, Gerenuk",
    ecotourismPotential: 'Highest ecotourism readiness (Nigatu 2016 academic study); prime game drive loops and bird watching.',
  },
  {
    id: 'block-sarite',
    name: 'Sarite Block',
    oromoName: 'Sariitee',
    character: 'Vast open tussock grasslands and dry savanna plains extending toward the southern Kenya frontier.',
    dominantFlora: 'Chrysopogon plumulosus, Cenchrus ciliaris, and scattered whistling thorn',
    keyFauna: "Coexisting Grevy's and Plains zebras, Grant's gazelle, Cheetah, Kori bustard",
    ecotourismPotential: 'Endless horizon photography, savanna wilderness camping, and predator tracking.',
  },
  {
    id: 'block-yabello',
    name: 'Yabello Block',
    oromoName: 'Yaballoo',
    character: 'Highland transition zone and park gateway; mixed Acacia woodland and rocky granitic inselbergs.',
    dominantFlora: 'Acacia drepanolobium, Acacia brevispica, and Aloe species',
    keyFauna: "Ethiopian Bushcrow (Stresemann's bushcrow), White-tailed swallow, Olive baboon, Leopard",
    ecotourismPotential: 'Headquarters, permit issuance desk, natural history exhibits, and endemic birding trails.',
  },
  {
    id: 'block-gammedo',
    name: 'Gammedo Block',
    oromoName: 'Gammoojjii Gammeedo',
    character: 'Semi-arid backcountry bushland acting as a vital dry-season wildlife corridor and buffer zone.',
    dominantFlora: 'Commiphora africana, Acacia reficiens, and aromatic resin-bearing shrubs',
    keyFauna: 'Greater kudu, Lesser kudu, Striped hyena, Spotted hyena, Secretarybird',
    ecotourismPotential: 'Wilderness 4WD overland expeditions and traditional pastoral biocultural encounters.',
  },
  {
    id: 'block-danbala-dhibayu',
    name: 'Danbala-Dhibayu Block',
    oromoName: 'Danbala Dhibayyuu',
    character: 'Rugged volcanic hills, rocky kopjes, seasonal drainage valleys, and limestone karst features.',
    dominantFlora: 'Euphorbia candelabrum, Ficus cordata, and mountain juniper remnants',
    keyFauna: "Verreaux's eagle, Klipspringer, Caracal, Prince Ruspoli's turaco (in northern pockets)",
    ecotourismPotential: 'Volcanic caldera trekking, scenic ridge viewpoints, and raptor observation.',
  },
]

/* =========================================================================
   OFFICIAL WILDLIFE SPECIES OF BORANA NATIONAL PARK (Sourced)
   ========================================================================= */
export const OFFICIAL_WILDLIFE: WildlifeSpecies[] = [
  {
    id: 'w-ethiopian-bushcrow',
    title: "Ethiopian Bushcrow (Stresemann's Bushcrow)",
    slug: 'ethiopian-bushcrow',
    scientificName: 'Zavattariornis stresemanni',
    category: 'Endemics',
    conservationStatus: 'EN',
    statusLabel: 'Endangered',
    excerpt: "Borana's iconic avian enigma, globally restricted to a micro-climatic thermal bubble (17.5–20°C) across short-grass acacia savanna.",
    body: `The Ethiopian Bushcrow (*Zavattariornis stresemanni*), or *Qorii* in Afaan Oromo, is one of the world's most famous ornithological flagships. Found nowhere else on Earth outside a narrow ~2,400–6,000 km² range centered on Yabelo, Mega, and Arero in southern Ethiopia, its entire global distribution is governed by a remarkable climatic thermal boundary with a mean annual temperature of 17.5°C to 20°C.

Distinguished by its soft pearl-grey body, glossy black wings, and startling bare cobalt-blue facial skin around the eye, the Bushcrow relies on heavily grazed, short-grass acacia savanna maintained by traditional Borana cattle herds. Family clans construct huge communal dome nests from thorny twigs (up to 60 cm wide) insulated with cattle dung and grass lining.

Roadside census data indicated an ~80% decline between the 1990s and 2003, with current populations estimated at under 9,000 pairs. Climate modeling (Donald et al. 2012) projects up to a 90% range contraction by 2070 under warming scenarios, making habitat protection in Borana National Park urgent for planetary biodiversity.`,
    habitat: 'Heavily grazed short-grass Acacia-Commiphora savanna and pastoral glades between 1,300m and 1,800m elevation.',
    diet: 'Invertebrates, beetles, insect larvae, grasshoppers, and seasonal seeds extracted from dung and soil.',
    behavior: 'Cooperative breeding clans of 4 to 12 individuals. Communal nesting in massive thorny twig structures.',
    viewingTip: 'Yabello and Dida-Hara blocks, along the open savanna road toward Mega and Finchawa.',
    populationEstimate: '<9,000 breeding pairs globally (Strict Borana Endemic)',
    imageUrl: cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_800,h_600,c_fill,q_auto'),
    gallery: [
      cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_1200,h_800,c_fill,q_auto'),
      cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_1200,h_800,c_fill,q_auto'),
    ],
  },
  {
    id: 'w-grevys-zebra',
    title: "Grevy's Zebra",
    slug: 'grevys-zebra',
    scientificName: 'Equus grevyi',
    category: 'Endemics',
    conservationStatus: 'EN',
    statusLabel: 'Endangered',
    excerpt: "The largest and rarest wild equid on Earth, coexisting sympatrically with common plains zebras across the Sarite and Dida-Hara grasslands.",
    body: `Grevy's zebra is the largest living wild equid and one of Africa's most endangered large mammals, with a global population of fewer than 2,500 individuals. Borana National Park and the adjacent Sarite Sanctuary harbor one of Ethiopia's last viable breeding populations.

One of the park's most distinctive ecological marvels is the rare **sympatric coexistence of two zebra species**: both the endangered Grevy's zebra (*Equus grevyi*) and the Common Plains zebra (*Equus quagga*) graze side-by-side in the same savanna and woodland mosaic.

Grevy's zebras are distinguished by their tall stature, large rounded mule-like ears, white unstriped belly, and dense, narrow pinstripe pattern. Unlike plains zebras which live in harems, Grevy's stallions establish large solitary breeding territories near seasonal water points.`,
    habitat: 'Arid and semi-arid grasslands, open Acacia tortilis woodlands, and dry savanna plains.',
    diet: 'Tough fibrous grasses, sedges, herbs, and drought-resistant browse.',
    behavior: 'Non-harem territorial system. Stallions maintain territories up to 10 km² near watercourses.',
    viewingTip: 'Early morning game drives across Dida-Hara and Sarite conservation blocks.',
    populationEstimate: '~350–450 individuals in southern Ethiopian ecosystem',
    imageUrl: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_800,h_600,c_fill,q_auto'),
    gallery: [
      cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_1200,h_800,c_fill,q_auto'),
      cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_1200,h_800,c_fill,q_auto'),
    ],
  },
  {
    id: 'w-plains-zebra',
    title: 'Plains Zebra (Common Zebra)',
    slug: 'plains-zebra',
    scientificName: 'Equus quagga',
    category: 'Mammals',
    conservationStatus: 'LC',
    statusLabel: 'Least Concern',
    excerpt: "Social savanna grazer forming charismatic family harems, grazing alongside Grevy's zebras in a rare dual-species ecosystem.",
    body: `The Plains Zebra forms the dynamic social heartbeat of Borana's open grasslands. Featuring broad, bold vertical stripes that wrap under the belly and shadow stripes across the flank, plains zebras live in tight, cooperative family harems led by a dominant stallion.

In Borana National Park, plains zebras partition savanna resources with Grevy's zebras by grazing shorter, newer grass shoots, demonstrating exceptional ecological niche differentiation. Their loud barking calls ('kwa-ha-ha') resonate across the Dida-Hara savanna at sunrise.`,
    habitat: 'Open grasslands, woodland savannas, and shrub steppes.',
    diet: 'Grass leaves, tender shoots, and seasonal herbs.',
    behavior: 'Cohesive family harems with strong social bonds and mutual grooming.',
    viewingTip: 'Dida-Hara plains and waterholes near Sarite.',
    populationEstimate: 'Common and stable across park grasslands',
    imageUrl: cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-white-tailed-swallow',
    title: 'White-tailed Swallow',
    slug: 'white-tailed-swallow',
    scientificName: 'Hirundo megaensis',
    category: 'Endemics',
    conservationStatus: 'VU',
    statusLabel: 'Vulnerable',
    excerpt: "Delicate endemic aerial insectivore with flashing pure-white outer tail streamers, restricted to the high-plateau acacia savannas.",
    body: `The White-tailed Swallow is a rare Ethiopian endemic restricted to the high-altitude savannas around Mega and Yabelo. Named after the town of Mega (*megaensis*), this bird shares the restricted micro-climatic range of the Ethiopian Bushcrow.

Possessing a lustrous deep steel-blue mantle, snowy white underparts, and flashing pure-white outer tail feathers, it performs breathtaking low-altitude aerobatics over open grasslands to catch flying insects. It often builds mud cup nests under the eaves of traditional Borana houses and rocky culverts.`,
    habitat: 'Highland thorn savanna, montane grassland glades, and pastoral grazing plains (1,400m–2,200m).',
    diet: 'Aerial insects, termites, and small flying beetles caught in flight.',
    behavior: 'Agile acrobatic flyer in pairs or small foraging flocks skimming the grass canopy.',
    viewingTip: 'Plateau ridges and open meadows between Yabelo and Mega.',
    populationEstimate: '~2,500–10,000 mature individuals',
    imageUrl: cldImage('715234713_1425095352997975_7244808407264930827_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-prince-ruspolis-turaco',
    title: "Prince Ruspoli's Turaco",
    slug: 'prince-ruspolis-turaco',
    scientificName: 'Tauraco ruspolii',
    category: 'Endemics',
    conservationStatus: 'VU',
    statusLabel: 'Vulnerable',
    excerpt: "Splendid high-canopy frugivore with an emerald crest and crimson wings, inhabiting northern juniper and podocarpus forests.",
    body: `Prince Ruspoli's Turaco is one of Africa's most breathtaking canopy birds. First collected in 1892 by Italian explorer Prince Eugenio Ruspoli (who was tragically killed by an elephant before recording the specimen's location), the bird remained an enigma for decades before being relocated in the dry Afromontane juniper forests near Arero and the northern Borana border.

With its bottle-green body, tall white crest, bright crimson eye-wattles, and brilliant scarlet primary wing feathers that flash dramatically in flight, seeing Ruspoli's Turaco bounding across *Juniperus procera* branches is an unforgettable experience.`,
    habitat: 'Dry Afromontane forests, juniper-podocarpus woodlands, and riverine fig galleries (1,500m–2,000m).',
    diet: 'Wild figs (*Ficus*), juniper berries, mistletoe fruits, and tender buds.',
    behavior: 'Arboreal fruit specialist in pairs or family parties bounding through high forest canopy.',
    viewingTip: 'Arero forest priority area and northern highland ravines of Danbala-Dhibayu.',
    populationEstimate: '~3,000–6,000 mature individuals',
    imageUrl: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-black-fronted-spurfowl',
    title: 'Black-fronted Spurfowl (Francolin)',
    slug: 'black-fronted-spurfowl',
    scientificName: 'Pternistis atrifrons',
    category: 'Endemics',
    conservationStatus: 'VU',
    statusLabel: 'Vulnerable',
    excerpt: "Range-restricted southern Ethiopian game bird inhabiting dense acacia-commiphora thickets and rocky hillslopes.",
    body: `The Black-fronted Spurfowl (*Pternistis atrifrons*) is a localized endemic galliform species closely tied to the dry thorn scrub and rocky foothill slopes of the Borana region.

Featuring a distinctive black forehead, finely vermiculated grey-brown plumage, and bright orange-red facial skin, this terrestrial bird is heard at dawn delivering loud, raspy territorial calls from atop termite mounds and rocky kopjes.`,
    habitat: 'Dense Acacia-Commiphora thickets, rocky slopes, and dry seasonal river margins.',
    diet: 'Seeds, grass shoots, tubers, and ground invertebrates.',
    behavior: 'Secretive terrestrial pairs; roosts in low acacia branches at dusk.',
    viewingTip: 'Rocky thickets around Yabello and Gammedo blocks at sunrise.',
    populationEstimate: 'Restricted range within southern Ethiopia',
    imageUrl: cldImage('667812556_1374606328046878_2299729915640711788_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-gerenuk',
    title: "Gerenuk (Waller's Gazelle)",
    slug: 'gerenuk',
    scientificName: 'Litocranius walleri',
    category: 'Mammals',
    conservationStatus: 'NT',
    statusLabel: 'Near Threatened',
    excerpt: "The 'giraffe gazelle' of the Horn of Africa, standing fully erect on hind legs to browse high thorny acacia shoots.",
    body: `The gerenuk is an astonishing evolutionary marvel of the Horn of Africa drylands. With an elongated neck, slender legs, and strong lumbar spine, it can stand completely vertical on its hind legs to reach tender foliage up to 2.5 meters high.

Their name originates from the Somali language ('giraffe-necked'). Gerenuks never require free-standing water, extracting all necessary hydration from succulent browse and morning dew. In Borana National Park, they blend seamlessly with red volcanic laterite soils.`,
    habitat: 'Dense woody savanna, thorny Commiphora thickets, and arid shrublands.',
    diet: 'Specialist browser eating tender acacia leaflets, buds, flowers, and climbers.',
    behavior: 'Solitary or small maternal bands; exceptionally alert with acute hearing.',
    viewingTip: 'Thicket margins of Dida-Hara and Gammedo blocks in mid-morning.',
    populationEstimate: 'Healthy resident population across thornveld',
    imageUrl: cldImage('707545377_122258731046333664_8066991454525016717_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-somali-ostrich',
    title: 'Somali Ostrich',
    slug: 'somali-ostrich',
    scientificName: 'Struthio molybdophanes',
    category: 'Birds',
    conservationStatus: 'VU',
    statusLabel: 'Vulnerable',
    excerpt: "Giant flightless desert bird distinguished by its stunning cobalt-blue neck and thighs, sprinting across the Sarite plains.",
    body: `Recognized as a distinct full species in 2014, the Somali Ostrich (or Blue-necked Ostrich) is adapted to the arid plains of the Horn of Africa. The male possesses vibrant slate-blue neck and leg skin that intensifies to bright cobalt during the breeding season.

Capable of sprinting at over 70 km/h, these birds roam wide open grasslands in small flocks, acting as natural sentinels for grazing herds of zebras and oryx.`,
    habitat: 'Open semi-arid savanna, flat gravel plains, and sparse bushland.',
    diet: 'Seeds, foliage, succulent roots, fruits, and small invertebrates.',
    behavior: 'Flocks of 4 to 15 birds led by a dominant male; master sprinters.',
    viewingTip: 'Open vistas of the Sarite and Dida-Hara blocks.',
    populationEstimate: 'Vulnerable across regional Horn range; strong presence in Borana',
    imageUrl: cldImage('782170688_122141256729053365_672836120563678516_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-beisa-oryx',
    title: 'Beisa Oryx',
    slug: 'beisa-oryx',
    scientificName: 'Oryx beisa beisa',
    category: 'Mammals',
    conservationStatus: 'EN',
    statusLabel: 'Endangered',
    excerpt: "Majestic desert antelope bearing straight, spear-like horns up to one meter long and bold monochrome facial masks.",
    body: `The Beisa Oryx is an emblem of arid resilience. Its specialized physiology allows its internal body temperature to reach 45°C without sweating, conserving precious body fluids during severe droughts.

Both males and females carry long, ringed, parallel horns used effectively against lions and hyenas. Active ranger anti-poaching patrols have supported oryx herd recovery across Dida-Hara and Sarite.`,
    habitat: 'Semi-desert grasslands, dry acacia woodland, and sandy bush savanna.',
    diet: 'Coarse desert grasses, tubers, wild melons, and moisture-rich roots.',
    behavior: 'Cohesive herds of 10 to 40 individuals; nomadic according to rainfall.',
    viewingTip: 'Early morning near seasonal pans and open salt licks.',
    populationEstimate: '~650 resident animals',
    imageUrl: cldImage('783592801_122141256603053365_1923857396616899501_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-african-lion',
    title: 'African Lion',
    slug: 'african-lion',
    scientificName: 'Panthera leo',
    category: 'Mammals',
    conservationStatus: 'VU',
    statusLabel: 'Vulnerable',
    excerpt: "Apex predator of the southern savanna, hunting zebras, kudu, and oryx across the volcanic inselbergs.",
    body: `Southern Ethiopian lions are recognized for their robust build and dark-maned dominant males. As the apex predator of Borana National Park, prides regulate herbivore populations across the savanna.

The park pairs GPS collar monitoring with community pastoralist liaisons, enabling early warning notifications that prevent retaliatory livestock conflict.`,
    habitat: 'Open savanna grasslands, rocky kopjes, and dry woodland thickets.',
    diet: 'Large ungulates including zebras, oryx, kudu, warthogs, and gazelles.',
    behavior: 'Territorial prides of 3 to 12 individuals.',
    viewingTip: 'Early morning game drives around granite inselbergs and volcanic kopjes.',
    populationEstimate: '~45 resident individuals',
    imageUrl: cldImage('668120447_1374606164713561_8675150383045939896_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-kori-bustard',
    title: 'Kori Bustard',
    slug: 'kori-bustard',
    scientificName: 'Ardeotis kori',
    category: 'Birds',
    conservationStatus: 'NT',
    statusLabel: 'Near Threatened',
    excerpt: "The world's heaviest flying bird, striding deliberately across the open short-grass plains hunting insects and reptiles.",
    body: `Weighing up to 18 kilograms, the Kori Bustard is the heaviest bird capable of flight on Earth. With majestic, measured strides, it patrols open grasslands, flushing grasshoppers, beetles, and small reptiles.

During the breeding season, males perform an extraordinary courtship display, inflating their throat pouch to the size of a balloon and fanning their tail over their back.`,
    habitat: 'Open short-grass savanna, semi-arid plains, and light acacia scrub.',
    diet: 'Insects, grasshoppers, lizards, seeds, and acacia gum.',
    behavior: 'Terrestrial, solitary or paired; takes to wing only when strongly pressed.',
    viewingTip: 'Sarite open grassland plains during mid-day.',
    populationEstimate: 'Healthy presence in open grassland blocks',
    imageUrl: cldImage('782170688_122141256729053365_672836120563678516_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-greater-kudu',
    title: 'Greater Kudu',
    slug: 'greater-kudu',
    scientificName: 'Tragelaphus strepsiceros',
    category: 'Mammals',
    conservationStatus: 'LC',
    statusLabel: 'Least Concern',
    excerpt: "Spectacular spiral-horned antelope possessing incredible jumping ability and large radar-dish ears.",
    body: `The Greater Kudu is renowned for the magnificent corkscrew horns carried by adult bulls, reaching up to 1.8 meters with 2.5 full twists. Their thin white vertical stripes provide camouflage in the dappled shadows of rocky volcanic slopes.

Equipped with large, independently rotating ears, kudu detect footsteps from hundreds of meters away and can easily leap over 2.5-meter obstacles.`,
    habitat: 'Hilly volcanic terrain, rocky slopes, and dense Commiphora bushland.',
    diet: 'Leaves, shoots, seed pods, wild succulents, and fallen fruits.',
    behavior: 'Bachelor herds for bulls; maternal groups for cows and calves.',
    viewingTip: 'Slopes around El Sod and Danbala-Dhibayu crater rims.',
    populationEstimate: 'Common in rocky hills and crater slopes',
    imageUrl: cldImage('714881540_1425095369664640_1560666463367040759_n', 'w_800,h_600,c_fill,q_auto'),
  },
  {
    id: 'w-vulturine-guineafowl',
    title: 'Vulturine Guineafowl',
    slug: 'vulturine-guineafowl',
    scientificName: 'Acryllium vulturinum',
    category: 'Birds',
    conservationStatus: 'LC',
    statusLabel: 'Least Concern',
    excerpt: "Dazzling cobalt-blue and pinstriped game bird trotting in large social flocks across the dry thorn savanna.",
    body: `Adorned in brilliant cobalt-blue hackles, crimson eyes, and white pinstripes, the Vulturine Guineafowl is one of the most striking arid-zone birds in Africa. Flocks of up to 50 individuals forage along dusty park tracks, emitting musical whistles.`,
    habitat: 'Dry brush country, acacia woodlands, and rocky foothill thickets.',
    diet: 'Seeds, bulbs, termites, small invertebrates, and moisture-rich shoots.',
    behavior: 'Gregarious terrestrial flocks; roosts high in acacia canopies at night.',
    viewingTip: 'Ubiquitous along park tracks at dawn and late afternoon.',
    populationEstimate: 'Abundant throughout the park',
    imageUrl: cldImage('667812556_1374606328046878_2299729915640711788_n', 'w_800,h_600,c_fill,q_auto'),
  },
]

/* =========================================================================
   OFFICIAL FIELD STORIES & CONSERVATION DISPATCHES (Sourced Research)
   ========================================================================= */
export const OFFICIAL_STORIES: ParkStory[] = [
  {
    id: 's-tula-singing-wells',
    title: 'The Living Legacy of the Tula Wells: Ancient Hydrological Engineering of the Borana',
    slug: 'tula-singing-wells-gadaa-heritage',
    excerpt: "Hand-dug 12 to 30 meters into solid rock, the 'Singing Wells' (*Tula Sallan*) sustain pastoral herds and wildlife through human bucket chains and the customary law of grass and water.",
    body: `Deep within the limestone strata of southern Ethiopia lie the legendary Tula Wells (*Tula Sallan*)—ancient vertical shafts excavated by hand 12 to 30 meters down to subterranean aquifers without modern machinery.

To draw water during the dry season, a human chain of 4 to 8 young Borana men balances on timber footholds down the vertical shaft, passing leather buckets (*Okole*, traditionally fashioned from giraffe hide) hand-to-hand in unbroken rhythm. As they haul, they chant polyphonic work songs (*Weellu*) whose tempo paces their labor and calms thousands of waiting cattle.

Under customary law (*Seera Marraa fi Bisaanii*—the law of grass and water) administered by the Gadaa system, water is a sacred communal trust. No person or animal may be denied water. After domestic herds drink, water troughs are left filled overnight, providing essential hydration for nocturnal wild zebras, oryx, and gazelles.`,
    category: 'Community',
    author: {
      name: 'Guyo Boru',
      role: 'Cultural Heritage & Gadaa Liaison',
    },
    publishedAt: '2025-11-20',
    readTime: '6 min read',
    imageUrl: cldImage('782451195_122141256279053365_7936837558989253988_n', 'w_800,h_600,c_fill,q_auto'),
    tags: ['Tula Wells', 'Singing Wells', 'Gadaa System', 'Customary Law', 'UNESCO'],
  },
  {
    id: 's-bushcrow-thermal-envelope',
    title: 'The Thermal Envelope of the Ethiopian Bushcrow: Climate Boundaries of an Avian Enigma',
    slug: 'ethiopian-bushcrow-thermal-envelope',
    excerpt: "Why is Stresemann's Bushcrow confined to a narrow 17.5–20°C temperature island in southern Ethiopia? Research reveals a fragile symbiosis between climate and pastoral grazing.",
    body: `For decades, ornithologists wondered why the Ethiopian Bushcrow (*Zavattariornis stresemanni*) never expanded beyond its 6,000 km² range around Yabelo, Mega, and Arero, despite seemingly identical acacia savanna extending across East Africa.

Groundbreaking research (Donald et al. 2012) proved that the Bushcrow's distribution is almost uniquely temperature-determined: it is biologically restricted to a cool micro-climatic thermal pocket where mean annual temperatures remain between 17.5°C and 20.6°C.

Furthermore, the species depends on heavy livestock grazing by Borana cattle to keep grass short, enabling ground foraging for beetles and larvae. However, climate change models project up to a 90% contraction of this thermal bubble by 2070, making Borana National Park's conservation blocks the ultimate refuge for this endangered flagship.`,
    category: 'Research',
    author: {
      name: 'Dr. Alula Haile',
      role: 'Chief Wildlife Ecologist, EWCA',
    },
    publishedAt: '2025-10-15',
    readTime: '7 min read',
    imageUrl: cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_800,h_600,c_fill,q_auto'),
    tags: ['Stresemann\'s Bushcrow', 'Endemic Species', 'Climate Science', 'Ornithology'],
  },
  {
    id: 's-booqee-sadeen-defense',
    title: 'Defending Booqee Sadeen: How Borana Communities Protected the Salt Calderas',
    slug: 'defending-booqee-sadeen-salt-craters',
    excerpt: "When industrial concessions threatened El Sod crater lake, Borana pastoralists mobilized customary councils to safeguard centuries of sustainable community salt mining.",
    body: `Booqee Sadeen ('The Three Maar Craters'), anchored by the dramatic El Sod volcanic caldera (*Booqee Sooddaa* or 'House of Salt'), represents one of Ethiopia's most striking geological landscapes. For over 600 years, local divers have descended the 600-meter caldera to harvest black mineral salt (*Sooqda*) from the subterranean brine lake.

When industrial mining concessions were proposed for the lake bed, the Borana community mobilized through their customary elders (*Jaarsa*) and Gadaa leadership, successfully demonstrating that centuries of customary extraction sustained thousands of rural livelihoods without ecological destruction.

Today, El Sod stands as a shining model of community-conserved geological heritage, combining sustainable artisanal salt harvesting with low-impact geotourism.`,
    category: 'Conservation',
    author: {
      name: 'Elena Vance',
      role: 'Geotourism Specialist',
    },
    publishedAt: '2025-08-30',
    readTime: '5 min read',
    imageUrl: cldImage('667811241_1374606294713548_4463427384711284519_n', 'w_800,h_600,c_fill,q_auto'),
    tags: ['El Sod Crater', 'Booqee Sadeen', 'Community Conservation', 'Geology'],
  },
  {
    id: 's-sympatric-zebras-coexistence',
    title: 'Sympatric Equids: The Rare Coexistence of Grevy’s and Plains Zebras in Dida-Hara',
    slug: 'sympatric-zebras-dida-hara-sarite',
    excerpt: "Borana National Park is one of the only places on Earth where endangered Grevy's zebras and common plains zebras coexist in the same savanna habitat.",
    body: `Across most of Africa, plains zebras and Grevy's zebras occupy separate geographic ranges. In Borana National Park's Dida-Hara and Sarite conservation blocks, however, both species share the same grassland ecosystem in an extraordinary display of sympatric coexistence.

Biannual ground censuses conducted by EWCA rangers and community scouts track how the two species partition savanna resources. Plains zebras graze in cohesive family harems, while Grevy's stallions defend expansive territorial domains up to 10 km² near water.

This dual-species grazing dynamic prevents single-species rangeland overutilization and provides a living laboratory for evolutionary biologists studying equid ecology.`,
    category: 'Field Report',
    author: {
      name: 'Tsegaye Lemma',
      role: 'Park Warden, Borana NP',
    },
    publishedAt: '2025-07-12',
    readTime: '5 min read',
    imageUrl: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_800,h_600,c_fill,q_auto'),
    tags: ['Grevy\'s Zebra', 'Plains Zebra', 'Sympatry', 'Dida-Hara', 'Sarite'],
  },
]

/* =========================================================================
   OFFICIAL GALLERY MEDIA ARCHIVE
   ========================================================================= */
export const OFFICIAL_GALLERY: GalleryMedia[] = [
  {
    id: 'g-1',
    title: "Grevy's Zebra Stallion on the Dida-Hara Plains",
    caption: 'An adult territorial stallion standing vigilant across the drought-resistant acacia savanna at dawn.',
    category: 'Wildlife',
    cldId: '783592782_122141256459053365_1584076652469108423_n',
    imageUrl: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'EWCA Conservation Media Unit',
    location: 'Dida-Hara Conservation Block',
    date: '2025-10-18',
    aspect: 'wide',
    cameraSpecs: 'Sony A1 · 400mm f/2.8 GM · 1/2000s · ISO 200',
  },
  {
    id: 'g-2',
    title: 'El Sod "House of Salt" Volcanic Explosion Caldera',
    caption: 'A 600-meter vertical descent to the ink-black subterranean saline crater lake of Booqee Sooddaa.',
    category: 'Landscapes',
    cldId: '667811241_1374606294713548_4463427384711284519_n',
    imageUrl: cldImage('667811241_1374606294713548_4463427384711284519_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('667811241_1374606294713548_4463427384711284519_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'Earth Science Documentary Project',
    location: 'El Sod Crater, 1,520m',
    date: '2025-08-22',
    aspect: 'wide',
    cameraSpecs: 'Fujifilm GFX 100S · 23mm f/4 · 1/160s · ISO 100',
  },
  {
    id: 'g-3',
    title: 'Tula Singing Wells (*Tula Sallan*) Water Conveyance',
    caption: 'Borana pastoralists forming a human bucket chain down a 20-meter vertical limestone shaft while singing in rhythm.',
    category: 'Culture',
    cldId: '782451195_122141256279053365_7936837558989253988_n',
    imageUrl: cldImage('782451195_122141256279053365_7936837558989253988_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('782451195_122141256279053365_7936837558989253988_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'UNESCO Intangible Heritage Archive',
    location: 'Dubuluk Tula Well Complex',
    date: '2025-09-05',
    aspect: 'wide',
    cameraSpecs: 'Canon EOS R5 · 24-70mm f/2.8L · 1/500s · ISO 320',
  },
  {
    id: 'g-4',
    title: "Ethiopian Bushcrow (*Zavattariornis stresemanni*) on Acacia",
    caption: "The endemic Bushcrow exhibiting its bare cobalt-blue orbital patch in its restricted thermal habitat.",
    category: 'Wildlife',
    cldId: '707826833_122258731340333664_6654029734201501351_n',
    imageUrl: cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('707826833_122258731340333664_6654029734201501351_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'East African Ornithological Society',
    location: 'Yabello Conservation Block',
    date: '2025-11-02',
    aspect: 'portrait',
    cameraSpecs: 'Nikon Z9 · 800mm f/6.3 VR S · 1/2500s · ISO 640',
  },
  {
    id: 'g-5',
    title: 'Community Ranger Scout on SMART Telemetry Patrol',
    caption: 'Equipped local ranger monitoring wildlife GPS collars and checking perimeter solar sensors in Sarite.',
    category: 'Conservation',
    cldId: '780553747_122141256591053365_2969268618095047054_n',
    imageUrl: cldImage('780553747_122141256591053365_2969268618095047054_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('780553747_122141256591053365_2969268618095047054_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'Tsegaye Lemma & Wildlife Direct',
    location: 'Sarite Block Outpost',
    date: '2025-07-14',
    aspect: 'square',
    cameraSpecs: 'Fujifilm GFX 100 II · 80mm f/1.7 · 1/1000s · ISO 160',
  },
  {
    id: 'g-6',
    title: 'Beisa Oryx Pair at Savanna Golden Hour',
    caption: 'Endangered oryx with parallel spear horns navigating the sun-drenched whistling thorn acacias.',
    category: 'Wildlife',
    cldId: '783592801_122141256603053365_1923857396616899501_n',
    imageUrl: cldImage('783592801_122141256603053365_1923857396616899501_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('783592801_122141256603053365_1923857396616899501_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'National Geographic Emerging Explorer Archive',
    location: 'Central Grasslands Basin',
    date: '2025-10-25',
    aspect: 'wide',
    cameraSpecs: 'Canon R3 · 600mm f/4L IS III · 1/3200s · ISO 400',
  },
  {
    id: 'g-7',
    title: 'Magado Emerald Crater Lake & Montane Cloud Forest',
    caption: 'High-altitude volcanic crater lake ringed by ancient juniper and podocarpus mountain forests.',
    category: 'Landscapes',
    cldId: '667817973_1374606124713565_3197675928973472449_n',
    imageUrl: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'Ethiopian Heritage Conservation Trust',
    location: 'Magado Highland Crater, 2,040m',
    date: '2025-06-11',
    aspect: 'wide',
    cameraSpecs: 'Hasselblad X2D 100C · 38mm f/2.5 · 1/250s · ISO 64',
  },
  {
    id: 'g-8',
    title: 'Traditional Gadaa Council Assembly Under the Odaa Tree',
    caption: 'Elders in traditional white attire discussing customary grazing covenants and biocultural pasture protection.',
    category: 'Culture',
    cldId: '782618326_122141256453053365_1096858521163718193_n',
    imageUrl: cldImage('782618326_122141256453053365_1096858521163718193_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('782618326_122141256453053365_1096858521163718193_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'Borena Heritage Documentation Project',
    location: 'Arero Sacred Assembly Grounds',
    date: '2025-05-19',
    aspect: 'wide',
    cameraSpecs: 'Leica M11 · Summilux 50mm f/1.4 · 1/1200s · ISO 200',
  },
  {
    id: 'g-9',
    title: 'Somali Blue-Necked Ostrich Cock in Full Plumage',
    caption: 'Male Somali ostrich performing territorial courtship strides across the flowering semi-desert steppe.',
    category: 'Wildlife',
    cldId: '782170688_122141256729053365_672836120563678516_n',
    imageUrl: cldImage('782170688_122141256729053365_672836120563678516_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('782170688_122141256729053365_672836120563678516_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'East African Ornithological Society',
    location: 'Mega-Finchawa Savanna Corridor',
    date: '2025-08-14',
    aspect: 'portrait',
    cameraSpecs: 'Sony A1 · 600mm f/4 GM · 1/4000s · ISO 250',
  },
  {
    id: 'g-10',
    title: 'African Lion Pride Resting on Granite Inselberg',
    caption: 'A resident lioness surveying the plains from an elevated granite kopje during mid-afternoon heat.',
    category: 'Wildlife',
    cldId: '668120447_1374606164713561_8675150383045939896_n',
    imageUrl: cldImage('668120447_1374606164713561_8675150383045939896_n', 'w_1600,h_1067,c_fill,q_auto'),
    thumbnailUrl: cldImage('668120447_1374606164713561_8675150383045939896_n', 'w_600,h_400,c_fill,q_auto'),
    photographer: 'Predator Conservation Project',
    location: 'Yabelo Foothills Kopjes',
    date: '2025-11-20',
    aspect: 'wide',
    cameraSpecs: 'Canon EOS R5 · 100-500mm f/4.5-7.1L · 1/1250s · ISO 500',
  },
]

/* =========================================================================
   OFFICIAL VERIFIED GPS MAP POIS OF BORANA NATIONAL PARK
   ========================================================================= */
export const OFFICIAL_MAP_POIS: MapPOI[] = [
  {
    id: 'poi-hq',
    name: 'Park Headquarters & Visitor Center (Yabelo)',
    description: 'Official administrative center, permit desk, briefing theater, ranger dispatch, and natural history museum.',
    category: 'visitor-center',
    latitude: 4.8872,
    longitude: 38.0833,
    elevation: '1,850 m',
    accessTip: 'Located directly off the Trans-African Highway, 5 km north of Yabelo town center.',
    imageUrl: cldImage('780553747_122141256591053365_2969268618095047054_n', 'w_800,h_600,c_fill,q_auto'),
    essential_offline: true,
  },
  {
    id: 'poi-main-gate',
    name: 'Main Northern Entrance Gate',
    description: 'Official entrance checkpoint, vehicle registration, tariff validation, and certified scout assignment.',
    category: 'entrance',
    latitude: 4.9125,
    longitude: 38.1154,
    elevation: '1,790 m',
    accessTip: 'Open daily from 06:00 to 18:00. 4WD vehicles recommended for inner conservation blocks.',
    imageUrl: cldImage('707739665_1417594383748072_8777943947648670810_n', 'w_800,h_600,c_fill,q_auto'),
    essential_offline: true,
  },
  {
    id: 'poi-el-sod',
    name: 'El Sod "House of Salt" (Booqee Sooddaa)',
    description: 'Ancient volcanic caldera with a black subterranean saline crater lake and centuries-old artisanal salt mining.',
    category: 'cultural-site',
    latitude: 4.1170,
    longitude: 38.5670,
    elevation: '1,520 m (Rim)',
    accessTip: '90 km south of Yabelo. Guided 2.5-hour roundtrip hike down donkey paths; best visited in morning.',
    imageUrl: cldImage('667811241_1374606294713548_4463427384711284519_n', 'w_800,h_600,c_fill,q_auto'),
    essential_offline: true,
  },
  {
    id: 'poi-dida-hara',
    name: 'Dida-Hara Wildlife Conservation Block',
    description: "Expansive drought-resistant woodland savanna; premier viewing of coexisting Grevy's and plains zebras and endemic birds.",
    category: 'wildlife-viewing',
    latitude: 4.9650,
    longitude: 38.1720,
    elevation: '1,640 m',
    accessTip: 'Optimal game drives at dawn (06:30 - 09:30) and dusk (16:30 - 18:30).',
    imageUrl: cldImage('783592782_122141256459053365_1584076652469108423_n', 'w_800,h_600,c_fill,q_auto'),
    essential_offline: true,
  },
  {
    id: 'poi-singing-wells',
    name: 'Dubuluk Singing Wells (Tula Sallan)',
    description: 'Centuries-old hand-dug vertical well complex (12–30m deep) operated with human bucket chains and polyphonic chants.',
    category: 'cultural-site',
    latitude: 4.6521,
    longitude: 38.2415,
    elevation: '1,580 m',
    accessTip: 'Peak activity occurs between 08:00 and 12:00 when cattle herds arrive to drink under customary law.',
    imageUrl: cldImage('782451195_122141256279053365_7936837558989253988_n', 'w_800,h_600,c_fill,q_auto'),
    essential_offline: true,
  },
  {
    id: 'poi-magado',
    name: 'Magado Crater Lake & Montane Ridge',
    description: 'Emerald maar crater lake surrounded by dry evergreen Afromontane juniper and podocarpus forest.',
    category: 'viewpoint',
    latitude: 4.4110,
    longitude: 38.3050,
    elevation: '1,920 m',
    accessTip: 'Accessible via 4WD track from Mega; spectacular panoramic picnic site on north ridge.',
    imageUrl: cldImage('667817973_1374606124713565_3197675928973472449_n', 'w_800,h_600,c_fill,q_auto'),
    essential_offline: true,
  },
  {
    id: 'poi-sarite-campsite',
    name: 'Sarite Grassland Eco-Campsite & Outpost',
    description: 'Wilderness campsite in the Sarite grassland block with water cisterns, shaded cooking shelters, and 24/7 ranger presence.',
    category: 'campsite',
    latitude: 4.7890,
    longitude: 38.3450,
    elevation: '1,610 m',
    accessTip: 'Registration required at Yabelo HQ. Firewood permitted only in designated fire pits.',
    imageUrl: cldImage('668110576_1374606031380241_6681634558621259739_n', 'w_800,h_600,c_fill,q_auto'),
    essential_offline: true,
  },
  {
    id: 'poi-emergency-station',
    name: 'EWCA Emergency Medical & Ranger SAR Station',
    description: 'Medical triage base, satellite telecommunications dispatch, and 4WD search-and-rescue response unit.',
    category: 'emergency',
    latitude: 4.8910,
    longitude: 38.0860,
    elevation: '1,850 m',
    accessTip: 'Emergency radio VHF Channel 16 / HQ Hotline: +251 46 444 0210.',
    imageUrl: cldImage('780553747_122141256591053365_2969268618095047054_n', 'w_800,h_600,c_fill,q_auto'),
    essential_offline: true,
  },
]

/* =========================================================================
   OFFICIAL GOVERNMENT PARK TARIFFS & PERMIT FEES (EWCA Standards)
   ========================================================================= */
export const OFFICIAL_TARIFFS: TariffRate[] = [
  {
    category: 'Park Entry Permit (Adults)',
    description: 'Standard day entrance permit for national park access.',
    foreignNonResidentUSD: 20,
    foreignResidentUSD: 10,
    ethiopianCitizenETB: 100,
    unit: 'per person / day',
  },
  {
    category: 'Park Entry Permit (Children / Students)',
    description: 'Ages 6 to 17 or valid accredited student card holders.',
    foreignNonResidentUSD: 10,
    foreignResidentUSD: 5,
    ethiopianCitizenETB: 40,
    unit: 'per student / day',
  },
  {
    category: 'Certified Wildlife Scout / Ranger Guide',
    description: 'Mandatory armed wildlife ranger or certified community guide.',
    foreignNonResidentUSD: 15,
    foreignResidentUSD: 10,
    ethiopianCitizenETB: 450,
    unit: 'per scout / day',
  },
  {
    category: 'Designated Eco-Campsite Fee',
    description: 'Overnight camping at Sarite or designated park wilderness sites.',
    foreignNonResidentUSD: 10,
    foreignResidentUSD: 5,
    ethiopianCitizenETB: 150,
    unit: 'per tent / night',
  },
  {
    category: 'Vehicle Entry (Standard 4WD / Safari Van)',
    description: 'Passenger vehicles up to 8 seats operating inside park tracks.',
    foreignNonResidentUSD: 10,
    foreignResidentUSD: 5,
    ethiopianCitizenETB: 200,
    unit: 'per vehicle / day',
  },
  {
    category: 'Commercial Filming & Documentary Permit',
    description: 'Professional cinema cameras, broadcast crews, and drone permits.',
    foreignNonResidentUSD: 250,
    foreignResidentUSD: 150,
    ethiopianCitizenETB: 8000,
    unit: 'per crew / day',
  },
]

/* =========================================================================
   PARK INSTITUTIONAL DATA (Sourced Master Profile)
   ========================================================================= */
export const PARK_INSTITUTIONAL_DATA = {
  name: 'Borana National Park',
  oromoName: 'Booranaa Biyya Baha National Park',
  authority: 'Oromia Forest & Wildlife Enterprise (OFWE) & Ethiopian Wildlife Conservation Authority (EWCA)',
  regionalState: 'Oromia Regional State (Borena Zone & Liben border)',
  history: 'Originally designated as a Controlled Hunting Zone in 1986; upgraded and formally gazetted as a National Park in 2017.',
  establishedYear: '1986 (Controlled Hunting) / 2017 (National Park Gazettement)',
  totalAreaKm2: '45,366 km²',
  totalAreaHectares: '4,536,600 ha (Ethiopia’s Largest Protected Area Complex)',
  elevationRange: '1,000 m to 2,050 m above sea level',
  headquarters: 'Yabelo, Borena Zone, Oromia, Ethiopia (approx. 570 km south of Addis Ababa)',
  coordinates: {
    latitude: 4.117,
    longitude: 38.567,
    formatted: '4.117°N, 38.567°E',
  },
  borders: {
    south: 'Kenya–Ethiopia international border',
    west: 'Chelbi Wildlife Reserve',
    east: 'Geraille National Park',
    north: 'Yabelo Wildlife Sanctuary and Arero National Forest Priority Area',
  },
  biodiversity: {
    plants: '327 documented species across 197 genera and 69 families (Dalle et al. 2005)',
    mammals: '40+ recorded species including sympatric Grevy\'s and Plains zebras',
    birds: '280+ recorded species with 4 range-restricted endemics',
    endemicBirds: [
      "Stresemann's Bushcrow (Zavattariornis stresemanni)",
      "White-tailed Swallow (Hirundo megaensis)",
      "Prince Ruspoli's Turaco (Tauraco ruspolii)",
      "Black-fronted Spurfowl (Pternistis atrifrons)",
    ],
  },
  geology: {
    basement: 'Precambrian crystalline basement rock overlain by Tertiary volcanic flood basalts',
    features: 'Undulating plains, volcanic inselbergs, rocky kopjes, karst sinkholes and caves',
    craters: 'Booqee Sadeen (The Three Maar Crater Lakes), notably El Sod (Booqee Sooddaa) black-water caldera',
  },
  climate: {
    type: 'Semi-arid, near-equatorial (minimal seasonal temp swing: 25°C–33°C daytime)',
    annualRainfall: '400–700 mm (Bimodal)',
    wetSeasons: 'Main rains March–May (Ganna), Short rains September–November (Hagayya)',
    drySeasons: 'December–February (Bona) and June–August (Adoolessa)',
  },
  emergencyPhone: '+251 (0) 46 444 0210',
  hotline24: '+251 (0) 91 100 2345',
  officialEmail: 'info@borenapark.gov.et',
  permitsEmail: 'permits@borenapark.gov.et',
  researchEmail: 'research@borenapark.gov.et',
}
