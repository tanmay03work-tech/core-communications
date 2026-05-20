import {defineArrayMember, defineField, defineType} from 'sanity';
import type {SectionImageItem, SectionSpacing, SectionTheme} from './shared';

export interface GallerySection {
  _key?: string;
  _type: 'gallerySection';
  eyebrow?: string;
  title?: string;
  images: SectionImageItem[];
  layout?: 'grid' | 'masonry' | 'feature';
  theme?: SectionTheme;
  spacing?: SectionSpacing;
}

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.max(140)}),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sectionImage',
          title: 'Section Image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.max(160)}),
                defineField({name: 'caption', title: 'Caption', type: 'string', validation: (rule) => rule.max(180)}),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'caption', title: 'Caption override', type: 'string', validation: (rule) => rule.max(180)}),
          ],
          preview: {select: {title: 'caption', subtitle: 'image.alt', media: 'image'}},
        }),
      ],
      validation: (rule) => rule.required().min(1).max(12),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'grid',
      options: {list: [{title: 'Grid', value: 'grid'}, {title: 'Masonry', value: 'masonry'}, {title: 'Feature', value: 'feature'}]},
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'light',
      options: {list: [{title: 'Light', value: 'light'}, {title: 'Dark', value: 'dark'}, {title: 'Accent', value: 'accent'}]},
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      initialValue: 'regular',
      options: {list: [{title: 'Compact', value: 'compact'}, {title: 'Regular', value: 'regular'}, {title: 'Spacious', value: 'spacious'}]},
    }),
  ],
  preview: {
    select: {title: 'title', images: 'images'},
    prepare({title, images}) {
      return {title: title || 'Gallery Section', subtitle: `${images?.length ?? 0} images`};
    },
  },
});

export default gallerySection;
