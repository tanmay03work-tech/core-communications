'use client';

import {motion} from 'framer-motion';
import HeroBackground from '@/components/hero/HeroBackground';
import SplitText from '@/components/animations/SplitText';
import {fadeIn, fadeUp, slideRight} from '@/lib/framer/variants';

export default function ServicesHero() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-ink">
      <HeroBackground />
      <div className="relative mx-auto flex min-h-[70vh] max-w-[900px] flex-col items-center justify-center px-6 py-32 text-center lg:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{delay: 0.3}}
          className="flex items-center gap-4"
        >
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Our Approach
          </span>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideRight}
          transition={{delay: 0.4}}
          className="mt-8 overflow-hidden"
        >
          <SplitText
            text="Services engineered for B2B impact"
            by="word"
            delay={400}
            className="font-sans text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white"
          />
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{delay: 0.7}}
          className="mt-6 max-w-[580px] text-base leading-relaxed text-white/60"
        >
          Six integrated services. One outcome: your brand cut through the noise,
          conversations that convert, and media that moves markets.
        </motion.p>

        <motion.div
          className="absolute bottom-20 left-1/2 h-px w-16 -translate-x-1/2 bg-gradient-to-r from-accent to-transparent"
          initial={{scaleX: 0, originX: 0.5}}
          whileInView={{scaleX: 1}}
          viewport={{once: true}}
          transition={{duration: 0.6, delay: 0.8, ease: 'easeOut'}}
        />
      </div>
    </section>
  );
}
