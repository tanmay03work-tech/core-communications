import {Suspense} from 'react';
import CTASection from '@/components/sections/CTASection';
import GallerySection from '@/components/sections/GallerySection';
import HeroSection from '@/components/sections/HeroSection';
import LogoCloudSection from '@/components/sections/LogoCloudSection';
import MediaCoverageSection from '@/components/sections/MediaCoverageSection';
import QuoteSection from '@/components/sections/QuoteSection';
import SplitContentSection from '@/components/sections/SplitContentSection';
import StatsSection from '@/components/sections/StatsSection';
import TextSection from '@/components/sections/TextSection';
import type {ModularSection} from '@/types';

type SectionRendererProps = {
  sections?: ModularSection[] | null;
};

function renderSection(section: ModularSection, key: string) {
  switch (section._type) {
    case 'heroSection':
      return <HeroSection key={key} section={section} />;
    case 'splitContentSection':
      return <SplitContentSection key={key} section={section} />;
    case 'statsSection':
      return <StatsSection key={key} section={section} />;
    case 'gallerySection':
      return <GallerySection key={key} section={section} />;
    case 'mediaCoverageSection':
      return <MediaCoverageSection key={key} section={section} />;
    case 'quoteSection':
      return <QuoteSection key={key} section={section} />;
    case 'ctaSection':
      return <CTASection key={key} section={section} />;
    case 'logoCloudSection':
      return <LogoCloudSection key={key} section={section} />;
    case 'textSection':
      return <TextSection key={key} section={section} />;
    default:
      return null;
  }
}

export default function SectionRenderer({sections}: SectionRendererProps) {
  if (!sections?.length) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => {
        if (!section?._type) {
          return null;
        }

        const key = section._key ?? `${section._type}-${index}`;

        return (
          <Suspense key={key} fallback={null}>
            {renderSection(section, key)}
          </Suspense>
        );
      })}
    </>
  );
}
