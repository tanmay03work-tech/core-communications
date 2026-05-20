'use client';

import type { Variants } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

export const aboutViewport = {
  once: true,
  margin: '-12% 0px -8% 0px',
} as const;

export const staggerMedium: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerTight: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

export const revealSoft: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.85,
      ease,
    },
  },
};

export const revealMask: Variants = {
  hidden: { y: '108%' },
  visible: {
    y: '0%',
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

export const metricReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease,
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.28,
      ease,
    },
  },
};

export const timelineCard: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.82,
      ease,
    },
  },
};

export const particleFloat = (duration: number, delay = 0) =>
  ({
    initial: { y: 0, x: 0, opacity: 0.2, scale: 1 },
    animate: {
      y: [-10, 10, -10],
      x: [0, 8, 0],
      opacity: [0.18, 0.34, 0.18],
      scale: [1, 1.08, 1],
      transition: {
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }) satisfies Variants;
