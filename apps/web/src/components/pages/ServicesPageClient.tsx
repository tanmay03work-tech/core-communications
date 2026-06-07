'use client';

import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import {SERVICES} from '@/lib/constants';

const serviceDetails = [
  'Strategy, campaigns and reputation programs',
  'Media relations and earned influence',
  'Content programs across owned and earned channels',
  'Social, search and speaker visibility',
  'Web experiences and conversion journeys',
];

const processSteps = [
  {
    num: '01',
    title: 'Signal Audit',
    desc: 'We map your existing narrative, competitive signals, and media share-of-voice to identify where you are and what needs to shift.',
  },
  {
    num: '02',
    title: 'Narrative Shaping',
    desc: 'We craft your positioning, key messages, and spokesperson framework—built for editorial scrutiny and AI-era search signals.',
  },
  {
    num: '03',
    title: 'Activation Plan',
    desc: 'A tighter operating model for planning, messaging, and execution without wasteful padding between strategy and results.',
  },
];

export default function ServicesPageClient() {
  const prefersReducedMotion = useReducedMotion();

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
              Services
            </m.div>
            <m.h1
              className="font-semibold leading-[1.02] tracking-[-0.03em] text-white"
              style={{ fontSize: 'var(--step-h1)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Services that turn visibility into business relevance.
            </m.h1>
          </div>
        </Container>
      </section>

      {/* ─── Services Cards Grid ─────────────────────────── */}
      <section className="bg-cinematic-blend py-[clamp(5rem,9vw,8rem)] text-navy">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.items.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 0.07}>
                <article className="group relative flex h-full min-h-[20rem] flex-col overflow-hidden border border-navy/8 bg-white p-[var(--card-pad)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/28 hover:shadow-[0_16px_48px_rgba(13,27,42,0.09)]">
                  {/* Top accent line on hover */}
                  <div className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[linear-gradient(90deg,#C9952A,#00B896)] opacity-0 transition-all duration-400 group-hover:opacity-100" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />

                  {/* Decorative large number */}
                  <div className="absolute right-4 top-4 text-[4rem] font-bold leading-none text-navy/[0.05]">
                    {service.num}
                  </div>

                  <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent">{service.num}</div>
                  <h2 className="mb-3 pr-8 font-heading text-[1.1rem] font-semibold leading-snug tracking-tight text-navy">{service.title}</h2>
                  <p className="flex-1 font-sans text-[0.88rem] font-normal leading-relaxed text-navy/74">{service.desc}</p>
                  <p className="mt-3 text-[0.8rem] font-serif italic text-navy/60">{serviceDetails[index]}</p>

                  <Link
                    href="/#services"
                    className="mt-5 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-accent no-underline transition-all duration-200 hover:gap-3"
                  >
                    Learn More
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Expanded Services (dark, list layout) ────────── */}
      <section className="relative overflow-hidden bg-ink py-[clamp(5rem,9vw,8rem)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,184,150,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,150,0.05) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            maskImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5) 15%, rgba(0,0,0,0.5) 85%, transparent)',
          }}
        />
        <Container className="relative z-10 max-w-7xl">
          <div className="mb-12">
            <SectionLabel>Expanded Services</SectionLabel>
            <h2 className="section-heading text-white">What each service delivers.</h2>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {SERVICES.items.map((service, index) => (
              <ScrollReveal key={service.slug}>
                <article
                  id={service.slug}
                  className="group relative grid grid-cols-1 gap-6 py-8 transition-colors duration-300 hover:bg-white/[0.02] lg:grid-cols-[auto_minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:py-10"
                >
                  {/* Left accent line on hover */}
                  <div className="absolute inset-y-0 left-0 w-[2px] origin-top bg-accent opacity-0 transition-all duration-400 group-hover:opacity-100" style={{ transform: 'scaleY(0)', transformOrigin: 'top' }} />

                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.26em] text-accent/70 lg:w-8">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-heading text-[1.15rem] font-semibold leading-snug tracking-tight text-white">{service.title}</h3>
                  <p className="font-sans text-[0.9rem] font-normal leading-relaxed text-white/72">{service.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Process ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#1E2F44_0%,#0D1B2A_100%)] py-[clamp(5rem,9vw,8rem)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(-38deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 18px)' }}
        />
        <Container className="relative z-10 max-w-7xl">
          <div className="mb-12">
            <SectionLabel>Process</SectionLabel>
            <h2 className="section-heading text-white">How we work.</h2>
          </div>

          {/* Horizontal connecting line above cards */}
          <div className="relative mb-[-1px] hidden h-px bg-white/10 lg:block" />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.num} delay={index * 0.1}>
                <article className="group relative overflow-hidden border border-white/[0.07] bg-white/[0.025] p-[var(--card-pad)] transition-colors duration-300 hover:border-accent/25">
                  {/* Top connecting dot */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,184,150,0.5)]" />
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent">{step.num}</div>
                  <h3 className="mb-3 font-heading text-[1.05rem] font-semibold tracking-tight text-white">{step.title}</h3>
                  <p className="font-sans text-[0.85rem] font-normal leading-relaxed text-white/72">{step.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Bottom CTA Strip ────────────────────────────── */}
      <section className="bg-navy py-16 text-white">
        <Container className="max-w-7xl">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-heading text-[1.5rem] font-semibold leading-snug tracking-tight text-white">
                Ready to turn complexity into clarity?
              </h2>
              <p className="mt-2 font-sans text-[0.95rem] font-normal leading-relaxed text-white/72">
                Start with a conversation. No pitch, no pressure.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              <span>Start a Conversation</span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
