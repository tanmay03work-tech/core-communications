'use client';

import {LazyMotion, domAnimation, m, useReducedMotion} from 'framer-motion';
import Link from 'next/link';
import SplitText from '@/components/animations/SplitText';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import {ABOUT} from '@/lib/constants';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUpChild = {
  hidden: {opacity: 0, y: 32, filter: 'blur(4px)'},
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {duration: 0.65, ease: [0.22, 1, 0.36, 1]},
  },
};

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <section id="about" className="section-wrap bg-surface text-navy">
        <div className="mx-auto max-w-7xl">
          <div className="section-header">
            <SectionLabel className="text-primary">{ABOUT.tag}</SectionLabel>
            <SplitText
              by="word"
              stagger={60}
              className="section-heading max-w-3xl text-navy"
              text={ABOUT.heading.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}
            />
            <ScrollReveal className="mt-6 max-w-4xl border-l-4 border-accent pl-6" direction="left">
              <blockquote className="text-xl font-medium leading-relaxed text-navy">
                “Communications with credibility, clarity, and commercial context.”
              </blockquote>
            </ScrollReveal>
          </div>

          <div className="grid-split-wide">
            <ScrollReveal>
              <div className="max-w-xl">
                {ABOUT.paragraphs.slice(0, 3).map((paragraph) => (
                  <p key={paragraph} className="mb-4 text-base leading-8 text-navy/70 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                <div className="pt-4">
                  <Link href="/about" className="btn-ghost">
                    <span>Know More</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <m.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true, margin: '-60px'}}
            >
              {ABOUT.pillars.slice(0, 4).map((pillar, index) => (
                <m.article
                  key={pillar.title}
                  variants={prefersReducedMotion ? undefined : fadeUpChild}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -6,
                          borderBottomColor: '#1C2E4A',
                          transition: {duration: 0.3, ease: [0.22, 1, 0.36, 1]},
                        }
                  }
                  className="border border-navy/10 border-b-2 border-b-transparent bg-white p-5"
                  style={prefersReducedMotion ? undefined : {willChange: 'transform'}}
                >
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    0{index + 1}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-navy">{pillar.title}</h3>
                  <p className="text-sm leading-7 text-navy/62">{pillar.text}</p>
                </m.article>
              ))}
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
