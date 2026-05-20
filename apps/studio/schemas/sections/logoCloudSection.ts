import {defineArrayMember, defineField, defineType} from 'sanity';
import type {LogoCloudItem, SectionSpacing, SectionTheme} from './shared';

export interface LogoCloudSection {
  _key?: string;
  _type: 'logoCloudSection';
  eyebrow?: string;
  title?: string;
  items: LogoCloudItem[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
}

export const logoCloudSection = defineType({
  name: 'logoCloudSection',
  title: 'Logo Cloud Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.max(140)}),
    defineField({
      name: 'items',
      title: 'Logos',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'logoCloudItem',
          title: 'Logo Cloud Item',
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required().max(80)}),
            defineField({
              name: 'logo',
              title: 'Logo image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.max(160)})],
            }),
            defineField({name: 'url', title: 'URL', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
          ],
          preview: {select: {title: 'name', subtitle: 'url', media: 'logo'}},
        }),
      ],
      validation: (rule) => rule.required().min(1).max(16),
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
      return {title: title || 'Logo Cloud Section', subtitle: `${items?.length ?? 0} logos`};
    },
  },
});

export default logoCloudSection;
