'use client';

import Link from 'next/link';
import TiltCard from '@/components/animations/TiltCard';
import MagneticButton from '@/components/animations/MagneticButton';
import ScrollReveal from '@/components/motion/ScrollReveal';

const packages = [
  {
    name: 'Starter',
    price: 'Contact for pricing',
    inclusions: [
      'Single-service focus with a defined campaign window',
      'Core messaging, media list, and execution plan',
      'Monthly reporting with priority recommendations',
    ],
  },
  {
    name: 'Scale',
    price: 'Contact for pricing',
    inclusions: [
      '2-3 integrated services across earned and owned channels',
      'Thought leadership or digital PR layered into campaign planning',
      'Weekly dashboards and optimization checkpoints',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Contact for pricing',
    inclusions: [
      'Full communications suite with dedicated senior team',
      'Dual-market strategy for APAC or India-Australia corridor work',
      'Always-on reporting, stakeholder advisory, and rapid-response support',
    ],
  },
];

export default function ServicesPricingSection() {
  return (
    <section className="bg-primary px-6 py-28 text-white lg:px-16">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Packaging
            </p>
            <h2 className="mt-5 font-heading text-[clamp(2.4rem,4vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
              Built around scope, speed, and market complexity
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/68">
              Custom pricing based on scope, duration, and market. Get in touch for a tailored proposal.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {packages.map((item) => (
              <TiltCard key={item.name} className="h-full">
                <article className="flex h-full flex-col border-2 border-accent bg-primary p-10">
                  <h3 className="text-2xl font-bold tracking-[-0.02em]">{item.name}</h3>
                  <p className="mt-4 text-sm uppercase tracking-[0.18em] text-accent">
                    {item.price}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/78">
                    {item.inclusions.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <MagneticButton className="inline-block">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-accent"
                      >
                        Get proposal
                      </Link>
                    </MagneticButton>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
