import {defineArrayMember, defineField, defineType} from 'sanity';
import type {SanityImageValue, SectionCtaLink, SectionSpacing, SectionTheme} from './shared';

export interface HeroSection {
  _key?: string;
  _type: 'heroSection';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: SanityImageValue;
  actions?: SectionCtaLink[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
  align?: 'left' | 'center';
}

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().min(6).max(140)}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3, validation: (rule) => rule.max(320)}),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.max(160)}),
        defineField({name: 'caption', title: 'Caption', type: 'string', validation: (rule) => rule.max(180)}),
      ],
    }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sectionLink',
          title: 'Section Link',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required().max(40)}),
            defineField({name: 'href', title: 'URL', type: 'string', validation: (rule) => rule.required().max(300)}),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              initialValue: 'primary',
              options: {list: [{title: 'Primary', value: 'primary'}, {title: 'Secondary', value: 'secondary'}], layout: 'radio'},
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'dark',
      options: {list: [{title: 'Dark', value: 'dark'}, {title: 'Light', value: 'light'}, {title: 'Accent', value: 'accent'}], layout: 'radio'},
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      initialValue: 'regular',
      options: {list: [{title: 'Compact', value: 'compact'}, {title: 'Regular', value: 'regular'}, {title: 'Spacious', value: 'spacious'}]},
    }),
    defineField({
      name: 'align',
      title: 'Alignment',
      type: 'string',
      initialValue: 'left',
      options: {list: [{title: 'Left', value: 'left'}, {title: 'Center', value: 'center'}], layout: 'radio'},
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title: title || 'Hero Section', subtitle, media};
    },
  },
});

export default heroSection;
