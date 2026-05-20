import {defineField, defineType} from 'sanity';
import type {SanityImageValue, SectionSpacing, SectionTheme} from './shared';

export interface QuoteSection {
  _key?: string;
  _type: 'quoteSection';
  quote: string;
  attribution?: string;
  role?: string;
  company?: string;
  image?: SanityImageValue;
  theme?: SectionTheme;
  spacing?: SectionSpacing;
}

export const quoteSection = defineType({
  name: 'quoteSection',
  title: 'Quote Section',
  type: 'object',
  fields: [
    defineField({name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (rule) => rule.required().min(12).max(600)}),
    defineField({name: 'attribution', title: 'Attribution', type: 'string', validation: (rule) => rule.max(100)}),
    defineField({name: 'role', title: 'Role', type: 'string', validation: (rule) => rule.max(100)}),
    defineField({name: 'company', title: 'Company', type: 'string', validation: (rule) => rule.max(100)}),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.max(160)})],
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'dark',
      options: {list: [{title: 'Dark', value: 'dark'}, {title: 'Light', value: 'light'}, {title: 'Accent', value: 'accent'}]},
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
    select: {title: 'attribution', subtitle: 'quote', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title: title || 'Quote Section', subtitle, media};
    },
  },
});

export default quoteSection;
