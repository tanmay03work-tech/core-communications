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
  hidden: {opacity: 0, y: 28, filter: 'blur(4px)'},
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
      <section id="services" className="relative overflow-hidden bg-[#0D1B2E] py-[clamp(5rem,9vw,8rem)] text-white">
        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(91,192,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,192,235,0.06) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.6) 80%, transparent)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
          {/* Section header — 2-column: heading left, subtitle + link right */}
          <div className="mb-14 grid grid-cols-1 items-end gap-8 md:mb-16 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel>{SERVICES.tag}</SectionLabel>
              <SplitText
                by="word"
                stagger={60}
                className="section-heading text-white"
                text={SERVICES.heading.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}
              />
            </div>
            <div className="flex flex-col justify-end gap-6">
              <p className="text-[0.92rem] font-light leading-[1.85] text-white/52">{SERVICES.subtitle}</p>
              <Link href="/services" className="btn-outline-white self-start">
                <span>View All Services</span>
              </Link>
            </div>
          </div>

          {/* Services cards grid */}
          <m.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-60px'}}
          >
            {SERVICES.items.map((service) => (
              <m.div
                key={service.num}
                variants={prefersReducedMotion ? undefined : fadeUpChild}
                className="card-service group relative flex min-h-[22rem] flex-col overflow-hidden border border-white/7 bg-white/[0.025] p-[var(--card-pad)]"
                style={prefersReducedMotion ? undefined : {willChange: 'transform, background-color'}}
              >
                {/* Hover fill gradient */}
                <m.div
                  className="absolute inset-y-0 left-0 w-full origin-left bg-[linear-gradient(90deg,rgba(91,192,235,0.07),transparent_60%)]"
                  initial={{scaleX: 0}}
                  whileHover={prefersReducedMotion ? undefined : {scaleX: 1}}
                  transition={prefersReducedMotion ? {duration: 0} : {duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
                />

                {/* Large decorative number */}
                <div className="absolute right-4 top-4 font-bold leading-none text-white/[0.06] text-[4rem]">
                  {service.num}
                </div>

                <div className="relative z-[1] flex flex-1 flex-col">
                  <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent">
                    {service.num}
                  </div>
                  <h3 className="mb-4 text-[1.1rem] font-semibold leading-snug text-white pr-8">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-[0.85rem] font-light leading-[1.85] text-white/52">
                    {service.desc}
                  </p>
                  <Link
                    href={`/services#${service.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent no-underline transition-all duration-200 hover:gap-3"
                  >
                    Learn More
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
