'use client';

import {LazyMotion, domAnimation, m} from 'framer-motion';
import SplitText from '@/components/animations/SplitText';
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

export default function AboutSection() {
  const opening = ABOUT.paragraphs[0];
  const intro = ABOUT.paragraphs[1];
  const problem = ABOUT.paragraphs[3];
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
              viewport={{once: true, margin: '-60px'}}
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
                <SplitText
                  by="word"
                  stagger={60}
                  className="section-heading mb-6 max-w-4xl text-navy"
                  text="About Core Communications"
                />

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
                      <m.p
                        variants={fadeUpChild}
                        className="font-sans text-[clamp(0.95rem,1.12vw,1.04rem)] leading-[1.62] text-navy/76"
                      >
                        {intro}
                      </m.p>

                      <m.p
                        variants={fadeUpChild}
                        className="font-sans text-[clamp(0.95rem,1.12vw,1.04rem)] leading-[1.7] text-navy/76"
                      >
                        We specialise in{' '}
                        <span className="inline-flex translate-y-[-0.08em] items-center border border-navy/10 bg-white/70 px-2.5 py-0.5 align-middle font-sans text-[0.68rem] font-bold tracking-[0.035em] text-navy/80 shadow-[0_6px_18px_rgba(13,27,42,0.05)]">
                          cybersecurity
                        </span>
                        ,{' '}
                        <span className="inline-flex translate-y-[-0.08em] items-center border border-navy/10 bg-white/70 px-2.5 py-0.5 align-middle font-sans text-[0.68rem] font-bold tracking-[0.035em] text-navy/80 shadow-[0_6px_18px_rgba(13,27,42,0.05)]">
                          identity
                        </span>
                        ,{' '}
                        <span className="inline-flex translate-y-[-0.08em] items-center border border-navy/10 bg-white/70 px-2.5 py-0.5 align-middle font-sans text-[0.68rem] font-bold tracking-[0.035em] text-navy/80 shadow-[0_6px_18px_rgba(13,27,42,0.05)]">
                          healthtech
                        </span>
                        , and{' '}
                        <span className="inline-flex translate-y-[-0.08em] items-center border border-navy/10 bg-white/70 px-2.5 py-0.5 align-middle font-sans text-[0.68rem] font-bold tracking-[0.035em] text-navy/80 shadow-[0_6px_18px_rgba(13,27,42,0.05)]">
                          emerging technology
                        </span>
                        , delivering clear storytelling, strong media engagement, content creation, and targeted digital
                        amplification that reaches decision-makers.
                      </m.p>

                      <m.p
                        variants={fadeUpChild}
                        className="font-sans text-[clamp(0.95rem,1.12vw,1.04rem)] leading-[1.62] text-navy/76"
                      >
                        {problem}
                      </m.p>

                      <m.div variants={fadeUpChild} className="space-y-3">
                        <p className="font-sans text-[clamp(0.95rem,1.12vw,1.04rem)] leading-[1.62] text-navy/76">
                          In complex, regulated sectors, the companies with the best technology rarely win the narrative.
                          Buyers, investors, and regulators make decisions based on{' '}
                          <span className="font-semibold text-navy">visibility</span>,{' '}
                          <span className="font-semibold text-navy">credibility</span>, and{' '}
                          <span className="font-semibold text-navy">trust</span>. Most technology companies underinvest in
                          all three.
                        </p>

                        <div className="grid gap-3 sm:grid-cols-3">
                          {['Visibility', 'Credibility', 'Trust'].map((item, index) => (
                            <m.div
                              key={item}
                              variants={fadeUpChild}
                              className="border-l border-navy/[0.12] bg-white/45 px-4 py-2.5"
                            >
                              <span className="block font-heading text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-accent">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="mt-1 block font-heading text-[clamp(0.98rem,1.5vw,1.2rem)] font-semibold text-navy">
                                {item}
                              </span>
                            </m.div>
                          ))}
                        </div>
                      </m.div>

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
