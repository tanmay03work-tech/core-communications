'use client';

import Link from 'next/link';
import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import SplitText from '@/components/animations/SplitText';
import SectionLabel from '@/components/ui/SectionLabel';
import {CTA} from '@/lib/constants';
import type {CTASectionData} from '@/types';

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
      <section id="contact" className="bg-primary py-20 text-white md:py-28">
        <div className="section-wrap py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel className="justify-center">{eyebrow}</SectionLabel>
            <SplitText by="word" stagger={70} className="section-heading text-white" text={title.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()} />
            <m.p
              className="mb-6 mt-6 text-base leading-8 text-white/72"
              initial={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 16}}
              whileInView={prefersReducedMotion ? {opacity: 1} : {opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={prefersReducedMotion ? {duration: 0} : {duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1]}}
            >
              {body}
            </m.p>
            <div className="flex flex-wrap justify-center gap-4">
              <m.div
                initial={prefersReducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.9}}
                whileInView={prefersReducedMotion ? {opacity: 1} : {opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={prefersReducedMotion ? {duration: 0} : {duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1]}}
                animate={prefersReducedMotion ? undefined : {boxShadow: ['0 0 0 rgba(91,192,235,0)', '0 0 28px rgba(91,192,235,0.24)', '0 0 0 rgba(91,192,235,0)']}}
              >
                <Link href={primary.href} className="btn-primary">
                  <span>{primary.label}</span>
                </Link>
              </m.div>
              <m.div
                initial={prefersReducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.9}}
                whileInView={prefersReducedMotion ? {opacity: 1} : {opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={prefersReducedMotion ? {duration: 0} : {duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1]}}
              >
                <Link href={secondary.href} className="btn-outline-white">
                  <span>{secondary.label}</span>
                </Link>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
