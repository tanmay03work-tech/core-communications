import {Container} from '@/components/layout/Container';
import CounterAnimation from '@/components/animations/CounterAnimation';
import ScrollReveal from '@/components/motion/ScrollReveal';
import {getEyebrowClass, getSectionCardClass, getSectionMutedTextClass, getSectionSpacing, getSectionSubtleTextClass, getSectionTheme} from '@/components/sections/sectionStyles';
import {cn} from '@/lib/utils';
import type {StatsSection as StatsSectionData} from '@/types';

type Props = {
  section: StatsSectionData;
};

export default function StatsSection({section}: Props) {
  const count = section.stats?.length ?? 0;
  const gridClass =
    count === 1
      ? 'max-w-md'
      : count === 2
        ? 'md:grid-cols-2'
        : count === 3
          ? 'md:grid-cols-3'
          : count === 4
            ? 'md:grid-cols-2 xl:grid-cols-4'
            : 'md:grid-cols-2 xl:grid-cols-3';

  if (!count) return null;

  return (
    <section className={cn(getSectionTheme(section.theme), getSectionSpacing(section.spacing))}>
      <Container>
        <ScrollReveal className="space-y-8 lg:space-y-10">
          {(section.eyebrow || section.title || section.intro) ? (
            <div className="max-w-3xl space-y-4">
              {section.eyebrow ? <div className={getEyebrowClass(section.theme)}>{section.eyebrow}</div> : null}
              {section.title ? <h2 className="font-heading text-section font-semibold tracking-tight text-balance">{section.title}</h2> : null}
              {section.intro ? <p className={cn('max-w-[60ch] font-sans text-[clamp(1rem,1.8vw,1.125rem)] font-normal leading-relaxed', getSectionMutedTextClass(section.theme))}>{section.intro}</p> : null}
            </div>
          ) : null}
          <div className={cn('grid grid-cols-1 gap-4 md:gap-5 lg:gap-6', gridClass)}>
            {section.stats.map((stat) => (
              <div key={stat._key ?? `${stat.label}-${stat.value}`} className={cn('rounded-[1.75rem] border p-6 md:p-7 lg:p-8', getSectionCardClass(section.theme))}>
                <div className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none tracking-tight text-accent">
                  <CounterAnimation value={stat.value} />
                </div>
                <div className={cn('mt-3 text-sm font-bold uppercase tracking-[0.16em]', getSectionSubtleTextClass(section.theme))}>{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
