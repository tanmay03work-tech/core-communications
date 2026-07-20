import {defineField, defineType} from 'sanity';
import type {SanityImageValue} from '../sections/shared';

export interface ClientLogo {
  _id?: string;
  _type: 'clientLogo';
  name: string;
  logo?: SanityImageValue;
  url?: string;
  category?: string;
  order?: number;
  featured?: boolean;
}

export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client Logo',
  type: 'document',
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Client name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: false},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.max(160),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Optional grouping such as Fintech, Cybersecurity, or Infrastructure.',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'featured',
      title: 'Show in logo showcase',
      type: 'boolean',
      description: 'Turn this off to keep the logo in Sanity but hide it from the website showcase.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      featured: 'featured',
      media: 'logo',
    },
    prepare({title, category, featured}) {
      const visibility = featured === false ? 'Hidden from showcase' : 'Shown in showcase';

      return {
        title,
        subtitle: category ? `${visibility} - ${category}` : visibility,
      };
    },
  },
});

export default clientLogo;
