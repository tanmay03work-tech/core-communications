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
  caseNumber?: string;
  kicker?: string;
  intro?: string;
  detailBlocks?: Array<{_key?: string; title: string; body?: string; bullets?: string[]}>;
  milestoneBlocks?: Array<{_key?: string; title: string; body?: string; bullets?: string[]}>;
  outcome?: {_key?: string; title?: string; body?: string; bullets?: string[]};
  mediaPlacements?: string[];
  resultNote?: string;
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
      name: 'caseNumber',
      title: 'Case number',
      type: 'string',
      description: 'Display number for the compact case-study layout, for example 01.',
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Short service/context line shown under the title.',
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: 'intro',
      title: 'Intro line',
      type: 'text',
      rows: 2,
      description: 'Italic one-line positioning statement shown below the kicker.',
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: 'detailBlocks',
      title: 'Detail blocks',
      type: 'array',
      description: 'Compact columns such as The Challenge, The Approach, The Delivery.',
      of: [
        defineArrayMember({
          name: 'caseStudyDetailBlock',
          title: 'Detail block',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(80)}),
            defineField({name: 'body', title: 'Body', type: 'text', rows: 4, validation: (rule) => rule.max(600)}),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [defineArrayMember({type: 'text', rows: 2})],
              validation: (rule) => rule.max(8),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'milestoneBlocks',
      title: 'Milestone blocks',
      type: 'array',
      description: 'Optional numbered blocks for longer APAC / milestone-style case studies.',
      of: [
        defineArrayMember({
          name: 'caseStudyMilestoneBlock',
          title: 'Milestone block',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required().max(100)}),
            defineField({name: 'body', title: 'Body', type: 'text', rows: 4, validation: (rule) => rule.max(700)}),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [defineArrayMember({type: 'text', rows: 2})],
              validation: (rule) => rule.max(8),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'outcome',
      title: 'Key outcome / result note',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.max(80)}),
        defineField({name: 'body', title: 'Body', type: 'text', rows: 4, validation: (rule) => rule.max(800)}),
        defineField({
          name: 'bullets',
          title: 'Bullets',
          type: 'array',
          of: [defineArrayMember({type: 'text', rows: 2})],
          validation: (rule) => rule.max(8),
        }),
      ],
    }),
    defineField({
      name: 'resultNote',
      title: 'Short result note',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: 'mediaPlacements',
      title: 'Media placements',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(16),
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
