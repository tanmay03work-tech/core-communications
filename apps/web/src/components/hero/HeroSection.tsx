'use client';

import dynamic from 'next/dynamic';
import {AnimatePresence, m, useScroll, useTransform} from 'framer-motion';
import {useEffect, useMemo, useRef, useState} from 'react';
import FloatingMetrics from '@/components/hero/FloatingMetrics';
import MorphingWord from '@/components/hero/MorphingWord';
import RadarAnimation from '@/components/hero/RadarAnimation';
import {HERO} from '@/lib/constants';
import type {SiteSettings} from '@/types';

type HeroSectionProps = {
  siteSettings?: SiteSettings | null;
};

const DEFAULT_MORPH_WORDS = ['Credibility', 'Cut-through', 'Clarity'];
const DEFAULT_METRICS = HERO.stats.map((stat) => ({
  value: `${stat.value}${stat.suffix}`,
  label: stat.label,
}));
const ParticleCanvas = dynamic(() => import('@/components/hero/ParticleCanvas'), {
  ssr: false,
  loading: () => null,
});
const HERO_LEAD_LINES = [
  'Your business needs a story investors and customers care about',
];
const PROBLEM_STATEMENTS = [
  'Raising capital and need investors to understand your story?',
  'Entering Australia and need local market intelligence?',
  'Looking for earned media to amplify your marketing campaigns?',
  'Need greater visibility among customers, suppliers and partners?',
  'Want executives recognised as trusted industry voices?',
  'Launching innovative technology but struggling to explain its value?',
  'Expanding into new markets and need people to know who you are?',
  'Looking for a go-to-market communications strategy that resonates locally?',
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
  void siteSettings;

  const sectionRef = useRef<HTMLElement | null>(null);
  const typedLeadLine = useTypedTagline(HERO_LEAD_LINES);
  const [problemIndex, setProblemIndex] = useState(0);
  const morphWords = useMemo(() => DEFAULT_MORPH_WORDS, []);
  const metrics = useMemo(() => DEFAULT_METRICS, []);
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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProblemIndex((current) => (current + 1) % PROBLEM_STATEMENTS.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

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
              {HERO.tag}
            </m.div>

            <m.p
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1]}}
              className="mb-4 max-w-[52rem] text-[clamp(1.05rem,2.4vw,1.5rem)] font-light leading-snug text-white/72"
            >
              <span>{typedLeadLine}</span>
              <span className="ml-1 inline-block h-[1.05em] w-px animate-pulse bg-accent/80 align-middle" />
            </m.p>

            <m.p
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1]}}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-[#E8B84B]"
            >
              Welcome to Core Communications
            </m.p>

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
              <span className="mb-2 block overflow-x-visible overflow-y-hidden pb-[0.14em]">
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
              <span className="mb-2 block overflow-x-visible overflow-y-hidden pb-[0.14em]">
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
              <span className="block overflow-x-visible overflow-y-hidden pb-[0.14em]">
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
              className="mt-7 max-w-[48rem] text-body-lg text-white/68"
            >
              {HERO.subtitle}
            </m.p>

            <m.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.7, delay: 0.68, ease: [0.22, 1, 0.36, 1]}}
              className="mt-8 flex max-w-[62rem] flex-wrap items-baseline gap-x-3 gap-y-2 text-white"
            >
              <div className="shrink-0 text-[clamp(1.05rem,1.7vw,1.35rem)] font-semibold text-[#00D4AA]">You are</div>
              <div className="relative min-h-[2.2rem] min-w-0 flex-1 overflow-hidden sm:min-h-[2.45rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <m.p
                    key={problemIndex}
                    initial={{opacity: 0, y: 14, filter: 'blur(6px)'}}
                    animate={{opacity: 1, y: 0, filter: 'blur(0px)'}}
                    exit={{opacity: 0, y: -12, filter: 'blur(6px)'}}
                    transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
                    className="text-[clamp(1.05rem,2vw,1.45rem)] leading-snug text-white/78"
                    style={{willChange: 'transform, opacity, filter'}}
                  >
                    {PROBLEM_STATEMENTS[problemIndex]}
                  </m.p>
                </AnimatePresence>
              </div>
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
                  className="flex min-h-[5.8rem] w-[19rem] shrink-0 items-center gap-3 rounded-[2rem] border border-white/10 bg-white/[0.06] px-4 py-3 text-white backdrop-blur-xl"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_6px_rgba(0,184,150,0.12)]" />
                  <span className="w-[5.6rem] shrink-0 font-heading text-base font-bold tracking-tight">{metric.value}</span>
                  <span className="min-w-0 text-[0.72rem] leading-snug tracking-[0.06em] text-white/62">{metric.label}</span>
                </div>
              ))}
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
          className="absolute bottom-6 left-1/2 z-10 flex w-max max-w-[calc(100%-2.5rem)] -translate-x-1/2 items-center justify-center gap-3 text-white/45"
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
            linear-gradient(rgba(0, 184, 150, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 184, 150, 0.08) 1px, transparent 1px);
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
          background: radial-gradient(circle, rgba(0, 184, 150, 0.22), transparent 68%);
        }

        .hero-blob-two {
          right: 10%;
          top: 18%;
          width: 30rem;
          height: 30rem;
          background: radial-gradient(circle, rgba(201, 149, 42, 0.12), transparent 70%);
        }

        .hero-blob-three {
          bottom: -8rem;
          right: 22%;
          width: 26rem;
          height: 26rem;
          background: radial-gradient(circle, rgba(0, 212, 170, 0.16), transparent 72%);
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
            linear-gradient(135deg, rgba(0, 184, 150, 0.18), rgba(13, 27, 42, 0.28));
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
          border-color: rgba(0, 184, 150, 0.32);
          box-shadow:
            0 18px 40px rgba(5, 12, 24, 0.28),
            0 0 24px rgba(0, 184, 150, 0.12),
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
          background: linear-gradient(90deg, rgba(201, 149, 42, 0.78), rgba(0, 184, 150, 0.9));
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
          background: linear-gradient(90deg, transparent, rgba(0, 184, 150, 0.95), transparent);
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
