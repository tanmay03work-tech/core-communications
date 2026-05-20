import Link from 'next/link';
import CaseStudiesGridClient from '@/components/sections/CaseStudiesGridClient';
import SectionLabel from '@/components/ui/SectionLabel';
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
  tag: study.client,
  description: study.desc,
  stats: study.stats.map((stat) => ({...stat})),
}));

export default async function CaseStudiesGrid({caseStudies}: CaseStudiesGridProps) {
  const fetchedCaseStudies = caseStudies ?? (await getFeaturedCaseStudies());
  const resolvedCaseStudies = fetchedCaseStudies?.length ? fetchedCaseStudies : fallbackCaseStudies;

  return (
    <section id="cases" className="section-wrap bg-ink text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionLabel>{CASE_STUDIES.tag}</SectionLabel>
            <h2 className="section-heading text-white" dangerouslySetInnerHTML={{__html: CASE_STUDIES.heading}} />
          </div>
          <Link href="/work" className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-accent no-underline">
            View All Work →
          </Link>
        </div>
        <CaseStudiesGridClient caseStudies={resolvedCaseStudies.slice(0, 4)} />
      </div>
    </section>
  );
}
