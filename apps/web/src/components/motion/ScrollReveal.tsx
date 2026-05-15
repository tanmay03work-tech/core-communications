'use client';

import { motion, type Variants } from 'framer-motion';
import { fadeUp, defaultViewport } from '@/lib/motion-variants';
import type { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={variants}
      className={className}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
