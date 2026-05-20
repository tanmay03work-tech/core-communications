'use client';

import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import {TEAM} from '@/lib/constants';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export default function TeamSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section id="team" className="section-wrap bg-ink text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <SectionLabel>{TEAM.tag}</SectionLabel>
            <ScrollReveal>
              <h2 className="section-heading text-white" dangerouslySetInnerHTML={{__html: TEAM.heading}} />
            </ScrollReveal>
          </div>

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
                whileHover={prefersReducedMotion ? undefined : {borderColor: 'rgba(91, 192, 235, 0.3)', transition: {duration: 0.3}}}
                className="relative flex items-start gap-6 border border-white/8 bg-white/3 p-card-pad"
              >
                <m.div
                  className="absolute inset-y-6 left-0 w-px bg-accent/50"
                  initial={{scaleY: 0, transformOrigin: 'top'}}
                  whileHover={prefersReducedMotion ? undefined : {scaleY: 1}}
                  transition={prefersReducedMotion ? {duration: 0} : {duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
                />
                <m.div
                  className="flex h-[78px] w-[78px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent/25 bg-deep text-xl font-bold text-accent"
                  initial={prefersReducedMotion ? {opacity: 0} : {clipPath: 'circle(0% at 50% 50%)', scale: 0.8}}
                  whileInView={prefersReducedMotion ? {opacity: 1} : {clipPath: 'circle(50% at 50% 50%)', scale: 1}}
                  viewport={{once: true}}
                  transition={prefersReducedMotion ? {duration: 0} : {duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
                >
                  {member.initials}
                </m.div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.1rem] font-bold text-white">{member.name}</h3>
                  <div className="mb-3 text-[0.72rem] uppercase tracking-[0.15em] text-accent">
                    {member.role}
                  </div>
                  <p className="line-clamp-4 text-[0.82rem] leading-7 text-white/60">
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
