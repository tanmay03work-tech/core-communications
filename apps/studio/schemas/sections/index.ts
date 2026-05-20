import CTASection from './CTASection';
import gallerySection from './gallerySection';
import heroSection from './heroSection';
import logoCloudSection from './logoCloudSection';
import mediaCoverageSection from './mediaCoverageSection';
import quoteSection from './quoteSection';
import splitContentSection from './splitContentSection';
import statsSection from './statsSection';
import textSection from './textSection';
import type {CTASection as CTASectionValue} from './CTASection';
import type {GallerySection} from './gallerySection';
import type {HeroSection} from './heroSection';
import type {LogoCloudSection} from './logoCloudSection';
import type {MediaCoverageSection} from './mediaCoverageSection';
import type {QuoteSection} from './quoteSection';
import type {SplitContentSection} from './splitContentSection';
import type {StatsSection} from './statsSection';
import type {TextSection} from './textSection';

export type ModularSection =
  | CTASectionValue
  | GallerySection
  | HeroSection
  | LogoCloudSection
  | MediaCoverageSection
  | QuoteSection
  | SplitContentSection
  | StatsSection
  | TextSection;

export const sectionSchemaTypes = [
  heroSection,
  textSection,
  statsSection,
  gallerySection,
  mediaCoverageSection,
  quoteSection,
  CTASection,
  splitContentSection,
  logoCloudSection,
];
