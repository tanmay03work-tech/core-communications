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

export default function AboutSection() {
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
              className="relative overflow-hidden border border-navy/10 bg-white/88 p-[clamp(1.75rem,4.5vw,4.75rem)] shadow-[0_24px_80px_rgba(13,27,42,0.10)] backdrop-blur"
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
              <div className="relative mx-auto max-w-5xl">
                <SplitText
                  by="word"
                  stagger={60}
                  className="section-heading mb-10 max-w-4xl text-navy"
                  text="About Core Communications"
                />

                <div className="space-y-7">
                  {ABOUT.paragraphs.map((paragraph, index) => (
                    <m.p
                      key={paragraph}
                      variants={fadeUpChild}
                      className={`font-sans leading-[1.78] text-navy/76 ${
                        index === 0
                          ? 'text-[clamp(1.35rem,2.4vw,2.25rem)] font-semibold leading-[1.35] tracking-[-0.03em] text-navy'
                          : 'text-[clamp(1rem,1.25vw,1.12rem)]'
                      }`}
                    >
                      {paragraph}
                    </m.p>
                  ))}
                </div>
              </div>
            </m.div>
          </ScrollReveal>
        </div>
      </section>
    </LazyMotion>
  );
}
