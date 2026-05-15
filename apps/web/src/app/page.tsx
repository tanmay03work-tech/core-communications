'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { Container } from '@/components/layout/Container';
import {
  HERO, TICKER_CLIENTS, ABOUT, SERVICES,
  SECTORS, CASE_STUDIES, TEAM, CTA, SITE, FOOTER,
} from '@/lib/constants';

/* ─────────────────────────────────────────────────────────
   CORE COMMUNICATIONS — HOMEPAGE
   Faithfully mirrors reference HTML structure.
   Brand colours: #1C2E4A steel blue · #5BC0EB soft blue · #F5F7FA light grey
   ───────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════
          §1  HERO
          ══════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center overflow-hidden pt-20"
        style={{ background: 'var(--deep)' }}
      >
        {/* Animated bg grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage: `linear-gradient(rgba(91,192,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,192,235,0.06) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            animation: 'gridShift 20s linear infinite',
          }}
        />
        {/* Glowing orb */}
        <div
          className="absolute pointer-events-none"
          aria-hidden
          style={{
            width: '600px', height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(28,46,74,0.6) 0%, rgba(91,192,235,0.18) 50%, transparent 70%)',
            top: '50%', right: '-100px',
            transform: 'translateY(-50%)',
            filter: 'blur(40px)',
            animation: 'orbPulse 6s ease-in-out infinite',
          }}
        />

        {/* LEFT */}
        <div className="relative z-10 px-6 lg:px-16 py-16 flex flex-col gap-8">

          {/* Eyebrow */}
          <ScrollReveal>
            <div className="section-tag">{HERO.tag}</div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={0.06}>
            <h1 className="font-display text-white leading-[1.04] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(3.2rem, 5.5vw, 5.5rem)' }}>
              {HERO.headline.line1}<br />
              <em className="italic text-accent">{HERO.headline.line2}</em><br />
              <span className="text-white/25 italic">not just</span>{' '}
              <span className="text-white">{HERO.headline.line3.replace('not just ', '')}</span>
            </h1>
          </ScrollReveal>

          {/* Subheading */}
          <ScrollReveal delay={0.12}>
            <p className="text-white/65 font-light leading-[1.75] max-w-[440px]"
              style={{ fontSize: '1.05rem' }}>
              {HERO.subtitle}
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={HERO.cta.primary.href} className="btn-primary">
                <span>See Our Work</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
              <Link href={HERO.cta.secondary.href} className="btn-outline-white">
                Start a Conversation
              </Link>
            </div>
          </ScrollReveal>

          {/* Marquee tagline */}
          <ScrollReveal delay={0.24}>
            <div className="mt-4 overflow-hidden whitespace-nowrap"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.10)' }}>
              <span className="inline-block animate-marquee-slow">
                {HERO.marquee}{HERO.marquee}
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT — Stats Card */}
        <div className="relative z-10 hidden lg:flex justify-end items-center px-6 lg:px-16 py-16">
          <ScrollReveal delay={0.22}>
            <div
              className="w-[340px] relative"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                padding: '2.5rem',
              }}
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, var(--deep), var(--accent))' }} />

              <div className="text-[0.65rem] tracking-[0.15em] uppercase mb-6"
                style={{ color: 'var(--accent)', border: '1px solid rgba(91,192,235,0.3)', display: 'inline-block', padding: '3px 10px' }}>
                Proven Impact
              </div>

              {HERO.stats.map((stat, i) => (
                <div key={stat.label}
                  className="py-5"
                  style={{ borderBottom: i < HERO.stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <div className="font-mono text-white leading-none"
                    style={{ fontSize: '2.8rem', letterSpacing: '0.03em' }}>
                    {stat.value}<span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
                  </div>
                  <div className="mt-1 text-[0.72rem] tracking-[0.15em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Keyframe styles */}
      <style>{`
        @keyframes gridShift {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        @keyframes orbPulse {
          0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.7; }
          50% { transform: translateY(-50%) scale(1.1); opacity: 1; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          §2  TICKER
          ══════════════════════════════════════════════════ */}
      <div className="overflow-hidden py-3.5" style={{ background: 'var(--deep)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="whitespace-nowrap">
          <span className="inline-block animate-marquee font-mono text-[0.95rem] tracking-[0.2em]"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            {[...TICKER_CLIENTS, ...TICKER_CLIENTS].map((client, i) => (
              <span key={i}>
                {client}
                <span className="mx-8" style={{ color: 'var(--accent)' }}>✦</span>
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          §3  ABOUT
          ══════════════════════════════════════════════════ */}
      <section id="about" className="py-24 lg:py-28" style={{ background: 'var(--surface-light)', color: 'var(--navy)' }}>
        <Container>
          <ScrollReveal>
            <div className="section-tag section-tag-dark mb-8">{ABOUT.tag}</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
              {/* Left */}
              <div>
                <h2 className="section-heading text-navy text-balance mb-8"
                  dangerouslySetInnerHTML={{ __html: ABOUT.heading }} />
                <div className="flex flex-col gap-5">
                  {ABOUT.paragraphs.map((para, i) => (
                    <p key={i} className="text-[1rem] leading-[1.85] font-light text-navy/70">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right — 2×2 pillar cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-0 lg:mt-12">
                {ABOUT.pillars.map((pillar, i) => (
                  <div
                    key={pillar.title}
                    className="card-feature flex flex-col p-6"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <h3 className="font-title text-[0.95rem] font-bold text-navy mb-2 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-[0.82rem] leading-[1.65] text-navy/60 font-light">
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════
          §4  SERVICES
          ══════════════════════════════════════════════════ */}
      <section id="services" className="py-24 lg:py-28 relative" style={{ background: 'var(--navy)' }}>
        <div className="absolute inset-0 bg-vgrid pointer-events-none" aria-hidden />
        <Container className="relative z-10">
          <ScrollReveal>
            {/* Header row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
              <div>
                <div className="section-tag mb-6">{SERVICES.tag}</div>
                <h2 className="section-heading text-white text-balance"
                  dangerouslySetInnerHTML={{ __html: SERVICES.heading }} />
              </div>
              <div>
                <p className="text-[0.92rem] leading-[1.8] text-white/50 font-light lg:pb-1">
                  {SERVICES.subtitle}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.07)' }}>
            {SERVICES.items.map((svc, i) => (
              <ScrollReveal key={svc.num} delay={i * 0.05}>
                <div className="group relative h-full flex flex-col p-10 cursor-default overflow-hidden"
                  style={{
                    background: 'rgba(28,46,74,0.92)',
                    transition: 'background 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(91,192,235,0.14)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(28,46,74,0.92)')}
                >
                  {/* Bottom accent line on hover — done via pseudo trick with a div */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: 'var(--accent)' }} />

                  <div className="font-mono leading-none mb-5"
                    style={{ fontSize: '3rem', color: 'rgba(91,192,235,0.16)' }}>
                    {svc.num}
                  </div>
                  <h3 className="font-title text-[1.05rem] font-bold text-white mb-3 leading-snug">
                    {svc.title}
                  </h3>
                  <p className="text-[0.82rem] leading-[1.7] text-white/50 font-light flex-1">
                    {svc.desc}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-[0.72rem] tracking-[0.15em] uppercase text-accent
                    opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Learn More →
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════
          §5  SECTORS
          ══════════════════════════════════════════════════ */}
      <SectorsSection />

      {/* ══════════════════════════════════════════════════
          §6  CASE STUDIES
          ══════════════════════════════════════════════════ */}
      <section id="work" className="py-24 lg:py-28" style={{ background: 'var(--surface-light)', color: 'var(--navy)' }}>
        <Container>
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="section-tag section-tag-dark mb-5">{CASE_STUDIES.tag}</div>
                <h2 className="section-heading text-navy text-balance"
                  dangerouslySetInnerHTML={{ __html: CASE_STUDIES.heading }} />
              </div>
              <Link href="/work"
                className="text-[0.72rem] tracking-[0.2em] uppercase font-bold text-accent border-b border-accent/40 hover:border-accent transition-colors pb-0.5 whitespace-nowrap self-end sm:self-auto no-underline">
                View All Work →
              </Link>
            </div>
          </ScrollReveal>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CASE_STUDIES.items.map((study, i) => (
              <ScrollReveal key={study.slug} delay={i * 0.07}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group block no-underline relative overflow-hidden"
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(28,46,74,0.08)',
                    padding: '2.5rem',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(28,46,74,0.12)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  {/* Bottom gradient bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                    style={{ background: 'linear-gradient(90deg, var(--deep), var(--accent))' }} />

                  <div className="text-[0.68rem] tracking-[0.2em] uppercase font-bold mb-3"
                    style={{ color: 'var(--deep)' }}>
                    {study.client}
                  </div>
                  <h3 className="font-display text-navy leading-snug mb-3 flex-1"
                    style={{ fontSize: '1.4rem', lineHeight: '1.25' }}>
                    {study.title}
                  </h3>
                  <p className="text-[0.85rem] leading-[1.7] font-light mb-6 line-clamp-3"
                    style={{ color: 'rgba(28,46,74,0.6)' }}>
                    {study.desc}
                  </p>
                  <div className="flex flex-wrap gap-6 pt-5"
                    style={{ borderTop: '1px solid rgba(28,46,74,0.08)' }}>
                    {study.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="font-mono text-[1.8rem] leading-none"
                          style={{ color: 'var(--deep)', letterSpacing: '0.02em' }}>
                          {stat.value}
                        </div>
                        <div className="text-[0.68rem] tracking-[0.12em] uppercase mt-1"
                          style={{ color: 'rgba(28,46,74,0.5)' }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════
          §7  TEAM
          ══════════════════════════════════════════════════ */}
      <section id="team" className="py-24 lg:py-28 relative" style={{ background: 'var(--navy)' }}>
        <div className="absolute inset-0 bg-vgrid pointer-events-none" aria-hidden />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="section-tag mb-6">{TEAM.tag}</div>
            <h2 className="section-heading text-white text-balance mb-12"
              dangerouslySetInnerHTML={{ __html: TEAM.heading }} />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM.members.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <div
                  className="group flex gap-7 items-start p-8"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,192,235,0.3)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(91,192,235,0.12)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-[90px] h-[90px] rounded-full flex items-center justify-center font-title font-extrabold"
                    style={{
                      background: 'var(--deep)',
                      border: '2px solid rgba(91,192,235,0.25)',
                      fontSize: '1.5rem',
                      color: 'var(--accent)',
                    }}>
                    {member.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-title text-white font-bold mb-1" style={{ fontSize: '1.1rem' }}>
                      {member.name}
                    </div>
                    <div className="text-[0.72rem] tracking-[0.15em] uppercase mb-3"
                      style={{ color: 'var(--accent)' }}>
                      {member.role}
                    </div>
                    <p className="text-[0.82rem] leading-[1.7] font-light"
                      style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {member.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════════════════════════════════════
          §8  CLIENT LOGOS STRIP
          ══════════════════════════════════════════════════ */}
      <div className="py-16" style={{ background: 'var(--deep)' }}>
        <Container>
          <ScrollReveal>
            <div className="text-center text-[0.7rem] tracking-[0.25em] uppercase mb-8"
              style={{ color: 'rgba(255,255,255,0.3)' }}>
              Brands we've worked with
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {TICKER_CLIENTS.map((client) => (
                <div key={client}
                  className="font-title text-[0.85rem] font-bold tracking-[0.1em] uppercase px-5 py-2.5 transition-all duration-200"
                  style={{
                    color: 'rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(91,192,235,0.3)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  {client}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* ══════════════════════════════════════════════════
          §9  CTA
          ══════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-24 lg:py-32 text-center overflow-hidden" style={{ background: 'var(--deep)' }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        <Container className="relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-white text-balance mx-auto"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '720px' }}
              dangerouslySetInnerHTML={{ __html: CTA.heading }} />
            <p className="mx-auto mt-5 mb-10 font-light leading-[1.75] text-white/70"
              style={{ fontSize: '1.05rem', maxWidth: '480px' }}>
              {CTA.subtitle}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-3 font-bold uppercase transition-all"
                style={{
                  padding: '1rem 2.2rem',
                  background: '#ffffff',
                  color: 'var(--deep)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.12em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--navy)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = '#ffffff';
                  (e.currentTarget as HTMLElement).style.color = 'var(--deep)';
                }}>
                {CTA.primary.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
              <Link href={CTA.secondary.href} className="btn-outline-white">
                {CTA.secondary.label}
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}

/* ─── Sectors section (client component for interactivity) ─── */
function SectorsSection() {
  const [activeItems, setActiveItems] = useState<Set<string>>(
    () => new Set(SECTORS.items.filter((s) => s.active).map((s) => s.label))
  );

  const toggle = (label: string) => {
    setActiveItems((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  };

  return (
    <section id="sectors" className="py-24 lg:py-28 relative overflow-hidden" style={{ background: 'var(--navy)' }}>
      <div className="absolute inset-0 bg-vgrid pointer-events-none" aria-hidden />
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="section-tag mb-5">{SECTORS.tag}</div>
          <h2 className="section-heading text-white text-balance max-w-xl mb-10"
            dangerouslySetInnerHTML={{ __html: SECTORS.heading }} />
          <div className="flex flex-wrap gap-3">
            {SECTORS.items.map((s) => {
              const isActive = activeItems.has(s.label);
              return (
                <button
                  key={s.label}
                  onClick={() => toggle(s.label)}
                  className="transition-all duration-200 font-sans text-[0.8rem] tracking-[0.08em] cursor-pointer"
                  style={{
                    padding: '0.6rem 1.4rem',
                    border: isActive ? '1px solid var(--deep)' : '1px solid rgba(255,255,255,0.12)',
                    background: isActive ? 'var(--deep)' : 'transparent',
                    color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                    borderRadius: 0,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
                    }
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
