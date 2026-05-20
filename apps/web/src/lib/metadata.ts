import type {Metadata} from 'next';
import {SITE} from '@/lib/constants';
import {getSanityImageUrl} from '@/lib/sanity/image';
import type {PageSeoData, SanityImage, SeoData, SiteSettings} from '@/types';

const LOCAL_SITE_URL = 'http://localhost:3000';
const BRAND_NAME = 'Core Communications';

export type MarketingPageSeoKey = keyof NonNullable<PageSeoData>;

type BuildMetadataInput = {
  title: string;
  description: string;
  pathname?: string;
  ogImage?: SanityImage | null;
  ogType?: 'website' | 'article';
};

type ResolvePageMetadataInput = {
  pathname: string;
  fallbackTitle: string;
  fallbackDescription: string;
  pageSeo?: SeoData;
  ogType?: 'website' | 'article';
};

type OpenGraphImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return LOCAL_SITE_URL;
  }

  try {
    return new URL(value).toString().replace(/\/$/, '');
  } catch {
    return LOCAL_SITE_URL;
  }
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getSiteOrigin() {
  return new URL(getSiteUrl());
}

export function getAbsoluteUrl(pathname = '/') {
  return new URL(pathname, getSiteUrl()).toString();
}

export function getSiteVerificationMetadata() {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;

  if (!google && !bing) {
    return undefined;
  }

  return {
    google: google || undefined,
    other: bing ? {'msvalidate.01': bing} : undefined,
  };
}

function normalizeTitle(title: string) {
  return title.replace(/\s*\|\s*Core Communications$/i, '').trim();
}

export function buildOgImageUrl({
  title,
  description,
  type,
}: {
  title: string;
  description?: string;
  type?: string;
}) {
  const url = new URL('/api/og', getSiteUrl());
  url.searchParams.set('title', title);

  if (description) {
    url.searchParams.set('description', description);
  }

  if (type) {
    url.searchParams.set('type', type);
  }

  return url.toString();
}

function getMetadataImage(title: string, description: string, ogImage?: SanityImage | null): OpenGraphImage {
  const resolvedOgImage = ogImage ? getSanityImageUrl(ogImage, {width: 1200, height: 630, fit: 'crop', quality: 85}) : '';

  return {
    url: resolvedOgImage || buildOgImageUrl({title, description, type: 'website'}),
    width: 1200,
    height: 630,
    alt: title,
  };
}

export function buildMetadata({
  title,
  description,
  pathname = '/',
  ogImage,
  ogType = 'website',
}: BuildMetadataInput): Metadata {
  const normalizedTitle = normalizeTitle(title);
  const canonical = getAbsoluteUrl(pathname);
  const image = getMetadataImage(normalizedTitle, description, ogImage);

  return {
    title: normalizedTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: normalizedTitle,
      description,
      type: ogType,
      url: canonical,
      siteName: BRAND_NAME,
      locale: 'en_AU',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: normalizedTitle,
      description,
      images: [image.url],
    },
  };
}

export function resolvePageMetadata({
  pathname,
  fallbackTitle,
  fallbackDescription,
  pageSeo,
  ogType = 'website',
}: ResolvePageMetadataInput) {
  return buildMetadata({
    title: pageSeo?.metaTitle || fallbackTitle,
    description: pageSeo?.metaDescription || fallbackDescription,
    pathname,
    ogImage: pageSeo?.ogImage,
    ogType,
  });
}

export function getMarketingPageSeo(siteSettings: SiteSettings | null | undefined, page: MarketingPageSeoKey) {
  return siteSettings?.pageSeo?.[page];
}

export function getDefaultSiteDescription(siteSettings: SiteSettings | null | undefined) {
  return siteSettings?.seo?.metaDescription || SITE.description;
}

export function getDefaultSiteOgImage(siteSettings: SiteSettings | null | undefined) {
  return siteSettings?.seo?.ogImage;
}

export function getOrganizationStructuredData(siteSettings: SiteSettings | null | undefined) {
  const sameAs = siteSettings?.socialLinks?.map((item) => item.url).filter(Boolean) ?? [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: getSiteUrl(),
    logo: getAbsoluteUrl('/logo.png'),
    sameAs,
  };
}
