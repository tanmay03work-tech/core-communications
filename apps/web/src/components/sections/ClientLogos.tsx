'use client';

import { TICKER_CLIENTS } from '@/lib/constants';
import ScrollReveal from '@/components/motion/ScrollReveal';

export default function ClientLogos() {
  return (
    <div className="bg-deep px-6 lg:px-16 py-16">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          <div className="text-[0.7rem] tracking-[0.25em] uppercase text-white/30 text-center mb-8">
            Brands we&apos;ve worked with
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
            {TICKER_CLIENTS.map((client) => (
              <div
                key={client}
                className="font-title text-[0.85rem] font-bold tracking-[0.1em] uppercase text-white/25 px-4 py-2.5 border border-white/[0.08] transition-all duration-200 hover:text-white/70 hover:border-accent-glow/30"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
