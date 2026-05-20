import {sanityFetch} from '@/lib/sanity/client';
import {
  getAllCaseStudiesQuery,
  getAllServicesQuery,
  getAllTeamMembersQuery,
  getCaseStudyBySlugQuery,
  getCaseStudySlugsQuery,
  getFeaturedCaseStudiesQuery,
  getSiteSettingsQuery,
  type GetAllCaseStudiesResult,
  type GetAllServicesResult,
  type GetAllTeamMembersResult,
  type GetCaseStudyBySlugResult,
  type GetCaseStudySlugsResult,
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
  return sanityFetch<GetCaseStudyBySlugResult>({
    query: getCaseStudyBySlugQuery,
    params: {slug},
    tags: ['caseStudies', `caseStudy:${slug}`],
  });
}

export async function getCaseStudySlugs() {
  return sanityFetch<GetCaseStudySlugsResult>({
    query: getCaseStudySlugsQuery,
    tags: ['caseStudies'],
  });
}

export async function getFeaturedCaseStudies() {
  return sanityFetch<GetFeaturedCaseStudiesResult>({
    query: getFeaturedCaseStudiesQuery,
    tags: ['caseStudies'],
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
