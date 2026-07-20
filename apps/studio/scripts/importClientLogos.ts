import fs from 'node:fs';
import path from 'node:path';
import {getCliClient} from 'sanity/cli';

const logos = [
  ['Adyen', 'adyen.png'],
  ['AirTrunk', 'airtrunk.png'],
  ['Asset Vision', 'asset-vision.png'],
  ['Atomethics', 'atomethics.png'],
  ['Banjo', 'banjo.png'],
  ['Cisco', 'cisco.png'],
  ['Deepworkz', 'deepworkz.png'],
  ['GBG', 'gbg.jpg'],
  ['Global Himalayan Expedition', 'global-himalayan-expedition.png'],
  ['Healthdirect', 'healthdirect.png'],
  ['Huawei', 'huawei.png'],
  ['Matific Education', 'matific.png'],
  ['Nutanix', 'nutanix.png'],
  ['Ojas Media', 'ojas-media.png'],
  ['OneStream', 'onestream.png'],
  ['Parallel Wireless', 'parallel-wireless.png'],
  ['Sunpower Renewables', 'sunpower-renewables.jpg'],
  ['Tiiik Money', 'tiik-money.png'],
  ['Veolia', 'veolia.png'],
  ['Verizon', 'verizon.png'],
  ['Vodafone', 'vodafone.png'],
  ['Zoom', 'zoom.svg'],
] as const;

const showcaseLogos = new Set([
  'Zoom',
  'Vodafone',
  'Matific Education',
  'Sunpower Renewables',
  'Global Himalayan Expedition',
  'Deepworkz',
  'Ojas Media',
  'Parallel Wireless',
  'Veolia',
  'Tiiik Money',
]);

function toDocumentId(name: string) {
  return `clientLogo-${name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;
}

async function main() {
  const client = getCliClient({apiVersion: '2024-10-01'});
  const logosDir = path.resolve(process.cwd(), '..', 'web', 'public', 'images', 'client-logos');

  for (const [index, [name, filename]] of logos.entries()) {
    const filePath = path.join(logosDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing logo file: ${filePath}`);
    }

    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename,
      title: `${name} logo`,
    });

    await client.createOrReplace({
      _id: toDocumentId(name),
      _type: 'clientLogo',
      name,
      logo: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
        alt: `${name} logo`,
      },
      order: (index + 1) * 10,
      featured: showcaseLogos.has(name),
    });

    console.log(`Imported ${name} (${showcaseLogos.has(name) ? 'showcase' : 'hidden'})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
