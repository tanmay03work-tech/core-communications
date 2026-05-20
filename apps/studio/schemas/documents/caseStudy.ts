import {defineArrayMember, defineField, defineType} from 'sanity';
import type {ModularSection} from '../sections';
import type {SanityImageValue, SanitySlugValue} from '../sections/shared';
import type {Seo} from '../objects/seo';

export interface CaseStudy {
  _id?: string;
  _type: 'caseStudy';
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  title: string;
  slug?: SanitySlugValue;
  client: string;
  sector: string;
  tag: string;
  description: string;
  stats?: import('../objects/stat').Stat[];
  sections?: ModularSection[];
  coverImage?: SanityImageValue;
  publishedAt?: string;
  featured?: boolean;
  seo?: Seo;
}

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  orderings: [
    {
      title: 'Published date, newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(4).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Short label used in listings and cards.',
      validation: (rule) => rule.required().min(2).max(40),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(20).max(280),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({type: 'stat'})],
      validation: (rule) => rule.max(6),
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
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({title, subtitle, media, featured}) {
      return {
        title,
        subtitle: featured ? `${subtitle} · Featured` : subtitle,
        media,
      };
    },
  },
});

export default caseStudy;
