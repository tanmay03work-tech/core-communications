'use client';

import dynamic from 'next/dynamic';
import {m, useScroll, useTransform} from 'framer-motion';
import Link from 'next/link';
import {useEffect, useMemo, useRef, useState} from 'react';
import FloatingMetrics from '@/components/hero/FloatingMetrics';
import MorphingWord from '@/components/hero/MorphingWord';
import RadarAnimation from '@/components/hero/RadarAnimation';
import {useMagnetic} from '@/hooks/useMagnetic';
import {HERO} from '@/lib/constants';
import type {SiteSettings} from '@/types';

type HeroSectionProps = {
  siteSettings?: SiteSettings | null;
};

const DEFAULT_MORPH_WORDS = ['clarity', 'credibility', 'cut-through'];
const DEFAULT_METRICS = HERO.stats.map((stat) => ({
  value: `${stat.value}${stat.suffix}`,
  label: stat.label,
}));
const ParticleCanvas = dynamic(() => import('@/components/hero/ParticleCanvas'), {
  ssr: false,
  loading: () => null,
});
const TAGLINES = [
  'Built for ambitious B2B narratives.',
  'Shaped for AI, search, and earned media.',
  'Calibrated for credibility across APAC.',
];

function useTypedTagline(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex] ?? '';
    const completed = displayed === currentPhrase;
    const cleared = displayed.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting && !completed) {
          setDisplayed(currentPhrase.slice(0, displayed.length + 1));
          return;
        }

        if (!isDeleting && completed) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !cleared) {
          setDisplayed(currentPhrase.slice(0, displayed.length - 1));
          return;
        }

        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
      },
      !isDeleting && completed ? 1200 : isDeleting ? 45 : 80,
    );

    return () => window.clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex, phrases]);

  return displayed;
}

export default function HeroSection({siteSettings}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const primaryMagnetic = useMagnetic<HTMLDivElement>(10);
  const typedTagline = useTypedTagline(TAGLINES);
  const morphWords = useMemo(
    () => (siteSettings?.heroMorphWords?.filter(Boolean).length ? siteSettings.heroMorphWords.filter(Boolean) : DEFAULT_MORPH_WORDS),
    [siteSettings?.heroMorphWords],
  );
  const metrics = useMemo(
    () => (siteSettings?.heroMetrics?.length ? siteSettings.heroMetrics : DEFAULT_METRICS),
    [siteSettings?.heroMetrics],
  );
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const blobOneX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const blobOneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blobTwoX = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blobTwoY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobThreeX = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const blobThreeY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const headlineLines = [
    HERO.headline.line1,
    null,
    HERO.headline.line3,
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="hero-shell relative min-h-screen overflow-hidden border-b border-white/10 bg-deep"
      >
        <ParticleCanvas />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <m.div className="hero-blob hero-blob-one" style={{x: blobOneX, y: blobOneY}} aria-hidden="true" />
        <m.div className="hero-blob hero-blob-two" style={{x: blobTwoX, y: blobTwoY}} aria-hidden="true" />
        <m.div className="hero-blob hero-blob-three" style={{x: blobThreeX, y: blobThreeY}} aria-hidden="true" />
        <RadarAnimation />

        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1540px] grid-cols-1 gap-10 px-5 pb-16 pt-28 sm:px-container-padding lg:grid-cols-[minmax(0,1fr)_minmax(19rem,23rem)] lg:items-center lg:gap-12 lg:pb-20 lg:pt-32 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,27rem)] xl:gap-16">
          <div className="min-w-0 max-w-[72rem] lg:justify-self-start">
            <m.div
              initial={{opacity: 0, y: 22}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
              className="section-tag mb-8"
            >
              {siteSettings?.tagline ?? HERO.tag}
            </m.div>

            <m.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {staggerChildren: 0.12, delayChildren: 0.14},
                },
              }}
              className="max-w-full font-heading text-[clamp(2.45rem,11.5vw,3.2rem)] leading-[1.06] text-white sm:text-hero sm:leading-[0.98] xl:text-[clamp(4.05rem,4.45vw,5.45rem)]"
            >
              <span className="mb-2 block overflow-x-visible overflow-y-hidden">
                <m.span
                  className="block max-w-full break-words xl:whitespace-nowrap"
                  variants={{
                    hidden: {y: '110%'},
                    visible: {
                      y: 0,
                      transition: {duration: 0.82, ease: [0.22, 1, 0.36, 1]},
                    },
                  }}
                >
                  {headlineLines[0]}
                </m.span>
              </span>
              <span className="mb-2 block overflow-x-visible overflow-y-hidden">
                <m.span
                  className="block max-w-full break-words"
                  variants={{
                    hidden: {y: '110%'},
                    visible: {
                      y: 0,
                      transition: {duration: 0.82, ease: [0.22, 1, 0.36, 1]},
                    },
                  }}
                >
                  {HERO.headline.line2 ? <span className="mr-3 text-white/82">{HERO.headline.line2}</span> : null}
                  <MorphingWord words={morphWords} fallback={DEFAULT_MORPH_WORDS[0]} />
                </m.span>
              </span>
              <span className="block overflow-x-visible overflow-y-hidden">
                <m.span
                  className="block max-w-full break-words"
                  variants={{
                    hidden: {y: '110%'},
                    visible: {
                      y: 0,
                      transition: {duration: 0.82, ease: [0.22, 1, 0.36, 1]},
                    },
                  }}
                >
                  {headlineLines[2]}
                </m.span>
              </span>
            </m.h1>

            <m.p
              initial={{opacity: 0, y: 28}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1]}}
              className="mt-8 max-w-[42rem] text-body-lg text-white/68"
            >
              {HERO.subtitle}
            </m.p>

            <m.div
              initial={{opacity: 0, y: 28}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1]}}
              className="mt-10 flex flex-wrap items-center gap-4 sm:gap-8 lg:gap-10"
            >
              <m.div
                ref={primaryMagnetic.ref}
                style={primaryMagnetic.style}
                onMouseMove={primaryMagnetic.onMouseMove}
                onMouseLeave={primaryMagnetic.onMouseLeave}
                className="shrink-0"
              >
                <Link href={HERO.cta.secondary.href} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_14px_32px_rgba(5,12,24,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/15 sm:px-6 sm:tracking-[0.18em]">
                  <span className="relative z-[1]">Start a Conversation</span>
                </Link>
              </m.div>
              <Link href={HERO.cta.primary.href} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 shadow-[0_14px_32px_rgba(5,12,24,0.18)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.1] hover:text-white sm:px-6 sm:tracking-[0.18em]">
                <span>See Our Work</span>
                <span aria-hidden="true">→</span>
              </Link>
            </m.div>

            <m.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1]}}
              className="mobile-scroll-pane -mx-5 mt-8 flex gap-3 px-5 pb-2 lg:hidden"
            >
              {metrics.map((metric, index) => (
                <div
                  key={`${metric.label}-${metric.value}-${index}`}
                  className="flex min-h-[5rem] w-[17rem] shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-white backdrop-blur-xl"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_6px_rgba(91,192,235,0.12)]" />
                  <span className="font-heading text-lg font-bold tracking-tight">{metric.value}</span>
                  <span className="text-[0.68rem] uppercase leading-snug tracking-[0.14em] text-white/58">{metric.label}</span>
                </div>
              ))}
            </m.div>

            <m.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.7, delay: 0.78, ease: [0.22, 1, 0.36, 1]}}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <span className="text-xs uppercase tracking-[0.28em] text-accent/75">Signal</span>
              <span className="text-sm text-white/62">
                {typedTagline}
                <span className="ml-1 inline-block h-[1.05em] w-px animate-pulse bg-accent/80 align-middle" />
              </span>
            </m.div>
          </div>

          <div className="hidden lg:flex lg:min-h-[34rem] lg:items-center lg:justify-end">
            <FloatingMetrics metrics={metrics} />
          </div>
        </div>

        <m.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1]}}
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 text-white/45"
        >
          <span className="hero-scroll-line" aria-hidden="true" />
          <span className="text-[0.7rem] uppercase tracking-[0.24em]">Scroll to explore</span>
        </m.div>
      </section>

      <style jsx>{`
        .hero-shell {
          background: var(--gradient-hero);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(91, 192, 235, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91, 192, 235, 0.08) 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.95), transparent 92%);
          animation: heroGridShift 18s linear infinite;
          pointer-events: none;
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
          opacity: 0.22;
          pointer-events: none;
        }

        .hero-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          pointer-events: none;
        }

        .hero-blob-one {
          top: 10%;
          left: -6rem;
          width: 24rem;
          height: 24rem;
          background: radial-gradient(circle, rgba(91, 192, 235, 0.24), transparent 68%);
        }

        .hero-blob-two {
          right: 10%;
          top: 18%;
          width: 30rem;
          height: 30rem;
          background: radial-gradient(circle, rgba(91, 192, 235, 0.14), transparent 70%);
        }

        .hero-blob-three {
          bottom: -8rem;
          right: 22%;
          width: 26rem;
          height: 26rem;
          background: radial-gradient(circle, rgba(91, 192, 235, 0.18), transparent 72%);
        }

        .hero-primary-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          gap: 0.75rem;
          overflow: hidden;
          white-space: nowrap;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04)),
            linear-gradient(135deg, rgba(91, 192, 235, 0.18), rgba(17, 30, 48, 0.28));
          backdrop-filter: blur(18px);
          padding: 1rem 1.45rem;
          line-height: 1;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.96);
          box-shadow:
            0 14px 32px rgba(5, 12, 24, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .hero-primary-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -140%;
          width: 58%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent);
          transform: skewX(-22deg);
          transition: left 0.6s ease;
        }

        .hero-primary-button::after {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 60%);
          pointer-events: none;
        }

        .hero-primary-button:hover {
          transform: translateY(-2px);
          border-color: rgba(91, 192, 235, 0.32);
          box-shadow:
            0 18px 40px rgba(5, 12, 24, 0.28),
            0 0 24px rgba(91, 192, 235, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
        }

        .hero-primary-button:hover::before {
          left: 150%;
        }

        .hero-secondary-link {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          position: relative;
          white-space: nowrap;
          padding: 0.2rem 0;
          line-height: 1;
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(255, 255, 255, 0.72);
          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .hero-secondary-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.3rem;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(91, 192, 235, 0.95), rgba(61, 175, 217, 0.7));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .hero-secondary-link:hover {
          color: rgba(255, 255, 255, 0.96);
        }

        .hero-secondary-link:hover::after {
          transform: scaleX(1);
        }

        .hero-secondary-arrow {
          transition: transform 0.3s ease;
        }

        .hero-secondary-link:hover .hero-secondary-arrow {
          transform: translateX(4px);
        }

        .hero-scroll-line {
          position: relative;
          display: inline-flex;
          width: 40px;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
          overflow: hidden;
        }

        .hero-scroll-line::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(91, 192, 235, 0.95), transparent);
          animation: scrollLine 1.8s ease-in-out infinite;
        }

        @keyframes heroGridShift {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(58px);
          }
        }

        @keyframes scrollLine {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(120%);
          }
        }
      `}</style>
    </>
  );
}
