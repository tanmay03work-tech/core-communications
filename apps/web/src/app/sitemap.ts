import type {MetadataRoute} from 'next';
import {CASE_STUDIES} from '@/lib/constants';
import {getAbsoluteUrl} from '@/lib/metadata';
import {getCaseStudySlugs} from '@/lib/sanity/content';

function normalizeSlug(slug: string | null | undefined) {
  if (typeof slug !== 'string') {
    return null;
  }

  const trimmedSlug = slug.trim();
  return trimmedSlug.length > 0 ? trimmedSlug : null;
}

async function getWorkSlugs() {
  const staticSlugs = CASE_STUDIES.items
    .map((study) => normalizeSlug(study.slug))
    .filter((slug): slug is string => Boolean(slug));

  try {
    const cmsSlugs = await getCaseStudySlugs();
    const normalizedCmsSlugs = (cmsSlugs ?? [])
      .map((slug) => normalizeSlug(slug))
      .filter((slug): slug is string => Boolean(slug));

    return [...new Set([...staticSlugs, ...normalizedCmsSlugs])];
  } catch (error) {
    console.error('sitemap case study slug fetch failed:', error);
    return staticSlugs;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/work', '/contact'];
  const workSlugs = await getWorkSlugs();

  return [
    ...staticPages.map((path) => ({
      url: getAbsoluteUrl(path),
    })),
    ...workSlugs.map((slug) => ({
      url: getAbsoluteUrl(`/work/${slug}`),
    })),
  ];
}
