import {Container} from '@/components/layout/Container';
import SectionLabel from '@/components/ui/SectionLabel';
import {SECTORS_AND_CLIENTS} from '@/lib/constants';

export const metadata = {
  title: 'Sectors',
  description: 'Sectoral expertise and mandates handled.',
};

const featuredSectors = SECTORS_AND_CLIENTS.sectoralExpertise.slice(0, 4);
const remainingSectors = SECTORS_AND_CLIENTS.sectoralExpertise.slice(4);

export default function SectorsPage() {
  return (
    <main className="bg-surface text-navy">
      <section className="section-wrap py-16 md:py-24">
        <Container className="max-w-3xl">
          <SectionLabel className="text-primary">Sectors</SectionLabel>
          <h1 className="section-heading text-navy">Sector expertise shaped for complex B2B markets.</h1>
          <p className="mt-6 text-base leading-8 text-navy/68">
            Deep sector understanding and mandate experience across technology-led industries, emerging categories, and high-stakes communications programs.
          </p>
        </Container>
      </section>

      <section className="section-wrap pt-0">
        <Container>
          <div className="space-y-12">
            {featuredSectors.map((sector, index) => (
              <div key={sector} className="grid-split">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="border border-neutral-100 bg-white p-card-pad">
                    <SectionLabel className="text-primary">Featured Sector</SectionLabel>
                    <h2 className="mb-3 text-[1.5rem] font-semibold leading-tight text-navy">{sector}</h2>
                    <p className="text-[0.95rem] leading-8 text-navy/68">
                      Messaging, market context, and earned authority tuned for complex buyers and category-specific credibility signals.
                    </p>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="h-full min-h-[16rem] border border-neutral-100 bg-[linear-gradient(135deg,rgba(28,46,74,0.08),rgba(91,192,235,0.08))]" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container>
          <SectionLabel className="text-primary">More Sectors</SectionLabel>
          <div className="grid-auto">
            {remainingSectors.map((sector) => (
              <div key={sector} className="border border-neutral-100 bg-white px-5 py-2.5 text-[0.8rem] uppercase tracking-[0.12em] text-navy/68">
                {sector}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
