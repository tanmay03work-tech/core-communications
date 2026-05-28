'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

const PROVEN_RESULTS = [
  { value: '20M+',  label: 'Audience reach' },
  { value: '50+',   label: 'Media stories in two weeks' },
  { value: '15+',   label: 'Years of APAC relationships' },
  { value: '95%',   label: 'Media relevance achieved' },
] as const;

function StatItem({
  stat,
  index,
  prefersReducedMotion,
}: {
  stat: { value: string; label: string };
  index: number;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <m.div
      key={stat.label}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
      }
      className="group flex flex-col border-l border-white/10 pl-6 first:border-none first:pl-0"
    >
      <div
        className="font-heading text-[clamp(2.5rem,4.5vw,4rem)] font-bold leading-none tracking-tight text-accent"
      >
        {stat.value}
      </div>
      <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/72">
        {stat.label}
      </p>
    </m.div>
  );
}

export default function NumbersStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#1E2F44_0%,#0D1B2A_100%)] py-16 text-white md:py-20">
        {/* Diagonal stripe background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(-40deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 18px)',
          }}
        />
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,149,42,0.42),rgba(0,184,150,0.55),transparent)]" />
        {/* Bottom accent line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,184,150,0.32),transparent)]" />

        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
          <div className="grid grid-cols-2 gap-8 md:gap-10 lg:grid-cols-4">
            {PROVEN_RESULTS.map((stat, index) => (
              <StatItem
                key={stat.label}
                stat={stat}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
