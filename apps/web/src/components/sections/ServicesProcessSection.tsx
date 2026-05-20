'use client';

import {m} from 'framer-motion';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SplitText from '@/components/animations/SplitText';
import {fadeUp, staggerContainer} from '@/lib/framer/variants';

const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'Understand your goals, audience, competitive landscape, and existing brand narrative. We develop a comprehensive 90-day strategy document.',
  },
  {
    number: '02',
    title: 'Asset Development',
    description:
      'Create all content, messaging, media lists, influencer briefings, and timeline. Everything approved before execution.',
  },
  {
    number: '03',
    title: 'Execution & Monitoring',
    description:
      'Launch campaigns, monitor performance in real-time, adjust based on early data. Weekly dashboards keep you in the loop.',
  },
  {
    number: '04',
    title: 'Results & Optimization',
    description:
      'Measure against KPIs, document learnings, and optimize for next cycle. Transparent reporting, no vanity metrics.',
  },
];

export default function ServicesProcessSection() {
  return (
    <section className="bg-white px-6 py-28 lg:px-16">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center">
            <SplitText
              text="How we work"
              by="word"
              className="font-sans text-[clamp(2.4rem,4vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-primary"
            />
            <p className="mt-4 text-base leading-relaxed text-muted">
              From discovery to results: a transparent process.
            </p>
          </div>

          <m.div
            className="mt-14 space-y-10"
            variants={staggerContainer(0.12, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-100px'}}
          >
            {steps.map((step, index) => (
              <m.div
                key={step.number}
                variants={fadeUp}
                className="relative grid gap-6 md:grid-cols-[96px_minmax(0,1fr)] md:gap-10"
              >
                <div className="relative flex md:justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary text-sm font-bold text-primary">
                    {step.number}
                  </div>
                  {index < steps.length - 1 ? (
                    <div
                      className="absolute left-6 top-16 hidden h-28 border-l-2 border-accent md:block"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>

                <div className="max-w-[380px]">
                  <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
