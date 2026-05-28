import {Container} from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import PortableTextContent from '@/components/sections/PortableTextContent';
import {getEyebrowClass, getSectionSpacing, getSectionTheme, isInverseTheme} from '@/components/sections/sectionStyles';
import {cn} from '@/lib/utils';
import type {TextSection as TextSectionData} from '@/types';

type Props = {
  section: TextSectionData;
};

const widthClasses = {
  narrow: 'max-w-2xl',
  medium: 'max-w-3xl',
  wide: 'max-w-5xl',
};

export default function TextSection({section}: Props) {
  const hasContent = Boolean(section.eyebrow || section.title || section.body?.length);

  if (!hasContent) {
    return null;
  }

  return (
    <section className={cn(getSectionTheme(section.theme), getSectionSpacing(section.spacing))}>
      <Container>
        <ScrollReveal className={cn(widthClasses[section.maxWidth ?? 'medium'], 'space-y-5')}>
          {section.eyebrow ? <div className={cn(getEyebrowClass(section.theme), 'mb-5')}>{section.eyebrow}</div> : null}
          {section.title ? <h2 className="font-heading text-section text-balance">{section.title}</h2> : null}
          <PortableTextContent value={section.body} invert={isInverseTheme(section.theme)} />
        </ScrollReveal>
      </Container>
    </section>
  );
}
