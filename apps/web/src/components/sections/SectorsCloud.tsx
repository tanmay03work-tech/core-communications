'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SECTORS } from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';

export default function SectorsCloud() {
  const [sectors, setSectors] = useState<{ label: string; active: boolean }[]>(
    SECTORS.items.map((s) => ({ ...s }))
  );

  const toggleSector = (idx: number) => {
    setSectors((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, active: !s.active } : s))
    );
  };

  return (
    <section id="sectors" className="bg-deep py-section px-6 lg:px-16 overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          <div className="section-tag mb-6">{SECTORS.tag}</div>
          <h2
            className="section-heading mb-10"
            dangerouslySetInnerHTML={{ __html: SECTORS.heading }}
          />

          <div className="flex flex-wrap gap-3 mt-10">
            {sectors.map((sector, i) => (
              <motion.button
                key={sector.label}
                layout
                className={`px-5 py-2.5 text-[0.8rem] tracking-[0.08em] border cursor-pointer transition-all duration-200 ${
                  sector.active
                    ? 'border-deep bg-accent text-white'
                    : 'border-white/[0.12] text-white/60 hover:border-accent-glow hover:text-accent-glow hover:bg-accent-glow/[0.06]'
                }`}
                onClick={() => toggleSector(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sector.label}
              </motion.button>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
