'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {scaleIn} from '@/lib/framer/variants';

type SectorCardProps = {
  title: string;
  icon: string;
  description: string;
  expertise: string[];
  relatedCaseStudy?: {title: string; href: string} | null;
};

export default function SectorCard({
  title,
  icon,
  description,
  expertise,
  relatedCaseStudy,
}: SectorCardProps) {
  return (
    <motion.article
      variants={scaleIn}
      className="relative overflow-hidden border border-neutral-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_16px_40px_rgba(28,46,74,0.1)]"
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-3 text-base font-bold tracking-[-0.02em] text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {expertise.map((item) => (
          <span
            key={item}
            className="border border-primary/10 bg-primary/5 px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary"
          >
            {item}
          </span>
        ))}
      </div>

      {relatedCaseStudy ? (
        <Link
          href={relatedCaseStudy.href}
          className="mt-4 inline-block text-xs font-semibold text-accent underline underline-offset-4"
        >
          {relatedCaseStudy.title}
        </Link>
      ) : null}
    </motion.article>
  );
}
