import {Container} from '@/components/layout/Container';
import SectionLabel from '@/components/ui/SectionLabel';
import {SERVICES} from '@/lib/constants';

const serviceDetails = [
  'Precision media relations and distribution',
  'Editorial engagement and thought leadership',
  'Issues and crisis communications',
  'Creator and influencer outreach',
  'Trade-body partnerships and branded engagements',
  'Content development and opinion research',
];

export const metadata = {
  title: 'Services',
  description: 'Services and Core difference.',
};

export default function ServicesPage() {
  return (
    <main className="bg-surface text-navy">
      <section className="section-wrap py-20">
        <Container className="max-w-3xl">
          <SectionLabel className="text-primary">Services</SectionLabel>
          <h1 className="section-heading text-navy">Services that turn visibility into business relevance.</h1>
          <p className="mt-6 text-base leading-8 text-navy/68">
            Six focused services built for B2B brands that need clearer positioning, stronger visibility, and market-facing credibility.
          </p>
        </Container>
      </section>

      <section className="section-wrap pt-0">
        <Container>
          <div className="grid-thirds">
            {SERVICES.items.map((service, index) => (
              <article key={service.slug} className="border border-neutral-100 bg-white p-card-pad">
                <div className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent">{service.num}</div>
                <h2 className="mb-3 text-[1.25rem] font-semibold leading-tight text-navy">{service.title}</h2>
                <p className="text-[0.92rem] leading-8 text-navy/68">{service.desc}</p>
                <p className="mt-4 text-sm leading-7 text-navy/60">{serviceDetails[index]}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container>
          <SectionLabel className="text-primary">Expanded Services</SectionLabel>
          <div className="divide-y divide-neutral-100 border-y border-neutral-100 bg-white">
            {SERVICES.items.map((service) => (
              <article key={service.slug} id={service.slug} className="p-card-pad">
                <h3 className="mb-3 text-[1.35rem] font-semibold leading-tight text-navy">{service.title}</h3>
                <p className="text-[0.95rem] leading-8 text-navy/68">{service.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap bg-ink text-white">
        <Container>
          <SectionLabel>Process</SectionLabel>
          <div className="grid-thirds">
            {['Signal audit', 'Narrative shaping', 'Activation plan'].map((step) => (
              <article key={step} className="border border-white/8 bg-white/3 p-card-pad">
                <h3 className="mb-2 text-xl font-semibold text-white">{step}</h3>
                <p className="text-sm leading-7 text-white/64">
                  A tighter operating model for planning, messaging, and execution without wasteful padding between stages.
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
