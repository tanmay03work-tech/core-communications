import Link from 'next/link';
import {Container} from '@/components/layout/Container';
import TeamSection from '@/components/sections/TeamSection';
import SectionLabel from '@/components/ui/SectionLabel';
import {ABOUT} from '@/lib/constants';

export const metadata = {
  title: 'About',
  description: 'About Core Communications.',
};

export default function AboutPage() {
  return (
    <main className="bg-surface text-navy">
      <section className="section-wrap py-20 md:py-28">
        <Container>
          <div className="grid-split">
            <div>
              <SectionLabel className="text-primary">About Core</SectionLabel>
              <h1 className="section-heading max-w-3xl text-navy">About Core Communication</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-navy/68">{ABOUT.paragraphs[0]}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary"><span>Start A Conversation</span></Link>
                <Link href="/work" className="btn-ghost"><span>See Our Work</span></Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                { value: '15+', label: 'Years', detail: 'media relationships across APAC' },
                { value: '2025', label: 'Founded', detail: 'by practitioners across India and Australia' },
                { value: '02', label: 'Markets', detail: 'deep focus across Australia and India' },
              ].map((item) => (
                <div key={item.label} className="border border-neutral-100 bg-white p-6">
                  <div className="text-[2rem] font-semibold leading-none text-navy">{item.value}</div>
                  <div className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-navy/62">{item.label}</div>
                  <p className="mt-3 text-[0.82rem] leading-7 text-navy/62">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container>
          <div className="grid-split">
            <div>
              {ABOUT.paragraphs.slice(1, 3).map((paragraph) => (
                <p key={paragraph} className="mb-4 max-w-xl text-base leading-8 text-navy/70 last:mb-0">{paragraph}</p>
              ))}
            </div>
            <div className="border-l-4 border-accent py-12 pl-6">
              <SectionLabel className="text-primary">India-Australia</SectionLabel>
              <p className="text-base leading-8 text-navy/68">
                Core operates across the India-Australia corridor with communications shaped for enterprise audiences, local nuance, and cross-market credibility.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-wrap bg-ink text-white">
        <Container>
          <SectionLabel>Core Focus</SectionLabel>
          <div className="grid-thirds">
            {ABOUT.pillars.map((pillar) => (
              <article key={pillar.title} className="border border-white/8 bg-white/3 p-card-pad">
                <h3 className="mb-3 text-[1.25rem] font-semibold leading-tight text-white">{pillar.title}</h3>
                <p className="text-[0.92rem] leading-8 text-white/64">{pillar.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap">
        <Container>
          <div className="grid-split">
            <div>
              <SectionLabel className="text-primary">Team Teaser</SectionLabel>
              <h2 className="section-heading text-navy">A senior team built for sharp messaging and stronger outcomes.</h2>
            </div>
            <p className="text-base leading-8 text-navy/68">
              Strategy, earned visibility, and B2B market fluency led by practitioners who understand high-stakes storytelling across APAC.
            </p>
          </div>
        </Container>
      </section>
      <TeamSection />
    </main>
  );
}
