import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Container} from '@/components/layout/Container';
import StructuredData from '@/components/seo/StructuredData';
import {ClientWordmark} from '@/components/sections/ClientWordmarks';
import SectionRenderer from '@/components/sections/SectionRenderer';
import SectionLabel from '@/components/ui/SectionLabel';
import {CASE_STUDIES, TICKER_CLIENTS} from '@/lib/constants';
import {buildMetadata, buildOgImageUrl, getAbsoluteUrl, getSiteUrl} from '@/lib/metadata';
import {sanityFetch} from '@/lib/sanity/client';
import {getCaseStudyBySlug} from '@/lib/sanity/content';
import {getSanityImageUrl} from '@/lib/sanity/image';
import type {CaseStudy as SanityCaseStudy} from '@/types';

type CaseStudyPageProps = {
  params: {slug: string};
};

type StaticCaseStudy = (typeof CASE_STUDIES.items)[number];
type CaseStudyRouteParams = {slug: string};
type CaseStudySlugResult = {slug?: string | null};

function getStaticCaseStudy(slug: string) {
  return CASE_STUDIES.items.find((item) => item.slug === slug) ?? null;
}

function getStudyDescription(study: SanityCaseStudy | StaticCaseStudy) {
  return 'description' in study ? study.description : study.desc;
}

function getStudySections(study: SanityCaseStudy | StaticCaseStudy) {
  return 'sections' in study ? study.sections ?? [] : [];
}

function getStudyTag(study: SanityCaseStudy | StaticCaseStudy) {
  return 'tag' in study ? study.tag : undefined;
}

function getStudyTitle(study: SanityCaseStudy | StaticCaseStudy) {
  return study.title;
}

function getStudyClient(study: SanityCaseStudy | StaticCaseStudy) {
  return study.client;
}

function getStudySector(study: SanityCaseStudy | StaticCaseStudy) {
  return 'sector' in study ? study.sector : undefined;
}

function getStudyPublishedAt(study: SanityCaseStudy | StaticCaseStudy) {
  return 'publishedAt' in study ? study.publishedAt : undefined;
}

function getStudyImage(study: SanityCaseStudy | StaticCaseStudy) {
  if ('seo' in study && study.seo?.ogImage) {
    return study.seo.ogImage;
  }

  if ('coverImage' in study && study.coverImage) {
    return study.coverImage;
  }

  return null;
}

function normalizeSlug(slug: string | null | undefined) {
  if (typeof slug !== 'string') {
    return null;
  }

  const trimmedSlug = slug.trim();
  return trimmedSlug.length > 0 ? trimmedSlug : null;
}

async function getSafeCaseStudyBySlug(slug: string) {
  try {
    return (await getCaseStudyBySlug(slug)) ?? getStaticCaseStudy(slug);
  } catch (error) {
    console.error(`getCaseStudyBySlug error for "${slug}":`, error);
    return getStaticCaseStudy(slug);
  }
}

async function getSanityCaseStudySlugs(): Promise<string[]> {
  try {
    const works = await sanityFetch<CaseStudySlugResult[]>({
      query: `*[_type == "caseStudy" && defined(slug.current)]{
        "slug": slug.current
      }`,
      tags: ['caseStudies'],
    });

    if (!Array.isArray(works)) {
      return [];
    }

    return works
      .map((work) => normalizeSlug(work?.slug))
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error('generateStaticParams error:', error);
    return [];
  }
}

export async function generateStaticParams(): Promise<CaseStudyRouteParams[]> {
  const cmsSlugs = await getSanityCaseStudySlugs();
  const staticSlugs = CASE_STUDIES.items
    .map((study) => normalizeSlug(study.slug))
    .filter((slug): slug is string => Boolean(slug));

  return [...new Set([...staticSlugs, ...cmsSlugs])].map((slug) => ({slug}));
}

export async function generateMetadata({params}: CaseStudyPageProps): Promise<Metadata> {
  const study = await getSafeCaseStudyBySlug(params.slug);
  const pathname = `/work/${params.slug}`;

  if (!study) {
    return buildMetadata({
      title: 'Case Study',
      description: 'Explore our latest case study work.',
      pathname,
    });
  }

  return buildMetadata({
    title: 'seo' in study && study.seo?.metaTitle ? study.seo.metaTitle : study.title,
    description: 'seo' in study && study.seo?.metaDescription ? study.seo.metaDescription : getStudyDescription(study),
    pathname,
    ogImage: getStudyImage(study),
  });
}

export default async function CaseStudyPage({params}: CaseStudyPageProps) {
  const study = await getSafeCaseStudyBySlug(params.slug);

  if (!study) {
    notFound();
  }

  const description = getStudyDescription(study);
  const stats = study.stats ?? [];
  const sections = getStudySections(study);
  const tag = getStudyTag(study);
  const title = getStudyTitle(study);
  const client = getStudyClient(study);
  const sector = getStudySector(study);
  const publishedAt = getStudyPublishedAt(study);
  const image = getStudyImage(study);
  const imageUrl = image
    ? getSanityImageUrl(image, {width: 1200, height: 630, fit: 'crop', quality: 85})
    : buildOgImageUrl({title, description, type: 'case-study'});

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    additionalType: 'https://schema.org/Project',
    name: title,
    headline: title,
    description,
    url: getAbsoluteUrl(`/work/${params.slug}`),
    image: [imageUrl],
    genre: 'Case Study',
    keywords: ['Case Study', 'B2B PR', 'Core Communications', client, tag, sector].filter(Boolean),
    creator: {
      '@type': 'Organization',
      name: 'Core Communications',
      url: getSiteUrl(),
    },
  };

  return (
    <main className="bg-surface text-navy">
      <StructuredData data={structuredData} />

      <section className="section-wrap py-16 md:py-20">
        <Container className="max-w-7xl">
          <SectionLabel className="text-primary">{client}</SectionLabel>
          <h1 className="section-heading max-w-4xl text-navy">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-navy/68">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {tag ? <span className="border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy/62">{tag}</span> : null}
            {sector ? <span className="border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy/62">{sector}</span> : null}
            {publishedAt ? <span className="border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy/62">{new Date(publishedAt).getFullYear()}</span> : null}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-14 text-white md:py-20">
        <Container>
          <div className="grid-quarters">
            {stats.map((stat) => (
              <div key={('_key' in stat ? stat._key : undefined) ?? stat.label}>
                <div className="text-[1.9rem] font-semibold leading-none">{stat.value}</div>
                <div className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/72">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container className="max-w-2xl">
          <div className="border border-neutral-100 bg-white p-card-pad">
            <SectionLabel className="text-primary">Overview</SectionLabel>
            <p className="text-base leading-8 text-navy/72">{description}</p>
            <div className="mt-6 grid-split">
              <div>
                <h2 className="mb-3 text-xl font-semibold text-navy">Goals</h2>
                <p className="text-sm leading-7 text-navy/66">
                  Build credibility, sharpen message-market fit, and create durable visibility in the conversations that matter.
                </p>
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold text-navy">Approach</h2>
                <p className="text-sm leading-7 text-navy/66">
                  Focused media strategy, evidence-led storytelling, and disciplined rollout designed for market relevance over noise.
                </p>
              </div>
            </div>
            <div className="grid-auto mt-8 py-8">
              {TICKER_CLIENTS.slice(0, 6).map((logo) => (
                <div
                  key={logo}
                  className="flex min-h-[5.5rem] items-center justify-center rounded-[1.25rem] border border-neutral-100 bg-white px-5 py-3 shadow-[0_10px_30px_rgba(28,46,74,0.05)]"
                >
                  <ClientWordmark client={logo} className="h-7 w-auto max-w-[8.75rem]" />
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-neutral-100 pt-6">
              <Link href="/work" className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-accent no-underline">
                Back To Work →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <SectionRenderer sections={sections} />
    </main>
  );
}
