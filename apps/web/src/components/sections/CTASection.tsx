'use client';

import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import Link from 'next/link';
import SplitText from '@/components/animations/SplitText';
import SectionLabel from '@/components/ui/SectionLabel';
import {CTA} from '@/lib/constants';

type CTASectionData = {
  title?: string;
  body?: string;
  eyebrow?: string;
  actions?: Array<{ label: string; href: string }>;
};

type CTASectionProps = {
  section?: CTASectionData;
};

export default function CTASection({section}: CTASectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const title = section?.title ?? CTA.heading;
  const body = section?.body ?? CTA.subtitle;
  const primary = section?.actions?.[0] ?? CTA.primary;
  const secondary = section?.actions?.[1] ?? CTA.secondary;
  const eyebrow = section?.eyebrow ?? "Let's Talk";

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        className="relative overflow-hidden bg-[linear-gradient(160deg,#1C2E4A_0%,#0D1B2E_60%,#0B1F33_100%)] py-[clamp(5rem,9vw,8rem)] text-white"
      >
        {/* Diagonal stripe texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(-38deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 20px)',
          }}
        />

        {/* Radial accent glow behind text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '56rem',
            height: '56rem',
            background: 'radial-gradient(circle, rgba(91,192,235,0.1), transparent 60%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(91,192,235,0.5),transparent)]" />

        {/* Decorative large quote mark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-[10%] font-serif text-[14rem] leading-none text-white/[0.025] select-none"
        >
          "
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8 lg:px-16 xl:px-24">
          <SectionLabel className="justify-center">{eyebrow}</SectionLabel>

          {title === CTA.heading ? (
            <h2 className="section-heading text-white">
              Ready to cut <span className="font-serif italic">through</span>?
            </h2>
          ) : (
            <SplitText
              by="word"
              stagger={70}
              className="section-heading text-white"
              text={title.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}
            />
          )}

          <m.p
            className="mx-auto mb-10 mt-6 max-w-lg font-sans text-[1rem] font-normal leading-relaxed text-white/72"
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
            <Link href={secondary.href} className="btn-outline-white">
              <span>{secondary.label}</span>
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
