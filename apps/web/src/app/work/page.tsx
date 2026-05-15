import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { CASE_STUDIES, CTA } from '@/lib/constants';

export const metadata = {
  title: 'Work | Core Communications',
  description: 'Results that speak for themselves. Discover our B2B PR case studies.',
};

export default function WorkPage() {
  return (
    <>
      <Section theme="light" className="pt-40 pb-20 border-b border-navy/10 relative">
        <Container>
          <ScrollReveal>
            <div className="section-tag text-deep before:bg-deep mb-8">Our Work</div>
            <Grid columns={12} gap="lg" className="items-end">
              <h1 className="lg:col-span-8 font-display text-hero text-navy text-balance">
                Results that <br />
                <em className="text-accent pr-4">speak</em> for themselves.
              </h1>
              <div className="lg:col-span-4 pb-4 hidden lg:block">
                <p className="text-lg text-navy/70 font-light leading-[1.7] text-balance">
                  We measure success in institutional credibility and enterprise outcomes, not just impressions.
                </p>
              </div>
            </Grid>
          </ScrollReveal>
        </Container>
      </Section>

      <Section theme="dark" className="bg-ink py-0 relative">
        <div className="absolute inset-0 bg-grid-pattern-v bg-[length:10vw_100%] opacity-100" aria-hidden="true" />
        <Container className="relative z-10 px-0 sm:px-container-padding">
          <div className="flex flex-col">
            {CASE_STUDIES.items.map((study) => (
              <ScrollReveal key={study.slug} delay={0.1}>
                <a
                  href={`/work/${study.slug}`}
                  className="group block border-b border-mist py-16 lg:py-24 relative overflow-hidden transition-colors hover:bg-white/[0.01] no-underline cursor-pointer px-6 sm:px-0"
                >
                  <Grid columns={12} gap="lg" className="items-center relative z-10">
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-10 lg:pr-12">
                      {study.stats.slice(0, 2).map((stat) => (
                        <div key={stat.label}>
                          <div className="font-display text-case-study-metric text-accent-glow mb-2 group-hover:scale-105 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            {stat.value}
                          </div>
                          <div className="font-title text-[0.8rem] font-bold tracking-[0.2em] uppercase text-white/50">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="col-span-12 lg:col-span-8 lg:col-start-5 lg:border-l lg:border-mist h-full flex flex-col justify-center pt-10 lg:pt-0 lg:pl-12">
                      <div className="font-title text-[0.85rem] font-bold tracking-[0.2em] uppercase text-accent mb-6">
                        {study.client}
                      </div>
                      <h3 className="font-display text-3xl lg:text-5xl text-white leading-[1.1] mb-6 group-hover:text-accent-light transition-colors duration-500 text-balance">
                        {study.title}
                      </h3>
                      <p className="text-lg leading-[1.8] text-white/60 max-w-3xl font-light text-balance mb-8">
                        {study.desc}
                      </p>
                      <div className="text-[0.85rem] tracking-[0.2em] font-bold uppercase text-accent-glow flex items-center gap-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        Read Case Study <span className="text-xl leading-none font-normal">→</span>
                      </div>
                    </div>
                  </Grid>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section theme="light" className="bg-surface-light text-center border-t border-navy/10 pt-32 pb-40">
        <Container>
          <ScrollReveal>
            <h2 className="font-display text-section text-navy leading-[1.05] mb-8">
              Ready for <em className="text-accent">outcomes</em> like these?
            </h2>
            <p className="text-[1.15rem] text-navy/70 font-light leading-[1.7] mb-14 max-w-xl mx-auto text-balance">
              {CTA.subtitle}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <a href={CTA.primary.href} className="btn-primary px-10 py-5">
                <span>{CTA.primary.label}</span>
              </a>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
