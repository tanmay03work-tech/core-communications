'use client';

import dynamic from 'next/dynamic';
import {motion, useScroll, useTransform} from 'framer-motion';
import {Play} from 'lucide-react';
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

const DEFAULT_MORPH_WORDS = HERO.headline.line2 ? [HERO.headline.line2.replace(',', ''), 'authority', 'cut-through'] : ['credibility', 'authority', 'cut-through'];
const DEFAULT_METRICS = HERO.stats.map((stat) => ({
  value: `${stat.value}${stat.suffix}`,
  label: stat.label,
}));
const ParticleCanvas = dynamic(() => import('@/components/hero/ParticleCanvas'), {
  ssr: false,
  loading: () => null,
});
const VideoModal = dynamic(() => import('@/components/global/VideoModal'), {
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
  const [isVideoOpen, setIsVideoOpen] = useState(false);
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
        <motion.div className="hero-blob hero-blob-one" style={{x: blobOneX, y: blobOneY}} aria-hidden="true" />
        <motion.div className="hero-blob hero-blob-two" style={{x: blobTwoX, y: blobTwoY}} aria-hidden="true" />
        <motion.div className="hero-blob hero-blob-three" style={{x: blobThreeX, y: blobThreeY}} aria-hidden="true" />
        <RadarAnimation />

        <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 gap-16 px-container-padding pb-16 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.82fr)] lg:items-center lg:pb-20 lg:pt-32">
          <div className="max-w-4xl">
            <motion.div
              initial={{opacity: 0, y: 22}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
              className="section-tag mb-8"
            >
              {siteSettings?.tagline ?? HERO.tag}
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {staggerChildren: 0.12, delayChildren: 0.14},
                },
              }}
              className="font-display text-hero leading-[0.98] tracking-[-0.03em] text-white"
            >
              <span className="mb-2 block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{
                    hidden: {y: '110%'},
                    visible: {
                      y: 0,
                      transition: {duration: 0.82, ease: [0.22, 1, 0.36, 1]},
                    },
                  }}
                >
                  {headlineLines[0]}
                </motion.span>
              </span>
              <span className="mb-2 block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{
                    hidden: {y: '110%'},
                    visible: {
                      y: 0,
                      transition: {duration: 0.82, ease: [0.22, 1, 0.36, 1]},
                    },
                  }}
                >
                  <MorphingWord words={morphWords} fallback={HERO.headline.line2.replace(',', '')} />
                  <span className="text-white">,</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={{
                    hidden: {y: '110%'},
                    visible: {
                      y: 0,
                      transition: {duration: 0.82, ease: [0.22, 1, 0.36, 1]},
                    },
                  }}
                >
                  {headlineLines[2]}
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 28}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1]}}
              className="mt-8 max-w-[42rem] text-body-lg text-white/68"
            >
              {HERO.subtitle}
            </motion.p>

            <motion.div
              initial={{opacity: 0, y: 28}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.62, ease: [0.22, 1, 0.36, 1]}}
              className="mt-10 flex flex-wrap items-center gap-8 lg:gap-10"
            >
              <motion.div
                ref={primaryMagnetic.ref}
                style={primaryMagnetic.style}
                onMouseMove={primaryMagnetic.onMouseMove}
                onMouseLeave={primaryMagnetic.onMouseLeave}
                className="shrink-0"
              >
                <Link href={HERO.cta.secondary.href} className="hero-primary-button">
                  <span className="relative z-[1]">Start a Conversation</span>
                </Link>
              </motion.div>
              <Link href={HERO.cta.primary.href} className="hero-secondary-link">
                <span>See Our Work</span>
                <span aria-hidden="true" className="hero-secondary-arrow">→</span>
              </Link>
            </motion.div>

            <motion.div
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
              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="hero-tertiary-link"
              >
                <span className="hero-tertiary-icon">
                  <Play size={12} fill="currentColor" />
                </span>
                <span>Watch reel</span>
              </button>
            </motion.div>
          </div>

          <div className="relative flex min-h-[34rem] items-end justify-end">
            <FloatingMetrics metrics={metrics} />
          </div>
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1]}}
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 text-white/45"
        >
          <span className="hero-scroll-line" aria-hidden="true" />
          <span className="text-[0.7rem] uppercase tracking-[0.24em]">Scroll to explore</span>
        </motion.div>
      </section>

      {isVideoOpen ? <VideoModal open={isVideoOpen} onClose={() => setIsVideoOpen(false)} /> : null}

      <style jsx>{`
        .hero-shell {
          background:
            radial-gradient(circle at top left, rgba(91, 192, 235, 0.1), transparent 30%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
            #1c2e4a;
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
          background: radial-gradient(circle, rgba(145, 112, 255, 0.2), transparent 70%);
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
            linear-gradient(135deg, rgba(91, 192, 235, 0.18), rgba(145, 112, 255, 0.12));
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
          background: linear-gradient(90deg, rgba(91, 192, 235, 0.95), rgba(145, 112, 255, 0.85));
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

        .hero-tertiary-link {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.58);
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .hero-tertiary-link:hover {
          color: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
        }

        .hero-tertiary-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(91, 192, 235, 0.9);
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
