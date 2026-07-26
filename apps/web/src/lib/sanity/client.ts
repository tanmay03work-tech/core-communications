import {createClient, type QueryParams} from 'next-sanity';
import {apiVersion, dataset, projectId} from './env';

export {apiVersion, dataset, projectId};
export const token = process.env.SANITY_API_READ_TOKEN;
const fallbackProjectId = projectId || 'sanity-project-id';
const fallbackDataset = dataset || 'production';

export const sanityProject = {
  projectId,
  dataset,
  apiVersion,
};

export const isSanityConfigured = Boolean(projectId && dataset);

export const client = createClient({
  projectId: fallbackProjectId,
  dataset: fallbackDataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
});

export const previewClient = createClient({
  projectId: fallbackProjectId,
  dataset: fallbackDataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'previewDrafts',
});

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
};

async function isDraftModeEnabled() {
  try {
    const {draftMode} = await import('next/headers');
    return draftMode().isEnabled;
  } catch {
    return false;
  }
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  const isEnabled = await isDraftModeEnabled();
  const activeClient = isEnabled ? previewClient : client;

  try {
    return await activeClient.fetch<T>(query, params, {
      next: {
        revalidate: isEnabled ? 0 : 60,
        tags: ['sanity', ...tags],
      },
      perspective: isEnabled ? 'previewDrafts' : 'published',
      useCdn: false,
      token: isEnabled ? token : undefined,
    });
  } catch {
    return null;
  }
}
