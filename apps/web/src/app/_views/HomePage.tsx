import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CaseStudiesGrid from '@/components/sections/CaseStudiesGrid';
import ClientsTicker from '@/components/sections/ClientsTicker';
import CTASection from '@/components/sections/CTASection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import SectorsFocusSection from '@/components/sections/SectorsFocusSection';
import TeamSection from '@/components/sections/TeamSection';
import type {ClientLogo, SiteSettings} from '@/types';

type HomePageProps = {
  siteSettings?: SiteSettings | null;
  clientLogos?: ClientLogo[] | null;
};

export default function HomePage({siteSettings, clientLogos}: HomePageProps) {
  const tickerClients =
    clientLogos == null || clientLogos.length === 0
      ? undefined
      : clientLogos
          .filter((client) => client.featured !== false)
          .map((client) => ({
            name: client.name,
            logo: client.logo?.asset?.url,
          }))
          .filter((client) => client.name);

  return (
    <>
      <HeroSection siteSettings={siteSettings} />
      <ClientsTicker clients={tickerClients} />
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesGrid />
      </div>
      <SectorsFocusSection />
      <CaseStudiesGrid />
      <div id="team">
        <TeamSection />
      </div>
      <CTASection />
    </>
  );
}
