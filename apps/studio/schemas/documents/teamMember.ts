import {defineArrayMember, defineField, defineType} from 'sanity';
import type {ModularSection} from '../sections';
import type {SanityImageAssetReference, SanitySlugValue} from '../sections/shared';

export interface TeamMemberPhoto {
  _type: 'image';
  asset?: SanityImageAssetReference;
}

export interface TeamMember {
  _id?: string;
  _type: 'teamMember';
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
  name: string;
  slug?: SanitySlugValue;
  role: string;
  location?: string;
  bio?: string;
  photo?: TeamMemberPhoto;
  linkedIn?: string;
  order?: number;
  sections?: ModularSection[];
}

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
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
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.max(600),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn Profile URL',
      type: 'string',
      description: 'LinkedIn profile link (e.g. https://www.linkedin.com/in/...)',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter / X Profile URL',
      type: 'string',
      description: 'Twitter / X profile link',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Personal / Portfolio Website URL',
      type: 'string',
      description: 'Personal or company website link',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.integer().min(0),
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
      validation: (rule) => rule.max(10),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
});

export default teamMember;
