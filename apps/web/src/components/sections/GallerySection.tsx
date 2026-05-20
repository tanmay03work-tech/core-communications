import {Container} from '@/components/layout/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import ResponsiveSanityImage from '@/components/sections/ResponsiveSanityImage';
import {getEyebrowClass, getSectionSpacing, getSectionSubtleTextClass, getSectionTheme} from '@/components/sections/sectionStyles';
import {getSanityImageUrl} from '@/lib/sanity/image';
import {cn} from '@/lib/utils';
import type {GallerySection as GallerySectionData} from '@/types';

type Props = {
  section: GallerySectionData;
};

export default function GallerySection({section}: Props) {
  const images = section.images?.filter((item) => item.image?.asset?._ref || item.image?.asset?.url) ?? [];

  if (!images.length) return null;

  const layout = section.layout ?? 'grid';
  const count = images.length;
  const standardGridClass =
    count === 1 ? 'max-w-4xl' : count === 2 ? 'md:grid-cols-2' : count === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-2 xl:grid-cols-3';

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

          {layout === 'masonry' ? (
            <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
              {images.map((item) => (
                <figure key={item._key ?? item.caption} className="group mb-5 break-inside-avoid space-y-3">
                  <a
                    href={getSanityImageUrl(item.image, {width: 2200, fit: 'max'})}
                    data-lightbox-src={getSanityImageUrl(item.image, {width: 2200, fit: 'max'})}
                    className="block overflow-hidden rounded-[1.75rem]"
                  >
                    <ResponsiveSanityImage image={item.image} className="rounded-[1.75rem]" imageClassName="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  </a>
                  {item.caption || item.image.caption ? <figcaption className={cn('text-sm leading-6', getSectionSubtleTextClass(section.theme))}>{item.caption || item.image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : (
            <div className={cn('grid grid-cols-1 gap-5 lg:gap-6', layout === 'feature' ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]' : standardGridClass)}>
              {images.map((item, index) => (
                <figure key={item._key ?? item.caption} className={cn('group space-y-3', layout === 'feature' && index === 0 ? 'lg:row-span-2' : '', layout !== 'feature' && count === 3 && index === 0 ? 'md:col-span-2 xl:col-span-1' : '')}>
                  <a
                    href={getSanityImageUrl(item.image, {width: 2200, fit: 'max'})}
                    data-lightbox-src={getSanityImageUrl(item.image, {width: 2200, fit: 'max'})}
                    className="block overflow-hidden rounded-[1.75rem]"
                  >
                    <ResponsiveSanityImage
                      image={item.image}
                      width={1600}
                      height={layout === 'feature' && index === 0 ? 1800 : 1100}
                      sizes={layout === 'feature' && index === 0 ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'}
                      className="rounded-[1.75rem]"
                      imageClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </a>
                  {item.caption || item.image.caption ? <figcaption className={cn('text-sm leading-6', getSectionSubtleTextClass(section.theme))}>{item.caption || item.image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          )}
        </ScrollReveal>
      </Container>
    </section>
  );
}
