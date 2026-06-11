import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {Container} from '@/components/layout/Container';
import StructuredData from '@/components/seo/StructuredData';
import SectionRenderer from '@/components/sections/SectionRenderer';
import PortableTextContent from '@/components/sections/PortableTextContent';
import SectionLabel from '@/components/ui/SectionLabel';
import {CASE_STUDIES} from '@/lib/constants';
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
type CompactBlock = {
  _key?: string;
  title: string;
  body?: string;
  bullets?: readonly string[];
};

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

function getOptionalField(study: SanityCaseStudy | StaticCaseStudy, field: string): unknown {
  return field in study ? (study as Record<string, unknown>)[field] : undefined;
}

function normalizeSlug(slug: string | null | undefined) {
  if (typeof slug !== 'string') {
    return null;
  }

  const trimmedSlug = slug.trim();
  return trimmedSlug.length > 0 ? trimmedSlug : null;
}

function getPlacementClass(name: string) {
  const lowerName = name.toLowerCase();

  if (['afr', 'riskybiz', 'cyber daily'].some((item) => lowerName.includes(item))) {
    return 'bg-black text-white';
  }

  if (['aap', 'nhk', 'information age'].some((item) => lowerName.includes(item))) {
    return 'bg-[#d90808] text-white';
  }

  if (['techday', 'abc', 'innovationaus', 'the adviser', 'dc dynamics'].some((item) => lowerName.includes(item))) {
    return 'bg-white text-[#1768b8]';
  }

  if (lowerName.includes('fintech')) {
    return 'bg-white text-[#00a66a]';
  }

  if (lowerName.includes('crypto')) {
    return 'bg-black text-[#ffd400]';
  }

  if (lowerName.includes('australian')) {
    return 'bg-white text-[#d90808]';
  }

  return 'bg-white text-navy/82';
}

function CompactInfoBlock({block, index}: {block: CompactBlock; index?: number}) {
  const bodyParts = block.body?.split('\n').filter(Boolean) ?? [];
  const hasContent = bodyParts.length > 0 || Boolean(block.bullets?.length);

  if (!hasContent) {
    return null;
  }

  return (
    <div className="border border-navy/10 bg-white p-4 shadow-[0_10px_28px_rgba(13,27,42,0.035)]">
      <div className="mb-3 flex items-center gap-3 border-b border-navy/10 bg-navy/[0.025] px-3 py-2">
        {typeof index === 'number' ? <span className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-primary">{String(index + 1).padStart(2, '0')}</span> : null}
        <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">{block.title}</h2>
      </div>
      {bodyParts.map((part) => (
        <p key={part} className="mb-3 whitespace-pre-line font-sans text-[0.82rem] leading-relaxed text-navy/76 last:mb-0">
          {part}
        </p>
      ))}
      {block.bullets?.length ? (
        <ul className="space-y-2.5">
          {block.bullets.map((bullet) => (
            <li key={bullet} className="grid grid-cols-[0.35rem_1fr] gap-3 font-sans text-[0.82rem] leading-relaxed text-navy/78">
              <span className="mt-2 h-1 w-1 rounded-full bg-navy" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

async function getSafeCaseStudyBySlug(slug: string) {
  try {
    const cmsStudy = await getCaseStudyBySlug(slug);
    const staticStudy = getStaticCaseStudy(slug);

    if (cmsStudy?.caseNumber) {
      return cmsStudy;
    }

    return staticStudy;
  } catch (error) {
    console.error(`getCaseStudyBySlug error for "${slug}":`, error);
    return getStaticCaseStudy(slug);
  }
}

async function getSanityCaseStudySlugs(): Promise<string[]> {
  try {
    const works = await sanityFetch<CaseStudySlugResult[]>({
      query: `*[_type == "caseStudy" && defined(slug.current) && defined(caseNumber)]{
        "slug": slug.current
      }`,
      tags: ['caseStudies'],
    });

    if (!Array.isArray(works)) {
      return [];
    }

    return works.map((work) => normalizeSlug(work?.slug)).filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error('generateStaticParams error:', error);
    return [];
  }
}

export async function generateStaticParams(): Promise<CaseStudyRouteParams[]> {
  const cmsSlugs = await getSanityCaseStudySlugs();
  const staticSlugs = CASE_STUDIES.items.map((study) => normalizeSlug(study.slug)).filter((slug): slug is string => Boolean(slug));

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
  const title = study.title;
  const client = study.client;
  const sector = getStudySector(study);
  const publishedAt = getStudyPublishedAt(study);
  const caseNumber = getOptionalField(study, 'caseNumber') as string | undefined;
  const kicker = getOptionalField(study, 'kicker') as string | undefined;
  const intro = getOptionalField(study, 'intro') as string | undefined;
  const detailBlocks = (getOptionalField(study, 'detailBlocks') ?? []) as CompactBlock[];
  const milestoneBlocks = (getOptionalField(study, 'milestoneBlocks') ?? []) as CompactBlock[];
  const outcome = getOptionalField(study, 'outcome') as {title?: string; body?: string; bullets?: string[]} | undefined;
  const mediaPlacements = (getOptionalField(study, 'mediaPlacements') ?? []) as string[];
  const resultNote = getOptionalField(study, 'resultNote') as string | undefined;
  const image = getStudyImage(study);
  const imageUrl = image ? getSanityImageUrl(image, {width: 1200, height: 630, fit: 'crop', quality: 85}) : buildOgImageUrl({title, description, type: 'case-study'});
  const bodyContent = getOptionalField(study, 'bodyContent') as import('@/types').PortableTextNode[] | undefined;

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
    <main className="bg-surface-light text-navy">
      <StructuredData data={structuredData} />

      <section className="border-y border-navy/12 bg-white pb-8 pt-32 md:pb-10 md:pt-36">
        <Container className="max-w-7xl">
          <div className="flex flex-col gap-3">
            <SectionLabel className="text-primary">{caseNumber ? `Case Study ${caseNumber}` : client}</SectionLabel>
            <h1 className="max-w-5xl font-heading text-[clamp(2rem,4vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-navy">{title}</h1>
            {kicker ? <p className="max-w-4xl font-sans text-[0.88rem] leading-relaxed text-steel">{kicker}</p> : null}
            {intro ? <p className="max-w-5xl text-[0.95rem] italic leading-relaxed text-black">{intro}</p> : null}
          </div>
          <div className="mobile-scroll-pane -mx-5 mt-5 flex gap-2.5 px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
            {tag ? <span className="shrink-0 border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/72">{tag}</span> : null}
            {sector ? <span className="shrink-0 border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/72">{sector}</span> : null}
            {publishedAt ? <span className="shrink-0 border border-neutral-100 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/72">{new Date(publishedAt).getFullYear()}</span> : null}
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container className="max-w-7xl">
          {stats.length ? (
            <div className="mb-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {stats.map((stat) => (
                <div key={('_key' in stat ? stat._key : undefined) ?? stat.label} className="border border-navy/10 bg-white p-4 text-center">
                  <div className="font-heading text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-none tracking-tight text-navy">{stat.value}</div>
                  <div className="mx-auto mt-3 max-w-[11rem] text-[0.68rem] leading-snug text-navy/64">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : null}

          {resultNote ? <div className="mb-5 border border-navy/10 bg-white px-5 py-4 text-[0.86rem] italic leading-relaxed text-navy/76">{resultNote}</div> : null}

          {milestoneBlocks.length ? (
            <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
              <div className="space-y-4">{detailBlocks.map((block) => <CompactInfoBlock key={block._key ?? block.title} block={block} />)}</div>
              <div className="space-y-4">{milestoneBlocks.map((block, index) => <CompactInfoBlock key={block._key ?? block.title} block={block} index={index} />)}</div>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-3">{detailBlocks.map((block) => <CompactInfoBlock key={block._key ?? block.title} block={block} />)}</div>
          )}

          {outcome ? (
            <div className="mt-5 border border-navy/10 bg-white p-5">
              <h2 className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy">{outcome.title ?? 'Key Outcomes'}</h2>
              {outcome.body ? <p className="font-sans text-[0.84rem] leading-relaxed text-navy/78">{outcome.body}</p> : null}
              {outcome.bullets?.length ? (
                <ul className="space-y-2.5">
                  {outcome.bullets.map((bullet) => (
                    <li key={bullet} className="grid grid-cols-[0.35rem_1fr] gap-3 font-sans text-[0.84rem] leading-relaxed text-navy/78">
                      <span className="mt-2 h-1 w-1 rounded-full bg-navy" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {bodyContent && bodyContent.length > 0 ? (
            <div className="mt-8 border border-navy/10 bg-white p-5 md:p-8">
              <PortableTextContent value={bodyContent} />
            </div>
          ) : null}

          {mediaPlacements.length ? (
            <div className="mt-8">
              <SectionLabel className="text-primary">Media Placements</SectionLabel>
              <div className="mt-3 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
                {mediaPlacements.map((placement) => (
                  <div key={placement} className="border border-navy/10 bg-white p-2">
                    <div className={`flex h-12 items-center justify-center px-3 text-center text-[0.78rem] font-black uppercase tracking-[0.08em] ${getPlacementClass(placement)}`}>{placement}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-5">
            <Link href="/work" className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-accent no-underline">
              Back To Work -&gt;
            </Link>
            {sector ? <div className="text-[0.72rem] text-navy/62">Sector: {sector}</div> : null}
          </div>
        </Container>
      </section>

      <SectionRenderer sections={sections} />
    </main>
  );
}
