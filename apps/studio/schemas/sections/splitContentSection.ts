import {defineArrayMember, defineField, defineType} from 'sanity';
import type {BlockContentValue} from '../objects/blockContent';
import type {SectionImageItem, SectionSpacing, SectionTheme} from './shared';

export interface SplitContentSection {
  _key?: string;
  _type: 'splitContentSection';
  eyebrow?: string;
  title?: string;
  body?: BlockContentValue;
  media?: SectionImageItem[];
  mediaPosition?: 'left' | 'right';
  theme?: SectionTheme;
  spacing?: SectionSpacing;
}

export const splitContentSection = defineType({
  name: 'splitContentSection',
  title: 'Split Content Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.max(140)}),
    defineField({name: 'body', title: 'Body', type: 'blockContent'}),
    defineField({
      name: 'media',
      title: 'Media',
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
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'mediaPosition',
      title: 'Media position',
      type: 'string',
      initialValue: 'right',
      options: {list: [{title: 'Left', value: 'left'}, {title: 'Right', value: 'right'}], layout: 'radio'},
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
  validation: (rule) =>
    rule.custom((value) => {
      if (!value) return true;
      const body = Array.isArray(value.body) ? value.body : [];
      const media = Array.isArray(value.media) ? value.media : [];

      if (!body.length && !media.length) {
        return 'Add body content or at least one media item.';
      }
      return true;
    }),
  preview: {
    select: {title: 'title', subtitle: 'eyebrow'},
    prepare({title, subtitle}) {
      return {title: title || 'Split Content Section', subtitle};
    },
  },
});

export default splitContentSection;
