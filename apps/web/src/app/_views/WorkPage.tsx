import Link from 'next/link';
import {Container} from '@/components/layout/Container';
import SectionLabel from '@/components/ui/SectionLabel';
import {CASE_STUDIES, CTA} from '@/lib/constants';
import {getMarketingPageSeo, resolvePageMetadata} from '@/lib/metadata';
import {getCaseStudies, getSiteSettings} from '@/lib/sanity/content';
import type {CaseStudyListItem} from '@/lib/sanity/queries';

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();

  return resolvePageMetadata({
    pathname: '/work',
    fallbackTitle: 'Work',
    fallbackDescription: 'Results that speak for themselves. Discover our B2B PR case studies.',
    pageSeo: getMarketingPageSeo(siteSettings, 'work'),
  });
}

type StaticCaseStudy = (typeof CASE_STUDIES.items)[number];
type StudyCard = CaseStudyListItem | StaticCaseStudy;

function getStudyDescription(study: StudyCard) {
  return 'desc' in study ? study.desc : study.description ?? '';
}

function getStudyStats(study: StudyCard) {
  return study.stats ?? [];
}

function getStudySlug(study: StudyCard) {
  return typeof study.slug === 'string' ? study.slug : study.slug?.current ?? '';
}

export default async function WorkPage() {
  const cmsStudies = await getCaseStudies();
  const studies = cmsStudies?.length ? cmsStudies : CASE_STUDIES.items;

  return (
    <main className="bg-surface text-navy">
      <section className="section-wrap py-16">
        <Container className="max-w-2xl">
          <SectionLabel className="text-primary">Our Work</SectionLabel>
          <h1 className="section-heading text-navy">
            Results that move credibility, reach, and business momentum.
          </h1>
          <p className="mt-6 text-base leading-8 text-navy/68">
            We measure success in institutional credibility, market authority, and outcomes that keep compounding beyond the first headline.
          </p>
        </Container>
      </section>

      <section className="sticky top-[72px] z-20 bg-white/95 py-3 backdrop-blur">
        <Container>
          <div className="flex gap-3 overflow-x-auto">
            {['All', 'Cybersecurity', 'Healthtech', 'Fintech', 'Leadership'].map((filter) => (
              <button key={filter} type="button" className="border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy/60 first:bg-primary first:text-white">
                {filter}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap pt-6">
        <Container>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {studies.map((study) => (
              <Link
                key={getStudySlug(study)}
                href={`/work/${getStudySlug(study)}`}
                className="flex h-full flex-col justify-between border border-neutral-100 bg-white p-card-pad no-underline transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent">
                    {study.client}
                  </div>
                  <h3 className="mb-3 text-[1.5rem] font-semibold leading-tight text-navy">{study.title}</h3>
                  <p className="line-clamp-3 text-[0.95rem] leading-8 text-navy/68">{getStudyDescription(study)}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-6">
                  {getStudyStats(study).slice(0, 4).map((stat) => (
                    <div key={('_key' in stat ? stat._key : undefined) ?? stat.label}>
                      <div className="text-[1.65rem] font-semibold leading-none text-navy">{stat.value}</div>
                      <div className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-navy/52">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-wrap bg-white text-center">
        <Container className="max-w-2xl">
          <h2 className="section-heading text-navy">Ready for outcomes like these?</h2>
          <p className="mb-6 mt-6 text-base leading-8 text-navy/68">{CTA.subtitle}</p>
          <Link href={CTA.primary.href} className="btn-primary">
            <span>{CTA.primary.label}</span>
          </Link>
        </Container>
      </section>
    </main>
  );
}
