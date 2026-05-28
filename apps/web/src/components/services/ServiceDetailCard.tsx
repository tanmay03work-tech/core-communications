'use client';

import {AnimatePresence, m} from 'framer-motion';
import {ArrowUpRight, ChevronDown} from 'lucide-react';
import {useRouter} from 'next/navigation';
import TiltCard from '@/components/animations/TiltCard';

type ServiceDetailCardProps = {
  number: string;
  icon: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  approach: readonly string[];
  outcomes: readonly string[];
  caseStudyLink?: string;
  isExpanded: boolean;
  onToggle: () => void;
};

export default function ServiceDetailCard({
  number,
  icon,
  title,
  shortDesc,
  longDesc,
  approach,
  outcomes,
  caseStudyLink,
  isExpanded,
  onToggle,
}: ServiceDetailCardProps) {
  const router = useRouter();

  return (
    <TiltCard
      className="h-full"
      motionProps={{
        whileHover: {y: -8},
        transition: {duration: 0.3, ease: 'easeOut'},
      }}
    >
      <m.article
        className="group h-full border-2 border-neutral-100 bg-white p-8 transition-[border-color,box-shadow] duration-300 hover:border-b-primary hover:shadow-[0_20px_50px_rgba(28,46,74,0.12)] lg:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <button
            type="button"
            onClick={onToggle}
            className="flex min-w-0 flex-1 items-start gap-4 text-left"
          >
            <span className="font-heading text-[3.5rem] font-bold leading-none tracking-tight text-primary/10">
              {number}
            </span>
            <span className="text-2xl font-semibold leading-none text-accent" aria-hidden="true">
              {icon}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/60 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <button type="button" onClick={onToggle} className="mt-4 block text-left">
          <h3 className="text-lg font-bold tracking-[-0.02em] text-primary">{title}</h3>
        </button>

        <p className="mt-3 text-sm leading-relaxed text-muted">{shortDesc}</p>

        <AnimatePresence initial={false}>
          {isExpanded ? (
            <m.div
              key="expanded"
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-neutral-100 pt-5">
                <p className="text-sm leading-relaxed text-primary/70">{longDesc}</p>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Our approach
                  </p>
                  <ul className="mt-3 space-y-3">
                    {approach.map((item) => (
                      <m.li
                        key={item}
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        className="flex gap-3 text-sm text-primary"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </m.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Outcomes
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {outcomes.map((item) => (
                      <span
                        key={item}
                        className="border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary transition-colors duration-300 hover:border-primary/40 hover:bg-primary/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {caseStudyLink ? (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => router.push(caseStudyLink)}
                      className="group/cta inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                    >
                      <span className="underline-offset-4 group-hover/cta:underline">
                        See this in action
                      </span>
                      <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/cta:translate-x-0 group-hover/cta:opacity-100" />
                    </button>
                  </div>
                ) : null}
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </m.article>
    </TiltCard>
  );
}
