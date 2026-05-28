import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CaseStudiesGrid from '@/components/sections/CaseStudiesGrid';
import ClientsTicker from '@/components/sections/ClientsTicker';
import CTASection from '@/components/sections/CTASection';
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
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesGrid />
      </div>
      <CaseStudiesGrid />
      <div id="team">
        <TeamSection />
      </div>
      <CTASection />
    </>
  );
}
