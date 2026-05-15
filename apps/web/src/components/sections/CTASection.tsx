'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CTA } from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';

export default function CTASection() {
  return (
    <section className="relative bg-deep px-6 lg:px-16 py-24 text-center overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 bg-grid-pattern-light bg-grid-sm pointer-events-none"
        aria-hidden="true"
      />

      <ScrollReveal>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2
            className="font-display text-[clamp(2.5rem,5vw,5rem)] font-normal mb-5 leading-tight"
            dangerouslySetInnerHTML={{ __html: CTA.heading }}
          />
          <p className="text-[1.05rem] text-white/75 max-w-[480px] mx-auto mb-10 leading-relaxed">
            {CTA.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={CTA.primary.href} className="btn-white">
              {CTA.primary.label}
              <ArrowRight size={14} />
            </Link>
            <Link href={CTA.secondary.href} className="btn-outline-white">
              {CTA.secondary.label}
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
