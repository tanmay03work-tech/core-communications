import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CaseStudiesGrid from '@/components/sections/CaseStudiesGrid';
import ClientLogos from '@/components/sections/ClientLogos';
import ClientsTicker from '@/components/sections/ClientsTicker';
import CTASection from '@/components/sections/CTASection';
import NumbersStrip from '@/components/sections/NumbersStrip';
import SectorsCloud from '@/components/sections/SectorsCloud';
import ServicesGrid from '@/components/sections/ServicesGrid';
import TeamSection from '@/components/sections/TeamSection';
import type {SiteSettings} from '@/types';

type HomePageProps = {
  siteSettings?: SiteSettings | null;
};

export default function HomePage({siteSettings}: HomePageProps) {
  return (
    <>
      <HeroSection siteSettings={siteSettings} />
      <ClientsTicker />
      <AboutSection />
      <NumbersStrip />
      <ServicesGrid />
      <CaseStudiesGrid />
      <SectorsCloud />
      <TeamSection />
      <ClientLogos />
      <CTASection />
    </>
  );
}
