'use client';

import {LazyMotion, domAnimation, m} from 'framer-motion';
import {useReducedMotionSafe} from '@/hooks/useReducedMotionSafe';
import Link from 'next/link';
import SplitText from '@/components/animations/SplitText';
import SectionLabel from '@/components/ui/SectionLabel';
import {CTA} from '@/lib/constants';
import {cn} from '@/lib/utils';
import type {SectionTheme} from '@/types';

type CTASectionData = {
  title?: string;
  body?: string;
  eyebrow?: string;
  actions?: Array<{ label: string; href: string }>;
  theme?: SectionTheme;
};

type CTASectionProps = {
  section?: CTASectionData;
};

export default function CTASection({section}: CTASectionProps) {
  const prefersReducedMotion = useReducedMotionSafe();
  const title = section?.title ?? CTA.heading;
  const body = section?.body ?? CTA.subtitle;
  const primary = section?.actions?.[0] ?? CTA.primary;
  const secondary = section?.actions?.[1] ?? CTA.secondary;
  const eyebrow = section?.eyebrow ?? "Let's Talk";
  const invertedTheme = section?.theme === 'light' ? 'dark' : 'light';
  const isDark = invertedTheme === 'dark';

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        className={cn(
          'relative overflow-hidden py-[clamp(5rem,9vw,8rem)]',
          isDark
            ? 'bg-[linear-gradient(160deg,#0D1B2A_0%,#1E2F44_60%,#2E4057_100%)] text-white'
            : 'bg-[linear-gradient(160deg,#F4F6F9_0%,#ffffff_56%,#F4F6F9_100%)] text-navy',
        )}
      >
        {/* Diagonal stripe texture */}
        <div
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-0', isDark ? 'opacity-[0.04]' : 'opacity-[0.12]')}
          style={{
            backgroundImage: isDark
              ? 'repeating-linear-gradient(-38deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 20px)'
              : 'repeating-linear-gradient(-38deg, rgba(13,27,42,0.14) 0 1px, transparent 1px 20px)',
          }}
        />

        {/* Radial accent glow behind text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '56rem',
            height: '56rem',
            background: isDark
              ? 'radial-gradient(circle, rgba(0,184,150,0.1), transparent 60%)'
              : 'radial-gradient(circle, rgba(0,184,150,0.16), transparent 60%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Top accent line */}
        <div className={cn(
          'absolute inset-x-0 top-0 h-[2px]',
          isDark
            ? 'bg-[linear-gradient(90deg,transparent,rgba(201,149,42,0.32),rgba(0,184,150,0.52),transparent)]'
            : 'bg-[linear-gradient(90deg,transparent,rgba(13,27,42,0.16),rgba(0,184,150,0.42),transparent)]',
        )} />

        {/* Decorative large quote mark */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute right-[8%] top-[10%] font-serif text-[14rem] leading-none select-none',
            isDark ? 'text-white/[0.025]' : 'text-navy/[0.04]',
          )}
        >
          "
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8 lg:px-16 xl:px-24">
          <SectionLabel className="justify-center">{eyebrow}</SectionLabel>

          {title === CTA.heading ? (
            <h2 className={cn('section-heading', isDark ? 'text-white' : 'text-navy')}>
              Ready to cut <span className="font-serif italic">through</span>?
            </h2>
          ) : (
            <SplitText
              by="word"
              stagger={70}
              className={cn('section-heading', isDark ? 'text-white' : 'text-navy')}
              text={title.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}
            />
          )}

          <m.p
            className={cn(
              'mx-auto mb-10 mt-6 max-w-lg font-sans text-[1rem] font-normal leading-relaxed',
              isDark ? 'text-white/72' : 'text-navy/72',
            )}
            initial={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 16}}
            whileInView={prefersReducedMotion ? {opacity: 1} : {opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={prefersReducedMotion ? {duration: 0} : {duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1]}}
          >
            {body}
          </m.p>

          <m.div
            className="flex flex-wrap justify-center gap-4"
            initial={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 16}}
            whileInView={prefersReducedMotion ? {opacity: 1} : {opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={prefersReducedMotion ? {duration: 0} : {duration: 0.5, delay: 0.48, ease: [0.22, 1, 0.36, 1]}}
          >
            <Link href={primary.href} className="btn-primary">
              <span>{primary.label}</span>
            </Link>
            <Link href={secondary.href} className={isDark ? 'btn-outline-white' : 'btn-ghost'}>
              <span>{secondary.label}</span>
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
