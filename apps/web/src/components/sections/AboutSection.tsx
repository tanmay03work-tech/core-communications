'use client';

import { motion } from 'framer-motion';
import { ABOUT } from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { fadeUp, staggerContainer } from '@/lib/motion-variants';

export default function AboutSection() {
  return (
    <section id="about" className="bg-surface-light text-navy py-section px-6 lg:px-16">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          <div className="section-tag text-deep before:bg-deep mb-6">{ABOUT.tag}</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-4">
            {/* Left — Text */}
            <div>
              <h2
                className="section-heading text-navy mb-6"
                dangerouslySetInnerHTML={{ __html: ABOUT.heading }}
              />
              {ABOUT.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-navy/70 mb-5 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Right — Pillar Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {ABOUT.pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  className="bg-white p-6 border-l-[3px] border-deep transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(28,46,74,0.12)]"
                  variants={fadeUp}
                >
                  <div className="font-title text-[0.95rem] font-bold text-navy mb-2">
                    {pillar.title}
                  </div>
                  <p className="text-[0.8rem] text-navy/60 leading-relaxed">
                    {pillar.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
