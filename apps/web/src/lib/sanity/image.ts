import Image, {type ImageProps} from 'next/image';
import {createElement} from 'react';
import {createImageUrlBuilder} from '@sanity/image-url';
import {dataset, projectId} from '@/lib/sanity/env';
import type {SanityImage as SanityImageSource} from '@/types';

const builder = createImageUrlBuilder({
  projectId,
  dataset,
});

type UrlForSource = SanityImageSource | null | undefined;
type ImageSource = UrlForSource | string;

export function urlFor(source: UrlForSource) {
  if (!source) {
    return null;
  }

  if (source.asset?.url) {
    return builder.image(source.asset.url);
  }

  return builder.image(source);
}

type ImageOptions = {
  width?: number;
  height?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'min' | 'scale';
  quality?: number;
};

export function getSanityImageUrl(source?: ImageSource | null, options: ImageOptions = {}) {
  if (!source) {
    return '';
  }

  if (typeof source === 'string') {
    return source;
  }

  const image = urlFor(source);

  if (!image) {
    return '';
  }

  let chain = image.auto('format');

  if (options.width) chain = chain.width(options.width);
  if (options.height) chain = chain.height(options.height);
  if (options.fit) chain = chain.fit(options.fit);
  if (options.quality) chain = chain.quality(options.quality);

  return chain.url();
}

type SanityImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  image?: SanityImageSource | null;
  alt?: string;
  width?: number;
  height?: number;
};

export function SanityImage({
  image,
  alt,
  width = 1600,
  height = 1000,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  ...props
}: SanityImageProps) {
  const intrinsicWidth = image?.asset?.metadata?.dimensions?.width ?? width;
  const intrinsicHeight = image?.asset?.metadata?.dimensions?.height ?? height;
  const src = getSanityImageUrl(image, {
    width: intrinsicWidth,
    height: intrinsicHeight,
    quality: 85,
    fit: 'max',
  });

  if (!src) {
    return null;
  }

  return createElement(Image, {
    src,
    alt: alt ?? image?.alt ?? '',
    width: intrinsicWidth,
    height: intrinsicHeight,
    sizes,
    ...props,
  });
}
