import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {Container} from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import ResponsiveSanityImage from '@/components/sections/ResponsiveSanityImage';
import {getEyebrowClass, getSectionMutedTextClass, getSectionSpacing, getSectionTheme} from '@/components/sections/sectionStyles';
import {cn} from '@/lib/utils';
import type {HeroSection as HeroSectionData} from '@/types';

type Props = {
  section: HeroSectionData;
};

export default function HeroSection({section}: Props) {
  const hasImage = Boolean(section.image?.asset?._ref || section.image?.asset?.url);
  const alignCenter = section.align === 'center';
  const hasContent = Boolean(section.title || section.subtitle || section.eyebrow || section.actions?.length);

  const secondaryClass = section.theme === 'light' ? 'btn-ghost' : 'btn-outline-white';

  if (!hasContent) {
    return null;
  }

  return (
    <section className={cn('relative overflow-hidden border-b border-white/10', getSectionTheme(section.theme), getSectionSpacing(section.spacing))}>
      <div className="absolute inset-0 bg-grid-pattern-v bg-[length:14vw_100%] opacity-60" aria-hidden="true" />
      <Container className="relative z-10">
        <div
          className={cn(
            'grid items-center gap-x-10 gap-y-12 lg:gap-x-16',
            hasImage ? 'lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]' : 'max-w-5xl',
            alignCenter && !hasImage ? 'mx-auto text-center' : '',
          )}
        >
          <ScrollReveal className={cn('max-w-3xl space-y-5 lg:space-y-6', alignCenter && !hasImage ? 'mx-auto max-w-4xl' : '')}>
            {section.eyebrow ? <div className={cn(getEyebrowClass(section.theme), 'mb-2')}>{section.eyebrow}</div> : null}
            <h2 className="font-display text-hero text-balance">{section.title}</h2>
            {section.subtitle ? <p className={cn('max-w-[60ch] text-[clamp(1rem,1.8vw,1.125rem)] leading-[1.8] font-light', getSectionMutedTextClass(section.theme))}>{section.subtitle}</p> : null}
            {section.actions?.length ? (
              <div className={cn('flex flex-wrap gap-4 pt-2', alignCenter && !hasImage ? 'justify-center' : '')}>
                {section.actions.map((action) => (
                  <Link
                    key={action._key ?? `${action.label}-${action.href}`}
                    href={action.href}
                    className={action.variant === 'secondary' ? secondaryClass : 'btn-primary'}
                  >
                    <span>{action.label}</span>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            ) : null}
          </ScrollReveal>
          {hasImage ? (
            <ScrollReveal delay={0.15}>
              <ResponsiveSanityImage
                image={section.image}
                width={1400}
                height={1100}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="rounded-[2rem]"
                imageClassName="aspect-[4/3] min-h-0"
                priority
              />
            </ScrollReveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
