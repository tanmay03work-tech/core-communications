'use client';

import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import {SERVICES} from '@/lib/constants';

const SERVICES_DATA = [
  {
    number: '01',
    category: 'Media Relations',
    icon: '\u{1F4E1}',
    items: [
      'Media Strategy',
      'Editorial Engagement',
      'Issues & Crisis Communications',
      'Media and Trends Research',
    ],
  },
  {
    number: '02',
    category: 'Content Marketing',
    icon: '\u{270D}\u{FE0F}',
    items: [
      'Press Releases & Leadership Articles',
      'Blogs, Newsletters & Whitepapers',
      'Website Content & Research Papers',
      'Case Studies & Social Media Posts',
      'Product, Animated & Social Videos',
    ],
  },
  {
    number: '03',
    category: 'Digital Marketing',
    icon: '\u{1F4CA}',
    items: [
      'Social Media Management',
      'Graphic Designing',
      'SEO / SEM Services',
    ],
  },
  {
    number: '04',
    category: 'GEO Services',
    icon: '\u{1F50D}',
    items: [
      'GEO Content Audit & Visibility Analysis',
      'Campaign Strategy',
      'AI Search Optimisation',
    ],
  },
  {
    number: '05',
    category: 'Influencer & Creator Marketing',
    icon: '\u{1F3AF}',
    items: [
      'Influencer Strategy & Selection',
      'Creator Campaigns',
      'Trends & Virality Programs',
    ],
  },
  {
    number: '06',
    category: 'Website Development',
    icon: '\u{1F4BB}',
    items: [
      'Website Development & Management',
      'Landing Pages',
      'Performance Optimisation',
    ],
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export default function ServicesGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-ink py-[clamp(5rem,9vw,8rem)] text-white">
        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,184,150,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,150,0.06) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.6) 80%, transparent)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
          {/* Section header - 2-column: heading left, subtitle + link right */}
          <div className="mb-14 grid grid-cols-1 items-end gap-8 md:mb-16 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h2 className="section-heading text-white">
                Services built for <span className="font-serif italic">growth.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-6">
              <p className="font-sans text-[0.92rem] font-normal leading-relaxed text-white/72">{SERVICES.subtitle}</p>
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
            {SERVICES_DATA.map((service, index) => (
              <m.div
                key={service.number}
                className="relative flex cursor-default flex-col gap-4 overflow-hidden border border-white/8 bg-white/3 p-7"
                initial={prefersReducedMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-60px'}}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  borderColor: 'rgba(0,184,150,0.3)',
                  backgroundColor: 'rgba(0,184,150,0.03)',
                  transition: {duration: prefersReducedMotion ? 0 : 0.25},
                }}
              >
                {/* Ghost number - background */}
                <span className="absolute right-4 top-3 hidden select-none font-heading text-[3.5rem] font-bold leading-none text-white/5 sm:block">
                  {service.number}
                </span>

                {/* Icon + Title row */}
                <div className="relative z-10 flex items-start gap-3">
                  <span className="mt-0.5 text-xl">{service.icon}</span>
                  <h3 className="font-heading text-base font-semibold leading-snug text-white">
                    {service.category}
                  </h3>
                </div>

                {/* Sub-items list */}
                <ul className="relative z-10 flex flex-col gap-1.5">
                  {service.items.map((item, i) => (
                    <m.li
                      key={item}
                      className="flex items-start gap-2 font-sans text-sm leading-relaxed text-white/55"
                      initial={prefersReducedMotion ? {opacity: 1, x: 0} : {opacity: 0, x: -8}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        delay: prefersReducedMotion ? 0 : 0.15 + index * 0.07 + i * 0.04,
                        ease: 'easeOut',
                      }}
                    >
                      <span className="mt-1.5 shrink-0 text-[0.6rem] text-accent">
                        {'\u25C6'}
                      </span>
                      {item}
                    </m.li>
                  ))}
                </ul>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
