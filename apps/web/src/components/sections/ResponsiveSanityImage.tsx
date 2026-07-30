'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { getSanityImageUrl, getRawSanityImageUrl } from '@/lib/sanity/image';
import { cn } from '@/lib/utils';
import type { SanityImage } from '@/types';

type ResponsiveSanityImageProps = {
  image?: SanityImage;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  showInfographicExpand?: boolean;
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
  showInfographicExpand = true,
}: ResponsiveSanityImageProps) {
  const [useFallbackUrl, setUseFallbackUrl] = useState(false);
  const [hasFailedAll, setHasFailedAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const intrinsicWidth = image?.asset?.metadata?.dimensions?.width;
  const intrinsicHeight = image?.asset?.metadata?.dimensions?.height;

  const resolvedWidth = intrinsicWidth ?? width;
  const resolvedHeight = intrinsicHeight ?? height;

  const safeReqWidth = intrinsicWidth ? Math.min(width, intrinsicWidth, 2560) : Math.min(width, 2560);
  const safeReqHeight = intrinsicHeight ? Math.min(height, intrinsicHeight, 4096) : Math.min(height, 4096);

  const primarySrc = getSanityImageUrl(image, {
    width: safeReqWidth,
    height: safeReqHeight,
    fit: 'max',
    quality: 85,
  });

  const rawFallbackSrc = getRawSanityImageUrl(image);
  const activeSrc = useFallbackUrl ? rawFallbackSrc : primarySrc;

  const isTallInfographic =
    (intrinsicHeight && intrinsicWidth && intrinsicHeight / intrinsicWidth > 1.3) ||
    (resolvedHeight && resolvedWidth && resolvedHeight / resolvedWidth > 1.3);

  const handleError = useCallback(() => {
    if (!useFallbackUrl && rawFallbackSrc && rawFallbackSrc !== primarySrc) {
      console.warn('ResponsiveSanityImage CDN failed, retrying with raw URL fallback...');
      setUseFallbackUrl(true);
    } else {
      console.error('ResponsiveSanityImage failed all loading attempts:', image);
      setHasFailedAll(true);
    }
  }, [useFallbackUrl, rawFallbackSrc, primarySrc, image]);

  if (!primarySrc && !rawFallbackSrc) {
    return null;
  }

  const altText = image?.alt || 'Infographic / Article Image';

  return (
    <>
      <div
        className={cn(
          'group relative overflow-hidden rounded-[2rem] bg-navy/5 transition-all duration-300',
          className
        )}
      >
        {!hasFailedAll ? (
          <>
            {/* Loading Skeleton */}
            {!isLoaded && (
              <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-navy/5 via-navy/10 to-navy/5" />
            )}

            <Image
              src={activeSrc}
              alt={altText}
              width={resolvedWidth}
              height={resolvedHeight}
              sizes={sizes}
              priority={priority}
              loading={loading ?? (priority ? 'eager' : 'lazy')}
              onLoad={() => setIsLoaded(true)}
              onError={handleError}
              className={cn(
                'h-full w-full object-cover transition-opacity duration-300',
                isLoaded ? 'opacity-100' : 'opacity-0',
                imageClassName
              )}
            />

            {/* Infographic Full Resolution Expand Overlay Button */}
            {showInfographicExpand && (isTallInfographic || (intrinsicWidth && intrinsicWidth > 1600)) && (
              <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-90 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-navy/85 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition-transform hover:scale-105 hover:bg-navy"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span>Expand Infographic</span>
                </button>
              </div>
            )}
          </>
        ) : (
          /* Graceful Fallback Card when Image fails entirely */
          <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-3 border border-navy/10 bg-surface-light p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="max-w-md">
              <p className="text-sm font-semibold text-navy">{altText || 'Infographic Content'}</p>
              <p className="mt-1 text-xs text-navy/60">Image content preview temporarily updating.</p>
            </div>
            {rawFallbackSrc && (
              <a
                href={rawFallbackSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs font-bold uppercase tracking-wider text-accent underline hover:text-navy"
              >
                Download Original Asset File →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal for High-Res Infographics */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative flex max-h-[92vh] max-w-[95vw] flex-col overflow-hidden rounded-2xl bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3">
              <div className="text-sm font-bold text-navy">{altText || 'High-Resolution Infographic'}</div>
              <div className="flex items-center gap-3">
                {rawFallbackSrc && (
                  <a
                    href={rawFallbackSrc}
                    target="_blank"
                    download
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Full Resolution
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg p-1.5 text-navy/60 hover:bg-navy/5 hover:text-navy"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Infographic Image View */}
            <div className="max-h-[82vh] overflow-auto p-2">
              <img
                src={rawFallbackSrc || primarySrc}
                alt={altText}
                className="h-auto w-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
