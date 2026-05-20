import Link from 'next/link';
import {Container} from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import {getEyebrowClass, getSectionCardClass, getSectionMutedTextClass, getSectionSpacing, getSectionSubtleTextClass, getSectionTheme} from '@/components/sections/sectionStyles';
import {cn} from '@/lib/utils';
import type {MediaCoverageSection as MediaCoverageSectionData} from '@/types';

type Props = {
  section: MediaCoverageSectionData;
};

export default function MediaCoverageSection({section}: Props) {
  const items = section.items?.filter((item) => item.publication || item.headline || item.summary) ?? [];
  const count = items.length;

  if (!count) return null;

  return (
    <section className={cn(getSectionTheme(section.theme), getSectionSpacing(section.spacing))}>
      <Container>
        <ScrollReveal className="space-y-8 lg:space-y-10">
          {(section.eyebrow || section.title) ? (
            <div className="max-w-3xl space-y-4">
              {section.eyebrow ? <div className={getEyebrowClass(section.theme)}>{section.eyebrow}</div> : null}
              {section.title ? <h2 className="font-display text-section text-balance">{section.title}</h2> : null}
            </div>
          ) : null}
          <div className={cn('grid grid-cols-1 gap-4 md:gap-5 lg:gap-6', count === 1 ? 'max-w-3xl' : count === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3')}>
            {items.map((item) => {
              const className = cn('rounded-[1.75rem] border p-6 md:p-7 transition-colors', getSectionCardClass(section.theme));
              const publishedDate = item.publishedAt ? new Date(item.publishedAt) : null;
              const isValidDate = publishedDate && !Number.isNaN(publishedDate.getTime());

              const content = (
                <>
                  {item.publication ? <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent">{item.publication}</div> : null}
                  {item.headline ? <h3 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.15] text-balance">{item.headline}</h3> : null}
                  {item.summary ? <p className={cn('mt-4 text-base leading-7', getSectionMutedTextClass(section.theme))}>{item.summary}</p> : null}
                  {isValidDate ? <div className={cn('mt-6 text-xs uppercase tracking-[0.16em]', getSectionSubtleTextClass(section.theme))}>{publishedDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</div> : null}
                </>
              );

              return item.url ? (
                <Link key={item._key ?? `${item.publication}-${item.headline}`} href={item.url} target="_blank" rel="noreferrer" className={className}>
                  {content}
                </Link>
              ) : (
                <div key={item._key ?? `${item.publication}-${item.headline}`} className={className}>
                  {content}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
