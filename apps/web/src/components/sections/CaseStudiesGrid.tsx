'use client';

import { motion } from 'framer-motion';
import { CASE_STUDIES } from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { staggerContainer, fadeUp } from '@/lib/motion-variants';

export default function CaseStudiesGrid() {
  return (
    <section id="cases" className="bg-surface-light text-navy py-section px-6 lg:px-16">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          <div className="section-tag text-deep before:bg-deep mb-6">
            {CASE_STUDIES.tag}
          </div>
          <h2
            className="section-heading text-navy mb-12"
            dangerouslySetInnerHTML={{ __html: CASE_STUDIES.heading }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {CASE_STUDIES.items.map((cs) => (
              <motion.div
                key={cs.slug}
                className="relative bg-white p-10 overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(28,46,74,0.12)]"
                variants={fadeUp}
              >
                {/* Bottom gradient bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-deep to-accent-glow scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />

                {/* Client */}
                <div className="text-[0.68rem] tracking-[0.2em] uppercase text-deep font-semibold mb-3">
                  {cs.client}
                </div>

                {/* Title */}
                <h3 className="font-display text-[1.4rem] text-navy leading-tight mb-3">
                  {cs.title}
                </h3>

                {/* Description */}
                <p className="text-[0.85rem] leading-relaxed text-navy/60 mb-6">
                  {cs.desc}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  {cs.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-mono text-[1.8rem] text-deep tracking-[0.02em] leading-none">
                        {stat.value}
                      </div>
                      <div className="text-[0.68rem] tracking-[0.12em] uppercase text-navy/50 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
