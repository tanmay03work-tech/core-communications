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
    href: `tel:${SITE.phone}`,
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
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Contact
            </m.div>
            <m.h1
              className="font-semibold leading-[1.02] tracking-[-0.03em] text-white"
              style={{ fontSize: 'var(--step-h1)' }}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s build the right kind of attention.
            </m.h1>
            <m.p
              className="mt-6 text-[1rem] font-light leading-[1.85] text-white/60"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              Strategic conversations, not cold calls. Tell us what you&apos;re launching, shifting, or trying to unlock.
            </m.p>
          </div>
        </Container>
      </section>

      {/* ─── Contact + Form ───────────────────────────────── */}
      <section className="bg-[linear-gradient(180deg,#F5F7FA_0%,#ffffff_55%,#F5F7FA_100%)] py-[clamp(5rem,9vw,8rem)] text-navy">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">

            {/* Left — contact info */}
            <div className="flex flex-col gap-5">
              <SectionLabel className="text-primary">Get in Touch</SectionLabel>
              <p className="text-[1rem] font-light leading-[1.85] text-navy/68">
                Tell us what you&apos;re launching, shifting, or trying to unlock. We&apos;ll come back with the sharpest next step.
              </p>

               {/* Contact cards */}
              <div className="mt-2 flex flex-col gap-4">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <ScrollReveal key={label}>
                    <a
                      href={href}
                      className="group flex items-start gap-4 border border-navy/8 bg-white p-5 no-underline shadow-[0_4px_20px_rgba(28,46,74,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_12px_36px_rgba(28,46,74,0.09)]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-navy/10 bg-[#F5F7FA] text-primary transition-colors duration-300 group-hover:border-accent/28 group-hover:bg-accent/8">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-navy/40">{label}</div>
                        <div className="mt-1 text-[0.95rem] font-medium text-navy transition-colors duration-200 group-hover:text-primary group-hover:underline">
                          {value}
                        </div>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}

                {/* Locations card */}
                <ScrollReveal delay={0.12}>
                  <div className="flex items-start gap-4 border border-navy/8 bg-white p-5 shadow-[0_4px_20px_rgba(28,46,74,0.05)]">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-navy/10 bg-[#F5F7FA] text-primary">
                      <MapPin size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-navy/40">Locations</div>
                      <div className="mt-1 flex flex-col gap-1">
                        {SITE.locations.map((location) => (
                          <span key={location} className="text-[0.95rem] font-medium text-navy/70">
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
              <div className="relative overflow-hidden border border-navy/8 bg-white shadow-[0_24px_64px_rgba(28,46,74,0.09)]">
                {/* Top gradient bar */}
                <div className="h-[3px] w-full bg-[linear-gradient(90deg,#1C2E4A,#5BC0EB)]" />
                <div className="p-8 lg:p-10">
                  <SectionLabel className="text-primary">Project Enquiry</SectionLabel>
                  <h2 className="mb-6 text-[1.35rem] font-semibold leading-snug text-navy">
                    Start a conversation
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
