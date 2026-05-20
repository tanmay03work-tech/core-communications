'use client';

import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import Link from 'next/link';
import SplitText from '@/components/animations/SplitText';
import SectionLabel from '@/components/ui/SectionLabel';
import {SERVICES} from '@/lib/constants';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUpChild = {
  hidden: {opacity: 0, y: 32, filter: 'blur(4px)'},
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {duration: 0.65, ease: [0.22, 1, 0.36, 1]},
  },
};

export default function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section id="services" className="section-wrap bg-ink text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
            <div>
              <SectionLabel>{SERVICES.tag}</SectionLabel>
              <SplitText
                by="word"
                stagger={60}
                className="section-heading text-white"
                text={SERVICES.heading.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}
              />
            </div>
            <p className="text-[0.92rem] leading-8 text-white/58">{SERVICES.subtitle}</p>
          </div>

          <m.div
            className="grid grid-cols-1 gap-px bg-white/8 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-60px'}}
          >
            {SERVICES.items.map((service) => (
              <m.div
                key={service.num}
                variants={prefersReducedMotion ? undefined : fadeUpChild}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        backgroundColor: 'rgba(91, 192, 235, 0.04)',
                        transition: {duration: 0.25},
                      }
                }
                className="group relative flex h-full min-h-[19rem] flex-col overflow-hidden bg-ink p-card-pad"
                style={prefersReducedMotion ? undefined : {willChange: 'transform, background-color'}}
              >
                <m.div
                  className="absolute inset-y-0 left-0 w-full origin-left bg-[linear-gradient(90deg,rgba(91,192,235,0.08),transparent)]"
                  initial={{scaleX: 0}}
                  whileHover={prefersReducedMotion ? undefined : {scaleX: 1}}
                  transition={prefersReducedMotion ? {duration: 0} : {duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
                />
                <div className="absolute right-4 top-4 text-[3rem] leading-none text-white/10">
                  {service.num}
                </div>
                <h3 className="relative z-[1] mb-3 max-w-[18ch] pr-10 text-[1.05rem] font-bold leading-snug text-white">
                  {service.title}
                </h3>
                <p className="relative z-[1] flex-1 text-[0.82rem] leading-7 text-white/55">
                  {service.desc}
                </p>
                <Link href={`/services#${service.slug}`} className="absolute bottom-6 left-6 z-[1] text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-accent no-underline">
                  <m.span
                    initial={{opacity: 0, x: -8}}
                    whileHover={prefersReducedMotion ? undefined : {opacity: 1, x: 0}}
                    transition={prefersReducedMotion ? {duration: 0} : {duration: 0.25, ease: 'easeOut'}}
                    className="inline-flex"
                  >
                    Learn More →
                  </m.span>
                </Link>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
