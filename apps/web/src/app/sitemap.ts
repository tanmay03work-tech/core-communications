import type {MetadataRoute} from 'next';
import {getAbsoluteUrl} from '@/lib/metadata';
import {getBlogPostSlugs, getCaseStudySlugs} from '@/lib/sanity/content';

function normalizeSlug(slug: string | null | undefined) {
  if (typeof slug !== 'string') {
    return null;
  }

  const trimmedSlug = slug.trim().replace(/^\/+|\/+$/g, '');
  return trimmedSlug.length > 0 ? trimmedSlug : null;
}

async function getWorkSlugs() {
  try {
    const cmsSlugs = await getCaseStudySlugs();
    return (cmsSlugs ?? [])
      .map((slug) => normalizeSlug(slug))
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error('sitemap case study slug fetch failed:', error);
    return [];
  }
}

async function getBlogSlugs() {
  try {
    const cmsSlugs = await getBlogPostSlugs();

    return (cmsSlugs ?? [])
      .map((slug) => normalizeSlug(slug))
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error('sitemap blog slug fetch failed:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/work', '/blogs', '/contact'];
  const workSlugs = await getWorkSlugs();
  const blogSlugs = await getBlogSlugs();

  return [
    ...staticPages.map((path) => ({
      url: getAbsoluteUrl(path),
    })),
    ...workSlugs.map((slug) => ({
      url: getAbsoluteUrl(`/work/${slug}`),
    })),
    ...blogSlugs.map((slug) => ({
      url: getAbsoluteUrl(`/blogs/${slug}`),
    })),
  ];
}
