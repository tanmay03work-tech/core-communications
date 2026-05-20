import {defineArrayMember, defineField, defineType} from 'sanity';
import type {Stat} from '../objects/stat';
import type {SectionSpacing, SectionTheme} from './shared';

export interface StatsSection {
  _key?: string;
  _type: 'statsSection';
  eyebrow?: string;
  title?: string;
  intro?: string;
  stats: Stat[];
  theme?: SectionTheme;
  spacing?: SectionSpacing;
}

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.max(60)}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.max(140)}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3, validation: (rule) => rule.max(280)}),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({type: 'stat'})],
      validation: (rule) => rule.required().min(1).max(8),
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
    select: {title: 'title', count: 'stats'},
    prepare({title, count}) {
      return {title: title || 'Stats Section', subtitle: `${count?.length ?? 0} stats`};
    },
  },
});

export default statsSection;
