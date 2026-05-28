'use client';

import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import {TEAM} from '@/lib/constants';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

export default function TeamSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-[#0D1B2E] py-[clamp(5rem,9vw,8rem)] text-white">
        {/* Subtle bg grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '100% 80px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
          {/* Section header */}
          <div className="mb-12 md:mb-14">
            <SectionLabel>{TEAM.tag}</SectionLabel>
            <ScrollReveal>
              <h2
                className="section-heading max-w-3xl text-white"
                dangerouslySetInnerHTML={{__html: TEAM.heading}}
              />
            </ScrollReveal>
          </div>

          {/* Team cards */}
          <m.div
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-60px'}}
            variants={containerVariants}
          >
            {TEAM.members.map((member, index) => (
              <m.article
                key={member.name}
                variants={{
                  hidden: prefersReducedMotion ? {opacity: 0} : {opacity: 0, x: index === 0 ? -32 : 32, filter: 'blur(4px)'},
                  visible: {
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                    transition: prefersReducedMotion ? {duration: 0} : {duration: 0.65, ease: [0.22, 1, 0.36, 1]},
                  },
                }}
                whileHover={prefersReducedMotion ? undefined : {borderColor: 'rgba(91,192,235,0.28)', transition: {duration: 0.3}}}
                className="group relative flex items-start gap-6 overflow-hidden border border-white/[0.07] bg-white/[0.03] p-[var(--card-pad)]"
              >
                {/* Top accent bar that slides on hover */}
                <m.div
                  className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[linear-gradient(90deg,rgba(91,192,235,0.8),rgba(61,175,217,0.5))]"
                  initial={{scaleX: 0}}
                  whileHover={prefersReducedMotion ? undefined : {scaleX: 1}}
                  transition={prefersReducedMotion ? {duration: 0} : {duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
                />

                {/* Avatar */}
                <m.div
                  className="flex h-[84px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent/22 bg-[#162035] text-xl font-bold text-accent transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(91,192,235,0.18)]"
                  initial={prefersReducedMotion ? {opacity: 0} : {clipPath: 'circle(0% at 50% 50%)', scale: 0.82}}
                  whileInView={prefersReducedMotion ? {opacity: 1} : {clipPath: 'circle(50% at 50% 50%)', scale: 1}}
                  viewport={{once: true}}
                  transition={prefersReducedMotion ? {duration: 0} : {duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1]}}
                >
                  {member.initials}
                </m.div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-[1.1rem] font-semibold tracking-tight text-white">{member.name}</h3>
                  <div className="mb-3 mt-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-accent">
                    {member.role}
                  </div>
                  <p className="line-clamp-4 font-sans text-[0.85rem] font-normal leading-relaxed text-white/72">
                    {member.bio}
                  </p>
                </div>
              </m.article>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
