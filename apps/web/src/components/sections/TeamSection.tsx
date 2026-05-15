'use client';

import { motion } from 'framer-motion';
import { TEAM } from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { staggerContainer, fadeUp } from '@/lib/motion-variants';

export default function TeamSection() {
  return (
    <section id="team" className="bg-ink py-section px-6 lg:px-16">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          <div className="section-tag mb-6">{TEAM.tag}</div>
          <h2
            className="section-heading mb-12"
            dangerouslySetInnerHTML={{ __html: TEAM.heading }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {TEAM.members.map((member) => (
              <motion.div
                key={member.name}
                className="bg-white/[0.03] border border-white/[0.08] p-10 grid grid-cols-[90px_1fr] gap-7 items-start transition-all duration-300 hover:border-accent-glow/30 hover:bg-deep/20"
                variants={fadeUp}
              >
                {/* Avatar */}
                <div className="w-[90px] h-[90px] rounded-full bg-deep overflow-hidden flex-shrink-0 border-2 border-accent-glow/20 flex items-center justify-center font-title text-2xl font-extrabold text-accent-glow">
                  {member.initials}
                </div>

                {/* Info */}
                <div>
                  <h3 className="font-title text-[1.1rem] font-bold mb-0.5">
                    {member.name}
                  </h3>
                  <div className="text-[0.72rem] tracking-[0.15em] uppercase text-accent-glow mb-3">
                    {member.role}
                  </div>
                  <p className="text-[0.82rem] leading-relaxed text-white/55">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
