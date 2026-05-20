import ClientLogos from '@/components/sections/ClientLogos';
import CTASection from '@/components/sections/CTASection';
import TeamSection from '@/components/sections/TeamSection';
import {Container} from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import {buildMetadata} from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Team',
  description: 'Meet the Core Communications team across Sydney and Mumbai.',
  pathname: '/team',
});

export default function TeamPage() {
  return (
    <>
      <section className="section-wrap bg-ink py-16 text-white">
        <Container>
          <ScrollReveal>
            <SectionLabel>The Team</SectionLabel>
            <h1 className="section-heading max-w-4xl text-white">
              Senior operators with deep media and market context.
            </h1>
          </ScrollReveal>
        </Container>
      </section>
      <TeamSection />
      <section className="bg-deep py-12 text-white">
        <Container>
          <ClientLogos />
        </Container>
      </section>
      <CTASection />
    </>
  );
}
