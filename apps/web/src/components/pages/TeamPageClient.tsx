'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import ClientLogos from '@/components/sections/ClientLogos';
import CTASection from '@/components/sections/CTASection';
import TeamSection from '@/components/sections/TeamSection';

export default function TeamPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
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
              The Team
            </m.div>
            <m.h1
              className="font-semibold leading-[1.02] tracking-[-0.03em] text-white"
              style={{ fontSize: 'var(--step-h1)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Senior operators with deep media and market context.
            </m.h1>
            <m.p
              className="mt-6 max-w-xl text-[1rem] font-light leading-[1.85] text-white/60"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              Strategy, earned visibility, and B2B market fluency led by practitioners who understand high-stakes storytelling across APAC.
            </m.p>
          </div>
        </Container>
      </section>

      {/* TeamSection */}
      <TeamSection />

      {/* Client logos */}
      <ClientLogos />

      {/* CTA */}
      <CTASection />
    </>
  );
}
