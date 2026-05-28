'use client';

import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import {ABOUT} from '@/lib/constants';
import TeamSection from '@/components/sections/TeamSection';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpChild = {
  hidden: {opacity: 0, y: 30, filter: 'blur(4px)'},
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {duration: 0.65, ease: [0.16, 1, 0.3, 1]},
  },
};

export default function AboutPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <main className="bg-surface text-navy">
        {/* Page Hero: Full dark navy hero banner (min-h-[40vh]) */}
        <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-ink text-white py-20">
          {/* Futuristic mesh-like grid overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* Subtle glowing radial background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 left-1/4 h-[80%] w-[50%] rounded-full bg-accent/20 blur-[120px]"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <SectionLabel className="text-accent/90">{ABOUT.tag}</SectionLabel>
                <h1 className="mt-3 font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
                  About <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">Core Communication</span>
                </h1>
                <p className="mt-6 max-w-xl font-sans text-base font-normal leading-relaxed text-white/74 md:text-lg">
                  We shape reputations, navigate complex media landscapes, and connect enterprises to high-value markets with credibility and precision.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-primary">
                    <span>Start A Conversation</span>
                  </Link>
                  <Link href="/work" className="btn-ghost text-white border-white/20 hover:border-white">
                    <span>See Our Work</span>
                  </Link>
                </div>
              </div>

              {/* Stats Strip: Right column inside Hero */}
              <m.div
                className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { value: '15+', label: 'Years', detail: 'media relationships across APAC' },
                  { value: '2025', label: 'Founded', detail: 'by practitioners across India and Australia' },
                  { value: '02', label: 'Markets', detail: 'deep focus across Australia and India' },
                ].map((item) => (
                  <m.div
                    key={item.label}
                    variants={prefersReducedMotion ? undefined : fadeUpChild}
                    className="border border-white/8 bg-white/[0.04] backdrop-blur-md p-6 rounded-[1rem] relative overflow-hidden group"
                  >
                    <div className="absolute inset-y-0 left-0 w-[2px] bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="font-heading text-[2.2rem] font-semibold leading-none tracking-tight text-accent">{item.value}</div>
                    <div className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white/80">{item.label}</div>
                    <p className="mt-2 font-sans text-[0.84rem] font-normal leading-relaxed text-white/72">{item.detail}</p>
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        </section>

        {/* Body Section: Light surface, asymmetric split */}
        <section className="relative overflow-hidden py-[clamp(5rem,9vw,8rem)] bg-white text-navy">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
              {/* Left: paragraphs */}
              <ScrollReveal>
                <div className="max-w-xl">
                  <SectionLabel className="text-primary">Our Story</SectionLabel>
                  <h2 className="mt-3 mb-6 font-heading text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-navy">
                    A modern advisory for fast-growing enterprises.
                  </h2>
                  {ABOUT.paragraphs.slice(0, 3).map((paragraph, index) => (
                    <p key={index} className="mb-5 font-sans text-[1rem] font-normal leading-relaxed text-navy/74 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollReveal>

              {/* Right: India-Australia callout with glass card treatment */}
              <ScrollReveal direction="left">
                <div className="relative overflow-hidden rounded-[2rem] border border-navy/8 bg-surface p-[clamp(1.5rem,3vw,2.5rem)] shadow-[0_12px_40px_rgba(13,27,42,0.03)] group">
                  <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-b from-primary to-accent" />
                  <SectionLabel className="text-primary mb-3 block">India-Australia Corridor</SectionLabel>
                  <h3 className="mb-4 font-heading text-[1.25rem] font-semibold leading-snug tracking-tight text-navy">
                    Connecting APAC's most dynamic growth engines.
                  </h3>
                  <p className="font-sans text-base font-normal leading-relaxed text-navy/74">
                    Core operates across the India-Australia corridor with communications shaped for enterprise audiences, local nuance, and cross-market credibility. We bridge the gap between high-level policy and real-world commercial outcomes.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Pillars Section: Dark bg, proper section header above grid-thirds */}
        <section className="relative overflow-hidden bg-navy py-[clamp(5rem,9vw,8rem)] text-white">
          {/* Subtle decorative background gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1/2 right-1/4 h-[80%] w-[50%] rounded-full bg-accent/10 blur-[120px]"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
            <div className="mb-14 max-w-3xl">
              <SectionLabel className="text-accent/90">Core Focus</SectionLabel>
              <h2 className="mt-3 font-heading text-[clamp(2rem,3.5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
                The strategic pillars of our communication.
              </h2>
              <p className="mt-4 font-sans font-normal leading-relaxed text-white/72">
                Every campaign, strategy, and deliverable is anchored on our proven methodology for high-impact communication.
              </p>
            </div>

            <m.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true, margin: '-60px'}}
            >
              {ABOUT.pillars.map((pillar, index) => (
                <m.article
                  key={pillar.title}
                  variants={prefersReducedMotion ? undefined : fadeUpChild}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -5,
                          borderColor: 'rgba(0,184,150,0.4)',
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          transition: {duration: 0.3},
                        }
                  }
                  className="group relative overflow-hidden border border-white/8 bg-white/[0.03] p-[clamp(1.5rem,3vw,2.5rem)] rounded-[1.5rem] transition-colors duration-300"
                >
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-6 text-[3rem] font-bold leading-none text-accent/10 transition-colors duration-300 group-hover:text-accent/20">
                    0{index + 1}
                  </div>
                  <h3 className="mb-3 font-heading text-[1.25rem] font-semibold leading-tight tracking-tight text-white">{pillar.title}</h3>
                  <p className="font-sans text-[0.92rem] font-normal leading-relaxed text-white/74">{pillar.text}</p>
                </m.article>
              ))}
            </m.div>
          </div>
        </section>

        {/* Team Teaser: Full-width dark strip → heading + body → grid-split → then <TeamSection /> */}
        <section className="relative overflow-hidden bg-ink pb-0 pt-[clamp(5rem,9vw,8rem)] text-white">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-end mb-14">
              <div>
                <SectionLabel className="text-accent/90">Our Leadership</SectionLabel>
                <h2 className="mt-3 font-heading text-[clamp(2rem,3.5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight">
                  A senior team built for sharp messaging.
                </h2>
              </div>
              <p className="font-sans text-base font-normal leading-relaxed text-white/74">
                Strategy, earned visibility, and B2B market fluency led by practitioners who understand high-stakes storytelling across the Asia-Pacific region.
              </p>
            </div>
          </div>
          <TeamSection />
        </section>
      </main>
    </LazyMotion>
  );
}
