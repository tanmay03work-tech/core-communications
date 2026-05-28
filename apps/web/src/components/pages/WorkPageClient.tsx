'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { CASE_STUDIES, CTA } from '@/lib/constants';

interface WorkPageClientProps {
  studies: readonly any[];
}

const filterTabs = ['All', 'Cybersecurity', 'Identity', 'Infrastructure', 'AI', 'Fintech'];

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
    const studySector = (study.sector ?? '').toLowerCase();
    const target = activeTab.toLowerCase();
    
    return studyTag.includes(target) || studyClient.includes(target) || studySector.includes(target);
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
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              Our Work
            </m.div>
            <m.h1
              className="font-semibold leading-[1.02] tracking-[-0.03em] text-white"
              style={{ fontSize: 'var(--step-h1)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              Results that move credibility, reach, and business momentum.
            </m.h1>
            <m.p
              className="mt-6 max-w-xl font-sans text-[1rem] font-normal leading-relaxed text-white/74"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              We measure success in institutional credibility, market authority, and outcomes that keep compounding beyond the first headline.
            </m.p>
          </div>
        </Container>
      </section>

      {/* ─── Sticky Filter Bar ───────────────────────────── */}
      <div className="sticky top-[72px] z-20 border-b border-navy/8 bg-white/90 py-3 backdrop-blur-md">
        <Container className="max-w-7xl">
          <div className="mobile-scroll-pane -mx-5 flex gap-2.5 px-5 pb-2 sm:mx-0 sm:px-0">
            {filterTabs.map((filter) => {
              const isActive = activeTab === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveTab(filter)}
                  className={`relative shrink-0 px-5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredStudies.map((study, index) => (
              <m.div
                key={getStudySlug(study)}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, delay: prefersReducedMotion ? 0 : index * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <ScrollReveal delay={index * 0.03}>
                    <Link
                      href={`/work/${getStudySlug(study)}`}
                      className="card-work group flex h-full min-w-0 flex-col justify-between rounded-[1.25rem] border border-navy/8 bg-white p-[clamp(1.25rem,5vw,2.5rem)] no-underline shadow-[0_4px_20px_rgba(28,46,74,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/28 hover:shadow-[0_16px_48px_rgba(28,46,74,0.08)] sm:rounded-[1.5rem]"
                    >
                      <div>
                        {/* Tag + arrow */}
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div className="min-w-0 break-words text-[0.65rem] font-bold uppercase tracking-[0.16em] text-primary/72">
                            {study.client}
                          </div>
                          <ArrowUpRight className="h-5 w-5 shrink-0 text-navy/28 transition-all duration-300 group-hover:rotate-45 group-hover:text-accent" />
                        </div>

                        {/* Title */}
                        <h3 className="mb-3 font-heading text-[1.35rem] font-semibold leading-snug tracking-tight text-navy">
                          {study.title}
                        </h3>

                        {/* Description */}
                        <p className="line-clamp-3 font-sans text-[0.9rem] font-normal leading-relaxed text-navy/74">
                          {getStudyDescription(study)}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-navy/[0.07] pt-6 sm:gap-5">
                        {getStudyStats(study).slice(0, 4).map((stat: any) => (
                          <div key={stat.label}>
                            <div className="font-heading text-[1.8rem] font-semibold leading-none tracking-tight text-navy">
                              {stat.value}
                            </div>
                            <div className="mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy/62">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Link>
                </ScrollReveal>
              </m.div>
            ))}
          </div>
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
          <p className="mx-auto mt-5 max-w-md font-sans text-[1rem] font-normal leading-relaxed text-white/72">{CTA.subtitle}</p>
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
