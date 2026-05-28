import {draftMode} from 'next/headers';
import {createClient, type QueryParams} from 'next-sanity';

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
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
  useCdn: true,
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

function isDraftModeEnabled() {
  try {
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

  const isEnabled = isDraftModeEnabled();
  const activeClient = isEnabled ? previewClient : client;

  try {
    return await activeClient.fetch<T>(query, params, {
      next: {
        revalidate: 60,
        tags: ['sanity', ...tags],
      },
      perspective: isEnabled ? 'previewDrafts' : 'published',
      useCdn: !isEnabled,
      token: isEnabled ? token : undefined,
    });
  } catch {
    return null;
  }
}
