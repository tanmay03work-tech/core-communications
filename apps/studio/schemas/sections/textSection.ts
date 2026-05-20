import {defineField, defineType} from 'sanity';
import type {BlockContentValue} from '../objects/blockContent';
import type {SectionSpacing, SectionTheme} from './shared';

export interface TextSection {
  _key?: string;
  _type: 'textSection';
  eyebrow?: string;
  title?: string;
  body: BlockContentValue;
  maxWidth?: 'narrow' | 'medium' | 'wide';
  theme?: SectionTheme;
  spacing?: SectionSpacing;
}

export const textSection = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.max(140)}),
    defineField({name: 'body', title: 'Body', type: 'blockContent', validation: (rule) => rule.required()}),
    defineField({
      name: 'maxWidth',
      title: 'Max width',
      type: 'string',
      initialValue: 'medium',
      options: {list: [{title: 'Narrow', value: 'narrow'}, {title: 'Medium', value: 'medium'}, {title: 'Wide', value: 'wide'}]},
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
    select: {title: 'title', subtitle: 'eyebrow'},
    prepare({title, subtitle}) {
      return {title: title || 'Text Section', subtitle};
    },
  },
});

export default textSection;
