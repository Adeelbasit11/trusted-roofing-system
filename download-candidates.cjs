const https = require('https');
const fs = require('fs');
const path = require('path');

const candidates = [
  {
    name: 'worker-seamer.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Worker_and_roof_seamer_machine.jpg'
  },
  {
    name: 'repair-9440917.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/3rd_Infantry_Division_Engineers_Repair_Panamanian_School_Roof_in_Salamanca_Community_%289440917%29.jpg'
  },
  {
    name: 'repair-9440921.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/3rd_Infantry_Division_Engineers_Repair_Panamanian_School_Roof_in_Salamanca_Community_%289440921%29.jpg'
  },
  {
    name: 'repair-9440922.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/3rd_Infantry_Division_Engineers_Repair_Panamanian_School_Roof_in_Salamanca_Community_%289440922%29.jpg'
  },
  {
    name: 'oklahoma-contractors.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Oklahoma-roofing-contractors.jpg'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(__dirname, 'candidates', item.name);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(item.url, { headers: { 'User-Agent': 'TrustedRoofingBot/1.0 (contact@trustedroofing.com)' } }, res => {
      if (res.statusCode !== 200) {
        console.log(`Failed ${item.name}: ${res.statusCode}`);
        return resolve(null);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(dest).size;
        console.log(`Downloaded ${item.name} (${size} bytes)`);
        resolve(dest);
      });
    }).on('error', (e) => {
      console.log(`Error ${item.name}:`, e.message);
      resolve(null);
    });
  });
}

async function main() {
  for (const c of candidates) {
    await download(c);
  }
}

main();
