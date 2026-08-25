import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const VERIFIED_CULTURE_IMAGES = [
  {
    public_id: '619373301_1313029967537848_472084938184086167_n',
    title: 'Borana Community Cultural Gathering',
    caption: 'Pastoralist community members in traditional white cotton attire and beads.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608249/619373301_1313029967537848_472084938184086167_n.jpg',
    width: 1080,
    height: 720,
    tag: 'Community Life',
  },
  {
    public_id: '709066803_1417594430414734_281272406725480445_n',
    title: 'Borana Women in Traditional Attire',
    caption: 'Intricate beadwork, colorful shawls, and ceremonial adornments of Borana women.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608249/709066803_1417594430414734_281272406725480445_n.jpg',
    width: 1080,
    height: 720,
    tag: 'Traditional Attire',
  },
  {
    public_id: '707855818_1417594387081405_7960231960741775671_n',
    title: 'Pastoral Elders at Sacred Council',
    caption: 'Elders gathered to discuss customary grazing routes and peaceful community harmony.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608249/707855818_1417594387081405_7960231960741775671_n.jpg',
    width: 1080,
    height: 720,
    tag: 'Gadaa Assembly',
  },
  {
    public_id: '591181585_1272542681586577_5939286583825392173_n',
    title: 'Borana Youth & Cultural Celebration',
    caption: 'Youth participating in ancestral rites of passage and community singing.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608248/591181585_1272542681586577_5939286583825392173_n.jpg',
    width: 1080,
    height: 720,
    tag: 'Youth Rites',
  },
  {
    public_id: '599764433_1424343812415358_2782897952296694273_n',
    title: 'Buna Qalaa Coffee Blessing Ceremony',
    caption: 'Traditional roasting and offering of Buna Qalaa for peace and community prosperity.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608248/599764433_1424343812415358_2782897952296694273_n.jpg',
    width: 1080,
    height: 720,
    tag: 'Sacred Ritual',
  },
  {
    public_id: '600313081_1424343869082019_7813446701461286414_n',
    title: 'Singing Wells Water Overseers',
    caption: 'Hydrological stewards directing cattle drinking shifts at the Tula Wells.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608248/600313081_1424343869082019_7813446701461286414_n.jpg',
    width: 1080,
    height: 720,
    tag: 'Tula Wells',
  },
  {
    public_id: '600354349_1424343905748682_6703919861338467748_n',
    title: 'Oromo Cultural Heritage Documentation',
    caption: 'Living oral traditions, customary laws, and ancestral rangeland songs.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608248/600354349_1424343905748682_6703919861338467748_n.jpg',
    width: 1080,
    height: 607,
    tag: 'Heritage Archive',
  },
  {
    public_id: '591817754_1272542761586569_2936525008646828463_n',
    title: 'Portrait of Borana Pastoralist Leader',
    caption: 'Elder holding traditional Kallacha sacred symbol of peace and spiritual leadership.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608247/591817754_1272542761586569_2936525008646828463_n.jpg',
    width: 1536,
    height: 2048,
    tag: 'Leadership Portrait',
  },
  {
    public_id: '6295116500530224167',
    title: 'Traditional Pastoralist Homeland',
    caption: 'Panoramic landscape showing ancestral homesteads and sacred acacia woodlands.',
    secure_url: 'https://res.cloudinary.com/d39v3q6s/image/upload/v1787608247/6295116500530224167.jpg',
    width: 500,
    height: 261,
    tag: 'Homeland',
  },
]

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || 'd39v3q6s'
  const apiKey = process.env.CLOUDINARY_API_KEY || '753516748726592'
  const apiSecret = process.env.CLOUDINARY_API_SECRET || 'ZBKgiNc85rHkfbjcqOEBr11m8bQ'

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ resources: VERIFIED_CULTURE_IMAGES, source: 'fallback' })
  }

  try {
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
    
    // 1. Try fetching by asset_folder 'borana-national-park/culture'
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/by_asset_folder?asset_folder=borana-national-park/culture&max_results=100`,
      {
        headers: { Authorization: `Basic ${auth}` },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    )

    if (res.ok) {
      const data = await res.json()
      if (data.resources && data.resources.length > 0) {
        const mapped = data.resources.map((r: any, idx: number) => {
          const verified = VERIFIED_CULTURE_IMAGES.find((v) => v.public_id === r.public_id)
          return {
            public_id: r.public_id,
            title: verified?.title || `Borana Cultural Heritage Photo #${idx + 1}`,
            caption: verified?.caption || 'Authentic documentation of the Borana people and cultural traditions.',
            secure_url: r.secure_url,
            width: r.width,
            height: r.height,
            format: r.format,
            created_at: r.created_at,
            tag: verified?.tag || 'Cultural Heritage',
          }
        })
        return NextResponse.json({ resources: mapped, source: 'cloudinary-live' })
      }
    }

    // 2. Fallback to Search API if asset_folder returned 0
    const searchRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expression: 'folder="borana-national-park/culture" OR asset_folder="borana-national-park/culture"',
        max_results: 100,
      }),
      next: { revalidate: 60 },
    })

    if (searchRes.ok) {
      const searchData = await searchRes.json()
      if (searchData.resources && searchData.resources.length > 0) {
        const mapped = searchData.resources.map((r: any, idx: number) => {
          const verified = VERIFIED_CULTURE_IMAGES.find((v) => v.public_id === r.public_id)
          return {
            public_id: r.public_id,
            title: verified?.title || `Borana Cultural Heritage Photo #${idx + 1}`,
            caption: verified?.caption || 'Authentic documentation of the Borana people and cultural traditions.',
            secure_url: r.secure_url,
            width: r.width,
            height: r.height,
            format: r.format,
            created_at: r.created_at,
            tag: verified?.tag || 'Cultural Heritage',
          }
        })
        return NextResponse.json({ resources: mapped, source: 'cloudinary-search' })
      }
    }

    return NextResponse.json({ resources: VERIFIED_CULTURE_IMAGES, source: 'verified-static' })
  } catch (error) {
    console.error('Error fetching Cloudinary culture resources:', error)
    return NextResponse.json({ resources: VERIFIED_CULTURE_IMAGES, source: 'error-fallback' })
  }
}
