export interface SanitySlugValue {
  _type?: 'slug';
  current?: string;
}

export interface SanityImageAssetReference {
  _type: 'reference';
  _ref: string;
}

export interface SanityImageValue {
  _type: 'image';
  asset?: SanityImageAssetReference;
  alt?: string;
  caption?: string;
}

export interface SectionCtaLink {
  _key?: string;
  _type: 'sectionLink';
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

export interface SectionImageItem {
  _key?: string;
  _type: 'sectionImage';
  image: SanityImageValue;
  caption?: string;
}

export interface LogoCloudItem {
  _key?: string;
  _type: 'logoCloudItem';
  name: string;
  logo?: SanityImageValue;
  url?: string;
}

export interface MediaCoverageItem {
  _key?: string;
  _type: 'mediaCoverageItem';
  publication: string;
  headline: string;
  summary?: string;
  url?: string;
  publishedAt?: string;
}

export type SectionTheme = 'light' | 'dark' | 'accent';
export type SectionSpacing = 'compact' | 'regular' | 'spacious';
