const key = '753516748726592';
const secret = 'ZBKgiNc85rHkfbjcqOEBr11m8bQ';
const cloud = 'd39v3q6s';
const auth = Buffer.from(`${key}:${secret}`).toString('base64');

async function test() {
  try {
    console.log('--- 1. Checking asset folder borana-national-park/culture ---');
    const afRes = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/resources/by_asset_folder?asset_folder=borana-national-park/culture`, {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    const afData = await afRes.json();
    console.log('Asset folder borana-national-park/culture result:', JSON.stringify(afData, null, 2));

    console.log('\n--- 2. Checking asset folder culture ---');
    const afRes2 = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/resources/by_asset_folder?asset_folder=culture`, {
      headers: { 'Authorization': `Basic ${auth}` }
    });
    const afData2 = await afRes2.json();
    console.log('Asset folder culture result:', JSON.stringify(afData2, null, 2));

    console.log('\n--- 3. Checking all asset folders in borana-national-park ---');
    const subfolders = ['conservation', 'culture', 'experiences', 'gallery', 'hero', 'videos', 'wildlife'];
    for (const folder of subfolders) {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/resources/by_asset_folder?asset_folder=borana-national-park/${folder}`, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      const data = await res.json();
      console.log(`Folder borana-national-park/${folder} count:`, data.resources ? data.resources.length : 'error', data.resources?.map(r => ({ id: r.public_id, url: r.secure_url })));
    }
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
