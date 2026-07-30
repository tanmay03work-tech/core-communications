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
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug).trim();
  } catch (_) {
    // fallback to original slug
  }

  const cleanSlug = decoded.replace(/^\/+|\/+$/g, '');
  const seg = cleanSlug.split('/').pop() || cleanSlug;

  const study = await sanityFetch<GetCaseStudyBySlugResult>({
    query: getCaseStudyBySlugQuery,
    params: {slug: cleanSlug},
    tags: ['caseStudies', `caseStudy:${cleanSlug}`],
  });

  if (study) {
    return study;
  }

  if (seg !== cleanSlug) {
    const studyBySeg = await sanityFetch<GetCaseStudyBySlugResult>({
      query: getCaseStudyBySlugQuery,
      params: {slug: seg},
      tags: ['caseStudies', `caseStudy:${seg}`],
    });

    if (studyBySeg) {
      return studyBySeg;
    }
  }

  return null;
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
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug).trim();
  } catch (_) {
    // fallback
  }

  const rawSlug = decoded.replace(/^\/+|\/+$/g, '');
  const lastSegment = rawSlug.split('/').pop() || rawSlug;

  const post = await sanityFetch<GetBlogPostBySlugResult>({
    query: getBlogPostBySlugQuery,
    params: {slug: rawSlug},
    tags: ['blogPosts', `blogPost:${rawSlug}`],
  });

  if (post && post.title) {
    return post;
  }

  if (lastSegment !== rawSlug) {
    const postBySegment = await sanityFetch<GetBlogPostBySlugResult>({
      query: getBlogPostBySlugQuery,
      params: {slug: lastSegment},
      tags: ['blogPosts', `blogPost:${lastSegment}`],
    });

    if (postBySegment && postBySegment.title) {
      return postBySegment;
    }
  }

  const allPosts = await getBlogPosts();
  if (!allPosts || allPosts.length === 0) {
    return null;
  }

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const targetNorm = normalize(lastSegment);

  const matched = allPosts.find((p) => {
    if (!p.slug?.current) return false;
    const s = p.slug.current.replace(/^\/+|\/+$/g, '');
    const seg = s.split('/').pop() || s;
    return normalize(s) === targetNorm || normalize(seg) === targetNorm;
  });

  if (matched?.slug?.current) {
    return sanityFetch<GetBlogPostBySlugResult>({
      query: getBlogPostBySlugQuery,
      params: {slug: matched.slug.current},
      tags: ['blogPosts', `blogPost:${matched.slug.current}`],
    });
  }

  return null;
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
