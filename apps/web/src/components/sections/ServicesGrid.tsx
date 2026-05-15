'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-ink py-section px-6 lg:px-16">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 items-end">
            <div>
              <div className="section-tag mb-6">{SERVICES.tag}</div>
              <h2
                className="section-heading"
                dangerouslySetInnerHTML={{ __html: SERVICES.heading }}
              />
            </div>
            <p className="text-white/50 text-[0.92rem] leading-relaxed lg:self-end">
              {SERVICES.subtitle}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07]">
            {SERVICES.items.map((service) => (
              <motion.div
                key={service.num}
                className="relative bg-ink/90 p-10 overflow-hidden group cursor-pointer transition-colors duration-300 hover:bg-deep/40"
                whileHover="hover"
                initial="rest"
              >
                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent-glow"
                  variants={{
                    rest: { width: '0%' },
                    hover: { width: '100%' },
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                {/* Number */}
                <div className="font-mono text-[3rem] leading-none text-accent-glow/[0.12] mb-5">
                  {service.num}
                </div>

                {/* Title */}
                <h3 className="font-title text-[1.05rem] font-bold text-white mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[0.82rem] leading-relaxed text-white/50">
                  {service.desc}
                </p>

                {/* Arrow */}
                <motion.div
                  className="mt-6 inline-flex items-center gap-1.5 text-[0.72rem] tracking-[0.15em] uppercase text-accent-glow"
                  variants={{
                    rest: { opacity: 0, x: -8 },
                    hover: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Learn More →
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
