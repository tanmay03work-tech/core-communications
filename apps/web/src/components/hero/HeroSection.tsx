'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HERO } from '@/lib/constants';

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const lineVariants = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeSlideUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-16 overflow-hidden bg-deep">
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid animate-grid-shift"
        aria-hidden="true"
      />

      {/* Glowing Orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full top-1/2 -right-[100px] -translate-y-1/2 blur-[40px] animate-orb-pulse pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(28,46,74,0.55) 0%, rgba(91,192,235,0.18) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Left Column — Content */}
      <motion.div
        className="relative z-10 pt-24 lg:pt-[100px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Tag */}
        <motion.div
          className="section-tag mb-8"
          variants={fadeSlideUp}
          custom={0}
        >
          {HERO.tag}
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-hero leading-[1.05] font-normal mb-5"
          variants={containerVariants}
        >
          <span className="block overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              {HERO.headline.line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block italic text-accent" variants={lineVariants}>
              {HERO.headline.line2}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                not just{' '}
              </span>
              noise.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[1.05rem] leading-relaxed text-white/65 max-w-[440px] mb-10 font-light"
          variants={fadeSlideUp}
          custom={0.3}
        >
          {HERO.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 items-center"
          variants={fadeSlideUp}
          custom={0.45}
        >
          <Link href={HERO.cta.primary.href} className="btn-primary">
            <span>{HERO.cta.primary.label}</span>
            <ArrowRight size={14} className="relative z-10" />
          </Link>
          <Link href={HERO.cta.secondary.href} className="btn-ghost">
            {HERO.cta.secondary.label}
          </Link>
        </motion.div>

        {/* Marquee Tagline */}
        <motion.div
          className="mt-16 font-mono text-[1.1rem] tracking-[0.3em] text-white/[0.12] whitespace-nowrap overflow-hidden"
          variants={fadeSlideUp}
          custom={0.6}
        >
          <span className="inline-block animate-marquee-slow">
            {HERO.marquee}
            {HERO.marquee}
          </span>
        </motion.div>
      </motion.div>

      {/* Right Column — Stats Card */}
      <motion.div
        className="relative z-10 flex justify-center lg:justify-end items-center pt-16 lg:pt-[100px]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full max-w-[340px] bg-white/[0.04] border border-white/10 backdrop-blur-[20px] p-10 relative">
          {/* Top gradient border */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #1C2E4A, #5BC0EB)' }}
          />

          {/* Badge */}
          <div className="inline-block text-[0.65rem] tracking-[0.15em] uppercase text-accent-glow border border-accent-glow/30 px-3 py-1 mb-6">
            Proven Impact
          </div>

          {/* Stats */}
          {HERO.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-5 ${i < HERO.stats.length - 1 ? 'border-b border-white/[0.07]' : ''}`}
            >
              <div className="font-mono text-[2.8rem] leading-none text-white tracking-[0.03em]">
                {stat.value}
                <span className="text-accent-glow">{stat.suffix}</span>
              </div>
              <div className="text-[0.72rem] tracking-[0.15em] uppercase text-white/45 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
