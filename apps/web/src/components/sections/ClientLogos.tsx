'use client';

import {TICKER_CLIENTS} from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';
import {ClientWordmark} from '@/components/sections/ClientWordmarks';

export default function ClientLogos() {
  return (
    <section className="section-wrap bg-white text-navy">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-8 text-center text-[0.7rem] uppercase tracking-[0.25em] text-navy/38">
            Brands we&apos;ve worked with
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
            {TICKER_CLIENTS.map((client) => (
              <div
                key={client}
                className="flex min-h-[6rem] items-center justify-center rounded-[1.5rem] border border-navy/10 bg-white px-5 py-4 shadow-[0_14px_40px_rgba(28,46,74,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_20px_50px_rgba(28,46,74,0.09)]"
              >
                <ClientWordmark client={client} className="h-8 w-auto max-w-[9.5rem] md:h-10 md:max-w-[10.5rem]" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
