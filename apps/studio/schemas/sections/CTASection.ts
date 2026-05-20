import {defineArrayMember, defineField, defineType} from 'sanity';
import type {SectionCtaLink, SectionSpacing, SectionTheme} from './shared';

export interface CTASection {
  _key?: string;
  _type: 'ctaSection';
  eyebrow?: string;
  title: string;
  body?: string;
  actions: SectionCtaLink[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
}

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().min(6).max(140)}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 3, validation: (rule) => rule.max(260)}),
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
      validation: (rule) => rule.required().min(1).max(2),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'accent',
      options: {list: [{title: 'Accent', value: 'accent'}, {title: 'Dark', value: 'dark'}, {title: 'Light', value: 'light'}]},
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
    select: {title: 'title', subtitle: 'body'},
    prepare({title, subtitle}) {
      return {title: title || 'CTA Section', subtitle};
    },
  },
});

export default ctaSection;
