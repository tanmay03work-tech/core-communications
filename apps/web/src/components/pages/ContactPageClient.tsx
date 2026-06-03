'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import {ContactForm} from '@/components/sections/ContactForm';
import {SITE} from '@/lib/constants';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: SITE.phone,
    href: 'tel:+61452330923',
  },
];

export default function ContactPageClient() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main>
      {/* ─── Page Hero ───────────────────────────────────── */}
      <section className="page-hero">
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="page-hero-glow" aria-hidden="true" />
        <Container className="relative z-10 max-w-7xl">
          <div className="max-w-2xl">
            <m.div
              className="section-tag mb-6"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              Contact
            </m.div>
            <m.h1
              className="font-semibold leading-[1.02] tracking-[-0.03em] text-white"
              style={{ fontSize: 'var(--step-h1)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s build the right kind of attention.
            </m.h1>
            <m.p
              className="mt-6 max-w-xl font-sans text-[1rem] font-normal leading-relaxed text-white/74"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Send your name and email. Add a message only if there is helpful context.
            </m.p>
          </div>
        </Container>
      </section>

      {/* ─── Contact + Form ───────────────────────────────── */}
      <section className="bg-[linear-gradient(180deg,#F4F6F9_0%,#ffffff_55%,#F4F6F9_100%)] py-[clamp(5rem,9vw,8rem)] text-navy">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">

            {/* Left — contact info */}
            <div className="flex flex-col gap-5">
              <SectionLabel className="text-primary">Get in Touch</SectionLabel>
              <p className="font-sans text-[1rem] font-normal leading-relaxed text-navy/74">
                Reach out directly or use the quick form. We&apos;ll come back with the sharpest next step.
              </p>

               {/* Contact cards */}
              <div className="mt-2 flex flex-col gap-4">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <ScrollReveal key={label}>
                    <a
                      href={href}
                      className="group flex items-start gap-4 border border-navy/8 bg-white p-5 no-underline shadow-[0_4px_20px_rgba(13,27,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_12px_36px_rgba(13,27,42,0.09)]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-navy/10 bg-surface-light text-primary transition-colors duration-300 group-hover:border-accent/28 group-hover:bg-accent/8">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy/62">{label}</div>
                        <div className="mt-1 break-words text-[0.95rem] font-medium text-navy transition-colors duration-200 group-hover:text-primary group-hover:underline">
                          {value}
                        </div>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}

                {/* Locations card */}
                <ScrollReveal delay={0.12}>
                  <div className="flex items-start gap-4 border border-navy/8 bg-white p-5 shadow-[0_4px_20px_rgba(13,27,42,0.05)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-navy/10 bg-surface-light text-primary">
                      <MapPin size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-navy/62">Locations</div>
                      <div className="mt-1 flex flex-col gap-1">
                        {SITE.locations.map((location) => (
                          <span key={location} className="font-sans text-[0.95rem] font-normal text-navy/74">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* View work link */}
              <div className="mt-4 border-t border-navy/8 pt-6">
                <Link href="/work" className="btn-ghost inline-flex">
                  <span>See Our Work</span>
                </Link>
              </div>
            </div>

            {/* Right — form card */}
            <ScrollReveal delay={0.1}>
              <div className="relative overflow-hidden border border-navy/8 bg-white shadow-[0_24px_64px_rgba(13,27,42,0.09)]">
                {/* Top gradient bar */}
                <div className="h-[3px] w-full bg-[linear-gradient(90deg,#C9952A,#00B896)]" />
                <div className="p-8 lg:p-10">
                  <SectionLabel className="text-primary">Quick Contact</SectionLabel>
                  <h2 className="mb-6 font-heading text-[1.35rem] font-semibold leading-snug tracking-tight text-navy">
                    Service enquiry
                  </h2>
                  <ContactForm />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
