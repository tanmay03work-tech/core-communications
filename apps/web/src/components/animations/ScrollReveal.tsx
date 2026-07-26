'use client';

import {LazyMotion, domAnimation, m, type Transition, type Variants} from 'framer-motion';
import {useReducedMotionSafe} from '@/hooks/useReducedMotionSafe';
import type {ReactNode} from 'react';

type ScrollRevealDirection = 'up' | 'left' | 'right' | 'fade' | 'scale';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: ScrollRevealDirection;
  variants?: Variants;
};

const directionVariants: Record<ScrollRevealDirection, Variants> = {
  up: {
    hidden: {opacity: 0, y: 24},
    visible: {opacity: 1, y: 0},
  },
  left: {
    hidden: {opacity: 0, x: -24},
    visible: {opacity: 1, x: 0},
  },
  right: {
    hidden: {opacity: 0, x: 24},
    visible: {opacity: 1, x: 0},
  },
  fade: {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  },
  scale: {
    hidden: {opacity: 0, scale: 0.97},
    visible: {opacity: 1, scale: 1},
  },
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  variants,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotionSafe();
  const resolvedVariants =
    variants ??
    (prefersReducedMotion
      ? {
          hidden: {opacity: 0},
          visible: {opacity: 1},
        }
      : directionVariants[direction]);

  const resolvedTransition: Transition =
    prefersReducedMotion
      ? {duration: 0}
      : direction === 'scale'
        ? {duration: 0.4, ease: [0.22, 1, 0.36, 1], delay}
        : {duration: 0.48, ease: [0.22, 1, 0.36, 1], delay};

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, margin: '-80px'}}
        variants={resolvedVariants}
        transition={resolvedTransition}
        className={className}
        style={prefersReducedMotion ? undefined : {willChange: 'transform, opacity'}}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
