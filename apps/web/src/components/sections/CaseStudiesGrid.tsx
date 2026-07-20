import Link from 'next/link';
import CaseStudiesGridClient from '@/components/sections/CaseStudiesGridClient';
import {CASE_STUDIES} from '@/lib/constants';
import {getFeaturedCaseStudies} from '@/lib/sanity/content';
import type {CaseStudyListItem} from '@/lib/sanity/queries';

type CaseStudiesGridProps = {
  caseStudies?: CaseStudyListItem[] | null;
};

const fallbackCaseStudies: CaseStudyListItem[] = CASE_STUDIES.items.map((study, index) => ({
  _id: `${study.slug}-${index}`,
  title: study.title,
  slug: {current: study.slug},
  client: study.client,
  tag: study.tag,
  caseNumber: study.caseNumber,
  sector: study.sector,
  description: study.desc,
  stats: study.stats.map((stat) => ({...stat})),
}));

export default async function CaseStudiesGrid({caseStudies}: CaseStudiesGridProps) {
  const fetchedCaseStudies = caseStudies ?? (await getFeaturedCaseStudies());
  const resolvedCaseStudies = fetchedCaseStudies ?? fallbackCaseStudies;

  return (
    <section id="cases" className="relative overflow-hidden bg-[linear-gradient(180deg,#F4F6F9_0%,#ffffff_50%,#F4F6F9_100%)] py-[clamp(5rem,9vw,8rem)] text-navy">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(13,27,42,0.1),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 lg:px-16 xl:px-24">
        {/* Header row */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-14 lg:flex-row lg:items-end">
          <div>
            <div className="section-tag section-tag-dark mb-5">{CASE_STUDIES.tag}</div>
            <h2 className="section-heading text-navy">Results that speak for themselves.</h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 self-start text-[0.72rem] font-bold uppercase tracking-[0.22em] text-navy/55 no-underline transition-colors duration-200 hover:text-navy lg:self-auto"
          >
            View All Work
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <CaseStudiesGridClient caseStudies={resolvedCaseStudies.slice(0, 6)} />
      </div>
    </section>
  );
}
