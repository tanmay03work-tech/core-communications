'use client';

import {
  BadgeCheck,
  Building2,
  Cloud,
  CreditCard,
  Droplets,
  HeartPulse,
  Landmark,
  RadioTower,
  Rocket,
  ShieldCheck,
  SunMedium,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import {HOMEPAGE_SECTORS} from '@/lib/constants';

const sectorIcons: LucideIcon[] = [
  BadgeCheck,
  Building2,
  ShieldCheck,
  SunMedium,
  Cloud,
  HeartPulse,
  CreditCard,
  RadioTower,
  Droplets,
  Rocket,
  Waves,
  Landmark,
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.1,
    },
  },
};

export default function SectorsFocusSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="sectors"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#F4F6F9_48%,#ffffff_100%)] py-[clamp(4.5rem,8vw,7rem)] text-navy"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,184,150,0.22),rgba(201,149,42,0.2),transparent)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(rgba(13,27,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(13,27,42,0.035) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.35) 80%, transparent)',
          }}
        />
        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(0,184,150,0.12),transparent_68%)] blur-2xl" />
        <div className="pointer-events-none absolute -left-28 bottom-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(201,149,42,0.12),transparent_68%)] blur-2xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
          <m.div
            className="mb-10 grid grid-cols-1 items-end gap-6 md:mb-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
            initial={prefersReducedMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={prefersReducedMotion ? {duration: 0} : {duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
          >
            <div className={HOMEPAGE_SECTORS.subheading ? undefined : 'lg:col-span-2'}>
              <SectionLabel className="text-primary">{HOMEPAGE_SECTORS.eyebrow}</SectionLabel>
              <h2 className="section-heading text-navy sm:whitespace-nowrap">{HOMEPAGE_SECTORS.heading}</h2>
            </div>
            {HOMEPAGE_SECTORS.subheading ? (
              <p className="max-w-2xl font-sans text-[0.92rem] font-normal leading-relaxed text-navy/70 lg:ml-auto">
                {HOMEPAGE_SECTORS.subheading}
              </p>
            ) : null}
          </m.div>

          <m.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-60px'}}
          >
            {HOMEPAGE_SECTORS.items.map((sector, index) => {
              const Icon = sectorIcons[index] ?? BadgeCheck;

              return (
                <m.article
                  key={sector.title}
                  variants={{
                    hidden: prefersReducedMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 24, filter: 'blur(4px)'},
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: prefersReducedMotion
                        ? {duration: 0}
                        : {duration: 0.54, ease: [0.22, 1, 0.36, 1]},
                    },
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -4,
                          borderColor: 'rgba(0,184,150,0.28)',
                          transition: {duration: 0.25, ease: [0.22, 1, 0.36, 1]},
                        }
                  }
                  className="group relative min-h-[10.5rem] overflow-hidden border border-navy/8 bg-white p-5 shadow-[0_8px_28px_rgba(13,27,42,0.055)]"
                >
                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left bg-[linear-gradient(90deg,var(--gold),var(--blue))] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(0,184,150,0.1),transparent_68%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center border border-navy/8 bg-navy/[0.035] text-accent">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                      <span className="inline-flex max-w-[7.5rem] items-center bg-accent/10 px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-navy/68">
                        {sector.badge}
                      </span>
                    </div>

                    <h3 className="font-heading text-[1rem] font-semibold leading-snug tracking-tight text-navy">
                      {sector.title}
                    </h3>
                    <p className="mt-2 font-sans text-[0.8rem] font-normal leading-relaxed text-navy/62">
                      {sector.descriptor}
                    </p>
                  </div>
                </m.article>
              );
            })}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
