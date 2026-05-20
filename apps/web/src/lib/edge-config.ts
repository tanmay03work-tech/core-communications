import {get} from '@vercel/edge-config';

export type FeatureFlags = {
  enableVideoModal: boolean;
  enableParticleCanvas: boolean;
};

const defaultFlags: FeatureFlags = {
  enableVideoModal: true,
  enableParticleCanvas: true,
};

export async function getFeatureFlags(): Promise<FeatureFlags> {
  if (!process.env.EDGE_CONFIG) {
    return defaultFlags;
  }

  const flags = await get<Partial<FeatureFlags>>('featureFlags');

  return {
    ...defaultFlags,
    ...flags,
  };
}
