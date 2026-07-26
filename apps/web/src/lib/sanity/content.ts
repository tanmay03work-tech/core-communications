import {sanityFetch} from '@/lib/sanity/client';
import {
  getAllCaseStudiesQuery,
  getAllBlogPostsQuery,
  getAllServicesQuery,
  getAllTeamMembersQuery,
  getBlogPostBySlugQuery,
  getBlogPostSlugsQuery,
  getCaseStudyBySlugQuery,
  getCaseStudySlugsQuery,
  getClientLogosQuery,
  getFeaturedCaseStudiesQuery,
  getSiteSettingsQuery,
  type GetAllBlogPostsResult,
  type GetAllCaseStudiesResult,
  type GetAllServicesResult,
  type GetAllTeamMembersResult,
  type GetBlogPostBySlugResult,
  type GetBlogPostSlugsResult,
  type GetCaseStudyBySlugResult,
  type GetCaseStudySlugsResult,
  type GetClientLogosResult,
  type GetFeaturedCaseStudiesResult,
  type GetSiteSettingsResult,
} from '@/lib/sanity/queries';

export async function getSiteSettings() {
  return sanityFetch<GetSiteSettingsResult>({
    query: getSiteSettingsQuery,
    tags: ['siteSettings'],
  });
}

export async function getCaseStudies() {
  return sanityFetch<GetAllCaseStudiesResult>({
    query: getAllCaseStudiesQuery,
    tags: ['caseStudies'],
  });
}

export async function getCaseStudyBySlug(slug: string) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  return sanityFetch<GetCaseStudyBySlugResult>({
    query: getCaseStudyBySlugQuery,
    params: {slug: cleanSlug},
    tags: ['caseStudies', `caseStudy:${cleanSlug}`],
  });
}

export async function getCaseStudySlugs() {
  const slugs = await sanityFetch<GetCaseStudySlugsResult>({
    query: getCaseStudySlugsQuery,
    tags: ['caseStudies'],
  });
  return (slugs ?? []).map((s) => s.replace(/^\/+|\/+$/g, ''));
}

export async function getFeaturedCaseStudies() {
  return sanityFetch<GetFeaturedCaseStudiesResult>({
    query: getFeaturedCaseStudiesQuery,
    tags: ['caseStudies'],
  });
}

export async function getBlogPosts() {
  return sanityFetch<GetAllBlogPostsResult>({
    query: getAllBlogPostsQuery,
    tags: ['blogPosts'],
  });
}

export async function getBlogPostBySlug(slug: string) {
  const rawSlug = slug.replace(/^\/+|\/+$/g, '');
  const lastSegment = rawSlug.split('/').pop() || rawSlug;

  const post = await sanityFetch<GetBlogPostBySlugResult>({
    query: getBlogPostBySlugQuery,
    params: {slug: rawSlug},
    tags: ['blogPosts', `blogPost:${rawSlug}`],
  });

  if (post) {
    return post;
  }

  if (lastSegment !== rawSlug) {
    const postBySegment = await sanityFetch<GetBlogPostBySlugResult>({
      query: getBlogPostBySlugQuery,
      params: {slug: lastSegment},
      tags: ['blogPosts', `blogPost:${lastSegment}`],
    });

    if (postBySegment) {
      return postBySegment;
    }
  }

  const allPosts = await getBlogPosts();
  if (!allPosts || allPosts.length === 0) {
    return null;
  }

  const targetLower = lastSegment.toLowerCase();
  return (
    allPosts.find((p) => {
      if (!p.slug?.current) return false;
      const s = p.slug.current.replace(/^\/+|\/+$/g, '').toLowerCase();
      const seg = s.split('/').pop() || s;
      return s === targetLower || seg === targetLower;
    }) ?? null
  );
}

export async function getBlogPostSlugs() {
  const slugs = await sanityFetch<GetBlogPostSlugsResult>({
    query: getBlogPostSlugsQuery,
    tags: ['blogPosts'],
  });
  return (slugs ?? [])
    .map((s) => {
      const clean = s.replace(/^\/+|\/+$/g, '');
      const seg = clean.split('/').pop() || clean;
      return seg;
    })
    .filter(Boolean);
}

export async function getClientLogos() {
  return sanityFetch<GetClientLogosResult>({
    query: getClientLogosQuery,
    tags: ['clientLogos'],
  });
}

export async function getServices() {
  return sanityFetch<GetAllServicesResult>({
    query: getAllServicesQuery,
    tags: ['services'],
  });
}

export async function getAllServices() {
  return getServices();
}

export async function getTeamMembers() {
  return sanityFetch<GetAllTeamMembersResult>({
    query: getAllTeamMembersQuery,
    tags: ['teamMembers'],
  });
}
