import SectionLabel from '@/components/ui/SectionLabel';
import SectorsCloudClient from '@/components/sections/SectorsCloudClient';

type SectorsCloudProps = {
  sectors?: string[];
};

const DEFAULT_SECTORS = [
  'Cybersecurity',
  'Identity & IAM',
  'Healthtech',
  'XaaS Platforms',
  'Fintech & BFSI',
  'Critical Infrastructure',
  'Telecom & Technology',
  'Edtech',
  'E-commerce & Retail',
  'Startup & SMBs',
  'Sustainability & CSR',
  'Public Sector & Government',
  'SaaS & CRMs',
  'DeFi & Crypto',
] as const;

export default async function SectorsCloud({sectors}: SectorsCloudProps) {
  const resolvedSectors = sectors?.length ? sectors : [...DEFAULT_SECTORS];

  return (
    <section id="sectors" className="section-wrap bg-ink text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid-split">
          <div className="max-w-xs">
            <SectionLabel>Sector Expertise</SectionLabel>
            <h2
              className="section-heading text-white"
              dangerouslySetInnerHTML={{__html: "We speak <em>your</em> industry's language."}}
            />
            <p className="mt-4 text-[0.92rem] leading-8 text-white/58">
              Sector context, market nuance, and credibility signals tailored to the industries where complex stories need sharper translation.
            </p>
          </div>
          <SectorsCloudClient sectors={resolvedSectors} />
        </div>
      </div>
    </section>
  );
}
