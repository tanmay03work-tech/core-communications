'use client';

import ScrollReveal from '@/components/motion/ScrollReveal';
import {SECTORS_AND_CLIENTS} from '@/lib/constants';

const columnTitleClass =
  'text-[clamp(1.2rem,1.5vw,1.45rem)] font-bold leading-none text-primary';
const itemClass =
  'flex items-start gap-4 text-[clamp(1rem,1.35vw,1.08rem)] leading-[1.45] text-ink';

function BulletList({items}: {items: readonly string[]}) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className={itemClass}>
          <span className="mt-[0.72rem] h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <span className="max-w-[19ch] sm:max-w-none">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SectorsClientsOverview() {
  return (
    <section className="bg-white px-6 py-20 lg:px-16 lg:py-24">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-center font-heading text-[clamp(3rem,7vw,5.9rem)] font-bold leading-[0.94] tracking-[-0.03em] text-primary">
            {SECTORS_AND_CLIENTS.title}
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-16 xl:gap-24">
            <div className="lg:pr-2">
              <h3 className={columnTitleClass}>Sectoral expertise</h3>
              <BulletList items={SECTORS_AND_CLIENTS.sectoralExpertise} />
            </div>

            <div className="lg:pr-2">
              <h3 className={columnTitleClass}>Mandates handled</h3>
              <BulletList items={SECTORS_AND_CLIENTS.mandatesHandled} />
            </div>

            <div className="lg:pr-2">
              <h3 className={columnTitleClass}>Services</h3>
              <BulletList items={SECTORS_AND_CLIENTS.serviceLines} />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
