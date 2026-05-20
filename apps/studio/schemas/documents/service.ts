import {defineArrayMember, defineField, defineType} from 'sanity';
import type {ModularSection} from '../sections';
import type {SanitySlugValue} from '../sections/shared';

export interface Service {
  _id?: string;
  _type: 'service';
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  title: string;
  slug?: SanitySlugValue;
  number: string;
  icon?: string;
  shortDesc: string;
  body?: unknown[];
  sections?: ModularSection[];
  order?: number;
}

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'Display number, for example 01.',
      validation: (rule) => rule.required().regex(/^\d{2}$/, {name: 'two digits'}),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or short symbol used for service cards.',
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(12).max(220),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({type: 'heroSection'}),
        defineArrayMember({type: 'textSection'}),
        defineArrayMember({type: 'statsSection'}),
        defineArrayMember({type: 'gallerySection'}),
        defineArrayMember({type: 'mediaCoverageSection'}),
        defineArrayMember({type: 'quoteSection'}),
        defineArrayMember({type: 'ctaSection'}),
        defineArrayMember({type: 'splitContentSection'}),
        defineArrayMember({type: 'logoCloudSection'}),
      ],
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'number',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `Service ${subtitle}` : undefined,
      };
    },
  },
});

export default service;
