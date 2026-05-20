import {defineField, defineType} from 'sanity';

export interface SanityImageAssetReference {
  _type: 'reference';
  _ref: string;
}

export interface SeoImage {
  _type: 'image';
  asset?: SanityImageAssetReference;
}

export interface Seo {
  _type: 'seo';
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SeoImage;
}

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
      media: 'ogImage',
    },
  },
});

export default seo;
