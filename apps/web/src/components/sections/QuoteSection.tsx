import {Container} from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import ResponsiveSanityImage from '@/components/sections/ResponsiveSanityImage';
import {getSectionCardClass, getSectionSpacing, getSectionSubtleTextClass, getSectionTheme} from '@/components/sections/sectionStyles';
import {cn} from '@/lib/utils';
import type {QuoteSection as QuoteSectionData} from '@/types';

type Props = {
  section: QuoteSectionData;
};

export default function QuoteSection({section}: Props) {
  if (!section.quote) {
    return null;
  }

  return (
    <section className={cn(getSectionTheme(section.theme), getSectionSpacing(section.spacing))}>
      <Container>
        <ScrollReveal className="mx-auto max-w-5xl">
          <div className={cn('rounded-[2rem] border px-6 py-8 md:px-10 md:py-12 lg:px-12 lg:py-14', getSectionCardClass(section.theme))}>
            <div className={cn('grid gap-6 md:gap-8', section.image ? 'lg:grid-cols-[auto_minmax(0,1fr)]' : '')}>
              {section.image ? (
                <ResponsiveSanityImage image={section.image} width={320} height={320} sizes="120px" className="w-20 rounded-full md:w-24 lg:w-[120px]" imageClassName="aspect-square" />
              ) : null}
              <div className="space-y-5">
                <blockquote className="font-serif text-[clamp(2rem,5vw,3.5rem)] italic leading-[1.12] text-balance">
                  "{section.quote}"
                </blockquote>
                {(section.attribution || section.role || section.company) ? (
                  <div className={cn('flex flex-wrap gap-x-2 gap-y-1 text-sm font-bold uppercase tracking-[0.16em]', getSectionSubtleTextClass(section.theme))}>
                    {section.attribution ? <span>{section.attribution}</span> : null}
                    {section.role ? <span>{section.attribution ? '/ ' : ''}{section.role}</span> : null}
                    {section.company ? <span>{section.attribution || section.role ? '/ ' : ''}{section.company}</span> : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
