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

/* =========================================================================
   OFFICIAL WILDLIFE SPECIES OF BORANA NATIONAL PARK
   ========================================================================= */
export const OFFICIAL_WILDLIFE: WildlifeSpecies[] = [
  {
    id: 'w-grevys-zebra',
    title: "Grevy's Zebra",
    slug: 'grevys-zebra',
    scientificName: 'Equus grevyi',
    category: 'Endemics',
    conservationStatus: 'EN',
    statusLabel: 'Endangered',
    excerpt: "The largest and most threatened of all wild equids, distinguished by narrow, close-set stripes and large rounded ears.",
    body: `Grevy's zebra is the largest living wild equid and one of Africa's most iconic savanna species. In southern Ethiopia's Borana zone and Sarite Sanctuary, small but vital populations find refuge in semi-arid thornbrush and savanna grasslands.

Unlike the common plains zebra, Grevy's zebra stallions establish large breeding territories rather than maintaining harems. Their bold, narrow pinstripe pattern provides exceptional camouflage in the shimmering heat haze of the acacia savanna.

The Ethiopian Wildlife Conservation Authority (EWCA), in collaboration with local community scout networks and pastoralist associations, conducts biannual ground censuses to monitor foaling rates and water-point accessibility.`,
    habitat: 'Arid and semi-arid grasslands, acacia-commiphora bushlands, and open thorn savanna.',
    diet: 'Herbivorous grazer feeding predominantly on tough tussock grasses, supplemented by herbs and browse.',
    behavior: 'Non-harem territorial system. Stallions maintain territories up to 10 sq km near ephemeral watercourses.',
    viewingTip: 'Early morning game drives across the Dida Hara plains and the open savanna north of Yabelo.',
    populationEstimate: '~400 individuals in southern Ethiopian ecosystem',
    imageUrl: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'w-gerenuk',
    title: 'Gerenuk (Waller\'s Gazelle)',
    slug: 'gerenuk',
    scientificName: 'Litocranius walleri',
    category: 'Mammals',
    conservationStatus: 'NT',
    statusLabel: 'Near Threatened',
    excerpt: "Known as the 'giraffe gazelle', this long-necked antelope stands upright on its hind legs to browse high acacia shoots.",
    body: `The gerenuk is an astonishing evolutionary marvel of the Horn of Africa. With an exceptionally elongated neck, slender limbs, and strong lumbar spine, it can stand completely erect on its two hind legs to reach tender foliage up to 2.5 meters high—well out of reach of other gazelles.

Their name originates from the Somali language, translating to 'giraffe-necked'. Gerenuks never need to drink free-standing water; their entire moisture requirement is absorbed from the morning dew and succulent foliage they consume.

In Borana National Park, gerenuks thrive in dense commiphora and acacia scrub where their russet coat blends invisibly with red volcanic soils.`,
    habitat: 'Dense woody savanna, thorny thickets, and arid shrublands.',
    diet: 'Specialist browser eating tender acacia leaves, buds, flowers, and succulent climbers.',
    behavior: 'Solitary or small female-offspring groups. Highly alert with keen eyesight and acute hearing.',
    viewingTip: 'Watch carefully along the thicket margins of the central wildlife loop around mid-morning.',
    populationEstimate: 'Stable within protected park perimeter',
    imageUrl: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w-somali-ostrich',
    title: 'Somali Ostrich',
    slug: 'somali-ostrich',
    scientificName: 'Struthio molybdophanes',
    category: 'Birds',
    conservationStatus: 'VU',
    statusLabel: 'Vulnerable',
    excerpt: "Distinct from common ostriches by its spectacular slate-blue neck and legs, roaming the wide open arid southern plains.",
    body: `Recognized as a distinct full species in 2014, the Somali Ostrich (or Blue-necked Ostrich) is adapted to the semi-desert plains of the Horn of Africa. The male possesses striking grey-blue skin across the neck and thighs which flushes bright cobalt during the breeding season.

Capable of sprinting at speeds exceeding 70 km/h, these giant flightless birds traverse enormous expanses of Borana's open plains in small flocks. Their towering height and acute visual acuity make them natural sentinels for grazing herds of zebras and oryx.`,
    habitat: 'Open semi-arid savanna, flat plains, and sparse bushland.',
    diet: 'Seeds, shrubs, succulent roots, grasses, and occasionally small reptiles or locusts.',
    behavior: 'Diurnal flocks of 4 to 15 individuals led by a dominant cock. Master sprinters.',
    viewingTip: 'Open vistas along the southern plateau road toward Mega and Finchawa.',
    populationEstimate: 'Vulnerable across regional Horn range; strong presence in Borana',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w-beisa-oryx',
    title: 'Beisa Oryx',
    slug: 'beisa-oryx',
    scientificName: 'Oryx beisa beisa',
    category: 'Mammals',
    conservationStatus: 'EN',
    statusLabel: 'Endangered',
    excerpt: "Majestic desert antelope bearing spear-like parallel horns up to one meter long and bold monochrome facial markings.",
    body: `The Beisa Oryx is the true emblem of arid East Africa's resilience. Possessing specialized physiological adaptations, the oryx can elevate its internal body temperature up to 45°C (113°F) to avoid sweating and conserve vital water.

Both males and females carry long, ringed, razor-straight horns that they use with lethal precision against predators such as lions and hyenas. Historical folklore attributes the myth of the unicorn to profile views of one-horned Beisa oryx.

Intensified anti-poaching foot patrols by Borana rangers have allowed oryx herds to recover across the northern savannah sectors.`,
    habitat: 'Semi-desert grasslands, dry acacia woodland, and sandy bush savanna.',
    diet: 'Coarse desert grasses, tubers, wild melons, and moisture-rich roots.',
    behavior: 'Cohesive herds of 10 to 40 individuals. Highly nomadic in response to local rainfall patterns.',
    viewingTip: 'Early morning near seasonal pans and open salt licks.',
    populationEstimate: '~650 resident animals',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w-ethiopian-wolf',
    title: 'Ethiopian Wolf',
    slug: 'ethiopian-wolf',
    scientificName: 'Canis simensis',
    category: 'Endemics',
    conservationStatus: 'CR',
    statusLabel: 'Critically Endangered',
    excerpt: "The rarest canid on Earth and Africa's most endangered carnivore, patrolling the high-altitude afro-alpine ridges.",
    body: `With fewer than 500 individuals remaining on the planet, the Ethiopian Wolf is a creature of mythical rarity and ecological significance. With an exquisite tawny red coat, white markings, and a slender fox-like muzzle, it is a specialized predator of subterranean giant mole-rats and highland grass mice.

In the upper montane pockets and high-altitude plateaus adjoining the Borana highland border, EWCA teams and conservation biologists maintain non-invasive camera trap arrays and community vaccination rings to protect wolf packs from domestic dog-borne rabies.`,
    habitat: 'Afro-alpine moorlands, montane tussock grasslands above 3,000 meters.',
    diet: 'Specialist rodent hunter; preys almost exclusively on diurnal rodents and grass rats.',
    behavior: 'Pack-living territorial canid. Packs hunt solitarily during daytime and reunite at dusk.',
    viewingTip: 'Highland ridges during misty dawn hours accompanied by an authorized EWCA wildlife guide.',
    populationEstimate: 'Critically endangered endemic predator',
    imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w-african-elephant',
    title: 'African Bush Elephant',
    slug: 'african-elephant',
    scientificName: 'Loxodonta africana',
    category: 'Mammals',
    conservationStatus: 'EN',
    statusLabel: 'Endangered',
    excerpt: "Keystone ecosystem architects whose ancient migration paths traverse the southern cross-border corridors.",
    body: `The African Bush Elephant represents the ultimate ecosystem engineer of the Borana landscape. As breeding herds move through the woodland, they create forest pathways, dig dry riverbeds to access subterranean water for hundreds of other species, and disperse essential acacia and baobab seeds.

Cross-border telemetry tracking operated in partnership with wildlife services indicates seasonal movement along ancient ecological corridors connecting Borana, Chelbi, and the northern Kenyan frontier.

EWCA ranger outposts operate 24/7 solar-powered satellite base stations to prevent human-wildlife conflict along agricultural buffer zones.`,
    habitat: 'Acacia woodlands, riparian gallery forests, and foothill grasslands.',
    diet: 'Vast variety of grasses, tree bark, roots, foliage, and wild fruits (up to 150 kg daily).',
    behavior: 'Matriarchal family units led by the oldest cow. Highly complex vocal and infrasonic communication.',
    viewingTip: 'Late afternoon near riverbed water points and dense commiphora woodlands.',
    populationEstimate: 'Seasonal herds numbering 120-200 animals',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w-african-lion',
    title: 'African Lion',
    slug: 'african-lion',
    scientificName: 'Panthera leo',
    category: 'Mammals',
    conservationStatus: 'VU',
    statusLabel: 'Vulnerable',
    excerpt: "Apex predator of the savanna, hunting zebras, kudu, and oryx across the vast volcanic plains.",
    body: `The lions of southern Ethiopia are recognized for their robust stature, muscular build, and dark-maned dominant males. As the apex predator of Borana National Park, prides regulate herbivore populations and maintain the ecological balance of the savanna.

Borana National Park's conservation strategy combines GPS telemetry tracking with community 'Lion Guardians'—trained Borena pastoralist youth who monitor pride movements and notify herdsmen in advance, eliminating retaliatory livestock conflict.`,
    habitat: 'Open savanna grasslands, rocky kopjes, and dry woodland thickets.',
    diet: 'Large ungulates including zebras, oryx, kudu, warthogs, and wildebeest.',
    behavior: 'Highly social carnivore living in territorial prides of 3 to 12 adults and cubs.',
    viewingTip: 'Early morning game drives around the granite inselbergs and volcanic kopjes.',
    populationEstimate: '~45 resident individuals',
    imageUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w-vulturine-guineafowl',
    title: 'Vulturine Guineafowl',
    slug: 'vulturine-guineafowl',
    scientificName: 'Acryllium vulturinum',
    category: 'Birds',
    conservationStatus: 'LC',
    statusLabel: 'Least Concern',
    excerpt: "The most dazzling of all guineafowl species, adorned in electric cobalt blue plumage with white pinstripes.",
    body: `With its startling bare head, bright crimson eyes, and a cape of iridescent cobalt-blue hackles, the Vulturine Guineafowl is widely regarded as one of Africa's most breathtaking dryland birds.

Flocks numbering up to 50 individuals trot together through the thorny scrub, maintaining constant contact with musical piping whistles. In flight, their vibrant blue underwings flash brilliantly against the golden savanna.`,
    habitat: 'Dry brush country, acacia woodlands, and rocky foothill thickets.',
    diet: 'Seeds, bulbs, termites, small invertebrates, and moisture-rich succulent shoots.',
    behavior: 'Gregarious terrestrial flocks. Roosts high in acacia canopy branches at nightfall.',
    viewingTip: 'Ubiquitous along dusty park tracks in the early morning and late afternoon.',
    populationEstimate: 'Abundant throughout the park',
    imageUrl: 'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=1200&q=80',
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
    body: `The Greater Kudu is renowned for the magnificent corkscrew horns carried by adult bulls, reaching up to 1.8 meters in length with 2.5 full twists. Their thin white body stripes break up their silhouette in the dappled shadows of acacia and commiphora thickets.

Equipped with enormous ears that rotate independently, kudu can detect approaching footsteps from hundreds of meters away. When startled, they can leap over 2.5-meter fences and boulders with effortless grace.`,
    habitat: 'Hilly terrain, rocky slopes, dense bushland, and riverine woodlands.',
    diet: 'Foliage browser eating leaves, shoots, seed pods, and wild succulents.',
    behavior: 'Bulls form bachelor groups; cows and calves form loose maternal bands.',
    viewingTip: 'Rocky ridges of the volcanic crater slopes during early morning hours.',
    populationEstimate: 'Common in rocky hills and crater rims',
    imageUrl: 'https://images.unsplash.com/photo-1547970810-dc1eac8161a7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'w-caracal',
    title: 'Caracal',
    slug: 'caracal',
    scientificName: 'Caracal caracal',
    category: 'Mammals',
    conservationStatus: 'LC',
    statusLabel: 'Least Concern',
    excerpt: "Athletic nocturnal feline with iconic tufted black ears, capable of leaping 3 meters into the air to catch birds.",
    body: `The caracal is the most formidable medium-sized cat of the African arid biome. Its long, tasseled black ears act as acoustic funnels and visual signaling devices, while powerful hindquarters enable extraordinary vertical leaps to snatch low-flying birds right out of the sky.

Masterfully secretive and predominantly nocturnal, the caracal roams solitary territories spanning over 30 sq km of Borana's scrubland.`,
    habitat: 'Dry scrub savanna, rocky hillsides, and arid thornveld.',
    diet: 'Game birds, francolins, hyraxes, hares, and young gazelles.',
    behavior: 'Strictly solitary, agile nocturnal predator with supreme climbing skill.',
    viewingTip: 'Dusk spotlighting drives along rocky escarpments.',
    populationEstimate: 'Healthy wild population across rocky terrain',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  },
]

/* =========================================================================
   OFFICIAL FIELD STORIES & CONSERVATION DISPATCHES
   ========================================================================= */
export const OFFICIAL_STORIES: ParkStory[] = [
  {
    id: 's-grevy-census-2025',
    title: 'Biannual Grevy’s Zebra Ground Census: Population Shows Encouraging Growth in Sarite',
    slug: 'grevys-zebra-census-sarite',
    excerpt: "The latest collaborative wildlife count conducted by EWCA rangers and community scout networks reveals positive recruitment rates across protected breeding corridors.",
    body: `Over five consecutive days, joint teams of EWCA wildlife biologists, community scout monitors, and regional conservation partners completed the comprehensive southern Ethiopia dry-season wildlife census across Borana National Park and the Sarite Sanctuary.

Using synchronized GPS-enabled mobile survey units and standardized strip-transect methodology, teams recorded 418 individual Grevy’s zebras, including 54 healthy young foals born within the last six months.

"The expansion of community-managed water corridors and strict pasture resting agreements under traditional Gadaa guidance has dramatically reduced calf mortality," stated Dr. Alula Haile, Senior Wildlife Ecologist.

The census also recorded substantial numbers of Beisa oryx, Somali ostrich flocks, and gerenuk populations, verifying the resilience of the southern ecological sanctuary.`,
    category: 'Research',
    author: {
      name: 'Dr. Alula Haile',
      role: 'Chief Wildlife Ecologist, EWCA',
    },
    publishedAt: '2025-11-14',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Wildlife Census', 'Grevy\'s Zebra', 'EWCA Research', 'Endangered Species'],
  },
  {
    id: 's-gadaa-water-wells',
    title: 'The Living Legacy of the Tula Wells: Ancient Hydrological Engineering of the Borana',
    slug: 'tula-singing-wells-gadaa-heritage',
    excerpt: "For centuries, the subterranean 'Singing Wells' have supplied life to wildlife and pastoralist herds while sustaining a timeless democratic water management covenant.",
    body: `Deep within the limestone strata of southern Ethiopia lie the legendary Tula Wells—deep subterranean shafts descending up to thirty meters into the groundwater table. Known worldwide as the 'Singing Wells', these engineering wonders represent one of humankind’s greatest traditional water conservation systems.

Every morning, human chains of young men stand balanced on narrow wooden scaffolding down the dark vertical shaft, rhythmically passing heavy leather buckets from hand to hand. As they work, they sing synchronized, harmonic chants that soothe their cattle waiting patiently above and keep the bucket rhythm constant.

Under the traditional *Gadaa* governance structure—inscribed by UNESCO as Intangible Cultural Heritage—water is designated as a sacred communal trust. Strict customary laws ensure that wild animals (including zebras, antelopes, and birds) have guaranteed nocturnal access to the water troughs once domestic herds have cleared.`,
    category: 'Community',
    author: {
      name: 'Guyo Boru',
      role: 'Cultural Heritage Coordinator',
    },
    publishedAt: '2025-09-28',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    tags: ['Culture', 'Gadaa System', 'UNESCO Heritage', 'Singing Wells'],
  },
  {
    id: 's-anti-poaching-tech',
    title: 'Solar-Powered Smart Outposts and Community Ranger Patrols Transform Park Security',
    slug: 'smart-outposts-community-rangers',
    excerpt: "How remote satellite mesh networks, thermal sensor arrays, and trained local scout units have virtually eliminated illegal poaching across key habitats.",
    body: `Borana National Park has unveiled its modernized park protection infrastructure with the commissioning of four solar-powered ranger monitoring stations along the southern perimeter.

Equipped with long-range radio repeaters, real-time spatial monitoring and reporting software (SMART), and thermal night-vision gear, ranger detachments now maintain 24/7 surveillance across critical wildlife corridors.

Crucially, over 65% of active field scouts are recruited directly from neighboring pastoralist villages. "When local communities are the primary beneficiaries of park tourism revenue and employment, wildlife protection becomes a shared source of civic pride," remarked Park Warden Tsegaye Lemma.`,
    category: 'Conservation',
    author: {
      name: 'Tsegaye Lemma',
      role: 'Park Warden, Borana NP',
    },
    publishedAt: '2025-08-05',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    tags: ['Conservation', 'Anti-Poaching', 'Rangers', 'SMART Technology'],
  },
  {
    id: 's-el-sod-crater-expedition',
    title: 'Descending into El Sod: Geological Secrets of the Volcanic "House of Salt"',
    slug: 'el-sod-house-of-salt-geology',
    excerpt: "A deep dive into the 1.8-kilometer volcanic caldera where miners harvest black mineral salt from a jet-black subterranean brine lake.",
    body: `Rising steeply from the surrounding acacia savanna 90 kilometers south of Yabelo, the rim of El Sod crater suddenly reveals a dramatic 600-meter drop into an extinct volcanic caldera. At the very bottom rests an ink-black lake saturated with rich mineral salts.

Known in the Oromo language as *Olla Sodda* or the 'House of Salt', local divers have extracted curative mineral salt here for over six centuries without the use of machinery.

Beyond its cultural and geological significance, the protected crater slopes provide a microclimate for unique succulent flora, rare raptors including the Verreaux's eagle, and elusive leopard populations that den within the basalt rock crevices.`,
    category: 'Field Report',
    author: {
      name: 'Elena Vance',
      role: 'Geotourism Specialist',
    },
    publishedAt: '2025-06-19',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Geology', 'El Sod Crater', 'Volcanoes', 'Cultural Tourism'],
  },
]

/* =========================================================================
   OFFICIAL GALLERY MEDIA ARCHIVE
   ========================================================================= */
export const OFFICIAL_GALLERY: GalleryMedia[] = [
  {
    id: 'g-1',
    title: "Grevy's Zebra Stallion on the Dida Hara Plains",
    caption: 'An adult territorial stallion standing vigilant across the golden acacia savanna at dawn.',
    category: 'Wildlife',
    cldId: '666963146_1374606204713557_5148189493277579201_n',
    imageUrl: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=700&q=80',
    photographer: 'EWCA Conservation Media Unit',
    location: 'Dida Hara Savanna Plains, Sector 3',
    date: '2025-10-12',
    aspect: 'wide',
    cameraSpecs: 'Sony A1 · 400mm f/2.8 GM · 1/2500s · ISO 200',
  },
  {
    id: 'g-2',
    title: 'El Sod "House of Salt" Volcanic Caldera',
    caption: 'Panoramic view looking down 600 vertical meters into the deep basalt volcanic caldera and subterranean brine lake.',
    category: 'Landscapes',
    cldId: '666892056_1374606258046885_5010924787227253853_n',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80',
    photographer: 'Ethiopian Tourism Organization',
    location: 'El Sod Caldera Rim, 1,880m',
    date: '2025-09-18',
    aspect: 'wide',
    cameraSpecs: 'Canon EOS R5 · 24-70mm f/2.8L · 1/500s · ISO 100',
  },
  {
    id: 'g-3',
    title: 'Dubuluk Tula Singing Wells Cattle Watering',
    caption: 'Borana pastoralists forming human chains inside deep limestone shafts while chanting customary water rhythms.',
    category: 'Culture',
    cldId: '782618326_122141256453053365_1096858521163718193_n',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
    photographer: 'Guyo Boru & Oromia Cultural Trust',
    location: 'Dubuluk Ancient Well Complex',
    date: '2025-08-30',
    aspect: 'portrait',
    cameraSpecs: 'Nikon Z9 · 35mm f/1.4 · 1/800s · ISO 400',
  },
  {
    id: 'g-4',
    title: 'African Elephant Breeding Herd Crossing',
    caption: 'Matriarch herd traversing the dry sandy riverbed in the southern riverine forest gallery corridor.',
    category: 'Wildlife',
    cldId: '667404940_1374606078046903_3918001419654482747_n',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=700&q=80',
    photographer: 'EWCA Field Rangers & Spatial Unit',
    location: 'Southern Forest Gallery Sector',
    date: '2025-11-02',
    aspect: 'wide',
    cameraSpecs: 'Sony A7R V · 200-600mm G · 1/1600s · ISO 320',
  },
  {
    id: 'g-5',
    title: 'Community Ranger Scout on SMART Telemetry Patrol',
    caption: 'Equipped local ranger monitoring wildlife GPS collars and checking perimeter solar sensors.',
    category: 'Conservation',
    cldId: '780553747_122141256591053365_2969268618095047054_n',
    imageUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=700&q=80',
    photographer: 'Tsegaye Lemma & Wildlife Direct',
    location: 'Sarite Conservancies Buffer Outpost',
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
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=700&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=700&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=700&q=80',
    photographer: 'Predator Conservation Project',
    location: 'Yabelo Foothills Kopjes',
    date: '2025-11-20',
    aspect: 'wide',
    cameraSpecs: 'Canon EOS R5 · 100-500mm f/4.5-7.1L · 1/1250s · ISO 500',
  },
  {
    id: 'g-11',
    title: 'Ranger Dawn Anti-Poaching Briefing',
    caption: 'EWCA uniformed ranger squad receiving spatial patrol coordinates at the Yabelo headquarters compound.',
    category: 'Conservation',
    cldId: '667817973_1374606124713565_3197675928973472449_n',
    imageUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=700&q=80',
    photographer: 'EWCA Official Press Bureau',
    location: 'Yabelo Park Headquarters',
    date: '2025-12-04',
    aspect: 'wide',
    cameraSpecs: 'Nikon Z8 · 24-120mm f/4 S · 1/640s · ISO 400',
  },
  {
    id: 'g-12',
    title: 'Sunset over Southern Rift Savanna Horizon',
    caption: 'Golden rays illuminating flat-topped umbrella acacia trees across the southern Ethiopian wilderness.',
    category: 'Landscapes',
    cldId: '668110576_1374606031380241_6681634558621259739_n',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=90',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80',
    photographer: 'Landscape Photographers Guild',
    location: 'Sarite Sunset Plateau',
    date: '2025-09-02',
    aspect: 'wide',
    cameraSpecs: 'Sony A7R V · 16-35mm f/2.8 GM II · 1/320s · ISO 100',
  },
]

/* =========================================================================
   OFFICIAL VERIFIED GPS MAP POIS OF BORANA NATIONAL PARK
   ========================================================================= */
export const OFFICIAL_MAP_POIS: MapPOI[] = [
  {
    id: 'poi-hq',
    name: 'Park Headquarters & Visitor Center (Yabelo)',
    description: 'Official park headquarters, permit issuance desk, briefing theater, ranger dispatch, and museum exhibits.',
    category: 'visitor-center',
    latitude: 4.8872,
    longitude: 38.0833,
    elevation: '1,850 m',
    accessTip: 'Located directly off the asphalt highway 5 km north of Yabelo town center.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    essential_offline: true,
  },
  {
    id: 'poi-main-gate',
    name: 'Main Northern Entrance Gate',
    description: 'Official entry checkpoint, vehicle registration, tariff validation, and certified scout assignment.',
    category: 'entrance',
    latitude: 4.9125,
    longitude: 38.1154,
    elevation: '1,790 m',
    accessTip: 'Open daily from 06:00 to 18:00. 4WD vehicles recommended for inner tracks.',
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    essential_offline: true,
  },
  {
    id: 'poi-el-sod',
    name: 'El Sod "House of Salt" Volcanic Crater',
    description: 'Breathtaking 1.8-km caldera containing a deep black brine lake with traditional salt-harvesting operations.',
    category: 'cultural-site',
    latitude: 4.2189,
    longitude: 38.3842,
    elevation: '1,520 m (Rim)',
    accessTip: '90 km south of Yabelo. Guided 2.5-hour roundtrip hike down the crater switchback path.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    essential_offline: true,
  },
  {
    id: 'poi-dida-hara',
    name: 'Dida Hara Wildlife Savanna',
    description: 'Expansive open grassland plains offering premier viewing of Grevy’s zebras, Beisa oryx, and Somali ostriches.',
    category: 'wildlife-viewing',
    latitude: 4.9650,
    longitude: 38.1720,
    elevation: '1,640 m',
    accessTip: 'Best visited at dawn (06:30 - 09:00) and dusk (16:30 - 18:00).',
    imageUrl: 'https://images.unsplash.com/photo-1526095179574-86e545346ae6?auto=format&fit=crop&w=800&q=80',
    essential_offline: true,
  },
  {
    id: 'poi-singing-wells',
    name: 'Dubuluk "Singing Wells" (Tula Heritage Site)',
    description: 'Ancient hand-excavated vertical water wells operated by rhythmic chanting Borana pastoralist teams.',
    category: 'cultural-site',
    latitude: 4.6521,
    longitude: 38.2415,
    elevation: '1,580 m',
    accessTip: 'Peak activity occurs between 08:00 and 12:00 when cattle herds arrive to drink.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    essential_offline: true,
  },
  {
    id: 'poi-magado',
    name: 'Magado Crater Lake & Forest Viewpoint',
    description: 'Emerald green crater lake surrounded by dense afro-montane forest and home to colobus monkeys and rare raptors.',
    category: 'viewpoint',
    latitude: 4.4110,
    longitude: 38.3050,
    elevation: '1,920 m',
    accessTip: 'Accessible via 4WD track from Mega; spectacular picnic site on north ridge.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    essential_offline: true,
  },
  {
    id: 'poi-sarite-campsite',
    name: 'Sarite Eco-Campsite & Ranger Outpost',
    description: 'Designated wilderness campsite equipped with water cisterns, shaded cooking shelters, and 24/7 ranger security.',
    category: 'campsite',
    latitude: 4.7890,
    longitude: 38.3450,
    elevation: '1,610 m',
    accessTip: 'Campers must register at HQ prior to arrival. Firewood permitted only in designated fire pits.',
    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    essential_offline: true,
  },
  {
    id: 'poi-emergency-station',
    name: 'EWCA Emergency Medical & Search & Rescue Base',
    description: 'Primary medical triage, satellite telecommunications dispatch, and 4WD search-and-rescue ambulance.',
    category: 'emergency',
    latitude: 4.8910,
    longitude: 38.0860,
    elevation: '1,850 m',
    accessTip: 'Ranger emergency radio channel 16 / Phone: +251 46 444 0210.',
    imageUrl: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=800&q=80',
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
    description: 'Professional cinema cameras, broadcast crews, and drone permit.',
    foreignNonResidentUSD: 250,
    foreignResidentUSD: 150,
    ethiopianCitizenETB: 8000,
    unit: 'per crew / day',
  },
]

/* =========================================================================
   PARK QUICK STATS & CONTACTS
   ========================================================================= */
export const PARK_INSTITUTIONAL_DATA = {
  name: 'Borena National Park',
  authority: 'Ethiopian Wildlife Conservation Authority (EWCA)',
  regionalState: 'Oromia Regional State',
  establishedYear: '2016 (Upgraded Sanctuary to National Park Status)',
  totalAreaHectares: '1,200,000+ ha (Combined core & buffer ecosystems)',
  elevationRange: '1,000 m to 2,050 m above sea level',
  headquarters: 'Yabelo, Borena Zone, Oromia, Ethiopia',
  emergencyPhone: '+251 (0) 46 444 0210',
  hotline24: '+251 (0) 91 100 2345',
  officialEmail: 'info@borenapark.gov.et',
  permitsEmail: 'permits@borenapark.gov.et',
  researchEmail: 'research@borenapark.gov.et',
  coordinates: {
    latitude: 4.8872,
    longitude: 38.0833,
  },
  seasons: {
    drySeason: 'October to March & June to August (Optimal game drives, dry roads)',
    rainySeason: 'April to May (Main rains) & September to October (Short rains)',
    averageTempDay: '26°C - 31°C (79°F - 88°F)',
    averageTempNight: '14°C - 18°C (57°F - 64°F)',
  },
}
