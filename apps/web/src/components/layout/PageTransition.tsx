'use client';

import { ReactNode } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={pathname}
        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1], // Cinematic easing
        }}
        className="will-change-[opacity,transform,filter]"
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
