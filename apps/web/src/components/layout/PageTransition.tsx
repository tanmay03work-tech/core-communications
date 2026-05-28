'use client';

import { ReactNode } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const contentTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
} as const;

const exitTransition = {
  duration: 0.18,
  ease: [0.4, 0, 1, 1],
} as const;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const routeKey = pathname || '/';

  return (
    <div className="relative overflow-x-clip">
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={routeKey}
          initial={shouldReduceMotion ? { opacity: 0.96 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0.96, transition: { duration: 0.12 } }
              : { opacity: 0, y: -8, transition: exitTransition }
          }
          transition={shouldReduceMotion ? { duration: 0.12 } : contentTransition}
          className="relative will-change-[opacity,transform]"
        >
          {!shouldReduceMotion ? (
            <m.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[linear-gradient(90deg,transparent,rgba(201,149,42,0.68),rgba(0,184,150,0.92),transparent)]"
              initial={{ opacity: 0, scaleX: 0.2 }}
              animate={{ opacity: [0, 1, 0], scaleX: [0.2, 1, 0.9] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}
          {children}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
