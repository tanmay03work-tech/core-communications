import {defineArrayMember, defineField, defineType} from 'sanity';
import type {MediaCoverageItem, SectionSpacing, SectionTheme} from './shared';

export interface MediaCoverageSection {
  _key?: string;
  _type: 'mediaCoverageSection';
  eyebrow?: string;
  title?: string;
  items: MediaCoverageItem[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
}

export const mediaCoverageSection = defineType({
  name: 'mediaCoverageSection',
  title: 'Media Coverage Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.max(140)}),
    defineField({
      name: 'items',
      title: 'Coverage Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'mediaCoverageItem',
          title: 'Media Coverage Item',
          type: 'object',
          fields: [
            defineField({name: 'publication', title: 'Publication', type: 'string', validation: (rule) => rule.required().max(80)}),
            defineField({name: 'headline', title: 'Headline', type: 'string', validation: (rule) => rule.required().max(160)}),
            defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (rule) => rule.max(240)}),
            defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
            defineField({name: 'publishedAt', title: 'Published at', type: 'datetime'}),
          ],
          preview: {select: {title: 'headline', subtitle: 'publication'}},
        }),
      ],
      validation: (rule) => rule.required().min(1).max(12),
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
    select: {title: 'title', items: 'items'},
    prepare({title, items}) {
      return {title: title || 'Media Coverage Section', subtitle: `${items?.length ?? 0} placements`};
    },
  },
});

export default mediaCoverageSection;
