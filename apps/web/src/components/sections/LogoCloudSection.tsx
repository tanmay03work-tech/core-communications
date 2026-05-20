import Link from 'next/link';
import {Container} from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import ResponsiveSanityImage from '@/components/sections/ResponsiveSanityImage';
import {getEyebrowClass, getSectionCardClass, getSectionSpacing, getSectionSubtleTextClass, getSectionTheme} from '@/components/sections/sectionStyles';
import {cn} from '@/lib/utils';
import type {LogoCloudSection as LogoCloudSectionData} from '@/types';

type Props = {
  section: LogoCloudSectionData;
};

export default function LogoCloudSection({section}: Props) {
  const items = section.items?.filter((item) => item.logo?.asset?._ref || item.logo?.asset?.url || item.name) ?? [];
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
          <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5', count >= 8 ? 'xl:grid-cols-5' : count >= 6 ? 'xl:grid-cols-4' : 'xl:grid-cols-3')}>
            {items.map((item) => {
              const className = cn('flex min-h-[5.75rem] items-center justify-center rounded-[1.5rem] border px-5 py-5 text-center transition-colors', getSectionCardClass(section.theme));
              const content = item.logo ? (
                <ResponsiveSanityImage
                  image={item.logo}
                  width={260}
                  height={120}
                  sizes="180px"
                  className="w-full bg-transparent shadow-none"
                  imageClassName="max-h-12 object-contain"
                />
              ) : (
                <span className={cn('text-sm font-bold uppercase tracking-[0.18em]', getSectionSubtleTextClass(section.theme))}>{item.name}</span>
              );

              return item.url ? (
                <Link key={item._key ?? item.name} href={item.url} target="_blank" rel="noreferrer" className={className}>
                  {content}
                </Link>
              ) : (
                <div key={item._key ?? item.name} className={className}>
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
