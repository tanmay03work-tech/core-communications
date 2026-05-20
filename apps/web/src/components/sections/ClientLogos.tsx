'use client';

import {TICKER_CLIENTS} from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';
import {ClientWordmark} from '@/components/sections/ClientWordmarks';

export default function ClientLogos() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#F5F7FA_100%)] py-[clamp(4rem,7vw,6.5rem)] text-navy">
      {/* Top thin accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(28,46,74,0.1),transparent)]" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
        <ScrollReveal>
          {/* Label */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-10 bg-navy/18" />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-navy/38">
                Brands we've worked with
              </span>
              <div className="h-px w-10 bg-navy/18" />
            </div>
          </div>

          {/* Logo grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {TICKER_CLIENTS.map((client) => (
              <div
                key={client}
                className="group flex min-h-[7rem] items-center justify-center rounded-none border border-navy/[0.07] bg-white px-5 py-5 shadow-[0_8px_28px_rgba(28,46,74,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/28 hover:shadow-[0_16px_48px_rgba(28,46,74,0.09)]"
              >
                <ClientWordmark
                  client={client}
                  className="h-8 w-auto max-w-[9rem] grayscale opacity-50 transition-all duration-400 group-hover:grayscale-0 group-hover:opacity-90 md:h-9 md:max-w-[10rem]"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
