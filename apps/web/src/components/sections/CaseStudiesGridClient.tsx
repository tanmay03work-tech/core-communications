'use client';

import {LazyMotion, domAnimation, m, useAnimation, useReducedMotion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';
import Link from 'next/link';
import type {CaseStudyListItem} from '@/lib/sanity/queries';

type CaseStudiesGridClientProps = {
  caseStudies: CaseStudyListItem[];
};

function getSlug(caseStudy: CaseStudyListItem) {
  return caseStudy.slug?.current ?? '';
}

export default function CaseStudiesGridClient({caseStudies}: CaseStudiesGridClientProps) {
  const prefersReducedMotion = useReducedMotion();
  const statsControls = useAnimation();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="grid grid-cols-1 gap-5 lg:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, margin: '-60px'}}
        variants={{
          hidden: {},
          visible: {
            transition: {staggerChildren: 0.1, delayChildren: 0.1},
          },
        }}
      >
        {caseStudies.map((caseStudy) => {
          const slug = getSlug(caseStudy);

          return (
            <m.div
              key={caseStudy._id ?? slug ?? caseStudy.title}
              variants={{
                hidden: prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 28, filter: 'blur(4px)'},
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: prefersReducedMotion ? {duration: 0} : {duration: 0.65, ease: [0.22, 1, 0.36, 1]},
                },
              }}
              whileHover={prefersReducedMotion ? undefined : {y: -5, transition: {duration: 0.3, ease: [0.22, 1, 0.36, 1]}}}
              onHoverStart={() => {
                void statsControls.start('visible');
              }}
              className="h-full"
            >
              <Link
                href={slug ? `/work/${slug}` : '/work'}
                className="card-work group flex h-full flex-col justify-between border border-navy/8 bg-white p-[var(--card-pad)] text-left no-underline"
              >
                <div>
                  {/* Top: tag + arrow */}
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div className="text-[0.66rem] font-bold uppercase tracking-[0.24em] text-primary">
                      {caseStudy.tag || caseStudy.client}
                    </div>
                    <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-navy/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-[1.4rem] font-semibold leading-snug text-navy">
                    {caseStudy.title}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-3 text-[0.92rem] font-light leading-[1.85] text-navy/60">
                    {caseStudy.description}
                  </p>
                </div>

                {/* Stats row */}
                <div className="mt-6 border-t border-navy/[0.07] pt-6">
                  <m.div className="grid grid-cols-2 gap-5" initial="hidden" animate={statsControls}>
                    {(caseStudy.stats ?? []).slice(0, 4).map((stat, index) => (
                      <m.div
                        key={stat._key ?? stat.label}
                        variants={{
                          hidden: prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 10},
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: prefersReducedMotion ? {duration: 0} : {duration: 0.3, delay: index * 0.08, ease: [0.22, 1, 0.36, 1]},
                          },
                        }}
                      >
                        <div className="text-[1.9rem] font-semibold leading-none tracking-[-0.02em] text-navy">{stat.value}</div>
                        <div className="mt-1.5 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-navy/44">{stat.label}</div>
                      </m.div>
                    ))}
                  </m.div>
                </div>
              </Link>
            </m.div>
          );
        })}
      </m.div>
    </LazyMotion>
  );
}
