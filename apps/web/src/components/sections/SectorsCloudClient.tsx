'use client';

import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import {useState} from 'react';

type SectorsCloudClientProps = {
  sectors: string[];
};

export default function SectorsCloudClient({sectors}: SectorsCloudClientProps) {
  const [activeSectors, setActiveSectors] = useState(() => new Set<string>());
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="grid-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, margin: '-60px'}}
        variants={{
          hidden: {},
          visible: {
            transition: {staggerChildren: 0.03, delayChildren: 0.2},
          },
        }}
      >
        {sectors.map((sector) => {
          const isActive = activeSectors.has(sector);

          return (
            <m.button
              key={sector}
              type="button"
              onClick={() => {
                setActiveSectors((previous) => {
                  const next = new Set(previous);
                  if (next.has(sector)) {
                    next.delete(sector);
                  } else {
                    next.add(sector);
                  }
                  return next;
                });
              }}
              variants={{
                hidden: prefersReducedMotion ? {opacity: 0} : {opacity: 0, scale: 0.85},
                visible: {
                  opacity: 1,
                  scale: isActive && !prefersReducedMotion ? [0.85, 1.02, 1] : 1,
                  transition: prefersReducedMotion ? {duration: 0} : {duration: 0.35, ease: [0.22, 1, 0.36, 1]},
                },
              }}
              whileTap={{scale: 0.97}}
              className={[
                'rounded-full px-5 py-2.5 text-[0.8rem] uppercase tracking-[0.12em]',
                isActive ? 'bg-primary text-white' : 'border border-white/15 text-white/50',
              ].join(' ')}
            >
              {sector}
            </m.button>
          );
        })}
      </m.div>
    </LazyMotion>
  );
}
