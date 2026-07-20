import {getCliClient} from 'sanity/cli';

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

async function main() {
  const client = getCliClient({apiVersion: '2024-10-01'});
  const logos = await client.fetch<Array<{_id: string; name: string}>>(
    '*[_type == "clientLogo"]{_id, name}',
  );

  const transaction = client.transaction();

  for (const logo of logos) {
    const featured = showcaseLogos.has(logo.name);
    transaction.patch(logo._id, (patch) => patch.set({featured}));
    console.log(`${featured ? 'Showing' : 'Hiding'} ${logo.name}`);
  }

  await transaction.commit();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
