'use client';

import {m} from 'framer-motion';
import CounterAnimation from '@/components/animations/CounterAnimation';
import SplitText from '@/components/animations/SplitText';
import {fadeIn, fadeUp, slideLeft} from '@/lib/framer/variants';

const stats = [
  {value: '16+', label: 'Industry sectors'},
  {value: '15+', label: 'Years APAC media experience'},
  {value: '140+', label: 'Active journalist relationships'},
];

export default function SectorsHero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[linear-gradient(180deg,rgba(244,246,249,1)_0%,rgba(30,47,68,0.06)_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,184,150,0.18),transparent_45%)]" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-[900px] flex-col items-center justify-center px-6 py-32 text-center lg:px-16">
        <m.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{delay: 0.3}}
          className="flex items-center gap-4"
        >
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Our Deep Industry Expertise
          </span>
        </m.div>

        <m.div
          initial="hidden"
          animate="visible"
          variants={slideLeft}
          transition={{delay: 0.4}}
          className="mt-8 overflow-hidden"
        >
          <SplitText
            text="We speak every industry's language"
            by="word"
            delay={400}
            className="font-heading text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-primary"
          />
        </m.div>

        <m.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{delay: 0.7}}
          className="mt-6 max-w-[620px] text-base leading-relaxed text-primary/60"
        >
          16 sectors. 15+ years of media relationships. Every industry has unique
          challenges, regulatory nuances, and media ecosystems. We know them all.
        </m.p>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:justify-center">
          {stats.map((stat, index) => (
            <m.div
              key={stat.label}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{delay: 0.85 + index * 0.12}}
              className="min-w-[180px]"
            >
              <div className="text-[clamp(2.2rem,4vw,3.4rem)] text-primary">
                <CounterAnimation value={stat.value} />
              </div>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/58">
                {stat.label}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
