'use client';

import { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-x-clip">
      <m.div
        key={pathname}
        initial={reducedMotion ? { opacity: 0.98 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reducedMotion ? 0.18 : 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative will-change-[opacity,transform]"
      >
        {!reducedMotion ? (
          <m.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(91,192,235,0.92),transparent)]"
            initial={{ opacity: 0, x: '-28%' }}
            animate={{ opacity: [0, 1, 0], x: ['-28%', '0%', '28%'] }}
            transition={{ duration: 0.52, ease: 'easeOut' }}
          />
        ) : null}
        {children}
      </m.div>
    </div>
  );
}
