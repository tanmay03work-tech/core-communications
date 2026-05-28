'use client';

import Image from 'next/image';
import {m} from 'framer-motion';

const CLIENTS = [
  {
    name: 'SunPower Renewables',
    logo: '/images/client-logos/sunpower-renewables.jpg',
  },
  {
    name: 'TDK Ventures',
    logo: null, // text fallback - no logo file available yet
  },
  {
    name: 'Vodafone',
    logo: '/images/client-logos/vodafone.png',
  },
];

export function ClientsTicker() {
  return (
    <section className="relative overflow-hidden border-y border-navy/[0.08] bg-[linear-gradient(180deg,#ffffff_0%,#F5F7FA_100%)] px-5 py-12 md:px-10">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(91,192,235,0.55),transparent)]" />
      <p className="mb-8 text-center font-heading text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-navy/45">
        Trusted by
      </p>
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-5 md:gap-7 lg:gap-9">
        {CLIENTS.map((client, i) => (
          <m.div
            key={client.name}
            className="group relative flex min-h-[5.75rem] min-w-[11rem] items-center justify-center overflow-hidden rounded-[1.4rem] border border-navy/[0.08] bg-white/85 px-8 py-6 shadow-[0_14px_42px_rgba(28,46,74,0.08)] backdrop-blur-sm"
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1]}}
            whileHover={{
              y: -6,
              scale: 1.04,
              boxShadow: '0 22px 58px rgba(28,46,74,0.14)',
            }}
          >
            <span className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(91,192,235,0.8),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {client.logo ? (
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={160}
                height={56}
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 md:h-12"
              />
            ) : (
              <span className="font-heading text-lg font-semibold tracking-wide text-navy transition-colors duration-300 group-hover:text-accent md:text-xl">
                {client.name}
              </span>
            )}
          </m.div>
        ))}
      </div>
    </section>
  );
}

export default ClientsTicker;
