import {groq} from 'next-sanity';
import type {
  BlogPost,
  CaseStudy,
  CaseStudyStat,
  ClientLogo,
  SanityImage,
  SanitySlug,
  Service,
  SiteSettings,
  TeamMember,
} from '@/types';

const imageFields = groq`
  {
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    }
  }
`;

const portableTextFields = groq`
  {
    _type == "block" => {
      ...,
      markDefs[]{
        ...
      },
      children[]{
        ...
      }
    },
    _type == "image" => ${imageFields},
    _type == "callout" => {
      ...
    }
  }
`;

const sectionFields = groq`
  {
    ...,
    image${imageFields},
    coverImage${imageFields},
    ogImage${imageFields},
    logo${imageFields},
    photo${imageFields},
    media[]{
      ...,
      image${imageFields}
    },
    cta{
      ...
    },
    images[]{
      ...,
      image${imageFields}
    },
    items[]{
      ...,
      logo${imageFields}
    },
    body[]${portableTextFields},
    actions[]{
      ...
    },
    stats[]{
      ...
    }
  }
`;

const seoFields = groq`
  {
    ...,
    ogImage${imageFields}
  }
`;

export type CaseStudyListItem = {
  _id: string;
  title: string;
  slug?: SanitySlug;
  client: string;
  tag: string;
  caseNumber?: string;
  sector?: string;
  description?: string;
  stats?: CaseStudyStat[];
  coverImage?: SanityImage;
};

export type AuthorSummary = {
  name: string;
  photo?: SanityImage;
};

export type GetAllCaseStudiesResult = CaseStudyListItem[];
export type GetCaseStudyBySlugResult = CaseStudy | null;
export type GetFeaturedCaseStudiesResult = CaseStudyListItem[];
export type GetAllBlogPostsResult = BlogPost[];
export type GetBlogPostBySlugResult = BlogPost | null;
export type GetBlogPostSlugsResult = string[];
export type GetClientLogosResult = ClientLogo[];
export type GetSiteSettingsResult = SiteSettings | null;
export type GetAllTeamMembersResult = TeamMember[];
export type GetAllServicesResult = Service[];
export type GetCaseStudySlugsResult = string[];

export const getAllCaseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] | order(featured desc, publishedAt desc, _createdAt desc){
    _id,
    title,
    slug,
    client,
    tag,
    caseNumber,
    sector,
    description,
    "stats": stats[0...3]{
      ...
    },
    coverImage${imageFields}
  }
`;

export const getCaseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    ...,
    coverImage${imageFields},
    seo${seoFields},
    stats[]{
      ...
    },
    sections[]${sectionFields}
  }
`;

export const getFeaturedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)] | order(featured desc, publishedAt desc, _createdAt desc)[0...6]{
    _id,
    title,
    slug,
    client,
    tag,
    caseNumber,
    sector,
    description,
    "stats": stats[0...3]{
      ...
    },
    coverImage${imageFields}
  }
`;

export const getAllBlogPostsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(featured desc, publishedAt desc){
    _id,
    _type,
    title,
    slug,
    category,
    excerpt,
    author,
    readTime,
    publishedAt,
    featured,
    coverImage${imageFields}
  }
`;

export const getBlogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    ...,
    coverImage${imageFields},
    seo${seoFields},
    bodyContent[]${portableTextFields},
    sections[]${sectionFields}
  }
`;

export const getBlogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)].slug.current
`;

export const getClientLogosQuery = groq`
  *[_type == "clientLogo"] | order(order asc, name asc){
    _id,
    _type,
    name,
    logo${imageFields},
    url,
    category,
    order,
    featured
  }
`;

export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    tagline,
    heroMorphWords,
    heroMetrics,
    clients,
    contactEmail,
    phone,
    sydneyAddress,
    mumbaiAddress,
    newDelhiAddress,
    socialLinks,
    seo${seoFields},
    pageSeo{
      about${seoFields},
      services${seoFields},
      work${seoFields},
      contact${seoFields}
    }
  }
`;

export const getAllTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc, name asc){
    ...,
    photo${imageFields},
    sections[]${sectionFields}
  }
`;

export const getAllServicesQuery = groq`
  *[_type == "service"] | order(order asc, title asc){
    ...,
    sections[]${sectionFields}
  }
`;

export const getCaseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)].slug.current
`;

export const sanityQueries = {
  siteSettings: getSiteSettingsQuery,
  caseStudies: getAllCaseStudiesQuery,
  caseStudySlugs: getCaseStudySlugsQuery,
  caseStudyBySlug: getCaseStudyBySlugQuery,
  blogPosts: getAllBlogPostsQuery,
  blogPostSlugs: getBlogPostSlugsQuery,
  blogPostBySlug: getBlogPostBySlugQuery,
  clientLogos: getClientLogosQuery,
  services: getAllServicesQuery,
  teamMembers: getAllTeamMembersQuery,
  featuredCaseStudies: getFeaturedCaseStudiesQuery,
} as const;
