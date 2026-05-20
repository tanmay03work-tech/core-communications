'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import TiltCard from '@/components/animations/TiltCard';

type FeaturedSectorCardProps = {
  icon: string;
  title: string;
  description: string;
  relatedCaseStudies: {title: string; href: string}[];
  expertise: string[];
};

export default function FeaturedSectorCard({
  icon,
  title,
  description,
  relatedCaseStudies,
  expertise,
}: FeaturedSectorCardProps) {
  return (
    <TiltCard
      className="h-full"
      motionProps={{
        whileHover: {scale: 1.05, y: -10},
        transition: {duration: 0.3, ease: [0.22, 1, 0.36, 1]},
      }}
    >
      <article className="group relative h-full overflow-hidden border-2 border-accent bg-[linear-gradient(135deg,rgba(91,192,235,0.15),rgba(28,46,74,0.2))] p-8">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,192,235,0.22),transparent_62%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        />
        <div className="relative z-10">
          <div className="mb-4 text-5xl">{icon}</div>
          <h3 className="text-xl font-bold tracking-[-0.02em] text-white">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {expertise.map((item) => (
              <span
                key={item}
                className="bg-white/15 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Featured work:
            </p>
            <div className="mt-3 space-y-2">
              {relatedCaseStudies.map((study) => (
                <Link
                  key={study.title}
                  href={study.href}
                  className="block text-sm text-white underline decoration-white/35 underline-offset-4 transition-colors hover:text-accent"
                >
                  {study.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
