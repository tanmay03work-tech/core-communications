import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {Container} from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import PortableTextContent from '@/components/sections/PortableTextContent';
import ResponsiveSanityImage from '@/components/sections/ResponsiveSanityImage';
import {getEyebrowClass, getSectionSpacing, getSectionSubtleTextClass, getSectionTheme, isInverseTheme} from '@/components/sections/sectionStyles';
import {cn} from '@/lib/utils';
import type {SplitContentSection as SplitContentSectionData} from '@/types';

type Props = {
  section: SplitContentSectionData;
};

export default function SplitContentSection({section}: Props) {
  const media = section.media?.filter((item) => item.image?.asset?._ref || item.image?.asset?.url) ?? [];
  const cta = section.actions?.[0] ?? section.cta;
  const invert = isInverseTheme(section.theme);
  const imageOnLeft = section.imageLeft ?? section.mediaPosition === 'left';
  const hasContent = Boolean(section.eyebrow || section.title || section.body?.length || media.length || cta);

  if (!hasContent) {
    return null;
  }

  return (
    <section className={cn(getSectionTheme(section.theme), getSectionSpacing(section.spacing))}>
      <Container>
        <div className="grid items-start gap-x-10 gap-y-8 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-20">
          <ScrollReveal className={cn('order-1 space-y-5', imageOnLeft ? 'lg:order-2' : '')}>
            {section.eyebrow ? <div className={cn(getEyebrowClass(section.theme), 'mb-1')}>{section.eyebrow}</div> : null}
            {section.title ? <h2 className="font-display text-section text-balance">{section.title}</h2> : null}
            <PortableTextContent value={section.body} invert={invert} />
            {cta ? (
              <div className="pt-2">
                <Link href={cta.href} className={cta.variant === 'secondary' ? (section.theme === 'light' ? 'btn-ghost' : 'btn-outline-white') : 'btn-primary'}>
                  <span>{cta.label}</span>
                  {cta.variant !== 'secondary' ? <ArrowRight size={14} /> : null}
                </Link>
              </div>
            ) : null}
          </ScrollReveal>
          {media.length ? (
            <ScrollReveal delay={0.15} className={cn('order-2 self-center', imageOnLeft ? 'lg:order-1' : '')}>
              <div className={cn('grid gap-4 md:gap-5', media.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1')}>
                {media.map((item, index) => (
                  <figure key={item._key ?? item.caption} className={cn('space-y-3', media.length === 3 && index === 0 ? 'sm:col-span-2' : '')}>
                    <ResponsiveSanityImage
                      image={item.image}
                      width={1400}
                      height={1000}
                      sizes={media.length > 1 ? '(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 42vw, 100vw'}
                      className="rounded-[1.75rem]"
                      imageClassName={media.length === 1 ? 'aspect-[4/3]' : 'aspect-[5/4]'}
                    />
                    {item.caption || item.image.caption ? <figcaption className={cn('text-sm leading-6', getSectionSubtleTextClass(section.theme))}>{item.caption || item.image.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            </ScrollReveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
