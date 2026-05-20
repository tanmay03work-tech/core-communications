'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { m, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { CASE_STUDIES, CTA } from '@/lib/constants';

interface WorkPageClientProps {
  studies: readonly any[];
}

const filterTabs = ['All', 'Cybersecurity', 'Healthtech', 'Fintech', 'Leadership'];

function getStudyDescription(study: any) {
  return 'desc' in study ? study.desc : study.description ?? '';
}
function getStudyStats(study: any) {
  return study.stats ?? [];
}
function getStudySlug(study: any) {
  return typeof study.slug === 'string' ? study.slug : study.slug?.current ?? '';
}

export default function WorkPageClient({ studies }: WorkPageClientProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('All');

  // Filter logic
  const filteredStudies = studies.filter((study) => {
    if (activeTab === 'All') return true;
    
    const studyTag = (study.tag ?? '').toLowerCase();
    const studyClient = (study.client ?? '').toLowerCase();
    const target = activeTab.toLowerCase();
    
    return studyTag.includes(target) || studyClient.includes(target);
  });

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
              Our Work
            </m.div>
            <m.h1
              className="font-semibold leading-[1.02] tracking-[-0.03em] text-white"
              style={{ fontSize: 'var(--step-h1)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Results that move credibility, reach, and business momentum.
            </m.h1>
            <m.p
              className="mt-6 max-w-xl text-[1rem] font-light leading-[1.85] text-white/60"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              We measure success in institutional credibility, market authority, and outcomes that keep compounding beyond the first headline.
            </m.p>
          </div>
        </Container>
      </section>

      {/* ─── Sticky Filter Bar ───────────────────────────── */}
      <div className="sticky top-[72px] z-20 border-b border-navy/8 bg-white/90 py-3 backdrop-blur-md">
        <Container className="max-w-7xl">
          <div className="flex gap-2.5 overflow-x-auto pb-0.5 hide-scrollbar">
            {filterTabs.map((filter) => {
              const isActive = activeTab === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveTab(filter)}
                  className={`relative shrink-0 px-5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-navy'
                      : 'border border-navy/12 bg-transparent text-navy/55 hover:border-navy/28 hover:text-navy'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* ─── Work Cards Grid ─────────────────────────────── */}
      <section className="bg-[linear-gradient(180deg,#F5F7FA_0%,#ffffff_50%,#F5F7FA_100%)] py-[clamp(4rem,7vw,6.5rem)] text-navy">
        <Container className="max-w-7xl">
          <m.div 
            layout={!prefersReducedMotion}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, index) => (
                <m.div
                  key={getStudySlug(study)}
                  layout={!prefersReducedMotion}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ScrollReveal delay={index * 0.05}>
                    <Link
                      href={`/work/${getStudySlug(study)}`}
                      className="card-work group flex h-full flex-col justify-between border border-navy/8 bg-white p-[clamp(1.5rem,3vw,2.5rem)] no-underline rounded-[1.5rem] shadow-[0_4px_20px_rgba(28,46,74,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/28 hover:shadow-[0_16px_48px_rgba(28,46,74,0.08)]"
                    >
                      <div>
                        {/* Tag + arrow */}
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary">
                            {study.client}
                          </div>
                          <ArrowUpRight className="h-5 w-5 shrink-0 text-navy/28 transition-all duration-300 group-hover:rotate-45 group-hover:text-accent" />
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 text-[1.35rem] font-semibold leading-snug text-navy">
                          {study.title}
                        </h3>

                        {/* Description */}
                        <p className="line-clamp-3 text-[0.88rem] font-light leading-[1.8] text-navy/60">
                          {getStudyDescription(study)}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="mt-6 grid grid-cols-2 gap-5 border-t border-navy/[0.07] pt-6">
                        {getStudyStats(study).slice(0, 4).map((stat: any) => (
                          <div key={stat.label}>
                            <div className="text-[1.8rem] font-semibold leading-none tracking-[-0.02em] text-navy">
                              {stat.value}
                            </div>
                            <div className="mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-navy/40">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Link>
                  </ScrollReveal>
                </m.div>
              ))}
            </AnimatePresence>
          </m.div>
        </Container>
      </section>

      {/* ─── Bottom CTA ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,#1C2E4A_0%,#0D1B2E_100%)] py-[clamp(4rem,7vw,6rem)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(-38deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 18px)' }}
        />
        <Container className="relative z-10 max-w-3xl text-center">
          <SectionLabel className="justify-center">Next Step</SectionLabel>
          <h2 className="section-heading mt-2 text-white">Ready for outcomes like these?</h2>
          <p className="mx-auto mt-5 max-w-md text-[1rem] font-light leading-[1.85] text-white/55">{CTA.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={CTA.primary.href} className="btn-primary">
              <span>{CTA.primary.label}</span>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
