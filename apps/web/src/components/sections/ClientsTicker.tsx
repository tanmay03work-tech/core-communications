'use client';

import Image from 'next/image';
import {m} from 'framer-motion';

const CLIENTS = [
  {
    name: 'Zoom',
    logo: '/images/client-logos/zoom.svg',
  },
  {
    name: 'Vodafone',
    logo: '/images/client-logos/vodafone.png',
  },
  {
    name: 'Matific Education',
    logo: '/images/client-logos/matific.png',
  },
  {
    name: 'Sunpower Renewables',
    logo: '/images/client-logos/sunpower-renewables.jpg',
  },
  {
    name: 'GHE',
    logo: '/images/client-logos/global-himalayan-expedition.png',
  },
  {
    name: 'Deepworkz',
    logo: '/images/client-logos/deepworkz.png',
  },
  {
    name: 'Ojas Media',
    logo: '/images/client-logos/ojas-media.png',
  },
  {
    name: 'Parallel Wireless',
    logo: '/images/client-logos/parallel-wireless.png',
  },
  {
    name: 'Veolia',
    logo: '/images/client-logos/veolia.png',
  },
  {
    name: 'Tiiik',
    logo: '/images/client-logos/tiik-money.png',
  },
];

export function ClientsTicker() {
  return (
    <section className="relative overflow-hidden border-y border-navy/[0.08] bg-[linear-gradient(180deg,#ffffff_0%,#F4F6F9_100%)] px-4 py-12 sm:px-6 md:px-10 lg:px-14">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,184,150,0.55),transparent)]" />
      <p className="mb-8 text-center font-heading text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-navy/45">
        Team experience includes working with
      </p>
      <div className="mx-auto flex w-full max-w-[92rem] flex-wrap items-stretch justify-center gap-4 md:gap-6">
        {CLIENTS.map((client, i) => (
          <m.div
            key={client.name}
            className="group relative flex min-h-[5.5rem] basis-[calc((100%-1rem)/2)] items-center justify-center overflow-hidden rounded-[1rem] border border-navy/[0.08] bg-white/85 px-4 py-5 shadow-[0_14px_42px_rgba(13,27,42,0.08)] backdrop-blur-sm sm:min-h-[6rem] sm:basis-[calc((100%-2rem)/3)] sm:px-5 md:min-h-[6.5rem] md:basis-[calc((100%-3rem)/3)] lg:basis-[calc((100%-4.5rem)/4)] xl:basis-[calc((100%-6rem)/5)] 2xl:basis-[calc((100%-7.5rem)/6)]"
            initial={{opacity: 0, y: 12}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1]}}
            whileHover={{
              y: -6,
              scale: 1.04,
              boxShadow: '0 22px 58px rgba(13,27,42,0.14)',
            }}
          >
            <span className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,184,150,0.8),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {client.logo ? (
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={160}
                height={56}
                className={`w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                  client.name === 'Deepworkz'
                    ? 'max-h-14 scale-125 sm:max-h-16 md:max-h-[4.5rem]'
                    : 'max-h-10 sm:max-h-12 md:max-h-14'
                }`}
              />
            ) : (
              <span className="text-center font-heading text-base font-semibold tracking-wide text-navy transition-colors duration-300 group-hover:text-accent sm:text-lg md:text-xl">
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
