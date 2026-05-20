import type {ContactFormData as ContactFormPayload} from '@/lib/schema';

export type SanitySlug = {
  _type?: 'slug';
  current?: string;
};

export type SanityImage = {
  _type?: 'image';
  asset?: {
    _type?: 'reference';
    _ref?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  };
  alt?: string;
  caption?: string;
};

export type PortableTextMarkDef = {
  _key?: string;
  _type?: 'link';
  href?: string;
};

export type PortableTextSpan = {
  _key?: string;
  _type?: 'span';
  text: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _key?: string;
  _type: 'block';
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
};

export type PortableTextImage = SanityImage & {
  _key?: string;
  _type: 'image';
};

export type PortableTextCallout = {
  _key?: string;
  _type: 'callout';
  title?: string;
  body: string;
  tone?: 'info' | 'success' | 'warning';
};

export type PortableTextNode = PortableTextBlock | PortableTextImage | PortableTextCallout;

export type SectionLink = {
  _key?: string;
  _type?: 'sectionLink';
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

export type SectionImageItem = {
  _key?: string;
  _type?: 'sectionImage';
  image: SanityImage;
  caption?: string;
};

export type SectionTheme = 'light' | 'dark' | 'accent';
export type SectionSpacing = 'compact' | 'regular' | 'spacious';

export type HeroSection = {
  _key?: string;
  _type: 'heroSection';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: SanityImage;
  actions?: SectionLink[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
  align?: 'left' | 'center';
};

export type TextSection = {
  _key?: string;
  _type: 'textSection';
  eyebrow?: string;
  title?: string;
  body: PortableTextNode[];
  maxWidth?: 'narrow' | 'medium' | 'wide';
  theme?: SectionTheme;
  spacing?: SectionSpacing;
};

export type CaseStudyStat = {
  _key?: string;
  _type?: 'stat';
  value: string;
  label: string;
};

export type StatsSection = {
  _key?: string;
  _type: 'statsSection';
  eyebrow?: string;
  title?: string;
  intro?: string;
  stats: CaseStudyStat[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
};

export type GallerySection = {
  _key?: string;
  _type: 'gallerySection';
  eyebrow?: string;
  title?: string;
  images: SectionImageItem[];
  layout?: 'grid' | 'masonry' | 'feature';
  theme?: SectionTheme;
  spacing?: SectionSpacing;
};

export type MediaCoverageItem = {
  _key?: string;
  _type?: 'mediaCoverageItem';
  publication: string;
  headline: string;
  summary?: string;
  url?: string;
  publishedAt?: string;
};

export type MediaCoverageSection = {
  _key?: string;
  _type: 'mediaCoverageSection';
  eyebrow?: string;
  title?: string;
  items: MediaCoverageItem[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
};

export type QuoteSection = {
  _key?: string;
  _type: 'quoteSection';
  quote: string;
  attribution?: string;
  role?: string;
  company?: string;
  image?: SanityImage;
  theme?: SectionTheme;
  spacing?: SectionSpacing;
};

export type CTASectionData = {
  _key?: string;
  _type: 'ctaSection';
  eyebrow?: string;
  title: string;
  body?: string;
  actions: SectionLink[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
};

export type SplitContentSection = {
  _key?: string;
  _type: 'splitContentSection';
  eyebrow?: string;
  title?: string;
  body?: PortableTextNode[];
  media?: SectionImageItem[];
  mediaPosition?: 'left' | 'right';
  imageLeft?: boolean;
  cta?: SectionLink;
  actions?: SectionLink[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
};

export type LogoCloudItem = {
  _key?: string;
  _type?: 'logoCloudItem';
  name: string;
  logo?: SanityImage;
  url?: string;
};

export type LogoCloudSection = {
  _key?: string;
  _type: 'logoCloudSection';
  eyebrow?: string;
  title?: string;
  items: LogoCloudItem[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
};

export type ModularSection =
  | HeroSection
  | TextSection
  | StatsSection
  | GallerySection
  | MediaCoverageSection
  | QuoteSection
  | CTASectionData
  | SplitContentSection
  | LogoCloudSection;

export type SeoData = {
  _type?: 'seo';
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
};

export type PageSeoData = {
  about?: SeoData;
  services?: SeoData;
  work?: SeoData;
  contact?: SeoData;
};

export type CaseStudy = {
  _id?: string;
  _type: 'caseStudy';
  title: string;
  slug?: SanitySlug;
  client: string;
  sector: string;
  tag: string;
  description: string;
  stats?: CaseStudyStat[];
  sections?: ModularSection[];
  coverImage?: SanityImage;
  publishedAt?: string;
  featured?: boolean;
  seo?: SeoData;
};

export type Service = {
  _id?: string;
  _type: 'service';
  title: string;
  slug?: SanitySlug;
  number: string;
  icon?: string;
  shortDesc: string;
  body?: PortableTextNode[];
  sections?: ModularSection[];
  order?: number;
};

export type TeamMember = {
  _id?: string;
  _type: 'teamMember';
  name: string;
  slug?: SanitySlug;
  role: string;
  location?: string;
  bio?: string;
  photo?: SanityImage;
  linkedIn?: string;
  order?: number;
  sections?: ModularSection[];
};

export type SiteSettings = {
  _id?: string;
  _type: 'siteSettings';
  tagline?: string;
  heroMorphWords?: string[];
  heroMetrics?: Array<{_key?: string; value: string; label: string}>;
  clients?: string[];
  contactEmail?: string;
  phone?: string;
  sydneyAddress?: string;
  mumbaiAddress?: string;
  socialLinks?: Array<{_key?: string; platform: string; url: string}>;
  seo?: SeoData;
  pageSeo?: PageSeoData;
};

export type ContactFormData = ContactFormPayload;
