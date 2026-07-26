'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';
import { Container } from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import {SECTORS_AND_CLIENTS} from '@/lib/constants';

const sectorContextMap: Record<string, string> = {
  'Cybersecurity': 'From endpoint to enterprise, helping security vendors earn trust with CISOs, boards, and the analyst community.',
  'Identity & IAM': 'Positioning identity-first vendors in a market flooded with noise—through precision narrative and editorial credibility.',
  'Healthtech': 'Communicating clinical value, regulatory nuance, and patient outcomes across APAC\'s complex healthcare landscape.',
  'XaaS Platforms': 'Helping SaaS, PaaS, and IaaS brands move from feature announcements to category leadership.',
};

const featuredSectors = SECTORS_AND_CLIENTS.sectoralExpertise.slice(0, 4);
const remainingSectors = SECTORS_AND_CLIENTS.sectoralExpertise.slice(4);

export default function SectorsPageClient() {
  const prefersReducedMotion = useReducedMotionSafe();

  return (
    <main>
      {/* ─── Page Hero ───────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="page-hero-glow" aria-hidden="true" />
        <Container className="relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <m.div
              className="section-tag mb-6"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Sectors
            </m.div>
            <m.h1
              className="font-semibold leading-[1.02] tracking-[-0.03em] text-white"
              style={{ fontSize: 'var(--step-h1)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Sector expertise shaped for complex B2B markets.
            </m.h1>
            <m.p
              className="mt-6 max-w-xl font-sans text-[1rem] font-normal leading-relaxed text-white/74"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              Deep sector understanding and mandate experience across technology-led industries, emerging categories, and high-stakes communications programs.
            </m.p>
          </div>
        </Container>
      </section>

      {/* ─── Featured Sectors (alternating rows) ──────────── */}
      <section className="bg-cinematic-blend py-[clamp(5rem,9vw,8rem)] text-navy">
        <Container className="max-w-7xl">
          <div className="mb-12">
            <SectionLabel className="text-primary">Featured Sectors</SectionLabel>
            <h2 className="section-heading text-navy">Where we go deep.</h2>
          </div>

          <div className="space-y-5">
            {featuredSectors.map((sector, index) => {
              const isReversed = index % 2 === 1;
              const context = sectorContextMap[sector] ?? 'Messaging, market context, and earned authority tuned for complex buyers and category-specific credibility signals.';

              return (
                <ScrollReveal key={sector} delay={index * 0.06}>
                  <div className={`grid grid-cols-1 gap-5 lg:grid-cols-2 ${isReversed ? 'lg:[direction:rtl]' : ''}`}>
                    {/* Text card */}
                    <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                      <div className="h-full border border-navy/8 bg-white p-8 shadow-[0_8px_32px_rgba(13,27,42,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(13,27,42,0.09)]">
                        <SectionLabel className="text-primary">Featured Sector</SectionLabel>
                        <h3 className="mb-3 font-heading text-[1.5rem] font-semibold leading-snug tracking-tight text-navy">{sector}</h3>
                        <p className="font-sans text-[0.95rem] font-normal leading-relaxed text-navy/74">{context}</p>
                        <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-accent no-underline hover:gap-3 transition-all duration-200">
                          Enquire <span>→</span>
                        </Link>
                      </div>
                    </div>

                    {/* Visual card */}
                    <div className={isReversed ? 'lg:[direction:ltr]' : ''}>
                      <div
                        className="flex h-full min-h-[18rem] flex-col justify-between border border-navy/[0.07] bg-[linear-gradient(135deg,rgba(30,47,68,0.05),rgba(0,184,150,0.08))] p-8"
                      >
                        <div className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy/60">
                          Sector Context
                        </div>
                        <div className="mt-4 space-y-2">
                          {['Media coverage', 'Thought leadership', 'Industry analysts', 'Executive profiling', 'Crisis readiness'].map((kw) => (
                            <div
                              key={kw}
                              className="mr-2 inline-flex items-center gap-2 border border-navy/10 bg-white/80 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-navy/70"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                              {kw}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 text-[3rem] font-bold leading-none tracking-[-0.04em] text-navy/[0.06]">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── All Other Sectors Grid ──────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-[clamp(4.5rem,8vw,7rem)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,184,150,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,150,0.05) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.5) 80%, transparent)',
          }}
        />
        <Container className="relative z-10 max-w-7xl">
          <div className="mb-10">
            <SectionLabel>More Sectors</SectionLabel>
            <h2 className="section-heading text-white">Additional expertise areas.</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {remainingSectors.map((sector, index) => (
              <ScrollReveal key={sector} delay={index * 0.04}>
                <div className="group flex items-center gap-3 border border-white/[0.07] bg-white/[0.025] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/28 hover:bg-white/[0.04]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50 transition-colors duration-200 group-hover:bg-accent" />
                  <span className="font-sans text-[0.82rem] font-normal text-white/74 transition-colors duration-200 group-hover:text-white">
                    {sector}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────── */}
      <section className="bg-navy py-16 text-white">
        <Container className="max-w-7xl">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-heading text-[1.5rem] font-semibold leading-snug tracking-tight text-white">
                Don't see your sector?
              </h2>
              <p className="mt-2 font-sans text-[0.95rem] font-normal leading-relaxed text-white/72">
                We work across complex B2B industries. Let's talk.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              <span>Get in Touch</span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
