'use client';

import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe';

export default function SectionLabel({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const prefersReducedMotion = useReducedMotionSafe();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={clsx('mb-5 flex items-center gap-3 overflow-hidden', className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <m.div
          className="h-[1.5px] w-7 shrink-0 rounded-full bg-accent"
          variants={{
            hidden: { scaleX: prefersReducedMotion ? 1 : 0, transformOrigin: 'left' },
            visible: {
              scaleX: 1,
              transition: prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        />
        <m.span
          className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-accent"
          variants={{
            hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 },
            visible: {
              opacity: 1,
              y: 0,
              transition: prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {children}
        </m.span>
      </m.div>
    </LazyMotion>
  );
}
