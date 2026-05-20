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
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const fadeUpChild = {
  hidden: {opacity: 0, y: 28, filter: 'blur(4px)'},
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
      <section id="about" className="relative overflow-hidden bg-[linear-gradient(180deg,#F5F7FA_0%,#ffffff_60%,#F5F7FA_100%)] py-[clamp(5rem,9vw,8rem)] text-navy">
        {/* Subtle vertical grid lines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(28,46,74,0.025) 1px, transparent 1px)',
            backgroundSize: '12vw 100%',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
          {/* Section header */}
          <div className="mb-14 md:mb-16">
            <SectionLabel className="text-primary">
              {ABOUT.tag}
            </SectionLabel>
            <SplitText
              by="word"
              stagger={60}
              className="section-heading max-w-3xl text-navy"
              text={ABOUT.heading.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}
            />
            <ScrollReveal className="mt-7 max-w-4xl" direction="left">
              <div className="flex gap-5 border-l-2 border-accent pl-6">
                <blockquote className="text-lg font-medium leading-relaxed text-navy/78">
                  "Communications with credibility, clarity, and commercial context."
                </blockquote>
              </div>
            </ScrollReveal>
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            {/* Left: paragraphs + CTA */}
            <ScrollReveal>
              <div className="max-w-xl">
                {ABOUT.paragraphs.slice(0, 3).map((paragraph) => (
                  <p key={paragraph} className="mb-5 text-[1rem] font-light leading-[1.85] text-navy/68 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-8">
                  <Link href="/about" className="btn-ghost">
                    <span>Know More</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: pillars grid */}
            <m.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
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
                          y: -5,
                          borderColor: 'rgba(91,192,235,0.35)',
                          boxShadow: '0 8px 32px rgba(28,46,74,0.08)',
                          transition: {duration: 0.3, ease: [0.22, 1, 0.36, 1]},
                        }
                  }
                  className="group relative overflow-hidden border border-navy/8 bg-white p-6"
                  style={prefersReducedMotion ? undefined : {willChange: 'transform'}}
                >
                  {/* Accent left bar that slides in on hover */}
                  <div className="absolute inset-y-0 left-0 w-[2px] bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent">
                    0{index + 1}
                  </div>
                  <h3 className="mb-2.5 text-[1rem] font-semibold leading-snug text-navy">{pillar.title}</h3>
                  <p className="text-[0.85rem] leading-[1.8] text-navy/60">{pillar.text}</p>
                </m.article>
              ))}
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
