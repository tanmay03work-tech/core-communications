import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { CASE_STUDIES } from '@/lib/constants';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return CASE_STUDIES.items.map((study) => ({
    slug: study.slug,
  }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = CASE_STUDIES.items.find((item) => item.slug === params.slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <Section theme="dark" className="pt-40 pb-24 border-b border-mist relative bg-ink min-h-[70vh] flex flex-col justify-end">
        <div className="absolute inset-0 bg-grid-pattern-v bg-[length:10vw_100%] opacity-100" aria-hidden="true" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="section-tag mb-10">{study.client}</div>
            <Grid columns={12} gap="lg" className="items-end">
              <h1 className="lg:col-span-8 font-display text-hero text-balance text-white">
                {study.title}
              </h1>
            </Grid>
          </ScrollReveal>
        </Container>
      </Section>

      <Section theme="light" className="py-20 lg:py-24">
        <Container>
          <Grid columns={12} gap="lg">
            <ScrollReveal className="lg:col-span-4">
              <div className="sticky top-40">
                <div className="section-tag text-deep before:bg-deep mb-8">Outcomes</div>
                <div className="flex flex-col gap-10">
                  {study.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display text-5xl text-accent mb-2">
                        {stat.value}
                      </div>
                      <div className="font-title text-[0.8rem] font-bold tracking-[0.2em] uppercase text-navy/50">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-8 lg:col-start-5 flex flex-col gap-10 lg:pl-12 pt-8 lg:pt-0 border-l border-navy/10">
              <p className="text-xl leading-[1.8] font-light text-navy/90 text-balance">
                {study.desc}
              </p>
              {/* Additional narrative content would go here */}
              <div className="h-[2px] w-12 bg-accent mt-8" />
              <h3 className="font-title text-[0.85rem] font-bold tracking-[0.2em] uppercase text-navy/50 mb-2">
                Strategic Approach
              </h3>
              <p className="text-lg leading-[1.8] font-light text-navy/70 text-balance">
                This is a placeholder for the expanded editorial narrative of the case study. It will detail the specific challenges faced by the client, the strategic methodology deployed, and a breakdown of the campaign's execution across channels.
              </p>
            </ScrollReveal>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
