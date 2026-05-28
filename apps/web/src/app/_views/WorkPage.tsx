import {CASE_STUDIES} from '@/lib/constants';
import {getCaseStudies} from '@/lib/sanity/content';
import WorkPageClient from '@/components/pages/WorkPageClient';

export const metadata = {
  title: 'Our Work',
  description: 'Results that move credibility, reach, and business momentum.',
};

export default async function WorkPage() {
  let cmsStudies = null;

  try {
    cmsStudies = await getCaseStudies();
  } catch {
    cmsStudies = null;
  }

  const newLayoutStudies = cmsStudies?.filter((study) => study.caseNumber);
  const studies = newLayoutStudies?.length ? newLayoutStudies : CASE_STUDIES.items;

  return <WorkPageClient studies={studies} />;
}
