'use client';

import {LazyMotion, domAnimation, m} from 'framer-motion';
import ScrollReveal from '@/components/motion/ScrollReveal';
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

const dividerChild = {
  hidden: {scaleX: 0, opacity: 0},
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {duration: 0.75, ease: [0.22, 1, 0.36, 1]},
  },
};

const headingRevealText = {
  hidden: {y: '115%', opacity: 0},
  visible: {
    y: '0%',
    opacity: 1,
    transition: {duration: 0.86, ease: [0.22, 1, 0.36, 1]},
  },
};

const headingRevealMask = {
  hidden: {x: '-112%'},
  visible: {
    x: '112%',
    transition: {duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.08},
  },
};

export default function AboutSection() {
  const opening = ABOUT.paragraphs[0];
  const bodyParagraphs = ABOUT.paragraphs.slice(1, 5);
  const signature = ABOUT.paragraphs[5];
  const corridorHeading = ABOUT.paragraphs[6];
  const corridorSubheading = ABOUT.paragraphs[7];
  const corridorBody = ABOUT.paragraphs[8];

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_12%_18%,rgba(0,184,150,0.16),transparent_30%),linear-gradient(180deg,#F4F6F9_0%,#ffffff_58%,#F4F6F9_100%)] py-[clamp(5rem,9vw,8rem)] text-navy">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(13,27,42,0.03) 1px, transparent 1px), linear-gradient(180deg, rgba(13,27,42,0.025) 1px, transparent 1px)',
            backgroundSize: '11vw 100%, 100% 90px',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute right-[-12rem] top-20 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
          <ScrollReveal>
            <m.div
              className="relative overflow-hidden border border-navy/10 bg-white/88 p-[clamp(1.5rem,3.6vw,3.5rem)] shadow-[0_24px_80px_rgba(13,27,42,0.10)] backdrop-blur"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once: false, margin: '-60px', amount: 0.2}}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#C9952A,#00B896,#C9952A)]"
              />
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-52 w-52 rounded-full border border-accent/25"
              />
              <div className="relative mx-auto max-w-6xl">
                <div className="space-y-[clamp(1.1rem,2vw,1.75rem)]">
                  <m.div variants={fadeUpChild} className="max-w-none">
                    <p className="font-heading text-[clamp(1.15rem,1.55vw,1.55rem)] font-semibold leading-[1.35] tracking-[-0.01em] text-navy text-balance md:whitespace-nowrap">
                      {opening}
                    </p>
                  </m.div>

                  <m.div
                    aria-hidden="true"
                    variants={dividerChild}
                    className="h-px origin-left bg-[linear-gradient(90deg,rgba(201,149,42,0.42),rgba(0,184,150,0.32),transparent)]"
                  />

                  <div className="relative">
                    <div className="mx-auto max-w-5xl space-y-5">
                      <m.p className="overflow-hidden font-heading text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.08] tracking-[-0.015em] text-navy">
                        <span className="relative inline-block overflow-hidden pb-1">
                          <m.span variants={headingRevealText} className="inline-block">
                            {ABOUT.heading}
                          </m.span>
                          <m.span
                            aria-hidden="true"
                            variants={headingRevealMask}
                            className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,transparent,rgba(0,184,150,0.18),rgba(201,149,42,0.2),transparent)]"
                          />
                        </span>
                      </m.p>

                      {bodyParagraphs.map((paragraph) => (
                        <m.p
                          key={paragraph}
                          variants={fadeUpChild}
                          className="font-sans text-[clamp(0.95rem,1.12vw,1.04rem)] leading-[1.62] text-navy/76"
                        >
                          {paragraph}
                        </m.p>
                      ))}

                      <m.blockquote
                        variants={fadeUpChild}
                        className="relative border-y border-navy/10 py-[clamp(1rem,2vw,1.5rem)]"
                      >
                        <div
                          aria-hidden="true"
                          className="mb-3 h-px w-16 bg-[linear-gradient(90deg,#C9952A,#00B896)]"
                        />
                        <p className="max-w-none font-serif text-[clamp(1rem,1.55vw,1.35rem)] italic leading-[1.45] tracking-[-0.005em] text-navy md:whitespace-nowrap">
                          {signature}
                        </p>
                      </m.blockquote>

                      <m.div
                        aria-hidden="true"
                        variants={dividerChild}
                        className="h-px origin-left bg-[linear-gradient(90deg,transparent,rgba(13,27,42,0.12),rgba(0,184,150,0.22),transparent)]"
                      />

                      <m.div variants={fadeUpChild} className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="max-w-none whitespace-normal font-heading text-[clamp(1.35rem,2.1vw,2rem)] font-semibold leading-[1.16] tracking-[-0.018em] text-navy md:whitespace-nowrap">
                              {corridorHeading}
                            </h3>
                            <p className="mt-2 font-serif text-[clamp(0.95rem,1.25vw,1.12rem)] italic leading-[1.45] text-navy/82">
                              {corridorSubheading}
                            </p>
                          </div>

                          <div
                            aria-hidden="true"
                            className="flex min-w-0 items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-navy/54"
                          >
                            <span>India</span>
                            <span className="h-px min-w-8 flex-1 bg-[linear-gradient(90deg,rgba(201,149,42,0.6),rgba(0,184,150,0.55))]" />
                            <span>Australia</span>
                          </div>
                        </div>

                        <p className="max-w-5xl font-sans text-[clamp(0.95rem,1.12vw,1.04rem)] leading-[1.62] text-navy/76">
                          {corridorBody}
                        </p>
                      </m.div>
                    </div>
                  </div>

                </div>
              </div>
            </m.div>
          </ScrollReveal>
        </div>
      </section>
    </LazyMotion>
  );
}
