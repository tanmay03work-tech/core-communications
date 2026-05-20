import Image from 'next/image';
import {getSanityImageUrl} from '@/lib/sanity/image';
import {cn} from '@/lib/utils';
import type {SanityImage} from '@/types';

type ResponsiveSanityImageProps = {
  image?: SanityImage;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
};

export default function ResponsiveSanityImage({
  image,
  width = 1600,
  height = 1000,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  imageClassName,
  priority = false,
  loading,
}: ResponsiveSanityImageProps) {
  const intrinsicWidth = image?.asset?.metadata?.dimensions?.width;
  const intrinsicHeight = image?.asset?.metadata?.dimensions?.height;
  const resolvedWidth = intrinsicWidth ?? width;
  const resolvedHeight = intrinsicHeight ?? height;
  const requestWidth = intrinsicWidth ? Math.min(width, intrinsicWidth) : width;
  const requestHeight = intrinsicHeight ? Math.min(height, intrinsicHeight) : height;
  const src = getSanityImageUrl(image, {width: requestWidth, height: requestHeight, fit: 'max', quality: 85});

  if (!src) {
    return null;
  }

  return (
    <div className={cn('relative overflow-hidden rounded-[2rem] bg-white/5', className)}>
      <Image
        src={src}
        alt={image?.alt || ''}
        width={resolvedWidth}
        height={resolvedHeight}
        sizes={sizes}
        priority={priority}
        loading={loading ?? (priority ? 'eager' : 'lazy')}
        className={cn('h-full w-full object-cover', imageClassName)}
      />
    </div>
  );
}
