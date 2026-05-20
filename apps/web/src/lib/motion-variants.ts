import type { Variants, Transition } from 'framer-motion';

/* ═══════════════════════════════════
   FRAMER MOTION — SHARED VARIANTS
   ═══════════════════════════════════ */

// Smooth cubic-bezier easing for luxury float effect
const smooth: Transition = {
  duration: 0.9,
  ease: [0.16, 1, 0.3, 1],
};

const spring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// ─── Scroll Reveal ───
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smooth,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smooth,
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smooth,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smooth,
  },
};

// ─── Stagger Container ───
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// ─── Hero Headline Reveal ───
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const headlineContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// ─── Page Transition (5 stripes) ───
export const pageStripe: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const pageTransitionContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// ─── Morphing Word ───
export const morphWord: Variants = {
  enter: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Split Text (per character) ───
export const charReveal: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const charContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

// ─── Card Hover ───
export const cardHover = {
  rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
  hover: {
    y: -6,
    boxShadow: '0 20px 50px rgba(28,46,74,0.12)',
    transition: spring,
  },
};

// ─── Viewport settings ───
export const defaultViewport = {
  once: true,
  margin: '-100px' as const,
};

// Navbar
export const navbarSpring: Transition = {
  type: 'spring',
  stiffness: 280,
  damping: 26,
  mass: 0.8,
};

export const navbarItemVariants: Variants = {
  rest: { y: 0, opacity: 1 },
  hover: {
    y: -1.5,
    opacity: 1,
    transition: {
      duration: 0.24,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0 round 2rem)',
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0 round 0rem)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0 round 2rem)',
    transition: {
      duration: 0.28,
      ease: [0.7, 0, 0.84, 0],
      when: 'afterChildren',
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

export const mobileMenuItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};
