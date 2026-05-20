'use client';

import type { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

export default function SectionLabel({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={clsx('mb-4 flex items-center gap-3 overflow-hidden', className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <m.div
          className="h-px w-6 shrink-0 bg-accent"
          variants={{
            hidden: { scaleX: prefersReducedMotion ? 1 : 0, transformOrigin: 'left' },
            visible: {
              scaleX: 1,
              transition: prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        />
        <m.span
          className="text-xs font-semibold uppercase tracking-[0.25em] text-accent"
          variants={{
            hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -8 },
            visible: {
              opacity: 1,
              x: 0,
              transition: prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.4, delay: 0.15, ease: 'easeOut' },
            },
          }}
        >
          {children}
        </m.span>
      </m.div>
    </LazyMotion>
  );
}
