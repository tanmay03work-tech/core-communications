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
    <section id="sectors" className="relative overflow-hidden bg-[#0D1B2E] py-[clamp(5rem,9vw,8rem)] text-white">
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(91,192,235,0.04) 1px, transparent 1px)',
          backgroundSize: '10vw 100%',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Left: label + heading + body */}
          <div className="max-w-md">
            <SectionLabel>Sector Expertise</SectionLabel>
            <h2
              className="section-heading text-white"
              dangerouslySetInnerHTML={{__html: "We speak <em>your</em> industry's language."}}
            />
            <p className="mt-5 font-sans text-[0.95rem] font-normal leading-relaxed text-white/72">
              Sector context, market nuance, and credibility signals tailored to the industries where <span className="font-serif italic">complex</span> stories need sharper translation.
            </p>
          </div>

          {/* Right: sector tags */}
          <SectorsCloudClient sectors={resolvedSectors} />
        </div>
      </div>
    </section>
  );
}
