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
                hidden: prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 32, filter: 'blur(4px)', clipPath: 'inset(8% round 0px)'},
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  clipPath: 'inset(0% round 0px)',
                  transition: prefersReducedMotion ? {duration: 0} : {duration: 0.65, ease: [0.22, 1, 0.36, 1]},
                },
              }}
              whileHover={prefersReducedMotion ? undefined : {y: -8, transition: {duration: 0.35, ease: [0.22, 1, 0.36, 1]}}}
              onHoverStart={() => {
                void statsControls.start('visible');
              }}
              className="h-full"
            >
              <Link
                href={slug ? `/work/${slug}` : '/work'}
                className="group flex h-full flex-col justify-between border border-white/8 bg-white/3 p-card-pad text-left no-underline"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent">
                      {caseStudy.tag || caseStudy.client}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/65 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                  <h3 className="mb-2 text-[1.5rem] font-semibold leading-tight text-white">
                    {caseStudy.title}
                  </h3>
                  <p className="line-clamp-3 text-[0.92rem] leading-8 text-white/62">
                    {caseStudy.description}
                  </p>
                </div>

                <div className="mt-auto border-t border-white/8 pt-6">
                  <m.div className="grid grid-cols-2 gap-4" initial="hidden" animate={statsControls}>
                    {(caseStudy.stats ?? []).slice(0, 4).map((stat, index) => (
                      <m.div
                        key={stat._key ?? stat.label}
                        variants={{
                          hidden: prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 12},
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: prefersReducedMotion ? {duration: 0} : {duration: 0.35, delay: index * 0.1, ease: [0.22, 1, 0.36, 1]},
                          },
                        }}
                      >
                        <div className="text-2xl font-semibold leading-none text-white">{stat.value}</div>
                        <div className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/52">{stat.label}</div>
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
