'use client';

import Link from 'next/link';
import MagneticButton from '@/components/animations/MagneticButton';
import ScrollReveal from '@/components/motion/ScrollReveal';

const insightItems = [
  {
    title: 'Regulatory Nuance',
    body: 'TGA approvals, ASIC guidance, APRA standards - we navigate the rules your media outreach must follow.',
  },
  {
    title: 'Analyst Relations',
    body: 'Gartner, Forrester, IDC, Omdia - different sectors have different analyst focus. We know who influences which industry.',
  },
  {
    title: 'Media Mapping',
    body: 'Reuters, Bloomberg, The Australian, TechAU, Mint, Business Today - your story lands in outlets that matter to your buyers.',
  },
];

export default function SectorInsightsCallout() {
  return (
    <section className="bg-primary px-6 py-20 text-white lg:px-16">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-sans font-heading text-[clamp(2.4rem,4vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            Every sector tells a different story
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/70">
            From regulatory documents to analyst reports, we understand the unique
            media and influencer ecosystems that matter in your industry.
          </p>

          <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
            {insightItems.map((item) => (
              <article key={item.title} className="border border-white/12 bg-white/5 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/72">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <MagneticButton className="inline-block">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-accent"
              >
                Discuss your sector
              </Link>
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
